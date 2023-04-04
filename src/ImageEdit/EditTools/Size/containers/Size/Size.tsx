import { ImageProcessFn } from "../../../../feature";
import SizeInputs from "../../components/SizeInputs";
import { useSizeToolState } from "../../state/SizeToolState";

type SizeProps = { processFn: ImageProcessFn };

const Size = ({ processFn }: SizeProps) => {
  const { changeSize, currentHeight, currentWidth } =
    useSizeToolState(processFn);

  return (
    <SizeInputs
      handleChange={changeSize}
      defaultWidth={currentWidth}
      defaultHeight={currentHeight}
    />
  );
};

export default Size;
