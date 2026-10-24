import { useWindowDimensions } from 'react-native';

/** App content width; capped on web/tablets so the layout stays phone-shaped. */
export const MAX_APP_WIDTH = 480;

export function useAppWidth() {
  const { width } = useWindowDimensions();
  return Math.min(width, MAX_APP_WIDTH);
}
