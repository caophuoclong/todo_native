import {View, Text, Pressable} from 'react-native';
import React from 'react';
import useAppContext from '~/hooks/useAppContext';
import Database from '~/utils/database';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {clearData as clearStoreData} from '~/context/actions';
import {CommonStyles} from '~/styles';
import {useTranslation} from 'react-i18next';
import AppPressable from '~/components/AppPressable';
const ClearData = ({navigation}: {navigation: any}) => {
  const {state, dispatch} = useAppContext();
  const {t} = useTranslation();
  const clearData = async () => {
    await Database._clearData();
    dispatch(clearStoreData());
    navigation.navigate('Home');
  };
  return (
    <AppPressable
      onPress={clearData}
      title={t('ClearData')}
      icon={<Icon name="clear" size={24} color="#E0144C" />}></AppPressable>
  );
};

export default ClearData;
