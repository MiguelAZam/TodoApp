import React, {Component} from 'react';
import { StyleSheet, ScrollView, ProgressBarAndroid, Dimensions, TouchableOpacity, Text, View, Modal } from 'react-native';

import ButtonGroupOptions from './ButtonGroupOptions';
import TodoList from './TodoList';

import Requests from './../../Requests.js';

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
  }
});

class Home extends Component {

  constructor(props){
    super(props);
    this.state = {
      modalShow: false,
      todos: [],
      buttons: ['Pending', 'Completed'],
      selected: 0
    };
  }

  static navigationOptions = ({navigation}) => {
    const addButton = (
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('EditAdd', {title: "Add To-do"})}>
        <Text style={{color: '#fff'}}>Add +</Text>
      </TouchableOpacity>
    );
    return {
      title: 'CRUD App',
      headerStyle: {
        backgroundColor: '#004E64',
        height: 75
      },
      headerTintColor: '#fff',
      headerRight: (addButton)
    };
  }

  componentDidMount(){
    const getInfoJSON = Requests.getRequest();
    getInfoJSON.then(respJson => {
      this.setState({todos: respJson});
    }).catch(err => console.log(err));
  }

  onShowModal = () => {
    this.setState({showModal: !this.state.showModal});
  }

  updateIndex = (selected) => {
    this.setState({selected});
  }

  render() {
    const { modalShow, todos, buttons, selected } = this.state;
    const { navigate } = this.props.navigation;
    const progressBar = (<ProgressBarAndroid style={styles.progressBar}/>);

    return (
      <View>
        <Modal 
          animationType="slide" 
          transparent={false} 
          visible={modalShow} 
          onRequestClose={this.onShowModal}
        />
        <ButtonGroupOptions 
          optionButtons={buttons} 
          onOptionChange={this.updateIndex} 
          selected={selected}
        />
        <ScrollView>
          {todos.length ? <TodoList todos={todos} navigate={navigate}/> : progressBar}
        </ScrollView>
      </View>
      
    );
  }
}

export default Home;