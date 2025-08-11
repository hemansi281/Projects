// const EventEmitter = require('events');

// function returnEmitter(){
//     const emitter = new EventEmitter();

//     setTimeout(()=>{
//         emitter.emit('start','Event Start')
//     },2000)

//     return emitter;
// }

// const task = returnEmitter();
// task.on('start',(msg)=>{
//     console.log(msg)
// })

const EventEmitter = require('events');

const emitter = new EventEmitter();

emitter.setMaxListeners(5);         // default is :10

emitter.on('data', (msg) => {
  console.log('Listener 1:', msg);
});

emitter.once('data', (msg) => {
  console.log('Listener 2 (once):', msg);
});

emitter.prependListener('data', (msg) => {
  console.log('Prepended Listener:', msg);
});

emitter.prependOnceListener('data', (msg) => {
  console.log('Prepended Once Listener:', msg);
});

emitter.emit('data', 'Hello Events!');
emitter.emit('data', 'Second Emit');

console.log('Listener count:', emitter.listenerCount('data'));

console.log('Registered event names:', emitter.eventNames());
console.log('Listeners for data:', emitter.listeners('data'));

function toRemove(msg) {
  console.log('This will be removed');
}
emitter.on('data', toRemove);
emitter.removeListener('data', toRemove);
console.log('After remove Registered event names:', emitter.eventNames());

emitter.removeAllListeners('data');
console.log('After remove ALLLL Registered event names:', emitter.eventNames());

emitter.once('example', () => console.log('example'));
console.log('Raw listeners:', emitter.rawListeners('example'));
