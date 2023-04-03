import { useContext, useState } from "react";
import { ImageEditState } from "../../../feature";
import { ImageEditContext } from "../../../state";

interface GrayscaleToolState {
  blurAmount: number;
  changeBlurAmount: (value: number) => void;
}

export const useBlurToolState = (): GrayscaleToolState => {
  const { setEditState } = useContext(ImageEditContext) as ImageEditState; //grr cast
  const [currentBlur, setCurrentBlur] = useState(0);

  const changeBlurAmount = (value: number) => {
    setCurrentBlur(value);
    setEditState("blurAmount", value);
  };

  return {
    blurAmount: currentBlur,
    changeBlurAmount
  };
};
