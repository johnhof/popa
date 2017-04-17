
//
// Fonts
//

const BASE = (s=1) => (s * 12) + 'px';

export default {
  custom: BASE,
  base: BASE(1),
  small: BASE(0.5),
  normal: BASE(1),
  large: BASE(2),
  xLarge: BASE(4),
  xxLarge: BASE(8),
  xxxLarge: BASE(16)
};
