const DOMAIN = "http://192.168.1.71:8080";
const API_URL = `${DOMAIN}/api/todos`;

const fetchHeaders = {
	'Accept': 'application/json', 
  'Content-Type': 'application/json'
};

var Requests = {

	getRequest: () => {
		return fetch(API_URL).then(resp => resp.json());
	},

	postRequest: (newTodo) => {
		const todoJSON = JSON.stringify(newTodo);
		const params = {
			method: 'POST',
			headers: fetchHeaders,
			body: todoJSON
		};
		return fetch(API_URL, params).then(resp => resp.json());
	},

	putRequest: (todoID, updatedTodo) => {
		const requestURL = `${API_URL}/${todoID}`;
		const todoJSON = JSON.stringify(updatedTodo);
		const params = {
			method: 'PUT',
			headers: fetchHeaders,
			body: todoJSON
		};
		return fetch(requestURL, params).then(resp => resp.json());
	},

	deleteRequest: (todoID) => {
		const requestURL = `${API_URL}/${todoID}`;
		const params = {
			method: 'DELETE'
		};
		return fetch(requestURL, params).then(resp => resp.json());
	}

};

export default Requests;
