export interface SuccessMeta {
  page?: number;
  limit?: number;
  total?: number;
  totalPages?: number;
  [key: string]: unknown;
}

export function successResponse<T>(
  data: T,
  requestId: string,
  meta?: SuccessMeta,
  links?: Record<string, string>
): { data: T; meta?: SuccessMeta; links?: Record<string, string>; requestId: string } {
  return {
    data,
    meta,
    links,
    requestId
  };
}

export function errorResponse(
  message: string,
  requestId: string,
  code = 'INTERNAL_ERROR',
  details?: unknown
): { error: string; code: string; details?: unknown; requestId: string } {
  return {
    error: message,
    code,
    details,
    requestId
  };
}

