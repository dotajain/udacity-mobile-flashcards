import { StyleSheet, Platform } from 'react-native';
import colors from '../../utils/colors';

export default StyleSheet.create({
  screenContainer: {
    backgroundColor: colors.white,
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
    zIndex: 0,
  },
  emptyIcon: {
    color: colors.steel,
  },
  emptyText: {
    color: colors.silver,
    textAlign: 'center',
    fontSize: 18,
    marginTop: 15,
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: colors.marvel,
    borderWidth: 0,
    height: 60,
    width: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 20,
    right: 20,
    ...Platform.select({
      ios: {
        shadowColor: colors.black,
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
          height: 1,
          width: 0,
        },
      },
      android: {
        elevation: 4,
      },
    }),
  },
  modalContainer: {
    padding: 10,
  },
});
