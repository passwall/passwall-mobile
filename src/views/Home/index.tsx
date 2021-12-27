import React from 'react';

import { useAppDispatch, useAppSelector } from '@/utils/hooks/useStore';
import { Button, Page, Text } from '@/components';
import { Colors } from '@/styles';
import { actions } from '@/store/user.slice';

export default function Index() {
  const user = useAppSelector(state => state.user.user);
  const dispatch = useAppDispatch();

  const logOut = () => dispatch(actions.logOut());

  return (
    <Page bgColor={Colors.Black}>
      <Text color="White">{JSON.stringify(user, null, 2)}</Text>
      <Button onPress={logOut}>
        <Text color="White">Logout</Text>
      </Button>
    </Page>
  );
}
