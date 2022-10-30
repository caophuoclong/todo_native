import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Pressable,
  Switch,
  Image,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';

import {BottomSheetPropsRef} from '../../../../components/BottomSheet/index';
import Tasks from './Tasks';
import Completed from './Completed';
import Greeting from './Greeting';
import {TouchableOpacity} from 'react-native';
import CreateTask from './CreateTask';
import useAppContext from '~/hooks/useAppContext';
import {setTaskCompleted, setTaskFilter} from '~/context';
import moment from 'moment';
import {Task} from '~/interfaces';
import Database from '~/utils/database';
interface Props {
  // showBottomSheet: boolean;
  // setShowBottomSheet: () => void;
  children?: React.ReactNode;
  navigation: any;
}
type TitleFilter = 'myDay' | 'important' | 'planned' | 'all';
const Home = React.forwardRef<BottomSheetPropsRef, Props>(
  ({navigation}, ref) => {
    const [filterSelected, setFilterSelected] = useState<TitleFilter>('myDay');
    const {state, dispatch} = useAppContext();
    const [tasksFiltered, setTasksFiltered] = useState<Array<Task>>([]);
    const [filter, setFilter] = useState<
      Array<{
        title: TitleFilter;
        description: string;
      }>
    >([
      {
        title: 'myDay',
        description: 'My Day',
      },
      {
        title: 'important',
        description: 'Important',
      },

      {
        title: 'all',
        description: 'All',
      },
    ]);
    useEffect(() => {
      const filterSelectedIndex = filter.findIndex(
        item => item.title === filterSelected,
      );
      const newFilter = [...filter];
      newFilter[0] = filter[filterSelectedIndex];
      newFilter[filterSelectedIndex] = filter[0];
      setFilter(newFilter);
    }, [filterSelected]);
    useEffect(() => {
      const {tasks} = state;
      const today = new Date();
      if (filterSelected === 'myDay') {
        const tasksFiltered = tasks.filter(task => {
          const {start} = task;
          const {date} = start;
          return moment(date, 'MM/DD/YYYY').isSame(today, 'day');
        });
        setTasksFiltered(tasksFiltered);
      } else {
        setTasksFiltered(tasks);
      }
    }, [filterSelected, state.tasks]);
    useEffect(() => {
      // get done task
      const tasksDone = tasksFiltered.filter(task => task.isDone);
      // get undone task
      const tasksUndone = tasksFiltered.filter(task => !task.isDone);
      dispatch(setTaskFilter(tasksUndone));
      dispatch(setTaskCompleted(tasksDone));
    }, [tasksFiltered]);
    return (
      <View style={{backgroundColor: '#fff', flex: 1}}>
        <Greeting />
        <View style={{flex: 0.85}}>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              flexGrow: 1,
              flexDirection: 'row',
              marginVertical: 'auto',
            }}
            horizontal>
            {filter.map((f, i) => (
              <TouchableOpacity
                key={i}
                onPress={() => {
                  setFilterSelected(f.title);
                }}
                style={[
                  style.btnFilter,
                  filterSelected === f.title ? style.filterSelected : null,
                ]}>
                <Text
                  style={[
                    filterSelected === f.title
                      ? {
                          color: 'white',
                        }
                      : {
                          color: 'black',
                        },
                    {
                      fontSize: 16,
                      fontWeight: 'bold',
                    },
                  ]}>
                  {f.description}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        <View style={{flex: 6}}>
          <Tasks />
          <Completed />
        </View>
        <CreateTask ref={ref} />
      </View>
    );
  },
);
const PRIMARY_COLOR = '#593DA6';
const SECONDARY_COLOR = '#FC94A0';
const style = StyleSheet.create({
  btnFilter: {
    backgroundColor: '#F7F8FA',
    margin: 10,
    minWidth: 150,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterSelected: {
    backgroundColor: PRIMARY_COLOR,
  },
});
const HomeWithGestureHandler = Home;

export default HomeWithGestureHandler;
