import { Button } from "antd";

interface DownloadProps {
  handleDownload: () => void;
}

const Download = ({ handleDownload }: DownloadProps) => {
  return <Button onClick={handleDownload}>Download</Button>;
};

export default Download;
