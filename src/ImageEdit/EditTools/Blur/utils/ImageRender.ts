import { ImageEditValues, ImageProcessData } from "../../../feature";

function processImage(
  editStateValues: ImageEditValues,
  initialProcessData: ImageProcessData
): ImageProcessData {
  const blurAmount = editStateValues.blurAmount;
  const filterStr = `blur(${blurAmount}px) `;
  console.log(" BLUR: ", blurAmount, filterStr);
  return {
    ...initialProcessData,
    filterString: filterStr
  };
}

export default processImage;
