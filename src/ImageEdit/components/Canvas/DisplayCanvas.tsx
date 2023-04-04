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
    <div className="display-canvas">
      <img
        src={filteredImageUrl}
        width={width}
        height={height}
        alt="Filtered image"
      />
    </div>
  );
};

export default DisplayCanvas;
