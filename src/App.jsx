import { Routes, Route, Link } from 'react-router-dom';
import Equipos from './pages/Equipos';
import Tecnicos from './pages/Tecnicos';

function App() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Mantenimiento ML</h1>
      <nav style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
        <Link to="/">Equipos</Link>
        <Link to="/tecnicos">Técnicos</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Equipos />} />
        <Route path="/tecnicos" element={<Tecnicos />} />
      </Routes>
    </div>
  );
}

export default App;