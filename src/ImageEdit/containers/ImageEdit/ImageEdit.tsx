import Download from "../Download";
import { EditToolsConfig } from "../../feature";
import ImageEditStateProvider from "../../state/ImageEditStateProvider";
import DisplayCanvas from "../DisplayCanvas";

const ImageEdit = () => {
  return (
    <ImageEditStateProvider>
      <DisplayCanvas data-testid="display-canvas" />
      {EditToolsConfig.map((config) => {
        const Element = config.component;
        return (
          <Element
            key={config.key}
            processFn={config.processImage}
            data-testid={`edit-tool-${config.key}`}
          />
        );
      })}

      <Download />
    </ImageEditStateProvider>
  );
};

export default ImageEdit;
