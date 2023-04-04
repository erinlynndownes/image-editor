import { ImageDetail } from "../../api/types";

export const filterImagesByAuthorOrId = (
  details: ImageDetail,
  searchInput: string | undefined
) => {
  return (
    details.id === searchInput ||
    Boolean(details.author.match(searchInput ?? ""))
  );
};

const SEARCH_INPUT_KEY = "currentPage";

export const loadFeatureState = () => {
  const storedPage = localStorage.getItem(SEARCH_INPUT_KEY);
  return storedPage ?? 1;
};

export const saveFeatureState = (currentPage: number) => {
  localStorage.setItem(SEARCH_INPUT_KEY, String(currentPage || 1));
};
