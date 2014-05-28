function BoardDirective() {
	return {
		restrict: 'E',
		scope: { 
			player: '=',
			cardIsPlayable: '&',
			play: '&'
		},
		templateUrl: 'views/BoardTemplate.html',
	};
};