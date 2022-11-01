import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import CheckBox from '../CheckBox';
import {Task as ITask} from '~/interfaces';
import useAppContext from '~/hooks/useAppContext';
import {setDone, setNoDone} from '~/context/actions';

const Task: React.FC<
  ITask & {
    handleTaskPress?: (_id: string) => void;
  }
> = ({title, description, start, end, isDone, _id, handleTaskPress}) => {
  const {state, dispatch} = useAppContext();
  const handleSetDone = () => {
    if (isDone) {
      dispatch(setNoDone(_id));
    } else {
      dispatch(setDone(_id));
    }
  };
  return (
    <TouchableOpacity
      disabled={
        (description && description.length > 0) || handleTaskPress === undefined
          ? true
          : false
      }
      style={style.container}
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
              }}>
              {start.time}
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
              }}>
              {end.time}
            </Text>
          </View>
        </View>
        <CheckBox value={isDone} onValueChange={handleSetDone} />
      </View>
      <View
        style={{
          marginVertical: 10,
        }}>
        <Text numberOfLines={2}>{description}</Text>
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
