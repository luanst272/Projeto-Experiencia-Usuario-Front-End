import React, { useState } from 'react';
import { DEMO_EMAIL, DEMO_PASSWORD } from '../data/initialData';
import { HeartPulseIcon, UserIcon } from './Icons';

export default function AuthScreen({ mode, onSwitchMode, onLogin, onRegister, onShowToast }) {
  const [loginIdentifier, setLoginIdentifier] = useState(DEMO_EMAIL);
  const [loginPassword, setLoginPassword] = useState(DEMO_PASSWORD);
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirm, setRegConfirm] = useState('');
  const [showRegPassword, setShowRegPassword] = useState(false);

  const [errorMsg, setErrorMsg] = useState('');

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');
    if (!loginIdentifier.trim() || !loginPassword.trim()) {
      setErrorMsg('Informe seu nome/e-mail e sua senha para entrar.');
      return;
    }
    const result = onLogin(loginIdentifier.trim(), loginPassword);
    if (!result.ok) {
      setErrorMsg(result.message);
    }
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');
    if (!regName.trim() || !regEmail.trim() || !regPassword) {
      setErrorMsg('Preencha todos os campos obrigatórios para criar sua conta.');
      return;
    }
    if (regPassword.length < 6) {
      setErrorMsg('A senha deve ter no mínimo 6 caracteres.');
      return;
    }
    if (regPassword !== regConfirm) {
      setErrorMsg('As senhas digitadas não coincidem.');
      return;
    }
    const result = onRegister({
      name: regName.trim(),
      email: regEmail.trim().toLowerCase(),
      password: regPassword,
    });
    if (!result.ok) {
      setErrorMsg(result.message);
    }
  };

  if (mode === 'cadastro') {
    return (
      <section className="auth-wrap auth-screen">
        <div className="phone-status">
          <span>9:41</span>
          <span className="status-icons">▮▮▮ ◉ ▰</span>
        </div>
        <form className="auth-card" onSubmit={handleRegisterSubmit}>
          <div className="auth-brand-row">
            <div className="brand">Saúde+</div>
            <div className="brand-mark">
              <HeartPulseIcon size={25} />
            </div>
          </div>
          <div className="auth-hero-mark">
            <HeartPulseIcon size={54} strokeWidth={1.2} />
          </div>
          <h1>Crie sua conta Saúde+</h1>
          <p>Organize suas consultas e documentos em um só lugar.</p>

          {errorMsg && <div className="auth-error">{errorMsg}</div>}

          <label>
            Nome completo
            <div className="auth-input-wrap">
              <input
                type="text"
                value={regName}
                onChange={(e) => setRegName(e.target.value)}
                placeholder="Seu nome completo"
              />
              <UserIcon size={19} />
            </div>
          </label>

          <label>
            E-mail
            <div className="auth-input-wrap">
              <input
                type="email"
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
                placeholder="seuemail@email.com"
              />
              <span>✉</span>
            </div>
          </label>

          <label>
            Senha
            <div className="auth-input-wrap">
              <input
                type={showRegPassword ? 'text' : 'password'}
                value={regPassword}
                onChange={(e) => setRegPassword(e.target.value)}
                placeholder="Mínimo de 6 caracteres"
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowRegPassword((v) => !v)}
                aria-label="Mostrar ou ocultar senha"
              >
                ◎
              </button>
            </div>
          </label>

          <label>
            Confirmar senha
            <div className="auth-input-wrap">
              <input
                type={showRegPassword ? 'text' : 'password'}
                value={regConfirm}
                onChange={(e) => setRegConfirm(e.target.value)}
                placeholder="Digite a senha novamente"
              />
              <span>✓</span>
            </div>
          </label>

          <button type="submit" className="primary full auth-enter">
            Criar minha conta
          </button>
          <button
            type="button"
            className="secondary full auth-create"
            onClick={() => {
              setErrorMsg('');
              onSwitchMode('login');
            }}
          >
            Já tenho uma conta
          </button>

          <div className="auth-spacer" />
          <small>Ao continuar, você concorda com os Termos de Uso e a Política de Privacidade.</small>
        </form>
      </section>
    );
  }

  return (
    <section className="auth-wrap auth-screen">
      <div className="phone-status">
        <span>9:41</span>
        <span className="status-icons">▮▮▮ ◉ ▰</span>
      </div>
      <form className="auth-card" onSubmit={handleLoginSubmit}>
        <div className="auth-brand-row">
          <div className="brand">Saúde+</div>
          <div className="brand-mark">
            <HeartPulseIcon size={25} />
          </div>
        </div>
        <div className="auth-hero-mark">
          <HeartPulseIcon size={54} strokeWidth={1.2} />
        </div>
        <h1>Sua saúde mais organizada. Sua rotina mais leve.</h1>
        <p>Consultas, exames e lembretes em um só lugar.</p>

        {errorMsg && <div className="auth-error">{errorMsg}</div>}

        <label>
          Nome ou e-mail
          <div className="auth-input-wrap">
            <input
              type="text"
              value={loginIdentifier}
              onChange={(e) => setLoginIdentifier(e.target.value)}
              placeholder="Seu nome ou e-mail"
            />
            <span>✉</span>
          </div>
        </label>

        <label>
          Senha
          <div className="auth-input-wrap">
            <input
              type={showLoginPassword ? 'text' : 'password'}
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              placeholder="Digite sua senha"
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowLoginPassword((v) => !v)}
              aria-label="Mostrar ou ocultar senha"
            >
              ◎
            </button>
          </div>
        </label>

        <button type="submit" className="primary full auth-enter">
          Entrar
        </button>
        <button
          type="button"
          className="secondary full auth-create"
          onClick={() => {
            setErrorMsg('');
            onSwitchMode('cadastro');
          }}
        >
          Criar minha conta
        </button>
        <button
          type="button"
          className="text-button auth-forgot"
          onClick={() => {
            onShowToast('Link de recuperação de senha enviado para seu e-mail cadastrado.');
          }}
        >
          Esqueci minha senha
        </button>

        <div className="auth-spacer" />
        <small>Ao continuar, você concorda com os Termos de Uso e a Política de Privacidade.</small>
      </form>
    </section>
  );
}
