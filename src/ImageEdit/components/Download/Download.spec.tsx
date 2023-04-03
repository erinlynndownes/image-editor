import { render, screen, fireEvent } from "@testing-library/react";
import Download from "./Download";

describe("Download component", () => {
  it("should render a Download button", () => {
    const handleDownload = jest.fn();
    render(<Download handleDownload={handleDownload} />);
    expect(
      screen.getByRole("button", { name: "Download" })
    ).toBeInTheDocument();
  });

  it("should call the handleDownload function when the button is clicked", () => {
    const handleDownload = jest.fn();
    render(<Download handleDownload={handleDownload} />);
    const downloadButton = screen.getByRole("button", { name: "Download" });
    fireEvent.click(downloadButton);
    expect(handleDownload).toHaveBeenCalled();
  });
});
