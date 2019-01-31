import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

//Styles
const styles = StyleSheet.create({
  globalStyle: {
    fontSize: 20,
    padding: 15
  },
  touchableOp: {
    borderRadius: 5,
    flex: 1,
    margin: 10
  },
  textButton: {
    textAlign: "center",
    color: "#fff"
  }
});

const ActionButton = (props) => {
  //Deconstruct props
  const {title, onPressAction, color} = props;
  return (
    <TouchableOpacity style={[styles.touchableOp, color]} onPress={onPressAction}>
      <Text style={[styles.globalStyle, styles.textButton]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default ActionButton;
