import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  Pressable,
  Alert,
  TextInput,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {NavigationParamsList} from '../../interfaces/index';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Database from '~/utils/database';
import {RNCamera} from 'react-native-camera';
import Icon from 'react-native-vector-icons/Feather';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import Home from './Home';
import Setting from './Setting';
import AntIcon from 'react-native-vector-icons/AntDesign';
import MyTab from '~/components/MyTab';
import BottomSheet, {SCREEN_HEIGHT} from '~/components/BottomSheet';
import {BottomSheetPropsRef} from '../../components/BottomSheet/index';

const Tab = createBottomTabNavigator();
export default function Todo({
  route,
  navigation,
}: NativeStackScreenProps<NavigationParamsList, 'Todo'>) {
  const ref = useRef<BottomSheetPropsRef>(null);
  const handlePress = () => {
    const isActive = ref.current?.isActive();
    if (isActive) {
      ref.current?.scrollTo(0);
    } else {
      ref.current?.scrollTo(-SCREEN_HEIGHT / 1.3);
    }
  };
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={props => <MyTab {...props} setShowBottomSheet={handlePress} />}>
      <Tab.Screen
        options={{
          tabBarShowLabel: false,
        }}
        name="Home"
        children={props => <Home {...props} ref={ref} />}
      />
    </Tab.Navigator>
  );
}
const style = StyleSheet.create({
  container1: {
    // flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    // marginTop: 22,
    paddingVertical: 20,
    backgroundColor: '#CF7751',
    height: '30%',
  },
  title: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
});
