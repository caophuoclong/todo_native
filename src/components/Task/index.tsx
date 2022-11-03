import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import CheckBox from '../CheckBox';
import {Task as ITask} from '~/interfaces';
import useAppContext from '~/hooks/useAppContext';
import {setDone, setNoDone} from '~/context/actions';
import moment from 'moment';
import {dracula, snazzyLight} from '../../constants/color';

const Task: React.FC<
  ITask & {
    handleTaskPress?: (_id: string) => void;
    handleSetDone: (_id: string, isDone: boolean) => void;
  }
> = ({
  title,
  description,
  start,
  end,
  isDone,
  _id,
  handleTaskPress,
  handleSetDone,
}) => {
  const {state, dispatch} = useAppContext();
  const {
    systemSetting: {colorScheme},
  } = state;
  return (
    <TouchableOpacity
      disabled={handleTaskPress === undefined ? true : false}
      style={[
        style.container,
        {
          backgroundColor:
            colorScheme === 'dark' ? dracula.white : snazzyLight.white,
        },
      ]}
      onPress={() => {
        if (handleTaskPress) {
          handleTaskPress(_id);
        }
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View>
          <Text
            style={[
              style.title,
              isDone && {
                textDecorationLine: 'line-through',
                textDecorationStyle: 'solid',
              },
              {
                color:
                  colorScheme === 'dark'
                    ? dracula.foreground
                    : snazzyLight.foreground,
              },
            ]}>
            {title}
          </Text>
          <View style={style.time}>
            <MaterialIcon
              name="alarm"
              size={16}
              style={{
                marginRight: 2,
              }}
            />
            <Text
              style={{
                fontSize: 16,
                fontWeight: '500',
                color:
                  colorScheme === 'dark'
                    ? dracula.foreground
                    : snazzyLight.foreground,
              }}>
              {moment(start.time).format('HH:mm')}
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '500',
              }}>
              {' '}
              -{' '}
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '500',
                color:
                  colorScheme === 'dark'
                    ? dracula.foreground
                    : snazzyLight.foreground,
              }}>
              {moment(end.time).format('HH:mm')}
            </Text>
          </View>
        </View>
        <CheckBox
          value={isDone}
          onValueChange={() => {
            handleSetDone(_id, !isDone);
          }}
        />
      </View>
      <View
        style={{
          marginVertical: 10,
        }}>
        <Text
          numberOfLines={2}
          style={{
            color:
              colorScheme === 'dark'
                ? dracula.foreground
                : snazzyLight.foreground,
          }}>
          {description}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
export default Task;
const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F9FAFC',
    marginVertical: 10,
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#160C30',
  },
  desciption: {},
  time: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
