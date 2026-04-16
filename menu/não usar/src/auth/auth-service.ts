import { sql } from 'kysely';
import { randomUUID } from 'node:crypto';
import { AppError } from '../common/errors/app-error.js';
import type { DB } from '../lib/db.js';
import type { Kysely } from 'kysely';
import { env } from '../config/env.js';

export interface AuthenticatedUser {
  id: number;
  email: string;
  name: string;
  roles: string[];
  permissions: string[];
}

export class AuthService {
  constructor(private readonly db: Kysely<DB>) {}

  async login(email: string, password: string, userAgent?: string, ipAddress?: string) {
    const authResult = await sql<{ user_id: number; nome: string; email: string }>`
      select * from auth.autenticar_usuario(${email}::citext, ${password})
    `.execute(this.db);
    const row = authResult.rows[0];
    if (!row) throw new AppError('Credenciais inválidas', 401, 'INVALID_CREDENTIALS');

    const user = await this.getUserWithAuthz(row.user_id);
    const refreshPlain = await this.issueRefreshToken(user.id, userAgent, ipAddress);
    return { user, refreshToken: refreshPlain };
  }

  async issueRefreshToken(userId: number, userAgent?: string, ipAddress?: string): Promise<string> {
    const res = await sql<{ token: string }>`
      select auth.emitir_refresh_token(
        ${userId},
        ${userAgent ?? null},
        ${ipAddress ?? null}::inet,
        ${`${env.JWT_REFRESH_TTL_DAYS} days`}::interval
      ) as token
    `.execute(this.db);
    return res.rows[0]?.token ?? '';
  }

  async revokeRefreshToken(refreshToken: string): Promise<boolean> {
    const res = await sql<{ ok: boolean }>`select auth.revogar_refresh_token(${refreshToken}) as ok`.execute(this.db);
    return Boolean(res.rows[0]?.ok);
  }

  async refresh(refreshToken: string, userAgent?: string, ipAddress?: string) {
    const refreshHashResult = await sql<{ id: number; user_id: number; expires_at: string; revoked_at: string | null }>`
      select id, user_id, expires_at::text, revoked_at::text
      from auth.refresh_tokens
      where token_hash = auth.hash_token_sha256(${refreshToken})
        and deleted_at is null
      limit 1
    `.execute(this.db);
    const tokenRow = refreshHashResult.rows[0];
    if (!tokenRow) throw new AppError('Refresh token inválido', 401, 'INVALID_REFRESH_TOKEN');
    if (tokenRow.revoked_at) throw new AppError('Refresh token revogado', 401, 'REVOKED_REFRESH_TOKEN');
    if (new Date(tokenRow.expires_at) <= new Date()) throw new AppError('Refresh token expirado', 401, 'EXPIRED_REFRESH_TOKEN');

    await this.revokeRefreshToken(refreshToken);
    const user = await this.getUserWithAuthz(tokenRow.user_id);
    const nextRefresh = await this.issueRefreshToken(user.id, userAgent, ipAddress);
    return { user, refreshToken: nextRefresh };
  }

  async me(userId: number) {
    return this.getUserWithAuthz(userId);
  }

  async forgotPassword(identifier: { email?: string; cpf?: string; phone?: string }, userAgent?: string, ipAddress?: string) {
    const whereClause =
      identifier.email !== undefined
        ? sql`email = ${identifier.email}::citext`
        : identifier.cpf !== undefined
          ? sql`cpf = ${identifier.cpf}`
          : sql`phone = ${identifier.phone}`;

    const userRes = await sql<{ id: number }>`
      select id from auth.users where deleted_at is null and ${whereClause} limit 1
    `.execute(this.db);
    const user = userRes.rows[0];
    if (!user) return { accepted: true };

    const reset = await sql<{ token: string }>`
      select auth.emitir_token_reset_senha(
        ${user.id},
        interval '30 minutes',
        ${ipAddress ?? null}::inet,
        ${userAgent ?? null}
      ) as token
    `.execute(this.db);
    const resetToken = reset.rows[0]?.token ?? '';
    return { accepted: true, resetToken };
  }

  async resetPassword(resetToken: string, newPassword: string) {
    const consume = await sql<{ user_id: number }>`
      select auth.consumir_token_reset_senha(${resetToken}) as user_id
    `.execute(this.db);
    const userId = consume.rows[0]?.user_id;
    if (!userId) throw new AppError('Token de reset inválido/expirado', 400, 'INVALID_RESET_TOKEN');
    await sql`select auth.definir_senha(${userId}, ${newPassword})`.execute(this.db);
    return { changed: true };
  }

  async changePassword(userId: number, currentPassword: string, newPassword: string) {
    const current = await sql<{ email: string }>`
      select email::text as email from auth.users where id = ${userId} and deleted_at is null
    `.execute(this.db);
    const email = current.rows[0]?.email;
    if (!email) throw new AppError('Usuário não encontrado', 404, 'USER_NOT_FOUND');
    const valid = await sql<{ user_id: number; nome: string; email: string }>`
      select * from auth.autenticar_usuario(${email}::citext, ${currentPassword})
    `.execute(this.db);
    if (!valid.rows[0]) throw new AppError('Senha atual inválida', 401, 'INVALID_CURRENT_PASSWORD');
    await sql`select auth.definir_senha(${userId}, ${newPassword})`.execute(this.db);
    return { changed: true };
  }

  async getUserWithAuthz(userId: number): Promise<AuthenticatedUser> {
    const userRes = await sql<{ id: number; email: string; name: string }>`
      select id, email::text as email, name
      from auth.users
      where id = ${userId}
        and deleted_at is null
        and is_active = true
      limit 1
    `.execute(this.db);
    const u = userRes.rows[0];
    if (!u) throw new AppError('Usuário não encontrado', 404, 'USER_NOT_FOUND');

    const authz = await sql<{ role_code: string; perm_code: string | null }>`
      select r.codigo as role_code, p.codigo as perm_code
      from auth.user_roles ur
      join auth.roles r on r.id = ur.role_id and r.deleted_at is null and r.ativo = true
      left join auth.role_permissions rp on rp.role_id = r.id and rp.deleted_at is null
      left join auth.permissions p on p.id = rp.permission_id and p.deleted_at is null
      where ur.user_id = ${userId}
        and ur.deleted_at is null
    `.execute(this.db);

    const roles = [...new Set(authz.rows.map((r) => r.role_code))];
    const permissions = [...new Set(authz.rows.map((r) => r.perm_code).filter((v): v is string => Boolean(v)))];

    return {
      id: u.id,
      email: u.email,
      name: u.name,
      roles,
      permissions
    };
  }

  static makeRefreshOpaqueToken(): string {
    return randomUUID().replace(/-/g, '');
  }
}

