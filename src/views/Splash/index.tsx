import {
  View,
  Text,
  PermissionsAndroid,
  PermissionStatus,
  Button,
  Alert,
  Platform,
  NativeModules,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Database from '~/utils/database';
import {StackNavigationProp} from '@react-navigation/stack';
import {IUser, NavigationParamsList} from '~/interfaces';
import SplashScreen from 'react-native-splash-screen';
import useAppContext from '~/hooks/useAppContext';
import {setLan, setTasks, setUser} from '~/context/actions';
import i18n from '~/i18n';
type Props = {
  navigation: StackNavigationProp<NavigationParamsList, 'Splash'>;
};
// const requestPermission = async (): Promise<PermissionStatus> => {
//   const granted = await PermissionsAndroid.request(
//     PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
//   );
//   return granted;
// };
export default function Splash({navigation}: Props) {
  const [granted, setGranted] = useState<boolean>();
  const {state, dispatch} = useAppContext();
  const [data, setData] = useState();
  useEffect(() => {
    PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.CAMERA,
    ]).then(result => {
      if (
        result['android.permission.CAMERA'] &&
        result['android.permission.READ_EXTERNAL_STORAGE'] &&
        result['android.permission.WRITE_EXTERNAL_STORAGE'] === 'granted'
      ) {
        setGranted(true);
      } else if (
        result['android.permission.CAMERA'] ||
        result['android.permission.READ_EXTERNAL_STORAGE'] ||
        result['android.permission.WRITE_EXTERNAL_STORAGE'] ===
          'never_ask_again'
      ) {
        Alert.alert(
          'Please Go into Settings -> Applications -> APP_NAME -> Permissions and Allow permissions to continue',
        );
      } else {
        setGranted(false);
      }
    });
  }, []);
  useEffect(() => {
    (async () => {
      let locale;
      if (Platform.OS === 'android') {
        // get locale from device
        locale = NativeModules.I18nManager.localeIdentifier;
      } else {
        // get locale from device
        locale = NativeModules.SettingsManager.settings.AppleLocale;
      }
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
        dispatch(setUser(JSON.parse(data) as IUser));
      }
      if (lan) {
        dispatch(setLan(lan));
        i18n.changeLanguage(lan);
      }
      SplashScreen.hide();
    })();
  }, []);
  useEffect(() => {
    if (granted) {
      navigation.navigate('Home');
    }
  }, [granted]);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      }}>
      <Text
        style={{
          color: 'black',
        }}>
        Splash screen
        {!granted ? <Button title="Request permission" /> : null}
      </Text>
    </View>
  );
}
