let playerOneMoveOneType;
let playerOneMoveTwoType;
let playerOneMoveThreeType;
let playerOneMoveOneValue;
let playerOneMoveTwoValue;
let playerOneMoveThreeValue;

let playerTwoMoveOneType;
let playerTwoMoveTwoType;
let playerTwoMoveThreeType;
let playerTwoMoveOneValue;
let playerTwoMoveTwoValue;
let playerTwoMoveThreeValue;

const P1 = 'Player One';
const P2 = 'Player Two';
const TIE = 'tie';
const ROCK = 'rock';
const PAPER = 'paper';
const SCISSORS = 'scissors';


const setPlayerMoves = (player, m1t, m1v, m2t, m2v, m3t, m3v) => {

	if (!m1t || !m1v || !m2t || !m2v || !m3t || !m3v) {
		return;
	}

	if (!validTypes (m1t, m2t, m3t)) {
		return;
	}

	if (!validValues (m1v, m2v, m3v)) {
		return;
	}

	switch (player) {
		case P1:
			m1t = playerOneMoveOneType;
			m1v = playerOneMoveOneValue;
			m2t = playerOneMoveTwoType;
			m2v = playerOneMoveTwoValue;
			m3t = playerOneMoveThreeType;
			m3v = playerOneMoveThreeValue;
			break;

		case P2:
			m1t = playerTwoMoveOneType;
			m1v = playerTwoMoveOneValue;
			m2t = playerTwoMoveTwoType;
			m2v = playerTwoMoveTwoValue;
			m3t = playerTwoMoveThreeType;
			m3v = playerTwoMoveThreeValue;
			break;
	}
};

}

/////////////////////////////////////////

// const setPlayerMoves = (player, m1t, m1v, m2t, m2v, m3t, m3v) => {
	
// 	if (!m1t || !m1v || !m2t || !m2v || !m3t || !m3v) {
// 		return;
// 	}

// 	if (!validTypes (m1t, m2t, m3t)) {
// 		return;
// 	}

// 	if (!validValues (m1v, m2v, m3v)) {
// 		return;
// 	}

// 	switch (player) {
// 		case P1:
// 			m1t = playerOneMoveOneType;
// 			m1v = playerOneMoveOneValue;
// 			m2t = playerOneMoveTwoType;
// 			m2v = playerOneMoveTwoValue;
// 			m3t = playerOneMoveThreeType;
// 			m3v = playerOneMoveThreeValue;
// 			break;

// 		case P2:
// 			m1t = playerTwoMoveOneType;
// 			m1v = playerTwoMoveOneValue;
// 			m2t = playerTwoMoveTwoType;
// 			m2v = playerTwoMoveTwoValue;
// 			m3t = playerTwoMoveThreeType;
// 			m3v = playerTwoMoveThreeValue;
// 			break;
// 	}
// };

// const validTypes = (t1, t2, t3) => validType(t1) && validType(t2) && validType(t3);

// const validType = (type) => type === rock || type === paper || type === scissors;

// const getRoundWinner = round => {
// 	let p1t;
// 	let p1v;
// 	let p2t;
// 	let p2v;

// 	switch (round) {
// 		case 1:
// 			p1t = playerOneMoveOneType;
// 			p1v = playerOneMoveOneValue;
// 			p2t = playerTwoMoveOneType;
// 			p2v = playerTwoMoveOneValue;
// 			break;

// 		case 2:
// 			p1t = playerOneMoveTwoType;
// 			p1v = playerOneMoveTwoValue;
// 			p2t = playerTwoMoveTwoType;
// 			p2v = playerTwoMoveTwoValue;
// 			break;

// 		case 2:
// 			p1t = playerOneMoveThreeType;
// 			p1v = playerOneMoveThreeValue;
// 			p2t = playerTwoMoveThreeType;
// 			p2v = playerTwoMoveThreeValue;
// 			break;
// 	}
// };

// function getRoundWinner () {
// 	return undefined;
// }

// function getGameWinner () {
// 	return undefined;
// }