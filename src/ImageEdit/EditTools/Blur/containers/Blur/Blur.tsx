import BlurSlider from "../../components/BlurSlider";
import { useBlurToolState } from "../../state";

const BlurTools = () => {
  const { changeBlurAmount } = useBlurToolState();

  return <BlurSlider handleChange={changeBlurAmount} />;
};

export default BlurTools;
