/* eslint-disable react/display-name */
import { render, screen } from '@testing-library/react';
import RootLayout from './layout';

jest.mock('./components/footer/footer', () => () => (
  <div data-testid="footer">Footer</div>
));

jest.mock('../contexts/ConfirmPresenceContext.tsx', () => ({
  ConfirmPresenceProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="provider">{children}</div>
  ),
}));

describe('RootLayout', () => {
  it('deve renderizar children, provider e footer corretamente', () => {
    const ChildComponent = () => <p>Conteúdo principal</p>;

    // render apenas o conteúdo do body
    render(
      <RootLayout>
        <ChildComponent />
      </RootLayout>
    );

    // Verifica se o conteúdo foi renderizado
    expect(screen.getByText('Conteúdo principal')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
    expect(screen.getByTestId('provider')).toBeInTheDocument();

    // Verifica se as classes de fonte estão no body
    // const body = container.querySelector('body');
    // expect(body?.getAttribute('class')).toEqual(
    //   expect.stringContaining('--font-geist-sans')
    // );
    // expect(body?.getAttribute('class')).toEqual(
    //   expect.stringContaining('--font-geist-mono')
    // );
    // expect(body?.getAttribute('class')).toEqual(
    //   expect.stringContaining('antialiased')
    // );
  });
});
