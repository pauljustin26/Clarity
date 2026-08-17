import type { OcrService } from '../../../domain/services/OcrService';
import { normalizeOcrResult } from './normalizeOcrResult';

export const mlKitOcrService: OcrService = {
  async recognize({ imagePath }) {
    // Load the native boundary only when OCR is requested. This lets the app
    // show its camera/error UI instead of crashing during startup if an old
    // development client is installed without the ML Kit native module.
    const { recognizeText } = await import(
      '@infinitered/react-native-mlkit-text-recognition'
    );
    const result = await recognizeText(imagePath);
    return normalizeOcrResult(result.text, result.blocks);
  },
};
