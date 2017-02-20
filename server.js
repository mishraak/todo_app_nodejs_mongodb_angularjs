var express = require('express');
var app = express();

var mongojs = require('mongojs');
var db = mongojs('todolist',['todolist']);
var bodyParser = require('body-parser');


app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.get('/todolist', function(req, res){
	console.log("received a get req on todolist/");
	
	db.todolist.find(function(err, docs){
		//console.log(docs);
		res.json(docs);
	});
});
	
app.post('/todolist', function(req, res) {
	console.log(req.body);
	db.todolist.insert(req.body, function(err,docs) {
		res.json(docs);
	});
});

app.delete('/todolist/:id', function(req,res){
	console.log(req.params.id);
	var id = req.params.id;
	db.todolist.remove( {_id: mongojs.ObjectId(id)}, function(err, docs){
		res.json(docs);
	});
});


app.get('/todolist/:id', function(req, res) {
	console.log(req.params.id);
	var id = req.params.id;
	db.todolist.findOne({_id:mongojs.ObjectId(id)}, function(err,docs){
		res.json(docs);
	});	
});
app.put('/todolist/:id', function(req, res){
	var id = req.params.id; 
	console.log(req.body.category);
	db.todolist.findAndModify({query: {_id: mongojs.ObjectId(id)}, 
							  update: {$set: { category: req.body.category, description: req.body.description, duedate: req.body.duedate}}, 
							  new: true}, function(err,docs){ res.json(docs);})
	});


app.listen(3000);
console.log("server running on port 3000");
