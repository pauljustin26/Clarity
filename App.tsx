import './global.css';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

import type { RootStackParamList } from './src/app/navigation/types';
import { mlKitOcrService } from './src/data/services/ocr/MlKitOcrService';
import { CameraScreen } from './src/features/camera/CameraScreen';
import { ReaderScreen } from './src/features/reader/ReaderScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Stack.Navigator
        initialRouteName="Scan"
        screenOptions={{
          headerBackButtonDisplayMode: 'minimal',
          headerTitleStyle: { fontSize: 22, fontWeight: '700' },
        }}
      >
        <Stack.Screen name="Scan" options={{ headerShown: false }}>
          {(props) => <CameraScreen {...props} ocrService={mlKitOcrService} />}
        </Stack.Screen>
        <Stack.Screen component={ReaderScreen} name="Reader" options={{ title: 'Accessible Reader' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
