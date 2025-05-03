import { Dimensions } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const spacing = {
  xs: 4,
  s: 8,
  m: 16,
  l: 24,
  xl: 32,
  xxl: 40,
};

const borderRadius = {
  xs: 4,
  s: 8,
  m: 12,
  l: 16,
  xl: 24,
  circular: 9999,
};

const fontSize = {
  xs: 12,
  s: 14,
  m: 16,
  l: 18,
  xl: 24,
  xxl: 32,
};

export default {
  window: {
    width,
    height,
  },
  spacing,
  borderRadius,
  fontSize,
  isSmallDevice: width < 375,
};