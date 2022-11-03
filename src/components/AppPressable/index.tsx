import {View, Text, Pressable} from 'react-native';
import React from 'react';
import {CommonStyles} from '~/styles';
import useAppContext from '~/hooks/useAppContext';
import {dracula, snazzyLight} from '~/constants/color';
import {Icon} from 'react-native-vector-icons/Icon';
type Props = {
  onPress: () => void;
  children?: React.ReactNode;
  title: string;
  icon: React.ReactNode;
};
const AppPressable = ({onPress, children, title, icon}: Props) => {
  const {
    state: {
      systemSetting: {colorScheme},
    },
  } = useAppContext();
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [
        CommonStyles.settingButton,
        {
          borderColor:
            colorScheme === 'dark' ? dracula.whiteGray : snazzyLight.white,
        },
        {
          backgroundColor: pressed
            ? colorScheme === 'dark'
              ? snazzyLight.cyan
              : dracula.cyan
            : colorScheme === 'dark'
            ? dracula.whiteGray
            : snazzyLight.white,
        },
      ]}>
      {icon}
      <Text
        style={[
          CommonStyles.settingTitle,
          {
            color:
              colorScheme === 'dark'
                ? dracula.foreground
                : snazzyLight.foreground,
          },
        ]}>
        {title}
      </Text>
      {children}
    </Pressable>
  );
};

export default AppPressable;
