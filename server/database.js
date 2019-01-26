const mongoose = require('mongoose'); //Library for MongoDB
//Local database to interact with
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true});

//Model for to-dos
const Todos = mongoose.model('Todos', {
	title: String,
	time: String,
	description: String,
	completed: Boolean
});

module.exports = Todos;