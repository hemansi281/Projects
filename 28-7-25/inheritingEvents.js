const EventEmitter = require('events');

class myEventClass extends EventEmitter{
    func(){
        this.emit('start')
    }
}

let myEmitter = new myEventClass();
myEmitter.on('start',()=>{console.log('Start event')})
myEmitter.func();