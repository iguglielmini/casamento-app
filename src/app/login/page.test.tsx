import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from './page';
import { useRouter } from 'next/navigation';

// 🧪 Mock do router
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('Login component', () => {
  const push = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push });
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('deve renderizar campos e botão', () => {
    render(<Login />);
    expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByText('Entrar')).toBeInTheDocument();
  });

  it('deve alternar a visibilidade da senha ao clicar no botão 👁️', () => {
    render(<Login />);
    const passwordInput = screen.getByPlaceholderText('Password') as HTMLInputElement;
    const toggleBtn = screen.getByRole('button', { name: /👁️|🙈/ });

    // inicialmente deve estar como password
    expect(passwordInput.type).toBe('password');

    fireEvent.click(toggleBtn);
    expect(passwordInput.type).toBe('text');

    fireEvent.click(toggleBtn);
    expect(passwordInput.type).toBe('password');
  });

  it('deve fazer login com sucesso e redirecionar', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ token: 'mock-token' }),
      })
    ) as jest.Mock;

    render(<Login />);

    fireEvent.change(screen.getByPlaceholderText('Username'), {
      target: { value: 'italo' },
    });

    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: '1234' },
    });

    fireEvent.click(screen.getByText('Entrar'));

    await waitFor(() => {
      expect(localStorage.getItem('token')).toBe('mock-token');
      expect(push).toHaveBeenCalledWith('/dashboard');
    });
  });

  it('deve exibir erro se o login falhar', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
      })
    ) as jest.Mock;

    render(<Login />);

    fireEvent.change(screen.getByPlaceholderText('Username'), {
      target: { value: 'italo' },
    });

    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'errado' },
    });

    fireEvent.click(screen.getByText('Entrar'));

    expect(await screen.findByText('Usuário ou senha incorretos.')).toBeInTheDocument();
    expect(push).not.toHaveBeenCalled();
  });
});
