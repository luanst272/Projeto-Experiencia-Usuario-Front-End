import React, { useState, useEffect } from 'react';
import { SPECIALTIES } from '../data/initialData';
import {
  CalendarCheckIcon,
  CheckCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  FileTextIcon,
  PaperclipIcon,
  ShieldCheckIcon,
  TrashIcon,
} from './Icons';

const DEFAULT_DEMO_FILE = {
  id: 'demo-att-dermato',
  name: 'guia_encaminhamento_dermato.pdf',
  type: 'PDF',
  size: '540 KB',
  dataUrl:
    'data:text/plain;charset=utf-8,' +
    encodeURIComponent(
      'Documento demonstrativo MedFEI Saúde+ - guia_encaminhamento_dermato.pdf'
    ),
};

export default function NewAppointmentView({
  userName,
  dependents,
  prefill,
  onBack,
  onCancel,
  onSaveAppointment,
  onPreviewConflict,
  onShowToast,
}) {
  const [specialty, setSpecialty] = useState(prefill?.specialty || 'Dermatologia');
  const [doctor, setDoctor] = useState(prefill?.doctor || 'Dra. Marina Costa');
  const [clinic, setClinic] = useState(prefill?.clinic || 'Clínica Pele & Saúde');
  const [patient, setPatient] = useState(prefill?.patient || userName);
  const [date, setDate] = useState(prefill?.date || '2026-10-28');
  const [time, setTime] = useState(prefill?.time || '14:30');
  const [address, setAddress] = useState(
    prefill?.address || 'Rua Vergueiro, 1350 · Vila Mariana, São Paulo'
  );
  const [synced, setSynced] = useState(true);
  const [attachments, setAttachments] = useState([DEFAULT_DEMO_FILE]);

  useEffect(() => {
    if (prefill) {
      if (prefill.specialty) setSpecialty(prefill.specialty);
      if (prefill.doctor) setDoctor(prefill.doctor);
      if (prefill.clinic) setClinic(prefill.clinic);
      if (prefill.address) setAddress(prefill.address);
    }
  }, [prefill]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    files.forEach((file) => {
      const ext = file.name.split('.').pop()?.toLowerCase() || '';
      if (!['pdf', 'jpg', 'jpeg', 'png'].includes(ext)) {
        onShowToast(`Formato inválido (${file.name}). Use PDF, JPG ou PNG.`);
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
        const newAtt = {
          id: `att-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
          name: file.name,
          type: ext.toUpperCase(),
          size: sizeFormatted,
          dataUrl: reader.result,
        };
        setAttachments((prev) => [...prev, newAtt]);
        onShowToast(`Anexo "${file.name}" adicionado com sucesso.`);
      };
      reader.readAsDataURL(file);
    });

    e.target.value = '';
  };

  const handleRemoveFile = (id) => {
    setAttachments((prev) => prev.filter((item) => item.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!specialty || !doctor.trim() || !date || !time || !address.trim()) {
      onShowToast('Por favor, preencha todos os campos obrigatórios (*).');
      return;
    }

    const patientType = patient === userName ? 'titular' : 'familiar';

    onSaveAppointment({
      specialty,
      doctor: doctor.trim(),
      clinic: clinic.trim() || 'Clínica Médica',
      patient,
      patientType,
      date,
      time,
      address: address.trim(),
      status: 'Confirmada',
      synced,
      attachments,
    });
  };

  return (
    <section className="view-screen">
      <button type="button" className="back-link" onClick={onBack}>
        <ChevronLeftIcon size={17} />
        Voltar
      </button>

      <div className="page-heading">
        <div>
          <div className="eyebrow">AGENDA · NOVO COMPROMISSO</div>
          <h1>Nova consulta</h1>
          <p>Preencha os dados para organizar seu atendimento.</p>
        </div>
      </div>

      <div className="form-layout">
        <form className="form-card" onSubmit={handleSubmit}>
          <div className="form-section-head">
            <span className="step-number">1</span>
            <div>
              <h2>Informações da consulta</h2>
              <p>Os campos com * são obrigatórios.</p>
            </div>
          </div>

          <div className="form-grid">
            <label>
              Especialidade *
              <select value={specialty} onChange={(e) => setSpecialty(e.target.value)}>
                <option value="">Selecione a especialidade</option>
                {SPECIALTIES.map((spec) => (
                  <option key={spec} value={spec}>
                    {spec}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Médico(a) *
              <input
                type="text"
                value={doctor}
                onChange={(e) => setDoctor(e.target.value)}
                placeholder="Nome do médico"
              />
            </label>

            <label>
              Clínica ou instituição
              <input
                type="text"
                value={clinic}
                onChange={(e) => setClinic(e.target.value)}
                placeholder="Nome da clínica"
              />
            </label>

            <label>
              Paciente
              <select value={patient} onChange={(e) => setPatient(e.target.value)}>
                <option value={userName}>{userName}</option>
                {dependents.map((dep) => (
                  <option key={dep.id} value={dep.name}>
                    {dep.name}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Data *
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </label>

            <label>
              Horário *
              <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
            </label>

            <label className="span-2">
              Local / endereço *
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Rua, número, bairro e cidade"
              />
            </label>
          </div>

          <div className="form-section-head attach-head">
            <span className="step-number">2</span>
            <div>
              <h2>Guia ou documento médico</h2>
              <p>PDF, JPG ou PNG · até 10 MB por arquivo</p>
            </div>
          </div>

          <div className="upload-box">
            <input
              id="react-file-upload"
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              multiple
              hidden
              onChange={handleFileChange}
            />
            <div className="upload-symbol">
              <PaperclipIcon size={23} />
            </div>
            <strong>Anexe sua guia médica</strong>
            <span>Selecione um arquivo do dispositivo ou tire uma foto.</span>
            <div className="upload-actions">
              <label htmlFor="react-file-upload" className="secondary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                  <circle cx="9" cy="9" r="2" />
                  <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                </svg>
                Escolher da galeria
              </label>
              <label htmlFor="react-file-upload" className="secondary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
                  <circle cx="12" cy="13" r="3" />
                </svg>
                Tirar foto
              </label>
            </div>
          </div>

          {attachments.length > 0 && (
            <div className="file-list">
              {attachments.map((file) => (
                <div className="file-row" key={file.id}>
                  <FileTextIcon size={19} />
                  <div>
                    <strong>{file.name}</strong>
                    <span>
                      {file.type} · {file.size}
                    </span>
                  </div>
                  <button
                    type="button"
                    className="file-remove-btn"
                    title="Remover arquivo"
                    onClick={() => handleRemoveFile(file.id)}
                  >
                    <TrashIcon size={15} />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="sync-row">
            <div className="sync-icon">
              <CalendarCheckIcon size={24} />
            </div>
            <div>
              <strong>Sincronizar com a agenda</strong>
              <p>Adicionar este compromisso ao calendário do dispositivo.</p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={synced}
              className={`toggle ${synced ? 'on' : ''}`}
              onClick={() => setSynced((v) => !v)}
            >
              <span />
            </button>
          </div>

          <div className="form-footer">
            <button type="button" className="secondary" onClick={onCancel}>
              Cancelar
            </button>
            <button type="button" className="secondary" onClick={onPreviewConflict}>
              Ver alerta de conflito
            </button>
            <button type="submit" className="primary">
              Salvar agendamento
              <ChevronRightIcon size={17} />
            </button>
          </div>
        </form>

        <aside className="form-aside">
          <div className="aside-icon">
            <ShieldCheckIcon size={23} />
          </div>
          <h3>Seus dados, sob seu controle</h3>
          <p>
            Os documentos ficam associados à consulta para você encontrá-los quando precisar.
          </p>
          <div className="aside-divider" />
          <div className="aside-tip">
            <CheckCircleIcon size={17} />
            <span>Confira data, horário e endereço antes de salvar.</span>
          </div>
          <div className="aside-tip">
            <CheckCircleIcon size={17} />
            <span>
              Se houver outra consulta no mesmo dia e horário, o sistema detecta o conflito
              automaticamente.
            </span>
          </div>
          <div className="aside-tip">
            <CheckCircleIcon size={17} />
            <span>Você pode adicionar outros exames depois pelo Histórico.</span>
          </div>
        </aside>
      </div>
    </section>
  );
}
