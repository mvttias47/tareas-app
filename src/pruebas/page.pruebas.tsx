import React from 'react';

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Home from '@/app/page';


const mockFetch = vi.fn() as unknown as typeof fetch;
global.fetch = mockFetch;

beforeEach(() => {
  vi.resetAllMocks();
});

function mockGET(items: any[]) {
  (mockFetch as any).mockResolvedValueOnce({
    ok: true,
    json: async () => items,
  });
}

function mockPOST(created: any) {
  (mockFetch as any).mockResolvedValueOnce({
    ok: true,
    json: async () => created,
  });
}

function mockGET_Error() {
  (mockFetch as any).mockResolvedValueOnce({ ok: false });
}

function mockPOST_Error() {
  (mockFetch as any).mockResolvedValueOnce({ ok: false });
}

it('muestra tareas cuando la API responde OK', async () => {
  mockGET([
    { id: '1', titulo: 'Tarea A', completada: false, createdAt: new Date().toISOString() },
    { id: '2', titulo: 'Tarea B', completada: false, createdAt: new Date().toISOString() },
  ]);

  render(<Home />);


expect(screen.getByRole('button', { name: /listando/i })).toBeDisabled();



  await waitFor(() => {
    expect(screen.getByText('Tarea A')).toBeInTheDocument();
    expect(screen.getByText('Tarea B')).toBeInTheDocument();
  });
});

it('muestra error cuando el GET falla', async () => {
  mockGET_Error();
  render(<Home />);
  await waitFor(() =>
    expect(screen.getByText(/no se pudo cargar la lista/i)).toBeInTheDocument()
  );
});

it('envía el formulario y refresca la lista', async () => {
  mockGET([]); 
  render(<Home />);

  const input = await screen.findByLabelText(/nueva tarea/i);
  fireEvent.change(input, { target: { value: 'Estudiar Vitest' } });

  mockPOST({
    id: '99',
    titulo: 'Estudiar Vitest',
    completada: false,
    createdAt: new Date().toISOString(),
  });

  mockGET([
    { id: '99', titulo: 'Estudiar Vitest', completada: false, createdAt: new Date().toISOString() },
  ]);

  const btnAgregar = screen.getByRole('button', { name: /agregar/i });
  fireEvent.click(btnAgregar);

  await waitFor(() => {
    expect((mockFetch as any).mock.calls[1][0]).toMatch(/\/api\/tareas$/); // POST
  });

  expect((input as HTMLInputElement).value).toBe('');

  await waitFor(() => {
    expect(screen.getByText('Estudiar Vitest')).toBeInTheDocument();
  });
});

it('muestra error cuando el POST falla', async () => {
  mockGET([]);
  render(<Home />);
  const input = await screen.findByLabelText(/nueva tarea/i);
  fireEvent.change(input, { target: { value: 'Falla Post' } });

  mockPOST_Error();
  const btnAgregar = screen.getByRole('button', { name: /agregar/i });
  fireEvent.click(btnAgregar);

  await waitFor(() =>
    expect(screen.getByText(/no se pudo crear la tarea/i)).toBeInTheDocument()
  );
});

it('“Listar todas” vuelve a consultar el GET', async () => {
  mockGET([]);
  render(<Home />);

  mockGET([
    { id: '1', titulo: 'Desde botón', completada: false, createdAt: new Date().toISOString() },
  ]);

  fireEvent.click(await screen.findByRole('button', { name: /listar todas/i }));

  await waitFor(() => {
    expect(screen.getByText('Desde botón')).toBeInTheDocument();
  });
});
