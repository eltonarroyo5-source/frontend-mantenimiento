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
  const [busqueda, setBusqueda] = useState('');
  const [error, setError] = useState('');

  const cargarEquipos = () => {
    api.get('/equipos').then(res => setEquipos(res.data));
  };

  useEffect(() => { cargarEquipos(); }, []);

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

  const total = equipos.length;
  const operativos = equipos.filter(e => e.estado === 'operativo').length;
  const enMant = equipos.filter(e => e.estado === 'en_mantenimiento').length;
  const inactivos = equipos.filter(e => e.estado === 'inactivo').length;

  const q = busqueda.toLowerCase();
  const filtrados = equipos.filter(e =>
    `${e.nombre} ${e.tipo} ${e.ubicacion || ''}`.toLowerCase().includes(q)
  );

  return (
    <div className="page">
      <div className="page-head">
        <div>
          <h2>Equipos</h2>
          <p>Administra el inventario y el estado de tus equipos</p>
        </div>
      </div>

      <div className="stats">
        <div className="stat">
          <div className="num">{total}</div>
          <div className="lbl">Total</div>
        </div>
        <div className="stat ok">
          <div className="num">{operativos}</div>
          <div className="lbl">Operativos</div>
        </div>
        <div className="stat warn">
          <div className="num">{enMant}</div>
          <div className="lbl">En mantenimiento</div>
        </div>
        <div className="stat bad">
          <div className="num">{inactivos}</div>
          <div className="lbl">Inactivos</div>
        </div>
      </div>

      <div className="card">
        <div className="panel-nuevo">
          <h3>Nuevo equipo</h3>
          <Formik
            initialValues={{ nombre: '', tipo: '', ubicacion: '' }}
            validationSchema={esquema}
            onSubmit={handleSubmit}
          >
            <Form className="form-row">
              <div className="field">
                <Field name="nombre" placeholder="Nombre" />
                <p className="error"><ErrorMessage name="nombre" /></p>
              </div>
              <div className="field">
                <Field name="tipo" placeholder="Tipo" />
                <p className="error"><ErrorMessage name="tipo" /></p>
              </div>
              <div className="field">
                <Field name="ubicacion" placeholder="Ubicación" />
              </div>
              <button type="submit">+ Agregar</button>
            </Form>
          </Formik>
          {error && <p className="error">{error}</p>}
        </div>

        <div className="lista-head">
          <h3>Listado <span className="contador">{filtrados.length} de {total}</span></h3>
          <input
            className="buscador"
            placeholder="Buscar por nombre, tipo o ubicación..."
            value={busqueda}
            onChange={e => setBusqueda(e.target.value)}
          />
        </div>

        {filtrados.length === 0 ? (
          <p className="vacio">No se encontraron equipos.</p>
        ) : (
          <ul className="lista">
            {filtrados.map(e => (
              <li key={e.id} className="item">
                <div className="item-main">
                  <div className="avatar">{e.nombre.charAt(0).toUpperCase()}</div>
                  <div>
                    <div className="titulo">{e.nombre}</div>
                    <div className="detalle">{e.tipo}{e.ubicacion ? ` · ${e.ubicacion}` : ''}</div>
                  </div>
                </div>
                <div className="acciones">
                  <span className={`badge ${e.estado}`}>{e.estado.replace('_', ' ')}</span>
                  <button className="peligro" onClick={() => handleEliminar(e.id)}>Eliminar</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Equipos;