import { useEffect } from "react";
import { ImageProcessFn } from "../../../../feature";
import BlurSlider from "../../components/BlurSlider";
import { useBlurToolState } from "../../state";

type BlurProps = { processFn: ImageProcessFn };

const Blur = ({ processFn }: BlurProps) => {
  const { changeBlurAmount, blurAmount } = useBlurToolState(processFn);

  return (
    <BlurSlider handleChange={changeBlurAmount} defaultValue={blurAmount} />
  );
};

export default Blur;
