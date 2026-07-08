# Roteiro de Publicação e Contribuição

Este repo foi preparado para ser público e útil para outras pessoas estudarem.

## O que pode entrar

- Resumos próprios em PT-BR.
- Labs autorais.
- Simulados autorais.
- Traduções/adaptações de conteúdo com licença compatível, desde que haja
  atribuição em `THIRD_PARTY_NOTICES.md`.
- Links para documentação oficial.
- Links para repositórios comunitários.
- Correções de explicações e exemplos.

## O que não pode entrar

- PDF oficial do exam guide.
- Conteúdo integral de cursos Skilljar/Academy.
- Dumps de questões reais.
- Conteúdo de repositórios sem licença copiado integralmente.
- Dados de empresa, cliente, projeto real ou credenciais.
- Prints de sistemas internos.

## Como contribuir

1. Abra uma issue com domínio e lacuna.
2. Faça branch pequena.
3. Adicione conteúdo com fonte.
4. Rode a checklist de segurança descrita em `SECURITY.md` e confira se nenhum
   arquivo oficial, credencial, dado interno ou questão real foi adicionado.

5. Se adaptar material de terceiro, atualize `THIRD_PARTY_NOTICES.md`.
6. Evite dizer "essa é a resposta da prova". Prefira "este é o padrão
   arquitetural esperado".

## Padrão de questão simulada

Cada questão deve conter:

- cenário;
- 4 alternativas;
- uma resposta correta;
- explicação da correta;
- por que os distratores são plausíveis, mas errados;
- domínio mapeado.

## Roadmap sugerido

- Adicionar 100 questões simuladas autorais.
- Criar versão Anki dos flashcards.
- Criar labs com código mínimo em TypeScript/Python.
- Adicionar seção de "erros comuns por domínio".
- Criar GitHub Actions para checar termos sensíveis e links quebrados.
## Padrao De Pull Request

Toda contribuicao deve ser pequena o suficiente para revisao humana real. O
objetivo nao e apenas "entrar conteudo"; e manter uma escola confiavel,
navegavel e segura.

Um PR ideal responde:

1. Qual aula, modulo ou documento foi alterado?
2. Qual lacuna de aprendizagem foi resolvida?
3. Quais fontes foram usadas?
4. Houve novo link interno?
5. Houve novo link externo?
6. Houve exemplo com acao sensivel, dado corporativo, token, cliente ou conta?
7. O validador de links passou?
8. A pagina foi aberta localmente?
9. O conteudo tem conceito, passo a passo, exemplo simplificado e criterio de
   dominio?

## Checklist De QA Obrigatorio

Antes de publicar:

```powershell
node --check assets/academy-data.js
node --check assets/academy-extra-lessons.js
node --check assets/academy-app.js
node --check assets/library-app.js
node --check tools/check-site-links.js
node tools/check-site-links.js
```

Depois, subir servidor local:

```powershell
python -m http.server 8080
```

Abrir:

- `http://localhost:8080/`
- `http://localhost:8080/docsify.html#/README.md`
- uma aula da API;
- uma aula de MCP;
- uma aula de Claude Code;
- uma aula de seguranca;
- um lab;
- um simulado.

## Checklist Pedagogico

Conteudo novo deve ser reprovado se:

- tiver apenas definicao curta;
- nao explicar por que o conceito importa;
- nao mostrar quando usar e quando nao usar;
- nao tiver exemplo simplificado;
- nao tiver passo a passo;
- nao tiver erro comum;
- nao indicar como isso pode aparecer em prova;
- nao tiver exercicio ou criterio de dominio.

## Checklist De Ciberseguranca

Conteudo novo deve ser reprovado se:

- mencionar cliente real, projeto real ou informacao interna;
- incluir token, chave, endpoint privado, log ou screenshot sensivel;
- ensinar automacao destrutiva sem gate;
- sugerir bypass de politica corporativa;
- permitir que conteudo externo vire instrucao confiavel;
- omitir confirmacao humana para acao sensivel;
- copiar material protegido em vez de criar resumo autoral com fonte.

## Como Avaliar Uma Contribuicao De Aula

Use esta rubrica:

| Criterio | Nota 0 | Nota 1 | Nota 2 |
| --- | --- | --- | --- |
| Profundidade | frase curta | explica conceito | explica conceito, criterio e trade-off |
| Pratica | sem exercicio | exercicio superficial | passo a passo aplicavel |
| Clareza | jargao solto | parcialmente claro | claro para iniciante e util para tecnico |
| Seguranca | ignora risco | cita risco | inclui controle pratico |
| Navegacao | arquivo isolado | linkado parcialmente | linkado na academia/sidebar quando aplicavel |

Uma aula so deve entrar como pronta quando soma pelo menos 8 de 10.
