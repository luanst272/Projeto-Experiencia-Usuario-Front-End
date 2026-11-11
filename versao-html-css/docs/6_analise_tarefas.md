# Análise de Tarefas

Com base no comportamento das personas primárias e secundárias, modelamos formalmente as tarefas que resolvem as principais dores mapeadas na etapa de Descoberta. Para cobrir as necessidades de agendamento, gestão de documentos e compartilhamento familiar, selecionamos 4 funcionalidades essenciais, detalhadas a seguir nos formatos HTA e GOMS.

---

### HTA — Agendar uma nova consulta com anexo

**Funcionalidade:** Permitir que o usuário registre uma nova consulta médica e já anexe uma foto da guia de exames de papel para centralizar o histórico (foco na persona Giselle).

**0. Registrar nova consulta com anexo**
Plano 0 (1>2>3>4): iniciar o processo, preencher os dados, anexar o documento e, por fim, salvar o agendamento — nessa ordem.

*   **1.** Iniciar novo agendamento
*   **2.** Preencher os dados da consulta
    *   Plano 2 (1+2+3): especialidade, data e horário podem ser preenchidos no formulário em qualquer ordem.
    *   **2.1** Selecionar especialidade
    *   **2.2** Definir data
    *   **2.3** Definir horário
*   **3.** Anexar a guia médica
    *   Plano 3 (1/2): o usuário escolhe capturar a foto na hora com a câmera ou buscar uma imagem salva na galeria — não ambos.
    *   **3.1** Capturar foto com a câmera
    *   **3.2** Selecionar imagem da galeria
*   **4.** Salvar o agendamento

---

### HTA — Compartilhar informações da consulta com familiar

**Funcionalidade:** Permitir que o usuário compartilhe os detalhes de um agendamento com um membro da família para auxílio no acompanhamento (foco na persona Roberto).

**0. Compartilhar os detalhes de uma consulta**
Plano 0 (1>2>3): selecionar a consulta desejada, escolher o meio de compartilhamento e confirmar a ação — nessa ordem.

*   **1.** Selecionar a consulta na agenda
*   **2.** Escolher o meio de compartilhamento
    *   Plano 2 (1/2): o usuário envia o convite dentro do próprio ecossistema do app ou gera um link externo via WhatsApp — não ambos.
    *   **2.1** Buscar e adicionar usuário cadastrado no app
    *   **2.2** Gerar e enviar link de acesso pelo WhatsApp
*   **3.** Confirmar o compartilhamento

---

### GOMS — Visualizar detalhes e endereço de uma consulta próxima

**Funcionalidade:** Permitir que o usuário acesse as informações essenciais (horário e endereço) de uma consulta iminente e trace a rota, minimizando a carga cognitiva (foco na persona Lucas).

**GOAL 0: visualizar detalhes e o endereço da consulta oftalmológica**

  **GOAL 1: acessar a tela de detalhes da consulta**

    **METHOD 1.A: acessar diretamente pela notificação**
    (SEL. RULE: o usuário recebeu o alerta automático de véspera de consulta no celular)
      OP. 1.A.1: tocar na notificação de lembrete
      OP. 1.A.2: aguardar o aplicativo abrir diretamente na tela da consulta

    **METHOD 1.B: navegar pela aba de calendário**
    (SEL. RULE: o aplicativo já está aberto ou o usuário não interagiu com a notificação a tempo)
      OP. 1.B.1: tocar na aba "Calendário"
      OP. 1.B.2: localizar o evento no calendário
      OP. 1.B.3: tocar no evento para expandir os detalhes

  **GOAL 2: acionar a rota de navegação**
    **METHOD 2.A: abrir o endereço no mapa externo**
      OP. 2.A.1: tocar no botão "Ver Rota"
      OP. 2.A.2: confirmar a abertura no Google Maps/Waze

---

### GOMS — Adicionar resultado de exame a uma consulta já realizada

**Funcionalidade:** Permitir que o usuário arquive um resultado de exame recebido digitalmente em um registro de consulta passada, mantendo o histórico centralizado.

**GOAL 0: anexar resultado de exame na consulta de Dermatologia**

  **GOAL 1: localizar a consulta no histórico**

    **METHOD 1.A: utilizar a barra de pesquisa**
    (SEL. RULE: o usuário tem um histórico extenso e prefere digitar o nome do médico ou especialidade para poupar tempo)
      OP. 1.A.1: tocar no ícone de lupa
      OP. 1.A.2: digitar "Dermatologia"
      OP. 1.A.3: tocar na consulta correspondente nos resultados

    **METHOD 1.B: rolar manualmente o histórico**
    (SEL. RULE: a consulta foi realizada recentemente e está no topo da lista)
      OP. 1.B.1: tocar na aba "Histórico"
      OP. 1.B.2: rolar a tela até encontrar a data do evento
      OP. 1.B.3: tocar no card da consulta

  **GOAL 2: arquivar o documento**
    **METHOD 2.A: fazer upload do PDF ou imagem**
      OP. 2.A.1: tocar no botão "Adicionar novo anexo"
      OP. 2.A.2: selecionar o arquivo no armazenamento do celular
      OP. 2.A.3: tocar em "Salvar alterações"
