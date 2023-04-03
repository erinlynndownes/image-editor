import GrayscaleToggle from "../../components/GrayscaleToggle";
import { useGrayscaleState } from "../../state";

const Grayscale = () => {
  const { changeGreyscale } = useGrayscaleState();

  return <GrayscaleToggle handleChange={changeGreyscale} />;
};

export default Grayscale;
