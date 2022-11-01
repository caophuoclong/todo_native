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
