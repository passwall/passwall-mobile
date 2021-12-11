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

const RADIUS = rs(130);

const AnimatedIcon = ({
  toX,
  toY,
  icon,
  focus,
}: {
  toX: number;
  toY: number;
  icon: typeof ShieldCheckIcon;
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
};

export default function Index() {
  const [focusIconIndex, setFocusIconIndex] = useState(
    Math.floor(Math.random() * 8),
  );
  useEffect(() => {
    const interval = setInterval(() => {
      setFocusIconIndex(Math.floor(Math.random() * 8));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Page style={styles.container} bgColor={Colors.Black}>
      <View style={styles.content}>
        <AnimatedIcon
          toX={RADIUS}
          toY={0}
          icon={ClipboardCheckIcon}
          focus={focusIconIndex === 0}
        />
        <AnimatedIcon
          toX={(RADIUS * Math.sqrt(2)) / 2}
          toY={(RADIUS * Math.sqrt(2)) / 2}
          icon={KeyIcon}
          focus={focusIconIndex === 1}
        />
        <AnimatedIcon
          toX={0}
          toY={RADIUS}
          icon={DocumentReportIcon}
          focus={focusIconIndex === 2}
        />
        <AnimatedIcon
          toX={-(RADIUS * Math.sqrt(2)) / 2}
          toY={(RADIUS * Math.sqrt(2)) / 2}
          icon={CreditCardIcon}
          focus={focusIconIndex === 3}
        />
        <AnimatedIcon
          toX={-RADIUS}
          toY={0}
          icon={LockClosedIcon}
          focus={focusIconIndex === 4}
        />
        <AnimatedIcon
          toX={-(RADIUS * Math.sqrt(2)) / 2}
          toY={-(RADIUS * Math.sqrt(2)) / 2}
          icon={UserIcon}
          focus={focusIconIndex === 5}
        />
        <AnimatedIcon
          toX={0}
          toY={-RADIUS}
          icon={ShieldCheckIcon}
          focus={focusIconIndex === 6}
        />
        <AnimatedIcon
          toX={(RADIUS * Math.sqrt(2)) / 2}
          toY={-(RADIUS * Math.sqrt(2)) / 2}
          icon={LocationMarkerIcon}
          focus={focusIconIndex === 7}
        />

        <PasswallWithText />
      </View>
      <View style={styles.footer}>
        <Button>
          <Text bold>Login</Text>
        </Button>
        <Button variant="outline" style={{ marginTop: Spacing.small }}>
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
