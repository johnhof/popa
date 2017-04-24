
//
// Margins
//

const MARGINS = {
  none: '0px',
  small: '12px',
  medium: '24px',
  large: '48px',
  int: (name) =>  parseInt((MARGINS[name] || '').replace('px', ''), 10)
};

export default MARGINS
