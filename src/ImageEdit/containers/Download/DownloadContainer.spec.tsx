import { render, screen } from "@testing-library/react";
import { ImageEditState } from "../../feature";
import { ImageEditContext } from "../../state";
import Download from "./Download";

describe("Download", () => {
  test("renders null if no ImageEditContext provided", () => {
    render(<Download />);
    expect(screen.queryByTestId("download-component")).toBeNull();
  });

  test("renders DownloadComponent if ImageEditContext provided", () => {
    const ctx = {
      editedImg: { filteredImageUrl: "https://example.com/image.jpg" }
    } as ImageEditState;
    render(
      <ImageEditContext.Provider value={ctx}>
        <Download />
      </ImageEditContext.Provider>
    );
    expect(screen.getByTestId("download-component")).toBeInTheDocument();
  });
});
