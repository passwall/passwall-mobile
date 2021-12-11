import React from 'react';
import {Text, View} from 'react-native';
import {SparklesIcon} from 'react-native-heroicons/outline';
import {PasswallLogo} from '@/components/icons';

export default function Bootstrap() {
  return (
    <View>
      <Text>Hello</Text>
      <SparklesIcon color={'red'} size={42} />
      <PasswallLogo />
    </View>
  );
}
