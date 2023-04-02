import { render, fireEvent } from "@testing-library/react";
import ImageSearchInput from "./ImageSearchInput";

describe("ImageSearchInput", () => {
  const onChangeMock = jest.fn();
  it("should render the input field with a placeholder", () => {
    const { getByPlaceholderText } = render(
      <ImageSearchInput onChange={onChangeMock} />
    );
    const inputElement = getByPlaceholderText("Search by id or author");
    expect(inputElement).toBeInTheDocument();
  });

  it("should call onChange with the input value when input changes", () => {
    const { getByPlaceholderText } = render(
      <ImageSearchInput onChange={onChangeMock} />
    );
    const inputElement = getByPlaceholderText("Search by id or author");
    const inputValue = "test";
    fireEvent.change(inputElement, { target: { value: inputValue } });
    expect(onChangeMock).toHaveBeenCalledWith(inputValue);
  });
});
