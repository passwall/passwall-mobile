export const ColorAlpha = (color: string, alpha: number): string =>
  `${color}${Math.floor(alpha * 255).toString(16)}`;

const ColorDark = '#1F1F1F';
const ColorPrimary = '#5707FF';
const ColorPrimaryDark = '#BF6F42';
const ColorSecondary = '#00FFD1';
const ColorWhite = '#FFFFFF';
const ColorGray = '#E3E3E3';
const ColorDisable = '#627FAE';

export default {
  Dark: ColorDark,
  Black: '#000000',
  Dark5: 'rgba(31, 31, 31, 0.05)',
  Dark10: ColorAlpha(ColorDark, 0.1),
  Dark20: ColorAlpha(ColorDark, 0.2),
  Dark30: ColorAlpha(ColorDark, 0.3),
  Dark40: ColorAlpha(ColorDark, 0.4),
  Dark50: ColorAlpha(ColorDark, 0.5),
  Dark60: ColorAlpha(ColorDark, 0.6),
  Dark70: ColorAlpha(ColorDark, 0.7),

  Gray: ColorGray,
  Gray20: ColorAlpha(ColorGray, 0.2),
  Gray30: ColorAlpha(ColorGray, 0.3),
  Gray40: ColorAlpha(ColorGray, 0.4),
  Gray50: ColorAlpha(ColorGray, 0.5),
  Gray60: ColorAlpha(ColorGray, 0.6),

  White: ColorWhite,
  White10: ColorAlpha(ColorWhite, 0.1),
  White20: ColorAlpha(ColorWhite, 0.2),
  White30: ColorAlpha(ColorWhite, 0.3),
  White50: ColorAlpha(ColorWhite, 0.5),
  White60: ColorAlpha(ColorWhite, 0.6),

  Primary: ColorPrimary,
  PrimaryDark: ColorPrimaryDark,
  Secondary: ColorSecondary,
  Disable: ColorDisable,

  Link: '#4D91FF',
  Input: '#767680',
  Success: '#6AF499',
  Warning: '#EA5F00',
  Danger: '#FF5151',
  Info: '#68C3E3',
};
