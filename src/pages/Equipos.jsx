import { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import api from '../api/axios';

const esquema = Yup.object({
  nombre: Yup.string().min(3, 'Mínimo 3 caracteres').required('El nombre es obligatorio'),
  tipo: Yup.string().required('El tipo es obligatorio'),
  ubicacion: Yup.string()
});

function Equipos() {
  const [equipos, setEquipos] = useState([]);
  const [error, setError] = useState('');

  const cargarEquipos = () => {
    api.get('/equipos').then(res => setEquipos(res.data));
  };

  useEffect(() => {
    cargarEquipos();
  }, []);

  const handleSubmit = async (values, { resetForm }) => {
    setError('');
    try {
      await api.post('/equipos', values);
      resetForm();
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

      <Formik
        initialValues={{ nombre: '', tipo: '', ubicacion: '' }}
        validationSchema={esquema}
        onSubmit={handleSubmit}
      >
        <Form style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '16px' }}>
          <div>
            <Field name="nombre" placeholder="Nombre" />
            <div style={{ color: 'tomato', fontSize: '12px' }}><ErrorMessage name="nombre" /></div>
          </div>
          <div>
            <Field name="tipo" placeholder="Tipo" />
            <div style={{ color: 'tomato', fontSize: '12px' }}><ErrorMessage name="tipo" /></div>
          </div>
          <div>
            <Field name="ubicacion" placeholder="Ubicación" />
          </div>
          <button type="submit">Agregar</button>
        </Form>
      </Formik>

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