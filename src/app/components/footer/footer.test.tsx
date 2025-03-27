import { render, screen } from '@testing-library/react';
import Footer from './footer';

// Mock do localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('Footer component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('deve renderizar o nome do casal', () => {
    render(<Footer />);
    expect(screen.getByText('Ítalo & Daniely')).toBeInTheDocument();
  });

  it('deve direcionar para /login se não houver token', async () => {
    render(<Footer />);
    const link = await screen.findByRole('link', { name: 'Area Admin' });
    expect(link).toHaveAttribute('href', '/login');
  });

  it('deve direcionar para /dashboard se estiver logado (token presente)', async () => {
    localStorage.setItem('token', 'fake-token');
    render(<Footer />);
    const link = await screen.findByRole('link', { name: 'Area Admin' });
    expect(link).toHaveAttribute('href', '/dashboard');
  });
});
