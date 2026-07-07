# Recursos Externos Curados

Use esta lista como complemento. Fontes oficiais têm prioridade. Repositórios
comunitários servem para treino, exemplos e comparação, mas podem conter erros
ou estar desatualizados.

## Oficiais / fonte de verdade

| Recurso | Use para | Link |
|---|---|---|
| Anthropic Academy | cursos oficiais e learning path | https://anthropic.skilljar.com/ |
| Claude Code overview | visão geral do Claude Code agentic | https://docs.anthropic.com/en/docs/claude-code/overview |
| Claude Agent SDK | Agent SDK, tools, hooks, subagents, sessions | https://docs.anthropic.com/en/docs/claude-code/sdk |
| Agent SDK Python | exemplos e API Python | https://github.com/anthropics/claude-agent-sdk-python |
| Tool use | tools, schema e `tool_choice` | https://docs.anthropic.com/en/docs/build-with-claude/tool-use/overview |
| Structured outputs | conformidade de JSON/schema | https://docs.anthropic.com/en/docs/test-and-evaluate/strengthen-guardrails/increase-consistency |
| Claude Code skills | skills e padrões de extensão | https://docs.anthropic.com/en/docs/claude-code/skills |
| Claude Code subagents | subagentes e isolamento de contexto | https://docs.anthropic.com/en/docs/claude-code/sub-agents |
| Claude Code hooks | enforcement determinístico e automação | https://docs.anthropic.com/en/docs/claude-code/hooks-guide |
| MCP spec | tools, resources e prompts | https://modelcontextprotocol.io/specification |
| MCP TypeScript SDK | MCP em Node/TS | https://github.com/modelcontextprotocol/typescript-sdk |
| MCP Python SDK | MCP em Python | https://github.com/modelcontextprotocol/python-sdk |
| MCP reference servers | exemplos educacionais de servidores MCP | https://github.com/modelcontextprotocol/servers |
| Anthropic skills repo | exemplos reais de `SKILL.md` | https://github.com/anthropics/skills |

## Comunidade - certificação

| Recurso | Pontos fortes | Cuidado |
|---|---|---|
| paullarionov/claude-certified-architect | guia multilíngue, popular, prático | não é oficial; não usar como única fonte |
| daronyondem/claude-architect-exam-guide | guia orientado a tradeoffs; bom para arquitetura | validar detalhes técnicos na documentação oficial |
| hamzafarooq/claude-certified-architect | cheat sheets e prática em HTML | simulados comunitários podem divergir do exame real |
| OlivierAlter/Claude-Certified-Architect-Foundations-Certification-Exam | prática scenario-based e skill interativa | cuidado com "reverse-engineered"; use para treino, não decore |
| claudecertificationguide.com | currículo, mock exam e drills sem login | independente; verificar contra docs oficiais |
| Tutorials Dojo CCA-F guide | visão executiva por domínio | parte do conteúdo é marketing de practice exams |
| GitHub topic `claude-certified-architect` | encontrar novos study plans e simulados | qualidade varia muito |

Links:

- https://github.com/paullarionov/claude-certified-architect
- https://github.com/daronyondem/claude-architect-exam-guide
- https://github.com/hamzafarooq/claude-certified-architect
- https://github.com/OlivierAlter/Claude-Certified-Architect-Foundations-Certification-Exam
- https://claudecertificationguide.com/
- https://tutorialsdojo.com/cca-f-claude-certified-architect-foundations-study-guide/
- https://github.com/topics/claude-certified-architect

## Comunidade - Claude Code, skills e subagents

| Recurso | Use para |
|---|---|
| awesome-claude-code | índice amplo de recursos, patterns e ferramentas |
| awesome-claude-skills | inspiração para skills, comandos e extensões |
| awesome-claude-code-subagents | exemplos de subagentes por função |
| anthropics/skills | referência mais confiável para estrutura de skills |

Links:

- https://github.com/hesreallyhim/awesome-claude-code
- https://github.com/travisvn/awesome-claude-skills
- https://github.com/VoltAgent/awesome-claude-code-subagents
- https://github.com/anthropics/skills

## Como avaliar um repo

Use esta checklist antes de confiar:

- Último commit recente?
- README explica escopo e limitações?
- Cita documentação oficial?
- Tem licença?
- Não promete "questões reais" ou dump de prova?
- Diferencia MCP tools, resources e prompts?
- Usa guardrails determinísticos para compliance?
- Exemplos rodam localmente?
- Não incentiva vazamento de material confidencial?

## Prioridade recomendada

1. Exam guide oficial local.
2. Docs oficiais da Anthropic/MCP.
3. Labs deste repo.
4. `daronyondem` para consolidar julgamento arquitetural.
5. `hamzafarooq` ou `OlivierAlter` para treino de questões.
6. `paullarionov` e `claudecertificationguide.com` para revisão rápida.
