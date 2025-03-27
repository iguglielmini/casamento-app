import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ConfirmingPresence from './confirmingPresence';
import { useConfirmPresence } from '../../../contexts/ConfirmPresenceContext';

// 🧪 Mock do contexto
jest.mock('../../../contexts/ConfirmPresenceContext', () => ({
  useConfirmPresence: jest.fn(),
}));

jest.mock('../../../utils/phoneUtils.ts', () => ({
    formatPhone: (v: string) => v,
  }));
  

// 🧪 Mock do localStorage
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

describe('ConfirmingPresence component', () => {
  const mockConfirmPresence = jest.fn();

  beforeEach(() => {
    (useConfirmPresence as jest.Mock).mockReturnValue({
      confirmPresence: mockConfirmPresence,
      loading: false,
    });

    localStorage.clear();
  });

  it('deve renderizar botão para abrir modal', () => {
    render(<ConfirmingPresence />);
    expect(screen.getByText('Confirme sua presença')).toBeInTheDocument();
  });

  it('deve abrir o modal ao clicar no botão', () => {
    render(<ConfirmingPresence />);
    fireEvent.click(screen.getByText('Confirme sua presença'));
    expect(screen.getByPlaceholderText('Seu nome completo')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Número de telefone')).toBeInTheDocument();
  });

  it('deve chamar confirmPresence ao enviar o formulário com dados válidos', async () => {
    mockConfirmPresence.mockResolvedValue({
      success: true,
      message: 'Presença confirmada com sucesso!',
    });

    render(<ConfirmingPresence />);
    fireEvent.click(screen.getByText('Confirme sua presença'));

    fireEvent.change(screen.getByPlaceholderText('Seu nome completo'), {
      target: { value: 'João da Silva' },
    });
    fireEvent.change(screen.getByPlaceholderText('Número de telefone'), {
      target: { value: '(11) 99999-9999' },
    });

    fireEvent.click(screen.getByText('Confirmar presença'));

    await waitFor(() => {
      expect(mockConfirmPresence).toHaveBeenCalledWith(
        '(11) 99999-9999',
        'João da Silva'
      );
    });

    expect(await screen.findByText('Presença confirmada!')).toBeInTheDocument();
  });

  it('deve exibir mensagem de erro caso a confirmação falhe', async () => {
    mockConfirmPresence.mockResolvedValue({
      success: false,
      message: 'Erro ao confirmar presença.',
    });

    render(<ConfirmingPresence />);
    fireEvent.click(screen.getByText('Confirme sua presença'));

    fireEvent.change(screen.getByPlaceholderText('Seu nome completo'), {
      target: { value: 'Maria' },
    });
    fireEvent.change(screen.getByPlaceholderText('Número de telefone'), {
      target: { value: '11888888888' },
    });

    fireEvent.click(screen.getByText('Confirmar presença'));

    await waitFor(() => {
      expect(screen.getByText('Erro ao confirmar presença.')).toBeInTheDocument();
    });
  });

  it('deve renderizar tela de presença confirmada se localStorage estiver com guestConfirmed=true', () => {
    localStorage.setItem('guestConfirmed', 'true');
    render(<ConfirmingPresence />);
    expect(screen.getByText('Presença confirmada!')).toBeInTheDocument();
  });
});
