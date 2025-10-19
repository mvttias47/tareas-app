'use client';

import { useEffect, useState } from 'react';
import { listar, crear, type Tarea } from '@/lib/api';

export default function Home() {
  const [tareas, setTareas] = useState<Tarea[]>([]);
  const [titulo, setTitulo] = useState('');
  const [cargando, setCargando] = useState(true);
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function cargarTareas() {
    setCargando(true);
    setError(null);
    try {
      const data = await listar();
      setTareas(data);
    } catch {
      setError('No se pudo cargar la lista');
    } finally {
      setCargando(false);
    }
  }

  async function Crear(e: React.FormEvent) {
    e.preventDefault();
    const texto = titulo.trim();
    if (!texto) return;

    setEnviando(true);
    setError(null);
    try {
      await crear(texto);
      setTitulo('');
      await cargarTareas();
    } catch {
      setError('No se pudo crear la tarea');
    } finally {
      setEnviando(false);
    }
  }

  useEffect(() => { cargarTareas(); }, []);

  const total = tareas.length;
  const hechas = tareas.filter(t => t.completada).length;

  return (
    <main className="wrapper">
      <div className="glass">
        <div className="header">
          <h1 className="h1">Tareas</h1>
          <div className="sub">
            Lista de tareas. Agrega una nueva tarea en este formulario
          </div>
        </div>

        <form className="form" onSubmit={Crear}>
          <div>
            <label className="label" htmlFor="titulo">Ingresa una Tarea</label>
            <input
              id="titulo"
              className="input"
              placeholder="Ej.: Llamar al cliente, crear documentacion"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
            />
          </div>

          <div style={{ alignSelf: 'end', display: 'flex', gap: 10 }}>
            <button type="button" className="btn" onClick={cargarTareas} disabled={cargando}>
              {cargando ? 'Listando' : 'Listar todas'}
            </button>
            <button className="btn" disabled={enviando}>
              {enviando ? 'Guardando' : 'Agregar'}
            </button>
          </div>
        </form>

        {error && <div className="banner">{error}</div>}

        {/* Resumen de estado */}
        {!cargando && total > 0 && (
          <div className="panel-resumen" role="status" aria-live="polite">
            <span className="pill pill--info">
              <strong>{hechas}</strong> / {total} completadas
            </span>
          </div>
        )}

        <section className="section">
          {cargando ? (
            <div className="list">
              <div className="skel" />
              <div className="skel" />
              <div className="skel" />
            </div>
          ) : total === 0 ? (
            <div className="card">No hay tareas aún, crea una nueva</div>
          ) : (
            <ul className="list">
              {tareas.map((t) => {
                const done = t.completada;
                return (
                  <li key={t.id} className="card">
                    <div className="row">
                      {/* punto de estado */}
                      <span
                        className={`dot ${done ? 'dot--ok' : 'dot--pending'}`}
                        aria-label={done ? 'Completada' : 'Pendiente'}
                        title={done ? 'Completada' : 'Pendiente'}
                      />
                      <div style={{ flex: 1 }}>
                        <div className="title">{t.titulo}</div>
                        <div className="meta">
                          Creada: {new Date(t.createdAt).toLocaleString()}
                        </div>
                      </div>

                      {/* badge de estado */}
                      <span className={`badge ${done ? 'badge--ok' : 'badge--pending'}`}>
                        {done ? 'Completada' : 'Pendiente'}
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}
