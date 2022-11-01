/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, type PropsWithChildren} from 'react';
import {
  Alert,
  NativeModules,
  PermissionsAndroid,
  Platform,
  StatusBar,
  useColorScheme,
} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import {IUser, NavigationParamsList} from './src/interfaces/index';
import Splash from '~/views/Splash';
import Setting from '~/views/Setting';
import {ContextProvider} from '~/context';
import Home from '~/views/Home';
import i18n from '~/i18n';
import Database from '~/utils/database';
import {useTranslation} from 'react-i18next';
import SplashScreen from 'react-native-splash-screen';
import {setLan, setTasks, setUser} from '~/context/actions';
import useAppContext from '~/hooks/useAppContext';
import {
  Notification,
  NotificationCompletion,
  Notifications,
  Registered,
  RegistrationError,
} from 'react-native-notifications';

const Stack = createNativeStackNavigator<NavigationParamsList>();

const App = () => {
  const {state, dispatch} = useAppContext();
  const {t} = useTranslation();
  const isDarkMode = useColorScheme() === 'dark';
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
      }
    });
  }, []);
  useEffect(() => {
    Notifications.registerRemoteNotifications();
    Notifications.events().registerRemoteNotificationsRegistered(
      (event: Registered) => {
        // TODO: Send the token to my server so it could send back push notifications...
        console.log('Device Token Received', event.deviceToken);
      },
    );
    Notifications.events().registerRemoteNotificationsRegistrationFailed(
      (event: RegistrationError) => {
        console.error(event);
      },
    );
    Notifications.events().registerNotificationReceivedForeground(
      (
        notification: Notification,
        completion: (response: NotificationCompletion) => void,
      ) => {
        // Prints the notification payload
        console.log(JSON.stringify(notification.payload));

        completion({alert: false, sound: false, badge: false});
      },
    );
  }, []);
  return (
    <ContextProvider>
      <GestureHandlerRootView style={{flex: 1}}>
        <StatusBar barStyle={'dark-content'} backgroundColor="#fff" />
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen
              name="Setting"
              component={Setting}
              options={{
                headerShown: true,
                title: t('Setting'),
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </GestureHandlerRootView>
    </ContextProvider>
  );
};

export default App;
