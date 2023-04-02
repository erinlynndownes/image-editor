import { Input, Typography } from "antd";
import { ChangeEvent } from "react";

interface ImageSearchProps {
  onChange: (searchInput: string | undefined) => void;
}

const ImageSearchInput = (props: ImageSearchProps) => {
  const handleOnChange = (evt: ChangeEvent<HTMLInputElement>) => {
    props.onChange(evt.target.value);
  };
  return (
    <>
      <Typography.Text>Search by id or author</Typography.Text>
      <Input onChange={handleOnChange} placeholder="Search by id or author" />
    </>
  );
};

export default ImageSearchInput;
