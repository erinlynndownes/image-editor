import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getImageDetails } from "../../api";
import { ImageDetail } from "../../api/types";
import { getDefaultEditValues, ImageEditValues } from "../feature";
import { ImageEditContext } from "./ImageEditState";

interface ProviderProps {
  children?: React.ReactNode;
}

const ImageEditStateProvider: React.FC<ProviderProps> = ({
  children
}: ProviderProps) => {
  const { imageId } = useParams();

  const [editStateValues, setEditStateValues] = useState<ImageEditValues>(
    getDefaultEditValues()
  );
  const [imageDetails, setImageDetails] = useState<ImageDetail | undefined>(
    undefined
  );

  useEffect(() => {
    async function fetchImage() {
      if (imageId) {
        const img = await getImageDetails(Number(imageId));
        setImageDetails(img);
      }
    }
    fetchImage();
  }, [imageId]);

  const handleSetState = (key: string, val: unknown) => {
    setEditStateValues({
      ...editStateValues,
      [key]: val
    });
  };

  const initialContextValues = {
    ...editStateValues,
    imageDetails: imageDetails,
    setEditState: handleSetState
  };

  return (
    <ImageEditContext.Provider value={initialContextValues}>
      {children}
    </ImageEditContext.Provider>
  );
};

export default ImageEditStateProvider;
