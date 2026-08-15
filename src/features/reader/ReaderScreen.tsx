import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import type { RootStackParamList } from '../../app/navigation/types';
import { AccessibleButton } from '../../core/accessibility/AccessibleButton';

type ReaderScreenProps = NativeStackScreenProps<RootStackParamList, 'Reader'>;
type Contrast = 'light' | 'dark' | 'high';
type Spacing = 'normal' | 'comfortable' | 'wide';

const textSizes = [24, 30, 38, 48] as const;
const spacingValues: Record<Spacing, { lineHeightMultiplier: number; letterSpacing: number }> = {
  normal: { lineHeightMultiplier: 1.35, letterSpacing: 0 },
  comfortable: { lineHeightMultiplier: 1.55, letterSpacing: 0.5 },
  wide: { lineHeightMultiplier: 1.75, letterSpacing: 1.5 },
};
const contrastValues: Record<Contrast, { background: string; foreground: string }> = {
  light: { background: '#FFFDF5', foreground: '#111827' },
  dark: { background: '#111827', foreground: '#FFFFFF' },
  high: { background: '#000000', foreground: '#FFFF00' },
};

export function ReaderScreen({ route }: ReaderScreenProps) {
  const [sizeIndex, setSizeIndex] = useState(1);
  const [contrast, setContrast] = useState<Contrast>('light');
  const [spacing, setSpacing] = useState<Spacing>('comfortable');
  const palette = contrastValues[contrast];
  const textStyle = useMemo(() => {
    const fontSize = textSizes[sizeIndex];
    return {
      color: palette.foreground,
      fontSize,
      letterSpacing: spacingValues[spacing].letterSpacing,
      lineHeight: Math.round(fontSize * spacingValues[spacing].lineHeightMultiplier),
    };
  }, [contrast, palette.foreground, sizeIndex, spacing]);

  const cycleContrast = () => {
    setContrast((value) => value === 'light' ? 'dark' : value === 'dark' ? 'high' : 'light');
  };
  const cycleSpacing = () => {
    setSpacing((value) => value === 'normal' ? 'comfortable' : value === 'comfortable' ? 'wide' : 'normal');
  };

  return (
    <View style={[styles.container, { backgroundColor: palette.background }]}>
      <View className="flex-row flex-wrap gap-2 border-b-2 border-gray-500 bg-white p-3">
        <AccessibleButton
          disabled={sizeIndex === textSizes.length - 1}
          label="Increase text size"
          onPress={() => setSizeIndex((value) => Math.min(value + 1, textSizes.length - 1))}
        />
        <AccessibleButton
          disabled={sizeIndex === 0}
          label="Decrease text size"
          onPress={() => setSizeIndex((value) => Math.max(value - 1, 0))}
        />
        <AccessibleButton label={`Contrast: ${contrast}`} onPress={cycleContrast} />
        <AccessibleButton label={`Spacing: ${spacing}`} onPress={cycleSpacing} />
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <Text accessibilityRole="header" style={[styles.heading, { color: palette.foreground }]}>
          Original text
        </Text>
        <Text selectable style={textStyle}>
          {route.params.result.fullText}
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 24, paddingBottom: 64 },
  heading: { fontSize: 20, fontWeight: '700', marginBottom: 20 },
});
