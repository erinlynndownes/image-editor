import ImageList from "../components/ImageList";
import ImageSearchInput from "../components/ImageSearchInput";
import { useImageSearchState } from "../state";

const ImageSearch = () => {
  const { images, isLoading, setSearchInput, setCurrentPage, searchInput } =
    useImageSearchState();

  const handlePageChange = () => {
    setCurrentPage((prevPage: number) => prevPage + 1);
  };
  return (
    <>
      <ImageSearchInput onChange={setSearchInput} initialValue={searchInput} />
      <ImageList
        images={images}
        handleLoadMore={handlePageChange}
        loading={isLoading}
      />
    </>
  );
};

export default ImageSearch;
