var app = angular.module('myApp', [])

.controller('myCtrl', GuessTheNumberController);
	
function GuessTheNumberController($scope) {
	$scope.verifyGuess = function () {
		$scope.deviation = $scope.original - $scope.guess;
		$scope.noOfTries = $scope.noOfTries + 1;
		$scope.falseAnswer = $scope.deviaiton != 0;
	}
	$scope.initializeGame = function () {
		$scope.noOfTries = 0;
		$scope.original = Math.floor((Math.random() * 100) + 1);
		$scope.guess = null;
		$scope.deviation = null;
	}
	$scope.initializeGame();
}