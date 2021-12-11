import { StyleSheet } from 'react-native';
import { rs } from './helpers';

const size = {
  h1: rs(40),
  h2: rs(32),
  h3: rs(26),
  h4: rs(24),
  h5: rs(22),
  medium: rs(20),
  normal: rs(18),
  small: rs(16),
  mini: rs(14),
};

const style = StyleSheet.create({
  h1: {
    fontSize: size.h1,
    lineHeight: rs(48),
  },
  h2: {
    fontSize: size.h2,
    lineHeight: rs(48),
  },
  h3: {
    fontSize: size.h3,
  },
  h4: {
    fontSize: size.h4,
    lineHeight: rs(32),
    letterSpacing: rs(2),
  },
  h5: {
    fontSize: size.h5,
    lineHeight: rs(32),
  },
  medium: {
    fontSize: size.medium,
  },
  normal: {
    fontSize: size.normal,
  },
  small: {
    fontSize: size.small,
  },
  mini: {
    fontSize: size.mini,
  },
  bold: {
    fontWeight: 'bold',
  },
});

export default {
  size,
  style,
};
