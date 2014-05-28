function PlayerService(cardService) {
	var defaultStats = {
		towerHealth: 30,
		wallHealth: 15,
		generators: 1,
		mines: 1,
		barracks: 1,
		alchemy: 15,
		stones: 15,
		minions: 15
	},
		player1,
		player2,
		players;

	function setupService() {
		player1 = {
			number: 0,
			name: "Player 1",
			towerHealth: defaultStats.towerHealth,
			wallHealth: defaultStats.wallHealth,
			generators: defaultStats.generators,
			mines: defaultStats.mines,
			barracks: defaultStats.barracks,
			alchemy: defaultStats.alchemy,
			stones: defaultStats.stones,
			minions: defaultStats.minions
		};
		player2 = {
			number: 1,
			name: "Player 2",
			towerHealth: defaultStats.towerHealth,
			wallHealth: defaultStats.wallHealth,
			generators: defaultStats.generators,
			mines: defaultStats.mines,
			barracks: defaultStats.barracks,
			alchemy: defaultStats.alchemy,
			stones: defaultStats.stones,
			minions: defaultStats.minions
		};
		players = [];

		player1Result = cardService.drawCards(5);
		player2Result = cardService.drawCards(5);
		player1.deck = player1Result.deck;
		player1.hand = player1Result.cards;
		player2.deck = player2Result.deck;
		player2.hand = player2Result.cards;

		players.push(player1);
		players.push(player2);
	};

	function meetsWinningCriteria(player) {
		return player.towerHealth >= 100;
	};

	function meetsLosingCriteria(player) {
		return player.towerHealth <= 0;
	};

	function playerHasWon(player, opponent) {
		return meetsWinningCriteria(player) || meetsLosingCriteria(opponent);
	}

	function keepPlayerValuesValid(player) {
		// Set the wall to 0 and apply damage to tower.
		if (player.wallHealth < 0 ) {
			player.towerHealth += player.wallHealth;
			player.wallHealth = 0;
		}

		// Make sure resource levels aren't lower than 0
		if (player.alchemy < 0) {
			player.alchemy = 0;
		}
		if (player.stones < 0) {
			player.stones = 0;
		}
		if (player.minions < 0) {
			player.minions = 0;
		}

		// Make sure resource generators aren't lower than 1
		if (player.generators <= 0) {
			player.generators = 1;
		}
		if (player.mines <= 0) {
			player.mines = 1;
		}
		if (player.barracks <= 0) {
			player.barracks = 1;
		}
	}

	var updatePlayer = function(playerNumber, effects) {
		var player = players[playerNumber],
			effect;

		for(effect in effects) {
			player[effect] += effects[effect];
		}

		keepPlayerValuesValid(player);
	};

	var getPlayer = function(playerNumber) {
		return players[playerNumber];
	};

	var getPlayers = function() {
		return players;
	};

	var getWinner = function() {
		return playerHasWon(player1, player2) ? player1 : playerHasWon(player2, player1) ? player2 : undefined;
	};

	var incrementResources = function(player) {
		player.alchemy += player.generators;
		player.stones += player.mines;
		player.minions += player.barracks;
	};

	var canPlayCard = function(player, cardEffects) {
		return (isNaN(cardEffects.alchemy) || player.alchemy + cardEffects.alchemy >= 0) &&
			(isNaN(cardEffects.stones) || player.stones + cardEffects.stones >= 0) &&
			(isNaN(cardEffects.minions) || player.minions + cardEffects.minions >= 0);
	};

	var resetService = function() {
		setupService();
	};

	// Set up the service for the first time
	setupService();

	return {
		getPlayers: getPlayers,
		getPlayer: getPlayer,
		updatePlayer: updatePlayer,
		getWinner: getWinner,
		resetService: resetService,
		incrementResources: incrementResources,
		canPlayCard: canPlayCard
	};
};