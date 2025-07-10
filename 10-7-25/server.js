const http = require('http')
const url = require('url')
const fs = require('fs')
const PORT = 3000

// const user=[
//     { id:1, name:"ABC" },
//     { id:2, name:"DEF" }
// ]

const userData = fs.readFileSync('./users.json')
const data = JSON.parse(userData)
console.log(data)

const server = http.createServer((req, res) => {
    const reqUrl = url.parse(req.url)
    // console.log(reqUrl)
    const path = reqUrl.pathname;
    // console.log(path.split('/').slice(1))
    const partsArr = path.split('/').slice(1)

    if (req.url === '/hello' && req.method === 'GET') {
        res.writeHead(200, {
            "content-type": "text/plain"
        })
        res.end("Helloo")
    }

    else if (req.url === '/user' && req.method === 'GET') {
        res.writeHead(200, {
            "content-type": "application/json"
        })
        res.end(userData)
    }

    // else if (partsArr.length === 2 && req.method === 'GET') {
    //     // console.log(req.)
    //     res.writeHead(200, {
    //         "content-type": "text/plain"
    //     })
    //     res.end("User")
    // }

    else if (req.url === '/user' && req.method === 'POST') {
        req.on('data', (d) => {
            const jsondata = JSON.parse(d);
            console.log(jsondata)

            if (jsondata) {
                data.push(jsondata)
                fs.writeFile('./users.json', JSON.stringify(data), (err) => {
                    if (err) {
                        res.end("Error in writing in file")
                    }
                    else {
                        res.writeHead(200, {
                            "content-type": "application/json"
                        })
                        res.end(JSON.stringify(data))
                    }
                })
            }
            else{
                res.writeHead(400, {'Content-Type': 'text/plain'});
                res.end("No body is there");
            }
        })

        res.end("Nooooo")
    }

    else {
        res.writeHead(400)
        res.end("Bad request")
    }


})

server.listen(PORT, () => {
    console.log("Application Running on", PORT)
})