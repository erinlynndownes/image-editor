import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { getImageById, getImageDetails } from "../../api";
import { ImageDetail } from "../../api/types";
import {
  combineImageProcessors,
  createFilteredImage,
  FilterImageData,
  ImageEditValues,
  ImageProcessFn,
  loadFeatureState,
  saveFeatureState
} from "../feature";
import { ImageEditContext } from "./ImageEditState";

interface ProviderProps {
  children?: React.ReactNode;
}

const ImageEditStateProvider = ({ children }: ProviderProps) => {
  const { imageId } = useParams();

  const canvas = useMemo(() => {
    return document.createElement("canvas");
  }, []);

  const loaded = useMemo(() => loadFeatureState(imageId ?? ""), []);

  const [editStateValues, setEditStateValues] =
    useState<ImageEditValues>(loaded);

  const [imageDetails, setImageDetails] = useState<ImageDetail | undefined>(
    undefined
  );
  const [editedImg, setEditedImage] = useState<FilterImageData | undefined>();

  const [processors, setProcessors] = useState<ImageProcessFn[]>([]);

  const [initialBlob, setInitialBlob] = useState<Blob | undefined>(undefined);

  useEffect(() => {
    async function fetchBlob() {
      const blob = await getImageById(Number(imageId));
      setInitialBlob(blob);
    }
    fetchBlob();
  }, [imageId]);

  // triggers first image render on reload
  useEffect(() => {
    setEditStateValues(loadFeatureState(imageId ?? ""));
  }, [imageId]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      saveFeatureState(imageId, editStateValues);
    }, 0);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [editStateValues, imageId]);

  useEffect(() => {
    async function fetchImage() {
      if (imageId) {
        const img = await getImageDetails(Number(imageId));
        setImageDetails(img);
      }
    }
    fetchImage();
  }, [imageId]);

  useEffect(() => {
    async function filterImage() {
      if (!initialBlob) return;
      const filteredImage = await createFilteredImage(
        combineImageProcessors(editStateValues, processors),
        canvas,
        initialBlob
      );
      setEditedImage(filteredImage);
    }
    filterImage();
  }, [editStateValues, initialBlob]);

  const handleSetEditState = (key: string, val: unknown) => {
    setEditStateValues({
      ...editStateValues,
      [key]: val
    });
  };

  const handleAddImageProcessor = useCallback((processor: ImageProcessFn) => {
    setProcessors((prev) => [...prev, processor]);
  }, []);

  const initialContextValues = {
    ...editStateValues,
    imageDetails: imageDetails,
    editedImg: editedImg,
    setEditState: handleSetEditState,
    processFunctions: processors,
    addImageProcessFunction: handleAddImageProcessor
  };

  return (
    <ImageEditContext.Provider value={initialContextValues}>
      {children}
    </ImageEditContext.Provider>
  );
};

export default ImageEditStateProvider;
