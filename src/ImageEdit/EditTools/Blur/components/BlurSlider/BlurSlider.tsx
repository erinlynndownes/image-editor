import { Slider } from "antd";
import { MAX_BLUR } from "../../utils";

interface BlurSliderProps {
  handleChange: (val: number) => void;
}

const BlurSlider = ({ handleChange }: BlurSliderProps) => {
  return <Slider onChange={handleChange} max={MAX_BLUR} />;
};
export default BlurSlider;
