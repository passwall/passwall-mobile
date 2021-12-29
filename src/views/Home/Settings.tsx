import React from 'react';

import { StyleSheet } from 'react-native';
import { Page, Text } from '@/components';
import { Colors, Spacing } from '@/styles';

export default function Index() {
  return (
    <Page bgColor={Colors.Black}>
      <Text color="White" variant="h2" bold style={styles.title}>
        Settings
      </Text>
    </Page>
  );
}

const styles = StyleSheet.create({
  title: {
    marginTop: Spacing.normal,
  },
  container: {
    flex: 1,
    marginTop: Spacing.medium,
  },
});
