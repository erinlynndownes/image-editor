import { generateEditedImageUrl } from "./ImagesUtils";

describe("generateImageUrl", () => {
  it("should generate a URL with only required parameters", () => {
    const imageUrl = generateEditedImageUrl(123, 800, 600);
    expect(imageUrl).toBe("/id/123/800/600");
  });

  it("should generate a URL with grayscale option", () => {
    const imageUrl = generateEditedImageUrl(123, 800, 600, true);
    expect(imageUrl).toBe("/id/123/800/600?grayscale");
  });

  it("should generate a URL with blur option", () => {
    const imageUrl = generateEditedImageUrl(123, 800, 600, false, 10);
    expect(imageUrl).toBe("/id/123/800/600?blur=10");
  });

  it("should generate a URL with grayscale and blur options", () => {
    const imageUrl = generateEditedImageUrl(123, 800, 600, true, 10);
    expect(imageUrl).toBe("/id/123/800/600?grayscale&blur=10");
  });
});
