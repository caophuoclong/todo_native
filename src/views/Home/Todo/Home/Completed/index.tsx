import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import useAppContext from '~/hooks/useAppContext';
import Task from '~/components/Task';
import {useTranslation} from 'react-i18next';
import moment from 'moment';

export default function Completed() {
  const {t} = useTranslation();
  const {state, dispatch} = useAppContext();
  const {taskCompleted} = state;
  taskCompleted.sort(
    (a, b) =>
      new Date(
        `${moment(b.start.date).format('DD-MM-YYYY')} ${b.start.time}`,
      ).getTime() -
      new Date(
        `${moment(a.start.date).format('DD-MM-YYYY')} ${a.start.time}`,
      ).getTime(),
  );
  return (
    <View style={{flex: 2, marginVertical: 10, paddingHorizontal: 10}}>
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
          <Task key={i} {...task} />
        ))}
      </ScrollView>
    </View>
  );
}
