import { ImageEditValues, ImageProcessData } from "../../../feature";

function processImage(
  editStateValues: ImageEditValues,
  initialProcessData: ImageProcessData
): ImageProcessData {
  const blurAmount = editStateValues.blurAmount;
  const filterStr =
    (initialProcessData.filterString += ` blur(${blurAmount}px) `);
  return {
    ...initialProcessData,
    filterString: filterStr
  };
}

export default processImage;
