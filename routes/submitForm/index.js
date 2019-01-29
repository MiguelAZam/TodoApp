import React, {Component} from 'react';
import { StyleSheet, View, Switch, TextInput, ToastAndroid, ScrollView } from 'react-native';

import FieldContainer from './FieldContainer';
import ActionButton from './ActionButton';

import Requests from './../../Requests';

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
			id: '',
			title: '',
			time: '',
			description: '',
			completed: false
		};
	}

	static navigationOptions = ({navigation}) => {
    return {
      title: navigation.getParam("title"),
      headerStyle: {
        backgroundColor: '#004E64'
      },
      headerTintColor: '#fff'
    };
  }

  componentDidMount(){
  	const { navigation } = this.props;
  	const todo = navigation.getParam("todo", "empty");
  	if(todo !== "empty"){
  		const {_id, title, time, description, completed} = todo;
  		this.setState({id: _id, title, time, description, completed});
  	}
  }

  checkFields = () => {
    const {title, time, description} = this.state;
    let message = "";
    if(title === ''){
      message += "Title ";
    }
    if(time === ''){
      message += "Deadline ";
    }
    if(description === ''){
      message += "Description ";
    }
    return message;
  }

  submitTodo = () => {
    const {id, title, time, description, completed} = this.state;
    const submittedTodo = {title, time, description, completed};
    const error = this.checkFields();
    if(error !== ''){
      errorMessage = `Please fill the following fields: \n ${error}`;
      ToastAndroid.show(errorMessage, ToastAndroid.SHORT);
      return;
    }
    let request;
  	if(id === '' || id === undefined){
      request = Requests.postRequest(submittedTodo);
    } else{
      request = Requests.putRequest(id, submittedTodo);
    }
    const returnToHome = this.props.navigation.getParam("requestUpdate");
    returnToHome(request);
  }

  deleteTodo = () => {
    const {id, title, time, description, completed} = this.state;
    const submittedTodo = {title, time, description, completed};
    let request = Requests.deleteRequest(id, submittedTodo);
    
    const returnToHome = this.props.navigation.getParam("requestUpdate");
    returnToHome(request);
  }

	render(){
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