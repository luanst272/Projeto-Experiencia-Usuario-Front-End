import React, { useState, useMemo } from 'react';
import { formatTimeDisplay, MONTHS_PT, parseDateParts } from '../data/initialData';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ClockIcon,
  MapPinIcon,
  PlusIcon,
  SearchIcon,
} from './Icons';

export default function CalendarView({
  upcomingAppointments,
  onStartNewAppointment,
  onOpenDetails,
}) {
  const [currentYear, setCurrentYear] = useState(2026);
  const [currentMonth, setCurrentMonth] = useState(9); // 9 = Outubro (0-indexed)
  const [selectedDay, setSelectedDay] = useState(null); // null = mostra o mês inteiro
  const [patientFilter, setPatientFilter] = useState('todos'); // 'todos' | 'titular' | 'familiar'
  const [searchQuery, setSearchQuery] = useState('');

  const handlePrevMonth = () => {
    setSelectedDay(null);
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    setSelectedDay(null);
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  // Filtra por paciente e busca textual
  const filteredByPatientAndSearch = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return upcomingAppointments.filter((apt) => {
      if (patientFilter !== 'todos' && apt.patientType !== patientFilter) {
        return false;
      }
      if (!q) return true;
      return (
        apt.specialty.toLowerCase().includes(q) ||
        apt.doctor.toLowerCase().includes(q) ||
        (apt.clinic && apt.clinic.toLowerCase().includes(q)) ||
        (apt.patient && apt.patient.toLowerCase().includes(q)) ||
        (apt.address && apt.address.toLowerCase().includes(q))
      );
    });
  }, [upcomingAppointments, patientFilter, searchQuery]);

  // Consultas do mês visível
  const monthAppointments = useMemo(() => {
    return filteredByPatientAndSearch
      .filter((apt) => {
        const { yearNum, monthIndex } = parseDateParts(apt.date);
        return yearNum === currentYear && monthIndex === currentMonth;
      })
      .sort((a, b) => `${a.date}T${a.time}`.localeCompare(`${b.date}T${b.time}`));
  }, [filteredByPatientAndSearch, currentYear, currentMonth]);

  // Mapa de dias do mês que possuem consulta
  const eventCountByDay = useMemo(() => {
    const map = {};
    monthAppointments.forEach((apt) => {
      const { dayNum } = parseDateParts(apt.date);
      map[dayNum] = (map[dayNum] || 0) + 1;
    });
    return map;
  }, [monthAppointments]);

  // Lista exibida no painel da direita (filtrada por dia selecionado, se houver)
  const displayedAppointments = useMemo(() => {
    if (!selectedDay) return monthAppointments;
    return monthAppointments.filter((apt) => {
      const { dayNum } = parseDateParts(apt.date);
      return dayNum === selectedDay;
    });
  }, [monthAppointments, selectedDay]);

  const firstWeekday = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  return (
    <section className="view-screen">
      <div className="page-heading">
        <div>
          <div className="eyebrow">SUA ROTINA DE SAÚDE</div>
          <h1>Calendário</h1>
          <p>Visualize e organize os compromissos de saúde.</p>
        </div>
        <button type="button" className="primary" onClick={() => onStartNewAppointment()}>
          <PlusIcon size={18} />
          Nova consulta
        </button>
      </div>

      <div className="filter-row">
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
        <div className="search-box">
          <SearchIcon size={17} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar consulta..."
          />
        </div>
      </div>

      <div className="calendar-layout">
        <section className="panel calendar-panel">
          <div className="calendar-month">
            <button
              type="button"
              className="icon-button"
              aria-label="Mês anterior"
              onClick={handlePrevMonth}
            >
              <ChevronLeftIcon size={24} />
            </button>
            <h2>
              {MONTHS_PT[currentMonth]} de {currentYear}
            </h2>
            <button
              type="button"
              className="icon-button"
              aria-label="Próximo mês"
              onClick={handleNextMonth}
            >
              <ChevronRightIcon size={24} />
            </button>
          </div>

          <div className="calendar-grid">
            <div className="weekday">D</div>
            <div className="weekday">S</div>
            <div className="weekday">T</div>
            <div className="weekday">Q</div>
            <div className="weekday">Q</div>
            <div className="weekday">S</div>
            <div className="weekday">S</div>

            {Array.from({ length: firstWeekday }).map((_, idx) => (
              <button
                key={`empty-${idx}`}
                type="button"
                className="calendar-day outside"
                disabled
              />
            ))}

            {Array.from({ length: daysInMonth }).map((_, idx) => {
              const day = idx + 1;
              const count = eventCountByDay[day] || 0;
              const isToday = currentYear === 2026 && currentMonth === 9 && day === 19;
              const isSelected = selectedDay === day;

              const classes = [
                'calendar-day',
                isToday ? 'today' : '',
                count > 0 ? 'has-event' : '',
                isSelected ? 'selected-day' : '',
              ]
                .filter(Boolean)
                .join(' ');

              return (
                <button
                  key={day}
                  type="button"
                  className={classes}
                  title={count > 0 ? `${count} consulta(s)` : 'Sem consulta'}
                  onClick={() => setSelectedDay((prev) => (prev === day ? null : day))}
                >
                  {day}
                  {count > 0 && <i />}
                </button>
              );
            })}
          </div>

          <div className="calendar-legend">
            <span>
              <i className="blue-dot" /> Dia com consulta
            </span>
            <span>
              <i className="gray-dot" /> Sem compromisso
            </span>
            {selectedDay && (
              <button
                type="button"
                className="text-button"
                style={{ marginLeft: 'auto', padding: 0 }}
                onClick={() => setSelectedDay(null)}
              >
                Ver mês todo
              </button>
            )}
          </div>
        </section>

        <section className="panel agenda-panel">
          <div className="panel-heading">
            <div>
              <h2>
                {selectedDay
                  ? `Consultas do dia ${String(selectedDay).padStart(2, '0')}`
                  : 'Consultas do período'}
              </h2>
              <p>{displayedAppointments.length} consulta(s)</p>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="21" x2="14" y1="4" y2="4" />
              <line x1="10" x2="3" y1="4" y2="4" />
              <line x1="21" x2="12" y1="12" y2="12" />
              <line x1="8" x2="3" y1="12" y2="12" />
              <line x1="21" x2="16" y1="20" y2="20" />
              <line x1="12" x2="3" y1="20" y2="20" />
              <line x1="14" x2="14" y1="2" y2="6" />
              <line x1="8" x2="8" y1="10" y2="14" />
              <line x1="16" x2="16" y1="18" y2="22" />
            </svg>
          </div>

          {displayedAppointments.length === 0 ? (
            <div className="empty-state">
              <h3>Nenhuma consulta neste filtro</h3>
              <p>
                {selectedDay
                  ? 'Não há consultas agendadas para este dia específico.'
                  : 'Nenhuma consulta encontrada para o mês ou filtro selecionado.'}
              </p>
              {selectedDay ? (
                <button
                  type="button"
                  className="secondary"
                  onClick={() => setSelectedDay(null)}
                >
                  Mostrar todas do mês
                </button>
              ) : (
                <button
                  type="button"
                  className="primary"
                  onClick={() => onStartNewAppointment()}
                >
                  Agendar nova consulta
                </button>
              )}
            </div>
          ) : (
            displayedAppointments.map((apt) => {
              const { day, monthShort } = parseDateParts(apt.date);
              return (
                <button
                  type="button"
                  key={apt.id}
                  className="agenda-row"
                  onClick={() => onOpenDetails(apt)}
                >
                  <div className="agenda-date">
                    <strong>{day}</strong>
                    <span>{monthShort}</span>
                  </div>
                  <div className="agenda-info">
                    <span className="pill-blue">{apt.specialty}</span>
                    <strong>{apt.doctor}</strong>
                    <span>
                      <ClockIcon size={14} />
                      {formatTimeDisplay(apt.time)} · {apt.clinic}
                      {apt.patientType === 'familiar' ? ` (${apt.patient})` : ''}
                    </span>
                    <small>
                      <MapPinIcon size={13} />
                      {apt.address}
                    </small>
                  </div>
                  <ChevronRightIcon size={18} />
                </button>
              );
            })
          )}
        </section>
      </div>
    </section>
  );
}
