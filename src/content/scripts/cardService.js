function CardService() {
	var defaultDeck = [
		/* Alchemy cost */
		{ name: "Eye of a newt", playerEffects: { towerHealth: 2, alchemy: -1 }, opponentEffects: { }, description: '+2 tower.' },
		{ name: "False gold", playerEffects: { towerHealth: 3, alchemy: -4 }, opponentEffects: { }, description: '+3 tower.' },
		{ name: "Magic flood", playerEffects: { alchemy: -7 }, opponentEffects: { mines: -1, minions: -5 }, description: '-1 enemy mines and -5 minions.' },
		{ name: "Gem of power", playerEffects: { towerHealth: 3, alchemy: -6 }, opponentEffects: { towerHealth: -2 }, description: '+3 tower. -2 enemy tower.' },
		{ name: "Secret ingredient", playerEffects: { towerHealth: 5, alchemy: -8 }, opponentEffects: { }, description: '+5 tower.' },
		{ name: "Sorcerers ring", playerEffects: { towerHealth: 5, alchemy: -11 }, opponentEffects: { towerHealth: -5 }, description: '+5 tower. -5 enemy tower.' },
		{ name: "Emerald", playerEffects: { towerHealth: 8, alchemy: -10 }, opponentEffects: { }, description: '+8 tower.' },
		{ name: "Blood diamond", playerEffects: { towerHealth: 15, alchemy: -7, minions: -10 }, opponentEffects: { }, description: '+15 tower.' },
		{ name: "Dragon\'s blood", playerEffects: { towerHealth: 20, alchemy: -25 }, opponentEffects: { }, description: '+20 tower.' },

		/* Stone cost */
		{ name: "Small wall", playerEffects: { wallHealth: 3, stones: -4 }, opponentEffects: { }, description: '+3 wall.' },
		{ name: "Wall spikes", playerEffects: { wallHealth: 3, stones: -5 }, opponentEffects: { wallHealth: -2 }, description: 'Reinforce your walls with spikes.  +3 wall, -2 to opponent\'s wall.' },
		{ name: "Improved wall", playerEffects: { wallHealth: 4, stones: -5 }, opponentEffects: { }, description: '+4 wall.' },
		{ name: "A pretty normal wall", playerEffects: { wallHealth: 5, stones: -7 }, opponentEffects: { }, description: '+5 wall.' },
		{ name: "Reinforce wall", playerEffects: { wallHealth: 8, stones: -10 }, opponentEffects: { }, description: '+8 wall.' },
		{ name: "Rock golems", playerEffects: { towerHealth: 5, wallHealth: 10, mines: 1, stones: -20, alchemy: -5 }, opponentEffects: { towerHealth: -5, wallHealth: -10 }, description: 'You get +10 wall and +5 tower.  Opponent loses 10 wall and 5 tower.' },
		{ name: "Nice lookin\' wall ya got there", playerEffects: { wallHealth: 15, stones: -18 }, opponentEffects: { }, description: '+15 wall.' },
		{ name: "Heart of stone", playerEffects: { wallHealth: 20, towerHealth: 10, stones: -30 }, opponentEffects: { }, description: '+20 wall and +10 tower.' },

		/* Minion cost */
		{ name: "Human infantry", playerEffects: { minions: -2 }, opponentEffects: { wallHealth: -2 }, description: '-2 enemy wall.' },
		{ name: "Dwarf infantry", playerEffects: { minions: -4 }, opponentEffects: { wallHealth: -3 }, description: '-3 enemy wall.' },
		{ name: "Elf archers", playerEffects: { minions: -5 }, opponentEffects: { wallHealth: -6 }, description: '-6 enemy wall.' },
		{ name: "Sneaky gremlins", playerEffects: { minions: -7 }, opponentEffects: { towerHealth: -3, barracks: -1 }, description: 'These little gremlins evade your opponent\'s defenses and attack their tower directly. -3 enemy tower and -1 to barracks.' },
		{ name: "Plague of frogs", playerEffects: { minions: -8 }, opponentEffects: { wallHealth: -4, minions: -5 }, description: '-4 enemy wall and enemy loses 5 minions.' },
		{ name: "Guerilla warfare", playerEffects: { minions: -8 }, opponentEffects: { wallHealth: -8 }, description: '-8 enemy wall.' },
		{ name: "Hand of judgement", playerEffects: { minions: -11 }, opponentEffects: { wallHealth: -10 }, description: '-10 enemy wall.' },
		{ name: "Knights of the Round", playerEffects: { minions: -15 }, opponentEffects: { wallHealth: -12 }, description: '-12 enemy wall.' },
		{ name: "Dragon", playerEffects: { minions: -25 }, opponentEffects: { wallHealth: -20 }, description: '-20 enemy wall.' },
		{ name: "Exodia", playerEffects: { minions: -100, alchemy: -100, stones: -100 }, opponentEffects: { towerHealth: -100 }, description: '-100 enemy tower.  Exodia, OBLITERATE!' },

		/* Degrade resources */
		{ name: "Power syphon", playerEffects: { alchemy: 5 }, opponentEffects: { generators: -1 }, description: '+5 alchemy. -1 enemy generators.' },
		{ name: "Collapse!", playerEffects: { stones: -2 }, opponentEffects: { mines: -1 }, description: '-1 enemy mines.' },
		{ name: "Poison the supplies", playerEffects: { minions: -2 }, opponentEffects: { barracks: -1 }, description: '-1 enemy barracks.' },

		/* Improved resources */
		{ name: "Backup generator", playerEffects: { generators: 1 }, opponentEffects: { }, description: '+1 generator.' },
		{ name: "Super generator", playerEffects: { generators: 2, alchemy: -5 }, opponentEffects: { }, description: '+2 generators.' },
		{ name: "Skillful miners", playerEffects: { mines: 1 }, opponentEffects: { }, description: '+1 mine.' },
		{ name: "Hidden mine", playerEffects: { mines: 2, stones: -5 }, opponentEffects: { }, description: '+2 mines.' },
		{ name: "Renovations", playerEffects: { barracks: 1 }, opponentEffects: { }, description: '+1 barracks.' },
		{ name: "Expanded influence", playerEffects: { barracks: 2, stones: -6 }, opponentEffects: { }, description: '+2 barracks.' },
		{ name: "Sacrifice", playerEffects: { towerHealth: -10, wallHealth: -5, generators: 1, mines: 1, barracks: 1 }, description: 'You sacrifice yourself for increased assets.  +1 generator, mines, and barracks.  -10 to tower and -5 to wall.' }
	];

	function shuffle(array) {
	  var currentIndex = array.length
	    , temporaryValue
	    , randomIndex
	    ;

	  // While there remain elements to shuffle...
	  while (0 !== currentIndex) {

	    // Pick a remaining element...
	    randomIndex = Math.floor(Math.random() * currentIndex);
	    currentIndex -= 1;

	    // And swap it with the current element.
	    temporaryValue = array[currentIndex];
	    array[currentIndex] = array[randomIndex];
	    array[randomIndex] = temporaryValue;
	  }

	  return array;
	};

	var drawCards = function(numOfCards, deck) {
		var i = 0, cards = [], deck = deck || [];

		for(i; i < numOfCards; i++) {
			if(!deck.length) {
				deck = getNewDeck();
			}

			cards.push(deck.pop());
		}

		return { deck: deck, cards: cards };
	};

	var addCardsToHand = function(numOfCards, hand, deck) {
		var result = drawCards(numOfCards, deck),
			i = 0;

		for(i; i < result.cards.length; i++) {
			hand.push(result.cards[i]);
		}

		return result.deck;
	};

	var removeCard = function(card, cards) {
		var index = cards.indexOf(card);

		if(index > -1) {
			cards.splice(index, 1);
		}
	};

	var getNewDeck = function() {
		return shuffle(JSON.parse(JSON.stringify(defaultDeck)));
	};

	return {
		drawCards: drawCards,
		addCardsToHand: addCardsToHand,
		removeCard: removeCard,
		getNewDeck: getNewDeck
	};
};