import {View, Text, Pressable} from 'react-native';
import React from 'react';
import useAppContext from '~/hooks/useAppContext';
import Database from '~/utils/database';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {clearData as clearStoreData} from '~/context/actions';
import {CommonStyles} from '~/styles';
import {useTranslation} from 'react-i18next';
const ClearData = ({navigation}: {navigation: any}) => {
  const {state, dispatch} = useAppContext();
  const {t} = useTranslation();
  const clearData = async () => {
    await Database._clearData();
    dispatch(clearStoreData());
    navigation.navigate('Home');
  };
  return (
    <Pressable
      onPress={clearData}
      style={({pressed}) => [
        {
          backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'white',
        },
        CommonStyles.settingButton,
      ]}>
      <Icon name="clear" size={24} color="black" />
      <Text style={CommonStyles.settingTitle}>{t('ClearData')}</Text>
    </Pressable>
  );
};

export default ClearData;
