import React from 'react';
import { getInitials } from '../data/initialData';
import {
  BellIcon,
  CalendarIcon,
  PlusIcon,
  SettingsIcon,
  ShieldCheckIcon,
} from './Icons';

export default function ProfileView({
  profile,
  dependents,
  preferences,
  onUpdatePreferences,
  onOpenEditProfile,
  onOpenAddDependent,
  onOpenPermissions,
  onResetDemoData,
  onLogout,
}) {
  const initials = getInitials(profile.name);

  return (
    <section className="view-screen">
      <div className="page-heading">
        <div>
          <div className="eyebrow">SUA CONTA</div>
          <h1>Perfil</h1>
          <p>Gerencie seus dados, familiares e preferências.</p>
        </div>
        <button type="button" className="secondary" onClick={onOpenPermissions}>
          <ShieldCheckIcon size={17} />
          Privacidade
        </button>
      </div>

      <div className="profile-layout">
        <section className="panel profile-card">
          <div className="profile-cover">
            <div className="profile-avatar">{initials}</div>
            <div>
              <h2>{profile.name}</h2>
              <p>{profile.roleDescription || '48 anos · Titular / gerenciador familiar'}</p>
            </div>
            <button type="button" className="secondary small" onClick={onOpenEditProfile}>
              Editar perfil
            </button>
          </div>

          <div className="profile-facts">
            <div>
              <span>Tipo sanguíneo</span>
              <strong>{profile.bloodType || 'O+'}</strong>
            </div>
            <div>
              <span>Alergias</span>
              <strong>{profile.allergies || 'Nenhuma informada'}</strong>
            </div>
            <div>
              <span>Contato</span>
              <strong>{profile.phone || '(11) 99932-1020'}</strong>
            </div>
          </div>

          <div className="profile-section">
            <div className="panel-heading">
              <div>
                <h3>Familiares e dependentes</h3>
                <p>Organize os cuidados de quem você acompanha.</p>
              </div>
              <button type="button" className="secondary small" onClick={onOpenAddDependent}>
                <PlusIcon size={15} />
                Adicionar
              </button>
            </div>

            {dependents.map((dep) => (
              <div className="dependent-row" key={dep.id}>
                <div className="dependent-avatar">
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
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <div>
                  <strong>{dep.name}</strong>
                  <span>{dep.relation}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="panel preferences-card">
          <div className="panel-heading">
            <div>
              <h2>Preferências</h2>
              <p>Escolha como deseja receber avisos.</p>
            </div>
            <SettingsIcon size={19} />
          </div>

          <label className="setting-label">
            Antecedência dos avisos
            <select
              value={preferences.advanceNotice}
              onChange={(e) =>
                onUpdatePreferences({ advanceNotice: e.target.value }, 'Antecedência dos avisos atualizada.')
              }
            >
              <option value="1 semana antes">1 semana antes</option>
              <option value="2 a 3 dias antes">2 a 3 dias antes</option>
              <option value="1 dia antes">1 dia antes</option>
            </select>
          </label>

          <div className="setting-row">
            <div className="setting-icon">
              <BellIcon size={18} />
            </div>
            <div>
              <strong>Notificação Push</strong>
              <span>Alertas neste dispositivo</span>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={preferences.push}
              className={`toggle ${preferences.push ? 'on' : ''}`}
              onClick={() =>
                onUpdatePreferences(
                  { push: !preferences.push },
                  `Notificações Push ${!preferences.push ? 'ativadas' : 'desativadas'}.`
                )
              }
            >
              <span />
            </button>
          </div>

          <div className="setting-row">
            <div className="setting-icon green">
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
                <path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2" />
              </svg>
            </div>
            <div>
              <strong>WhatsApp</strong>
              <span>Lembretes por mensagem</span>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={preferences.whatsapp}
              className={`toggle ${preferences.whatsapp ? 'on' : ''}`}
              onClick={() =>
                onUpdatePreferences(
                  { whatsapp: !preferences.whatsapp },
                  `Lembretes via WhatsApp ${!preferences.whatsapp ? 'ativados' : 'desativados'}.`
                )
              }
            >
              <span />
            </button>
          </div>

          <div className="setting-row">
            <div className="setting-icon purple">
              <CalendarIcon size={18} />
            </div>
            <div>
              <strong>Sincronizar calendário</strong>
              <span>Adicionar consultas à agenda</span>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={preferences.calendarSync}
              className={`toggle ${preferences.calendarSync ? 'on' : ''}`}
              onClick={() =>
                onUpdatePreferences(
                  { calendarSync: !preferences.calendarSync },
                  `Sincronização com calendário ${
                    !preferences.calendarSync ? 'ativada' : 'desativada'
                  }.`
                )
              }
            >
              <span />
            </button>
          </div>

          <div className="privacy-note">
            <ShieldCheckIcon size={18} />
            <span>Permissões e privacidade podem ser alteradas a qualquer momento.</span>
          </div>

          <button type="button" className="secondary full" onClick={onOpenPermissions}>
            Gerenciar permissões
          </button>

          <button type="button" className="secondary full signout-button" onClick={onLogout}>
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
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" x2="9" y1="12" y2="12" />
            </svg>
            Sair da conta
          </button>
        </section>
      </div>
    </section>
  );
}
