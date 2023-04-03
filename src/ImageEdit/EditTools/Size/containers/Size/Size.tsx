import { ImageProcessFn } from "../../../../feature";
import SizeInputs from "../../components/SizeInputs";
import { useSizeToolState } from "../../state/SizeToolState";

type SizeProps = { processFn: ImageProcessFn };

const Size = ({ processFn }: SizeProps) => {
  const { changeSize } = useSizeToolState(processFn);

  return <SizeInputs handleChange={changeSize} />;
};

export default Size;
