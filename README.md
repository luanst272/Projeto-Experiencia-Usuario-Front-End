# Projeto de Experiência do Usuário — MedFEI · Saúde+

Projeto apresentado ao Centro Universitário [FEI](https://portal.fei.edu.br/), como parte dos requisitos necessários para aprovação na disciplina de Experiência do Usuário (CCP310) do curso de Ciência da Computação, orientado pelo Prof. Dr. [Fagner de Assis Moura Pimentel](http://lattes.cnpq.br/6747210702910392).

**Desenvolvido pelos alunos:**
- Gustavo Aparecido Amaro Souza
- João Pedro de Souza Lima
- Luan Salandini Troccoli

---

## Duas Versões do Projeto (Comparativo de Evolução Front-End)

Para demonstrar a evolução técnica mantendo **exatamente a mesma ideia de produto, identidade visual e fluxos de UX**, este repositório disponibiliza **duas versões completas** do **MedFEI · Saúde+**:

| Versão | Pasta | Tecnologias | Descrição |
| :--- | :--- | :--- | :--- |
| **Versão 1 (Estática)** | [`./versao-html-css/`](./versao-html-css/) | **HTML5 + CSS3 puros** | Protótipo de alta fidelidade 100% estático (zero JavaScript), navegável via seletores CSS `:target` e `:has()`. |
| **Versão 2 (Interativa)** | [`./versao-react/`](./versao-react/) | **HTML5 + CSS3 + JavaScript + React** | Aplicação Single Page Application (SPA) completa em React + Vite, com componentização, gerenciamento de estado, detecção real de conflitos de agenda, filtros/buscas dinâmicas, upload/download de anexos e persistência em `localStorage`. |

> Consulte o arquivo [`COMPARATIVO_APRESENTACAO.md`](./COMPARATIVO_APRESENTACAO.md) para o roteiro detalhado do que mudou entre as duas versões para a apresentação.

---

## Como Executar Cada Versão

### 1. Versão HTML5 + CSS3 (`versao-html-css`)
Não requer instalação de dependências:
1. Abra o arquivo [`versao-html-css/index.html`](./versao-html-css/index.html) diretamente no navegador (duplo clique) ou com a extensão **Live Server** do VS Code.

### 2. Versão HTML5 + CSS3 + JavaScript + React (`versao-react`)
Requer Node.js instalado:
```bash
cd versao-react
npm install
npm run dev
```
Em seguida, acesse a URL local exibida no terminal (ex.: `http://localhost:5173`).
- **Conta demonstrativa:** `giselle.souza@email.com` / `12345678`

---

## Sobre o Produto (MedFEI · Saúde+)

**Breve Descrição**
O **Saúde+** é uma aplicação web responsiva focada em centralizar e simplificar a gestão da rotina de saúde. A plataforma atua como um assistente pessoal virtual para o paciente, consolidando marcações, informações clínicas, guias médicas e lembretes em um ambiente único e intuitivo.

**Objetivo**
Auxiliar os pacientes e gestores familiares a organizarem os seus compromissos médicos de forma eficiente, prevenindo o agendamento com conflitos de horário, evitando a perda de pedidos e resultados de exames em papel e mitigando o esquecimento das consultas e retornos.

**Principais Benefícios para o Usuário**
- **Prevenção de Conflitos:** Evita a sobreposição de horários para o mesmo paciente com alertas visuais imediatos.
- **Redução de Faltas:** Régua de alertas configurável (1 semana, 2 a 3 dias ou 1 dia antes) via Push e WhatsApp, além de alerta proativo de retorno (6 meses).
- **Gestão Familiar Centralizada:** Alternância rápida entre as consultas do **Titular** (ex.: Giselle Souza) e de **Familiares acompanhados** (ex.: Sr. Carlos).
- **Repositório de Guias e Exames:** Anexação e download de pedidos médicos e laudos diretamente vinculados a cada consulta futura ou passada.

---

## Documentação de UX (`docs/`)

### Descoberta
- [Análise de Concorrência](docs/1_concorrencia.md)
- [Pesquisa e Coleta de Dados com Usuários](docs/2_pesquisa_usuarios.md)
- [Perfil do Usuário](docs/3_perfil_usuario.md)
- [Personas](docs/4_personas.md)
- [Cenário de Análise/Problema](docs/5_cenarios.md)

### Definição
- [Análise de Tarefas](docs/6_analise_tarefas.md)
- [Requisitos de UX e Metas de Usabilidade](docs/7_requisitos_ux.md)
- [Arquitetura de Informação e Fluxo do Usuário](docs/8_arquitetura_fluxo.md)

### Prototipação
- [Prototipação em Papel](docs/9_prototipacao_papel.md)
- [Prototipação de Alta Fidelidade (FIGMA)](docs/10_prototipacao_figma.md)

### Avaliação
- [Planejamento da Avaliação](docs/11_planejamento_avaliacao.md)
- [Avaliação de Usabilidade através de Inspeção Heurística](docs/12_heuristica.md)
- [Teste de Usabilidade com Observação do Usuário](docs/13_teste_usabilidade.md)
