import { ImageDetail } from "../../api/types";
import Blur, { ImageRender as BlurImageRender } from "../EditTools/Blur";
import Grayscale, {
  ImageRender as GrayscaleImageRender
} from "../EditTools/Greyscale";
import Size, { ImageRender as SizeImageRender } from "../EditTools/Size";
import { FilterImageData } from "./ImageDraw";

export interface ImageEditValues {
  grayscale: boolean;
  blurAmount: number;
  size: { width: number; height: number };
}

export interface ImageProcessData {
  filterString: string;
  width: number;
  height: number;
}

export type ImageProcessFn = (
  editStateValues: ImageEditValues,
  initialProcessData: ImageProcessData
) => ImageProcessData;

export type ImageEditState = ImageEditValues & {
  setEditState: <K extends keyof ImageEditValues>(
    k: K,
    value: ImageEditValues[K]
  ) => void;
  imageDetails: ImageDetail | undefined;
  editedImg: FilterImageData | undefined;
  processFunctions: ImageProcessFn[];
  addImageProcessFunction: (fn: ImageProcessFn) => void;
};

export const EditToolsConfg = [
  {
    component: Grayscale,
    defaultValue: { grayscale: false },
    processImage: GrayscaleImageRender,
    key: "Grayscale"
  },
  {
    component: Blur,
    defaultValue: { blurAmount: 0 },
    processImage: BlurImageRender,
    key: "Blur"
  },
  {
    component: Size,
    defaultValue: { height: 100, widht: 100 },
    processImage: SizeImageRender,
    key: "Size"
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

export const downloadFilteredImage = (filteredImage: string | undefined) => {
  if (!filteredImage) return;
  const link = document.createElement("a");
  link.download = "filtered_image.jpg";
  link.href = filteredImage;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const FEATURE_STATE_KEY = "imageEditStateValues";

export const loadFeatureState = (imageId: string) => {
  const localStorageValue = localStorage.getItem(FEATURE_STATE_KEY);
  const parsedValue = JSON.parse(localStorageValue ?? `{}`);
  return parsedValue[imageId] || getDefaultEditValues();
};

export const saveFeatureState = (
  imageId: string | undefined,
  editValues: ImageEditValues
) => {
  if (imageId) {
    const localStorageValue = localStorage.getItem(FEATURE_STATE_KEY);
    const parsedValue = localStorageValue ? JSON.parse(localStorageValue) : {};
    localStorage.setItem(
      FEATURE_STATE_KEY,
      JSON.stringify({ ...parsedValue, [imageId]: editValues })
    );
  }
};
