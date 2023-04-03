import { useContext, useEffect, useState } from "react";
import { ImageEditState, ImageProcessFn } from "../../../feature";
import { ImageEditContext } from "../../../state";

interface GrayscaleToolState {
  blurAmount: number;
  changeBlurAmount: (value: number) => void;
}

export const useBlurToolState = (
  processFn: ImageProcessFn
): GrayscaleToolState => {
  const { setEditState, addImageProcessFunction } = useContext(
    ImageEditContext
  ) as ImageEditState; //grr cast
  const [currentBlur, setCurrentBlur] = useState(0);

  useEffect(() => {
    addImageProcessFunction(processFn);
  }, []);

  const changeBlurAmount = (value: number) => {
    setCurrentBlur(value);
    setEditState("blurAmount", value);
  };

  return {
    blurAmount: currentBlur,
    changeBlurAmount
  };
};
