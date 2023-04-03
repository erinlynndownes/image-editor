import { generateEditedImageUrl } from "./utils";
import { GetEditedImageInput, ImageDetail } from "./types";

const API_BASE_URL = "https://picsum.photos";
export const DEFAULT_FETCH_LIMIT = 60;

export const getImageList = async (
  pagination: number = 1,
  pageLimit = DEFAULT_FETCH_LIMIT
) => {
  const res = await fetch(
    `${API_BASE_URL}/v2/list?page=${pagination}&limit=${pageLimit}`
  );
  return res.json();
};

export const getFilteredImageList = async (
  filterFn: (details: ImageDetail) => boolean,
  paginationStart = 1,
  limit = DEFAULT_FETCH_LIMIT
) => {
  let result: ImageDetail[] = [];
  let page = paginationStart;
  let next = true;
  while (result.length < limit && next) {
    try {
      const res: ImageDetail[] = await getImageList(page);

      const filtered = res.filter(filterFn);

      result = [...result, ...filtered];
      if (res.length < limit) next = false;
      page++;
    } catch (e) {
      next = false;
      console.error("Error fetching images", e);
    }
  }

  return result;
};

export const getImageDetails = async (id: number) => {
  const res = await fetch(`${API_BASE_URL}/id/${id}/info`);
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
