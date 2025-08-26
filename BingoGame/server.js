const express = require('express');
const http = require("http");
const path = require('path');
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'bingo.html'))
})

let players = [];
let boards = {};
let currPlayer;
let lines = {};

function checkWinner(socketId) {
    let board = boards[socketId];
    let countLine = 0;

    // if ([0, 1, 2, 3, 4].every((ele) => board[ele].marked) || [5, 6, 7, 8, 9].every((ele) => board[ele].marked) || [10, 11, 12, 13, 14].every((ele) => board[ele].marked) || [15, 16, 17, 18, 19].every((ele) => board[ele].marked) || [20, 21, 22, 23, 24].every((ele) => board[ele].marked) || [0, 5, 10, 15, 20].every((ele) => board[ele].marked) || [1, 6, 11, 16, 21].every((ele) => board[ele].marked) || [2, 7, 12, 17, 22].every((ele) => board[ele].marked) || [3, 8, 13, 18, 23].every((ele) => board[ele].marked) || [4, 9, 14, 19, 24].every((ele) => board[ele].marked) || [0, 6, 12, 18, 24].every((ele) => board[ele].marked) || [4, 8, 12, 16, 20].every((ele) => board[ele].marked)) {
    //     console.log('first line')
    //     lines[socketId] = ++lines[socketId] || 1;
    // }
    // console.log(lines, 'lines')

    const isLineMarked = (indexArr) => indexArr.every(i => board[i].marked);

    //row
    for (let r = 0; r < 5; r++) {
        const row = [0, 1, 2, 3, 4].map(i => r * 5 + i);
        // console.log(row)
        if (isLineMarked(row)) countLine++;
    }

    //column
    for (let c = 0; c < 5; c++) {
        const col = [0, 5, 10, 15, 20].map(i => i + c);
        if (isLineMarked(col)) countLine++;
    }

    //diagonal
    const dg1 = [0, 6, 12, 18, 24];
    const dg2 = [4, 8, 12, 16, 20];
    if (isLineMarked(dg1)) countLine++;
    if (isLineMarked(dg2)) countLine++;

    return countLine;
}

io.on('connection', (socket) => {
    console.log(socket.id)
    let user;

    socket.on('userJoined', (username) => {
        user = username;

        if (players.length < 2) {
            players.push({ id: socket.id, name: username })
            console.log(players)
            boards[socket.id] = [];

            socket.emit('joined', user)

            if (players.length === 2) {
                console.log(players)
                currPlayer = players[0].name;
                io.emit('start', { user: currPlayer })
            }
            console.log(players);
        }
        else {
            socket.emit("full", "There is only 2 players allowed. Please wait.");
            return;
        }
    });

    socket.on('cellClick', ({ number, localBoard }) => {
        console.log(number);

        // boards[socket.id] = localBoard;

        // console.log(object)
        // let oppoId = socket.id === players[0].id ? players[1].id : players[0].id;
        // boards[oppoId] = localBoard;

        // currPlayer=players[1].name;
        currPlayer = currPlayer === players[0].name ? players[1].name : players[0].name;

        for (let pid in boards) {
            boards[pid] = boards[pid].map(cell =>
                cell.num === number ? { ...cell, marked: true } : cell
            );
            io.to(pid).emit("updateBoard", { updateBoard: boards[pid], number, currPlayer });
        }
        console.log(boards, "after")

        for (let pid in boards) {
            let linesCompleted = checkWinner(pid);
            console.log(linesCompleted, "winn")
            if(linesCompleted >=1 ){
                io.to(pid).emit('showLineCount',linesCompleted)
            }
        
            if (linesCompleted >= 5) {
                io.emit('winner', { winner: players.find(p => p.id === pid).name });
                break;
            }
        }
        // let linesCompleted = checkWinner(socket.id)
        // console.log(linesCompleted, "winn")

        // if (linesCompleted >= 5) {
        //     io.emit("winner", { winner: players.find(p => p.id === socket.id).name });
        // }
    })

    socket.on("saveBoard", (board) => {
        boards[socket.id] = board;
        console.log("Board saved for:", socket.id);
    });

    socket.on('resetGame', () => {
        for (let pid in boards) {
           boards[pid] = []; 
        }

        io.emit('gameReset');

    })

})
server.listen(3000, () => {
    console.log("Server is listening on", 3000)
}) 