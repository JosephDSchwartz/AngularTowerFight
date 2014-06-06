function BoardDirective() {
	return {
		restrict: 'E',
		scope: { 
			player: '=',
			showBoard: '=',
			cardIsPlayable: '&',
			play: '&'
		},
		templateUrl: 'views/BoardTemplate.html',
	};
};