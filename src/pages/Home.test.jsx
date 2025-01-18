import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Home from "./Home"; // Importera din Home-komponent

describe("Home", () => {
  it("renderar rätt rubrik och beskrivning", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Välkommen till Svenska Elsparkcyklar"
    );
    expect(screen.getByText("Upptäck staden på ett hållbart och roligt sätt!")).toBeInTheDocument();
  });

  it("renderar länken 'Kom igång' med rätt URL", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    const link = screen.getByRole("link", { name: "Kom igång" });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/register");
  });

  it("renderar funktionella sektioner", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    // Kontrollera "Våra tjänster"-sektionen
    expect(screen.getByRole("heading", { level: 2, name: "Våra tjänster" })).toBeInTheDocument();
    expect(screen.getByText("Snabba och Smidiga")).toBeInTheDocument();
    expect(screen.getByText("Miljövänliga")).toBeInTheDocument();
    expect(screen.getByText("Enkel App")).toBeInTheDocument();

    // Kontrollera "Hur det fungerar"-sektionen
    expect(screen.getByRole("heading", { level: 2, name: "Hur det fungerar" })).toBeInTheDocument();
    expect(screen.getByText("Ladda ner appen")).toBeInTheDocument();
    expect(screen.getByText("Hitta en elsparkcykel nära dig")).toBeInTheDocument();
    expect(screen.getByText("Skanna QR-koden för att låsa upp")).toBeInTheDocument();
    expect(screen.getByText("Kör och ha kul!")).toBeInTheDocument();

    // Kontrollera "Vad våra kunder säger"-sektionen
    expect(
      screen.getByRole("heading", { level: 2, name: "Vad våra kunder säger" })
    ).toBeInTheDocument();
    expect(screen.getByText('"Så smidigt och kul att ta sig runt i stan!"')).toBeInTheDocument();
    expect(screen.getByText('"Perfekt för korta sträckor och miljövänligt!"')).toBeInTheDocument();
  });
});
