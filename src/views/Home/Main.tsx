import React from 'react';

import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
import { Page, Text } from '@/components';
import { Colors, Spacing } from '@/styles';
import LoginsService from '@/api/services/Logins';
import { useQuery } from 'react-query';

export default function Index() {
  const { data, isLoading } = useQuery('logins', LoginsService.fetchAll);

  return (
    <Page bgColor={Colors.Black}>
      <Text color="White" variant="h2" bold style={styles.title}>
        Passwords
      </Text>
      <View style={styles.container}>
        {isLoading && <ActivityIndicator color={Colors.White} size="large" />}
        {data && (
          <FlatList
            data={data}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }) => <Text>{item.url}</Text>}
          />
        )}
      </View>
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
