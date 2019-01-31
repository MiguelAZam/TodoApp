import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View, Modal } from 'react-native';

//Styles for modal
const styles = StyleSheet.create({
  modalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    backgroundColor: '#000'
  },
  contentContainer: {
    width: 300,
    height: 300,
    backgroundColor: '#fff',
    borderRadius: 5
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    height: 50,
    backgroundColor: '#004E64'
  },
  infoContainer: {
    width: '100%',
    height: 200,
    padding: 15,
    backgroundColor: '#fff'
  },
  infoText: {
    color: '#000',
    fontSize: 16
  },
  buttonContainer:{
    flexDirection: 'row',
    height: 50,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '50%',
    height: '100%',
  },
  darkBackgroundText: {
    color: '#fff',
    fontSize: 16
  }
});

const LongPressModal = (props) => {
  //Deconstruct all props
  const {selectedTodo, modalShow, onHideModal, onDeleteTodo} = props;
  //Deconstruct selectedTodo
  const {_id, title, time, description} = selectedTodo
  return (
    <Modal 
      animationType="slide" 
      transparent={true} 
      visible={modalShow} 
      onRequestClose={onHideModal}
    >

      <View style={styles.modalContainer} opacity={0.85}>
        <View style={styles.contentContainer} opacity={1}>
          <View style={styles.header}>
            <Text style={styles.darkBackgroundText}>{title}</Text>
          </View>
          <View style={styles.infoContainer}>
            <View style={{flexDirection: 'row', marginBottom: 10}}>
              <Text style={[styles.infoText, {fontWeight: 'bold'}]}>Deadline:</Text>
              <Text style={styles.infoText}>{` ${time}`}</Text>  
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={[styles.infoText, {fontWeight: 'bold'}]}>Description:</Text>
              <Text style={styles.infoText}>{` ${description}`}</Text>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={onHideModal} style={[styles.button, {backgroundColor: '#AAA'}]}>
              <Text style={styles.darkBackgroundText}>Exit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onDeleteTodo(_id)} style={[styles.button, {backgroundColor: '#EF233C'}]}>
              <Text style={styles.darkBackgroundText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

    </Modal>
  );
};

export default LongPressModal;