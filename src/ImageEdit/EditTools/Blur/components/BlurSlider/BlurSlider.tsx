import { Col, Row, Slider, Typography } from "antd";
import { MAX_BLUR } from "../../utils";

interface BlurSliderProps {
  handleChange: (val: number) => void;
  defaultValue: number;
}

const BlurSlider = ({ handleChange, defaultValue }: BlurSliderProps) => {
  return (
    <>
      <Typography.Text>Blur(0-10):</Typography.Text>
      <Slider
        onChange={handleChange}
        max={MAX_BLUR}
        defaultValue={defaultValue}
      />
    </>
  );
};
export default BlurSlider;
