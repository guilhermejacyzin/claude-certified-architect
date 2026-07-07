# 04 - Nível Especialista

Objetivo: dominar tradeoffs de produção e responder questões difíceis.

## Aula 16 - Tradeoff: autonomia vs controle

### Ideia central

Quanto mais risco, mais controle determinístico.

### Matriz

| Situação | Autonomia | Controle |
|---|---:|---|
| resumo de documento público | alta | baixo |
| consulta de status | alta | médio |
| refund pequeno | média | gate simples |
| refund alto | baixa | aprovação |
| deletar dado | muito baixa | bloqueio/approval |

### Atividade

Classifique 15 ações de uma empresa em autonomia/controle.

## Aula 17 - Tradeoff: tool grande vs tools pequenas

### Tool grande

Vantagens:

- menos itens;
- interface simples para dev.

Desvantagens:

- modelo confunde ação;
- segurança pior;
- auditabilidade pior;
- schema mais aberto.

### Tools pequenas

Vantagens:

- escolha clara;
- permissões específicas;
- logs melhores;
- menor risco.

Desvantagens:

- mais manutenção;
- excesso pode confundir.

### Decisão especialista

Separe quando risco, permissão ou semântica diferem.

## Aula 18 - Tradeoff: single agent vs multiagent

### Single agent

Use para:

- tarefa simples;
- contexto pequeno;
- baixa necessidade de paralelismo.

### Multiagent

Use para:

- pesquisa ampla;
- análise independente;
- revisão cruzada;
- especialização;
- contexto grande.

### Risco

Multiagent sem coordenação gera duplicação, perda de contexto e síntese fraca.

## Aula 19 - Tradeoff: schema rígido vs flexível

### Schema rígido

Bom para downstream e validação.

Risco: pode forçar resposta ruim se não permite ausência.

### Schema flexível

Bom para exploração inicial.

Risco: output instável.

### Decisão especialista

Use schema rígido com nullable, `other_detail` e versão.

## Aula 20 - Tradeoff: batch vs online

### Batch

Bom para:

- volume;
- independência;
- custo;
- latência tolerável.

### Online

Bom para:

- interação;
- tool loop;
- decisão caso a caso;
- baixa latência.

### Decisão especialista

Se precisa chamar tools entre turnos, batch provavelmente não é o caminho.

## Aula 21 - Observabilidade e auditoria

### O que registrar

- user request resumido;
- tools chamadas;
- inputs seguros;
- outputs seguros;
- decisões;
- erros;
- escalonamentos;
- versão de prompt/schema;
- confidence;
- fontes.

### O que não registrar

- secrets;
- dados além do necessário;
- conteúdo sensível sem política;
- logs gigantes sem filtragem.

## Aula 22 - Avaliar qualidade de agente

### Métricas

- taxa de resolução;
- taxa de escalonamento;
- falso positivo;
- falso negativo;
- tempo;
- custo;
- taxa de retry;
- acurácia por campo;
- satisfação;
- incidentes.

### Atividade

Defina métricas para agente de suporte e pipeline de extração.

## Aula 23 - Estratégia para questões difíceis

### Método

1. Procure risco.
2. Procure ação irreversível.
3. Procure output downstream.
4. Procure contexto ausente.
5. Procure fonte/proveniência.
6. Procure política.
7. Escolha a alternativa com melhor boundary.

### Sinais de resposta errada

- "apenas melhore o prompt";
- "dê todas as tools";
- "ignore conflito";
- "force campo obrigatório";
- "leia tudo";
- "automatize sem revisão";
- "escale sem contexto".

## Aula 24 - Design review especialista

### Checklist

Para qualquer arquitetura, pergunte:

1. Quais tools existem?
2. Quais mudam estado?
3. Quem pode chamá-las?
4. Quais gates existem?
5. Como erros são propagados?
6. Como contexto é preservado?
7. Como fontes são rastreadas?
8. Como output é validado?
9. Quando humano entra?
10. Como medir qualidade?

## Avaliação do nível

Você deve conseguir:

- criticar arquitetura ruim;
- propor alternativa segura;
- justificar tradeoff;
- mapear decisão para domínio do exame;
- desenhar capstone completo.
