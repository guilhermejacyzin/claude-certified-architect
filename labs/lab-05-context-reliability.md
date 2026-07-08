# Lab 05 - Contexto e Confiabilidade

## Objetivo

Projetar gestão de contexto para uma investigação longa em codebase grande.

## Cenário

Você precisa descobrir por que testes de integração falham em um monorepo.

## Exercício

1. Use `Glob` para mapear arquivos candidatos.
2. Use `Grep` para buscar símbolos relevantes.
3. Leia poucos arquivos por vez.
4. Crie scratchpad com:
   - fatos confirmados;
   - hipóteses;
   - arquivos lidos;
   - lacunas;
   - próximos passos.
5. Defina quando chamar subagente.
6. Defina como compactar contexto.

## Critérios de sucesso

- Não carregar monorepo inteiro.
- Fatos têm fonte.
- Hipóteses são separadas de evidências.
- Subagentes retornam resumo, não dump.
- Compaction preserva estado operacional.
## Aula pratica completa

Este lab treina confiabilidade em tarefas longas. Modelos podem trabalhar com
muito contexto, mas isso nao significa que voce deva despejar o monorepo
inteiro na conversa. O comportamento profissional e investigar por camadas:
mapear, buscar, ler pouco, registrar fatos, formular hipoteses e validar cada
hipotese com evidencia.

Em certificacoes e projetos reais, a diferenca entre um assistente util e um
assistente perigoso esta na disciplina de contexto. Sem disciplina, o agente
mistura arquivos, esquece premissas, repete leituras, inventa causalidade e
toma decisoes com base em trechos incompletos.

### Modelo mental

Imagine um engenheiro investigando uma falha de integracao. Ele nao imprime
todo o repositorio e tenta ler tudo de uma vez. Ele olha a mensagem de erro,
identifica o teste, encontra os simbolos relacionados, le os arquivos pequenos
primeiro, monta uma linha de raciocinio e so altera codigo depois de confirmar
a causa provavel.

### Passo a passo detalhado

1. Comece pela falha observavel: comando executado, mensagem de erro, stack
   trace, ambiente e quando a falha comecou.
2. Use busca por arquivos para mapear candidatos: testes, fixtures, configs,
   modulos citados na stack.
3. Use busca textual para encontrar simbolos, nomes de funcao, endpoints,
   variaveis de ambiente e mensagens de erro.
4. Leia arquivos em lotes pequenos.
5. Registre cada fato com fonte: arquivo, linha, comando ou log.
6. Separe hipoteses de fatos. Hipotese nao confirmada nao deve virar conclusao.
7. Defina o proximo teste que pode confirmar ou negar cada hipotese.
8. Quando o contexto crescer, compacte em scratchpad: fatos, hipoteses,
   arquivos lidos, lacunas e proximas acoes.
9. Chame subagente apenas quando a tarefa puder ser delegada com escopo claro.
10. Exija que subagente retorne conclusao, evidencias e incertezas, nao dump de
    arquivos.
11. Antes de editar, escreva a causa mais provavel e o menor patch possivel.
12. Depois de editar, rode o teste que falhava e pelo menos uma verificacao de
    regressao relacionada.

### Exemplo simplificado

Se o teste diz "expected 200, received 401", nao comece alterando a regra de
negocio. Primeiro descubra se o teste perdeu token, se a rota mudou, se o mock
de autenticacao nao carregou ou se a politica realmente deveria bloquear. Cada
possibilidade precisa de evidencia.

### Modelo de scratchpad

```md
## Fatos confirmados

- O teste `orders.integration.test` falha com 401.
- A rota `/orders/:id` exige `orders:read`.
- O fixture atual cria usuario sem permissao.

## Hipoteses

- H1: fixture antigo ficou incompativel com nova politica.
- H2: middleware de auth mudou ordem de execucao.

## Arquivos lidos

- `tests/orders.integration.test.ts`
- `src/auth/permissions.ts`
- `src/routes/orders.ts`

## Lacunas

- Confirmar se outros testes usam o mesmo fixture.

## Proximo passo

- Buscar `createTestUser(` no diretorio de testes.
```

### Erros comuns que a prova costuma explorar

- Carregar contexto demais e perder foco.
- Tratar hipotese como fato.
- Alterar codigo antes de reproduzir a falha.
- Ignorar comandos de teste existentes.
- Usar subagente sem escopo e receber resposta impossivel de auditar.
- Compactar contexto sem preservar arquivos lidos e decisoes pendentes.

### Checklist de dominio

- Consigo mapear arquivos antes de ler.
- Consigo usar busca textual para reduzir espaco de investigacao.
- Consigo registrar fatos com fonte.
- Consigo separar causa provavel de causa confirmada.
- Consigo compactar contexto sem perder estado operacional.
- Consigo definir teste de confirmacao antes do patch.

### Entregavel do aluno

Entregue comandos de busca usados, lista de arquivos candidatos, scratchpad
preenchido, tres hipoteses ordenadas por probabilidade, evidencia para confirmar
ou negar cada hipotese, menor patch proposto e plano de validacao pos-correcao.
