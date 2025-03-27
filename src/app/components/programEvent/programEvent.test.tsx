import { render, screen } from "@testing-library/react";
import ProgramEvent from "./programEvent";

describe("ProgramEvent component", () => {
  it("deve renderizar o título principal", () => {
    render(<ProgramEvent />);
    expect(screen.getByText("Programação do Casamento")).toBeInTheDocument();
  });

  it("deve renderizar todos os eventos da programação", () => {
    render(<ProgramEvent />);

    const events = [
      { time: "18:30", description: "Recepção dos convidados" },
      { time: "19:00", description: "Cerimônia Religiosa" },
      { time: "20:00", description: "Jantar Programado" },
      { time: "21:00", description: "Celebração" },
    ];

    events.forEach(({ time, description }) => {
      expect(screen.getByText(time)).toBeInTheDocument();
      expect(screen.getByText(description)).toBeInTheDocument();
    });
  });

  it("deve renderizar imagens decorativas com os atributos corretos", () => {
    render(<ProgramEvent />);

    const leftImage = screen.getByAltText("Left decoration");
    const rightImage = screen.getByAltText("Right decoration");

    expect(leftImage).toHaveAttribute("src", "/intro-1-casamento.png");
    expect(rightImage).toHaveAttribute("src", "/intro-2-casamento.png");
  });
});
