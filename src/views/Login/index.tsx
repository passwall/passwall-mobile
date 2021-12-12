import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  ShieldCheckIcon,
  ClipboardCheckIcon,
  KeyIcon,
  DocumentReportIcon,
  CreditCardIcon,
  LockClosedIcon,
  UserIcon,
  LocationMarkerIcon,
} from 'react-native-heroicons/solid';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { Page, Text, Button, PasswallWithText } from '@/components';
import { Colors, Spacing } from '@/styles';
import { rs } from '@/styles/helpers';
import useAppNavigation from '@/utils/hooks/useAppNavigation';

const RADIUS = rs(130);

const ICONS = [
  ShieldCheckIcon,
  LocationMarkerIcon,
  ClipboardCheckIcon,
  KeyIcon,
  DocumentReportIcon,
  CreditCardIcon,
  LockClosedIcon,
  UserIcon,
];

const DOTS = ICONS.map((icon, index) => {
  const angle = index * (360 / ICONS.length);

  return {
    x: RADIUS * Math.cos((Math.PI * angle) / 180),
    y: RADIUS * Math.sin((Math.PI * angle) / 180),
    icon,
  };
});

const AnimatedIcon = React.memo(
  ({
    toX,
    toY,
    icon,
    focus,
  }: {
    toX: number;
    toY: number;
    icon: typeof ICONS[number];
    focus: boolean;
  }) => {
    const x = useSharedValue(0);
    const y = useSharedValue(0);
    const opacity = useSharedValue(0.4);
    const scale = useSharedValue(1);
    const Icon = icon;

    useEffect(() => {
      if (focus) {
        opacity.value = withTiming(1);
        scale.value = withTiming(1.2);
      } else {
        opacity.value = withTiming(0.4);
        scale.value = withTiming(1);
      }
    }, [focus]);

    useEffect(() => {
      const timeout = setTimeout(() => {
        x.value = withTiming(toX);
        y.value = withTiming(toY);
      }, 300);
      return () => clearTimeout(timeout);
    }, [toX, toY]);

    const animStyle = useAnimatedStyle(() => {
      return {
        transform: [
          {
            translateX: x.value,
          },
          {
            translateY: y.value,
          },
          {
            scale: scale.value,
          },
        ],
        opacity: opacity.value,
      };
    });

    return (
      <Animated.View style={[styles.icon, animStyle]}>
        <Icon size={32} color={Colors.Primary} />
      </Animated.View>
    );
  },
);

export default function Index() {
  const [focusIconIndex, setFocusIconIndex] = useState(
    Math.floor(Math.random() * ICONS.length),
  );
  const navigation = useAppNavigation();

  useEffect(() => {
    const interval = setInterval(() => {
      setFocusIconIndex(Math.floor(Math.random() * 8));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Page style={styles.container} bgColor={Colors.Black}>
      <View style={styles.content}>
        {DOTS.map((dot, index) => (
          <AnimatedIcon
            key={index}
            toX={dot.x}
            toY={dot.y}
            icon={dot.icon}
            focus={focusIconIndex === index}
          />
        ))}

        <PasswallWithText />
      </View>
      <View style={styles.footer}>
        <Button
          onPress={() =>
            navigation.navigate('LoginRegisterStack', {
              screen: 'Login',
              params: { screen: 'Server' },
            })
          }>
          <Text bold>Login</Text>
        </Button>
        <Button
          onPress={() => {
            navigation.navigate('LoginRegisterStack', {
              screen: 'Register',
              params: { screen: 'Email' },
            });
          }}
          variant="outline"
          style={{ marginTop: Spacing.small }}>
          <Text bold>Create an Account</Text>
        </Button>
      </View>
    </Page>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: { flex: 618, justifyContent: 'center', alignItems: 'center' },
  footer: { flex: 184, width: '90%', alignItems: 'center' },
  icon: {
    position: 'absolute',
    opacity: 0.6,
  },
});
