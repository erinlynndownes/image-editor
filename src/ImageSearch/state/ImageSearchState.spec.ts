import { renderHook } from "@testing-library/react-hooks";
import { getImageList } from "../../api";
import { ImageDetail } from "../../api/types";
import { useImageSearchState } from "./ImageSearch";

jest.mock("../../api");
jest.mock("../feature");

const mockGetImageList = getImageList as jest.MockedFunction<
  typeof getImageList
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
    expect(result.current.hasMoreResults).toBe(true);
  });

  it("should set isLoading to true while fetching images", async () => {
    mockGetImageList.mockResolvedValueOnce(mockImages);

    const { result, waitForNextUpdate } = renderHook(() =>
      useImageSearchState()
    );

    expect(result.current.isLoading).toBe(true);

    await waitForNextUpdate();

    expect(result.current.isLoading).toBe(false);
  });

  it("should set loadedImages and hasMoreResults correctly", async () => {
    mockGetImageList.mockResolvedValueOnce(mockImages);

    const { result, waitForNextUpdate } = renderHook(() =>
      useImageSearchState()
    );

    await waitForNextUpdate();

    expect(result.current.images).toEqual(mockImages);
    expect(result.current.hasMoreResults).toBe(false);
  });
});
