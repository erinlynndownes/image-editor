import { ImageEditValues } from "../../feature";

interface DisplayCanvasProps {
  imageUrl: string;
  editValues: ImageEditValues;
}

const DisplayCanvas = ({ imageUrl, editValues }: DisplayCanvasProps) => {
  // renders the image with applied filters

  return (
    <img
      src={imageUrl}
      width={editValues.size.width}
      height={editValues.size.height}
    />
  );
};

export default DisplayCanvas;
