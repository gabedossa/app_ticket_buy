import React from 'react';
import { useColorScheme, View, type ViewProps } from 'react-native';

// Objeto de cores para os temas
const Colors = {
  light: {
    background: '#FFFFFF',
  },
  dark: {
    background: '#1C1C1E',
  },
};

// Define um novo tipo que estende as propriedades padrão de View
export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedView({ style, lightColor, darkColor, ...otherProps }: ThemedViewProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const backgroundColor = colorScheme === 'dark' 
    ? darkColor ?? Colors.dark.background 
    : lightColor ?? Colors.light.background;

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}