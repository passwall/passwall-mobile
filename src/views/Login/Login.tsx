import React, { useEffect, useState } from 'react';
import { Button, MasterInput, Page, Text } from '@/components';
import { Colors, Spacing } from '@/styles';
import { Keyboard, Platform, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { ArrowRightIcon } from 'react-native-heroicons/solid';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Index() {
  const [text, setText] = useState('');
  const { bottom } = useSafeAreaInsets();

  const buttonBottom = useSharedValue(0);

  const animButtonStyle = useAnimatedStyle(() => {
    return {
      position: 'absolute',
      bottom: buttonBottom.value,
    };
  }, [buttonBottom]);

  useEffect(() => {
    const showSub = Keyboard.addListener('keyboardWillShow', event => {
      buttonBottom.value = withTiming(event.endCoordinates.height);
    });
    const hideSub = Keyboard.addListener('keyboardWillHide', () => {
      buttonBottom.value = withTiming(0);
    });

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  return (
    <Page style={styles.container} bgColor={Colors.Black}>
      <Text variant="h4" color="Secondary" bold>
        LOGIN
      </Text>
      <Text variant="h1" bold>
        {'PassWall\nServer'}
      </Text>
      <MasterInput
        value={text}
        onChangeText={setText}
        autoFocus
        placeholder="https://www.passwall.io"
      />
      <Animated.View
        style={[
          styles.btnWrapper,
          {
            paddingBottom:
              bottom + (Platform.OS === 'android' ? Spacing.normal : 0),
          },
          animButtonStyle,
        ]}>
        <Button>
          <ArrowRightIcon color={Colors.White} />
        </Button>
      </Animated.View>
    </Page>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: Spacing.small,
  },
  btnWrapper: {
    alignSelf: 'flex-end',
    right: Spacing.normal,
  },
});
