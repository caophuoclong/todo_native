import {View, Text, StyleProp, TextStyle} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
interface Props {
  isVisible: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  title: string;
  titleStyle?: StyleProp<TextStyle>;
}
const AppModal: React.FC<Props> = ({
  isVisible,
  onClose,
  children,
  title,
  titleStyle,
}) => {
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
          backgroundColor: 'white',
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
              color: 'black',
            },
            titleStyle,
          ]}>
          {title}
        </Text>
        {children}
      </View>
    </Modal>
  );
};

export default AppModal;
