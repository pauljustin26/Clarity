import type { OcrResult } from '../../domain/models/OcrResult';

export type RootStackParamList = {
  Scan: undefined;
  Reader: { result: OcrResult };
};
