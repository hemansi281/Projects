function job(state) {
    return new Promise(function (resolve, reject) {
        if (state) {
            resolve('success');
        } else {
            reject('error');
        }
    });
}
let promise = job(true);
promise.then(function (data) {
    console.log(data);
    return job(true);
}).then(function (data) {
    if (data !== 'victory') {
    }
    throw 'Defeat';
    return job(true);
}).then(function (data) {
    console.log(data);
}).catch(function (error) {
    console.log(error);
    return job(false);
}).then(function (data) {
    console.log(data);
    return job(true);
}).catch(function (error) { 
    console.log(error);
    return "Error caught";
}).then(function (data) {
    console.log(data);
    return new Error('test');
}).then(function (data) {
    console.log('Success:', data.message);
}).catch(function (data) {
    console.log('Error:', data.message);
});

// Crypto
const crypto = require('crypto')

// hashing //
const hash = crypto.createHash('sha256').update('this is password').digest('hex')

// createHash() - create a hash object with specified algorithm like sha256, sha1, md5
    //  sha256, md5 - considered cryptographically weak
// update() - update the hash content with given data
// digest() - calculates the digest and outputs it in the specified format
console.log(hash)

// password //
const salt = crypto.randomBytes(16).toString('hex');    // 16 bytes
const hashpw = crypto.scryptSync('Hemansi',salt,64).toString('hex')     //64 is key length

console.log(salt)
console.log(hashpw)

const path = require('path')

// path.basename() - extracts the file name from a full path
const filename = path.basename('/users/docs/file.txt');
console.log(filename);

const filenameWithoutExt = path.basename('/users/docs/file.txt', '.txt');
console.log(filenameWithoutExt);

// path.join() - combine different parts of path
const filePath = path.join('user', 'docs', 'file.txt');
console.log(filePath)

// path.dirname() - if want only folder path without the file containing
const folderpath = path.dirname('/users/docs/file.txt')
console.log(folderpath)

// path.extname() - find the extention of file 
const extname = path.extname('/users/docs/file.txt');
console.log(extname)

// path.resolve() - give absolute path of file, it is useful when we work on another folder
const absolutePath = path.resolve('file.txt');
console.log(absolutePath);