import { generateEditedImageUrl } from "./utils";
import { GetEditedImageInput } from "./types";

const API_BASE_URL = "https://picsum.photos";

export const getImageList = async (pagination: number = 1) => {
  const res = await fetch(`${API_BASE_URL}/v2/list?page=${pagination}`);
  return res.json();
};

export const getImage = async (id: number) => {
  const res = await fetch(`${API_BASE_URL}/id/${id}`);
  return res.json();
};

export const getEditedImage = async (options: GetEditedImageInput) => {
  const editedUrl = generateEditedImageUrl(
    options.id,
    options.width,
    options.height,
    options.greyscale,
    options.blur
  );

  const res = await fetch(`${API_BASE_URL}/${editedUrl}`);
  return res.json();
};
