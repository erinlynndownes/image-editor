import { useEffect, useState } from "react";
import { DEFAULT_FETCH_LIMIT, getImageList } from "../../api";
import { ImageDetail } from "../../api/types";
import { loadFeatureState, saveFeatureState } from "../feature";

interface ImageSearchState {
  isLoading: boolean;
  images: ImageDetail[];
  hasMoreResults: boolean;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

export const useImageSearchState = (): ImageSearchState => {
  const history = loadFeatureState();
  const [isLoading, setIsLoading] = useState(false);
  const [hasMoreResults, setHasMoreResults] = useState(true);
  const [loadedImages, setLoadedImages] = useState<ImageDetail[]>([]);
  const [currentPage, setCurrentPage] = useState(Number(history));

  useEffect(() => {
    saveFeatureState(currentPage);
  }, [currentPage]);

  useEffect(() => {
    setIsLoading(true);
    async function fetchImages() {
      const imgs = await getImageList(currentPage, DEFAULT_FETCH_LIMIT);
      if (imgs) {
        setLoadedImages([...imgs]);
        if (imgs.length < DEFAULT_FETCH_LIMIT) {
          setHasMoreResults(false);
        }
      }
      setIsLoading(false);
    }
    fetchImages();
  }, [currentPage]);

  return {
    isLoading,
    images: loadedImages,
    hasMoreResults,
    currentPage,
    setCurrentPage
  };
};
