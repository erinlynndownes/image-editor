import { generateEditedImageUrl } from "./utils";
import { GetEditedImageInput } from "./types";

const API_BASE_URL = "https://picsum.photos";
export const DEFAULT_FETCH_LIMIT = 30;

export const getImageList = async (
  pagination: number = 1,
  pageLimit = DEFAULT_FETCH_LIMIT
) => {
  const res = await fetch(
    `${API_BASE_URL}/v2/list?page=${pagination}&limit=${pageLimit}`
  );
  return res.json();
};

export const getImageDetails = async (id: number) => {
  const res = await fetch(`${API_BASE_URL}/id/${id}/info`);
  return res.json();
};

export const getImageById = async (id: number) => {
  const res = await fetch(`${API_BASE_URL}/id/${id}/200/300`);
  return res.blob();
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
