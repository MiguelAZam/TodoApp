import React, {Component} from 'react';
import { StyleSheet, View, Switch, TextInput, Text, TouchableOpacity, ToastAndroid } from 'react-native';

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
    borderColor: "#004E64",
    borderRadius: 5,
    borderWidth: 1,
    textAlignVertical: "top"
  },
  switchComp: {
    transform: [{scaleX: 1.5}, {scaleY: 1.5}]
  },
  touchableOp: {
    borderRadius: 5,
    flex: 1,
    margin: 15
  },
  submitButton: {
    backgroundColor: "#58B759"
  },
  deleteButton: {
    backgroundColor: "#EF233C"
  },
  textButton: {
    textAlign: "center",
    color: "#fff"
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

	static navigationOptions = {
    title: "Edit To-do\'s",
    headerStyle: {
      backgroundColor: '#004E64'
    },
    headerTintColor: '#fff'
  }

  componentDidMount(){
  	const { navigation } = this.props;
  	const todo = navigation.getParam("todo", "empty");
  	if(todo !== "empty"){
  		const {_id, title, time, description} = todo;
  		this.setState({id: _id, title, time, description});
  	}
  }

  submitTodo = () => {
  	let fetchUrl;
  	let fetchMethod;
  	const {id, title, time, description, completed} = this.state;
    const domain = ''; //Write your domain
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

        <View style={styles.field}>
          <Text style={[styles.label, styles.globalStyle]}>Title:</Text>
          <TextInput 
            style={[styles.textInput, styles.globalStyle]} 
            value={title} 
            onChangeText={title => this.setState({title})}
            placeholder="Title..."
          />
        </View>

        <View style={styles.field}>
          <Text style={[styles.label, styles.globalStyle]}>Deadline:</Text>
          <TextInput 
            style={[styles.textInput, styles.globalStyle]} 
            value={time} 
            onChangeText={time => this.setState({time})}
            placeholder="Deadline..."
          />
        </View>

        <View style={styles.field}>
          <Text style={[styles.label, styles.globalStyle]}>Description:</Text>
          <TextInput 
            style={[styles.textInput, styles.globalStyle]} 
            value={description} 
            onChangeText={description => this.setState({description})} 
            placeholder="Description..."
            multiline={true} 
            numberOfLines={7}
          />
        </View>

        <View style={styles.field}>
          <Text style={[styles.label, styles.globalStyle]}>Completed:</Text>
          <Switch 
            style={[styles.switchComp, styles.globalStyle]} 
            value={completed} 
            onValueChange={() => this.setState({completed: !completed})}
          />
        </View>

				<View style={styles.field}>
          <TouchableOpacity style={[styles.touchableOp, styles.deleteButton]} onPress={this.deleteTodo}>
            <Text style={[styles.globalStyle, styles.textButton]}>Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.touchableOp, styles.submitButton]} onPress={this.submitTodo}>
            <Text style={[styles.globalStyle, styles.textButton]}>Submit</Text>
          </TouchableOpacity>
        </View>

			</View>
		);
	}

}

export default SubmitForm;