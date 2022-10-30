import {
  View,
  Text,
  PermissionsAndroid,
  PermissionStatus,
  Button,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Database from '~/utils/database';
import {StackNavigationProp} from '@react-navigation/stack';
import {IUser, NavigationParamsList} from '~/interfaces';
import SplashScreen from 'react-native-splash-screen';
import {setTasks, setUser} from '~/context';
import useAppContext from '~/hooks/useAppContext';
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
      const data = await Database._retriveData('user');
      const tasks = await Database._retriveData('tasks');
      if (tasks) {
        dispatch(setTasks(JSON.parse(tasks)));
      }
      setData(data);
      console.log(data);
      SplashScreen.hide();
    })();
  }, []);
  useEffect(() => {
    if (granted) {
      if (data === undefined || data === 'undefined') {
        navigation.navigate('Home');
      } else {
        dispatch(setUser(JSON.parse(data) as IUser));
        navigation.navigate('Todo');
      }
    }
  }, [data, granted]);
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
