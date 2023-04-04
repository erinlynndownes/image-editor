import Download from "../Download";
import { EditToolsConfig } from "../../feature";
import ImageEditStateProvider from "../../state/ImageEditStateProvider";
import DisplayCanvas from "../DisplayCanvas";
import { Col, Row } from "antd";

const ImageEdit = () => {
  const tools = EditToolsConfig;
  return (
    <ImageEditStateProvider>
      <div className="tool-bar">
        <Row justify="space-around" gutter={[10, 10]}>
          {tools.map((config) => {
            const Element = config.component;
            return (
              <Col key={`col-${config.key}`}>
                <Element
                  key={config.key}
                  processFn={config.processImage}
                  data-testid={`edit-tool-${config.key}`}
                />
              </Col>
            );
          })}
        </Row>
      </div>
      <DisplayCanvas data-testid="display-canvas" />
      <Download />
    </ImageEditStateProvider>
  );
};

export default ImageEdit;
