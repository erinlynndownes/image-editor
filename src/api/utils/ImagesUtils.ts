export function generateEditedImageUrl(
  imageId: number,
  width?: number,
  height?: number,
  grayscale?: boolean,
  blur?: number
): string {
  let url = `/id/${imageId}`;

  if (width) {
    url += `/${width}`;
  }

  if (height) {
    url += `/${height}`;
  }

  if (grayscale) {
    url += `?grayscale`;
  }

  if (blur) {
    url += `?blur=${blur}`;
  }

  return url;
}
