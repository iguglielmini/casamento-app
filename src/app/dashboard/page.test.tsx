import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Dashboard from './page';
import { useDashboard } from '../../contexts/dashboardContext';

jest.mock('../../contexts/dashboardContext.tsx', () => ({
  useDashboard: jest.fn(),
}));

jest.mock('../../utils/phoneUtils.ts', () => ({
  formatPhone: (v: string) => v,
}));

describe('Dashboard component', () => {
  const mockAddGuest = jest.fn();
  const mockDeleteGuest = jest.fn();
  const mockLogout = jest.fn();

  const mockContext = {
    guests: [
      { id: 1, name: 'João', phone: '11999999999', confirmed: true },
      { id: 2, name: 'Maria', phone: '11888888888', confirmed: false },
    ],
    totalGuests: 2,
    confirmedGuests: 1,
    unconfirmedGuests: 1,
    addGuest: mockAddGuest,
    deleteGuest: mockDeleteGuest,
    logout: mockLogout,
  };

  beforeEach(() => {
    (useDashboard as jest.Mock).mockReturnValue(mockContext);
    jest.clearAllMocks();
  });

  it('deve renderizar título e totais corretamente', () => {
    render(<Dashboard />);
    expect(screen.getByText('Dashboard de Convidados')).toBeInTheDocument();
    expect(screen.getByText('Total: 2')).toBeInTheDocument();
    expect(screen.getByText('Confirmados: 1')).toBeInTheDocument();
    expect(screen.getByText('Não confirmados: 1')).toBeInTheDocument();
  });

  it('deve renderizar convidados na tabela', () => {
    render(<Dashboard />);
    expect(screen.getByText('João')).toBeInTheDocument();
    expect(screen.getByText('Maria')).toBeInTheDocument();
    expect(screen.getByText('✅')).toBeInTheDocument();
    expect(screen.getByText('❌')).toBeInTheDocument();
  });

  it('deve adicionar convidado com sucesso e limpar campos', async () => {
    mockAddGuest.mockResolvedValue({
      success: true,
      message: 'Adicionado!',
    });

    render(<Dashboard />);
    fireEvent.change(screen.getByPlaceholderText('Nome'), {
      target: { value: 'Carlos' },
    });
    fireEvent.change(screen.getByPlaceholderText('Telefone'), {
      target: { value: '1177777777' },
    });
    fireEvent.click(screen.getByText('Adicionar Convidado'));

    await waitFor(() => {
      expect(mockAddGuest).toHaveBeenCalledWith('Carlos', '1177777777');
    });

    expect(await screen.findByText('Adicionado!')).toBeInTheDocument();
  });

  it('deve mostrar notificação de erro ao falhar ao adicionar convidado', async () => {
    mockAddGuest.mockResolvedValue({
      success: false,
      type: 'error',
      message: 'Erro ao adicionar.',
    });

    render(<Dashboard />);
    fireEvent.change(screen.getByPlaceholderText('Nome'), {
      target: { value: 'Carlos' },
    });
    fireEvent.change(screen.getByPlaceholderText('Telefone'), {
      target: { value: '1177777777' },
    });
    fireEvent.click(screen.getByText('Adicionar Convidado'));

    expect(await screen.findByText('Erro ao adicionar.')).toBeInTheDocument();
  });

  it('deve chamar deleteGuest ao clicar em "Excluir"', () => {
    render(<Dashboard />);
    const excluirButtons = screen.getAllByText('Excluir');
    fireEvent.click(excluirButtons[0]);

    expect(mockDeleteGuest).toHaveBeenCalledWith(1);
  });

  it('deve chamar logout ao clicar no botão "Sair"', () => {
    render(<Dashboard />);
    fireEvent.click(screen.getByText('Sair'));
    expect(mockLogout).toHaveBeenCalled();
  });
});
