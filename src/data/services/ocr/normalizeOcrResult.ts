import type { OcrResult } from '../../../domain/models/OcrResult';

export type VendorTextBlock = {
  text: string;
  frame: { left: number; top: number; right: number; bottom: number };
};

export function normalizeOcrResult(text: string, blocks: VendorTextBlock[]): OcrResult {
  return {
    fullText: text.replace(/[ \t]+\n/g, '\n').trim(),
    blocks: blocks.map((block) => ({
      text: block.text,
      boundingBox: {
        x: block.frame.left,
        y: block.frame.top,
        width: Math.max(0, block.frame.right - block.frame.left),
        height: Math.max(0, block.frame.bottom - block.frame.top),
      },
    })),
  };
}
