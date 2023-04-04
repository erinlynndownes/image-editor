import { Card, Typography } from "antd";
import { ImageDetail } from "../../../api/types";

export type ImageCardProps = Pick<ImageDetail, "id" | "author" | "url">;

const CARD_SIZE = 170;

const ImageCard = (props: ImageCardProps) => {
  return (
    <Card style={{ height: CARD_SIZE, width: CARD_SIZE }}>
      <img
        style={{ maxWidth: "90%", maxHeight: 100 }}
        src={`${props.url}`}
        alt={props.id}
      />
      <Typography.Text>{props.author}</Typography.Text>
    </Card>
  );
};

export default ImageCard;
