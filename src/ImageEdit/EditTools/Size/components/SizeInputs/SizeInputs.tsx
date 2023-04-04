import { Col, Input, Row, Typography } from "antd";

interface SizeInputsProps {
  handleChange: (dimension: "width" | "height", value: number) => void;
  defaultWidth: number;
  defaultHeight: number;
}

const SizeInputs = ({
  handleChange,
  defaultWidth,
  defaultHeight
}: SizeInputsProps) => {
  return (
    <Row gutter={[20, 20]}>
      <Col span={12}>
        <Typography.Text>WIDTH:</Typography.Text>
        <Input
          onChange={(e) => handleChange("width", Number(e.target.value))}
          placeholder="enter a width"
          type="number"
          defaultValue={defaultWidth}
        />
      </Col>
      <Col span={12}>
        <Typography.Text>HEIGHT:</Typography.Text>
        <Input
          onChange={(e) => handleChange("height", Number(e.target.value))}
          placeholder="enter a height"
          type="number"
          defaultValue={defaultHeight}
        />
      </Col>
    </Row>
  );
};

export default SizeInputs;
