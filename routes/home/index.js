import React, {Component} from 'react';
import { StyleSheet, ScrollView, ProgressBarAndroid, Dimensions, View, TouchableOpacity, Text } from 'react-native';
import { ButtonGroup, List, ListItem } from 'react-native-elements';

//https://coolors.co/cc7e8c-f4f3a4-a6e0a7-80ded9-004e64 colors

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
  progressBar: {
    height: SCREEN_HEIGHT/2,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  addButton: {
    marginRight: 25,
    padding: 10,
    paddingRight: 25,
    paddingLeft: 25,
    backgroundColor: '#58B759',
    borderRadius: 5
  },
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
    backgroundColor: '#CCFAFF'
  }
});

class Home extends Component {

  constructor(props){
    super(props);
    this.state = {
      todos: [],
      selected: 0
    };
  }

  static navigationOptions = ({navigation}) => {
    return {
      title: 'CRUD App',
      headerStyle: {
        backgroundColor: '#004E64',
        height: 75
      },
      headerTintColor: '#fff',
      headerRight: (
        <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('EditAdd')}>
          <Text style={{color: '#fff'}}>Add +</Text>
        </TouchableOpacity>
      )
    };
  }

  componentDidMount(){
    const domain = ''; //Write your domain
    const todosUrl = `${domain}/api/todos/`;
    fetch(todosUrl).then(resp => resp.json()).then(respJson => {
      this.setState({todos: respJson});
    }).catch(err => console.log(err));
  }

  updateIndex = (selected) => {
    this.setState({selected});
  }

  displayListItems = (todos) => {
    return (
      <List containerStyle={styles.list}>
        {todos.map(todo => {
          return (
            <ListItem 
              key={todo._id} 
              title={todo.title} 
              onPressRightIcon={() => this.props.navigation.navigate('EditAdd', {todo})}
              containerStyle={styles.listItem}
              titleStyle={{color: "#000000"}}
              subtitle={todo.time}
              subtitleStyle={{color: "#000000"}}
              rightIcon={{name:'chevron-right'}}
              chevronColor='#586F7C'
              leftIcon={{name:'check-circle', color:'#586F7C'}}
            />
          );
        })}
      </List>
    );
  }

  render() {
    const { todos, selected } = this.state;
    const buttons = ['Pending', 'Completed'];
    const progressBar = (<ProgressBarAndroid style={styles.progressBar}/>);

    return (
      <View>
        <ButtonGroup 
          onPress={this.updateIndex}
          selectedIndex={selected}
          buttons={buttons}
          containerStyle={{height:50, marginTop: 20}}
          selectedButtonStyle={{backgroundColor: '#004E64', borderColor: '#fff', borderStyle: 'solid', borderWidth: 1}}
          selectedTextStyle={{color:'#fff'}}
        />
        <ScrollView>
          {todos.length ? this.displayListItems(todos) : progressBar}
        </ScrollView>
      </View>
      
    );
  }
}

export default Home;