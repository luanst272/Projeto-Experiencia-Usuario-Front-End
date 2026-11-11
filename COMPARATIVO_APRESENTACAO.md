# Roteiro Comparativo para Apresentação — MedFEI · Saúde+

Este documento resume **o que mudou da Versão 1 (HTML + CSS) para a Versão 2 (HTML + CSS + JavaScript + React)**, mantendo **exatamente a mesma ideia de produto, identidade visual e fluxos de UX** do projeto **MedFEI · Saúde+**.

---

## 1. Visão Geral das Duas Versões

1. **Versão 1 — Prototipação Estática (`versao-html-css/`)**
   - **Tecnologias:** Apenas **HTML5 e CSS3 puros** (zero JavaScript).
   - **Como funciona:** Utiliza seletores modernos do CSS (`:target` e `:has(input:checked)`) para permitir navegar entre todas as 7 telas e 9 modais do protótipo e alternar estados visuais de botões/switches.
   - **Papel no projeto:** Validar o layout responsivo (Mobile e Desktop), a hierarquia visual, a arquitetura de informação e o fluxo de telas exatamente como desenhado no Figma.

2. **Versão 2 — Aplicação Web Interativa (`versao-react/`)**
   - **Tecnologias:** **HTML5, CSS3, JavaScript (ES6+) e React 18 (Vite)**.
   - **Como funciona:** Transforma a interface estática em uma **Single Page Application (SPA)** componentizada, com estado reativo (`useState`, `useEffect`, `useMemo`), validação de formulários, filtros e buscas em tempo real e persistência no navegador (`localStorage`).
   - **Papel no projeto:** Tornar todas as regras de negócio e metas de usabilidade (prevenção de conflitos de horário, centralização de guias/exames e gestão familiar) 100% funcionais.

---

## 2. O Que Mostrar na Apresentação (Passo a Passo)

### Passo 1: Login e Criação de Conta
- **Na Versão HTML + CSS:** Os campos possuem valores estáticos demonstrativos e o botão **"Entrar"** é um link (`<a href="#inicio">`) que leva ao Dashboard sem validar a senha nem criar contas reais.
- **Na Versão React + JS:**
  - O formulário valida e-mail/nome e senha, possui botão funcional para mostrar/ocultar a senha (`◎`) e permite **criar uma nova conta** em `#cadastro` (que já abre o onboarding de permissões iniciais e fica salva no `localStorage`).

### Passo 2: Tela Início (Dashboard) — Filtro Titular vs. Familiar
- **Na Versão HTML + CSS:** Clicar em **Titular** ou **Familiar** muda apenas a cor da pílula selecionada via CSS, mas o card de "Próxima consulta" continua exibindo sempre a consulta fixa da Giselle (Oftalmologia).
- **Na Versão React + JS:**
  - Ao clicar em **Titular**, exibe a próxima consulta da **Giselle Souza** (*Oftalmologia · Dra. Ana Ribeiro · 21 de out*).
  - Ao clicar em **Familiar**, o React filtra o estado dinamicamente e passa a exibir a próxima consulta do **Sr. Carlos** (*Cardiologia · Dr. André Lima · 26 de out*).
  - Clicar em qualquer compromisso da lista "Próximos compromissos" abre o modal de detalhes **daquela consulta específica** (e não um modal estático fixo).

### Passo 3: Nova Consulta e Prevenção de Conflitos de Horário (Meta Central de UX)
- **Na Versão HTML + CSS:** O formulário não salva novos dados; há dois botões separados (`Ver alerta de conflito` e `Salvar agendamento`) para demonstrar visualmente os dois modais estáticos (`#conflito` e `#sucesso`).
- **Na Versão React + JS:**
  - O formulário é controlado pelo estado do React e permite anexar arquivos reais (`PDF`, `JPG`, `PNG` até 10 MB) ou remover anexos.
  - **Detecção automática de conflito:** Se o usuário tentar agendar uma consulta na mesma data e horário de outra já existente para o mesmo paciente (ex.: *Giselle Souza em 21/10/2026 às 10:00*), o sistema **bloqueia o agendamento automaticamente** e exibe o modal de **Conflito de Horário** apontando qual consulta já ocupa aquele horário.
  - Quando agendada em um horário livre, a nova consulta é salva no estado e no `localStorage`, aparecendo imediatamente no **Calendário** e no **Início**.

### Passo 4: Calendário Interativo e Filtros
- **Na Versão HTML + CSS:** O calendário é fixo em **Outubro de 2026**, os botões de dias são apenas visuais e a barra de busca não filtra a lista.
- **Na Versão React + JS:**
  - As setas `<` e `>` navegam entre **qualquer mês e ano**, recalculando dinamicamente os dias da grade e os indicadores azuis (`has-event`).
  - **Clicar em um dia do calendário** (ex.: dia `21`, `23` ou `26`) filtra a lista lateral para mostrar apenas as consultas daquele dia (com botão para voltar a ver o mês todo).
  - O seletor **Todos / Titular / Familiar** e o campo **Buscar consulta...** filtram os compromissos em tempo real.

### Passo 5: Histórico de Consultas e Upload de Novos Exames
- **Na Versão HTML + CSS:** Os contadores (`3 consultas`, `4 documentos`) são textos fixos e todas as consultas abrem o mesmo modal demonstrativo de Dermatologia.
- **Na Versão React + JS:**
  - A barra de pesquisa filtra instantaneamente por especialidade ou médico (e suporta o atalho de teclado `Ctrl + K` / `⌘ + K`).
  - Clicar em cada card do histórico abre os detalhes reais daquela consulta (*Dermatologia*, *Cardiologia do Sr. Carlos* ou *Oftalmologia*).
  - Dentro dos detalhes do histórico, clicar em **"Adicionar novo anexo"** permite anexar novos arquivos àquela consulta realizada, atualizando imediatamente o contador total de documentos arquivados.

### Passo 6: Perfil, Edição de Dados e Novos Familiares
- **Na Versão HTML + CSS:** Os modais de **Editar perfil** e **Adicionar familiar** são apenas visuais.
- **Na Versão React + JS:**
  - **Editar perfil:** Altera em tempo real o nome do titular, tipo sanguíneo, alergias e telefone (refletindo na barra lateral, no topo e nas consultas).
  - **Adicionar familiar:** Cadastra um novo dependente (ex.: *Dona Helena — Mãe*), que passa a aparecer na lista do Perfil e também no `<select>` de pacientes da tela de **Nova Consulta**.
  - **Preferências e Permissões:** Todas as chaves (Push, WhatsApp, Sincronização de Agenda e Antecedência de Avisos) disparam feedbacks visuais (*Toast*) e ficam salvas no navegador.
