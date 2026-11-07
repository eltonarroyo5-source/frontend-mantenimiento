import { Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import Equipos from './pages/Equipos';
import Tecnicos from './pages/Tecnicos';
import Login from './pages/Login';

function Privada({ children }) {
  return localStorage.getItem('token') ? children : <Navigate to="/login" />;
}

function App() {
  const navigate = useNavigate();
  const logueado = !!localStorage.getItem('token');

  const salir = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Mantenimiento ML</h1>
      {logueado && (
        <nav style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
          <Link to="/">Equipos</Link>
          <Link to="/tecnicos">Técnicos</Link>
          <button onClick={salir}>Cerrar sesión</button>
        </nav>
      )}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Privada><Equipos /></Privada>} />
        <Route path="/tecnicos" element={<Privada><Tecnicos /></Privada>} />
      </Routes>
    </div>
  );
}

export default App;