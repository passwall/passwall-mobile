import React from 'react';

import * as Icons from '@/components/icons';
import { Spacing } from '@/styles';
import { rs } from '@/styles/helpers';

function PasswallWithText() {
  return (
    <>
      <Icons.PasswallLogo width={rs(72)} height={rs(72)} />
      <Icons.PassWallText
        style={{ height: rs(30), width: rs(138), marginTop: Spacing.normal }}
      />
    </>
  );
}

export default React.memo(PasswallWithText);
