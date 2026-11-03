import { useState, useEffect } from 'react';
import api from '../api/axios';

function Tecnicos() {
  const [tecnicos, setTecnicos] = useState([]);

  useEffect(() => {
    api.get('/tecnicos').then(res => setTecnicos(res.data));
  }, []);

  return (
    <div>
      <h2>Técnicos</h2>
      <ul>
        {tecnicos.map(t => (
          <li key={t.id}>{t.nombre} - {t.email}</li>
        ))}
      </ul>
    </div>
  );
}

export default Tecnicos;