import { createContext, useContext } from "react";
import { ImageEditState } from "../feature";

export const ImageEditContext = createContext<ImageEditState | undefined>(
  undefined
);

export const useImageEditState = () => {
  const context = useContext(ImageEditContext);

  if (!context) {
    throw new Error(
      "useImageEditState must be used within a <ImageEditStateProvider /> provider"
    );
  }

  return context;
};
