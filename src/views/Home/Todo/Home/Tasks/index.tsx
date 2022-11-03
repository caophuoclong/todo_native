import {View, Text, ScrollView} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import Task from '~/components/Task';
import useAppContext from '~/hooks/useAppContext';
import BottomSheet from '~/components/BottomSheet';
import {BottomSheetPropsRef} from '../../../../../components/BottomSheet/index';
import {Task as TaskType} from '~/interfaces';
import DetailTask from '~/components/DetailTask';
import {useTranslation} from 'react-i18next';
import {TouchableOpacity} from 'react-native-gesture-handler';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {deleteTask, setDone, setSortType} from '~/context/actions';
import BackgroundTimer from 'react-native-background-timer';
import moment from 'moment';
import notifee, {EventType} from '@notifee/react-native';
import {checkExpired} from '~/utils/checkExpired';
import {TitleFilter} from '../index';
import {convertToDateTime} from '~/utils/convertToDateTime';
import {useNavigation} from '@react-navigation/native';
import {NavigationParamsList} from '../../../../../interfaces/index';
import {StackNavigationProp} from '@react-navigation/stack';
import {dracula, snazzyLight} from '../../../../../constants/color';
type Props = {
  handleSetFilterSelected: (filtered: TitleFilter) => void;
};
export default function Tasks({handleSetFilterSelected}: Props) {
  const {t} = useTranslation();
  const {state, dispatch} = useAppContext();
  const {
    systemSetting: {colorScheme},
  } = state;
  const {tasksFiltered} = state;
  const navigation = useNavigation<StackNavigationProp<NavigationParamsList>>();
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
        new Date(
          `${moment(b.start.date).format('DD-MM-YYYY')} ${moment(
            b.start.time,
          ).format('HH:mm')}`,
        ).getTime() -
        new Date(
          `${moment(a.start.date).format('DD-MM-YYYY')} ${moment(
            a.start.time,
          ).format('HH:mm')}`,
        ).getTime()
      );
    } else {
      return (
        new Date(
          `${moment(a.start.date).format('DD-MM-YYYY')} ${moment(
            a.start.time,
          ).format('HH:mm')}`,
        ).getTime() -
        new Date(
          `${moment(b.start.date).format('DD-MM-YYYY')} ${moment(
            b.start.time,
          ).format('HH:mm')}`,
        ).getTime()
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
  const handleSetDone = (_id: string, isDone: boolean) => {
    dispatch(setDone(_id, isDone));
  };
  useEffect(() => {
    notifee.onForegroundEvent(({type, detail}) => {
      if (
        type === EventType.ACTION_PRESS &&
        detail.pressAction?.id.includes('viewTask')
      ) {
        const taskId = detail.pressAction?.id.split('_')[1];
        if (taskId) {
          const task = state.tasks.find(x => x._id === taskId);
          if (task) {
            console.log(task);
            const date = task.start.date;
            const time = task.start.time;
            if (date && time) {
              const dateTime = convertToDateTime(date, time);
              if (checkExpired(dateTime.getTime())) {
                handleSetFilterSelected('expired');
              } else if (moment(dateTime).isSame(new Date(), 'day')) {
                handleSetFilterSelected('myDay');
              } else {
                handleSetFilterSelected('all');
              }
            }
            handleTaskPress(taskId);
            navigation.navigate('Home');
          } else {
            return;
          }
        }
      }
      // id include makeDone
      if (
        type === EventType.ACTION_PRESS &&
        detail.pressAction?.id.includes('makeDone')
      ) {
        const taskId = detail.pressAction?.id.split('_')[1];
        handleSetDone(taskId, true);
      }
    });
    notifee.onBackgroundEvent(async ({type, detail}) => {
      console.log('typeeee', type);
      console.log('detailll', detail);
    });
  }, [state.tasks]);

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
              color:
                colorScheme === 'dark'
                  ? dracula.foreground
                  : snazzyLight.foreground,
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
            <Task
              key={i}
              {...task}
              handleTaskPress={handleTaskPress}
              handleSetDone={handleSetDone}
            />
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
