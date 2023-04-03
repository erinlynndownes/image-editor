import { useContext } from "react";
import DownloadComponent from "../../components/Download";
import { downloadFilteredImage } from "../../feature";
import { ImageEditContext } from "../../state";

const Download = () => {
  const ctx = useContext(ImageEditContext);

  if (!ctx) return null;

  const handleDownload = () => {
    downloadFilteredImage(ctx.editedImg?.filteredImageUrl);
  };

  return <DownloadComponent handleDownload={handleDownload} />;
};

export default Download;
