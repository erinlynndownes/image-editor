import { act, render, renderHook, waitFor } from "@testing-library/react";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { ImageEditContext } from "./ImageEditState";
import ImageEditStateProvider from "./ImageEditStateProvider";
import { getImageDetails } from "../../api";

jest.mock("../../api", () => ({
  getImageDetails: jest.fn(),
  getImageById: jest.fn()
}));

jest.mock("react-router-dom", () => ({
  useParams: jest.fn()
}));

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn()
};

describe("ImageEditStateProvider", () => {
  beforeAll(() => {
    Object.defineProperty(window, "localStorage", {
      value: localStorageMock
    });
  });
  beforeEach(() => {
    (useParams as jest.Mock).mockReturnValue({ imageId: "1" });
    const mockUrl = "mock-url";
    URL.createObjectURL = jest.fn().mockReturnValue(mockUrl);
  });

  test("renders children", () => {
    const { getByText } = render(
      <ImageEditStateProvider>
        <div>Child Component</div>
      </ImageEditStateProvider>
    );
    expect(getByText("Child Component")).toBeInTheDocument();
  });

  test("fetches image details on mount", async () => {
    const mockedImageDetails = {
      id: 1,
      name: "test-image",
      url: "path/to/image.jpg"
    };
    const getImageDetailsMock = getImageDetails as jest.Mock;
    getImageDetailsMock.mockImplementation(() =>
      Promise.resolve(mockedImageDetails)
    );
    const { result } = renderHook(() => useContext(ImageEditContext), {
      wrapper: ImageEditStateProvider
    });

    expect(result.current?.imageDetails).toBeUndefined();

    await act(async () => {
      await waitFor(() => result.current?.imageDetails !== undefined);
    });
    expect(result.current?.imageDetails).toEqual(mockedImageDetails);
  });

  test("adds image processor function on change", async () => {
    const { result } = renderHook(() => useContext(ImageEditContext), {
      wrapper: ImageEditStateProvider
    });
    act(() => {
      // @ts-ignore
      result.current?.addImageProcessFunction((img) => img);
    });
    expect(result.current?.processFunctions).toHaveLength(1);
  });
});
