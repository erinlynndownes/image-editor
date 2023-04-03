import React from "react";
import { render, screen } from "@testing-library/react";
import DisplayCanvas from "./DisplayCanvas";

describe("DisplayCanvas", () => {
  const props = {
    filteredImageUrl: "https://example.com/image.jpg",
    width: 500,
    height: 400
  };

  it("renders an image with the correct URL, width and height", () => {
    render(<DisplayCanvas {...props} />);
    const imageElement = screen.getByAltText(
      "Filtered image"
    ) as HTMLImageElement;
    expect(imageElement).toBeInTheDocument();
    expect(imageElement.src).toBe(props.filteredImageUrl);
    expect(imageElement.width).toBe(props.width);
    expect(imageElement.height).toBe(props.height);
  });
});
