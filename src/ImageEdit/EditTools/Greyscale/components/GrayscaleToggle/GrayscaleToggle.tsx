import { Switch, Typography } from "antd";

interface GrayscaleToggleProps {
  handleChange: (val: boolean) => void;
}

const GrayscaleToggle = ({ handleChange }: GrayscaleToggleProps) => {
  return (
    <>
      <Typography.Text>GrayScale:</Typography.Text>
      <Switch onChange={handleChange} />
    </>
  );
};

export default GrayscaleToggle;
