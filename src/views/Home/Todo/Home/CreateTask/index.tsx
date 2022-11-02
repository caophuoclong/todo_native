import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Switch,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import BottomSheet from '~/components/BottomSheet';
import {BottomSheetPropsRef} from '../../../../../components/BottomSheet/index';
import DatePicker from 'react-native-date-picker';
import AntIcon from 'react-native-vector-icons/AntDesign';
import moment from 'moment';
import {Task, TaskType} from '~/interfaces';
import useAppContext from '~/hooks/useAppContext';

import Database from '~/utils/database';
import {addTask, setEmptyTask, setTask} from '~/context/actions';
import {useTranslation} from 'react-i18next';
import {ScrollView} from 'react-native-gesture-handler';
import {calculateTimeout} from '../../../../../utils/calculateTimeout';
import BackgroundTimer from 'react-native-background-timer';
import {PushNoti} from '~/utils/pushNoti';
import {schedulerBackground} from '../../../../../utils/schedulerBackground';
import {getLocale} from '../../../../../utils/getLocale';
import _ from 'lodash';
import {convertToDateTime} from '~/utils/convertToDateTime';

interface Props {}
export const taskType: Array<TaskType> = [
  {
    title: 'important',
    name: 'Important',
  },
  {
    title: 'normal',
    name: 'Normal',
  },
  {
    title: 'unimportant',
    name: 'Unimportant',
  },
];
const CreateTask = React.forwardRef<BottomSheetPropsRef, Props>(({}, ref) => {
  const {t} = useTranslation();
  const {state, dispatch} = useAppContext();
  const [openTimePickerStart, setOpenTimePickerStart] =
    useState<boolean>(false);
  const [openDatePickerStart, setOpenDatePickerStart] =
    useState<boolean>(false);
  const [openTimePickerEnd, setOpenTimePickerEnd] = useState<boolean>(false);
  const [openDatePickerEnd, setOpenDatePickerEnd] = useState<boolean>(false);
  // const [isDelete]

  const handleCancel = () => {
    dispatch(setEmptyTask());
    Keyboard.dismiss();
    if (ref) {
      // @ts-ignore
      ref.current.scrollTo(0);
    }
  };
  const selected = state.task.type;
  const [inputDesHeight, setInputDesHeight] = useState(0);
  const [timePress, setTimePress] = useState(0);
  useEffect(() => {
    const dateStart = state.task.start.date;
    const dateEnd = state.task.end.date;
    if (dateStart && !dateEnd) {
      dispatch(
        setTask({
          end: {
            ...state.task.end,
            date: dateStart,
          },
        }),
      );
    }
  }, [state.task.start.date]);
  useEffect(() => {
    const date = state.task.start.date;
    const time = state.task.start.time;
    if (date && time) {
      const dateTime = convertToDateTime(date, time);
      if (date && time && _.isEmpty(state.task.end.time)) {
        const nextHour = new Date(dateTime.getTime() + 60 * 60 * 1000);
        dispatch(
          setTask({
            end: {
              ...state.task.end,
              time: {
                hour: nextHour.getHours(),
                minute: nextHour.getMinutes(),
              },
            },
          }),
        );
      }
    }
  }, [state.task.start.time]);
  const toggleSwitch = () =>
    dispatch(
      setTask({
        isAlert: !state.task.isAlert,
      }),
    );
  const handleSubmit = async () => {
    const _id = new Date().getTime().toString();
    const task = state.task;
    task._id = _id;
    dispatch(
      setTask({
        _id: _id,
      }),
    );
    // check if task is alert"MM-DD-YYYY HH:mm"
    let backgroundId: number[] = [];
    const date = task.start.date;
    const time = task.start.time;
    if (task.isAlert && date && time) {
      const dateTime = convertToDateTime(date, time);

      const timer = state.user.level[task.type.title];
      backgroundId = schedulerBackground(
        timer,
        dateTime.getTime(),
        task.title,
        t,
        task.type.title,
        task._id,
      );
    }
    task.backgroundId = backgroundId;
    console.log(task);
    dispatch(addTask(task));
    dispatch(setEmptyTask());
    // Hide keyboard
    Keyboard.dismiss();
    if (ref) {
      // @ts-ignore
      ref.current.scrollTo(0);
    }
  };
  // console.log(timePress);
  return (
    <BottomSheet ref={ref}>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 30,
          marginVertical: 5,
          fontWeight: 'bold',
        }}>
        {t('CreateTask')}
      </Text>

      <View style={style.box}>
        <Text style={style.title}>{t('TaskTitle')}</Text>
        <TextInput
          style={style.inpTaskTitle}
          placeholder={t('TaskTitlePlaceholder')}
          placeholderTextColor={'#E1E0E5'}
          value={state.task.title}
          onChangeText={text => {
            dispatch(setTask({title: text}));
          }}
        />
      </View>
      <View style={style.box}>
        <Text style={style.title}>{t('TaskLevel')}</Text>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          showsVerticalScrollIndicator={false}>
          {taskType.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[
                style.taskType,
                selected.title === item.title &&
                  ((selected.title === 'important' && {
                    backgroundColor: '#FF0000',
                  }) ||
                    (selected.title === 'normal' && {
                      backgroundColor: '#00BFFF',
                    }) ||
                    //unimportant with gray color
                    (selected.title === 'unimportant' && {
                      backgroundColor: '#808080',
                    })),
              ]}
              onPress={() => {
                dispatch(setTask({type: item}));
              }}>
              <Text
                style={[
                  style.text,
                  selected.title === item.title && {color: '#fff'},
                ]}>
                {t(item.name)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <View style={style.box}>
        <Text style={style.title}>{t('Choose_DateTimeStart')}</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <Pressable
            style={{
              marginHorizontal: 10,
              flex: 0.5,
            }}
            onPress={() => setOpenDatePickerStart(true)}>
            {state.task.start.date !== null ? (
              <View style={style.btnIcon}>
                <AntIcon name="calendar" size={24} />
                <Text style={[style.text, {marginLeft: 10}]}>
                  {moment(state.task.start.date).format('DD-MM-YYYY')}
                </Text>
              </View>
            ) : (
              <View style={style.btnIcon}>
                <AntIcon name="calendar" size={24} />
                <Text style={[style.text, {marginLeft: 10}]}>
                  {t('SelectDate')}
                </Text>
              </View>
            )}
          </Pressable>
          <Pressable
            style={{
              marginHorizontal: 10,
              flex: 0.5,
            }}
            onPress={() => setOpenTimePickerStart(true)}>
            {state.task.start.time !== null ? (
              <View style={style.btnIcon}>
                <AntIcon name="clockcircleo" size={24} />

                <Text style={[style.text, {marginLeft: 10}]}>
                  {`${moment(state.task.start.time).format('HH:mm')}`}
                </Text>
              </View>
            ) : (
              <View style={style.btnIcon}>
                <AntIcon name="clockcircleo" size={24} />
                <Text style={[style.text, {marginLeft: 10}]}>
                  {t('SelectTime')}
                </Text>
              </View>
            )}
          </Pressable>
        </View>
      </View>
      <View style={style.box}>
        <Text style={style.title}>{t('Choose_DateTimeEnd')}</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <Pressable
            style={{
              marginHorizontal: 10,
              flex: 0.5,
            }}
            onPress={() => setOpenDatePickerEnd(true)}>
            {state.task.end.date !== null ? (
              <View style={style.btnIcon}>
                <AntIcon name="calendar" size={24} />

                <Text style={[style.text, {marginLeft: 10}]}>
                  {moment(state.task.end.date).format('DD-MM-YYYY')}
                </Text>
              </View>
            ) : (
              <View style={style.btnIcon}>
                <AntIcon name="calendar" size={24} />
                <Text style={[style.text, {marginLeft: 10}]}>
                  {' '}
                  {t('SelectDate')}
                </Text>
              </View>
            )}
          </Pressable>
          <Pressable
            style={{
              marginHorizontal: 10,
              flex: 0.5,
            }}
            onPress={() => setOpenTimePickerEnd(true)}>
            {state.task.end.time !== null ? (
              <View style={style.btnIcon}>
                <AntIcon name="clockcircleo" size={24} />

                <Text style={[style.text, {marginLeft: 10}]}>
                  {`${moment(state.task.end.time).format('HH:mm')}`}
                </Text>
              </View>
            ) : (
              <View style={style.btnIcon}>
                <AntIcon name="clockcircleo" size={24} />
                <Text style={[style.text, {marginLeft: 10}]}>
                  {' '}
                  {t('SelectTime')}
                </Text>
              </View>
            )}
          </Pressable>
        </View>
      </View>
      <View>
        <Text style={style.title}>
          {t('Description')} ({t('Optional')})
        </Text>
        <TextInput
          value={state.task.description}
          onContentSizeChange={e => {
            setInputDesHeight(e.nativeEvent.contentSize.height);
          }}
          onChangeText={text => {
            text.length >= 1
              ? dispatch(
                  setTask({
                    description: text,
                  }),
                )
              : dispatch(
                  setTask({
                    description: '',
                  }),
                );
          }}
          style={[
            style.inpTaskTitle,
            {
              fontSize: 16,
              textAlignVertical: 'top',
            },
            {
              height: Math.max(40, Math.min(100, inputDesHeight)),
            },
          ]}
          placeholder={t('EnterDescription')}
          multiline={true}
          scrollEnabled={true}
          returnKeyType="done"
          blurOnSubmit={true}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            color: 'black',
          }}>
          {t('GetAlert')}
        </Text>
        <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={state.task.isAlert ? '#5A3DA4' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={state.task.isAlert}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
        }}>
        <TouchableOpacity
          style={[
            style.btn,
            {
              backgroundColor: '#fff',
              borderWidth: 1,
              // Secondary color
              borderColor: '#FC94A0',
            },
          ]}
          onPress={handleCancel}>
          <Text
            style={{
              color: '#000',
              fontSize: 20,
              fontWeight: 'bold',
              textAlign: 'center',
            }}>
            {t('Cancel')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={
            state.task.title.length === 0 ||
            _.isEmpty(state.task.start) ||
            _.isEmpty(state.task.end)
          }
          style={[style.btn, style.btnSubmit]}
          onPress={handleSubmit}>
          <Text
            style={{
              color: '#fff',
              fontSize: 20,
              fontWeight: 'bold',
              textAlign: 'center',
            }}>
            {t('Done')}
          </Text>
        </TouchableOpacity>
      </View>
      <DatePicker
        mode="date"
        modal
        locale={getLocale()}
        open={openDatePickerStart}
        date={new Date()}
        onConfirm={date => {
          setOpenDatePickerStart(false);
          const day = date.getDate();
          const month = date.getMonth();
          const year = date.getFullYear();
          dispatch(
            setTask({
              start: {
                ...state.task.start,
                date: {
                  day,
                  month,
                  year,
                },
              },
            }),
          );
        }}
        onCancel={() => {
          setOpenDatePickerStart(false);
        }}
      />
      <DatePicker
        mode="time"
        modal
        locale={getLocale()}
        open={openTimePickerStart}
        date={new Date()}
        onConfirm={date => {
          setOpenTimePickerStart(false);
          const hour = date.getHours();
          const minute = date.getMinutes();
          dispatch(
            setTask({
              start: {
                ...state.task.start,
                time: {
                  hour,
                  minute,
                },
              },
            }),
          );
        }}
        onCancel={() => {
          setOpenTimePickerStart(false);
        }}
      />
      <DatePicker
        mode="date"
        modal
        locale={getLocale()}
        open={openDatePickerEnd}
        date={
          _.isEmpty(state.task.start.date)
            ? new Date()
            : new Date(
                state.task.start.date.year,
                state.task.start.date.month,
                state.task.start.date.day,
              )
        }
        onConfirm={date => {
          setOpenDatePickerEnd(false);
          const day = date.getDate();
          const month = date.getMonth();
          const year = date.getFullYear();
          dispatch(
            setTask({
              end: {
                ...state.task.end,
                date: {
                  day,
                  month,
                  year,
                },
              },
            }),
          );
        }}
        onCancel={() => {
          setOpenDatePickerEnd(false);
        }}
      />
      <DatePicker
        mode="time"
        modal
        locale={getLocale()}
        open={openTimePickerEnd}
        // date={new Date()}
        date={
          _.isEmpty(state.task.start.date) ||
          _.isEmpty(state.task.start.time) ||
          _.isEmpty(state.task.end.time)
            ? new Date()
            : new Date(
                state.task.start.date.year,
                state.task.start.date.month,
                state.task.start.date.day,
                state.task.end.time.hour,
                state.task.end.time.minute,
              )
        }
        onConfirm={date => {
          setOpenTimePickerEnd(false);
          const hour = date.getHours();
          const minute = date.getMinutes();
          dispatch(
            setTask({
              end: {
                ...state.task.end,
                time: {
                  hour,
                  minute,
                },
              },
            }),
          );
        }}
        onCancel={() => {
          setOpenTimePickerEnd(false);
        }}
      />
    </BottomSheet>
  );
});
const PRIMARY_COLOR = '#593DA6';
const SECONDARY_COLOR = '#FC94A0';
const style = StyleSheet.create({
  tasks: {
    flex: 3,
    backgroundColor: '#fff',
  },
  completed: {},
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
  btn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 10,
    marginHorizontal: 10,
  },
  btnSubmit: {
    backgroundColor: SECONDARY_COLOR,
  },
  btnIcon: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E1E0E5',
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    minWidth: 150,
  },
  text: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  box: {
    backgroundColor: 'white',
    marginBottom: 10,
  },

  inpTaskTitle: {
    borderRadius: 10,
    backgroundColor: '#F6F8FA',
    padding: 10,
    color: 'gray',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.01,
    shadowRadius: 2.22,

    elevation: 2,
  },
  taskType: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#F6F8FA',
    marginHorizontal: 10,
    borderRadius: 10,
  },
  selected: {
    backgroundColor: PRIMARY_COLOR,
  },
  dateTime: {},
});

export default CreateTask;
