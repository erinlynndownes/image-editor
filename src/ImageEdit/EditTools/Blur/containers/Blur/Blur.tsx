import { ImageProcessFn } from "../../../../feature";
import BlurSlider from "../../components/BlurSlider";
import { useBlurToolState } from "../../state";

type BlurProps = { processFn: ImageProcessFn };

const Blur = ({ processFn }: BlurProps) => {
  const { changeBlurAmount } = useBlurToolState(processFn);

  return <BlurSlider handleChange={changeBlurAmount} />;
};

export default Blur;
