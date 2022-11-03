import {
  View,
  Text,
  Platform,
  NativeModules,
  Appearance,
  StatusBar,
  useColorScheme,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import useAppContext from '~/hooks/useAppContext';
import Todo from './Todo';
import Welcome from './Welcome';
import Database from '~/utils/database';
import {
  setColorScheme,
  setLan,
  setTasks,
  setUser,
  setSystemSetting,
} from '~/context/actions';
import i18n from '~/i18n';
import SplashScreen from 'react-native-splash-screen';
import {getLocale} from '~/utils/getLocale';
import {dracula, snazzyLight} from '../../constants/color';

const Home = () => {
  const {state, dispatch} = useAppContext();
  const {systemSetting} = state;
  const {baseOnSystem, colorScheme} = systemSetting;

  const [data, setData] = useState(state.user.name);
  useEffect(() => {
    if (state.user.name === '') {
      setData('');
    }
  }, [state.user.name]);
  useEffect(() => {
    (async () => {
      let locale = getLocale();
      try {
        const data = await Database._retriveData('user');
        const tasks = await Database._retriveData('tasks');
        const systemSetting = await Database._retriveData('systemSetting');
        const lan =
          (await Database._retriveData('lan')) ||
          (locale === 'en_US' && 'en') ||
          (locale === 'vi_VN' && 'vi') ||
          'vi';
        if (tasks) {
          dispatch(setTasks(JSON.parse(tasks)));
        }
        if (data) {
          dispatch(setUser(JSON.parse(data)));
        }
        if (systemSetting) {
          console.log('systemSetting', systemSetting);
          dispatch(setSystemSetting(JSON.parse(systemSetting)));
        }
        if (lan) {
          dispatch(setLan(lan));
          i18n.changeLanguage(lan);
        }
      } catch (e) {
        console.log(e);
      }
      SplashScreen.hide();
    })();
  }, []);
  const colo = useColorScheme();
  useEffect(() => {
    if (baseOnSystem) {
      dispatch(setColorScheme(colo));
    }
  }, [baseOnSystem, colo]);

  return (
    <>
      <StatusBar
        barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={
          colorScheme === 'dark' ? dracula.background : snazzyLight.background
        }
      />
      {state.user.name ? <Todo /> : <Welcome />}
    </>
  );
};

export default Home;
