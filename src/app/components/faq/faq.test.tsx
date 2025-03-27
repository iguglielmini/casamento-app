import { render, screen } from '@testing-library/react';
import Faq from './faq';

describe('Faq component', () => {
  it('deve renderizar o título principal', () => {
    render(<Faq />);
    expect(
      screen.getByText('Você deve estar se perguntando...')
    ).toBeInTheDocument();
  });

  it('deve renderizar todas as perguntas e respostas', () => {
    render(<Faq />);

    expect(screen.getByText('Como posso chegar ao local?')).toBeInTheDocument();
    expect(
      screen.getByText(
        /O local é acessível por ônibus e carro/i
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText('Quais são as regras de vestuário?')
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Lembre-se: branco somente para a noiva!/i)
    ).toBeInTheDocument();

    expect(screen.getByText('Posso convidar alguem?')).toBeInTheDocument();
    expect(
      screen.getByText(/Seu convite é pessoal, único e intransferível/i)
    ).toBeInTheDocument();
  });
});
