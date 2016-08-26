var app = angular.module('myApp', []);

app.controller('MainCtrl', function ($scope) {

    $scope.resize = function(evt,ui) {
      //console.log (evt,ui);
      $scope.w = ui.size.width;
      $scope.h = ui.size.height;
		}

  });

app.directive('resizable', function () {

    return {
        restrict: 'A',
        scope: {
            callback: '&onResize'
        },
        link: function postLink(scope, elem, attrs) {
            elem.resizable();
            elem.on('resize', function (evt, ui) {
              scope.$apply(function() {
                if (scope.callback) { 
                  scope.callback({$evt: evt, $ui: ui }); 
                }                
              })
            });
        }
    };
  })

app.controller('myCtrl', GuessTheNumberController);

function GuessTheNumberController($scope)
{
	$scope.verifyGuess = function()
	{
		$scope.deviation = $scope.original - $scope.guess;
		$scope.noOfTries = $scope.noOfTries + 1;
		$scope.falseAnswer = $scope.deviaiton != 0;
	}
	$scope.initializeGame = function()
	{
		$scope.noOfTries = 0;
		$scope.original = Math.floor((Math.random() * 100) + 1);
		$scope.guess = null;
		$scope.deviation = null;
	}
	$scope.initializeGame();
}

app.controller('uploadController', UploadController);

function UploadController($scope, fileReader)
{
	console.log(fileReader);
	$scope.getFile = function()
	{
		$scope.progress = 0;
		fileReader.readAsDataUrl($scope.file, $scope)
			.then(function(result)
			{
				$scope.imageSrc = result;
			});
	};

	$scope.$on("fileProgress", function(e, progress)
	{
		$scope.progress = progress.loaded / progress.total;
	});

};

app.directive("ngFileSelect", function()
{

	return {
		link: function($scope, el)
		{

			el.bind("change", function(e)
			{

				$scope.file = (e.srcElement || e.target).files[0];
				$scope.getFile();
			})

		}

	}


})



