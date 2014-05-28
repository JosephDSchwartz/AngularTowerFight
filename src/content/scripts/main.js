var app = angular.module('towerFight', []);

app.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/', {
		controller: 'GameController',
		templateUrl: 'views/Game.html'
	}).otherwise({redirectTo: '/'});
	$routeProvider.when('/instructions', {
		controller: 'InstructionsController',
		templateUrl: 'views/Instructions.html'
	});
}]);

app.factory('playerService', PlayerService);
app.factory('cardService', CardService);

app.directive('board', BoardDirective);