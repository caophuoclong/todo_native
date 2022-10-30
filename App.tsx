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
import {StatusBar, useColorScheme} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import {NavigationParamsList} from './src/interfaces/index';
import Splash from '~/views/Splash';
import Setting from '~/views/Setting';
import {ContextProvider} from '~/context';
import Home from '~/views/Home';

const Stack = createNativeStackNavigator<NavigationParamsList>();

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <ContextProvider>
      <GestureHandlerRootView style={{flex: 1}}>
        <StatusBar barStyle={'dark-content'} backgroundColor="#fff" />
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName={'Splash'}
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name="Splash" component={Splash} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen
              name="Setting"
              component={Setting}
              options={{
                headerShown: true,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </GestureHandlerRootView>
    </ContextProvider>
  );
};

export default App;
