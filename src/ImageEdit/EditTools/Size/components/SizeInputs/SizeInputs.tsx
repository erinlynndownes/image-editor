import { Input, Typography } from "antd";

interface SizeInputsProps {
  handleChange: (dimension: "width" | "height", value: number) => void;
}

const SizeInputs = ({ handleChange }: SizeInputsProps) => {
  return (
    <>
      <Typography.Text>WIDTH:</Typography.Text>
      <Input
        onChange={(e) => handleChange("width", Number(e.target.value))}
        placeholder="enter a width"
        type="number"
      />
      <Typography.Text>HEIGHT:</Typography.Text>
      <Input
        onChange={(e) => handleChange("height", Number(e.target.value))}
        placeholder="enter a height"
        type="number"
      />
    </>
  );
};

export default SizeInputs;
