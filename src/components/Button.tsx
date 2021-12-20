import { Colors, Spacing } from '@/styles';
import { rs } from '@/styles/helpers';
import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';

type Props = {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: number;
} & TouchableOpacityProps;

function Button({
  children,
  style,
  variant = 'primary',
  size,
  ...rest
}: Props) {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        styles[variant],
        size ? { width: rs(size), height: rs(size) } : undefined,
        style,
      ]}
      {...rest}>
      {children}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.small,
    borderRadius: rs(12),
  },
  primary: {
    backgroundColor: Colors.Primary,
  },
  secondary: {
    backgroundColor: Colors.Secondary,
  },
  outline: { backgroundColor: 'transparent' },
});

export default React.memo(Button);
