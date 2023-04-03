import { getImageById, getImageDetails } from "../../api";
import { ImageDetail } from "../../api/types";
import { ImageEditValues, ImageProcessData, ImageProcessFn } from "./ImageEdit";

export interface FilterImageData {
  filteredImageUrl: string;
  width: number;
  height: number;
}

export const createFilteredImage = async (
  imageId: number,
  editValues: ImageEditValues,
  imageProcessors: ImageProcessFn[]
): Promise<FilterImageData> => {
  const imageProcessData: ImageProcessData = imageProcessors.reduce(
    (acc, processor, i) => {
      return processor(editValues, acc);
    },
    { filterString: "", width: 0, height: 0 }
  );

  const drawWidth = imageProcessData.width;
  const drawHeight = imageProcessData.height;
  const filterString = imageProcessData.filterString;

  const blob = await getImageById(imageId);

  const img = new Image();
  img.src = URL.createObjectURL(blob);
  return new Promise((resolve, reject) => {
    img.onload = function () {
      const canvas = document.createElement("canvas");
      canvas.width = drawWidth;
      canvas.height = drawHeight;

      const ctx = canvas.getContext("2d");

      if (!ctx) {
        reject("Could not access canvas context");
        return;
      }

      ctx.drawImage(img, 0, 0, drawWidth, drawHeight);

      ctx.filter = filterString;
      ctx.drawImage(canvas, 0, 0, drawWidth, drawHeight);

      const data = canvas.toDataURL("image/png");

      resolve({ filteredImageUrl: data, width: drawWidth, height: drawHeight });
    };
    img.onerror = function () {
      reject("Error loading image");
    };
  });
};
