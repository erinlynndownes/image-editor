import { useContext, useEffect, useState } from "react";
import { ImageEditState, ImageProcessFn } from "../../../feature";
import { ImageEditContext } from "../../../state";

interface GrayscaleToolState {
  isGrayscale: boolean;
  changeGreyscale: (value: boolean) => void;
}

export const useGrayscaleState = (
  processFn: ImageProcessFn
): GrayscaleToolState => {
  const { setEditState, addImageProcessFunction, grayscale } = useContext(
    ImageEditContext
  ) as ImageEditState;
  const [isGrayscale, setIsGrayscale] = useState(grayscale);

  useEffect(() => {
    addImageProcessFunction(processFn);
  }, []);

  const changeGreyscale = (value: boolean) => {
    setIsGrayscale(value);
    setEditState("grayscale", value);
  };

  return {
    isGrayscale,
    changeGreyscale
  };
};
