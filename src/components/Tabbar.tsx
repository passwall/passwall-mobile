import { Colors, Spacing } from '@/styles';
import { rs } from '@/styles/helpers';

import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import React, { useMemo } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import {
  StarIcon,
  KeyIcon,
  SearchIcon,
  CogIcon,
  PlusIcon,
} from 'react-native-heroicons/solid';

export default function Tabbar({
  state,
  insets,
  navigation,
}: BottomTabBarProps) {
  const currentRoute = state.index;
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

  return (
    <View style={[styles.container, { bottom: insets.bottom }]}>
      {routes.slice(0, 2).map((route, index) => {
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
      <TouchableOpacity style={styles.actionButton}>
        <PlusIcon height={rs(24)} width={rs(24)} color={Colors.White} />
      </TouchableOpacity>

      {routes.slice(-2).map((route, index) => {
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

  actionButton: {
    width: rs(48),
    height: rs(48),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.Primary,
    borderRadius: 12,
  },
});
