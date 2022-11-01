import {View, Text, Pressable} from 'react-native';
import React from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {NavigationParamsList} from '../../interfaces/index';
import ClearData from '~/components/Settings/ClearData';
import ChangeLanguge from '~/components/Settings/ChangeLanguage';
import SetTimeToNotify from '~/components/Settings/SetTimeNotify';

type Props = {
  navigation: StackNavigationProp<NavigationParamsList, 'Setting'>;
};
export default function Setting({navigation}: Props) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#e5e5e5',
        paddingVertical: 20,
      }}>
      <SetTimeToNotify />
      <ChangeLanguge />
      <ClearData navigation={navigation} />
    </View>
  );
}
