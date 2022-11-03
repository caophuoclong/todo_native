import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  Easing,
  ScrollView,
  TextInput,
  Keyboard,
} from 'react-native';
import AntIcon from 'react-native-vector-icons/AntDesign';
import React, {useEffect, useRef, useState} from 'react';
import {CommonStyles} from '~/styles';
import Icon from 'react-native-vector-icons/Ionicons';
import {useTranslation} from 'react-i18next';
import AppModal from '~/components/AppModal';
import {taskType} from '~/views/Home/Todo/Home/CreateTask';
import {TaskType} from '~/interfaces';
import useAppContext from '~/hooks/useAppContext';
import {numberToOrd} from '../../../utils/numberToOrd';
import {updateLevel} from '~/context/actions';
import AppPressable from '~/components/AppPressable';
import {dracula, snazzyLight} from '../../../constants/color';
const SetTimeToNotify = () => {
  const {state, dispatch} = useAppContext();
  const {t} = useTranslation();
  const {
    systemSetting: {colorScheme},
  } = state;
  const [showModal, setShowModal] = useState(false);
  const [rotate, setRotate] = useState<Animated.Value[]>([]);
  const [showHide, setShowHide] = useState<Animated.Value[]>([]);
  const [spin, setSpin] = useState<
    Array<Animated.AnimatedInterpolation<string | number>>
  >([]);
  const [maxHeight, setmaxHeight] = useState<
    Array<Animated.AnimatedInterpolation<string | number>>
  >([]);
  const [typePressed, setTypePressed] = useState<{
    [key in TaskType['title']]: boolean;
  }>({
    important: false,
    normal: false,
    unimportant: false,
  });
  const onPress = () => {
    setShowModal(true);
  };
  useEffect(() => {
    const arrayAnimatedValues: Animated.Value[] | null = [];
    const xxx: Animated.Value[] = [];
    taskType.forEach((item, index) => {
      arrayAnimatedValues.push(new Animated.Value(index));
      xxx.push(new Animated.Value(index));
    });
    setRotate(arrayAnimatedValues);
    setShowHide(xxx);
  }, []);
  useEffect(() => {
    if (rotate && rotate.length > 0) {
      const spin = rotate.map((item, index) => {
        Animated.timing(rotate[index], {
          toValue: 0,
          duration: 500,
          easing: Easing.linear,
          useNativeDriver: true,
        }).start();
        return item.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '90deg'],
        });
      });
      setSpin(spin);
    }
  }, [rotate]);
  useEffect(() => {
    if (showHide && showHide.length > 0) {
      const maxheight = showHide.map((item, index) => {
        Animated.timing(showHide[index], {
          toValue: 0,
          duration: 500,
          easing: Easing.linear,
          useNativeDriver: false,
        }).start();
        return item.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 200],
        });
      });
      setmaxHeight(maxheight);
    }
  }, [showHide]);
  const onTypePress = (type: TaskType) => {
    const index = taskType.findIndex(x => x.title === type.title);
    if (typePressed[type.title]) {
      if (rotate[index]) {
        Animated.timing(rotate[index], {
          toValue: 0,
          duration: 500,
          easing: Easing.linear,
          useNativeDriver: true,
        }).start();
      }
      {
        Animated.timing(showHide[index], {
          toValue: 0,
          duration: 500,
          easing: Easing.linear,
          useNativeDriver: false,
        }).start();
      }
    } else {
      if (rotate[index]) {
        Animated.timing(rotate[index], {
          toValue: 1,
          duration: 500,
          easing: Easing.linear,
          useNativeDriver: true,
        }).start();
        Animated.timing(showHide[index], {
          toValue: 1,
          duration: 500,
          easing: Easing.linear,
          useNativeDriver: false,
        }).start();
      }
    }
    setTypePressed({
      ...typePressed,
      [type.title]: !typePressed[type.title],
    });
  };
  const onChangeInput = (value: string, type: TaskType, index: number) => {
    dispatch(
      updateLevel({
        value: parseInt(value) || 0,
        type: type,
        index: index,
      }),
    );
  };

  return (
    <AppPressable
      onPress={onPress}
      title={t('SetTimeToNotify')}
      icon={<Icon name="timer" size={24} color="#FF5858" />}>
      <AppModal
        isVisible={showModal}
        onClose={() => {
          Keyboard.dismiss();
          setShowModal(false);
        }}
        title={t('SetTimeToNotify')}>
        {taskType.map((type, index) => (
          <View key={index}>
            <TouchableOpacity
              style={styles.container}
              onPress={() => {
                onTypePress(type);
              }}>
              <Animated.View
                style={{
                  transform: [
                    {
                      rotate: spin[index],
                    },
                  ],
                }}>
                <AntIcon
                  name="caretright"
                  size={16}
                  color={
                    colorScheme === 'dark'
                      ? dracula.foreground
                      : snazzyLight.foreground
                  }
                />
              </Animated.View>
              <Text
                style={{
                  fontSize: 16,
                  color:
                    colorScheme === 'dark'
                      ? dracula.foreground
                      : snazzyLight.foreground,
                }}>
                {t(type.name)}
              </Text>
            </TouchableOpacity>
            {
              <Animated.View
                style={{
                  maxHeight: maxHeight[index],
                }}>
                <ScrollView
                  style={{
                    backgroundColor:
                      colorScheme === 'dark'
                        ? dracula.white
                        : snazzyLight.white,
                  }}>
                  {state.user.level[type.title].map((item, index) =>
                    index === state.user.level[type.title].length - 1 ? null : (
                      <View
                        key={index}
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginVertical: 0,
                        }}>
                        <Text
                          style={{
                            fontSize: 16,
                            color:
                              colorScheme === 'dark'
                                ? dracula.foreground
                                : snazzyLight.foreground,
                          }}>
                          {state.systemSetting.lan === 'vi'
                            ? `Lần ${index + 1}`
                            : numberToOrd(index + 1)}
                        </Text>
                        <TextInput
                          editable={
                            !(index + 1 === state.user.level[type.title].length)
                          }
                          keyboardType="numeric"
                          onChangeText={value => {
                            onChangeInput(value, type, index);
                          }}
                          // editable={!!item}
                          style={{
                            fontSize: 16,
                            textAlign: 'right',
                          }}
                          value={item < 10 ? `0${item}` : item.toString()}
                        />
                        <Text
                          style={{
                            fontSize: 16,
                          }}>
                          {t('Minutes')}
                        </Text>
                      </View>
                    ),
                  )}
                </ScrollView>
              </Animated.View>
            }
          </View>
        ))}
      </AppModal>
    </AppPressable>
  );
};

export default SetTimeToNotify;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 5,
    alignItems: 'center',
  },
});
