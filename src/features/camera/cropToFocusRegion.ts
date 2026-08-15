import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';
import { Image } from 'react-native';

function getImageSize(uri: string): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    Image.getSize(uri, (width, height) => resolve({ width, height }), reject);
  });
}

export async function cropToFocusRegion(imagePath: string): Promise<string> {
  const uri = imagePath.startsWith('file://') ? imagePath : `file://${imagePath}`;
  const { width, height } = await getImageSize(uri);
  const cropWidth = Math.round(width * 0.8);
  const cropHeight = Math.round(height * 0.5);
  const result = await manipulateAsync(
    uri,
    [{
      crop: {
        originX: Math.round((width - cropWidth) / 2),
        originY: Math.round((height - cropHeight) / 2),
        width: cropWidth,
        height: cropHeight,
      },
    }],
    { compress: 1, format: SaveFormat.JPEG },
  );
  return result.uri;
}
