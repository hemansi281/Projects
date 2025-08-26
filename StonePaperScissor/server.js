const express = require('express');
const http = require("http");
const path = require('path');
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'game.html'))
})

let players = [];
let moves = ['stone', 'paper', 'scissor']
let playerMoves = {};
let p1Score = 0, p2Score = 0;
let gameActive = true;

const generateMove = () => {
    return moves[Math.floor(Math.random() * moves.length)];
}

const getWinner = (move1, move2) => {
    if (move1 === move2) return 'draw';
    if (
        (move1 === 'stone' && move2 === 'scissor') ||
        (move1 === 'paper' && move2 === 'stone') ||
        (move1 === 'scissor' && move2 === 'paper')
    ) return 'player1';
    return 'player2';
};

io.on('connection', (socket) => {
    console.log(socket.id)

    // console.log(move)
    let user;

    socket.on('userJoined', (username) => {
        user = username
        // console.log(users)

        if (players.length < 2) {
            players.push({ id: socket.id, name: username })
            console.log(players)

            socket.emit('joined', user)

            if (players.length === 2) {
                // currPlayer = players[0];
                // players.push({ id: socket.id })
                console.log(players)

                io.emit('start', user)
            }
        }
        else {
            socket.emit("full", "There is only 2 players allowed. Please wait.");
            return;
        }
    })

    socket.on('generateMove', () => {
        if (!gameActive) {
            socket.emit('gameOver', {
                message: 'Game Over! Please wait for reset.',
                p1Score,
                p2Score
            });
            return;
        }

        let move = generateMove()
        console.log(move);
        socket.emit('showMove', move)

        playerMoves[socket.id] = move;
        console.log(playerMoves)

        if (Object.keys(playerMoves).length < 2){
            socket.emit('makeDisable')
        }

        if (Object.keys(playerMoves).length === 2) {      //both made thier moves
            const [p1, p2] = players;
            const move1 = playerMoves[p1.id];
            const move2 = playerMoves[p2.id];
            console.log(move1, move2)

            const winner = getWinner(move1, move2);
            if (winner === 'player1') p1Score++;
            else if (winner === 'player2') p2Score++;
 
            io.to(p1.id).emit('result', { 
                yourMove: move1,
                opponentMove: move2,
                result: winner === 'draw' ? 'Draw' : (winner === 'player1' ? `You Win! Your score is :${p1Score}` : `You Lose! Your score is :${p1Score}`)
            }); 
            io.to(p2.id).emit('result', {
                yourMove: move2,
                opponentMove: move1,
                result: winner === 'draw' ? 'Draw' : (winner === 'player2' ? `You Win! Your score is :${p2Score}` : `You Lose! Your score is :${p2Score}`)
            });
            io.emit('makeUnable') 
 
            if (p1Score >= 3 || p2Score >= 3) {
                gameActive = false;
                const winnerName = p1Score >= 3 ? p1.name : p2.name;
                io.emit('gameOver', {
                    message: `Game Over! Winner is ${winnerName}`,
                    p1Score,
                    p2Score 
                });
            }


            playerMoves = {}
        }
    })

    socket.on('resetGame', () => {
        p1Score = 0;
        p2Score = 0;
        gameActive = true;
        io.emit('gameReset');
    });
})
server.listen(3000, () => {
    console.log("Server is listening on", 3000)
}) 