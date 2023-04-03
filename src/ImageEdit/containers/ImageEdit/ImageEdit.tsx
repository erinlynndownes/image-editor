import Download from "../Download";
import { EditToolsConfg } from "../../feature";
import ImageEditStateProvider from "../../state/ImageEditStateProvider";
import DisplayCanvas from "../DisplayCanvas";
import { useRef } from "react";

const ImageEdit = () => {
  return (
    <ImageEditStateProvider>
      <DisplayCanvas />
      {EditToolsConfg.map((config) => {
        const Element = config.component;
        return <Element key={config.key} processFn={config.processImage} />;
      })}

      <Download />
    </ImageEditStateProvider>
  );
};

export default ImageEdit;
