import {View, Text, ScrollView} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import Task from '~/components/Task';
import useAppContext from '~/hooks/useAppContext';
import BottomSheet from '~/components/BottomSheet';
import {BottomSheetPropsRef} from '../../../../../components/BottomSheet/index';
import {Task as TaskType} from '~/interfaces';
import DetailTask from '~/components/DetailTask';
import {useTranslation} from 'react-i18next';
import {FormatDate} from '~/utils/formatDate';
import {TouchableOpacity} from 'react-native-gesture-handler';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {deleteTask, setSortType} from '~/context/actions';
import BackgroundTimer from 'react-native-background-timer';
export default function Tasks() {
  const {t} = useTranslation();
  const {state, dispatch} = useAppContext();
  const {tasksFiltered} = state;
  const onPressDelete = (_id: string) => {
    const task = tasksFiltered.find(x => x._id === _id);
    task?.backgroundId?.forEach(id => {
      BackgroundTimer.clearTimeout(id);
    });
    dispatch(deleteTask(_id));
    setTimeout(() => {
      ref.current?.scrollTo(0);
    });
  };
  tasksFiltered.sort((a, b) => {
    if (state.sortType === 'desc') {
      return (
        new Date(`${FormatDate(b.start.date)} ${b.start.time}`).getTime() -
        new Date(`${FormatDate(a.start.date)} ${a.start.time}`).getTime()
      );
    } else {
      return (
        new Date(`${FormatDate(a.start.date)} ${a.start.time}`).getTime() -
        new Date(`${FormatDate(b.start.date)} ${b.start.time}`).getTime()
      );
    }
  });
  const ref = React.useRef<BottomSheetPropsRef>(null);
  const [selectedTask, setSelectedTask] = useState<TaskType | null>(null);
  const handleTaskPress = useCallback(
    (_id: string) => {
      const tasks = state.tasks.filter(task => task._id === _id)[0];
      const isActive = ref.current?.isActive();
      if (!isActive) {
        ref.current?.scrollTo(-550);
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
  const handleChangeSort = () => {
    if (state.sortType === 'asc') {
      dispatch(setSortType('desc'));
    } else {
      dispatch(setSortType('asc'));
    }
  };

  return (
    <View style={[tasksFiltered.length > 0 ? {flex: 5} : {flex: 0}]}>
      <View
        style={{
          paddingHorizontal: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              color: '#221B3D',
            }}>
            {t('Tasks')}
          </Text>
          <TouchableOpacity onPress={handleChangeSort}>
            {state.sortType === 'desc' ? (
              <MaterialIcon
                name="sort-clock-descending"
                size={24}
                color="black"
              />
            ) : null}
            {state.sortType === 'asc' ? (
              <MaterialIcon
                name="sort-clock-ascending"
                size={24}
                color="black"
              />
            ) : null}
          </TouchableOpacity>
        </View>
        <ScrollView>
          {tasksFiltered.map((task, i) => (
            <Task key={i} {...task} handleTaskPress={handleTaskPress} />
          ))}
        </ScrollView>
      </View>
      <BottomSheet
        maxHeight={-700}
        ref={ref}
        children={
          <DetailTask task={selectedTask!} onDeleteTask={onPressDelete} />
        }
      />
    </View>
  );
}
