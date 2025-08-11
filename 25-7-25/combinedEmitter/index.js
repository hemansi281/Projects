const emitter = require('./emitter');
require('./order');
require('./payment');

const orderId = 1005;

console.log(emitter.eventNames(), "before");

function placeOrder() {
    emitter.emit('Order-Placed', orderId);
    console.log('Listeners for log event:', emitter.listeners('log'));
    console.log('Order-delivered listener count:', emitter.listenerCount('Order-delivered'));
    console.log(emitter.eventNames());

}

placeOrder();
