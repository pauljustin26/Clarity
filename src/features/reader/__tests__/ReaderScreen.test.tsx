import { fireEvent, render } from '@testing-library/react-native';

import { ReaderScreen } from '../ReaderScreen';

const route = {
  key: 'reader-test',
  name: 'Reader' as const,
  params: {
    result: {
      fullText: 'Original medicine label text',
      blocks: [],
    },
  },
};

describe('ReaderScreen', () => {
  it('shows original OCR text and accessible formatting controls', async () => {
    const screen = await render(
      <ReaderScreen navigation={{} as never} route={route} />,
    );

    expect(screen.getByText('Original text')).toBeTruthy();
    expect(screen.getByText('Original medicine label text')).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Increase text size' })).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Contrast: light' })).toBeTruthy();
  });

  it('cycles contrast with a visible and semantic label', async () => {
    const screen = await render(
      <ReaderScreen navigation={{} as never} route={route} />,
    );

    await fireEvent.press(screen.getByRole('button', { name: 'Contrast: light' }));
    expect(screen.getByRole('button', { name: 'Contrast: dark' })).toBeTruthy();
  });
});
