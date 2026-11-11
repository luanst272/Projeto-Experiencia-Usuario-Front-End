import React, { useState, useMemo, useRef, useEffect } from 'react';
import { formatTimeDisplay, parseDateParts } from '../data/initialData';
import {
  ChevronRightIcon,
  ClockIcon,
  HistoryFilesIcon,
  PaperclipIcon,
  SearchIcon,
} from './Icons';

export default function HistoryView({ historyAppointments, onOpenHistoryDetails }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [patientFilter, setPatientFilter] = useState('todos'); // 'todos' | 'titular' | 'familiar'
  const searchInputRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const filteredHistory = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return historyAppointments.filter((item) => {
      if (patientFilter !== 'todos' && item.patientType !== patientFilter) {
        return false;
      }
      if (!q) return true;
      return (
        item.specialty.toLowerCase().includes(q) ||
        item.doctor.toLowerCase().includes(q) ||
        (item.clinic && item.clinic.toLowerCase().includes(q)) ||
        (item.patient && item.patient.toLowerCase().includes(q))
      );
    });
  }, [historyAppointments, searchQuery, patientFilter]);

  const totalDocsCount = useMemo(() => {
    return historyAppointments.reduce(
      (sum, item) => sum + (item.attachments ? item.attachments.length : 0),
      0
    );
  }, [historyAppointments]);

  return (
    <section className="view-screen">
      <div className="page-heading">
        <div>
          <div className="eyebrow">SEUS REGISTROS DE SAÚDE</div>
          <h1>Histórico</h1>
          <p>Encontre guias e exames junto de cada consulta.</p>
        </div>
      </div>

      <div className="history-toolbar">
        <div className="search-box">
          <SearchIcon size={18} />
          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por especialidade ou médico..."
          />
          <kbd>⌘ K</kbd>
        </div>
        <div className="segmented">
          <button
            type="button"
            className={patientFilter === 'todos' ? 'active' : ''}
            onClick={() => setPatientFilter('todos')}
          >
            Todos
          </button>
          <button
            type="button"
            className={patientFilter === 'titular' ? 'active' : ''}
            onClick={() => setPatientFilter('titular')}
          >
            Titular
          </button>
          <button
            type="button"
            className={patientFilter === 'familiar' ? 'active' : ''}
            onClick={() => setPatientFilter('familiar')}
          >
            Familiar
          </button>
        </div>
      </div>

      <div className="history-summary">
        <div>
          <span className="summary-icon">
            <HistoryFilesIcon size={24} />
          </span>
          <div>
            <strong>{historyAppointments.length} consultas</strong>
            <span>no seu histórico</span>
          </div>
        </div>
        <div>
          <span className="summary-icon lavender">
            <PaperclipIcon size={24} />
          </span>
          <div>
            <strong>{totalDocsCount} documentos</strong>
            <span>arquivados</span>
          </div>
        </div>
      </div>

      {filteredHistory.length === 0 ? (
        <div className="panel empty-state">
          <h3>Nenhuma consulta encontrada</h3>
          <p>Não encontramos registros com esse filtro ou termo de busca.</p>
          <button
            type="button"
            className="secondary"
            onClick={() => {
              setSearchQuery('');
              setPatientFilter('todos');
            }}
          >
            Limpar filtros
          </button>
        </div>
      ) : (
        <div className="history-list">
          {filteredHistory.map((item) => {
            const { day, monthShort, year } = parseDateParts(item.date);
            const attachmentCount = item.attachments ? item.attachments.length : 0;

            return (
              <button
                type="button"
                key={item.id}
                className="history-card"
                onClick={() => onOpenHistoryDetails(item)}
              >
                <div className="history-date">
                  <span>{day}</span>
                  <strong>{monthShort}</strong>
                  <small>{year}</small>
                </div>
                <div className="history-info">
                  <div className="history-title-row">
                    <span className="pill-blue">{item.specialty}</span>
                    <span className="attachment-count">
                      <PaperclipIcon size={14} />
                      {attachmentCount} {attachmentCount === 1 ? 'anexo' : 'anexos'}
                    </span>
                  </div>
                  <h3>{item.doctor}</h3>
                  <p>
                    {item.patient} · {item.clinic}
                  </p>
                  <span className="muted-line">
                    <ClockIcon size={14} />
                    {formatTimeDisplay(item.time)} · {item.status || 'Consulta realizada'}
                  </span>
                </div>
                <ChevronRightIcon size={24} className="history-chevron" />
              </button>
            );
          })}
        </div>
      )}
    </section>
  );
}
