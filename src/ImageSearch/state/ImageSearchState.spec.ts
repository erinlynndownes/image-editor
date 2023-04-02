import { renderHook, act } from "@testing-library/react-hooks";
import { getFilteredImageList } from "../../api";
import { ImageDetail } from "../../api/types";
import { useImageSearchState } from "./ImageSearch";

jest.mock("../../api");

const mockGetFilteredImageList = getFilteredImageList as jest.MockedFunction<
  typeof getFilteredImageList
>;

const mockImages: ImageDetail[] = [
  { id: "1", author: "author 1", url: "image1.jpg" },
  { id: "2", author: "author 2", url: "image2.jpg" },
  { id: "3", author: "author 3", url: "image3.jpg" }
] as ImageDetail[];

describe("useImageSearchState", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it.only("should return the initial state", async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useImageSearchState()
    );
    await waitForNextUpdate();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.images).toEqual([]);
    expect(result.current.hasMoreResults).toBe(false);
    expect(result.current.searchInput).toBeUndefined();
    expect(result.current.currentPage).toBe(1);
  });

  it("should set isLoading to true while fetching images", async () => {
    mockGetFilteredImageList.mockResolvedValueOnce(mockImages);

    const { result, waitForNextUpdate } = renderHook(() =>
      useImageSearchState()
    );

    expect(result.current.isLoading).toBe(true);

    await waitForNextUpdate();

    expect(result.current.isLoading).toBe(false);
  });

  it("should set loadedImages and hasMoreResults correctly", async () => {
    mockGetFilteredImageList.mockResolvedValueOnce(mockImages);

    const { result, waitForNextUpdate } = renderHook(() =>
      useImageSearchState()
    );

    await waitForNextUpdate();

    expect(result.current.images).toEqual(mockImages);
    expect(result.current.hasMoreResults).toBe(false);
  });

  it.only("should filter images correctly", async () => {
    mockGetFilteredImageList.mockResolvedValueOnce(mockImages);

    const { result, waitForNextUpdate } = renderHook(() =>
      useImageSearchState()
    );

    act(() => {
      result.current.setSearchInput("author 1");
    });

    await waitForNextUpdate();

    console.log(
      "RES: ",
      result.current.images.length,
      "LOADING; ",
      result.current.isLoading,
      "SEARCH INPUT: ",
      result.current.searchInput
    );

    expect(result.current.images).toEqual([mockImages[0]]);
  });
});
