import React from 'react';
import { StyleSheet, ScrollView} from 'react-native';
import { List, ListItem } from 'react-native-elements';

//Styles
const styles = StyleSheet.create({
  list: {
    borderTopWidth: 0,
    padding: 15,
    marginTop: 0
  },
  listItem: {
    borderRadius: 5,
    borderColor: '#fff',
    borderBottomColor: '#fff',
    borderWidth: 2,
    margin: 10,
  },
  text: {
  	color: "#000"
  }
});

const TodoList = (props) => {
  //Deconstruct props
  let { todos, navigation, selected, onShowModal, onCompleteTask } = props;
  return (
      <List containerStyle={styles.list}>
        {todos.map(todo => {
          const { _id, title, time, description, completed } = todo;
          return ((selected == completed) || (completed === undefined)) ? (
            <ListItem 
              onPressRightIcon={() => navigation.navigate('EditAdd', {todo, title: "Edit To-do", requestUpdate: navigation.getParam("requestUpdate")})}
              leftIconOnPress={() => onCompleteTask(todo)}
              onLongPress={() => onShowModal(todo)}
              key={_id} 
              containerStyle={[styles.listItem, {backgroundColor: completed ? '#C6FFCC' : '#CCFAFF'}]}
              rightIcon={{color: '#586F7C'}}
              hideChevron={completed ? true : false}
              leftIcon={{name:'check-circle', color:completed ? '#58B759' : '#586F7C'}}
              title={title} 
              titleStyle={styles.text}
              subtitle={time}
              subtitleStyle={styles.text}
            />) : null
        })}
      </List>
    );
};

export default TodoList;
