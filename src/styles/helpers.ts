import { Dimensions } from 'react-native';

import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

/**
 * @param size size given in the design
 * @returns responsive size of the text
 */
function responsiveSize(size: number) {
  return wp((size / 375) * 100);
}

export const screen = {
  height: Dimensions.get('screen').height,
  width: Dimensions.get('screen').width,
};

export { responsiveSize as rs };
