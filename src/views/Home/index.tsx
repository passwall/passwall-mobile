import React from 'react';

import { useAppSelector } from '@/utils/hooks/useStore';
import { Page, Text } from '@/components';
import { Colors } from '@/styles';

export default function Index() {
  const user = useAppSelector(state => state.user.user);
  return (
    <Page bgColor={Colors.Black}>
      <Text color="White">{JSON.stringify(user, null, 2)}</Text>
    </Page>
  );
}
