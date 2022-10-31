import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import useAppContext from '~/hooks/useAppContext';
import Task from '~/components/Task';
import {useTranslation} from 'react-i18next';

export default function Completed() {
  const {t} = useTranslation();
  const {state, dispatch} = useAppContext();
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
        {state.taskCompleted.map((task, i) => (
          <Task key={i} {...task} />
        ))}
      </ScrollView>
    </View>
  );
}
