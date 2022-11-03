import {View, Text, StyleProp, TextStyle, TouchableOpacity} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import useAppContext from '~/hooks/useAppContext';
import {dracula} from '~/constants/color';
import {snazzyLight} from '../../constants/color';
import {useTranslation} from 'react-i18next';
interface Props {
  isVisible: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  title: string;
  titleStyle?: StyleProp<TextStyle>;
  showCloseButton?: boolean;
}
const AppModal: React.FC<Props> = ({
  isVisible,
  onClose,
  children,
  title,
  titleStyle,
  showCloseButton = false,
}) => {
  const {
    state: {
      systemSetting: {colorScheme},
    },
  } = useAppContext();
  const {t} = useTranslation();
  return (
    <Modal
      testID={'modal'}
      isVisible={isVisible}
      animationInTiming={1000}
      animationOutTiming={1000}
      backdropTransitionInTiming={800}
      backdropTransitionOutTiming={800}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}>
      <View
        style={{
          backgroundColor:
            colorScheme === 'dark' ? dracula.white : snazzyLight.white,
          padding: 22,
          //   alignItems: 'center',
          borderRadius: 4,
          borderColor: 'rgba(0, 0, 0, 0.1)',
        }}>
        <Text
          style={[
            {
              fontSize: 20,
              fontWeight: 'bold',
              color:
                colorScheme === 'dark'
                  ? dracula.foreground
                  : snazzyLight.foreground,
            },
            titleStyle,
          ]}>
          {title}
        </Text>
        {children}
        {showCloseButton && (
          <TouchableOpacity
            onPress={onClose}
            style={{
              marginTop: 10,
              backgroundColor:
                colorScheme === 'dark' ? dracula.cyan : snazzyLight.cyan,
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderRadius: 10,
              alignSelf: 'center',
            }}>
            <Text style={{color: 'white'}}>{t('Close')}</Text>
          </TouchableOpacity>
        )}
      </View>
    </Modal>
  );
};

export default AppModal;
