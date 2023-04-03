import { useContext, useMemo } from "react";
import DisplayCanvasComponent from "../../components/Canvas";
import { ImageEditContext } from "../../state";

const DisplayCanvas = () => {
  const ctx = useContext(ImageEditContext);

  if (!ctx) return null;

  const editedImg = useMemo(() => {
    const { editedImg } = ctx;
    return editedImg;
  }, [ctx]);

  if (!editedImg) return null;
  return (
    <DisplayCanvasComponent
      filteredImageUrl={editedImg.filteredImageUrl}
      width={editedImg.width}
      height={editedImg.height}
    />
  );
};

export default DisplayCanvas;
