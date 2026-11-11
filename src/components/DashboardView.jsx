import React, { useState, useMemo } from 'react';
import { formatDateLong, formatTimeDisplay, parseDateParts } from '../data/initialData';
import {
  CalendarIcon,
  ChevronRightIcon,
  ClockIcon,
  HistoryFilesIcon,
  MapPinIcon,
  PlusIcon,
  RouteArrowIcon,
} from './Icons';

export default function DashboardView({
  userName,
  upcomingAppointments,
  onNavigate,
  onOpenDetails,
  onStartNewAppointment,
}) {
  const [patientFilter, setPatientFilter] = useState('titular'); // 'titular' | 'familiar'

  const firstName = (userName || 'Giselle').split(' ')[0];

  const sortedFiltered = useMemo(() => {
    return [...upcomingAppointments]
      .filter((apt) => apt.patientType === patientFilter)
      .sort((a, b) => `${a.date}T${a.time}`.localeCompare(`${b.date}T${b.time}`));
  }, [upcomingAppointments, patientFilter]);

  const allSortedUpcoming = useMemo(() => {
    return [...upcomingAppointments].sort((a, b) =>
      `${a.date}T${a.time}`.localeCompare(`${b.date}T${b.time}`)
    );
  }, [upcomingAppointments]);

  const nextAppointment = sortedFiltered[0] || allSortedUpcoming[0] || null;

  return (
    <section className="view-screen">
      <div className="page-heading">
        <div>
          <div className="eyebrow">BEM-VINDA DE VOLTA</div>
          <h1>Olá, {firstName}</h1>
          <p>Sua saúde, no seu tempo.</p>
        </div>
        <button type="button" className="primary" onClick={() => onStartNewAppointment()}>
          <PlusIcon size={18} />
          Nova consulta
        </button>
      </div>

      <div className="patient-switch">
        <button
          type="button"
          className={patientFilter === 'titular' ? 'selected' : ''}
          onClick={() => setPatientFilter('titular')}
        >
          Titular
        </button>
        <button
          type="button"
          className={patientFilter === 'familiar' ? 'selected' : ''}
          onClick={() => setPatientFilter('familiar')}
        >
          Familiar
        </button>
      </div>

      <div className="section-title">
        <h2>Próxima consulta</h2>
        <button type="button" className="text-button" onClick={() => onNavigate('calendario')}>
          Ver agenda
          <ChevronRightIcon size={15} />
        </button>
      </div>

      {nextAppointment ? (
        <div className="next-card">
          <div className="next-top">
            <span className="pill-blue">{nextAppointment.specialty}</span>
            <span className="status">
              <span /> {nextAppointment.status || 'Confirmada'}
            </span>
          </div>
          <h3>{nextAppointment.doctor}</h3>
          <p className="clinic-line">
            {nextAppointment.clinic} · {nextAppointment.patient}
          </p>
          <div className="detail-line">
            <CalendarIcon size={18} />
            <span>
              {formatDateLong(nextAppointment.date)} <b>·</b>{' '}
              {formatTimeDisplay(nextAppointment.time)}
            </span>
          </div>
          <div className="detail-line">
            <MapPinIcon size={18} />
            <span>{nextAppointment.address}</span>
          </div>
          <div className="card-actions">
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                nextAppointment.address
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="primary"
            >
              <RouteArrowIcon size={17} />
              Ver rota
            </a>
            <button
              type="button"
              className="secondary"
              onClick={() => onOpenDetails(nextAppointment)}
            >
              Ver detalhes
            </button>
          </div>
        </div>
      ) : (
        <div className="next-card">
          <p className="muted-paragraph" style={{ margin: 0 }}>
            Nenhuma consulta futura cadastrada para este perfil.
          </p>
          <div className="card-actions">
            <button type="button" className="primary" onClick={() => onStartNewAppointment()}>
              Agendar consulta
            </button>
          </div>
        </div>
      )}

      <div className="section-title alert-title">
        <h2>Alertas de retorno pendentes</h2>
        <span className="count-badge">1</span>
      </div>

      <div className="return-alert">
        <div className="alert-icon">
          <ClockIcon size={20} />
        </div>
        <div className="alert-copy">
          <strong>Retorno de Dermatologia recomendado para este mês</strong>
          <p>6 meses desde a última consulta. Que tal agendar seu retorno?</p>
          <button
            type="button"
            className="alert-action"
            onClick={() =>
              onStartNewAppointment({
                specialty: 'Dermatologia',
                doctor: 'Dra. Marina Costa',
                clinic: 'Clínica Pele & Saúde',
                address: 'Rua Vergueiro, 1350 · Vila Mariana, São Paulo',
              })
            }
          >
            Agendar agora
            <ChevronRightIcon size={16} />
          </button>
        </div>
      </div>

      <div className="bottom-grid">
        <div className="small-panel">
          <div className="panel-heading">
            <h3>Atalhos rápidos</h3>
            <span>Para você</span>
          </div>
          <div className="shortcut-grid">
            <button type="button" onClick={() => onStartNewAppointment()}>
              <span className="shortcut-icon blue">
                <PlusIcon size={24} />
              </span>
              <strong>Nova consulta</strong>
              <small>Cadastre um compromisso</small>
            </button>
            <button type="button" onClick={() => onNavigate('historico')}>
              <span className="shortcut-icon purple">
                <HistoryFilesIcon size={24} />
              </span>
              <strong>Meus documentos</strong>
              <small>Consulte seus anexos</small>
            </button>
          </div>
        </div>

        <div className="small-panel upcoming-panel">
          <div className="panel-heading">
            <h3>Próximos compromissos</h3>
            <button type="button" className="text-button" onClick={() => onNavigate('calendario')}>
              Ver todos
            </button>
          </div>
          {allSortedUpcoming.length === 0 ? (
            <p className="muted-paragraph">Nenhuma consulta agendada.</p>
          ) : (
            allSortedUpcoming.map((apt) => {
              const { day, monthShort } = parseDateParts(apt.date);
              return (
                <button
                  type="button"
                  key={apt.id}
                  className="mini-appointment"
                  onClick={() => onOpenDetails(apt)}
                >
                  <div className="date-chip">
                    <strong>{day}</strong>
                    <span>{monthShort}</span>
                  </div>
                  <div className="mini-copy">
                    <strong>{apt.specialty}</strong>
                    <span>
                      {apt.doctor} · {apt.time}
                      {apt.patientType === 'familiar' ? ` (${apt.patient})` : ''}
                    </span>
                  </div>
                  <ChevronRightIcon size={16} />
                </button>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}
