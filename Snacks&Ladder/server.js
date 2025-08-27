const express = require('express');
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const Player = require("./player");
const Board = require("./board");

const gameBoard = new Board();
const playerActions = new Player(gameBoard);


io.on('connection', (socket) => {
    console.log(socket.id);
    let user;

    socket.on('oneEmit', (...args) => {
        console.log(args);

        args.forEach((ele) => {
            switch (ele.action) {
                case 'join':
                    user = ele.data.username;
                    playerActions.addPlayer(io, socket, user);
                    break;

                case 'roll':
                    let diceNum = playerActions.rollDice(io, socket);
                    console.log(diceNum);
                    break;
            }
        })
    }) 

    // socket.on('reqUserJoined', (username) => {
    //     user = username;
    //     playerActions.addPlayer(io, socket, username)
    // });

    // socket.on('reqRollDice', () => {
    //     let diceNum = playerActions.rollDice(io, socket);
    //     console.log(diceNum);

    //     // gameBoard.gameBoard;
    // })

    socket.on('disconnect', () => {
        console.log('A player disconnected:', socket.id);
        playerActions.handleDisconnect(io, socket);
    })
});

server.listen(3000, () => {
    console.log("Server is listening on", 3000)
}) 