import './global.css';

import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';

import { colors } from './src/app/theme/tokens';

export default function App() {
  return (
    <SafeAreaView className="flex-1 bg-clarity-cream">
      <StatusBar style="dark" backgroundColor={colors.background} />
      <ScrollView
        contentContainerClassName="flex-grow justify-center px-6 py-10"
        contentInsetAdjustmentBehavior="automatic"
      >
        <View className="w-full max-w-xl self-center">
          <Text
            accessibilityRole="header"
            className="text-5xl font-bold leading-tight text-clarity-ink"
          >
            Clarity
          </Text>
          <Text className="mt-3 text-2xl font-semibold leading-8 text-clarity-blue">
            See it. Read it. Understand it.
          </Text>

          <View
            accessible
            accessibilityLabel="Phase 0 foundation is ready"
            className="mt-10 rounded-3xl border-2 border-clarity-ink bg-white p-6"
          >
            <Text className="text-3xl font-bold leading-10 text-clarity-ink">
              Foundation ready
            </Text>
            <Text className="mt-4 text-xl leading-8 text-clarity-ink">
              Expo Go and accessible styling are configured. Camera and reading features begin in Phase 1.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
