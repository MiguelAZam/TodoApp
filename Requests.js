const DOMAIN = "http://192.168.1.71:8080"; //Domain:port 
const API_URL = `${DOMAIN}/api/todos`;

//Headers for PUT and POST requests 
const fetchHeaders = {
	'Accept': 'application/json', 
  'Content-Type': 'application/json'
};

//Object of functions that will contain all the needed requests
//to the server
var Requests = {

	//GET: request data from server and convert it to json
	getRequest: () => {
		return fetch(API_URL).then(resp => resp.json());
	},

	//POST: Create a new todo list in the database
	//Convert response to JSON the json will contain
	//A successful message or an error (debug)
	postRequest: (newTodo) => {
		//Convert new todo to JSON
		const todoJSON = JSON.stringify(newTodo);
		//Define method, headers and body to send to the server
		const params = {
			method: 'POST',
			headers: fetchHeaders,
			body: todoJSON
		};
		return fetch(API_URL, params).then(resp => resp.json());
	},

	//PUT: Update a todo in the database identified by its ID
	//Convert response to JSON the json will contain
	//A successful message or an error (debug)
	putRequest: (todoID, updatedTodo) => {
		//Build URL to request PUT
		const requestURL = `${API_URL}/${todoID}`;
		//Convert data to JSON
		const todoJSON = JSON.stringify(updatedTodo);
		//Define method, headers and body to send to the server
		const params = {
			method: 'PUT',
			headers: fetchHeaders,
			body: todoJSON
		};
		return fetch(requestURL, params).then(resp => resp.json());
	},

	//DELETE: DELETE a todo in the database identified by its ID
	//Convert response to JSON the json will contain
	//A successful message or an error (debug)
	deleteRequest: (todoID) => {
		//Build URL to request DELETE
		const requestURL = `${API_URL}/${todoID}`;
		//Define method
		const params = {
			method: 'DELETE'
		};
		return fetch(requestURL, params).then(resp => resp.json());
	}

};

export default Requests;
