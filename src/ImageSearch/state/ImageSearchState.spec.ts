import { renderHook, act } from "@testing-library/react-hooks";
import { DEFAULT_FETCH_LIMIT, getFilteredImageList } from "../../api";
import { ImageDetail } from "../../api/types";
import { DEBOUNCE_TIME } from "../feature";
import { useImageSearchState } from "./ImageSearch";

jest.mock("../../api");
jest.mock("../feature");

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

  it("should return the initial state", async () => {
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

  it("should filter images correctly", async () => {
    // since we are mocking the whole getFilteredList function, it won't use filterFn passed in by the hook, which is why chatGPT mocked it
    // but mocking this filtering here isn't really testing anything
    const mockFilterFn = (details: ImageDetail, searchInput: string) =>
      details.author === searchInput;
    const mockFilter = (details: ImageDetail) =>
      mockFilterFn(details, "author 1");
    mockGetFilteredImageList.mockImplementationOnce((mockFilter) =>
      Promise.resolve([mockImages[0]])
    );

    const { result, waitForNextUpdate } = renderHook(() =>
      useImageSearchState()
    );

    act(() => {
      result.current.setSearchInput("author 1");
    });

    await waitForNextUpdate();

    expect(result.current.images).toEqual([mockImages[0]]);
  });

  it.only("should debounce the search input changes", async () => {
    jest.useFakeTimers();
    mockGetFilteredImageList.mockResolvedValue(mockImages);

    const { result, waitForNextUpdate } = renderHook(() =>
      useImageSearchState()
    );

    act(() => {
      result.current.setSearchInput("author 1");
    });

    act(() => {
      result.current.setSearchInput("author 2");
    });

    act(() => {
      result.current.setSearchInput("author 3");
    });

    jest.advanceTimersByTime(DEBOUNCE_TIME);

    expect(result.current.isLoading).toBe(true);

    await act(async () => {
      await waitForNextUpdate();
    });

    expect(mockGetFilteredImageList).toHaveBeenCalledTimes(1);
    expect(mockGetFilteredImageList).toHaveBeenCalledWith(
      expect.any(Function),
      1,
      DEFAULT_FETCH_LIMIT
    );
    expect(result.current.images).toEqual(mockImages);
    expect(result.current.hasMoreResults).toBe(true);
    expect(result.current.searchInput).toBe("author 3");
    expect(result.current.currentPage).toBe(1);
    expect(result.current.isLoading).toBe(false);
  });
});
