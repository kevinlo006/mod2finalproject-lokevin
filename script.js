//game properties
class BattleGame {
	constructor() {
	  this.playerScore = 0;
	  this.computerScore = 0;
	  this.moves = 0;
	  this.disabledOptions = [];
	  this.playerOptions = document.querySelectorAll('.options button');
	  this.computerOptions = ['rock', 'paper', 'scissors', 'lizard', 'spock'];
	  this.initializeGame();
	}

	//disable options if player lost in the previous round
	disableButtons() {
	  this.playerOptions.forEach(option => {
		if (this.disabledOptions.includes(option.dataset.option)) {
		  option.disabled = true;
		} else {
		  option.disabled = false;
		}
	  });
	}
  
	//game function
	playGame() {
	  this.playerOptions.forEach(option => {
		option.addEventListener('click', () => {
			//alert if player option was lost last round
			if (this.disabledOptions.includes(option.dataset.option)) {
			alert("You cannot choose this option because it has fainted in battle");
			return;
		  }

		  //moves counter
		  const movesLeft = document.querySelector('.movesleft');
		  this.moves++;
		  movesLeft.innerText = `Moves Left: ${5 - this.moves}`;
		  //how cpu chooses
		  const choiceNumber = Math.floor(Math.random() * 5);
		  const computerChoice = this.computerOptions[choiceNumber];
		  //how winner is decided
		  this.determineWinner(option.innerText.toLowerCase(), computerChoice);
		  //total moves=5
		  if (this.moves === 5) {
			this.gameOver();
		  }
		});
		this.disableButtons();
	  });
	}
  
	//how winner is determined
	//score counter
	determineWinner(player, computer) {
		const result = document.querySelector('.result');
		const playerScoreBoard = document.querySelector('.p-count');
		const computerScoreBoard = document.querySelector('.c-count');
		
		player = player.toLowerCase();
		computer = computer.toLowerCase();
	
		if (player === computer) {
		  result.textContent = 'Tie';
		} else {
		  const winConditions = {
			rock: ['scissors', 'lizard'],
			paper: ['rock', 'spock'],
			scissors: ['paper', 'lizard'],
			lizard: ['spock', 'paper'],
			spock: ['scissors', 'rock'],
		  };
	
		  if (winConditions[player].includes(computer)) {
			result.textContent = 'Player Won';
			this.playerScore++;
			playerScoreBoard.textContent = this.playerScore;
		  } else {
			result.textContent = 'Computer Won';
			this.computerScore++;
			computerScoreBoard.textContent = this.computerScore;
			this.disabledOptions.push(player);
		  }
		}
	  }
  
	  //game over screen
	  gameOver() {
		const chooseMove = document.querySelector('.move');
		const result = document.querySelector('.result');
		const reloadBtn = document.querySelector('.reload');
		const movesLeft = document.querySelector('.movesleft');
		
		//hides options buttons
		this.playerOptions.forEach(option => {
		  option.style.display = 'none';
		});
	
		//shows win,lose,draw
		chooseMove.innerText = '!!Game Over!!';
		movesLeft.style.display = 'none';

		if (this.playerScore > this.computerScore) {
		  result.style.fontSize = '5rem';
		  result.innerText = 'Winner Winner Chicken Dinner';
		  result.style.color = 'green';
		} else if (this.playerScore < this.computerScore) {
		  result.style.fontSize = '5rem';
		  result.innerText = 'Fatality';
		  result.style.color = 'red';
		} else {
		  result.style.fontSize = '5rem';
		  result.innerText = 'Tie';
		  result.style.color = 'grey';
		}
	
		//restart button to reload webpage
		reloadBtn.innerText = 'Restart';
		reloadBtn.style.display = 'flex';
		reloadBtn.addEventListener('click', () => {
		  window.location.reload();
		});
	  }
	
	//initialize game
	initializeGame() {
	  this.playGame();
	}
  }
  
  
  //game
  const game = new BattleGame();

  