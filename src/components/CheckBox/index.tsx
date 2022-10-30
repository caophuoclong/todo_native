import {
  View,
  Text,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Entypo';
interface Props {
  value: boolean;
  onValueChange: (value: boolean) => void;
}
const CheckBox: React.FC<Props> = ({value, onValueChange}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        onValueChange(!value);
      }}
      style={[style.container, value ? style.checked : style.uncheck]}>
      {value && <Icon name="check" size={20} color="#fff" />}
    </TouchableOpacity>
  );
};
const style = StyleSheet.create({
  container: {
    width: 30,
    height: 30,

    borderRadius: 1000,
    alignItems: 'center',
    justifyContent: 'center',
    // opacity: 0,
  },
  checked: {
    backgroundColor: '#553A9A',
  },
  uncheck: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#DADADB',
  },
});

export default CheckBox;
