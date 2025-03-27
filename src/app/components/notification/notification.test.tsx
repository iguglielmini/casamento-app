import { render, screen } from "@testing-library/react";
import Notification from "./notification";

describe("Notification component", () => {
  it("deve renderizar mensagem de sucesso com ícone correto", () => {
    render(<Notification type="success" message="Operação bem-sucedida!" />);
    expect(screen.getByText("Operação bem-sucedida!")).toBeInTheDocument();
    expect(screen.getByTestId("icon-success")).toBeInTheDocument();
  });

  it("deve renderizar mensagem de erro com ícone correto", () => {
    render(<Notification type="error" message="Algo deu errado!" />);
    expect(screen.getByText("Algo deu errado!")).toBeInTheDocument();
    expect(screen.getByTestId("icon-error")).toBeInTheDocument();
  });

  it("deve renderizar mensagem de aviso com ícone correto", () => {
    render(
      <Notification type="warning" message="Atenção! Confira os dados." />
    );
    expect(screen.getByText("Atenção! Confira os dados.")).toBeInTheDocument();
    expect(screen.getByTestId("icon-warning")).toBeInTheDocument();
  });
});
