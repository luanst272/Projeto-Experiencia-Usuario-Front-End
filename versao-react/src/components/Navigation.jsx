import React from 'react';
import { getInitials } from '../data/initialData';
import {
  BellIcon,
  CalendarIcon,
  ChevronRightIcon,
  HeartPulseIcon,
  HistoryFilesIcon,
  HomeIcon,
  SettingsIcon,
  ShieldCheckIcon,
  UserIcon,
} from './Icons';

const CRUMB_LABELS = {
  inicio: 'Visão geral',
  'nova-consulta': 'Nova Consulta',
  calendario: 'Calendário',
  historico: 'Histórico',
  perfil: 'Perfil',
};

export function Sidebar({ activeView, onNavigate, userName }) {
  const navBase = activeView === 'nova-consulta' ? 'inicio' : activeView;
  const initials = getInitials(userName);

  return (
    <aside className="sidebar">
      <div className="brand-lockup">
        <div className="brand-mark">
          <HeartPulseIcon size={22} />
        </div>
        <div>
          <div className="brand">
            MedFEI <span>· Saúde+</span>
          </div>
          <div className="brand-sub">Sua saúde, no seu tempo.</div>
        </div>
      </div>

      <div className="side-caption">MENU PRINCIPAL</div>
      <nav>
        <button
          type="button"
          className={`nav-link ${navBase === 'inicio' ? 'active' : ''}`}
          onClick={() => onNavigate('inicio')}
        >
          <HomeIcon size={19} />
          Início
        </button>
        <button
          type="button"
          className={`nav-link ${navBase === 'calendario' ? 'active' : ''}`}
          onClick={() => onNavigate('calendario')}
        >
          <CalendarIcon size={19} />
          Calendário
        </button>
        <button
          type="button"
          className={`nav-link ${navBase === 'historico' ? 'active' : ''}`}
          onClick={() => onNavigate('historico')}
        >
          <HistoryFilesIcon size={19} />
          Histórico
        </button>
        <button
          type="button"
          className={`nav-link ${navBase === 'perfil' ? 'active' : ''}`}
          onClick={() => onNavigate('perfil')}
        >
          <UserIcon size={19} />
          Perfil
        </button>
      </nav>

      <div className="sidebar-bottom">
        <div className="privacy-mini">
          <ShieldCheckIcon size={18} />
          <div>
            <strong>Seus dados protegidos</strong>
            <span>Suas permissões ficam sob seu controle.</span>
          </div>
        </div>
        <button type="button" className="user-mini" onClick={() => onNavigate('perfil')}>
          <div className="avatar">{initials}</div>
          <div>
            <strong>{userName}</strong>
            <span>Minha conta</span>
          </div>
          <SettingsIcon size={17} />
        </button>
      </div>
    </aside>
  );
}

export function Topbar({
  activeView,
  onNavigate,
  userName,
  upcomingCount,
  showNotifications,
  onToggleNotifications,
}) {
  const initials = getInitials(userName);

  return (
    <header className="topbar">
      <div className="mobile-brand">
        <div className="brand-mark">
          <HeartPulseIcon size={20} />
        </div>
        <strong>
          MedFEI <span>· Saúde+</span>
        </strong>
      </div>

      <div className="crumb">
        Saúde+
        <ChevronRightIcon size={14} />
        <span>{CRUMB_LABELS[activeView] || 'Visão geral'}</span>
        <span className="react-badge">React + Estado Dinâmico</span>
      </div>

      <div className="top-actions">
        <button
          type="button"
          className="icon-button"
          aria-label="Notificações"
          onClick={onToggleNotifications}
        >
          <BellIcon size={19} />
          {upcomingCount > 0 && <i />}
        </button>
        <button
          type="button"
          className="avatar"
          style={{ border: 0 }}
          onClick={() => onNavigate('perfil')}
          title="Ir para Perfil"
        >
          {initials}
        </button>
      </div>

      {showNotifications && (
        <div className="notification-pop">
          <strong>Lembretes</strong>
          <p>
            <BellIcon size={16} />
            {upcomingCount > 0
              ? `Você tem ${upcomingCount} consulta(s) próxima(s). Confira sua agenda.`
              : 'Nenhuma consulta futura pendente no momento.'}
          </p>
          <button
            type="button"
            className="text-button"
            onClick={() => {
              onToggleNotifications();
              onNavigate('calendario');
            }}
          >
            Ver calendário
          </button>
        </div>
      )}
    </header>
  );
}

export function MobileNav({ activeView, onNavigate }) {
  const navBase = activeView === 'nova-consulta' ? 'inicio' : activeView;

  return (
    <nav className="mobile-nav">
      <button
        type="button"
        className={navBase === 'inicio' ? 'active' : ''}
        onClick={() => onNavigate('inicio')}
      >
        <HomeIcon size={21} />
        <span>Início</span>
      </button>
      <button
        type="button"
        className={navBase === 'calendario' ? 'active' : ''}
        onClick={() => onNavigate('calendario')}
      >
        <CalendarIcon size={21} />
        <span>Calendário</span>
      </button>
      <button
        type="button"
        className={navBase === 'historico' ? 'active' : ''}
        onClick={() => onNavigate('historico')}
      >
        <HistoryFilesIcon size={21} />
        <span>Histórico</span>
      </button>
      <button
        type="button"
        className={navBase === 'perfil' ? 'active' : ''}
        onClick={() => onNavigate('perfil')}
      >
        <UserIcon size={21} />
        <span>Perfil</span>
      </button>
    </nav>
  );
}
