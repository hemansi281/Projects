const http = require("http")
const express = require("express");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(__dirname))
// const client={}
let players = [];
let board = Array(9).fill(null);
let currPlayer = null;

function checkWinner() {
    const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let combo of winningCombos) {
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }
    return null;
}

function resetGame() {
    board = Array(9).fill(null);
    currPlayer = null; 
    // players=[]
}

io.on('connection', (socket) => {

    console.log('New player connected :', socket.id)

    if (players.length < 2) { 
        let symbol = players.length === 0 ? 'X' : 'O'
        // socket.emit("game.begin", { symbol });

        // if(players.find((sym)=>sym === symbol) !== -1){
        //     console.log("exec")
        //     if(symbol === 'X')  
        //         symbol ='O'
        //     else
        //         symbol='X' 
        // }
        players.push({ id: socket.id, symbol: symbol })
        socket.emit('joined', players[players.length - 1].symbol)  

        socket.on('makeMove', ({ index, player }) => {
            console.log(index, player); 

            console.log(currPlayer);  
            // console.log(board);
            if (player !== currPlayer?.symbol || board[index] !== null) 
                return;

            board[index] = player;
            console.log(board)

            const winner = checkWinner();
            console.log(winner)
            if (winner) {
                io.emit('gameOver', { board, winner });
                resetGame();
                // return;
            }

            if (!board.includes(null)) {
                io.emit('gameOver', { board, winner: 'Draw' });
                resetGame();
                // return;
            } 
 
            console.log(currPlayer)   
            currPlayer = currPlayer?.symbol === 'X' ? players[1] : players[0];
            io.emit('update', { board, currPlayer: currPlayer.symbol });

        }); 
        

    }
    else {
        socket.emit("full", "There is only 2 players allowed. Please wait.");
        return;
    }

    if (players.length === 2) {
        currPlayer = players[0]; 
        io.emit('start', { board, currPlayer: currPlayer.symbol })
    } 
    console.log(players,"hellooo");

    socket.on('disconnect', () => { 
       console.log('A player disconnected:', socket.id);
       players = players.filter(player => player.id !== socket.id);  
       console.log(players)
    
       resetGame();
    //    players=[];
       io.emit('leave');    
     }); 
}) 
   
server.listen(3000, () => { 
    console.log("Server is listening on", 3000) 
}) 
 