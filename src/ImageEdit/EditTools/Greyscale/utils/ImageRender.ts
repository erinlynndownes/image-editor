import { ImageEditValues, ImageProcessData } from "../../../feature";

function processImage(
  editStateValues: ImageEditValues,
  initialProcessData: ImageProcessData
): ImageProcessData {
  const grayscalePercent = editStateValues.grayscale ? 100 : 0;
  const filterStr =
    (initialProcessData.filterString += `grayscale(${grayscalePercent}%)`);
  return {
    ...initialProcessData,
    filterString: filterStr
  };
}

export default processImage;
