import Download from "../components/Download";
import { EditToolsConfg } from "../feature";
import ImageEditStateProvider from "../state/ImageEditStateProvider";
import DisplayCanvas from "./DisplayCanvas";

const ImageEdit = () => {
  return (
    <ImageEditStateProvider>
      <>
        <DisplayCanvas />
        {EditToolsConfg.map((config) => {
          const Element = config.component;
          return <Element key={config.component.name} />;
        })}

        <Download handleDownload={() => {}} />
      </>
    </ImageEditStateProvider>
  );
};

export default ImageEdit;
