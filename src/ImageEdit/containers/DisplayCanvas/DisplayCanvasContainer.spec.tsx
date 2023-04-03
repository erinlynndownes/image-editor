import { render } from "@testing-library/react";
import { ImageEditState } from "../../feature";
import { ImageEditContext } from "../../state";
import DisplayCanvas from "./DisplayCanvas";

describe("DisplayCanvas", () => {
  it("renders the filtered image", () => {
    const editedImg = {
      filteredImageUrl: "https://example.com/image.jpg",
      width: 800,
      height: 600
    };
    const mockContextValue = { editedImg } as ImageEditState;
    const { getByAltText } = render(
      <ImageEditContext.Provider value={mockContextValue}>
        <DisplayCanvas />
      </ImageEditContext.Provider>
    );
    const imageElement = getByAltText("Filtered image");
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute("src", editedImg.filteredImageUrl);
    expect(imageElement).toHaveAttribute("width", editedImg.width.toString());
    expect(imageElement).toHaveAttribute("height", editedImg.height.toString());
  });

  it("renders null when there is no edited image", () => {
    const mockContextValue = { editedImg: undefined } as ImageEditState;
    const { container } = render(
      <ImageEditContext.Provider value={mockContextValue}>
        <DisplayCanvas />
      </ImageEditContext.Provider>
    );
    expect(container.firstChild).toBeNull();
  });
});
