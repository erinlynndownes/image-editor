import { ImageDetail } from "../../api/types";
import Blur from "../EditTools/Blur";
import Grayscale from "../EditTools/Greyscale";
import Size from "../EditTools/Size";

export interface ImageEditValues {
  grayscale: boolean;
  blurAmount: number;
  size: { width: number; height: number };
}

export type ImageEditState = ImageEditValues & {
  setEditState: <K extends keyof ImageEditValues>(
    k: K,
    value: ImageEditValues[K]
  ) => void;
  imageDetails: ImageDetail | undefined;
};

export const EditToolsConfg = [
  {
    component: Grayscale,
    defaultValue: { grayscale: false }
  },
  {
    component: Blur,
    defaultValue: { blurAmount: 0 }
  },
  {
    component: Size,
    defaultValue: { height: 100, widht: 100 }
  }
];

export function getDefaultEditValues() {
  const e = [
    {
      component: Grayscale,
      defaultValue: { grayscale: false }
    },
    {
      component: Blur,
      defaultValue: { blurAmount: 0 }
    },
    {
      component: Size,
      defaultValue: { size: { height: 100, widht: 100 } }
    }
  ];
  return e.reduce((acc, { defaultValue }) => {
    return {
      ...acc,
      ...defaultValue
    };
  }, {}) as ImageEditValues;
}
