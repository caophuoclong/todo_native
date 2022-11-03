import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  Alert,
  Modal,
  Pressable,
  Image,
} from 'react-native';
import React from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {IUser, NavigationParamsList} from '~/interfaces';
import Notify from '~/components/Notify';
import {CommonStyles} from '../../../styles/index';
import {useEffect} from 'react';
import Database from '~/utils/database';
import useAppContext from '~/hooks/useAppContext';
import {setUser} from '~/context/actions';
import {useTranslation} from 'react-i18next';
import {initialLevelNotify} from '../../../context/index';
import {dracula, snazzyLight} from '~/constants/color';
import AppModal from '~/components/AppModal';
type Props = {
  navigation: StackNavigationProp<NavigationParamsList, 'Home'>;
};

export default function Welcome() {
  const [name, setName] = React.useState('');
  const {state, dispatch} = useAppContext();
  const [modalVisible, setModalVisible] = React.useState(false);
  const {t} = useTranslation();
  const {
    systemSetting: {colorScheme},
  } = state;
  const handleSubmit = async () => {
    console.log(name);
    if (name.length > 0) {
      const user: IUser = {
        name: name,
        level: initialLevelNotify,
      };
      await Database._storeData('user', JSON.stringify(user));
      dispatch(setUser(user));
    } else {
      setModalVisible(true);
    }
  };
  return (
    <View
      style={[
        style.container,
        {
          backgroundColor:
            colorScheme === 'dark'
              ? dracula.background
              : snazzyLight.background,
        },
      ]}>
      <Image
        style={{
          marginBottom: 50,
        }}
        source={require('../../../assets/images/test1.png')}
      />
      <Text
        style={[
          style.title,
          {
            color:
              colorScheme === 'dark'
                ? dracula.foreground
                : snazzyLight.foreground,
          },
        ]}>
        {t('WelcomeTo')} Todo
      </Text>
      <Text
        style={[
          style.subTitle,
          {
            color:
              colorScheme === 'dark'
                ? dracula.foreground
                : snazzyLight.foreground,
          },
        ]}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet.
      </Text>
      <TextInput
        style={[
          {
            width: '70%',
            textAlign: 'center',
            borderRadius: 10,
            padding: 10,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.01,
            shadowRadius: 2.22,
            elevation: 2,
            marginVertical: 10,
          },
          {
            color:
              colorScheme === 'dark'
                ? dracula.foreground
                : snazzyLight.foreground,
          },
          {
            backgroundColor:
              colorScheme === 'dark' ? dracula.white : snazzyLight.white,
          },
        ]}
        placeholderTextColor={
          colorScheme === 'dark' ? dracula.placeHolder : snazzyLight.placeHolder
        }
        value={name}
        onChangeText={text => setName(text)}
        onKeyPress={async e => {
          if (e.nativeEvent.key === 'Enter') {
            handleSubmit();
          }
        }}
        placeholder={t('EnterYourName')}
      />
      <Pressable
        style={[
          style.button,
          {
            backgroundColor:
              colorScheme === 'dark' ? snazzyLight.orange : dracula.orange,
          },
        ]}
        onPress={handleSubmit}>
        <Text
          style={{
            fontSize: 30,
            color:
              colorScheme === 'dark'
                ? dracula.foreground
                : snazzyLight.foreground,
          }}>
          {t('GetStarted')}
        </Text>
      </Pressable>
      <AppModal
        isVisible={modalVisible}
        title={t('Error')}
        onClose={() => setModalVisible(false)}>
        <Text>{t('PleaseEnterYourName')}</Text>
      </AppModal>
    </View>
  );
}
const style = StyleSheet.create({
  centerView: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    marginTop: 22,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    margin: 5,
    marginTop: 50,
  },
  subTitle: {
    fontSize: 13,
    fontWeight: '500',
    margin: 5,
    width: '50%',
    textAlign: 'center',
  },
  container: {
    flex: 1,
    paddingTop: 100,
    alignItems: 'center',
    gap: 10,
  },
  button: {
    backgroundColor: '#FAA885',
    padding: 10,
    paddingVertical: 20,
    borderRadius: 10,
    width: '70%',
    alignItems: 'center',
    marginTop: 90,
  },
});
