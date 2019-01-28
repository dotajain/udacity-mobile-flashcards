import { StyleSheet } from 'react-native';
import colors from '../../utils/colors';

export default StyleSheet.create({
  mainContentStyle: {
    padding: 10,
    paddingBottom: 90,
  },
  screenContainer: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    zIndex: 0,
  },
  primaryButton: {
    backgroundColor: colors.silver,
  },
});
