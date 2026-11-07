import { useState, useEffect } from 'react';
import api from '../api/axios';

function Tecnicos() {
  const [tecnicos, setTecnicos] = useState([]);

  useEffect(() => {
    api.get('/tecnicos').then(res => setTecnicos(res.data));
  }, []);

  return (
    <div className="card">
      <h2>Técnicos</h2>
      {tecnicos.length === 0 ? (
        <p className="vacio">No hay técnicos registrados.</p>
      ) : (
        <ul className="lista">
          {tecnicos.map(t => (
            <li key={t.id} className="item">
              <div>
                <div className="titulo">{t.nombre}</div>
                <div className="detalle">{t.email}{t.telefono ? ` · ${t.telefono}` : ''}</div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Tecnicos;