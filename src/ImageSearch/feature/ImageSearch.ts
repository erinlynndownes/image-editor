import { ImageDetail } from "../../api/types";

export const DEFAULT_PAGE_LIMIT = 30;
export const DEBOUNCE_TIME = 100;

export const filterImagesByAuthorOrId = (
  details: ImageDetail,
  searchInput: string | undefined
) => {
  return (
    details.id === searchInput ||
    Boolean(details.author.match(searchInput ?? ""))
  );
};
