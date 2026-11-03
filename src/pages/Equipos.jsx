import { useState, useEffect } from 'react';
import api from '../api/axios';

function Equipos() {
  const [equipos, setEquipos] = useState([]);
  const [nombre, setNombre] = useState('');
  const [tipo, setTipo] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [error, setError] = useState('');

  const cargarEquipos = () => {
    api.get('/equipos').then(res => setEquipos(res.data));
  };

  useEffect(() => {
    cargarEquipos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await api.post('/equipos', { nombre, tipo, ubicacion });
      setNombre('');
      setTipo('');
      setUbicacion('');
      cargarEquipos();
    } catch (err) {
      setError(err.response?.data?.error || 'Error al crear el equipo');
    }
  };

  const handleEliminar = async (id) => {
    if (!window.confirm('¿Eliminar este equipo?')) return;
    try {
      await api.delete(`/equipos/${id}`);
      cargarEquipos();
    } catch (err) {
      setError(err.response?.data?.error || 'No se pudo eliminar');
    }
  };

  return (
    <div>
      <h2>Equipos</h2>

      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '16px' }}>
        <input
          placeholder="Nombre"
          value={nombre}
          onChange={e => setNombre(e.target.value)}
          required
        />
        <input
          placeholder="Tipo"
          value={tipo}
          onChange={e => setTipo(e.target.value)}
          required
        />
        <input
          placeholder="Ubicación"
          value={ubicacion}
          onChange={e => setUbicacion(e.target.value)}
        />
        <button type="submit">Agregar</button>
      </form>

      {error && <p style={{ color: 'tomato' }}>{error}</p>}

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {equipos.map(e => (
          <li key={e.id} style={{ marginBottom: '8px' }}>
            {e.nombre} - {e.tipo} ({e.estado}){' '}
            <button onClick={() => handleEliminar(e.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Equipos;