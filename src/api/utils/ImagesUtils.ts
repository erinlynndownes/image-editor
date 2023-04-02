export const generateEditedImageUrl = (
  id: number,
  width?: number,
  height?: number,
  grayscale?: boolean,
  blur?: number
) => {
  let url = `/id/${id}`;

  if (width) {
    url += `/${width}`;
  }

  if (height) {
    url += `/${height}`;
  }

  if (grayscale) {
    url += "?grayscale";
  }

  if (blur) {
    url += `${grayscale ? "&" : "?"}blur=${blur}`;
  }

  return url;
};
