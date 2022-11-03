import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Pressable,
  Switch,
  Image,
  Button,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import BackgroundTimer from 'react-native-background-timer';

import {BottomSheetPropsRef} from '../../../../components/BottomSheet/index';
import Tasks from './Tasks';
import Completed from './Completed';
import Greeting from './Greeting';
import {TouchableOpacity} from 'react-native';
import CreateTask from './CreateTask';
import useAppContext from '~/hooks/useAppContext';
import moment from 'moment';
import {Task} from '~/interfaces';
import Database from '~/utils/database';
import {setTaskCompleted, setTaskFilter} from '~/context/actions';
import {useTranslation} from 'react-i18next';
import {Notifications} from 'react-native-notifications';
import BackgroundFetch from 'react-native-background-fetch';
import {checkExpired} from '~/utils/checkExpired';
import notifee, {AndroidImportance, EventType} from '@notifee/react-native';
import {schedulerBackground} from '../../../../utils/schedulerBackground';
import {setBackgroundId} from '../../../../context/actions/index';
import {convertToDateTime} from '~/utils/convertToDateTime';
import {dracula, snazzyLight} from '../../../../constants/color';

interface Props {
  // showBottomSheet: boolean;
  // setShowBottomSheet: () => void;
  children?: React.ReactNode;
  navigation: any;
}
export type TitleFilter =
  | 'myDay'
  | 'important'
  | 'expired'
  | 'planned'
  | 'all'
  | 'expired';
const Home = React.forwardRef<BottomSheetPropsRef, Props>(
  ({navigation}, ref) => {
    const {t} = useTranslation();
    const [filterSelected, setFilterSelected] = useState<TitleFilter>('myDay');
    const {state, dispatch} = useAppContext();
    const {
      systemSetting: {colorScheme},
    } = state;
    const [tasksFiltered, setTasksFiltered] = useState<Array<Task>>([]);
    const [filter, setFilter] = useState<
      Array<{
        title: TitleFilter;
        description: string;
      }>
    >([
      {
        title: 'myDay',
        description: 'MyDay',
      },
      {
        title: 'important',
        description: 'Important',
      },
      {
        title: 'expired',
        description: 'Expired',
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
      if (filterSelected === 'myDay') {
        const tasksFiltered = tasks.filter(task => {
          const today = new Date();
          const date = task.start.date;
          const time = task.start.time;
          if (date && time) {
            const dateTime = new Date(
              date?.year,
              date?.month,
              date?.day,
              time?.hour,
              time?.minute,
            );

            return (
              !checkExpired(dateTime.getTime()) &&
              moment(dateTime).isSame(today, 'day')
            );
          } else {
            return true;
          }
        });
        setTasksFiltered(tasksFiltered);
      } else if (filterSelected === 'expired') {
        const taskExpired = tasks.filter(task => {
          const date = task.start.date;
          const time = task.start.time;
          if (date && time) {
            const dateTime = convertToDateTime(date, time);

            return checkExpired(dateTime.getTime());
          } else {
            return true;
          }
        });
        setTasksFiltered(taskExpired);
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
    useEffect(() => {
      (async () => {
        await Database._storeData('tasks', JSON.stringify(state.tasks));
      })();
    }, [state.tasks]);
    useEffect(() => {
      (async () => {
        await Database._storeData('user', JSON.stringify(state.user));
      })();
    }, [state.user]);
    useEffect(() => {
      (async () => {
        await Database._storeData(
          'systemSetting',
          JSON.stringify(state.systemSetting),
        );
      })();
    }, [state.systemSetting]);
    // useEffect(() => {
    //   (() => {
    //     const tasks = state.tasks;
    //     // check task undone
    //     const taskUnDone = tasks.filter(task => !task.isDone);
    //     // check task not alert
    //     const taskAlert = taskUnDone.filter(task => task.isAlert);
    //     taskAlert.forEach(task => {
    //       const timer = state.user.level[task.type.title];
    //       const date = task.start.date;
    //       const time = task.start.time;
    //       if (date && time) {
    //         const dateTime = new Date(
    //           date.year,
    //           date.month,
    //           date.day,
    //           time.hour,
    //           time.minute,
    //         );
    //         const backgroundId = schedulerBackground(
    //           timer,
    //           dateTime.getTime(),
    //           task.title,
    //           t,
    //           task.type.title,
    //           task._id,
    //         );
    //         dispatch(setBackgroundId(task._id, backgroundId));
    //       }
    //     });
    //   })();
    // }, [state.tasks]);

    async function onDisplayNotification() {
      console.log(123123);
      // Request permissions (required for iOS)
      await notifee.requestPermission();

      // Create a channel (required for Android)
      const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
        importance: AndroidImportance.HIGH,
      });
      // Display a notification
      notifee.displayNotification({
        title:
          '<p style="color: #4caf50;"><b>Styled HTMLTitle</span></p></b></p> &#128576;',
        subtitle: '&#129395;',
        body: 'The <p style="text-decoration: line-through">body can</p> also be <p style="color: #ffffff; background-color: #9c27b0"><i>styled too</i></p> &#127881;!',
        android: {
          smallIcon: 'notification_icon',
          channelId,
          color: '#4caf50',
          actions: [
            {
              title: '<b>View task</b> &#128111;',
              pressAction: {
                id: `viewTask_${'1667449372810'}`,
                launchActivity: 'default',
              },
            },
            {
              title:
                '<p style="color: #f44336;"><b>Make done</b> &#128557;</p>',
              pressAction: {id: `makeDone_${'1667413906871'}`},
            },
          ],
        },
      });
    }
    // useEffect(() => {
    //   notifee.onBackgroundEvent(async ({type, detail}) => {
    //     // id include viewTask
    //     if (
    //       type === EventType.ACTION_PRESS &&
    //       detail.pressAction?.id.includes('viewTask')
    //     ) {
    //       const taskId = detail.pressAction?.id.split('_')[1];
    //       if (taskId) {
    //       }
    //       // const taskId = detail.id.split('_')[1];
    //       // navigation.navigate('TaskDetail', {taskId});
    //       console.log(
    //         'User pressed an action with the id: ',
    //         detail.pressAction.id,
    //       );
    //     }
    //     if (type === EventType.ACTION_PRESS && detail.pressAction?.id) {
    //       console.log(
    //         'User pressed an action with the id1: ',
    //         detail.pressAction.id,
    //       );
    //     }
    //   });
    // }, []);
    const handleSetFilterSelected = (title: TitleFilter) => {
      setFilterSelected(title);
    };
    return (
      <View
        style={{
          backgroundColor:
            colorScheme === 'dark'
              ? dracula.background
              : snazzyLight.background,
          flex: 1,
        }}>
        {/* <Button
          title="Notify"
          onPress={() => {
            onDisplayNotification();
          }}
        /> */}
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
                  handleSetFilterSelected(f.title);
                }}
                style={[
                  style.btnFilter,
                  filterSelected === f.title
                    ? {
                        backgroundColor:
                          colorScheme === 'dark'
                            ? snazzyLight.purple
                            : dracula.purple,
                      }
                    : null,
                ]}>
                <Text
                  style={[
                    filterSelected === f.title
                      ? {
                          // white smoke
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
                  {t(f.description)}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        <View style={{flex: 6}}>
          <Tasks handleSetFilterSelected={handleSetFilterSelected} />
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
