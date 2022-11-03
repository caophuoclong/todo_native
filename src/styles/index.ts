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
    fontStyle: 'italic',
  },
  settingButton: {
    padding: 10,
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    //   color with gray sweet
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderWidth: 1,
    marginVertical: 5
  },
  settingTitle:{
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10
  }
});
