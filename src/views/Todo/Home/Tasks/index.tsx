import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import Task from '~/components/Task';
import useAppContext from '~/hooks/useAppContext';

export default function Tasks() {
  const {state, dispatch} = useAppContext();
  const {tasksFiltered} = state;
  return (
    <View
      style={[
        tasksFiltered.length > 0 ? {flex: 5} : {flex: 0},
        {
          paddingHorizontal: 10,
        },
      ]}>
      <Text
        style={{
          fontSize: 16,
          fontWeight: 'bold',
          color: '#221B3D',
        }}>
        Tasks
      </Text>
      <ScrollView>
        {tasksFiltered.map((task, i) => (
          <Task key={i} {...task} />
        ))}
      </ScrollView>
    </View>
  );
}
