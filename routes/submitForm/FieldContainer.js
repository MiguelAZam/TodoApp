import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const styles = StyleSheet.create({
  field: {
    flexDirection: 'row', 
    margin: 15
  },
  globalStyle: {
    fontSize: 20,
    padding: 10
  },
  label: {
    flex: 1,
    textAlign: "right"
  },
});

const FieldContainer = (props) => {
	const { title } = props;
    return (
      <View style={styles.field}>
        {title ? (<Text style={[styles.label, styles.globalStyle]}>{title}</Text>) : null}
        {props.children}
      </View>
  	);
};

export default FieldContainer;
