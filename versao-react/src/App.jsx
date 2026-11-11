import React, { useState, useEffect, useCallback } from 'react';
import {
  createInitialUserData,
  DEMO_EMAIL,
  DEMO_PASSWORD,
} from './data/initialData';
import AuthScreen from './components/AuthScreen';
import { Sidebar, Topbar, MobileNav } from './components/Navigation';
import DashboardView from './components/DashboardView';
import NewAppointmentView from './components/NewAppointmentView';
import CalendarView from './components/CalendarView';
import HistoryView from './components/HistoryView';
import ProfileView from './components/ProfileView';
import Modals from './components/Modals';
import { CheckCircleIcon, CloseIcon } from './components/Icons';

const STORAGE_KEY = 'medfei_saude_plus_react_v1';

function loadStoredAccounts() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed[DEMO_EMAIL]) {
        return parsed;
      }
    }
  } catch {
    // ignore storage errors
  }
  const initial = {
    [DEMO_EMAIL]: {
      password: DEMO_PASSWORD,
      data: createInitialUserData('Giselle Souza', DEMO_EMAIL),
    },
  };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
  } catch {
    // ignore
  }
  return initial;
}

export default function App() {
  const [accounts, setAccounts] = useState(() => loadStoredAccounts());
  const [currentUserEmail, setCurrentUserEmail] = useState(null);
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'cadastro'

  const [activeView, setActiveView] = useState('inicio');
  const [activeModal, setActiveModal] = useState(null);
  const [showNotifications, setShowNotifications] = useState(false);

  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [selectedHistoryItem, setSelectedHistoryItem] = useState(null);
  const [conflictAppointment, setConflictAppointment] = useState(null);
  const [lastCreatedAppointment, setLastCreatedAppointment] = useState(null);
  const [newAppointmentPrefill, setNewAppointmentPrefill] = useState(null);

  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(accounts));
    } catch {
      // ignore storage quota errors
    }
  }, [accounts]);

  const showToast = useCallback((msg) => {
    setToastMessage(msg);
  }, []);

  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => setToastMessage(''), 4000);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  const currentAccount = currentUserEmail ? accounts[currentUserEmail] : null;
  const userData = currentAccount?.data || createInitialUserData();

  const updateCurrentUserData = (updater) => {
    if (!currentUserEmail) return;
    setAccounts((prev) => {
      const current = prev[currentUserEmail];
      if (!current) return prev;
      const nextData =
        typeof updater === 'function' ? updater(current.data) : updater;
      return {
        ...prev,
        [currentUserEmail]: {
          ...current,
          data: nextData,
        },
      };
    });
  };

  const handleLogin = (identifier, password) => {
    const normalized = identifier.toLowerCase();
    const matchedEntry = Object.entries(accounts).find(
      ([email, acc]) =>
        email.toLowerCase() === normalized ||
        acc.data.profile.name.toLowerCase() === normalized
    );

    if (!matchedEntry) {
      return {
        ok: false,
        message: 'Conta não encontrada. Verifique o e-mail/nome ou crie sua conta.',
      };
    }

    const [email, acc] = matchedEntry;
    if (acc.password !== password) {
      return {
        ok: false,
        message: 'Senha incorreta. Para a conta demonstrativa use 12345678.',
      };
    }

    setCurrentUserEmail(email);
    setActiveView('inicio');
    showToast(`Bem-vinda de volta, ${acc.data.profile.name.split(' ')[0]}!`);
    return { ok: true };
  };

  const handleRegister = ({ name, email, password }) => {
    if (accounts[email]) {
      return {
        ok: false,
        message: 'Este e-mail já está cadastrado. Faça login para continuar.',
      };
    }

    const newUserData = createInitialUserData(name, email);
    setAccounts((prev) => ({
      ...prev,
      [email]: {
        password,
        data: newUserData,
      },
    }));
    setCurrentUserEmail(email);
    setActiveView('inicio');
    setActiveModal('permissoes');
    showToast(`Conta criada com sucesso! Bem-vindo(a), ${name.split(' ')[0]}!`);
    return { ok: true };
  };

  const handleLogout = () => {
    setCurrentUserEmail(null);
    setAuthMode('login');
    setActiveModal(null);
    setShowNotifications(false);
    showToast('Você saiu da sua conta.');
  };

  const handleNavigate = (view) => {
    setShowNotifications(false);
    setActiveView(view);
  };

  const handleStartNewAppointment = (prefill = null) => {
    setNewAppointmentPrefill(prefill);
    setActiveView('nova-consulta');
  };

  const handleSaveAppointment = (newAptData) => {
    // Verifica conflito de data e horário para o mesmo paciente
    const existingConflict = userData.upcomingAppointments.find(
      (apt) =>
        apt.date === newAptData.date &&
        apt.time === newAptData.time &&
        apt.patient.toLowerCase() === newAptData.patient.toLowerCase()
    );

    if (existingConflict) {
      setConflictAppointment(existingConflict);
      setActiveModal('conflito');
      return;
    }

    const created = {
      ...newAptData,
      id: `apt-${Date.now()}`,
    };

    updateCurrentUserData((prev) => ({
      ...prev,
      upcomingAppointments: [...prev.upcomingAppointments, created],
    }));

    setLastCreatedAppointment(created);
    setActiveModal('sucesso');
    showToast('Consulta agendada e sincronizada com sucesso!');
  };

  const handlePreviewConflict = () => {
    const sampleConflict =
      userData.upcomingAppointments[0] || {
        specialty: 'Oftalmologia',
        doctor: 'Dra. Ana Ribeiro',
        date: '2026-10-21',
        time: '10:00',
      };
    setConflictAppointment(sampleConflict);
    setActiveModal('conflito');
  };

  const handleDeleteAppointment = (aptId) => {
    updateCurrentUserData((prev) => ({
      ...prev,
      upcomingAppointments: prev.upcomingAppointments.filter((a) => a.id !== aptId),
    }));
    setActiveModal(null);
    setSelectedAppointment(null);
    showToast('Consulta excluída da sua agenda.');
  };

  const handleAddAttachmentsToHistory = (historyId, newFiles) => {
    let updatedItem = null;
    updateCurrentUserData((prev) => {
      const nextHistory = prev.historyAppointments.map((item) => {
        if (item.id !== historyId) return item;
        updatedItem = {
          ...item,
          attachments: [...(item.attachments || []), ...newFiles],
        };
        return updatedItem;
      });
      return {
        ...prev,
        historyAppointments: nextHistory,
      };
    });

    if (updatedItem) {
      setSelectedHistoryItem(updatedItem);
    }
    setActiveModal('detalhes-historico');
    showToast(`${newFiles.length} documento(s) anexado(s) ao histórico!`);
  };

  const handleSaveProfile = (updatedFields) => {
    updateCurrentUserData((prev) => {
      const oldName = prev.profile.name;
      const newName = updatedFields.name || oldName;
      return {
        ...prev,
        profile: {
          ...prev.profile,
          ...updatedFields,
        },
        upcomingAppointments: prev.upcomingAppointments.map((apt) =>
          apt.patientType === 'titular' ? { ...apt, patient: newName } : apt
        ),
        historyAppointments: prev.historyAppointments.map((item) =>
          item.patientType === 'titular' ? { ...item, patient: newName } : item
        ),
      };
    });
    setActiveModal(null);
    showToast('Dados do perfil atualizados com sucesso!');
  };

  const handleAddDependent = (newDep) => {
    updateCurrentUserData((prev) => ({
      ...prev,
      dependents: [...prev.dependents, newDep],
    }));
    setActiveModal(null);
    showToast(`Familiar "${newDep.name}" adicionado ao seu perfil!`);
  };

  const handleUpdatePreferences = (partialPrefs, toastText) => {
    updateCurrentUserData((prev) => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        ...partialPrefs,
      },
    }));
    if (toastText) {
      showToast(toastText);
    }
  };

  const handleResetDemoData = () => {
    updateCurrentUserData(
      createInitialUserData(userData.profile.name, userData.profile.email)
    );
    showToast('Dados demonstrativos restaurados ao estado inicial.');
  };

  if (!currentUserEmail) {
    return (
      <>
        <AuthScreen
          mode={authMode}
          onSwitchMode={setAuthMode}
          onLogin={handleLogin}
          onRegister={handleRegister}
          onShowToast={showToast}
        />
        {toastMessage && (
          <div className="toast" role="status">
            <CheckCircleIcon size={18} />
            <span>{toastMessage}</span>
            <button
              type="button"
              aria-label="Fechar aviso"
              onClick={() => setToastMessage('')}
            >
              <CloseIcon size={16} />
            </button>
          </div>
        )}
      </>
    );
  }

  return (
    <div className="app-shell">
      <Sidebar
        activeView={activeView}
        onNavigate={handleNavigate}
        userName={userData.profile.name}
      />

      <main className="main-area" onClick={() => showNotifications && setShowNotifications(false)}>
        <Topbar
          activeView={activeView}
          onNavigate={handleNavigate}
          userName={userData.profile.name}
          upcomingCount={userData.upcomingAppointments.length}
          showNotifications={showNotifications}
          onToggleNotifications={() => setShowNotifications((v) => !v)}
        />

        <div className="content">
          {activeView === 'inicio' && (
            <DashboardView
              userName={userData.profile.name}
              upcomingAppointments={userData.upcomingAppointments}
              onNavigate={handleNavigate}
              onOpenDetails={(apt) => {
                setSelectedAppointment(apt);
                setActiveModal('detalhes');
              }}
              onStartNewAppointment={handleStartNewAppointment}
            />
          )}

          {activeView === 'nova-consulta' && (
            <NewAppointmentView
              userName={userData.profile.name}
              dependents={userData.dependents}
              prefill={newAppointmentPrefill}
              onBack={() => handleNavigate('inicio')}
              onCancel={() => handleNavigate('calendario')}
              onSaveAppointment={handleSaveAppointment}
              onPreviewConflict={handlePreviewConflict}
              onShowToast={showToast}
            />
          )}

          {activeView === 'calendario' && (
            <CalendarView
              upcomingAppointments={userData.upcomingAppointments}
              onStartNewAppointment={handleStartNewAppointment}
              onOpenDetails={(apt) => {
                setSelectedAppointment(apt);
                setActiveModal('detalhes');
              }}
            />
          )}

          {activeView === 'historico' && (
            <HistoryView
              historyAppointments={userData.historyAppointments}
              onOpenHistoryDetails={(item) => {
                setSelectedHistoryItem(item);
                setActiveModal('detalhes-historico');
              }}
            />
          )}

          {activeView === 'perfil' && (
            <ProfileView
              profile={userData.profile}
              dependents={userData.dependents}
              preferences={userData.preferences}
              onUpdatePreferences={handleUpdatePreferences}
              onOpenEditProfile={() => setActiveModal('editar-perfil')}
              onOpenAddDependent={() => setActiveModal('adicionar-familiar')}
              onOpenPermissions={() => setActiveModal('permissoes')}
              onResetDemoData={handleResetDemoData}
              onLogout={handleLogout}
            />
          )}
        </div>
      </main>

      <MobileNav activeView={activeView} onNavigate={handleNavigate} />

      <Modals
        activeModal={activeModal}
        selectedAppointment={selectedAppointment}
        selectedHistoryItem={selectedHistoryItem}
        conflictAppointment={conflictAppointment}
        lastCreatedAppointment={lastCreatedAppointment}
        profile={userData.profile}
        preferences={userData.preferences}
        onCloseModal={() => setActiveModal(null)}
        onOpenModal={(modalName) => setActiveModal(modalName)}
        onNavigate={handleNavigate}
        onDeleteAppointment={handleDeleteAppointment}
        onAddAttachmentsToHistory={handleAddAttachmentsToHistory}
        onSaveProfile={handleSaveProfile}
        onAddDependent={handleAddDependent}
        onUpdatePreferences={handleUpdatePreferences}
        onShowToast={showToast}
      />

      {toastMessage && (
        <div className="toast" role="status">
          <CheckCircleIcon size={18} />
          <span>{toastMessage}</span>
          <button
            type="button"
            aria-label="Fechar aviso"
            onClick={() => setToastMessage('')}
          >
            <CloseIcon size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
