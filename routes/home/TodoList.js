import React, { Component } from 'react';
import { StyleSheet, ScrollView} from 'react-native';
import { List, ListItem } from 'react-native-elements';

const styles = StyleSheet.create({
  list: {
    borderTopWidth: 0,
    padding: 30,
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

class TodoList extends Component {

  constructor(props) {
    super(props);
  }

  render() {
  	const { todos, navigate } = this.props;
    return (
      <List containerStyle={styles.list}>
			  {todos.map(todo => {
					const { _id, title, time, description, completed } = todo;
			    return (
			      <ListItem 
			        onPressRightIcon={() => navigate('EditAdd', {todo, title: "Edit To-do"})}
			        key={_id} 
			        containerStyle={[styles.listItem, {backgroundColor: completed ? '#C6FFCC' : '#CCFAFF'}]}
			        rightIcon={{name:completed ? 'close' : 'chevron-right', color: '#586F7C'}}
			        leftIcon={{name:'check-circle', color:completed ? '#58B759' : '#586F7C'}}
			        title={title} 
			        titleStyle={styles.text}
			        subtitle={time}
			        subtitleStyle={styles.text}
			      />
			    );
			  })}
			</List>
    );
  }
}

export default TodoList;
