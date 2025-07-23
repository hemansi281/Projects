// /////// Buffer ////////
// const { Buffer } = require('buffer')

// const buf1 = Buffer.from('helloo')
// console.log(buf1)
// buf1.write('how are you')       //overwrite the helloo with 'how ar'
// console.log(buf1.toString())
// console.log(buf1.toString('hex'),'hex')
// console.log(buf1.toString('ascii'),'ascii')
// console.log(buf1.toString('base64'))
// console.log(buf1.toString('base64url'))
// console.log(buf1.toString('utf8'))          // utf8 & utf-8 is same
// console.log(buf1.toString('utf-8'))
// console.log(buf1.toString('utf16le'))
// console.log(buf1.length)

// const buf2 = Buffer.alloc(10)       //allocates 10 bytes fill with zero
// console.log(buf2)

// const buf3 = Buffer.from([2,1,4])      
// console.log(buf3)
// buf3.write('this is monday')
// console.log(buf3.toString())    //thi

// // encoding types
// console.log(Buffer.from('test','ascii'))
// console.log(Buffer.from('test','base64'))
// console.log(Buffer.from('test','base64url'))
// console.log(Buffer.from('test','binary'))
// console.log(Buffer.from('test','hex'))

// const buf4 = Buffer.from('123789');
// const buf5 = Buffer.from('1234');
// console.log(Buffer.compare(buf4,buf5))    // return 0 if same, 1 if buf4 is greater, -1 if buf4 smaller

// console.log(buf4.equals(buf5))      // return true if equals
// const buf6=Buffer.alloc(3)
// buf4.copy(buf6)
// console.log(buf6.toString())

// const buf7 = Buffer.alloc(5);
// buf7.fill('A');
// console.log(buf7.toString());
// console.log(buf7.indexOf('A'))      //first occurance index
// console.log(buf5.indexOf('3', {}));      //second param is starting index. {},[],null,undefined all is 0

// const buf8 = Buffer.from('this buffer is a buffer');
// console.log(buf8.lastIndexOf('is'));     //12
// console.log(buf8.lastIndexOf('buffer', 6));     //5 - searches from backward strating from 6 index
// console.log(buf8.lastIndexOf('buffer', 18));     //17
// console.log(buf8.lastIndexOf('buffer', 4));     //-1

// const subBuf = buf8.subarray(0,6)
// console.log(subBuf.toString())



// /////////// Path //////////
// const path = require('path')

// // basename() - extracts the file name (last portion) from a full path
// const filename = path.basename('/users/docs/file.txt');
// console.log(filename);

// const filenameWithoutExt = path.basename('/users/docs/file.txt', '.txt');
// console.log(filenameWithoutExt);

// // join() - combine different parts of path
// const filePath = path.join('user', 'docs', 'file.txt');
// console.log(filePath)

// // dirname() - if want only folder path without the file containing
// const folderpath = path.dirname('/users/docs/file.txt')
// console.log(folderpath)

// // extname() - find the extention of file 
// const extname = path.extname('/users/docs/file.txt');
// console.log(extname)
// console.log(path.extname('index'))  // '' empty

// // resolve() - give absolute path of file, it is useful when we work on another folder
// const absolutePath = path.resolve('file.txt');
// console.log(absolutePath);

// // delimiter ';' for windows
// // console.log(process.env.PATH);
// // console.log(process.env.PATH.split(path.delimiter))

// // format() - returns a path string from an object
// console.log(path.format({
//   dir: 'C:\\path\\dir',
//   base: 'file.txt',
// }))

// console.log(path.isAbsolute('C:\\user\\..'))
// console.log(path.isAbsolute('C:\\user\jds/sd'))
// console.log(path.isAbsolute('user/jds'))

// // parse() - retruns a obj  
// console.log(path.parse('C:\\path\\dir\\file.txt'))



// // /////////// Crypto //////////
const crypto = require('crypto')
let key = crypto.randomBytes(16);
let iv = crypto.randomBytes(10);     
const message = 'This is plain text'

const cipher1 = crypto.createCipheriv('aes-128-ccm', key, iv, {         //key size-128 bits
    authTagLength: 16                           // ccm requires authTagLength option
});
let encrypted1 = cipher1.update(message,'utf8' , 'hex');
encrypted1 += cipher1.final('hex');
console.log(encrypted1,"aes-128-ccm")

key=crypto.randomBytes(32)
iv=crypto.randomBytes(10)
const cipher2 = crypto.createCipheriv('aes-256-ccm', key, iv, {         //key size-256 bits
    authTagLength: 16                           
});
let encrypted2 = cipher2.update(message,'utf8' , 'hex');
// console.log(encrypted2)
encrypted2 += cipher2.final('hex');
console.log(encrypted2,'aes-256-ccm')

//* gcm
const cipher3 = crypto.createCipheriv('aes-256-gcm', key, iv);      // gcm - no required authTaglength
let encrypted3 = cipher3.update(message,'utf8' , 'hex');
encrypted3 += cipher3.final('hex');
const authTag = cipher3.getAuthTag();
console.log(encrypted3,'aes-256-gcm')

const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
decipher.setAuthTag(authTag);
let decrypted = decipher.update(encrypted3, 'hex', 'utf8');
decrypted += decipher.final('utf8');
console.log(decrypted)

//* cbc
key=crypto.randomBytes(24)
iv=crypto.randomBytes(16)
const cipher4 = crypto.createCipheriv('aes-192-cbc', key, iv);      
let encrypted4 = cipher4.update(message,'utf8' , 'hex');
encrypted4 += cipher4.final('hex');
console.log(encrypted4,'aes-192-cbc')

const decipher4 = crypto.createDecipheriv('aes-192-cbc', key, iv);
let decrypted4 = decipher4.update(encrypted4, 'hex', 'utf8');
decrypted4 += decipher4.final('utf8');
console.log(decrypted4)



// ////////// OS ////////
// const os = require('os')

// console.log(os.homedir())       // return string path of user's home directory like C:\Users...
// console.log(os.hostname())      // host name of os
// // console.log(os.constants)       // specified constants like error code, process signals, priority
// console.log(os.arch())          //x64
// console.log(os.cpus())          // arrray of object containing model, speed, times
// console.log(os.totalmem())      //total memory in bytes
// console.log(os.freemem())       
// console.log(os.machine())
// console.log(os.platform())     
// console.log(os.type())          //Windows_NT
// console.log(os.uptime())
// console.log(os.userInfo())
// console.log(os.version())       //11



////////// HTTP //////////
// const http = require('http')

// const server = http.createServer((req, res) => {
//   res.setHeader('Content-Type','text/plain')
//   res.writeHead(200, { 'Content-Type': 'text/plain' });
//   res.write('Hello ')
  
//   console.log(req.headers)
//   // console.log(req.method)
//   // console.log(req.socket)
//   // console.log(req.statusCode)  
//   // console.log(req.url)
//   console.log(`${req.method} request received at ${req.url}`);

//   console.log(res.getHeaders())
//   res.end('From server');

//   // if(req.method === 'POST'){
//   //   console.log(req)
//   // }
// });


// server.listen(3000, () => {
//     console.log("Application Running on", 3000)
// }) 


// const fs = require('fs');
// const https = require('https');

// const serverS = https.createServer((req, res) => {
//   res.writeHead(200);
//   res.end('Secure Hello!');
// });

// serverS.listen(443, () => {
//   console.log('HTTPS server running on port 443');
// });


////////// Console /////////
// const { Console } = require('console');
// const customConsole = new Console(process.stdout, process.stderr);

// // assert only write a msg if value is falsy
// customConsole.assert(false,'custom')
// console.assert(false,'hello','log')
// console.assert(true,'hello','true')
// console.assert('','hello','false')

// console.count()
// customConsole.count('default')
// console.count('default')