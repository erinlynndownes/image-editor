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

const SEARCH_INPUT_KEY = "searchInput";

export const loadFeatureState = () => {
  return localStorage.getItem(SEARCH_INPUT_KEY);
};

export const saveFeatureState = (searchInput: string) => {
  localStorage.setItem(SEARCH_INPUT_KEY, searchInput || "");
};
