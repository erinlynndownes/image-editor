import { useContext, useEffect, useState } from "react";
import { ImageEditState, ImageProcessFn } from "../../../feature";
import { ImageEditContext } from "../../../state";

interface SizeToolState {
  currentWidth: number;
  currentHeight: number;
  changeSize: (dimension: "width" | "height", value: number) => void;
}

export const useSizeToolState = (processFn: ImageProcessFn): SizeToolState => {
  const { setEditState, addImageProcessFunction, size } = useContext(
    ImageEditContext
  ) as ImageEditState;

  const [currentSize, setCurrentSize] = useState({
    width: size.width,
    height: size.height
  });

  useEffect(() => {
    addImageProcessFunction(processFn);
  }, []);

  const changeSize = (dimension: "width" | "height", value: number) => {
    const updatedSize = {
      ...currentSize,
      [dimension]: value
    };
    setCurrentSize(updatedSize);
    setEditState("size", updatedSize);
  };

  return {
    currentHeight: currentSize.height,
    currentWidth: currentSize.width,
    changeSize
  };
};
