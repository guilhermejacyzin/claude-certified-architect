# Síntese Comunitária em PT-BR

Esta página consolida, em linguagem própria, padrões recorrentes observados nos
materiais comunitários públicos sobre a certificação Claude Certified Architect -
Foundations. Ela deve ser lida junto com `docs/00-mapa-exame.md` e a
documentação oficial.

## O que os bons materiais têm em comum

Os guias mais úteis não tentam decorar APIs isoladas. Eles treinam julgamento:

- quando confiar no modelo;
- quando tirar responsabilidade do modelo e colocar em código;
- como limitar tools;
- como preservar contexto;
- como lidar com erro, baixa confiança e escalonamento;
- como projetar workflows reproduzíveis.

Essa é a mentalidade central da prova.

## Modelo mental para responder questões

Quando ler um cenário, faça quatro perguntas:

1. **Qual é o risco?**
   - financeiro;
   - dados sensíveis;
   - ação irreversível;
   - falso positivo;
   - baixa confiança;
   - perda de contexto.

2. **Onde a garantia deve morar?**
   - prompt para orientação;
   - schema para formato;
   - hook/gate para política;
   - tool boundary para ação;
   - humano para julgamento de alto risco.

3. **O que precisa ser preservado?**
   - histórico relevante;
   - resultados de tools;
   - fonte e data;
   - lacunas;
   - erro estruturado;
   - decisão tomada.

4. **Qual alternativa reduz ambiguidade?**
   - nome de tool específico;
   - descrição clara;
   - JSON Schema;
   - few-shot direcionado;
   - subagente com contexto explícito;
   - pipeline multi-pass.

## Padrões por domínio

### 1. Arquitetura Agentic

Padrão forte:

- loop controlado por `stop_reason`;
- tools executadas fora do modelo;
- resultados retornam ao histórico;
- código controla limites e policy gates;
- humano entra quando política/risco/confiança exigem.

Resposta suspeita:

- "instruir melhor o modelo" quando a situação pede garantia;
- terminar loop baseado em texto natural;
- subagente sem contexto;
- pipeline fixo para tarefa aberta demais.

### 2. MCP e tools

Padrão forte:

- tools pequenas, nomeadas pelo objetivo;
- input schema restrito;
- erro estruturado;
- tools destrutivas separadas e protegidas;
- resources para dados estáticos/consulta;
- prompts para workflows reutilizáveis.

Resposta suspeita:

- tool genérica `execute_action`;
- erro livre como `"deu erro"`;
- permissões amplas para todos os subagentes;
- tool que mistura leitura, decisão e escrita.

### 3. Claude Code

Padrão forte:

- `CLAUDE.md` para contexto estável;
- rules por caminho para convenções específicas;
- commands para workflows repetíveis;
- skills para capacidades especializadas;
- hooks para bloquear/validar;
- plan mode para mudanças complexas;
- CI com output estruturado.

Resposta suspeita:

- regra global enorme;
- plan mode para microedição;
- CI que publica comentários vagos;
- review automatizado sem severidade, evidência e critério.

### 4. Prompt e structured output

Padrão forte:

- critérios explícitos;
- few-shot para ambiguidade;
- tool use/JSON Schema para estrutura;
- nullable para ausência real;
- retry com erro específico;
- confidence por campo;
- revisão humana por limiar.

Resposta suspeita:

- campo obrigatório quando o documento pode não conter a informação;
- pedir "JSON válido" só em texto;
- retry genérico;
- batch quando há dependência multi-turn.

### 5. Contexto e confiabilidade

Padrão forte:

- compactar fatos, não apagar decisões;
- preservar proveniência;
- separar evidência de hipótese;
- propagar erro com contexto;
- sinalizar lacunas de cobertura;
- calibrar confiança com validação.

Resposta suspeita:

- colar tudo no contexto;
- síntese sem fontes;
- escolher uma fonte conflitante sem explicar;
- esconder incerteza.

## Anti-patterns que aparecem muito

| Anti-pattern | Melhor alternativa |
|---|---|
| Prompt como única barreira de compliance | Hook, gate ou validação programática |
| Subagente "mágico" que herda contexto | Passar contexto e critérios explicitamente |
| Tool ampla demais | Tools específicas com schema claro |
| JSON sem schema | Tool use + JSON Schema |
| Review em CI com texto livre | Output estruturado com severidade e evidência |
| Documento gigante no contexto | Chunking, extração de fatos e resumo progressivo |
| Escalonamento sem contexto | Handoff estruturado |
| Pesquisa multiagente sem fontes | Claim-source mapping |

## Como usar repositórios comunitários

Use-os para:

- treinar perguntas;
- comparar explicações;
- identificar lacunas;
- ver exemplos de organização;
- revisar antes do exame.

Não use para:

- decorar respostas;
- substituir material oficial;
- copiar questões reais;
- publicar traduções integrais sem licença.

## Checklist de prontidão

Você está pronto quando consegue explicar, sem consultar:

- um loop agentic completo;
- a diferença entre tool, resource e prompt no MCP;
- quando usar plan mode;
- como criar schema que não induz alucinação;
- como fazer retry de extração;
- como passar contexto para subagente;
- quando escalonar para humano;
- como preservar proveniência em pesquisa;
- como reduzir falsos positivos em CI.
