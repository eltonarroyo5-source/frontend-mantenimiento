import { Routes, Route, NavLink, Navigate, useNavigate, useLocation } from 'react-router-dom';
import Equipos from './pages/Equipos';
import Tecnicos from './pages/Tecnicos';
import Login from './pages/Login';

function Privada({ children }) {
  return localStorage.getItem('token') ? children : <Navigate to="/login" />;
}

function App() {
  const navigate = useNavigate();
    const { pathname } = useLocation();
  const logueado = !!localStorage.getItem('token');

  const salir = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <>
            {pathname !== '/login' && (
        <header className="topbar">
          <div className="brand">Mantenimiento <span>ML</span></div>
          {logueado && (
            <nav className="nav">
              <NavLink to="/" end>Equipos</NavLink>
              <NavLink to="/tecnicos">Técnicos</NavLink>
              <button className="secundario" onClick={salir}>Cerrar sesión</button>
            </nav>
          )}
        </header>
      )}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Privada><Equipos /></Privada>} />
        <Route path="/tecnicos" element={<Privada><Tecnicos /></Privada>} />
      </Routes>
    </>
  );
}

export default App;