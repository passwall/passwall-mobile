import { Page } from '@/components';
import { Colors } from '@/styles';
import React from 'react';
import * as Icons from '@/components/icons';

export default function Index() {
  return (
    <Page bgColor={Colors.Black}>
      <Icons.PassWallText />
    </Page>
  );
}
