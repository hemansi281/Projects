const http = require("http")
const express = require("express");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

let time1=10,time2=10,active = 1, interval;

io.on('connection', (socket) => {
    console.log('New user connected :', socket.id)
    let currTimer;
    // let interval;

    socket.on('startTimer', () => {
        // console.log(timer1, timer2)
        // time1 = Number(timer1), time2 = Number(timer2);
        // currTimer = time1;
        // console.log(time1, currTimer, "ll")

        if (time1 >= 0 && time2 >= 0) {
            clearInterval(interval)
            interval = setInterval(timerInterval, 1000)
        }

    })
    function timerInterval() {
        if (active === 1 && time1 > 0) {
            time1--;
        }
        else if (active === 2 && time2 > 0) {
            time2--;
        }

        console.log(time1, time2)
        io.emit('timerUpdate', time1, time2,active);

        if (time1 === 0 || time2 === 0) {
            console.log(active)
            clearInterval(interval);
            time1=10,time2=10;
            socket.emit('gameOver',`Player ${active} times up !!`)
            return;
        }

    }

    socket.on('switchTurn', ({ timer1, timer2 }) => {
        active = active === 1 ? 2 : 1;
        time1 = Number(timer1), time2 = Number(timer2);
        io.emit('timerUpdate', time1, time2,active);
    })

    socket.on('disconnect', () => {
        console.log('A user disconnected:', socket.id);
    });
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'timer.html'))
})

server.listen(3000, () => {
    console.log("Server is listening on", 3000)
})
