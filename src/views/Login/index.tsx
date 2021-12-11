import { Page, Text, Button } from '@/components';
import { Colors, Spacing } from '@/styles';
import React from 'react';
import * as Icons from '@/components/icons';
import { StyleSheet, View } from 'react-native';
import { rs } from '@/styles/helpers';

export default function Index() {
  return (
    <Page style={styles.container} bgColor={Colors.Black}>
      <View style={styles.content}>
        <Icons.PasswallLogo width={rs(72)} height={rs(72)} />
        <Icons.PassWallText
          style={{ height: rs(30), width: rs(138), marginTop: Spacing.normal }}
        />
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
});
