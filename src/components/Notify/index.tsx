import {Alert, Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const modalStyle = StyleSheet.create({
  centerView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  container: {
    position: 'relative',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  btnClose: {
    // backgroundColor: 'red',
    color: 'white',
    padding: 5,
    borderRadius: 5,
    textAlign: 'center',
  },
  centerAbsolute: {
    position: 'absolute',
    right: 5,
    top: 5,

    // top: '50%',
    // left: '50%',
    // transform: [{translateX: -50}, {translateY: -50}],
  },
});
function Notify({
  onHide,
  title,
  visible,
}: {
  visible: boolean;
  title: string;
  onHide: () => void;
}) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        onHide();
      }}>
      <View style={modalStyle.centerView}>
        <View style={modalStyle.container}>
          <Text style={modalStyle.title}>{title}</Text>
          <Pressable
            style={[modalStyle.btnClose, modalStyle.centerAbsolute]}
            onPress={onHide}>
            <Icon name="times" size={16} />
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

export default Notify;
