import React from 'react';
import { StyleSheet } from 'react-native';
import { ButtonGroup } from 'react-native-elements';

const styles = StyleSheet.create({
  container: {
		height:50, 
		marginTop: 20
  },
  selectedButton: {
		backgroundColor: '#004E64', 
		borderColor: '#fff', 
		borderStyle: 'solid', 
		borderWidth: 1
  },
  selectedText: {
		color: '#fff'
  }
});

const ButtonGroupOptions = (props) => {
	const {optionButtons, selected, onOptionChange} = props;
  return (
    <ButtonGroup 
      onPress={onOptionChange}
      selectedIndex={selected}
      buttons={optionButtons}
      containerStyle={styles.container}
      selectedButtonStyle={styles.selectedButton}
      selectedTextStyle={styles.selectedText}
    />
  );
};

export default ButtonGroupOptions;
