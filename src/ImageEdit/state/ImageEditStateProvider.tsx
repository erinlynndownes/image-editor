import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { getImageDetails } from "../../api";
import { ImageDetail } from "../../api/types";
import {
  createFilteredImage,
  FilterImageData,
  getDefaultEditValues,
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

  const defaultEditValues = useMemo(() => getDefaultEditValues(), []);
  const [editStateValues, setEditStateValues] =
    useState<ImageEditValues>(defaultEditValues);

  useEffect(() => {
    setEditStateValues(loadFeatureState(imageId ?? ""));
  }, [imageId]);

  useEffect(() => {
    saveFeatureState(imageId, editStateValues);
  }, [editStateValues, imageId]);

  const [imageDetails, setImageDetails] = useState<ImageDetail | undefined>(
    undefined
  );

  const [editedImg, setEditedImage] = useState<FilterImageData | undefined>();

  const [processors, setProcessors] = useState<ImageProcessFn[]>([]);

  useEffect(() => {
    async function fetchImage() {
      if (imageId) {
        const img = await getImageDetails(Number(imageId));
        setImageDetails(img);
      }
    }
    fetchImage();
  }, [imageId]);

  const handleSetEditState = (key: string, val: unknown) => {
    setEditStateValues({
      ...editStateValues,
      [key]: val
    });
  };

  useEffect(() => {
    if (!imageId) return undefined;
    async function filterImage() {
      const filteredImage = await createFilteredImage(
        Number(imageId),
        editStateValues,
        processors
      );
      setEditedImage(filteredImage);
    }
    filterImage();
  }, [editStateValues, imageId]);

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
