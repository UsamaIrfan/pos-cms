// ============ Define Colors Variables here ========== //

// const white = "#FFFFFF";
// const black = "#000000";

const white = {
  white1: '#FFFFFF',
  white2: '#F2F2F2',
  white3: '#F5F5F5',
  white4: '#CCCCCC',
  white5: '#B2B2B2'
};

const black = {
  black1: '#141414',
  black2: '#1A1A1A',
  black3: '#282828',
  black4: '#666666'
};

const others = {
  primary: '#DFB661',
  success: '#72BF00',
  info: '#1A81FF',
  error: '#F23030',
  errorDark: '#C93131',
  warning: '#BC7D17'
};

const primary = '#4c52bc';

const colors = {
  ...white,
  ...black,
  ...others,
  background: white.white2,
  background2: black.black1,
  primary,
  lightGray: '#FAFAFA',
  transparent: 'transparent'
};

export default colors;
