import { rs } from './helpers';

export const tiny = rs(4);

export const xsmall = tiny * 2; // 8
export const small = xsmall * 2; // 16
export const normal = tiny * 3; // 24
export const medium = normal * 2; // 48
export const large = medium * 1.5; // 72

export default {
  tiny,
  xsmall,
  small,
  normal,
  medium,
  large,
};
