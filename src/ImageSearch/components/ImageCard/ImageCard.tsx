import { Card, Typography } from "antd";
import { ImageDetail } from "../../../api/types";

type ImageCardProps = Pick<ImageDetail, "id" | "author" | "url">;

const ImageCard = (props: ImageCardProps) => {
  return (
    <Card title={props.author} style={{ height: 170, width: 170 }}>
      <img style={{ height: 50 }} src={`${props.url}`} alt="Preview Image" />
    </Card>
  );
};

export default ImageCard;
