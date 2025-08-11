// const http = require('http')

// const server = http.createServer(function (req, res) {
//     if (req.url === '/users') {
//         const mid= myMiddleware(req, res);
//         res.on(`${mid}, Middleware called`,()=>{
//             console.log('object')
//             res.end('Hellooo')
//         })
//         res.emit(`${mid}, Middleware called`)

//         // res.on('custom-event', (msg) => {
//         //     console.log('Custom event triggered:', msg);
//         // });

        
//         // res.emit('custom-event', 'Hello from custom event!');

//         // res.end('OK');
//     }
// });

// function myMiddleware(req, res) {
//     if (req.method === 'GET') {
//         return 'this is middleware'
//         // res.end('Hello Users');
//     }
//     else {
//         res.end('Bad request')
//     }

// }

// server.listen(3000, () => {
//     console.log("Application Running on", 3000)
// })

// middleware array
const http = require('http');

var middlewares = [];

function use(fn) {
	middlewares.push(fn);
};

function run(req,res){
    let i=0;

    function next(){
        const middleware = middlewares[i++];
        if(!middleware){
            return  
        }

        middleware(req,res,next)
    }
    next();
}

use((req, res, next) => {
    console.log("middleware1");
    next();
});

use((req, res, next) => {
    console.log("middleware2");
    setTimeout(next,2000)
    // next();
});

use((req, res, next) => {
    next();
    console.log("middleware3");
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Successfully end');
});

console.log(middlewares,"middd")

http.createServer(function (req, res) {
	run(req, res);
}).listen(3000,()=>{
    console.log("App running on :",3000)
})