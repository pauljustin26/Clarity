import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useIsFocused } from '@react-navigation/native';
import { useCallback, useRef, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';

import type { RootStackParamList } from '../../app/navigation/types';
import { AccessibleButton } from '../../core/accessibility/AccessibleButton';
import type { OcrService } from '../../domain/services/OcrService';
import { cropToFocusRegion } from './cropToFocusRegion';

type CameraScreenProps = NativeStackScreenProps<RootStackParamList, 'Scan'> & {
  ocrService: OcrService;
};

type ScanState = 'ready' | 'capturing' | 'recognizing' | 'error' | 'empty';

export function CameraScreen({ navigation, ocrService }: CameraScreenProps) {
  const isFocused = useIsFocused();
  const camera = useRef<Camera>(null);
  const device = useCameraDevice('back');
  const { hasPermission, requestPermission } = useCameraPermission();
  const [scanState, setScanState] = useState<ScanState>('ready');
  const [errorMessage, setErrorMessage] = useState('');
  const [torchEnabled, setTorchEnabled] = useState(false);
  const [focusRegionEnabled, setFocusRegionEnabled] = useState(true);

  const capture = useCallback(async () => {
    if (scanState === 'capturing' || scanState === 'recognizing') {
      return;
    }

    try {
      setScanState('capturing');
      if (!camera.current) {
        throw new Error('Camera is not ready');
      }
      const photo = await camera.current.takePhoto({ flash: 'off', enableShutterSound: true });
      setScanState('recognizing');
      const imagePath = focusRegionEnabled
        ? await cropToFocusRegion(photo.path)
        : photo.path;
      const result = await ocrService.recognize({ imagePath });

      if (!result.fullText.trim()) {
        setScanState('empty');
        return;
      }

      setScanState('ready');
      navigation.navigate('Reader', { result });
    } catch {
      setErrorMessage('Clarity could not read this image. Retake it or adjust the focus area.');
      setScanState('error');
    }
  }, [focusRegionEnabled, navigation, ocrService, scanState]);

  if (!hasPermission) {
    return (
      <View className="flex-1 items-center justify-center bg-clarity-cream px-6">
        <Text accessibilityRole="header" className="text-center text-3xl font-bold text-clarity-ink">
          Camera permission needed
        </Text>
        <Text className="my-6 text-center text-xl leading-8 text-clarity-ink">
          Clarity uses your camera only to read text on this device. Images are not uploaded.
        </Text>
        <AccessibleButton label="Allow camera" onPress={() => void requestPermission()} />
      </View>
    );
  }

  if (!device) {
    return (
      <View className="flex-1 items-center justify-center bg-clarity-cream px-6">
        <Text accessibilityRole="alert" className="text-center text-2xl font-bold text-clarity-ink">
          No back camera is available on this device.
        </Text>
      </View>
    );
  }

  const isBusy = scanState === 'capturing' || scanState === 'recognizing';
  const guidance = isBusy
    ? scanState === 'capturing' ? 'Hold steady' : 'Reading text on this device'
    : 'Center the text, move closer, and hold steady';

  return (
    <View className="flex-1 bg-black">
      <Camera
        device={device}
        isActive={isFocused}
        photo
        ref={camera}
        style={StyleSheet.absoluteFill}
        torch={torchEnabled && device.hasTorch ? 'on' : 'off'}
      />

      {focusRegionEnabled ? (
        <View
          accessibilityLabel="Point and Focus region"
          className="absolute left-[10%] right-[10%] top-[25%] h-1/2 rounded-3xl border-4 border-white"
          pointerEvents="none"
        />
      ) : null}

      <View className="absolute inset-x-0 top-0 bg-black/80 px-5 pb-5 pt-14">
        <Text accessibilityLiveRegion="polite" className="text-center text-xl font-bold text-white">
          {guidance}
        </Text>
      </View>

      <View className="absolute inset-x-0 bottom-0 gap-4 bg-black/85 px-5 pb-10 pt-5">
        {scanState === 'empty' ? (
          <Text accessibilityRole="alert" className="text-center text-lg font-semibold text-white">
            No readable text found. Move closer, improve the light, or select a smaller area.
          </Text>
        ) : null}
        {scanState === 'error' ? (
          <Text accessibilityRole="alert" className="text-center text-lg font-semibold text-white">
            {errorMessage}
          </Text>
        ) : null}

        <View className="flex-row flex-wrap justify-center gap-3">
          <AccessibleButton
            disabled={!device.hasTorch || isBusy}
            label={torchEnabled ? 'Light on' : 'Light off'}
            onPress={() => setTorchEnabled((value) => !value)}
            selected={torchEnabled}
          />
          <AccessibleButton
            disabled={isBusy}
            label={focusRegionEnabled ? 'Point & Focus on' : 'Full frame'}
            onPress={() => setFocusRegionEnabled((value) => !value)}
            selected={focusRegionEnabled}
          />
        </View>

        <AccessibleButton
          disabled={isBusy}
          label={scanState === 'error' || scanState === 'empty' ? 'Retake' : 'Capture text'}
          onPress={() => void capture()}
        >
          <View className="flex-row items-center gap-3">
            {isBusy ? <ActivityIndicator color="#111827" size="large" /> : null}
            <Text className="text-2xl font-bold text-clarity-ink">
              {isBusy ? 'Processing…' : scanState === 'ready' ? 'Capture text' : 'Retake'}
            </Text>
          </View>
        </AccessibleButton>
      </View>
    </View>
  );
}
