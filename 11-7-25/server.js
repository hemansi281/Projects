const http = require('http')
const url = require('url')
const fs = require('fs')
const PORT = 3000

const userData = fs.readFileSync('./users.json')
const data = JSON.parse(userData)
console.log(data)

const server = http.createServer((req, res) => {
    const reqUrl = url.parse(req.url)
    // console.log(reqUrl)
    const path = reqUrl.pathname;
    // console.log(path.split('/').slice(1))
    const partsArr = path.split('/').slice(1)
    

    // Read
    if (req.url === '/user' && req.method === 'GET') {
        console.log(req)
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

    // Create
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
            else {
                res.writeHead(400, { 'Content-Type': 'text/plain' });
                res.end("No body is there");
            }
        })
    }

    // Update
    else if (partsArr.length === 2 && req.method === 'PATCH') {
        const id = Number(partsArr[1])
        console.log(id)

        let body = '';

        req.on('data', chunk => {
            body += chunk;
        });
        console.log(body)

        req.on('end', () => {
            const patchData = JSON.parse(body);
            const replaceIndex = data.findIndex((user) => user.id === id)
            // console.log(data[replaceIndex], "ind", patchData)

            if (replaceIndex != -1) {
                data[replaceIndex] = { ...data[replaceIndex], ...patchData };
                console.log(data)

                fs.writeFileSync('./users.json', JSON.stringify(data))

                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(data[replaceIndex]));
            }
            else {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('User not found');
            }
        })
    }


    else if (partsArr.length === 2 && req.method === 'PUT') {
        const id = Number(partsArr[1])
        console.log(id)

        let body = '';

        req.on('data', chunk => {
            body += chunk;
        });
        console.log(body)

        req.on('end', () => {
            const patchData = JSON.parse(body);
            const replaceIndex = data.findIndex((user) => user.id === id)
            // console.log(data[replaceIndex], "ind", patchData)

            if (replaceIndex != -1) {
                data[replaceIndex] = {...patchData };
                console.log(data)

                fs.writeFileSync('./users.json', JSON.stringify(data))

                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(data[replaceIndex]));
            }
            else {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('User not found');
            }
        })
    }

    // Delete
    else if (partsArr.length === 2 && req.method === 'DELETE') {
        const id = Number(partsArr[1])
        // console.log(id)

        const deleteIndex = data.findIndex((user) => user.id === id)
        console.log(data[deleteIndex])

        if (deleteIndex != -1) {
            const finalArr = data.filter((d) => d.id != id)
            console.log(finalArr)

            fs.writeFileSync('./users.json', JSON.stringify(finalArr))

            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('User Deleted successfully');
        }
        else {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('User not found');
        }
    }
    else {
        res.writeHead(400)
        res.end("Bad request")
    }

})

server.listen(PORT, () => {
    console.log("Application Running on", PORT)
})

