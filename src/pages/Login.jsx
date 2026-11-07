import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verPass, setVerPass] = useState(false);
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setCargando(true);
    try {
      const res = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'No se pudo iniciar sesión');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="login-page">
      <section className="login-hero">
        <div className="logo-circle">ML</div>
        <h1>Mantenimiento <span>ML</span></h1>
        <p>Controla tus equipos, técnicos y mantenimientos desde un solo lugar.</p>
      </section>

      <section className="login-card">
        <h2>Bienvenido de nuevo</h2>
        <p className="login-sub">Ingresa tus credenciales para continuar</p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <div className="pass-wrap">
            <input
              type={verPass ? 'text' : 'password'}
              placeholder="Contraseña"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            <button type="button" className="ojo" onClick={() => setVerPass(!verPass)}>
              {verPass ? 'Ocultar' : 'Ver'}
            </button>
          </div>

          {error && <p className="error">{error}</p>}

          <button type="submit" className="btn-login" disabled={cargando}>
            {cargando ? 'Entrando...' : 'Iniciar sesión'}
          </button>
        </form>

        <div className="login-footer">SENATI · Proyecto PIAD-527</div>
      </section>
    </div>
  );
}

export default Login;