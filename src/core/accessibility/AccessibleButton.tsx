import type { ReactNode } from 'react';
import { Pressable, Text } from 'react-native';

type AccessibleButtonProps = {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  selected?: boolean;
  children?: ReactNode;
};

export function AccessibleButton({
  label,
  onPress,
  disabled = false,
  selected = false,
  children,
}: AccessibleButtonProps) {
  return (
    <Pressable
      accessibilityLabel={label}
      accessibilityRole="button"
      accessibilityState={{ disabled, selected }}
      className={`min-h-12 min-w-12 items-center justify-center rounded-2xl border-2 px-5 py-3 ${
        selected ? 'border-clarity-ink bg-clarity-blue' : 'border-clarity-ink bg-white'
      } ${disabled ? 'opacity-50' : ''}`}
      disabled={disabled}
      onPress={onPress}
    >
      {children ?? (
        <Text className={`text-lg font-bold ${selected ? 'text-white' : 'text-clarity-ink'}`}>
          {label}
        </Text>
      )}
    </Pressable>
  );
}
