class Game {
    constructor() {
        this.board = new Board();
        this.players = this.createPlayers();
        this.ready = false;
    }

	get activePlayer() {
        return this.players.find(player => player.active);
	}

    createPlayers() {
        const players = [new Player('Player 1', 1, '#D9534F', true),
                         new Player('Player 2', 2, '#F0AD4E')];
        return players;
    }

    startGame(){
        this.board.drawHTMLBoard();
        this.activePlayer.activeToken.drawHTMLToken();
        this.ready = true;
    }

	handleKeydown(e) {
        if (this.ready) {
            if (e.key === "ArrowLeft") {
                this.activePlayer.activeToken.moveLeft();
            } else if (e.key === "ArrowRight") {
                this.activePlayer.activeToken.moveRight(this.board.columns);
            } else if (e.key === "ArrowDown") {
                this.playToken();
            }
        }
    }

    playToken(){
        let spaces = this.board.spaces;
        let activeToken = this.activePlayer.activeToken;
        let targetColumn = spaces[activeToken.columnLocation];
        let targetSpace = null;

		for (let space of targetColumn) {
			if (space.token === null) {
				targetSpace = space;
			}
        }

        if (targetSpace !== null) {
			const game = this;
            game.ready = false;

    		activeToken.drop(targetSpace, function(){
                game.updateGameState(activeToken, targetSpace);           
    		});  
        }              
    }

    updateGameState(token, target) {
		target.mark(token);

        if (!this.checkForWin(target)) {
            console.log('no win');
			this.switchPlayers();
            
            if (this.activePlayer.checkTokens()) {
                this.activePlayer.activeToken.drawHTMLToken();
                this.ready = true;
            } else {
                this.gameOver('No more tokens');
            }
        } else {
			console.log('win');
            this.gameOver(`${target.owner.name} wins! Congratulations!!!`)
        }			
    }

    checkForWin(target){
    	const owner = target.token.owner;
    	let win = false;
		console.log('checkforwin called');

    	for (let x = 0; x < this.board.columns; x++ ){
            for (let y = 0; y < this.board.rows - 3; y++){
				console.log(x,y);
				console.log(y+1);
				console.log(y+2);
				console.log(y+3);
                if (this.board.spaces[x][y].owner === owner && 
    				this.board.spaces[x][y+1].owner === owner && 
    				this.board.spaces[x][y+2].owner === owner && 
    				this.board.spaces[x][y+3].owner === owner) {
                    	win = true;
						console.log(win);
                }           
            }
        }

    	for (let x = 0; x < this.board.columns - 3; x++ ){
            for (let y = 0; y < this.board.rows; y++){
                if (this.board.spaces[x][y].owner === owner && 
    				this.board.spaces[x+1][y].owner === owner && 
    				this.board.spaces[x+2][y].owner === owner && 
    				this.board.spaces[x+3][y].owner === owner) {
                    	win = true;
                }           
            }
        }

    	for (let x = 3; x < this.board.columns; x++ ){
            for (let y = 0; y < this.board.rows - 3; y++){
                if (this.board.spaces[x][y].owner === owner && 
    				this.board.spaces[x-1][y+1].owner === owner && 
    				this.board.spaces[x-2][y+2].owner === owner && 
    				this.board.spaces[x-3][y+3].owner === owner) {
                    	win = true;
                }           
            }
        }

    	for (let x = 3; x < this.board.columns; x++ ){
            for (let y = 3; y < this.board.rows; y++){
                if (this.board.spaces[x][y].owner === owner && 
    				this.board.spaces[x-1][y-1].owner === owner && 
    				this.board.spaces[x-2][y-2].owner === owner && 
    				this.board.spaces[x-3][y-3].owner === owner) {
                    	win = true;
                }           
            }
        }
    	return win;
    }

	switchPlayers() {
		for (let player of this.players) {
			player.active = player.active === true ? false : true;
		}
    }
 
    gameOver(message) {
		document.getElementById('game-over').style.display = 'block';
        document.getElementById('game-over').textContent = message;
    }
}