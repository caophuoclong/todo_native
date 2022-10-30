import {View, Text, Pressable} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Database from '~/utils/database';
import {StackNavigationProp} from '@react-navigation/stack';
import {NavigationParamsList} from '../../interfaces/index';
import useAppContext from '~/hooks/useAppContext';
import {setEmptyTasks} from '~/context';
type Props = {
  navigation: StackNavigationProp<NavigationParamsList, 'Setting'>;
};
export default function Setting({navigation}: Props) {
  const {state, dispatch} = useAppContext();
  const clearData = async () => {
    await Database._clearData();
    dispatch(setEmptyTasks());
    navigation.navigate('Home');
  };
  return (
    <View
      style={{
        flex: 1,
      }}>
      <Pressable
        onPress={clearData}
        style={({pressed}) => [
          {
            backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'white',
          },
          {
            padding: 10,
            flex: 0,
            flexDirection: 'row',
            alignItems: 'center',
            borderColor: 'red',
            borderLeftWidth: 0,
            borderRightWidth: 0,
            borderWidth: 1,
          },
        ]}>
        <Icon name="clear" size={24} />
        <Text>Clear data</Text>
      </Pressable>
    </View>
  );
}
