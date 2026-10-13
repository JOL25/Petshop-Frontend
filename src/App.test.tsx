import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./auth/AuthContext";

describe("App", () => {
  it("renders the Petshop home sections", () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("heading", {
        name: /collares con carácter/i,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: /categorías/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /más vendidos/i }),
    ).toBeInTheDocument();
  });
});
