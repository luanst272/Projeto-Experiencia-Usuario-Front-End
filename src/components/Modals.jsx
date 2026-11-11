import React, { useState, useEffect } from 'react';
import { formatDateLong, formatTimeDisplay } from '../data/initialData';
import {
  CalendarCheckIcon,
  CalendarIcon,
  ChevronRightIcon,
  CloseIcon,
  ExternalDownloadIcon,
  FileTextIcon,
  MapPinIcon,
  PaperclipIcon,
  PlusIcon,
  RouteArrowIcon,
  ShareIcon,
  ShieldCheckIcon,
  TrashIcon,
} from './Icons';

export default function Modals({
  activeModal,
  selectedAppointment,
  selectedHistoryItem,
  conflictAppointment,
  lastCreatedAppointment,
  profile,
  preferences,
  onCloseModal,
  onOpenModal,
  onNavigate,
  onDeleteAppointment,
  onAddAttachmentsToHistory,
  onSaveProfile,
  onAddDependent,
  onUpdatePreferences,
  onShowToast,
}) {
  // State for Edit Profile modal
  const [editName, setEditName] = useState(profile?.name || '');
  const [editBlood, setEditBlood] = useState(profile?.bloodType || 'O+');
  const [editAllergies, setEditAllergies] = useState(profile?.allergies || 'Nenhuma informada');
  const [editPhone, setEditPhone] = useState(profile?.phone || '(11) 99932-1020');

  // State for Add Dependent modal
  const [depName, setDepName] = useState('');
  const [depRelation, setDepRelation] = useState('Familiar · paciente acompanhado');

  // State for Add History Attachment modal
  const [pendingHistoryFiles, setPendingHistoryFiles] = useState([]);

  useEffect(() => {
    if (activeModal === 'editar-perfil' && profile) {
      setEditName(profile.name || '');
      setEditBlood(profile.bloodType || 'O+');
      setEditAllergies(profile.allergies || 'Nenhuma informada');
      setEditPhone(profile.phone || '(11) 99932-1020');
    }
    if (activeModal === 'adicionar-familiar') {
      setDepName('');
      setDepRelation('Familiar · paciente acompanhado');
    }
    if (activeModal === 'adicionar-anexo') {
      setPendingHistoryFiles([]);
    }
  }, [activeModal, profile]);

  if (!activeModal) return null;

  const handleHistoryFileInput = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    files.forEach((file) => {
      const ext = file.name.split('.').pop()?.toLowerCase() || '';
      if (!['pdf', 'jpg', 'jpeg', 'png'].includes(ext)) {
        onShowToast(`Formato não suportado (${file.name}). Use PDF, JPG ou PNG.`);
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        onShowToast(`O arquivo ${file.name} excede o limite de 10 MB.`);
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        const sizeKb = Math.max(1, Math.round(file.size / 1024));
        const sizeFormatted =
          sizeKb >= 1024 ? `${(sizeKb / 1024).toFixed(1)} MB` : `${sizeKb} KB`;
        setPendingHistoryFiles((prev) => [
          ...prev,
          {
            id: `hatt-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
            name: file.name,
            type: ext.toUpperCase(),
            size: sizeFormatted,
            dataUrl: reader.result,
          },
        ]);
      };
      reader.readAsDataURL(file);
    });

    e.target.value = '';
  };

  // 1. Modal Detalhes da Consulta Futura
  if (activeModal === 'detalhes' && selectedAppointment) {
    const apt = selectedAppointment;
    const attachments = apt.attachments || [];
    const shareText = `Olá! Consulta de ${apt.specialty} com ${apt.doctor} (${apt.patient}) em ${formatDateLong(
      apt.date
    )} às ${formatTimeDisplay(apt.time)}. Local: ${apt.address}`;

    return (
      <div className="modal-backdrop" onClick={onCloseModal}>
        <div
          className="modal-card"
          role="dialog"
          aria-modal="true"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-header">
            <div>
              <div className="eyebrow">DETALHES DO COMPROMISSO</div>
              <h2>Detalhes da consulta</h2>
            </div>
            <button
              type="button"
              className="icon-button"
              aria-label="Fechar"
              onClick={onCloseModal}
            >
              <CloseIcon size={24} />
            </button>
          </div>
          <span className="pill-blue">{apt.specialty}</span>
          <h3 className="detail-doctor">{apt.doctor}</h3>
          <p className="detail-clinic">
            {apt.clinic} · {apt.patient}
          </p>
          <div className="detail-box">
            <div>
              <CalendarIcon size={24} />
              <span>
                <small>Data e horário</small>
                <strong>
                  {formatDateLong(apt.date)} · {formatTimeDisplay(apt.time)}
                </strong>
              </span>
            </div>
            <div>
              <MapPinIcon size={24} />
              <span>
                <small>Endereço</small>
                <strong>{apt.address}</strong>
              </span>
            </div>
            <div>
              <CalendarCheckIcon size={24} />
              <span>
                <small>Calendário</small>
                <strong>
                  {apt.synced ? 'Sincronizada com a agenda' : 'Não sincronizada'}
                </strong>
              </span>
            </div>
          </div>

          <h4 className="attachments-heading">
            Documentos · {attachments.length}{' '}
            {attachments.length === 1 ? 'anexo' : 'anexos'}
          </h4>
          {attachments.length === 0 ? (
            <p className="muted-paragraph">Nenhum documento anexado a esta consulta.</p>
          ) : (
            attachments.map((file) => (
              <a
                key={file.id}
                href={file.dataUrl}
                download={file.name}
                className="file-row saved-file downloadable-file"
                onClick={() => onShowToast(`Baixando ${file.name}...`)}
              >
                <FileTextIcon size={24} />
                <div>
                  <strong>{file.name}</strong>
                  <span>
                    {file.type} · {file.size} · Toque para baixar
                  </span>
                </div>
                <ExternalDownloadIcon size={17} />
              </a>
            ))
          )}

          <div className="modal-actions">
            <a
              href={`https://wa.me/?text=${encodeURIComponent(shareText)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="secondary"
            >
              <ShareIcon size={16} />
              Compartilhar
            </a>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                apt.address
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="primary"
            >
              <RouteArrowIcon size={16} />
              Ver rota
            </a>
          </div>
          <button
            type="button"
            className="danger-button full"
            style={{ marginTop: 10 }}
            onClick={() => onOpenModal('excluir')}
          >
            <TrashIcon size={16} />
            Excluir consulta
          </button>
        </div>
      </div>
    );
  }

  // 2. Modal Detalhes de Consulta no Histórico
  if (activeModal === 'detalhes-historico' && selectedHistoryItem) {
    const item = selectedHistoryItem;
    const attachments = item.attachments || [];

    return (
      <div className="modal-backdrop" onClick={onCloseModal}>
        <div
          className="modal-card"
          role="dialog"
          aria-modal="true"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-header">
            <div>
              <div className="eyebrow">DETALHES DO COMPROMISSO</div>
              <h2>Detalhes da consulta</h2>
            </div>
            <button
              type="button"
              className="icon-button"
              aria-label="Fechar"
              onClick={onCloseModal}
            >
              <CloseIcon size={24} />
            </button>
          </div>
          <span className="pill-blue">{item.specialty}</span>
          <h3 className="detail-doctor">{item.doctor}</h3>
          <p className="detail-clinic">
            {item.clinic} · {item.patient}
          </p>
          <div className="detail-box">
            <div>
              <CalendarIcon size={24} />
              <span>
                <small>Data e horário</small>
                <strong>
                  {formatDateLong(item.date)} · {formatTimeDisplay(item.time)}
                </strong>
              </span>
            </div>
            <div>
              <MapPinIcon size={24} />
              <span>
                <small>Endereço</small>
                <strong>{item.address}</strong>
              </span>
            </div>
          </div>

          <h4 className="attachments-heading">
            Documentos · {attachments.length}{' '}
            {attachments.length === 1 ? 'anexo' : 'anexos'}
          </h4>
          {attachments.map((file) => (
            <a
              key={file.id}
              href={file.dataUrl}
              download={file.name}
              className="file-row saved-file downloadable-file"
              onClick={() => onShowToast(`Baixando ${file.name}...`)}
            >
              <FileTextIcon size={24} />
              <div>
                <strong>{file.name}</strong>
                <span>
                  {file.type} · {file.size} · Toque para baixar
                </span>
              </div>
              <ExternalDownloadIcon size={17} />
            </a>
          ))}

          <button
            type="button"
            className="secondary full add-attachment-btn"
            onClick={() => onOpenModal('adicionar-anexo')}
          >
            <PlusIcon size={16} />
            Adicionar novo anexo
          </button>
        </div>
      </div>
    );
  }

  // 3. Modal Adicionar Novo Anexo ao Histórico
  if (activeModal === 'adicionar-anexo' && selectedHistoryItem) {
    const item = selectedHistoryItem;

    return (
      <div className="modal-backdrop" onClick={onCloseModal}>
        <div
          className="modal-card"
          role="dialog"
          aria-modal="true"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-header">
            <div>
              <div className="eyebrow">HISTÓRICO · DOCUMENTOS</div>
              <h2>Adicionar novo anexo</h2>
            </div>
            <button
              type="button"
              className="icon-button"
              aria-label="Fechar"
              onClick={onCloseModal}
            >
              <CloseIcon size={24} />
            </button>
          </div>
          <p className="muted-paragraph">
            {item.specialty} · {item.patient} · {formatDateLong(item.date)}
          </p>
          <div className="upload-box compact">
            <input
              id="modal-history-file-upload"
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              multiple
              hidden
              onChange={handleHistoryFileInput}
            />
            <PaperclipIcon size={25} />
            <strong>Selecione exames ou guias</strong>
            <span>PDF, JPG ou PNG · até 10 MB</span>
            <label htmlFor="modal-history-file-upload" className="secondary">
              <PlusIcon size={16} />
              Escolher arquivos
            </label>
          </div>

          {pendingHistoryFiles.length > 0 && (
            <div className="file-list">
              {pendingHistoryFiles.map((file) => (
                <div className="file-row" key={file.id}>
                  <FileTextIcon size={18} />
                  <div>
                    <strong>{file.name}</strong>
                    <span>
                      {file.type} · {file.size}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="modal-actions">
            <button
              type="button"
              className="secondary"
              onClick={() => onOpenModal('detalhes-historico')}
            >
              Cancelar
            </button>
            <button
              type="button"
              className="primary"
              onClick={() => {
                if (pendingHistoryFiles.length === 0) {
                  const defaultResult = {
                    id: `hatt-${Date.now()}`,
                    name: `resultado_exame_${item.specialty.toLowerCase()}.pdf`,
                    type: 'PDF',
                    size: '620 KB',
                    dataUrl:
                      'data:text/plain;charset=utf-8,' +
                      encodeURIComponent(
                        `Resultado de exame (${item.specialty} - ${item.doctor})`
                      ),
                  };
                  onAddAttachmentsToHistory(item.id, [defaultResult]);
                } else {
                  onAddAttachmentsToHistory(item.id, pendingHistoryFiles);
                }
              }}
            >
              Salvar alterações
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 4. Modal Confirmação de Agendamento (#sucesso)
  if (activeModal === 'sucesso') {
    const apt = lastCreatedAppointment || {
      specialty: 'Dermatologia',
      doctor: 'Dra. Marina Costa',
      date: '2026-10-28',
      time: '14:30',
      address: 'Rua Vergueiro, 1350 · Vila Mariana, São Paulo',
      attachments: [{ name: 'guia_encaminhamento_dermato.pdf' }],
    };

    return (
      <div className="modal-backdrop" onClick={onCloseModal}>
        <div
          className="modal-card"
          role="dialog"
          aria-modal="true"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="success-mark">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="m9 12 2 2 4-4" />
            </svg>
          </div>
          <div className="eyebrow center">AGENDAMENTO CONCLUÍDO</div>
          <h2 className="center">Consulta agendada!</h2>
          <p className="center muted-paragraph">
            Sua consulta foi salva e marcada para sincronização com a agenda.
          </p>
          <div className="success-summary">
            <span className="pill-blue">{apt.specialty}</span>
            <h3>{apt.doctor}</h3>
            <p>
              {formatDateLong(apt.date)} · {formatTimeDisplay(apt.time)}
            </p>
            <p>
              <MapPinIcon size={15} />
              {apt.address}
            </p>
            {apt.attachments && apt.attachments.length > 0 && (
              <div className="file-row">
                <FileTextIcon size={17} />
                <strong>{apt.attachments[0].name}</strong>
                <span className="file-check">Salvo</span>
              </div>
            )}
          </div>
          <button
            type="button"
            className="primary full"
            onClick={() => {
              onCloseModal();
              onNavigate('calendario');
            }}
          >
            Ver no calendário
            <ChevronRightIcon size={17} />
          </button>
          <button
            type="button"
            className="text-button full"
            onClick={() => {
              onCloseModal();
              onNavigate('inicio');
            }}
          >
            Voltar ao início
          </button>
        </div>
      </div>
    );
  }

  // 5. Modal Conflito de Horário (#conflito)
  if (activeModal === 'conflito') {
    const conflict = conflictAppointment || {
      specialty: 'Oftalmologia',
      doctor: 'Dra. Ana Ribeiro',
      date: '2026-10-21',
      time: '10:00',
    };

    return (
      <div className="modal-backdrop" onClick={onCloseModal}>
        <div
          className="modal-card"
          role="dialog"
          aria-modal="true"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="warning-mark">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="29"
              height="29"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
              <path d="M12 9v4" />
              <path d="M12 17h.01" />
            </svg>
          </div>
          <div className="eyebrow center">VERIFIQUE SUA AGENDA</div>
          <h2 className="center">Conflito de horário</h2>
          <p className="center muted-paragraph">
            Você já tem uma consulta neste horário. Escolha outro horário antes de salvar.
          </p>
          <div className="conflict-box">
            <strong>Já agendada</strong>
            <h3>{conflict.specialty}</h3>
            <p>{conflict.doctor}</p>
            <span>
              {formatDateLong(conflict.date)} · {conflict.time}
            </span>
          </div>
          <button type="button" className="primary full" onClick={onCloseModal}>
            Alterar data ou horário
          </button>
          <button
            type="button"
            className="text-button full"
            onClick={() => {
              onCloseModal();
              onNavigate('calendario');
            }}
          >
            Cancelar novo agendamento
          </button>
        </div>
      </div>
    );
  }

  // 6. Modal Confirmar Exclusão (#excluir)
  if (activeModal === 'excluir' && selectedAppointment) {
    const apt = selectedAppointment;
    return (
      <div className="modal-backdrop" onClick={onCloseModal}>
        <div
          className="modal-card"
          role="dialog"
          aria-modal="true"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="warning-mark">
            <TrashIcon size={28} />
          </div>
          <h2 className="center">Excluir consulta?</h2>
          <p className="center muted-paragraph">
            A consulta de {apt.specialty} com {apt.doctor} será removida do seu perfil. Esta
            ação não pode ser desfeita.
          </p>
          <div className="modal-actions">
            <button
              type="button"
              className="secondary"
              onClick={() => onOpenModal('detalhes')}
            >
              Cancelar
            </button>
            <button
              type="button"
              className="danger-button"
              onClick={() => onDeleteAppointment(apt.id)}
            >
              Excluir consulta
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 7. Modal Editar Perfil (#editar-perfil)
  if (activeModal === 'editar-perfil') {
    return (
      <div className="modal-backdrop" onClick={onCloseModal}>
        <div
          className="modal-card"
          role="dialog"
          aria-modal="true"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-header">
            <h2>Editar perfil</h2>
            <button
              type="button"
              className="icon-button"
              aria-label="Fechar"
              onClick={onCloseModal}
            >
              <CloseIcon size={24} />
            </button>
          </div>
          <div style={{ display: 'grid', gap: 14 }}>
            <label>
              Nome completo
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
              />
            </label>
            <label>
              Tipo sanguíneo
              <input
                type="text"
                value={editBlood}
                onChange={(e) => setEditBlood(e.target.value)}
              />
            </label>
            <label>
              Alergias
              <input
                type="text"
                value={editAllergies}
                onChange={(e) => setEditAllergies(e.target.value)}
              />
            </label>
            <label>
              Contato / Telefone
              <input
                type="text"
                value={editPhone}
                onChange={(e) => setEditPhone(e.target.value)}
              />
            </label>
          </div>
          <div className="modal-actions">
            <button type="button" className="secondary" onClick={onCloseModal}>
              Cancelar
            </button>
            <button
              type="button"
              className="primary"
              onClick={() => {
                if (!editName.trim()) {
                  onShowToast('Informe um nome válido.');
                  return;
                }
                onSaveProfile({
                  name: editName.trim(),
                  bloodType: editBlood.trim() || 'O+',
                  allergies: editAllergies.trim() || 'Nenhuma informada',
                  phone: editPhone.trim() || '(11) 99932-1020',
                });
              }}
            >
              Salvar alterações
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 8. Modal Adicionar Familiar (#adicionar-familiar)
  if (activeModal === 'adicionar-familiar') {
    return (
      <div className="modal-backdrop" onClick={onCloseModal}>
        <div
          className="modal-card"
          role="dialog"
          aria-modal="true"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-header">
            <h2>Adicionar familiar</h2>
            <button
              type="button"
              className="icon-button"
              aria-label="Fechar"
              onClick={onCloseModal}
            >
              <CloseIcon size={24} />
            </button>
          </div>
          <div style={{ display: 'grid', gap: 14 }}>
            <label>
              Nome do familiar
              <input
                type="text"
                value={depName}
                onChange={(e) => setDepName(e.target.value)}
                placeholder="Nome completo (ex.: Dona Helena)"
              />
            </label>
            <label>
              Parentesco / observação
              <input
                type="text"
                value={depRelation}
                onChange={(e) => setDepRelation(e.target.value)}
                placeholder="Ex.: Mãe · paciente acompanhada"
              />
            </label>
          </div>
          <p className="muted-paragraph">
            Você poderá associar consultas a este familiar.
          </p>
          <div className="modal-actions">
            <button type="button" className="secondary" onClick={onCloseModal}>
              Cancelar
            </button>
            <button
              type="button"
              className="primary"
              onClick={() => {
                if (!depName.trim()) {
                  onShowToast('Informe o nome do familiar.');
                  return;
                }
                onAddDependent({
                  id: `dep-${Date.now()}`,
                  name: depName.trim(),
                  relation: depRelation.trim() || 'Familiar · paciente acompanhado',
                });
              }}
            >
              Adicionar familiar
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 9. Modal Permissões Iniciais (#permissoes)
  if (activeModal === 'permissoes') {
    return (
      <div className="modal-backdrop" onClick={onCloseModal}>
        <div
          className="modal-card"
          role="dialog"
          aria-modal="true"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-header">
            <div>
              <div className="eyebrow">ACESSO E PREFERÊNCIAS</div>
              <h2>Permissões iniciais</h2>
            </div>
            <button
              type="button"
              className="icon-button"
              aria-label="Fechar"
              onClick={onCloseModal}
            >
              <CloseIcon size={24} />
            </button>
          </div>
          <p className="muted-paragraph">
            Você decide o que compartilhar. Tudo é opcional e pode ser alterado no Perfil.
          </p>

          <div className="setting-row">
            <div className="setting-icon purple">
              <CalendarIcon size={24} />
            </div>
            <div>
              <strong>Sincronizar com calendário</strong>
              <span>Google ou Apple Calendar</span>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={preferences.calendarSync}
              className={`toggle ${preferences.calendarSync ? 'on' : ''}`}
              onClick={() =>
                onUpdatePreferences({ calendarSync: !preferences.calendarSync })
              }
            >
              <span />
            </button>
          </div>

          <div className="setting-row">
            <div className="setting-icon green">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2" />
              </svg>
            </div>
            <div>
              <strong>Receber alertas via WhatsApp</strong>
              <span>Lembretes no seu número</span>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={preferences.whatsapp}
              className={`toggle ${preferences.whatsapp ? 'on' : ''}`}
              onClick={() => onUpdatePreferences({ whatsapp: !preferences.whatsapp })}
            >
              <span />
            </button>
          </div>

          <div className="setting-row">
            <div className="setting-icon">
              <MapPinIcon size={24} />
            </div>
            <div>
              <strong>Permitir acesso à localização</strong>
              <span>Ajuda a traçar a rota</span>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={preferences.locationPermission}
              className={`toggle ${preferences.locationPermission ? 'on' : ''}`}
              onClick={() =>
                onUpdatePreferences({
                  locationPermission: !preferences.locationPermission,
                })
              }
            >
              <span />
            </button>
          </div>

          <div className="privacy-note">
            <ShieldCheckIcon size={18} />
            <span>
              Usamos seus dados apenas para as finalidades autorizadas. Revogue quando quiser.
            </span>
          </div>

          <button
            type="button"
            className="primary full"
            onClick={() => {
              onCloseModal();
              onShowToast('Preferências de privacidade salvas.');
            }}
          >
            Continuar com minhas escolhas
          </button>
          <button
            type="button"
            className="text-button full"
            onClick={() => {
              onUpdatePreferences(
                { calendarSync: false, whatsapp: false, locationPermission: false },
                'Permissões opcionais desativadas.'
              );
              onCloseModal();
            }}
          >
            Continuar sem permitir
          </button>
        </div>
      </div>
    );
  }

  return null;
}
