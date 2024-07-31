import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { LayoutPage } from "./layout-page";

vi.mock("../hooks/useFavoriteCharacters.ts", () => ({
  useFavoriteCharacters: () => ({ favCharacters: [] }),
}));


describe("LayoutPage", () => {
  it("should render the logo", () => {
    render(<LayoutPage>{<div></div>}</LayoutPage>);
    const logo = screen.getByAltText("logo-marvel-svg");
    expect(logo).toBeInTheDocument();
  });

  it("should render the favorite button", () => {
    render(<LayoutPage>{<div></div>}</LayoutPage>);
    const favoriteButton = screen.getByTestId("header-link");
    expect(favoriteButton).toBeInTheDocument();
  });
});