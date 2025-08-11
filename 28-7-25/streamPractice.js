const {Writable, Readable} = require('stream')
const fs = require('fs');

const rstream = new Readable();
rstream.on('data', (chunk) => {
 console.log(`Received ${chunk.length} characters`);
})
rstream.on('end', () => {
  console.log('There will be no more data.');

}); 
rstream._read = () => {}; 
rstream.push('Hello, World!');
rstream.push(null);

const wrstream = new Writable({
    write(chunk,encoding,callback) {
        console.log(`Received: ${chunk}`);
    }
});

wrstream.write('hellooo')

// Create a readable stream
const readableStream = fs.createReadStream('file.txt', {
 encoding: 'utf8',
 highWaterMark: 16 * 1024 // 16KB chunks
});

// stream events
readableStream.on('data', (chunk) => {
 console.log(`Received ${chunk.length} characters`);
});

readableStream.on('end', () => {
 console.log('File reading completed');
});

readableStream.on('error', (error) => {
 console.error('Error reading file:', error);
});