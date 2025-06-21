import { cssInterop } from 'nativewind';
import type { SvgProps } from 'react-native-svg';

export const generateIcon = (svg: React.FC<SvgProps>) =>
  cssInterop(svg, {
    className: {
      target: 'style',
      nativeStyleToProp: {
        width: true,
        height: true,
      },
    },
  });
