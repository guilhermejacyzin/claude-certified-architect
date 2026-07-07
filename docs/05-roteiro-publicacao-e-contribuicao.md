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
