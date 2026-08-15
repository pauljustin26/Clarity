import { recognizeText } from '@infinitered/react-native-mlkit-text-recognition';

import type { OcrService } from '../../../domain/services/OcrService';
import { normalizeOcrResult } from './normalizeOcrResult';

export const mlKitOcrService: OcrService = {
  async recognize({ imagePath }) {
    const result = await recognizeText(imagePath);
    return normalizeOcrResult(result.text, result.blocks);
  },
};
