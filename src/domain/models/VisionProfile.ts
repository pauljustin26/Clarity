export type ContrastMode = 'darkOnLight' | 'lightOnDark' | 'highContrast';
export type SpacingMode = 'normal' | 'comfortable' | 'wide';
export type FocusMode = 'full' | 'paragraph' | 'threeLines' | 'oneLine';

export type VisionProfile = {
  id: string;
  name: string;
  textScale: number;
  contrastMode: ContrastMode;
  spacingMode: SpacingMode;
  focusMode: FocusMode;
  speechRate: number;
  createdAt: string;
  updatedAt: string;
};
