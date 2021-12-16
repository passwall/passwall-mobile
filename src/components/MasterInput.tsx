import { Colors, Fonts, Spacing } from '@/styles';
import React, { memo, useMemo, useState } from 'react';
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
  Pressable,
} from 'react-native';
import { Text } from '@/components';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';
import { EyeIcon, EyeOffIcon } from 'react-native-heroicons/solid';
import { rs } from '@/styles/helpers';
import useLayout from '@/utils/hooks/useLayout';

type Props = {
  containerStyle?: ViewStyle;
  hintText?: string;
} & TextInputProps;

const ICON_SIZE = rs(24);

function MasterInput({
  containerStyle,
  hintText,
  secureTextEntry,
  value,
  ...rest
}: Props) {
  const [secure, setSecure] = useState(secureTextEntry);
  const { height, onLayout } = useLayout();

  const Icon = useMemo(() => {
    return secure ? EyeIcon : EyeOffIcon;
  }, [secure]);

  const animateValue = useDerivedValue(() => {
    if (value) {
      return withTiming(100);
    }
    return withTiming(0);
  }, [value]);

  const lineAnimStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        animateValue.value,
        [0, 100],
        [Colors.White60, Colors.Primary],
      ),
    };
  }, [animateValue]);

  return (
    <View style={[styles.container, containerStyle]}>
      <TextInput
        style={[styles.input]}
        placeholderTextColor={Colors.White50}
        secureTextEntry={secure}
        onLayout={onLayout}
        {...rest}
      />
      {secureTextEntry && (
        <Pressable
          onPress={() => setSecure(!secure)}
          style={[styles.icon, { top: height / 2 - ICON_SIZE / 2 }]}>
          <Icon color={Colors.White} />
        </Pressable>
      )}
      <Animated.View style={[styles.line, lineAnimStyle]} />
      {hintText && (
        <Text
          style={{ marginTop: Spacing.xsmall }}
          variant="small"
          color="White60"
          fontFamily="Inter">
          {hintText}
        </Text>
      )}
    </View>
  );
}

export default memo(MasterInput);

const styles = StyleSheet.create({
  container: {
    marginTop: Spacing.small,
  },
  input: {
    color: Colors.White,
    paddingBottom: Spacing.small,
    fontSize: Fonts.size.normal,
    fontFamily: Fonts.family.Inter,
  },
  line: {
    backgroundColor: Colors.White,
    width: '100%',
    height: 2,
    borderRadius: 8,
  },

  icon: {
    position: 'absolute',
    right: 0,
    width: ICON_SIZE,
    height: ICON_SIZE,
  },
});
