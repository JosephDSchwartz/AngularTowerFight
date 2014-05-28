function GameController($scope, playerService, cardService) {
	var players = playerService.getPlayers(),
		currentPlayer = players[0];

	$scope.player1 = players[0];
	$scope.player2 = players[1];
	$scope.canPlayCard = playerService.canPlayCard;

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

	$scope.playCard = function(card, $event) {
		if($scope.winner) {
			return;
		}
		
		if($event.altKey) {
			$scope.discardCard(card);
		}
		else if(playerService.canPlayCard(currentPlayer, card.playerEffects)) {
			takeTurn(currentPlayer, getPlayersOpponent(currentPlayer), card);
		}
	};

	$scope.resetGame = function() {
		playerService.resetService();
	};

	$scope.discardCard = function(card) {
		cardService.removeCard(card, currentPlayer.hand);
		currentPlayer.deck = cardService.addCardsToHand(1, currentPlayer.hand, currentPlayer.deck);
		endTurn();
	};

	currentPlayer.isActivePlayer = true;
};