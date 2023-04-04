import { Button } from "antd";

interface DownloadProps {
  handleDownload: () => void;
}

const Download = ({ handleDownload }: DownloadProps) => {
  return (
    <div className="center-button">
      <Button className="download-button" onClick={handleDownload}>
        Download
      </Button>
    </div>
  );
};

export default Download;
