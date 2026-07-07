# Módulo 5 - Context Management e Confiabilidade

Peso no exame: **15%**.

## Objetivo

Você deve saber preservar contexto crítico, lidar com incerteza, propagar erros,
escalonar corretamente e manter proveniência em sistemas multi-etapa.

## 1. Contexto não é memória infinita

Mesmo com janelas grandes, modelos podem:

- perder detalhes no meio;
- confundir versões;
- misturar fatos e hipóteses;
- esquecer decisões antigas;
- dar peso indevido ao texto mais recente.

Portanto, contexto precisa ser gerenciado.

## 2. Progressive summarization

Resumo ruim:

```text
Falamos sobre o bug e algumas soluções.
```

Resumo bom:

```text
Fatos confirmados:
- Teste X falha desde commit abc.
- Falha ocorre apenas com cache habilitado.
- Arquivo Y chama função Z antes de inicializar config.

Hipóteses:
- Ordem de inicialização causa estado nulo.

Arquivos lidos:
- src/cache.ts
- src/config.ts

Próxima ação:
- verificar chamada em src/app.ts
```

## 3. Scratchpad operacional

Use scratchpad para investigação longa.

Estrutura:

```text
# Scratchpad

## Objetivo

## Fatos confirmados

## Hipóteses

## Evidências

## Arquivos/fonte analisados

## Decisões

## Lacunas

## Próximos passos
```

O scratchpad deve ser atualizado, não substituído por logs brutos.

## 4. Large codebase exploration

Fluxo recomendado:

1. Entender objetivo.
2. Usar `Glob` para mapear estrutura.
3. Usar `Grep` para encontrar símbolos.
4. Ler arquivos candidatos.
5. Registrar fatos no scratchpad.
6. Formular hipóteses.
7. Ler mais arquivos apenas quando necessário.
8. Planejar mudança.
9. Implementar.
10. Rodar testes.

Anti-pattern:

- ler muitos arquivos sem plano;
- editar antes de entender;
- não registrar decisões;
- confiar em estado antigo após mudança.

## 5. Proveniência

Proveniência responde:

- de onde veio o claim?
- em que data?
- qual trecho suporta?
- há conflito?
- qual confiança?

Formato:

```json
{
  "claim": "A política permite reembolso em até 30 dias.",
  "source": "refund_policy.md",
  "section": "Eligibility",
  "quote": "Refunds are available within 30 days...",
  "date": "2026-07-01",
  "confidence": 0.95
}
```

## 6. Conflito entre fontes

Não esconda conflito.

Bom:

```text
Fonte A reporta 12%; Fonte B reporta 15%. A diferença parece vir de períodos
distintos: A usa Q1, B usa H1. A conclusão deve mencionar ambos.
```

Ruim:

```text
O valor é 12%.
```

## 7. Escalonamento

Escalone quando:

- política não cobre;
- usuário pede humano;
- confidence baixa;
- ação é irreversível;
- risco financeiro/legal/segurança;
- dados necessários estão ausentes;
- tool retorna permission/business error.

Não escalone quando:

- erro transitório pode ser retry;
- usuário só precisa de explicação;
- política é clara;
- agente pode resolver com segurança.

## 8. Handoff com contexto mínimo suficiente

Checklist:

- ID/entidade relevante;
- problema;
- passos tentados;
- evidências;
- causa provável;
- decisão necessária;
- recomendação;
- riscos;
- urgência;
- lacunas.

## 9. Error propagation multiagente

Subagente não deve retornar apenas "falhou".

Melhor:

```json
{
  "subagent": "web_search",
  "status": "partial_failure",
  "error_type": "timeout",
  "attempted_queries": ["..."],
  "partial_results": [...],
  "coverage_gaps": ["fontes acadêmicas"],
  "retryable": true
}
```

O coordenador pode:

- retry;
- chamar outro subagente;
- seguir com parcial;
- sinalizar lacuna;
- escalonar.

## 10. Confidence calibration

Confidence precisa ser calibrada.

Como:

1. Criar conjunto rotulado.
2. Comparar confidence vs acurácia real.
3. Separar por tipo de documento/campo.
4. Ajustar thresholds.
5. Revisar amostras de alta e baixa confiança.

Exemplo:

```text
Se confidence < 0.75 em campo financeiro -> revisão humana.
Se documento é novo tipo -> amostragem obrigatória.
```

## 11. Context handoff entre sessões

Ao terminar uma sessão longa, gere resumo:

```text
Objetivo:
Estado atual:
Arquivos alterados:
Testes rodados:
Decisões:
Riscos:
Próximo passo:
```

Ao retomar:

- validar se arquivos mudaram;
- reexecutar discovery se necessário;
- não confiar cegamente em tool results antigos.

## Checklist do domínio

Você domina este domínio se consegue:

- explicar lost-in-the-middle;
- criar scratchpad útil;
- explorar codebase grande;
- preservar proveniência;
- lidar com conflito;
- criar handoff humano;
- propagar erro multiagente;
- calibrar confidence;
- retomar sessão com segurança.
