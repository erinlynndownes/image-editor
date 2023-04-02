import { render, screen } from "@testing-library/react";
import ImageCard, { ImageCardProps } from "./ImageCard";

describe("ImageCard", () => {
  const props: ImageCardProps = {
    author: "John Doe",
    url: "https://example.com/image.jpg",
    id: "1234"
  };

  it("renders the author name", () => {
    render(<ImageCard {...props} />);
    expect(screen.getByText(props.author)).toBeInTheDocument();
  });

  it("renders the image with the correct source and alt text", () => {
    render(<ImageCard {...props} />);
    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("src", props.url);
    expect(image).toHaveAttribute("alt", props.id);
  });
});
