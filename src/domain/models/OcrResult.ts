export type BoundingBox = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type OcrBlock = {
  text: string;
  boundingBox?: BoundingBox;
  confidence?: number;
};

export type OcrResult = {
  fullText: string;
  blocks: OcrBlock[];
};
