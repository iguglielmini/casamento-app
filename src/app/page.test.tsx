/* eslint-disable react/display-name */
import { render, screen } from "@testing-library/react";
import Home from "./page";

jest.mock("./components/introPage/introPage", () => () => (
  <div data-testid="intro-page">IntroPage</div>
));
jest.mock("./components/confirmingPresence/confirmingPresence", () => () => (
  <div data-testid="confirming-presence">ConfirmingPresence</div>
));
jest.mock("./components/cardLocation/cardLocation", () => () => (
  <div data-testid="card-location">CardLocation</div>
));
jest.mock("./components/faq/faq", () => () => <div data-testid="faq">Faq</div>);
jest.mock("./components/programEvent/programEvent", () => () => (
  <div data-testid="program-event">ProgramEvent</div>
));

describe("Home Page", () => {
  it("deve renderizar os títulos e seções principais da página", () => {
    render(<Home />);

    // Texto de introdução "Nossa História"
    expect(screen.getByText("Nossa História")).toBeInTheDocument();

    // Texto da cerimônia
    expect(screen.getByText("Cerimônia")).toBeInTheDocument();
    expect(
      screen.getByText(/Não percam esse momento lindo/i)
    ).toBeInTheDocument();

    // Verifica se os componentes renderizaram via mock
    expect(screen.getByTestId("intro-page")).toBeInTheDocument();
    expect(screen.getByTestId("card-location")).toBeInTheDocument();
    expect(screen.getByTestId("faq")).toBeInTheDocument();
    expect(screen.getByTestId("program-event")).toBeInTheDocument();
    expect(screen.getByTestId("confirming-presence")).toBeInTheDocument();
  });

  it("deve conter o parágrafo com a história do casal", () => {
    render(<Home />);
    expect(
      screen.getByText(/Nós nos conhecemos há muito tempo/i)
    ).toBeInTheDocument();
  });
});
