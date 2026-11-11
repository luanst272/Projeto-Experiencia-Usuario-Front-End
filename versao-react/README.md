# MedFEI · Saúde+ (Versão 2: HTML5 + CSS3 + JavaScript + React)

Esta pasta contém a **segunda versão evolutiva** do protótipo de alta fidelidade do **MedFEI · Saúde+**, desenvolvida com **HTML5, CSS3, JavaScript (ES6+) e React 18 (Vite)**, mantendo exatamente a mesma identidade visual, fluxos e proposta de Experiência do Usuário da versão estática, mas transformando a interface em uma **Single Page Application (SPA) 100% dinâmica e funcional**.

Projeto apresentado ao Centro Universitário [FEI](https://portal.fei.edu.br/), na disciplina de Experiência do Usuário (CCP310) do curso de Ciência da Computação, orientado pelo Prof. Dr. [Fagner de Assis Moura Pimentel](http://lattes.cnpq.br/6747210702910392).

**Integrantes do grupo:**
- Gustavo Aparecido Amaro Souza
- João Pedro de Souza Lima
- Luan Salandini Troccoli

---

## Como executar a versão React

1. Abra o terminal na pasta `versao-react`:
   ```bash
   cd versao-react
   npm install
   npm run dev
   ```
2. Acesse o endereço exibido no terminal (geralmente `http://localhost:5173`).

**Credenciais demonstrativas pré-configuradas:**
- **E-mail:** `giselle.souza@email.com`
- **Senha:** `12345678`

---

## O que mudou em relação à Versão 1 (Apenas HTML + CSS)

| Recurso / Fluxo | Versão 1 (`versao-html-css` — HTML5 + CSS3) | Versão 2 (`versao-react` — HTML + CSS + JS + React) |
| :--- | :--- | :--- |
| **Arquitetura** | Documento único estático (`index.html` + `src/styles.css`). | Componentização modular em React (`App.jsx`, `DashboardView`, `NewAppointmentView`, `CalendarView`, `HistoryView`, `ProfileView`, `Modals`). |
| **Navegação e Modais** | Baseada em âncoras de URL e seletores CSS (`:target` e `:has()`). | Gerenciada via estado do React (`useState`), sem recarregar nem depender de hashes fixos. |
| **Autenticação e Contas** | Formulários visuais estáticos; clicar em "Entrar" apenas muda a âncora para `#inicio`. | Validação real de Login e Cadastro, alternância de visibilidade de senha (`◎`) e contas salvas em `localStorage`. |
| **Filtro Titular / Familiar** | Apenas alterna o estilo visual do botão via `:has(input:checked)`. | Filtra dinamicamente o card de "Próxima consulta", a agenda do Calendário e os registros do Histórico (`useMemo`). |
| **Nova Consulta e Conflitos** | Campos com valores fixos; modais de sucesso e conflito abertos por links estáticos. | Formulário controlado (`useState`) que cadastra novas consultas na agenda e **detecta automaticamente conflitos de data e horário** para o mesmo paciente. |
| **Calendário Mensal** | Grade fixa em Outubro de 2026. | Navegação dinâmica entre quaisquer meses e anos, cálculo automático dos dias do mês e filtro ao clicar em um dia específico. |
| **Busca e Histórico** | Campo de busca apenas visual; contadores fixos (`3 consultas`, `4 documentos`). | Busca em tempo real por especialidade, médico, clínica ou paciente (com atalho `⌘K`/`Ctrl+K`) e contadores calculados dinamicamente. |
| **Upload e Download de Anexos** | Links estáticos de demonstração. | Leitura real de arquivos via `FileReader` (PDF/JPG/PNG até 10 MB), inclusão dinâmica de exames no Histórico e download real. |
| **Perfil e Familiares** | Edição de perfil e adição de familiar apenas fecham o modal sem alterar a tela. | Edição real dos dados do titular e adição dinâmica de novos familiares (que passam a aparecer imediatamente no seletor de pacientes da Nova Consulta). |

---

## Estrutura de Código (`src/`)

- `src/main.jsx`: Ponto de entrada do React 18 (`createRoot`).
- `src/App.jsx`: Estado global da aplicação, sincronização com `localStorage`, autenticação e controle de telas/modais/toasts.
- `src/data/initialData.js`: Dados iniciais da persona (Giselle Souza e seu pai Sr. Carlos), consultas futuras e histórico médico.
- `src/components/AuthScreen.jsx`: Telas de Login e Cadastro com validação.
- `src/components/Navigation.jsx`: `Sidebar` (desktop), `Topbar` (com contador dinâmico de lembretes) e `MobileNav` (barra inferior mobile).
- `src/components/DashboardView.jsx`: Tela de Início com alternância dinâmica entre Titular e Familiar.
- `src/components/NewAppointmentView.jsx`: Formulário de agendamento com upload de guia e detecção de conflitos.
- `src/components/CalendarView.jsx`: Calendário interativo com troca de mês/ano, seleção de dia e filtros combinados.
- `src/components/HistoryView.jsx`: Histórico com busca em tempo real e contadores dinâmicos de documentos.
- `src/components/ProfileView.jsx`: Gestão de perfil, dependentes e preferências de alertas.
- `src/components/Modals.jsx`: Todos os 9 modais da aplicação renderizados dinamicamente a partir do estado do React.
