import {View, Text, ScrollView} from 'react-native';
import React, {useCallback, useState} from 'react';
import Task from '~/components/Task';
import useAppContext from '~/hooks/useAppContext';
import BottomSheet from '~/components/BottomSheet';
import {BottomSheetPropsRef} from '../../../../../components/BottomSheet/index';
import {Task as TaskType} from '~/interfaces';
import DetailTask from '~/components/DetailTask';

export default function Tasks() {
  const {state, dispatch} = useAppContext();
  const {tasksFiltered} = state;
  const ref = React.useRef<BottomSheetPropsRef>(null);
  const [selectedTask, setSelectedTask] = useState<TaskType | null>(null);
  const handleTaskPress = useCallback(
    (_id: string) => {
      const tasks = state.tasks.filter(task => task._id === _id)[0];
      const isActive = ref.current?.isActive();
      if (!isActive) {
        ref.current?.scrollTo(-500);
        setSelectedTask(tasks);
      } else {
        if (_id === selectedTask?._id) {
          ref.current?.scrollTo(0);
          setSelectedTask(null);
        } else {
          setSelectedTask(tasks);
        }
      }
    },
    [state.tasks, selectedTask],
  );
  return (
    <View style={[tasksFiltered.length > 0 ? {flex: 5} : {flex: 0}]}>
      <View
        style={{
          paddingHorizontal: 10,
          flex: 1,
        }}>
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
            <Task key={i} {...task} handleTaskPress={handleTaskPress} />
          ))}
        </ScrollView>
      </View>

      <BottomSheet
        maxHeight={-700}
        ref={ref}
        children={<DetailTask task={selectedTask!} />}
      />
    </View>
  );
}
