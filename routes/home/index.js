import React, {Component} from 'react';
import { StyleSheet, ScrollView, ProgressBarAndroid, Dimensions, TouchableOpacity, Text, View, Modal } from 'react-native';

//Created components
import ButtonGroupOptions from './ButtonGroupOptions';
import TodoList from './TodoList';
import LongPressModal from './LongPressModal';

//Requests to interact with the server
import Requests from './../../Requests.js';

//Obtain dimentions of the Screen
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

//Styles
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
      modalShow: false, //Show modal
      selectedTodo: {}, //Object to pass to the modal and view information
      todos: [], //Array of todos
      buttons: ['Pending', 'Completed'], //Group of buttons to select
      selected: 0 //Button selected (Pending or Completed)
    };
  }

  static navigationOptions = ({navigation}) => {
    const requestUpdate = navigation.getParam("requestUpdate");
    const addButton = (
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('EditAdd', {title: "Add To-do", requestUpdate})}>
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
    this.props.navigation.setParams({requestUpdate: this._requestUpdate});
    //Request To-do's
    const getInfoJSON = Requests.getRequest();
    getInfoJSON.then(respJson => {
      //set state todos ad requested To-dos
      this.setState({todos: respJson.reverse()});
    }).catch(err => console.log(err));
  }

  //This method will be called when a to-do had a long press interaction
  //the modalShow state will change to true (showing the modal) and 
  //the selectedTodo state will be equal to the to-do that was pressed (displayed information)
  onShowModal = (todo) => {
    this.setState({
      modalShow: !this.state.modalShow,
      selectedTodo: todo
    });
  }

  //This method will be called when the user press on the exit or delete buttons in the modal
  //It will change the modalShow state to false (Hiding the modal)
  onHideModal = () => {
    this.setState({modalShow: !this.state.modalShow});
  }

  //This method will be called when the user press on the pending (0) or completed (1) buttons
  //If pending is selected, to-dos incompleted will be displayed
  //If completed is selected, to-dos completed will be displayed
  updateIndex = (selected) => {
    this.setState({selected});
  }

  //This method will be called when the user press on the left check icon in a to-do
  //It will change the to-do state from pending to completed and viceversa. 
  onCompleteTask = (todo) => {
    //Change to-do from pending to complete or viceversa
    todo.completed = !todo.completed;
    //Deconstruct to-do list
    const {_id, title, time, description, completed} = todo;
    //Request server to update to-do
    const putRequest = Requests.putRequest(_id, {title,time,description, completed});
    //Update to-do state
    this._requestUpdate(putRequest);
  }

  //This method will be called when the user press on the Delete button on the Modal
  //It will delete the selected To-do
  onDeleteTodo = (id) => {
    //Request server to delete to-do
    const deleteRequest = Requests.deleteRequest(id);
    //Update to-do state
    this._requestUpdate(deleteRequest);
    //Hide modal
    this.onHideModal();
  }

  //This method will be called every time we do a request to the server
  //It will update the to-do state and go to the home screen in case we are on other screen
  _requestUpdate = (request) => {
    //Any kind of request done to the server
    request.then(jsonResponse => {
      //Request To-do's
      const getRequest = Requests.getRequest();
      getRequest.then(respJson => {
        //Update state
        this.setState({todos: respJson.reverse()});
      }).then(() => {
        //If we are in other screen go to the Home screen
        this.props.navigation.navigate('Home')
      }).catch(err => console.log(err)); //Catch any error and print it into the console
    }).catch(err => console.log(err)); //Catch any error and print it into the console
  }

  render() {
    //Deconstruct states
    const { modalShow, todos, buttons, selected, selectedTodo } = this.state;
    //Get navigation props (React Navigation)
    const { navigation } = this.props;
    const progressBar = (<ProgressBarAndroid style={styles.progressBar}/>);

    return (
      <View>
        <LongPressModal 
          modalShow={modalShow} 
          onHideModal={this.onHideModal}
          selectedTodo={selectedTodo}
          onDeleteTodo={this.onDeleteTodo}
        />
        <ButtonGroupOptions 
          optionButtons={buttons} 
          onOptionChange={this.updateIndex} 
          selected={selected}
        />
        <ScrollView>
          {
            todos.length ? (
              <TodoList 
                todos={todos} 
                navigation={navigation} 
                selected={selected} 
                onShowModal={this.onShowModal}
                onCompleteTask={this.onCompleteTask}
              />
            ) : (
              progressBar
            )
          }
        </ScrollView>
      </View>
      
    );
  }
}

export default Home;