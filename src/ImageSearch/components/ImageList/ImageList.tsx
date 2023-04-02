import { List } from "antd";
import { useEffect, useRef } from "react";
import { ImageDetail } from "../../../api/types";
import ImageCard from "../ImageCard";

interface ImageListProps {
  images: ImageDetail[];
  loading: boolean;
  handleLoadMore: () => void;
}

const ImageList = ({ images, handleLoadMore, loading }: ImageListProps) => {
  const loadMoreRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          handleLoadMore();
        }
      },
      { threshold: 1 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div style={{ height: 500, overflow: "auto" }} data-testid="image-list">
      <List
        grid={{
          gutter: 16
        }}
        loading={loading}
        dataSource={images}
        renderItem={(item) => (
          <a href={`/${item.id}/edit`}>
            <List.Item>
              <ImageCard
                id={item.id}
                author={item.author}
                url={item.download_url}
              />
            </List.Item>
          </a>
        )}
      />
      <div ref={loadMoreRef}></div>
    </div>
  );
};

export default ImageList;
