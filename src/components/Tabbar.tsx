/* eslint-disable react-native/no-inline-styles */

import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import React, { Fragment, useMemo, useState } from 'react';
import { Pressable, StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated, {
  FadeInDown,
  FadeOutDown,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
  WithTimingConfig,
} from 'react-native-reanimated';
import {
  StarIcon,
  KeyIcon,
  SearchIcon,
  CogIcon,
  PlusIcon,
  LockClosedIcon,
  CreditCardIcon,
  UserIcon,
  LocationMarkerIcon,
  ShieldCheckIcon,
} from 'react-native-heroicons/solid';

import useLayout from '@/utils/hooks/useLayout';
import { Colors, Spacing } from '@/styles';
import { rs } from '@/styles/helpers';
import { Text } from '@/components';

const animConfig: WithTimingConfig = { duration: 200 };

const ITEMS = [
  {
    label: 'Logins',
    icon: LockClosedIcon,
  },
  {
    label: 'Credit Cards',
    icon: CreditCardIcon,
  },
  {
    label: 'Identities',
    icon: UserIcon,
  },
  {
    label: 'Address',
    icon: LocationMarkerIcon,
  },
  {
    label: 'Server',
    icon: ShieldCheckIcon,
  },
  {
    label: 'License Key',
    icon: KeyIcon,
  },
];

export default function Tabbar({
  state,
  insets,
  navigation,
}: BottomTabBarProps) {
  const currentRoute = state.index;
  const { onLayout, height } = useLayout();
  const [open, setOpen] = useState(false);

  const routes = useMemo(() => {
    return state.routes.map(route => {
      switch (route.name) {
        case 'Main':
          return {
            name: 'Main',
            icon: KeyIcon,
            onPress: () => {},
          };
        case 'Search':
          return {
            name: 'Search',
            icon: SearchIcon,
            onPress: () => {},
          };
        case 'Favorite':
          return {
            name: 'Favorite',
            icon: StarIcon,
            onPress: () => {},
          };
        case 'Settings':
        default:
          return {
            name: 'Settings',
            icon: CogIcon,
            onPress: () => {},
          };
      }
    });
  }, [state.routes]);

  // animation variables
  const rotate = useDerivedValue(() => {
    return open ? withTiming(45, animConfig) : withTiming(0, animConfig);
  }, [open]);

  const animatedActionButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: `${rotate.value}deg`,
        },
      ],
    };
  }, [rotate]);

  return (
    <Fragment>
      {/* Menu */}
      {open && (
        <Animated.View
          entering={FadeInDown}
          exiting={FadeOutDown}
          style={styles.menuWrapper}>
          <Animated.View
            entering={FadeInDown}
            exiting={FadeOutDown}
            style={[styles.menu, { bottom: insets.bottom + height }]}>
            {ITEMS.map(({ label, icon }, index) => {
              const Icon = icon;
              return (
                <TouchableOpacity style={styles.menuItem} key={index}>
                  <Icon
                    color={index === 0 ? Colors.White : Colors.Gray40}
                    width={rs(24)}
                    height={rs(24)}
                  />
                  <Text
                    fontFamily="Inter"
                    variant="small"
                    bold
                    style={{ flex: 1, marginLeft: Spacing.xsmall }}
                    color={index === 0 ? 'White' : 'Gray40'}>
                    {label}
                  </Text>
                  <StarIcon
                    width={rs(24)}
                    height={rs(24)}
                    color={Colors.Secondary}
                  />
                </TouchableOpacity>
              );
            })}
          </Animated.View>
        </Animated.View>
      )}
      {/* Tabbar */}
      <View
        style={[
          styles.container,
          {
            bottom: insets.bottom,
            justifyContent: open ? 'center' : 'space-between',
            backgroundColor: !open ? '#0A0F17' : 'transparent',
          },
        ]}
        onLayout={onLayout}>
        {!open &&
          routes.slice(0, 2).map((route, index) => {
            const Icon = route.icon;
            const isFocused = currentRoute === index;
            return (
              <TouchableOpacity
                key={index}
                onPress={() => navigation.navigate(route.name)}>
                <Icon
                  height={rs(32)}
                  width={rs(32)}
                  color={isFocused ? Colors.Secondary : Colors.Gray30}
                />
              </TouchableOpacity>
            );
          })}
        <Pressable
          style={styles.actionButton}
          onPress={() => setOpen(prev => !prev)}>
          <Animated.View style={animatedActionButtonStyle}>
            <PlusIcon height={rs(24)} width={rs(24)} color={Colors.White} />
          </Animated.View>
        </Pressable>

        {!open &&
          routes.slice(-2).map((route, index) => {
            const Icon = route.icon;
            const isFocused = currentRoute === index + 2;

            return (
              <TouchableOpacity
                key={index}
                onPress={() => navigation.navigate(route.name)}>
                <Icon
                  height={rs(32)}
                  width={rs(32)}
                  color={isFocused ? Colors.Secondary : Colors.Gray30}
                />
              </TouchableOpacity>
            );
          })}
      </View>
    </Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    position: 'absolute',
    backgroundColor: '#0A0F17',
    width: '91%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.xsmall,
    paddingHorizontal: Spacing.small,
    borderRadius: 16,
  },

  menuWrapper: {
    ...(StyleSheet.absoluteFill as any),
    backgroundColor: 'rgba(0,0,0,0.8)',
  },

  menu: {
    position: 'absolute',
    alignSelf: 'center',
    backgroundColor: '#0A0F17',
    padding: Spacing.normal,
    width: '70%',
  },

  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.xsmall,
    paddingVertical: Spacing.xsmall,
    marginTop: Spacing.xsmall,
  },

  actionButton: {
    width: rs(48),
    height: rs(48),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.Primary,
    borderRadius: 12,
  },
});
