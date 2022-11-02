import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import useAppContext from '~/hooks/useAppContext';
import Task from '~/components/Task';
import {useTranslation} from 'react-i18next';
import moment from 'moment';
import {convertToDateTime} from '~/utils/convertToDateTime';
import {setDone} from '~/context/actions';

export default function Completed() {
  const {t} = useTranslation();
  const {state, dispatch} = useAppContext();
  const {taskCompleted} = state;
  taskCompleted.sort((a, b) => {
    if (a.start.date && b.start.date && a.start.time && b.start.time) {
      return (
        convertToDateTime(b.start.date, b.start.time).getTime() -
        convertToDateTime(a.start.date, a.start.time).getTime()
      );
    }
    return 1;
  });
  const handleSetDone = (_id: string, isDone: boolean) => {
    dispatch(setDone(_id, isDone));
  };
  return (
    <View
      style={{
        flex: 2,
        marginTop: 30,
        paddingHorizontal: 10,
      }}>
      <Text
        style={{
          fontSize: 16,
          fontWeight: 'bold',
          color: '#221B3D',
        }}>
        {t('Completed')}
      </Text>
      <ScrollView>
        {taskCompleted.map((task, i) => (
          <Task key={i} {...task} handleSetDone={handleSetDone} />
        ))}
      </ScrollView>
    </View>
  );
}
