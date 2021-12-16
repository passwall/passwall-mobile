import React from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';
import { Colors, Fonts } from '@/styles';

type Props = {
  variant?: keyof typeof Fonts.size;
  color?: keyof typeof Colors;
  bold?: boolean;
  fontFamily?: keyof typeof Fonts.family;
} & TextProps;

export default function PasswallText({
  children,
  style,
  variant = 'normal',
  color = 'White',
  bold = false,
  fontFamily = 'Metropolis',
  ...rest
}: Props) {
  return (
    <Text
      style={[
        styles.container,
        styles[variant],
        { color: Colors[color] },
        { fontFamily: Fonts.family[fontFamily] },
        bold && styles.bold,
        style,
      ]}
      {...rest}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  container: {
    fontFamily: 'Metropolis-Regular',
  },
  ...Fonts.style,
});
