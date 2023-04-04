import ImageList from "../components/ImageList";
import { useImageSearchState } from "../state";

const ImageSearch = () => {
  const { images, isLoading, setCurrentPage, hasMoreResults, currentPage } =
    useImageSearchState();

  const handlePageChange = (pageChange = 1) => {
    setCurrentPage((prevPage: number) => prevPage + pageChange);
  };
  return (
    <ImageList
      images={images}
      handleLoadMore={handlePageChange}
      loading={isLoading}
      hasMore={hasMoreResults}
      currentPage={currentPage}
    />
  );
};

export default ImageSearch;
