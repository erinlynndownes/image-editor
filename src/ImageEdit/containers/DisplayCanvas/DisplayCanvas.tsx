import { useContext, useMemo } from "react";
import DisplayCanvasComp from "../../components/Canvas";
import { ImageEditContext } from "../../state";

const DisplayCanvas = () => {
  const ctx = useContext(ImageEditContext);

  if (!ctx) return null;

  const [editValues, imageDetails] = useMemo(() => {
    const { setEditState: _, imageDetails, ...rest } = ctx;
    return [rest, imageDetails];
  }, [ctx]);
  return (
    <DisplayCanvasComp
      imageUrl={imageDetails?.download_url ?? " "}
      editValues={editValues}
    />
  );
};

export default DisplayCanvas;
