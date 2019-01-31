var express = require('express');
var bodyParser = require('body-parser');
var todosModel  = require('./database');

var app = express();

const port = 8080; //Port that will use the server

//Configure app to use bodyParser and allow us 
//to POST and PUT
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Start of API Routes
var router = express.Router();

//Middleware to use for all request
router.use((rep, res, next) => {
	console.log("Request was sent!");
	next();
});

//Testing route
router.get('/', (req, res) =>{
  res.json({message: "To-do API."});
});

//Create a to-do (POST)
router.route('/todos').post((req, res) => {
	
	if(Object.keys(req.body).length === 4) {
		//Deconstruct body to get title, time, description and if the task is completed
		const {title, time, description, completed} = req.body;
		//Create a new To-do model
		var todos = new todosModel({title, time, description, completed});
		//Save it into the database
		todos.save(err => {
			//If there was an error saving it, send it. Otherwise, send a confirmation message
			err ? res.send(err) : res.json({message: 'To-do created!'});
		});	
	} else{
		res.json({error: "Body is empty in one of the required keys. Required keys: Title, Time, Description, Completed."});
	}
	
})
//GET To-do's from database
.get((req, res) => {
	//Retrieve information from the database
	todosModel.find((err, todos) => {
		//If there was an error getting the information, send it. Otherwise, send a confirmation message
		err ? res.send(err) : res.json(todos);
	});
});

//UPDATE To-do with ID
router.route('/todos/:todoID').put((req, res) => {
	//Find To-do identified by ID
	todosModel.findById(req.params.todoID, (err, todo) => {
		//If To-do with especified ID wasn't found, send error.
		if(err){
			res.send(err);
		}
		//Otherwise, add new values to the To-do
		const {title, time, description, completed} = req.body;
		todo.title = title;
		todo.time = time;
		todo.description = description;
		todo.completed = completed;
		
		//Save it into the database
		todo.save(err => {
			//If there was an error saving it, send it. Otherwise, send a confirmation message
			err ? res.send(err) : res.json({message: 'To-do updated!'});
		});
	});
})
//DELETE To-do by ID
.delete((req,res) => {
	//Delete To-do in database identified by ID
	todosModel.remove({_id:req.params.todoID}, (err, todo) => {
		//If there was an error deleting it, send it. Otherwise, send a confirmation message
		err ? res.send(err) : res.json({message: 'To-do successfully deleted!'});
	})
});

//Register routes
app.use('/api', router);



app.listen(port);