import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  Keyboard,
  Switch,
} from 'react-native';
import React, {useState} from 'react';
import {Task, TaskWithBackgroundId} from '~/interfaces';
import Icon from 'react-native-vector-icons/Fontisto';
import {ScrollView} from 'react-native-gesture-handler';
import {TouchableOpacity} from 'react-native';
import AppModal from '../AppModal';
import {useTranslation} from 'react-i18next';
import useAppContext from '~/hooks/useAppContext';
import {setAlert, setBackgroundId, deleteTask} from '~/context/actions';
import BackgroundTimer from 'react-native-background-timer';

import {schedulerBackground} from '~/utils/schedulerBackground';
import moment from 'moment';
import {convertToDateTime} from '~/utils/convertToDateTime';
import {dracula, snazzyLight} from '../../constants/color';
interface Props {
  task: TaskWithBackgroundId | null;
  onDeleteTask: (_id: string) => void;
}
const DetailTask: React.FC<Props> = ({task, onDeleteTask}) => {
  const {state, dispatch} = useAppContext();
  const {
    systemSetting: {colorScheme},
  } = state;
  const {t} = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const toggleSwitch = () => {
    const isEnable = task?.isAlert;
    if (task) {
      const date = task.start.date;
      const time = task.start.time;
      if (date && time) {
        const dateTime = convertToDateTime(date, time);
        const timestamp = dateTime.getTime();
        if (!isEnable) {
          const timer = state.user.level[task.type.title];
          const backgroundId = schedulerBackground(
            timer,
            timestamp,
            task.title,
            t,
            task.type.title,
            task._id,
          );
          console.log('backgroundId', backgroundId);
          dispatch(setBackgroundId(task._id, backgroundId));
        }
      } else {
        console.log('task.backgroundId', task.backgroundId);
        task.backgroundId?.forEach(x => {
          BackgroundTimer.clearTimeout(x);
        });
        dispatch(setBackgroundId(task._id, []));
      }
      dispatch(setAlert({_id: task._id, enable: !task.isAlert}));
    }
  };
  if (task) {
    return (
      <View style={[styles.container]}>
        <Text
          style={[
            styles.title,
            {
              color:
                colorScheme === 'dark'
                  ? dracula.foreground
                  : snazzyLight.foreground,
            },
          ]}>
          {task.title}
        </Text>
        {/* Level */}
        <View
          style={[
            {
              width: 120,
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'center',
            },
            ,
            {
              backgroundColor:
                colorScheme !== 'dark'
                  ? task.type.title === 'important'
                    ? dracula.red
                    : task.type.title === 'normal'
                    ? // blue ocean
                      dracula.cyan
                    : //   else green
                      dracula.green
                  : task.type.title === 'important'
                  ? snazzyLight.red
                  : task.type.title === 'normal'
                  ? // blue ocean
                    snazzyLight.cyan
                  : //   else green
                    snazzyLight.green,
            },
          ]}>
          <Text
            style={{
              color: '#fff',
              fontWeight: 'bold',
              fontSize: 14,
            }}>
            {t(task.type.name)}
          </Text>
        </View>
        {/* Time */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 12,
                color:
                  colorScheme === 'dark'
                    ? dracula.foreground
                    : snazzyLight.foreground,
              }}>
              {t('Start')}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                backgroundColor:
                  colorScheme === 'dark' ? dracula.white : snazzyLight.white,
                padding: 10,
                borderRadius: 10,
                alignItems: 'center',
              }}>
              <Icon name="date" size={24} />
              <Text
                style={{
                  marginLeft: 10,
                  fontSize: 14,
                  fontWeight: 'bold',
                  color:
                    colorScheme === 'dark'
                      ? dracula.foreground
                      : snazzyLight.foreground,
                }}>{`${moment(task.start.date).format('DD-MM-YYYY')} - ${moment(
                task.start.time,
              ).format('HH:mm')}`}</Text>
            </View>
          </View>
          <View>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 12,
                color:
                  colorScheme === 'dark'
                    ? dracula.foreground
                    : snazzyLight.foreground,
              }}>
              {t('End')}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                backgroundColor:
                  colorScheme === 'dark' ? dracula.white : snazzyLight.white,
                padding: 10,
                borderRadius: 10,
                alignItems: 'center',
              }}>
              <Icon name="date" size={24} />
              <Text
                style={{
                  marginLeft: 10,
                  fontSize: 14,
                  fontWeight: 'bold',
                  color:
                    colorScheme === 'dark'
                      ? dracula.foreground
                      : snazzyLight.foreground,
                }}>{`${moment(task.end.date).format('DD-MM-YYYY')} - ${moment(
                task.end.time,
              ).format('HH:mm')}`}</Text>
            </View>
          </View>
        </View>
        {/* Description */}
        <View>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 12,
              color:
                colorScheme === 'dark'
                  ? dracula.foreground
                  : snazzyLight.foreground,
            }}>
            {t('Description')}
          </Text>
          <TouchableOpacity
            disabled={
              task.description && task.description.length > 0 ? false : true
            }
            onPress={() => {
              setShowModal(true);
            }}>
            <Text numberOfLines={6}>{task.description}</Text>
          </TouchableOpacity>
        </View>
        {/* Modal */}
        <AppModal
          isVisible={showModal}
          onClose={() => {
            setShowModal(false);
          }}
          showCloseButton={true}
          title={t('Description')}>
          <ScrollView>
            <Text>{task.description}</Text>
          </ScrollView>
        </AppModal>
        {/* Notify */}
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
            {t('GetAlert')}
          </Text>
          <Switch
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={task.isAlert ? '#5A3DA4' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={task.isAlert}
          />
        </View>
        <View>
          <TouchableOpacity
            onPress={() => {
              onDeleteTask(task._id);
            }}
            style={{
              backgroundColor:
                colorScheme === 'dark' ? snazzyLight.cyan : dracula.cyan,
              padding: 20,
              borderRadius: 10,
            }}>
            <Text
              style={{
                color: 'white',
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: 16,
              }}>
              {t('Delete')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  } else {
    return <View></View>;
  }
};
const styles = StyleSheet.create({
  container: {},
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#160C30',
  },
});
export default DetailTask;
