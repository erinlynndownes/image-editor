import { Button, List, Typography } from "antd";
import { DEFAULT_FETCH_LIMIT } from "../../../api";
import { ImageDetail } from "../../../api/types";
import ImageCard from "../ImageCard";

interface ImageListProps {
  images: ImageDetail[];
  loading: boolean;
  hasMore: boolean;
  handleLoadMore: (pageChange: number) => void;
  currentPage: number;
}

const ImageList = ({
  images,
  handleLoadMore,
  loading,
  hasMore,
  currentPage
}: ImageListProps) => {
  return (
    <div className="extra-padding">
      <div className="extra-padding">
        <Button disabled={currentPage === 1} onClick={() => handleLoadMore(-1)}>
          Prev
        </Button>
        <Typography.Text className="extra-padding">
          {currentPage}
        </Typography.Text>
        <Button disabled={!hasMore} onClick={() => handleLoadMore(1)}>
          Next
        </Button>
      </div>
      <div style={{ height: 800, overflow: "auto" }} data-testid="image-list">
        <List
          grid={{
            gutter: 16
          }}
          loading={loading}
          dataSource={images}
          renderItem={(item) => (
            <a href={`/${item.id}/edit`}>
              <List.Item key={item.id}>
                <ImageCard
                  id={item.id}
                  author={item.author}
                  url={item.download_url}
                />
              </List.Item>
            </a>
          )}
        />
      </div>
    </div>
  );
};

export default ImageList;
