var myApp = angular.module('myApp',[]);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
	console.log("Hello world from controller");
	

	
	
	var refresh = function(){
			$http.get('/todolist').success(function(res){
				console.log("got the data that was requested");
				$scope.todolist = res;
				$scope.todo = "";
			});
	};
	
	refresh();
	
	$scope.addTask = function(){
		console.log($scope.todo);
		$scope.todo._id="";
		$http.post('/todolist',$scope.todo).success(function(res){
			console.log(res);
			refresh();
		});
	};
	
	
	$scope.markDone = function(id){
		console.log(id);
		$http.delete('/todolist/' + id).success(function(res){
			console.log(res);
			refresh();
		});
	};
	
	$scope.editTask = function(id){
		$http.get('/todolist/' +id).success(function(res){
			console.log(res);
			$scope.todo = res;
		});
	};
	
	$scope.update = function(id){
		console.log($scope.todo._id);
		$http.put('/todolist/' + $scope.todo._id, $scope.todo).success(function(res){
			console.log(res);
			refresh();
		});
	}
	
}]);