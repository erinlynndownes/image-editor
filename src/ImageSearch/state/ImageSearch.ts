import { useEffect, useState } from "react";
import { DEFAULT_FETCH_LIMIT, getFilteredImageList } from "../../api";
import { ImageDetail } from "../../api/types";
import { debounce } from "lodash";
import {
  DEBOUNCE_TIME,
  filterImagesByAuthorOrId,
  loadFeatureState,
  saveFeatureState
} from "../feature";

interface ImageSearchState {
  isLoading: boolean;
  images: ImageDetail[];
  hasMoreResults: boolean;
  searchInput: string | undefined;
  setSearchInput: (input: string | undefined) => void;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

export const useImageSearchState = (): ImageSearchState => {
  const history = loadFeatureState();
  const [isLoading, setIsLoading] = useState(false);
  const [hasMoreResults, setHasMoreResults] = useState(false);
  const [loadedImages, setLoadedImages] = useState<ImageDetail[]>([]);
  const [searchInput, setSearchInput] = useState<string | undefined>(
    history ?? undefined
  );
  const [currentPage, setCurrentPage] = useState(1);

  const filter = (details: ImageDetail) =>
    filterImagesByAuthorOrId(details, searchInput);

  useEffect(() => {
    saveFeatureState(searchInput ?? "");
  }, [searchInput]);

  useEffect(() => {
    setIsLoading(true);
    async function fetchImages() {
      const imgs = await getFilteredImageList(
        filter,
        currentPage,
        DEFAULT_FETCH_LIMIT
      );

      if (imgs) {
        setLoadedImages([...imgs]);
      }
      setIsLoading(false);
      setHasMoreResults(!Boolean(!imgs || imgs.length <= DEFAULT_FETCH_LIMIT));
    }
    const debouncedFetch = debounce(fetchImages, DEBOUNCE_TIME, {
      leading: true
    });
    debouncedFetch();
  }, [currentPage, searchInput]);

  return {
    isLoading,
    images: loadedImages,
    hasMoreResults,
    searchInput,
    setSearchInput,
    currentPage,
    setCurrentPage
  };
};
