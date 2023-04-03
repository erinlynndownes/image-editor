interface DisplayCanvasProps {
  filteredImageUrl: string;
  width: number;
  height: number;
}

const DisplayCanvas = ({
  filteredImageUrl,
  width,
  height
}: DisplayCanvasProps) => {
  return (
    <img
      src={filteredImageUrl}
      width={width}
      height={height}
      alt="Filtered image"
    />
  );
};

export default DisplayCanvas;
