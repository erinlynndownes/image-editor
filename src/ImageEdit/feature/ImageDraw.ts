import { ImageEditValues, ImageProcessData, ImageProcessFn } from "./ImageEdit";

export interface FilterImageData {
  filteredImageUrl: string;
  width: number;
  height: number;
}

export const createFilteredImage = async (
  imageProcessData: ImageProcessData,
  canvas: HTMLCanvasElement,
  blob: Blob
): Promise<FilterImageData | undefined> => {
  const drawWidth = imageProcessData.width;
  const drawHeight = imageProcessData.height;
  const filterString = imageProcessData.filterString;

  if (!drawWidth || !drawHeight) return;
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Could not access canvas context");
  }

  const img = new Image();
  img.src = URL.createObjectURL(blob);
  return new Promise((resolve, reject) => {
    img.onload = function () {
      canvas.width = drawWidth;
      canvas.height = drawHeight;
      ctx.clearRect(0, 0, drawWidth, drawHeight);
      ctx.drawImage(img, 0, 0, drawWidth, drawHeight);
      ctx.filter = filterString;
      ctx.drawImage(canvas, 0, 0, drawWidth, drawHeight);

      const data = canvas.toDataURL("image/png");

      resolve({ filteredImageUrl: data, width: drawWidth, height: drawHeight });

      URL.revokeObjectURL(img.src);
    };
    img.onerror = function () {
      reject("Error loading image");

      URL.revokeObjectURL(img.src);
    };
  });
};

export const combineImageProcessors = (
  editValues: ImageEditValues,
  imageProcessors: ImageProcessFn[]
): ImageProcessData => {
  return imageProcessors.reduce(
    (acc, processor, i) => {
      return processor(editValues, acc);
    },
    { filterString: "", width: 0, height: 0 }
  );
};
