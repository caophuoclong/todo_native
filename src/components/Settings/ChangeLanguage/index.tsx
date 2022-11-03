import {View, Text, Pressable, Image} from 'react-native';
import Modal from 'react-native-modal';

import React, {useState} from 'react';
import {CommonStyles} from '~/styles';
import Icon from 'react-native-vector-icons/Entypo';
import useAppContext from '~/hooks/useAppContext';
import AppModal from '~/components/AppModal';
import {Language as ILanguage} from '~/interfaces';
import {TouchableOpacity} from 'react-native-gesture-handler';
import CheckBox from '~/components/CheckBox';
import {setLan} from '~/context/actions';
import Database from '~/utils/database';
import {useTranslation} from 'react-i18next';
import AppPressable from '~/components/AppPressable';
import {dracula} from '~/constants/color';
import {snazzyLight} from '../../../constants/color';
interface LanguageProps {
  imgUri: string;
  name: string;
  onChoose: (lan: ILanguage) => void;
  lan: ILanguage;
}
const Language = ({imgUri, name, onChoose, lan}: LanguageProps) => {
  const {
    state: {
      systemSetting: {lan: Lang, colorScheme},
    },
  } = useAppContext();
  const check = lan === Lang;
  const onChange = () => {
    onChoose(lan);
  };
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Image
          style={{width: 20, height: 20, borderRadius: 5}}
          source={{
            uri: imgUri,
          }}
        />
        <Text
          style={{
            marginLeft: 10,
            fontSize: 16,
            fontWeight: 'bold',
            color:
              colorScheme === 'dark'
                ? dracula.foreground
                : snazzyLight.foreground,
          }}>
          {name}
        </Text>
      </View>
      <CheckBox value={check} onValueChange={onChange} />
    </View>
  );
};
const ChangeLanguge = () => {
  const {t, i18n} = useTranslation();
  const {state, dispatch} = useAppContext();
  const [showModal, setShowModal] = useState(false);
  const {
    systemSetting: {lan},
  } = state;
  const onChangeLanguage = async (lan: ILanguage) => {
    await Database._storeData('lan', lan);
    dispatch(setLan(lan));
    i18n.changeLanguage(lan);
  };
  return (
    <AppPressable
      title={t('ChangeLanguage')}
      onPress={() => {
        setShowModal(!showModal);
      }}
      icon={<Icon name="language" size={24} color="green" />}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        {/* <Text style={CommonStyles.settingTitle}>{}</Text> */}
        {/* <Text>
          {(lan === 'en' && 'English') || (lan === 'vi' && 'Tiếng việt')}
        </Text> */}
      </View>
      <AppModal
        isVisible={showModal}
        onClose={() => {
          setShowModal(false);
        }}
        title={t('ChangeLanguage')}>
        <Language
          name={'Tiếng Việt'}
          imgUri="https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Vietnam.svg/255px-Flag_of_Vietnam.svg.png"
          onChoose={onChangeLanguage}
          lan="vi"
        />
        <Language
          name="English"
          imgUri="https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/255px-Flag_of_the_United_States.svg.png"
          lan="en"
          onChoose={onChangeLanguage}
        />
      </AppModal>
    </AppPressable>
  );
};

export default ChangeLanguge;
