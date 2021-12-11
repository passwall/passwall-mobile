import React, { PropsWithChildren } from 'react';
import { ActivityIndicator, StyleSheet, View, ViewProps } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/styles';

type Props = PropsWithChildren<{
  /**
   * status bar color*
   */
  bgColor?: string;
  loading: boolean;
  wrapElement?: React.ElementType;
}> &
  ViewProps;

function Page({
  children,
  style,
  bgColor,
  loading,
  wrapElement = View,
  ...rest
}: Props) {
  const Wrapper = wrapElement;
  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: bgColor }]}
      edges={['top']}
      {...rest}>
      <Wrapper style={[styles.contentStyle, style]}>
        {loading ? (
          <View style={styles.loading}>
            <ActivityIndicator size="large" color={Colors.Primary} />
          </View>
        ) : (
          children
        )}
      </Wrapper>
    </SafeAreaView>
  );
}

Page.defaultProps = { loading: false } as Props;

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.White,
  },
  contentStyle: {
    flex: 1,
    backgroundColor: Colors.Black,
  },
});
