import React, {Component} from 'react';
import { StyleSheet, View, Switch, TextInput, ToastAndroid, ScrollView } from 'react-native';

//Components
import FieldContainer from './FieldContainer';
import ActionButton from './ActionButton';

//Requests to interact with the server
import Requests from './../../Requests';

//Styles
const styles = StyleSheet.create({
  globalStyle: {
    fontSize: 16
  },
  label: {
    flex: 1,
    textAlign: "right"
  },
  textInput: {
    flex: 3,
    borderRadius: 5,
    borderWidth: 1,
    textAlignVertical: "top",
    padding: 10
  },
  switchComp: {
    transform: [{scaleX: 1.5}, {scaleY: 1.5}]
  }
});

class SubmitForm extends Component{

	constructor(props){
		super(props);
		this.state = {
			id: '', //To-do ID
			title: '', //To-do Title
			time: '', //To-do Time/Deadline
			description: '', //To-do Description
			completed: false //Is To-do completed?
		};
	}

	static navigationOptions = ({navigation}) => {
    return {
      title: navigation.getParam("title"), //Get title Add or Edit
      headerStyle: {
        backgroundColor: '#004E64'
      },
      headerTintColor: '#fff'
    };
  }

  componentDidMount(){
    //Get To-do
  	const { navigation } = this.props;
  	const todo = navigation.getParam("todo", "empty");
    //If To-do is not empty (We are editing a To-do)
  	if(todo !== "empty"){
      //Update states of the submit form
  		const {_id, title, time, description, completed} = todo;
  		this.setState({id: _id, title, time, description, completed});
  	}
    //Otherwise, we are creating a To-do
  }

  //This method will be called when the user decide to press on the submit button
  //It will check if all the fields are filled
  checkFields = () => {
    const {title, time, description} = this.state;
    let message = "";
    if(title === ''){ //Title is missing
      message += "Title ";
    }
    if(time === ''){ //Deadline/Time is missing
      message += "Deadline ";
    }
    if(description === ''){ //Description is missing
      message += "Description ";
    }
    return message;
  }

  submitTodo = () => {
    //Deconstruct state
    const {id, title, time, description, completed} = this.state;
    const submittedTodo = {title, time, description, completed};
    //Check if there are empty fields
    const error = this.checkFields();
    //If there are empty fields
    if(error !== ''){
      //Send an error message to the user specifying the missing fields
      errorMessage = `Please fill the following fields: \n ${error}`;
      ToastAndroid.show(errorMessage, ToastAndroid.SHORT);
      return;
    }
    //Otherwise, make the request
    let request;
    //If id is empty, we are adding a new To-do
  	if(id === '' || id === undefined){
      request = Requests.postRequest(submittedTodo);
    //Otherwise, we are updating a To-do
    } else{
      request = Requests.putRequest(id, submittedTodo);
    }

    //Update To-do state of Home screen and return to Home screen
    const returnToHome = this.props.navigation.getParam("requestUpdate");
    returnToHome(request);
  }

  //This method will be called when the user is editing a to-do and press on the delete button
  //It will delete the To-do, update the To-do state in Home screen and redirect the user to the Home screen
  deleteTodo = () => {
    //Deconstruct state
    const {id, title, time, description, completed} = this.state;
    const submittedTodo = {title, time, description, completed};
    //Delete To-do identified by id
    let request = Requests.deleteRequest(id, submittedTodo);
    
    //Update To-do state of Home screen and return to Home screen
    const returnToHome = this.props.navigation.getParam("requestUpdate");
    returnToHome(request);
  }

	render(){
    //Deconstruct state
		const {id, title, time, description, completed} = this.state;
		return(
			<ScrollView style={{padding:10}}>

        <FieldContainer title="Title:">
          <TextInput 
            autoFocus={true}
            style={[styles.textInput, styles.globalStyle]} 
            value={title} 
            onChangeText={title => this.setState({title})}
            placeholder="Title..."
          />
        </FieldContainer>

        <FieldContainer title="Deadline:">
          <TextInput 
            style={[styles.textInput, styles.globalStyle]} 
            value={time} 
            onChangeText={time => this.setState({time})}
            placeholder="Deadline..."
          />
        </FieldContainer>

        <FieldContainer title="Description:">
          <TextInput 
            style={[styles.textInput, styles.globalStyle]} 
            value={description} 
            onChangeText={description => this.setState({description})} 
            placeholder="Description..."
            multiline={true} 
            numberOfLines={7}
          />
        </FieldContainer>

        <FieldContainer title="Completed:">
          <Switch 
            style={[styles.switchComp, styles.globalStyle]} 
            value={completed} 
            onValueChange={() => this.setState({completed: !completed})}
          />
        </FieldContainer>

				<FieldContainer>
          {id === '' || id === undefined ? null : <ActionButton color={{backgroundColor: "#EF233C"}} title="Delete" onPressAction={this.deleteTodo}/>}
          <ActionButton color={{backgroundColor: "#58B759"}} title="Submit" onPressAction={this.submitTodo}/>
        </FieldContainer>

			</ScrollView>
		);
	}

}

export default SubmitForm;