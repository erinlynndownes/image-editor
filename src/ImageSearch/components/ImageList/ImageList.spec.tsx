import { act, fireEvent, render, screen } from "@testing-library/react";
import { ImageDetail } from "../../../api/types";
import ImageList from "./ImageList";

describe("ImageList", () => {
  const images = [
    {
      id: 1,
      author: "John Doe",
      download_url: "https://example.com/image1.jpg"
    },
    {
      id: 2,
      author: "Jane Doe",
      download_url: "https://example.com/image2.jpg"
    }
  ] as unknown as ImageDetail[];
  const handleLoadMore = jest.fn();
  const loading = false;

  beforeAll(() => {
    // Mock the IntersectionObserver API
    // @ts-ignore
    window.IntersectionObserver = jest.fn(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn()
    }));
  });

  afterAll(() => {
    // Clean up the mock
    // @ts-ignore
    window.IntersectionObserver.mockRestore();
  });

  beforeEach(() => {
    render(
      <ImageList
        images={images}
        handleLoadMore={handleLoadMore}
        loading={loading}
      />
    );
  });

  it("renders a list of images", () => {
    expect(screen.getByAltText(images[0].id)).toBeInTheDocument();
    expect(screen.getByAltText(images[1].id)).toBeInTheDocument();
  });
});
