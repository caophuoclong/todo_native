import {View, Text, Image, StyleSheet} from 'react-native';
import React from 'react';
import useAppContext from '~/hooks/useAppContext';
import {useTranslation} from 'react-i18next';
import {dracula, snazzyLight} from '../../../../../constants/color';

export default function Greeting() {
  const {t} = useTranslation();
  const {state, dispatch} = useAppContext();
  const {
    systemSetting: {colorScheme},
  } = state;
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 10,
        flex: 1,
      }}>
      <View>
        <Text
          style={{
            fontSize: 20,
            color:
              colorScheme === 'dark'
                ? dracula.foreground
                : snazzyLight.foreground,
          }}>
          {t('Hello')},
        </Text>
        <Text
          style={{
            fontSize: 36,
            fontWeight: 'bold',
            color:
              colorScheme === 'dark'
                ? dracula.foreground
                : snazzyLight.foreground,
          }}>
          {state.user.name}
        </Text>
      </View>
      <Image
        style={style.avatar}
        source={{
          uri: 'https://kynguyenlamdep.com/wp-content/uploads/2022/06/avatar-meo-de-thuong.jpg',
        }}
      />
    </View>
  );
}
const style = StyleSheet.create({
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 10,
  },
});
