
## Prototipação de Alta Fidelidade (HTML5 + CSS3 Estático)

- Layout responsivo (mobile e desktop) construído exclusivamente com **HTML5 e CSS3 puros (sem JavaScript e sem React)**.
- Navegação entre todas as telas e modais da prototipação utilizando seletores nativos do CSS (`:target` e `:has()`).
- Telas contempladas: **Login**, **Cadastro**, **Início (Dashboard)**, **Nova Consulta**, **Calendário**, **Histórico** e **Perfil**, além dos modais de **Detalhes da Consulta**, **Conflito de Horário**, **Confirmação de Agendamento**, **Exclusão**, **Adição de Anexo** e **Permissões**.

# Projeto de Experiência do Usuário

Projeto apresentado ao Centro Universitário [FEI](https://portal.fei.edu.br/), como parte dos requisitos necessários para aprovação na disciplina de Experiência do Usuário (CCP310) do curso de Ciência da Computação, orientado pelo Prof. Dr. [Fagner de Assis Moura Pimentel](http://lattes.cnpq.br/6747210702910392).

Este projeto é desenvolvido pelos seguintes alunos:

- Gustavo Aparecido Amaro Souza
- João Pedro de Souza Lima
- Luan Salandini Troccoli

## Executar a aplicação Saúde+

A prototipação de alta fidelidade está implementada de forma **100% estática em HTML5 e CSS3 puros (sem JavaScript e sem React)**.

### Como abrir o protótipo

1. Basta abrir o arquivo `index.html` diretamente em qualquer navegador (duplo clique no arquivo); **ou**
2. Utilizar a extensão **Live Server** no VS Code.

### Telas e fluxos navegáveis no protótipo estático
- **Login e Cadastro** (`#login` e `#cadastro`).
- **Início (`#inicio`):** Resumo da próxima consulta, rota no Google Maps, alerta de retorno de 6 meses e atalhos rápidos.
- **Nova Consulta (`#nova-consulta`):** Formulário completo com anexação de guia e visualização dos modais de **Consulta agendada (`#sucesso`)** e **Conflito de horário (`#conflito`)**.
- **Calendário (`#calendario`):** Grade mensal de outubro de 2026 e lista de compromissos do período.
- **Histórico (`#historico`):** Consultas passadas, detalhes com download demonstrativo de anexos (`#detalhes-historico`) e modal de **Adicionar novo anexo (`#adicionar-anexo`)**.
- **Perfil (`#perfil`):** Dados do titular, familiares acompanhados, preferências de lembretes e modais de **Editar perfil (`#editar-perfil`)**, **Adicionar familiar (`#adicionar-familiar`)** e **Permissões (`#permissoes`)**.

## Conhecendo o problema

### Sobre o Produto

**Breve Descrição**
O Saúde+ é uma aplicação web responsiva (Single Page Application) focada em centralizar e simplificar a gestão da rotina de saúde. A plataforma atua como um assistente pessoal virtual para o paciente, consolidando marcações, informações clínicas e lembretes em um ambiente único e intuitivo.

**Objetivo**
O objetivo principal é auxiliar os pacientes a organizarem os seus compromissos médicos de forma eficiente, prevenindo o agendamento de especialidades diferentes no mesmo dia com conflitos de horário ou distâncias inviáveis, além de mitigar o esquecimento das consultas.

**Usuário Final**
O público-alvo é composto por pacientes jovens e adultos (como estudantes e jovens profissionais) que buscam autonomia para gerenciar os seus próprios agendamentos e valorizam interfaces visuais e alertas proativos para manterem a sua rotina organizada sem esforço cognitivo.

**Principais Benefícios para o Usuário**
- **Prevenção de Conflitos:** Evita a sobreposição de horários e o agendamento em localidades muito distantes para o mesmo dia.
- **Redução de Faltas:** Uma régua de alertas inteligente (1 mês, 15 dias, 7 dias, 3 dias e 1 dia antes) garante que o paciente não perca o compromisso.
- **Acessibilidade e Familiaridade:** Interface de calendário otimizada que simula as agendas nativas dos smartphones, reduzindo a curva de aprendizado a zero.
- **Centralização:** Todo o histórico e detalhes da marcação (médico, especialidade, local) disponíveis em um só lugar.

**Funcionalidades do Aplicativo**
- Cadastro de usuários e histórico médico.
- Agendamento de consultas.
- Dashboard com calendário.
- Configuração de lembretes.

**Tecnologias e Ferramentas Computacionais Utilizadas**
- **Front-end:** HTML5 e CSS3 (prototipação estática de alta fidelidade).
- **Estilização e UI:** Tailwind CSS, Bootstrap e frameworks do W3Schools para garantir uma interface ágil, responsiva e moderna.
- **Recursos Nativos via Browser:** Web Push API (para envio de notificações e lembretes) e Geolocation API (para validação de localidade e distâncias).
- **Persistência de Dados (Mock):** Como o escopo do projeto é exclusivamente focado na Experiência do Usuário (UX) e Front-End, a simulação do armazenamento de dados e do histórico médico será feita localmente utilizando o estado da aplicação e o `LocalStorage` do navegador, dispensando a necessidade de um backend real.
- **Ferramentas de UX/UI:** Figma (para criação de protótipos em papel e de alta fidelidade) e análise de tarefas HTA/GOMS para modelagem da experiência.

**Contexto de Uso**
O sistema é acessado primordialmente através de navegadores móveis (smartphones), inserindo-se no cotidiano dinâmico do usuário. A interação ocorre frequentemente em momentos de pausa ou deslocamento, quando o usuário precisa consultar rapidamente a disponibilidade da sua agenda para confirmar uma nova consulta ou verificar o endereço e a especialidade do seu próximo compromisso médico. Requer conexão à internet para a simulação de sincronização de dados e disparo de alertas.

## Desenvolvimento

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
