import { ImageProcessFn } from "../../../../feature";
import GrayscaleToggle from "../../components/GrayscaleToggle";
import { useGrayscaleState } from "../../state";

type GrayscaleProps = { processFn: ImageProcessFn };

const Grayscale = ({ processFn }: GrayscaleProps) => {
  const { changeGreyscale } = useGrayscaleState(processFn);

  return <GrayscaleToggle handleChange={changeGreyscale} />;
};

export default Grayscale;
