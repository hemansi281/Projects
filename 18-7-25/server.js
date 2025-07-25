

// Crypto
const crypto = require('crypto')
let secretKey="Hemansi"
const iv = crypto.randomBytes(16);     // Initialization vector
const key = crypto.randomBytes(32);

const cipher = crypto.createCipheriv('aes-128-ccm', key, iv);
let encrypted = cipher.update('{ foo: "bar" }','n', 'hex');
encrypted += cipher.final('hex');
// const salt = crypto.randomBytes(16).toString('hex');    // 16 bytes
// const hashpw = crypto.scryptSync('{ foo: "bar" }',salt,32).toString('hex')     //64 is key length

// console.log(salt)
console.log("Crypto : ",encrypted)

// const jwt = require('jsonwebtoken');
// let token = jwt.sign({ foo: 'bar' }, key, { expiresIn: '1h' });
// console.log(token)

// File
const fs = require('fs');

// fs.writeFileSync('abc.txt','Heyyyy','utf8')
//** writeFileSync & writeFile - if file is not there, then create it & The data is overwrite into this

// async function write() {
//     await fs.writeFile('abc.txt',"{'name':'abc'}",(err)=>{
//         if(err)
//             throw err;
//         else
//             console.log("Content is written successfully")
//     })
    
// }
// write()


//** appendFile - Append the data into file
fs.appendFile('abc.txt','Again Append into file....', err => {
  if (err) {
    console.error(err);
  } else {
    console.log("Appendingg")
  }
});

// fs.readFile('abc.txt',(err,data)=>{
//     if(err){
//         console.error(err)
//     }
//     else{
//         console.log("The content is :",data)
//     }
// })

// let data = fs.readFileSync('abc.txt','utf-8')
// console.log(data)

const path = './abc.txt'

// Check file is exist or not asychronously
if(fs.existsSync(path)){
    console.log(`The file or directory at '${path}' exists.`);
} else {
  console.log(`The file or directory at '${path}' does not exist.`);
}

// Check file is exist or not asychronously
fs.stat(path, (err, stats) => {
  if (err) {
    console.log(`The file or directory at '${path}' does not exist.`);
  } else {
    console.log(`The file or directory at '${path}' exists.`);
  }
});

async function deleteFile() {
    // Check if file exists before deleting
    await fs.access(path,(err)=>{
        if(err) throw err;
        else{
            console.log("File is there")
        }
    });

    // Delete the file
    await fs.unlink(path,(err)=>{
        if(err) throw err;
        else{
            console.log('File deleted successfully')
        }
    });
}
deleteFile()

// fs.open('abc.txt', 'r', function (err, fd) {
//     if (err) {
//         return console.error("Error opening file:", err);
//     }
//     console.log("File Descriptor:", fd);
// });


/// Event Emitter ///
// const EventEmitter = require('events');

// let em1 = new eventEmitter()

// em1.on('firstEvent',(msg)=>{
//     console.log(msg)
// })

// em1.emit('firstEvent','This is the first event')



// console.log({} + [])
// console.log([] + {})
// console.log({} + {})
// console.log([] + [])