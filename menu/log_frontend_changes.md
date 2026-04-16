# log_frontend_changes.md

## FE-001
- ID da alteracao: FE-001
- data/hora: 2026-04-13 14:24:30
- camada: frontend
- arquivo ou objeto alterado: `src/pages/controle-patio/patio/patio.js`
- tipo da alteracao: ajuste de logica de fluxo operacional
- motivo: implementar comportamento do resumo funcional do patio.
- requisito/trecho do video: check-in -> fila -> chamar -> dar entrada -> carregando -> finalizar; postergar; check-in de futuros.
- antes: quadro nao usava fase persistida; fila/chamada/entrada nao eram transicoes reais.
- depois: colunas e acoes passaram a usar `patio_fase` + timestamps; patch de instrucoes para cada transicao.
- impacto: fluxo operacional do patio fica consistente com API/banco.
- risco: medio; alteracao de fluxo principal da tela de patio.
- como testar: executar acoes no card da tela Patio e confirmar `patio_fase` na API.
- como desfazer: reverter trecho alterado em `mapColumns`, `handleClick`, `handleModalConfirm`, `loadPatioData`.

## FE-002
- ID da alteracao: FE-002
- data/hora: 2026-04-13 14:24:30
- camada: frontend
- arquivo ou objeto alterado: `src/pages/controle-patio/agendamentos/agendamentos.js`
- tipo da alteracao: persistencia de fase ao agendar/cancelar
- motivo: manter coerencia entre agendamentos e patio.
- requisito/trecho do video: item agendado entra em aguardando chegada e pode avancar no patio.
- antes: agendamento nao resetava campos operacionais de patio.
- depois: confirmar/cancelar agendamento atualiza `patio_fase` e limpa timestamps/fila.
- impacto: evita estado operacional inconsistente entre telas.
- risco: baixo.
- como testar: confirmar/cancelar agendamento e verificar payload PATCH.
- como desfazer: remover campos operacionais adicionados nos payloads PATCH.
