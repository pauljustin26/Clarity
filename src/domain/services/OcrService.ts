import type { OcrResult } from '../models/OcrResult';

export type OcrInput = {
  imagePath: string;
};

export interface OcrService {
  recognize(input: OcrInput): Promise<OcrResult>;
}
