import { Col, Row, Switch, Typography } from "antd";

interface GrayscaleToggleProps {
  handleChange: (val: boolean) => void;
  defaultValue: boolean;
}

const GrayscaleToggle = ({
  handleChange,
  defaultValue
}: GrayscaleToggleProps) => {
  return (
    <Row>
      <Col span={16}>
        <Typography.Text>GrayScale:</Typography.Text>
        <Switch onChange={handleChange} defaultChecked={defaultValue} />
      </Col>
    </Row>
  );
};

export default GrayscaleToggle;
