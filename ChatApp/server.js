const http = require("http")
const express = require("express");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// app.use(express.static(__dirname))

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname ,'chat.html'))
})

const users={};
const groups={};

io.on('connection',(socket)=>{
    let user;
    console.log('New user connected :', socket.id)

    // socket.on('chatMessage',({username, message})=>{
    //     console.log(username,message)
 
    //     socket.broadcast.emit('chatMessage',{username, message})
    // })

    socket.on('userJoined',(username)=>{
        user=username
        users[username] = socket.id;
        // console.log(users)
        socket.broadcast.emit('userJoined',`${username} is joined`)
        io.emit('userList', Object.keys(users)); 
    })

    socket.on('privateMessage', ({ to, message }) => {
        const toSocketId = users[to];
        if (toSocketId) {
            io.to(toSocketId).emit('privateMessage', { from: user, message });
        }
    }); 

    socket.on('typing', ({user,to,typing})=>{  
      const toSocketId = users[to];  
      if(typing==true)
        io.to(toSocketId).emit('display', `${user} is typing...`)
      else
        io.to(toSocketId).emit('hide-typing', '')
    })

    //group
    socket.on('createGroup',(groupName)=>{
        // console.log(groupName,"grp")
        if (!groups[groupName]) groups[groupName] = [];
        socket.join(groupName);
        groups[groupName].push(socket.id);
        console.log(groups,"grpp")
        socket.emit('groupJoined', groupName);

        // users[groupName] = groups[groupName]
        // console.log(users)
        // io.emit('userList', Object.keys(users));
    })

    socket.on('joinGroup',(groupName)=>{
        if (!groups[groupName]) return; 
        socket.join(groupName);
        if(!groups[groupName].find((ele) => ele===socket.id)){
            groups[groupName].push(socket.id);
        }
        console.log(groups,"grpp")
        socket.emit('groupJoined', groupName);
    })

    socket.on('groupMessage',({group, username, message})=>{
        console.log(group,username,message)

        socket.to(group).emit('groupMessage',group,username,message);
    })

    
    socket.on('disconnect', () => { 
       console.log('A user disconnected:', socket.id);
       
       if (user && users[user]) {
           delete users[user];  
           io.emit('userList', Object.keys(users));
           io.emit('leave', user); 
       }
     });  
})

server.listen(3000, () => { 
    console.log("Server is listening on", 3000) 
}) 
 