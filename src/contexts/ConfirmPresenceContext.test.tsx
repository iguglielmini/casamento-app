import {
    ConfirmPresenceProvider,
    useConfirmPresence,
  } from './ConfirmPresenceContext';
  import { render, screen, waitFor } from '@testing-library/react';
  import React from 'react';
  
  // mock do localStorage
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
  
  jest.mock('../utils/phoneUtils.ts', () => ({
    cleanPhone: (value: string) => value.replace(/\D/g, ''),
  }));
  
  describe('ConfirmPresenceContext', () => {
    afterEach(() => {
      jest.clearAllMocks();
      localStorage.clear();
    });
  
    it('lança erro se usar useConfirmPresence fora do provider', () => {
      const renderWithoutProvider = () => {
        const Component = () => {
          useConfirmPresence();
          return null;
        };
        render(<Component />);
      };
  
      expect(renderWithoutProvider).toThrow(
        'useConfirmPresence deve ser usado dentro do ConfirmPresenceProvider'
      );
    });
  
    it('confirma presença com sucesso e atualiza localStorage', async () => {
        global.fetch = jest.fn(() =>
          Promise.resolve({
            ok: true,
            json: () => Promise.resolve({ guest: { name: 'João' } }),
          })
        ) as jest.Mock;
      
        const TestComponent = () => {
          const { confirmPresence, loading } = useConfirmPresence();
          const [resultMessage, setResultMessage] = React.useState('');
      
          React.useEffect(() => {
            confirmPresence('(11) 99999-9999', 'João').then((result) => {
              setResultMessage(result.message);
            });
          }, []);
      
          return (
            <div>
              <p>{loading ? 'Carregando...' : 'Pronto'}</p>
              <p>{resultMessage}</p>
            </div>
          );
        };
      
        render(
          <ConfirmPresenceProvider>
            <TestComponent />
          </ConfirmPresenceProvider>
        );
      
        expect(screen.getByText('Carregando...')).toBeInTheDocument();
      
        await waitFor(() => {
          expect(screen.getByText('Pronto')).toBeInTheDocument();
          expect(screen.getByText('Presença confirmada com sucesso, João!')).toBeInTheDocument();
          expect(localStorage.getItem('guestConfirmed')).toBe('true');
        });
      });
      
  
      it('retorna erro se fetch falhar', async () => {
        global.fetch = jest.fn(() =>
          Promise.resolve({
            ok: false,
            json: () => Promise.resolve({ error: 'Telefone inválido' }),
          })
        ) as jest.Mock;
      
        const TestComponent = () => {
          const { confirmPresence } = useConfirmPresence();
          const [resultMessage, setResultMessage] = React.useState('');
      
          React.useEffect(() => {
            confirmPresence('0000', 'Invalido').then((result) => {
              setResultMessage(result.message);
            });
          }, []);
      
          return <p>{resultMessage}</p>;
        };
      
        render(
          <ConfirmPresenceProvider>
            <TestComponent />
          </ConfirmPresenceProvider>
        );
      
        await waitFor(() => {
          expect(screen.getByText('Telefone inválido')).toBeInTheDocument();
        });
      });
      
  });
  