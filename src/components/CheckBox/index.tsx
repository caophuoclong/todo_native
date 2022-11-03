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
  size?: number;
}
const CheckBox: React.FC<Props> = ({value, onValueChange, size}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        onValueChange(!value);
      }}
      style={[
        style.container,
        value ? style.checked : style.uncheck,
        size
          ? {width: size, height: size}
          : {
              width: 30,
              height: 30,
            },
      ]}>
      {value && (
        <Icon name="check" size={size ? 0.5 * size : 20} color="#fff" />
      )}
    </TouchableOpacity>
  );
};
const style = StyleSheet.create({
  container: {
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
