import {StyleSheet} from 'react-native';

export const CommonStyles = StyleSheet.create({
  input: {
    width: '50%',
    height: 40,
    margin: 12,
    // borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
    fontStyle:"italic"
  },
});
