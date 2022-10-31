import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  Keyboard,
} from 'react-native';
import React, {useState} from 'react';
import {Task} from '~/interfaces';
import Icon from 'react-native-vector-icons/Fontisto';
import {ScrollView} from 'react-native-gesture-handler';
import {TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import AppModal from '../AppModal';
import {useTranslation} from 'react-i18next';

interface Props {
  task: Task | null;
}
const DetailTask: React.FC<Props> = ({task}) => {
  const {t} = useTranslation();
  const [showModal, setShowModal] = useState(false);
  if (task) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{task.title}</Text>
        {/* Level */}
        <View
          style={[
            {
              width: 90,
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'center',
            },
            ,
            {
              backgroundColor:
                task.type.title === 'important'
                  ? '#FF0000'
                  : task.type.title === 'normal'
                  ? // blue ocean
                    '#00BFFF'
                  : //   else green
                    '#008000',
            },
          ]}>
          <Text
            style={{
              color: '#fff',
              fontWeight: 'bold',
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
                color: '#221B3D',
              }}>
              {t('Start')}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: '#e5e5e5',
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
                  color: 'black',
                }}>{`${task.start.date} - ${task.start.time}`}</Text>
            </View>
          </View>
          <View>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 12,
                color: '#221B3D',
              }}>
              {t('End')}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: '#e5e5e5',
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
                  color: 'black',
                }}>{`${task.end.date} - ${task.end.time}`}</Text>
            </View>
          </View>
        </View>
        {/* Description */}
        <View>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 12,
              color: '#221B3D',
            }}>
            {t('Description')}
          </Text>
          <TouchableOpacity
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
          title={t('Description')}>
          <ScrollView>
            <Text>{task.description}</Text>
          </ScrollView>
          <TouchableOpacity
            onPress={() => setShowModal(false)}
            style={{
              marginTop: 10,
              backgroundColor: '#00BFFF',
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderRadius: 5,
              alignSelf: 'center',
            }}>
            <Text style={{color: 'white'}}>{t('Close')}</Text>
          </TouchableOpacity>
        </AppModal>
        {/* Notify */}
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
