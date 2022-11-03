import {View, Text, Pressable} from 'react-native';
import React, {useEffect} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {NavigationParamsList} from '../../interfaces/index';
import ClearData from '~/components/Settings/ClearData';
import ChangeLanguge from '~/components/Settings/ChangeLanguage';
import SetTimeToNotify from '~/components/Settings/SetTimeNotify';
import ToggleDarkMode from '~/components/Settings/ToggleDarkMode';
import useAppContext from '../../hooks/useAppContext';
import {dracula, snazzyLight} from '../../constants/color';

type Props = {
  navigation: StackNavigationProp<NavigationParamsList, 'Setting'>;
};
export default function Setting({navigation}: Props) {
  const {
    state: {
      systemSetting: {colorScheme},
    },
  } = useAppContext();
  useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor:
          colorScheme === 'dark' ? dracula.whiteGray : snazzyLight.background,
      },
      headerTintColor:
        colorScheme === 'dark' ? dracula.foreground : snazzyLight.foreground,
    });
  }, [colorScheme]);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor:
          colorScheme === 'dark' ? dracula.background : snazzyLight.background,
        paddingVertical: 20,
      }}>
      <SetTimeToNotify />
      <ToggleDarkMode />
      <ChangeLanguge />
      <ClearData navigation={navigation} />
    </View>
  );
}
