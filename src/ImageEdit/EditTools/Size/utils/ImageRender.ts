import { ImageEditValues, ImageProcessData } from "../../../feature";

function processImage(
  editStateValues: ImageEditValues,
  initialProcessData: ImageProcessData
): ImageProcessData {
  return {
    ...initialProcessData,
    width: editStateValues.size.width,
    height: editStateValues.size.height
  };
}

export default processImage;
