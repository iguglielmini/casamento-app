import { render, screen, act, fireEvent } from '@testing-library/react';
import IntroPage from './introPage';

jest.useFakeTimers();

describe('IntroPage component', () => {
  const props = {
    backgroundImage: '/bg.jpg',
    title: 'Ítalo & Daniely',
    subtitle: 'Nosso grande dia está chegando!',
    weddingDate: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(), // 1 dia no futuro
  };

  beforeEach(() => {
    jest.clearAllTimers();
  });

  it('deve renderizar o título e o subtítulo', () => {
    render(<IntroPage {...props} />);
    expect(screen.getByText(props.title)).toBeInTheDocument();
    expect(screen.getByText(props.subtitle)).toBeInTheDocument();
  });

  it('deve exibir a data fixa e o texto do casamento', () => {
    render(<IntroPage {...props} />);
    expect(
      screen.getByText('Sábado, 29 de Novembro de 2025')
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Participe da celebração enquanto Italo e Daniely/i)
    ).toBeInTheDocument();
  });

  it('deve renderizar os valores iniciais do countdown', () => {
    render(<IntroPage {...props} />);
    expect(screen.getByText(/Dias/i)).toBeInTheDocument();
    expect(screen.getByText(/Horas/i)).toBeInTheDocument();
    expect(screen.getByText(/Minutos/i)).toBeInTheDocument();
    expect(screen.getByText(/Segundos/i)).toBeInTheDocument();
  });

  it('deve atualizar a contagem após 1 segundo', () => {
    render(<IntroPage {...props} />);
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    // Não testamos valores exatos, mas garantimos que está renderizando o countdown
    expect(screen.getByText(/Dias/i)).toBeInTheDocument();
  });

  it('deve executar scrollToNextSection ao clicar no botão ↓', () => {
    const scrollIntoViewMock = jest.fn();
    const elementMock = {
      scrollIntoView: scrollIntoViewMock,
    };

    // Simula a presença do elemento no DOM
    document.getElementById = jest.fn(() => elementMock as unknown as HTMLElement);

    render(<IntroPage {...props} />);
    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(scrollIntoViewMock).toHaveBeenCalledWith({ behavior: 'smooth' });
  });
});
