# Requisitos de UX e Metas de Usabilidade

### 1. Características da Plataforma

| Característica | Descrição |
| :--- | :--- |
| **Descrição do Software** | Protótipo Web Responsivo de Alta Fidelidade desenvolvido em HTML5 e CSS3 estático, acessível e otimizado tanto para navegadores desktop quanto para dispositivos móveis. |
| **Descrição do Hardware** | Dispositivos de uso geral (smartphones, tablets, notebooks e desktops) equipados com tela (sensível ao toque ou interativa via mouse/teclado) e capacidade de processamento padrão para navegação web. |
| **Capacidades da Plataforma** | - Adaptação automática ao fuso horário do sistema operacional do dispositivo via browser.<br>- Acesso à localização em tempo real via Geolocation API.<br>- Disparo de alertas através de Web Push Notifications. |
| **Restrições da Plataforma** | - Dependência de conexão contínua com a internet para sincronização de agendas médicas e envio de notificações.<br>- Necessidade de permissão explícita (opt-in) concedida pelo usuário no navegador para habilitar o uso de localização e o recebimento de alertas. |

### 2. Princípios Gerais do Projeto

| Nome | Descrição | Link |
| :--- | :--- | :--- |
| **Lei Geral de Proteção de Dados (LGPD) - Lei n.º 13.709/2018** | A LGPD é a legislação brasileira que regulamenta o tratamento de dados pessoais no Brasil. É importante para o projeto porque estabelece regras sobre como os dados dos usuários devem ser coletados, armazenados, processados e protegidos, garantindo sua privacidade e segurança. | https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm |
| **Lei n.º 10.098/2000 - Lei da Acessibilidade** | Esta lei brasileira estabelece normas gerais e critérios básicos para a promoção da acessibilidade das pessoas com deficiência ou com mobilidade reduzida. É importante para o projeto porque define diretrizes para tornar produtos e serviços, incluindo interfaces de usuário, acessíveis a todos os usuários, independentemente de suas habilidades físicas ou cognitivas. | https://www.planalto.gov.br/ccivil_03/leis/l10098.htm |
| **ABNT NBR ISO 9241 Ergonomia da interação humano-sistema** | Esta série de normas brasileiras, baseadas nas normas ISO 9241, fornece diretrizes e orientações para o design centrado no usuário de sistemas interativos, incluindo a concepção de interfaces de usuário. A parte 210 aborda o processo de design centrado no humano, enquanto a parte 11 fornece orientações específicas sobre usabilidade. Essas normas são importantes para o projeto porque estabelecem princípios e métodos para garantir que a interface do usuário atenda às necessidades e expectativas dos usuários. | https://www.inf.ufsc.br/~edla.ramos/ine5624/_Walter/Normas/Parte%2011/iso9241-11F2.pdf |
| **Prevenção de Erros** | O sistema deve alertar de forma proativa ou bloquear o usuário caso ele tente marcar consultas em horários conflitantes ou em localidades com distância inviável. | - |
| **Visibilidade do Status do Sistema** | O usuário deve receber *feedbacks* visuais imediatos e claros de que a consulta foi confirmada, alterada ou cancelada com sucesso. | - |

### 3. Metas de Usabilidade

**Qualitativas**
* O fluxo de agendamento deve transmitir segurança, e o dashboard do calendário deve ser visualmente limpo e intuitivo para evitar interpretações equivocadas de datas.
* A interface do calendário web deve apresentar familiaridade estrutural com as agendas nativas de smartphones para minimizar a curva de aprendizado.

**Quantitativas**

| Metas | Porcentagem | Justificativa |
| :--- | :--- | :--- |
| **Facilidade de aprendizado** | 30% | O usuário deve conseguir realizar seu primeiro agendamento em menos de 2 minutos, garantindo que pacientes com pouca familiaridade tecnológica utilizem a ferramenta sem frustração. |
| **Eficiência** | 40% | Agendar uma consulta de retorno ou acessar a disponibilidade de um médico deve exigir no máximo 4 cliques, otimizando a tarefa mais repetitiva do sistema. |
| **Prevenção de Erros** | 30% | A taxa de sucesso do sistema ao bloquear agendamentos duplos e emitir o aviso de conflito de localidade deve ser de 100%, resolvendo a dor principal mapeada nas personas. |
| **Total** | **100%** | |
