var myApp = angular.module('myApp', []);

myApp.controller('myCtrl', function($scope, $log) {
									
	var randomNum = Math.floor(Math.random() * 101);
	var hint = document.querySelector('#hint');
	var userGuess = document.querySelector('#guess');
	var submitGuess = document.querySelector('#submit');			
	
	$scope.submitGuess = function() {
		if ( userGuess > randomNum ) {
			hint.value === 'Lower';
		} else if ( userGuess < randomNum ) {
			hint.value == 'Higher';
		} else {
			hint.value == 'You got it';
		}
	};
	
	$scope.startGame = function() {	
		return randomNum;												
	};														
			
											
														
														
														
})