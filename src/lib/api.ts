export type Tarea = { id: string; titulo: string; completada: boolean; createdAt: string };

const BASE = (process.env.NEXT_PUBLIC_API_URL || '').replace(/\/+$/, '');


export async function listar(): Promise<Tarea[]> {
  const r = await fetch(`${BASE}/api/tareas`, { cache: 'no-store' });
  if (!r.ok) throw new Error('No se pudo listar');
  return r.json();
}

export async function crear(titulo: string): Promise<Tarea> {
  const r = await fetch(`${BASE}/api/tareas`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ titulo }),
  });
  if (!r.ok) throw new Error('No se pudo crear');
  return r.json();
}


