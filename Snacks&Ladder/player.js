class Player {

    constructor(board) {
        this.board = board;
        this.players = [];
        this.currPlayerIndex = 0;
        this.countConsecutiveSix=0;
    }

    addPlayer(io, socket, username) {
        if (!username) return;

        if(!this.players.find((p)=>p.id === socket.id)){
            this.players.push({ id: socket.id, name: username })
        }
        // console.log(players)

        if (this.players.length >= 2 && this.players.length <= 5) {
            console.log(this.players)
            this.currPlayerIndex = 0;
            this.countConsecutiveSix = 0;
            io.emit('resStart', { user: this.players, currPlayer: this.players[this.currPlayerIndex].name })
        }

    }

    rollDice(io, socket) {
        if (this.players.length < 2) {
            socket.emit("resError", { message: "Need at least 2 players" });
            return;
        }

        const currentPlayer = this.players[this.currPlayerIndex];
        console.log(currentPlayer);

        if (currentPlayer.id !== socket.id) {
            socket.emit("resError", { message: "Wait, Not your turn!" });
            return;
        }

        if (currentPlayer.winner) {
            socket.emit('resGameOver', { message: 'The Game is over !!', winner: currentPlayer.name })
            return;
        }

        const diceNum = this.board.rollDice();
        console.log(diceNum, "diceNum")
        // let diceNum = Math.floor(Math.random() * 6) + 1;

        if (!currentPlayer.started) {       //if game is not started
            if (diceNum === 1 || diceNum === 6) {
                currentPlayer.started = true;
                currentPlayer.position = 1;
                io.emit('resMove', {
                    player: currentPlayer.name,
                    diceNum,
                    newPosition: currentPlayer.position,
                    started: true,
                })
                this.currPlayerIndex = (this.currPlayerIndex + 1) % this.players.length
            }
            else {
                io.emit('resMove', {
                    player: currentPlayer.name,
                    diceNum,
                    newPosition: currentPlayer.position,
                    started: false,
                })
                this.currPlayerIndex = (this.currPlayerIndex + 1) % this.players.length

            }
        }
        else {      //already starts
            if (currentPlayer.countConsecutiveSix === 0) {
                currentPlayer.startPosBeforeSix = currentPlayer.position;
            }

            if (diceNum === 6) {
                currentPlayer.countConsecutiveSix++;

                if (currentPlayer.countConsecutiveSix === 3) {
                    currentPlayer.position = currentPlayer.startPosBeforeSix;
                    io.emit('resMove', {
                        player: currentPlayer.name,
                        diceNum,
                        message: "Rolled 3 consecutive sixes, wait for next roll!"
                    });
                    this.countConsecutiveSix = 0; // reset after penalty
                    // this.currPlayerIndex = (this.currPlayerIndex + 1) % this.players.length;
                    return;
                }

            } else {
                this.countConsecutiveSix = 0;
            }



            let oldPosition = currentPlayer.position;
            currentPlayer.position += diceNum;
            currentPlayer.position = this.board.checkPosition(currentPlayer.position);
            console.log(currentPlayer.position, "currposition");

            if (currentPlayer.position === 'NoMove') {      //if position >100 
                currentPlayer.position = oldPosition;
            }
            if (currentPlayer.position === 100) {
                currentPlayer.winner = true;

                io.emit('resWinner', {
                    player: currentPlayer.name,
                    diceNum,
                    newPosition: currentPlayer.position,
                    winner: true
                })
                return;
            }
            io.emit('resMove', {
                player: currentPlayer.name,
                diceNum,
                newPosition: currentPlayer.position,
                started: true,
            })
            if (diceNum != 6) {       //6 - then turn is not changed
                this.currPlayerIndex = (this.currPlayerIndex + 1) % this.players.length
            }

        }

        // if (user === this.players[this.currPlayerIndex].name) {
        //     io.to(socket.id).emit('ResShowDiceNumber', { message: `Your Dice number is : ${diceNum}` });
        //     return diceNum;
        // }
        // else {
        //     io.to(socket.id).emit('ResNotYourTurn', { message: 'Wait !! Opponent\'s turn..' })
        // }
    }

    handleDisconnect(io,socket){
        const index = this.players.findIndex(p => p.id === socket.id);

        if(index != -1){
            const leftPlayer = this.players[index];
            console.log(leftPlayer)

            this.players.splice(index,1)        //remove that player

            io.emit("resPlayerLeft", { 
                message: `${leftPlayer.name} left the game`, 
                players: this.players 
            });

            if(this.players.length <2){
                io.emit('resGameOver', { message: "Not enough players to continue!" });
                return;
            }

            if(index === this.currPlayerIndex){
                this.currPlayerIndex = (this.currPlayerIndex + 1) % this.players.length
                // io.emit("resNextTurn", { 
                //     currPlayer: this.players[this.currPlayerIndex].name 
                // });
            }
        }
    }
}

module.exports = Player; 