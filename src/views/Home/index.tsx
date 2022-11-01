import {View, Text, Platform, NativeModules} from 'react-native';
import React, {useEffect, useState} from 'react';
import useAppContext from '~/hooks/useAppContext';
import Todo from './Todo';
import Welcome from './Welcome';
import {Notifications} from 'react-native-notifications';
import Database from '~/utils/database';
import {setLan, setTasks, setUser} from '~/context/actions';
import {IUser} from '~/interfaces';
import i18n from '~/i18n';
import SplashScreen from 'react-native-splash-screen';
import {getLocale} from '~/utils/getLocale';

const Home = () => {
  const {state, dispatch} = useAppContext();
  const [data, setData] = useState(state.user.name);
  useEffect(() => {
    if (state.user.name === '') {
      setData('');
    }
  }, [state.user.name]);
  useEffect(() => {
    (async () => {
      let locale = getLocale();
      const data = await Database._retriveData('user');
      const tasks = await Database._retriveData('tasks');
      const lan =
        (await Database._retriveData('lan')) ||
        (locale === 'en_US' && 'en') ||
        (locale === 'vi_VN' && 'vi') ||
        'en';
      if (tasks) {
        dispatch(setTasks(JSON.parse(tasks)));
      }
      if (data) {
        setData(data);
        dispatch(setUser(JSON.parse(data) as IUser));
      }
      if (lan) {
        dispatch(setLan(lan));
        i18n.changeLanguage(lan);
      }
      SplashScreen.hide();
    })();
  }, []);
  return <>{state.user.name || data ? <Todo /> : <Welcome />}</>;
};

export default Home;
