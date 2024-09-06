import { mockCharacter } from "@/lib/mock";
import { renderHook, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import { useCharacters } from "./useCharacters";

const mockSetCharacters = vi.fn();
const mockSetIsLoading = vi.fn();

vi.mock("@/contexts/app-config-context", () => ({
  useAppConfig: () => ({
    characters: null,
    setCharacters: mockSetCharacters,
    isLoading: false,
    setIsLoading: mockSetIsLoading,
    filteredCharacters: null
  })
}));

const mockFetcher = vi.fn().mockResolvedValue(mockCharacter);
vi.mock("@/lib/utils", () => ({
  fetcher: (url: string) => mockFetcher(`http://localhost${url}`)
}));

describe("useCharacters", async () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test("should fetch characters and update state", async () => {
    const { result } = renderHook(() => useCharacters());

    expect(result.current.characters).toBeNull();
    expect(result.current.filteredCharacters).toBeNull();
    expect(result.current.isLoading).toBe(false);

    await waitFor(() => expect(mockSetIsLoading).toHaveBeenCalledWith(true));
    await waitFor(() =>
      expect(mockFetcher).toHaveBeenCalledWith(
        "http://localhost/api/get-characters"
      )
    );
    await waitFor(() => expect(mockSetCharacters).toHaveBeenCalled());
    await waitFor(() => expect(mockSetIsLoading).toHaveBeenCalled());
    await waitFor(() => expect(result.current.isLoading).toBe(false));
  });
});
