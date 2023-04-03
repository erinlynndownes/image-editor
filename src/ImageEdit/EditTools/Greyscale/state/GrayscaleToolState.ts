import { useContext, useState } from "react";
import { ImageEditState } from "../../../feature";
import { ImageEditContext } from "../../../state";

interface GrayscaleToolState {
  isGrayscale: boolean;
  changeGreyscale: (value: boolean) => void;
}

export const useGrayscaleState = (): GrayscaleToolState => {
  const { setEditState } = useContext(ImageEditContext) as ImageEditState;
  const [isGrayscale, setIsGrayscale] = useState(false);

  const changeGreyscale = (value: boolean) => {
    setIsGrayscale(value);
    setEditState("grayscale", value);
  };

  return {
    isGrayscale,
    changeGreyscale
  };
};
