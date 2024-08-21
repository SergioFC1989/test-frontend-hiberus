import { Layout } from "@/components/layout/layout";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("../hooks/useFavoriteCharacters.ts", () => ({
  useFavoriteCharacters: () => ({ favCharacters: [] })
}));

describe("Layout", () => {
  it("should render the logo", () => {
    render(<Layout>{<div></div>}</Layout>);
    const logo = screen.getByAltText("logo-marvel-svg");
    expect(logo).toBeInTheDocument();
  });

  it("should render the favorite button", () => {
    render(<Layout>{<div></div>}</Layout>);
    const favoriteButton = screen.getByTestId("header-link");
    expect(favoriteButton).toBeInTheDocument();
  });
});
