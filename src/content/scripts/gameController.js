function GameController(playerService, cardService, $scope) {
	var players,
		currentPlayer;

	function setupController(newGame) {
		players = playerService.getPlayers();
		currentPlayer = players[0];
		$scope.player1 = players[0];
		$scope.player2 = players[1];
		$scope.canPlayCard = playerService.canPlayCard;
		$scope.showBoards = !newGame;
		$scope.winner = undefined;
		$scope.discardedText = '';
		currentPlayer.isActivePlayer = true;
	}

	function getPlayersOpponent(player) {
		return player == players[0] ? players[1] : players[0];
	};

	function decideWinner() {
		$scope.winner = playerService.getWinner();
		return $scope.winner;
	};

	function endTurn() {
		if(decideWinner()) {
			return;
		}

		playerService.incrementResources(currentPlayer);
		currentPlayer.isActivePlayer = false;
		currentPlayer = getPlayersOpponent(currentPlayer);
		currentPlayer.isActivePlayer = true;
	};

	function takeTurn(player, opponent, card) {
		playerService.updatePlayer(player.number, card.playerEffects);
		playerService.updatePlayer(opponent.number, card.opponentEffects);
		cardService.removeCard(card, currentPlayer.hand);
		currentPlayer.deck = cardService.addCardsToHand(1, currentPlayer.hand, currentPlayer.deck);
		endTurn();
	};

	$scope.submitName = function() {
		if($scope.playerName) {
			$scope.player1.name = $scope.playerName;
			$scope.playerName = '';
			$scope.showBoards = true;
		}
	};

	$scope.playCard = function(card, $event) {
		if($scope.winner) {
			return;
		}
		
		if($event.altKey) {
			currentPlayer.lastCardPlayed = card;
			currentPlayer.lastCardPlayed.wasDiscarded = true;
			$scope.discardCard(card);
		}
		else if(playerService.canPlayCard(currentPlayer, card.playerEffects)) {
			$scope.discardedText = '';
			currentPlayer.lastCardPlayed = card;
			takeTurn(currentPlayer, getPlayersOpponent(currentPlayer), card);
		}
	};

	$scope.resetGame = function($event) {
		$event.preventDefault();
		var currentName = $scope.player1.name;
		playerService.resetService();
		setupController(false);
		$scope.player1.name = currentName;
	};

	$scope.discardCard = function(card) {
		cardService.removeCard(card, currentPlayer.hand);
		currentPlayer.deck = cardService.addCardsToHand(1, currentPlayer.hand, currentPlayer.deck);
		endTurn();
	};

	setupController(true);
};