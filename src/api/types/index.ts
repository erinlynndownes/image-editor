export interface GetEditedImageInput {
  id: number;
  blur?: number;
  greyscale: boolean;
  width?: number;
  height?: number;
}

export interface ImageDetail {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
}
