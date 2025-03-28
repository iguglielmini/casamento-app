import {
    DashboardProvider,
    useDashboard,
  } from './dashboardContext';
  import { render, screen, waitFor } from '@testing-library/react';
  import React from 'react';
  
  jest.mock('../utils/phoneUtils.ts', () => ({
    cleanPhone: (v: string) => v.replace(/\D/g, ''),
  }));
  
  jest.mock('next/navigation', () => ({
    useRouter: jest.fn(() => ({ push: jest.fn() })),
  }));
  
  // localStorage mock
  const localStorageMock = (() => {
    let store: Record<string, string> = {};
    return {
      getItem: (key: string) => store[key] || null,
      setItem: (key: string, value: string) => {
        store[key] = value;
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      },
    };
  })();
  Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
  });
  
  describe('DashboardContext', () => {
    afterEach(() => {
      jest.clearAllMocks();
      localStorage.clear();
    });
  
    it('lança erro se useDashboard for usado fora do provider', () => {
      const renderWithoutProvider = () => {
        const Component = () => {
          useDashboard();
          return null;
        };
        render(<Component />);
      };
  
      expect(renderWithoutProvider).toThrow(
        'useDashboard deve ser usado dentro do DashboardProvider'
      );
    });
  
    it('renderiza os dados corretamente dentro do provider', async () => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve([
              { id: 1, name: 'João', phone: '111', confirmed: true },
              { id: 2, name: 'Maria', phone: '222', confirmed: false },
            ]),
        })
      ) as jest.Mock;
  
      localStorage.setItem('token', 'secret-dashboard-token');
  
      const TestComponent = () => {
        const { totalGuests, confirmedGuests, unconfirmedGuests } = useDashboard();
        return (
          <>
            <p>Total: {totalGuests}</p>
            <p>Confirmados: {confirmedGuests}</p>
            <p>Não confirmados: {unconfirmedGuests}</p>
          </>
        );
      };
  
      render(
        <DashboardProvider>
          <TestComponent />
        </DashboardProvider>
      );
  
      await waitFor(() => {
        expect(screen.getByText('Total: 2')).toBeInTheDocument();
        expect(screen.getByText('Confirmados: 1')).toBeInTheDocument();
        expect(screen.getByText('Não confirmados: 1')).toBeInTheDocument();
      });
    });
  
    it('addGuest retorna sucesso corretamente', async () => {
      global.fetch = jest.fn()
        // chamada de addGuest
        .mockResolvedValueOnce({
          status: 200,
          ok: true,
          json: () => Promise.resolve({}),
        })
        // chamada do fetchGuests
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve([]),
        });
  
      const TestComponent = () => {
        const { addGuest } = useDashboard();
        const [msg, setMsg] = React.useState('');
  
        React.useEffect(() => {
          addGuest('Fulano', '(11) 99999-9999').then((res) => {
            setMsg(res.message);
          });
        }, []);
  
        return <p>{msg}</p>;
      };
  
      render(
        <DashboardProvider>
          <TestComponent />
        </DashboardProvider>
      );
  
      await waitFor(() => {
        expect(screen.getByText('Convidado adicionado com sucesso!')).toBeInTheDocument();
      });
    });
  
    it('addGuest retorna mensagem de telefone já cadastrado', async () => {
      global.fetch = jest.fn().mockResolvedValue({
        status: 409,
        ok: false,
        json: () => Promise.resolve({}),
      });
  
      const TestComponent = () => {
        const { addGuest } = useDashboard();
        const [msg, setMsg] = React.useState('');
  
        React.useEffect(() => {
          addGuest('Fulano', '(11) 99999-9999').then((res) => {
            setMsg(res.message);
          });
        }, []);
  
        return <p>{msg}</p>;
      };
  
      render(
        <DashboardProvider>
          <TestComponent />
        </DashboardProvider>
      );
  
      await waitFor(() => {
        expect(screen.getByText('Este telefone já está cadastrado como convidado.')).toBeInTheDocument();
      });
    });
  
    it('logout remove token e redireciona', () => {
      const pushMock = jest.fn();
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const useRouter = require('next/navigation').useRouter;
      useRouter.mockReturnValue({ push: pushMock });
  
      localStorage.setItem('token', 'fake');
  
      const TestComponent = () => {
        const { logout } = useDashboard();
        React.useEffect(() => {
          logout();
        }, [logout]);
        return <p>Logout executado</p>;
      };
  
      render(
        <DashboardProvider>
          <TestComponent />
        </DashboardProvider>
      );
  
      expect(localStorage.getItem('token')).toBeNull();
      expect(pushMock).toHaveBeenCalledWith('/login');
    });
  });
  