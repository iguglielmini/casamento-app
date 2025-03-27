import { render, screen } from '@testing-library/react';
import DashboardLayout from './layout';

// 👇 mock do DashboardProvider para não depender do contexto real
jest.mock('../../contexts/dashboardContext.tsx', () => ({
  DashboardProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="dashboard-provider">{children}</div>
  ),
}));

describe('DashboardLayout', () => {
  it('deve renderizar o children dentro do DashboardProvider', () => {
    render(
      <DashboardLayout>
        <p>Conteúdo de teste</p>
      </DashboardLayout>
    );

    expect(screen.getByTestId('dashboard-provider')).toBeInTheDocument();
    expect(screen.getByText('Conteúdo de teste')).toBeInTheDocument();
  });
});
