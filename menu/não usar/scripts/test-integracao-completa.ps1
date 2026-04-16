param(
  [string]$BaseUrl = "http://127.0.0.1:3000/api/v1",
  [string]$AdminEmail = "admin@tawros.local",
  [string]$AdminPassword = "Admin@123",
  [switch]$RunUnitTests
)

$ErrorActionPreference = "Stop"

$apiRoot = Split-Path -Parent $PSScriptRoot
Set-Location $apiRoot

$results = @()

function Add-Result {
  param(
    [string]$Name,
    [bool]$Ok,
    [string]$Detail
  )
  $script:results += [pscustomobject]@{
    teste   = $Name
    sucesso = $Ok
    detalhe = $Detail
  }
}

function Wait-Health {
  param([string]$Url)
  for ($i = 0; $i -lt 40; $i++) {
    Start-Sleep -Milliseconds 500
    try {
      $health = Invoke-RestMethod -Method GET -Uri "$Url/health" -TimeoutSec 3
      if ($health.data.status -eq "ok") {
        return $true
      }
    } catch {
      # waiting startup
    }
  }
  return $false
}

function Invoke-Api {
  param(
    [string]$Method,
    [string]$Url,
    [hashtable]$Headers,
    [object]$Body = $null
  )

  if ($null -eq $Body) {
    return Invoke-RestMethod -Method $Method -Uri $Url -Headers $Headers
  }
  return Invoke-RestMethod -Method $Method -Uri $Url -Headers $Headers -ContentType "application/json" -Body ($Body | ConvertTo-Json -Depth 10)
}

$serverProcess = $null
try {
  $serverProcess = Start-Process -FilePath "node" -ArgumentList "dist/src/server.js" -WorkingDirectory $apiRoot -PassThru
  if (-not (Wait-Health -Url $BaseUrl)) {
    throw "API nao iniciou em $BaseUrl"
  }
  Add-Result "health" $true "ok"

  if ($RunUnitTests) {
    npm test | Out-Host
    if ($LASTEXITCODE -ne 0) {
      throw "Falha em npm test"
    }
    Add-Result "npm test" $true "ok"
  }

  npm run smoke | Out-Host
  if ($LASTEXITCODE -ne 0) {
    throw "Falha em npm run smoke"
  }
  Add-Result "smoke" $true "ok"

  $login = Invoke-Api -Method "POST" -Url "$BaseUrl/auth/login" -Body @{
    email    = $AdminEmail
    password = $AdminPassword
  }
  $token = $login.data.accessToken
  if ([string]::IsNullOrWhiteSpace($token)) {
    throw "Login nao retornou accessToken"
  }
  Add-Result "auth.login" $true "token recebido"

  $authHeaders = @{ Authorization = "Bearer $token" }

  try {
    Invoke-Api -Method "GET" -Url "$BaseUrl/users?page=1&limit=1" -Headers $authHeaders | Out-Null
    Add-Result "users.auth" $true "200 com bearer"
  } catch {
    Add-Result "users.auth" $false $_.Exception.Message
  }

  try {
    Invoke-RestMethod -Method GET -Uri "$BaseUrl/users?page=1&limit=1" -TimeoutSec 5 | Out-Null
    Add-Result "users.sem-token" $false "esperado 401, retornou sucesso"
  } catch {
    Add-Result "users.sem-token" $true "401 esperado"
  }

  $lookGrupos = Invoke-Api -Method "GET" -Url "$BaseUrl/lookups/grupos-empresariais?limit=50" -Headers $authHeaders
  $lookCategorias = Invoke-Api -Method "GET" -Url "$BaseUrl/lookups/categorias-pessoa-empresa?limit=50" -Headers $authHeaders
  $lookSetores = Invoke-Api -Method "GET" -Url "$BaseUrl/lookups/setores?limit=50" -Headers $authHeaders
  $lookRamos = Invoke-Api -Method "GET" -Url "$BaseUrl/lookups/ramos-atividade?limit=50" -Headers $authHeaders
  $lookUnidades = Invoke-Api -Method "GET" -Url "$BaseUrl/lookups/unidades-medida?limit=50" -Headers $authHeaders
  Add-Result "lookups" $true "ok"

  $grupoId = @($lookGrupos.data)[0].id
  $categoriaId = @($lookCategorias.data)[0].id
  $setorId = @($lookSetores.data)[0].id
  $ramoId = @($lookRamos.data)[0].id
  $unidadeId = @($lookUnidades.data)[0].id
  if (-not $grupoId -or -not $categoriaId -or -not $setorId -or -not $ramoId -or -not $unidadeId) {
    throw "Lookups sem dados minimos para CRUD"
  }

  $stamp = [DateTimeOffset]::UtcNow.ToUnixTimeSeconds()
  $cpfCnpj = "99$($stamp.ToString().PadRight(12, '0').Substring(0, 12))"

  $pessoa = Invoke-Api -Method "POST" -Url "$BaseUrl/pessoas-empresas" -Headers $authHeaders -Body @{
    codigo               = "PE-$stamp"
    tipo_cadastro        = "empresa"
    grupo_empresarial_id = [int64]$grupoId
    categoria_id         = [int64]$categoriaId
    setor_id             = [int64]$setorId
    cpf_cnpj             = $cpfCnpj
    razao_social         = "Empresa Integracao $stamp"
    nome_fantasia        = "Fantasia $stamp"
    ativo                = $true
  }
  $pessoaId = $pessoa.data.id
  Add-Result "pessoas-empresas.create" ($null -ne $pessoaId) "id=$pessoaId"

  try {
    $link = Invoke-Api -Method "POST" -Url "$BaseUrl/pessoas-empresas-ramos" -Headers $authHeaders -Body @{
      pessoa_empresa_id = [int64]$pessoaId
      ramo_atividade_id = [int64]$ramoId
    }
    Add-Result "pessoas-empresas-ramos.create" $true "id=$($link.data.id)"
  } catch {
    $link = Invoke-Api -Method "POST" -Url "$BaseUrl/pessoas-empresas-ramos" -Headers $authHeaders -Body @{
      pessoa_empresa_id = [int64]$pessoaId
      ramo_id           = [int64]$ramoId
    }
    Add-Result "pessoas-empresas-ramos.create" $true "id=$($link.data.id)"
  }

  Invoke-Api -Method "PUT" -Url "$BaseUrl/pessoas-empresas/$pessoaId" -Headers $authHeaders -Body @{
    codigo               = "PE-$stamp"
    tipo_cadastro        = "empresa"
    grupo_empresarial_id = [int64]$grupoId
    categoria_id         = [int64]$categoriaId
    setor_id             = [int64]$setorId
    cpf_cnpj             = $cpfCnpj
    razao_social         = "Empresa Integracao Atualizada $stamp"
    nome_fantasia        = "Fantasia Atualizada $stamp"
    ativo                = $true
  } | Out-Null
  Add-Result "pessoas-empresas.update" $true "id=$pessoaId"

  $classes = Invoke-Api -Method "GET" -Url "$BaseUrl/classificacao-classes?page=1&limit=10" -Headers $authHeaders
  $classeId = @($classes.data)[0].id
  if (-not $classeId) {
    throw "Sem classificacao-classes para criar produto-servico"
  }

  $produto = Invoke-Api -Method "POST" -Url "$BaseUrl/produtos-servicos" -Headers $authHeaders -Body @{
    codigo    = "PS-$stamp"
    classe_id = [int64]$classeId
    tipo_item = "produto"
    descricao = "Produto Integracao $stamp"
    unidade   = "UN"
    ativo     = $true
  }
  $produtoId = $produto.data.id
  Add-Result "produtos-servicos.create" ($null -ne $produtoId) "id=$produtoId"

  Invoke-Api -Method "PUT" -Url "$BaseUrl/produtos-servicos/$produtoId" -Headers $authHeaders -Body @{
    codigo    = "PS-$stamp"
    classe_id = [int64]$classeId
    tipo_item = "servico"
    descricao = "Servico Integracao $stamp"
    unidade   = "UN"
    ativo     = $true
  } | Out-Null
  Add-Result "produtos-servicos.update" $true "id=$produtoId"

  $emb = Invoke-Api -Method "POST" -Url "$BaseUrl/embalagens" -Headers $authHeaders -Body @{
    codigo                 = "EMB-$stamp"
    unidade_equivalencia_id = [int64]$unidadeId
    valor_conversao        = 1.25
    descricao              = "Embalagem Integracao $stamp"
    sigla                  = "CX"
    ativo                  = $true
  }
  $embId = $emb.data.id
  Add-Result "embalagens.create" ($null -ne $embId) "id=$embId"

  Invoke-Api -Method "PUT" -Url "$BaseUrl/embalagens/$embId" -Headers $authHeaders -Body @{
    codigo                 = "EMB-$stamp"
    unidade_equivalencia_id = [int64]$unidadeId
    valor_conversao        = 2.5
    descricao              = "Embalagem Integracao Atualizada $stamp"
    sigla                  = "FD"
    ativo                  = $true
  } | Out-Null
  Add-Result "embalagens.update" $true "id=$embId"

  Invoke-Api -Method "DELETE" -Url "$BaseUrl/produtos-servicos/$produtoId" -Headers $authHeaders | Out-Null
  Add-Result "produtos-servicos.delete" $true "id=$produtoId"
  Invoke-Api -Method "DELETE" -Url "$BaseUrl/embalagens/$embId" -Headers $authHeaders | Out-Null
  Add-Result "embalagens.delete" $true "id=$embId"
  Invoke-Api -Method "DELETE" -Url "$BaseUrl/pessoas-empresas/$pessoaId" -Headers $authHeaders | Out-Null
  Add-Result "pessoas-empresas.delete" $true "id=$pessoaId"

  Invoke-Api -Method "POST" -Url "$BaseUrl/pessoas-empresas/$pessoaId/restore" -Headers $authHeaders -Body @{} | Out-Null
  Add-Result "pessoas-empresas.restore" $true "id=$pessoaId"

  $me = Invoke-Api -Method "GET" -Url "$BaseUrl/auth/me" -Headers $authHeaders
  Add-Result "auth.me" ($null -ne $me.data.id) "id=$($me.data.id)"
}
catch {
  Add-Result "fatal" $false $_.Exception.Message
}
finally {
  if ($serverProcess -and -not $serverProcess.HasExited) {
    Stop-Process -Id $serverProcess.Id -Force
  }
}

Write-Host ""
Write-Host "==== RELATORIO DE INTEGRACAO ===="
$results | Format-Table -AutoSize

$failed = @($results | Where-Object { -not $_.sucesso })
if ($failed.Count -gt 0) {
  Write-Host ""
  Write-Host "Falhas encontradas: $($failed.Count)"
  exit 1
}

Write-Host ""
Write-Host "Tudo validado com sucesso."
exit 0
