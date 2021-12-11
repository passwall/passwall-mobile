import React from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';
import { Colors, Fonts } from '@/styles';

type Props = {
  variant?: keyof typeof Fonts.size;
  color?: keyof typeof Colors;
} & TextProps;

export default function PasswallText({
  children,
  style,
  variant = 'normal',
  color = 'White',
  ...rest
}: Props) {
  return (
    <Text
      style={[
        styles.container,
        styles[variant],
        { color: Colors[color] },
        style,
      ]}
      {...rest}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  container: {},
  ...Fonts.style,
});
