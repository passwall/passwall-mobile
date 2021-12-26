import React, { useEffect } from 'react';
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
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';

import useAppNavigation from '@/utils/hooks/useAppNavigation';

import { VALIDATE_EMAIL_REGEX } from '@/utils/constants';
import { useAppDispatch } from '@/utils/hooks/useStore';
import { actions } from '@/store/user.slice';

type FormData = {
  email: string;
};

export default function Index() {
  const { bottom } = useSafeAreaInsets();
  const navigation = useAppNavigation();
  const buttonBottom = useSharedValue(0);
  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ defaultValues: { email: 'ooruc471@yandex.com' } });

  const onPress: SubmitHandler<FormData> = data => {
    dispatch(actions.setEmail(data.email));
    navigation.navigate('Login', { screen: 'Password' });
  };

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
      <Button onPress={navigation.goBack} variant="outline" size={40}>
        <ArrowLeftIcon color={Colors.White} />
      </Button>

      <Text variant="h1" bold style={{ marginVertical: Spacing.large }}>
        {'E-Mail\nAddress'}
      </Text>
      <Controller
        name="email"
        control={control}
        rules={{
          required: 'E-Mail is required',
          pattern: {
            value: VALIDATE_EMAIL_REGEX,
            message: 'Please enter a valid email address',
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <MasterInput
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            defaultValue={value}
            autoFocus
            placeholder="your@email.com"
            keyboardType="email-address"
            error={errors.email}
          />
        )}
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
        <Button onPress={handleSubmit(onPress)}>
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
