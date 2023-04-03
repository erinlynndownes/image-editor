import SizeInputs from "../../components/SizeInputs";
import { useSizeToolState } from "../../state/SizeToolState";

const Size = () => {
  const { changeSize } = useSizeToolState();

  return <SizeInputs handleChange={changeSize} />;
};

export default Size;
