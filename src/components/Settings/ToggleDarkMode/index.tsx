import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Switch,
  useColorScheme,
  ColorSchemeName,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {CommonStyles} from '~/styles';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AppModal from '~/components/AppModal';
import CheckBox from '~/components/CheckBox';
import {Appearance} from 'react-native';
import useAppContext from '~/hooks/useAppContext';
import {setColorScheme, setBaseOnSystem} from '~/context/actions';
import AppPressable from '~/components/AppPressable';
import {dracula, snazzyLight} from '~/constants/color';
const ToggleDarkMode = () => {
  const {state, dispatch} = useAppContext();

  const {t} = useTranslation();
  const [show, setShow] = useState(false);
  const {
    systemSetting: {colorScheme, baseOnSystem},
  } = state;
  //   const [theme, setTheme] = useState<ColorSchemeName>('light');
  const onClose = () => {
    setShow(false);
  };
  const onOpen = () => {
    setShow(true);
  };

  return (
    <AppPressable
      onPress={onOpen}
      title={t('Theme')}
      icon={<MaterialIcon name="theme-light-dark" size={24} color="#54B435" />}>
      <AppModal isVisible={show} onClose={onClose} title={t('Theme')}>
        <View style={styles.item}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon
              name="wb-sunny"
              size={24}
              color={
                colorScheme === 'dark'
                  ? dracula.foreground
                  : snazzyLight.foreground
              }
            />
            <Text
              style={{
                fontSize: 16,
                marginLeft: 5,
                color:
                  colorScheme === 'dark'
                    ? dracula.foreground
                    : snazzyLight.foreground,
              }}>
              {t('Light')}
            </Text>
          </View>
          <CheckBox
            onValueChange={value => {
              if (value) {
                dispatch(setColorScheme('light'));
                dispatch(setBaseOnSystem(false));
              }
            }}
            value={colorScheme === 'light'}
            size={20}
          />
        </View>
        <View style={styles.item}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon
              name="nightlight-round"
              size={24}
              color={
                colorScheme === 'dark'
                  ? dracula.foreground
                  : snazzyLight.foreground
              }
            />
            <Text
              style={{
                fontSize: 16,
                marginLeft: 5,
                color:
                  colorScheme === 'dark'
                    ? dracula.foreground
                    : snazzyLight.foreground,
              }}>
              {t('Dark')}
            </Text>
          </View>
          <CheckBox
            onValueChange={value => {
              if (value) {
                dispatch(setColorScheme('dark'));
                dispatch(setBaseOnSystem(false));
              }
            }}
            value={colorScheme === 'dark'}
            size={20}
          />
        </View>
        <View style={styles.item}>
          <View>
            <Text
              style={{
                fontSize: 16,
                color:
                  colorScheme === 'dark'
                    ? dracula.foreground
                    : snazzyLight.foreground,
              }}>
              {t('AutoChangeTheme')}
            </Text>
            <Text
              style={{
                fontSize: 12,
                color:
                  colorScheme === 'dark'
                    ? dracula.foreground
                    : snazzyLight.foreground,
              }}>
              {t('SubtitleAutoChangeThme')}
            </Text>
          </View>
          <Switch
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={
              state.systemSetting.baseOnSystem ? '#5A3DA4' : '#f4f3f4'
            }
            ios_backgroundColor="#3e3e3e"
            onValueChange={value => {
              dispatch(setBaseOnSystem(value));
            }}
            value={baseOnSystem}
          />
        </View>
      </AppModal>
    </AppPressable>
  );
};
const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
});
export default ToggleDarkMode;
