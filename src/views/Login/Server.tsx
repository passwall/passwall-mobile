import React, { useEffect, useState } from 'react';
import { Button, MasterInput, Page, Text } from '@/components';
import { Colors, Spacing } from '@/styles';
import {
  ActivityIndicator,
  Keyboard,
  Platform,
  StyleSheet,
} from 'react-native';
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
import { useAppDispatch, useAppSelector } from '@/utils/hooks/useStore';
import { actions } from '@/store/user';
import { VALIDATE_URL_REGEX } from '@/utils/constants';

import { checkUrl } from '@/api';

type FormData = {
  server: string;
};

export default function Index() {
  const { bottom } = useSafeAreaInsets();
  const serverUrl = useAppSelector(state => state.user.serverUrl);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormData>({ defaultValues: { server: serverUrl } });
  const navigation = useAppNavigation();

  const buttonBottom = useSharedValue(0);

  const onPress: SubmitHandler<FormData> = async data => {
    setLoading(true);
    if (await checkUrl(data.server)) {
      dispatch(actions.setServerUrl(data.server));
      navigation.navigate('Login', {
        screen: 'Email',
      });
    } else {
      setError('server', { message: 'Server is not running passwall' });
    }
    setLoading(false);
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
      <Text
        variant="h4"
        color="Secondary"
        style={{ marginTop: Spacing.normal }}
        bold>
        LOGIN
      </Text>
      <Text style={{ marginTop: Spacing.xsmall }} variant="h1" bold>
        {'PassWall\nServer'}
      </Text>
      <Controller
        name="server"
        control={control}
        rules={{
          required: "Server can't be empty",
          pattern: {
            value: VALIDATE_URL_REGEX,
            message: 'Invalid server url',
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <MasterInput
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            defaultValue={value}
            autoFocus
            placeholder="https://www.passwall.io"
            keyboardType="url"
            error={errors.server}
            containerStyle={{ marginTop: Spacing.large }}
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
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <ArrowRightIcon color={Colors.White} />
          )}
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
