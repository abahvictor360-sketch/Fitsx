import { Image, type ImageSourcePropType, type ImageStyle, type StyleProp } from 'react-native';

type Props = { source: ImageSourcePropType; width: number; height: number; style?: StyleProp<ImageStyle> };

/** Background-free product photo, scaled to fit the given box. */
export function ShoeImage({ source, width, height, style }: Props) {
  return <Image source={source} resizeMode="contain" style={[{ width, height }, style]} accessibilityIgnoresInvertColors />;
}
