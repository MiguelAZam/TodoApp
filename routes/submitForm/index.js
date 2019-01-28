import React, {Component} from 'react';
import { StyleSheet, View, Switch, TextInput, ToastAndroid } from 'react-native';

import FieldContainer from './FieldContainer';
import ActionButton from './ActionButton';

const styles = StyleSheet.create({
  field: {
    flexDirection: 'row', 
    margin: 20
  },
  globalStyle: {
    fontSize: 20,
    padding: 15
  },
  label: {
    flex: 1,
    textAlign: "right"
  },
  textInput: {
    flex: 3,
    borderRadius: 5,
    borderWidth: 1,
    textAlignVertical: "top"
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

  submitTodo = () => {
  	let fetchUrl;
  	let fetchMethod;
  	const {id, title, time, description, completed} = this.state;
    const domain = 'http://192.168.1.71:8080'; //Write your domain
  	if(id === ''){
  		fetchUrl = `${domain}/api/todos`;
  		fetchMethod = 'POST';
  	} else{
  		fetchUrl = `${domain}/api/todos/${id}`;
  		fetchMethod = 'PUT';
  	}
  	const jsonBody = JSON.stringify({title, time, description, completed});
  	const params = {
  		method: fetchMethod, 
  		headers: {
  			'Accept': 'application/json', 
  			'Content-Type': 'application/json'
  		},
  		body: jsonBody
  	};
  	fetch(fetchUrl, params).then(resp => resp.json()).then(respJson => {
  		ToastAndroid.show(respJson.message, ToastAndroid.SHORT);
      this.props.navigation.navigate('Home');
  	}).catch(err => console.log(err));
  }

  deleteTodo = () => {
    const {id} = this.state;
    fetch(`http://192.168.1.71:8080/api/todos/${id}`, {method: "DELETE"}).then(resp => resp.json()).then(respJson => {
      ToastAndroid.show(respJson.message, ToastAndroid.SHORT);
      this.props.navigation.navigate('Home');
    }).catch(err => console.log(err));
  }

	render(){
		const {title, time, description, completed} = this.state;
		return(
			<View style={{padding:30}}>

        <FieldContainer title="Title:">
          <TextInput 
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
          <ActionButton color={{backgroundColor: "#EF233C"}} title="Delete" onPressAction={this.submitTodo}/>
          <ActionButton color={{backgroundColor: "#58B759"}} title="Submit" onPressAction={this.submitTodo}/>
        </FieldContainer>

			</View>
		);
	}

}

export default SubmitForm;