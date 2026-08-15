import { normalizeOcrResult } from '../normalizeOcrResult';

describe('normalizeOcrResult', () => {
  it('preserves source text while trimming display whitespace', () => {
    const result = normalizeOcrResult(' Medicine 10 mg  \nTake once ', [
      {
        text: 'Medicine 10 mg',
        frame: { left: 4, top: 8, right: 104, bottom: 38 },
      },
    ]);

    expect(result.fullText).toBe('Medicine 10 mg\nTake once');
    expect(result.blocks).toEqual([
      {
        text: 'Medicine 10 mg',
        boundingBox: { x: 4, y: 8, width: 100, height: 30 },
      },
    ]);
  });

  it('never invents negative geometry', () => {
    const result = normalizeOcrResult('Text', [
      { text: 'Text', frame: { left: 10, top: 10, right: 5, bottom: 4 } },
    ]);

    expect(result.blocks[0]?.boundingBox).toMatchObject({ width: 0, height: 0 });
  });
});
