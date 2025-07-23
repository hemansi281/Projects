const EventEmitter = require('events');
const emitter = new EventEmitter();
const orderId = 1005;

let orderStatus = {
    id: orderId,
    status: 'Created',
    paymentStatus: 'Pending'
};

emitter.on('Order-Placed', (orderId) => {
    orderStatus.status = 'Placed';
    console.log('Order placed:', orderId);

    console.log('Listeners for Payment-initiate:', emitter.listenerCount('Payment-initiate'));

    emitter.emit('Payment-initiate', orderId);
});

emitter.on('Payment-initiate', (orderId)=>{
    console.log('Payment initiated for:', orderId);
});

emitter.on('Payment-initiate', (orderId) => {
    // console.log('Payment initiated for:', orderId);

    const paymentSuccess = Math.random() > 0.5;
    function payment() {
        if (paymentSuccess) {
            emitter.emit('Payment-success', orderId);
            // emitter.emit('Payment-success', orderId);
            console.log("successs")
        } else {
            emitter.emit('Payment-failed', orderId);
        }

        emitter.removeListener('Order-shipped',shippedHandler);
    }
    payment()

});



function shippedHandler(orderId) {
    orderStatus.status = 'Shipped';
    console.log('Order shipped...');
    emitter.emit('Order-delivered', orderId);
}

// only one-time listener
emitter.once('Payment-success', (orderId) => {
    orderStatus.paymentStatus = 'Success';
    console.log('Payment successful for:', orderId);
    emitter.emit('Order-confirmed', orderId);
    // console.log('Successsss')
});

emitter.on('Payment-failed', (orderId) => {
    orderStatus.paymentStatus = 'Failed';
    console.log('Payment failed for:', orderId);
    emitter.emit('Order-cancelled', orderId);
});

emitter.on('Order-confirmed', (orderId) => {
    orderStatus.status = 'Confirmed';
    console.log('Order confirmed:', orderId);
    emitter.emit('Order-shipped', orderId);
});

emitter.on('Order-shipped',shippedHandler);

emitter.on('Order-delivered', (orderId) => {
    orderStatus.status = 'Delivered';
    console.log('Order delivered:', orderId);
    emitter.emit('log', `Order #${orderId} completed.`);
    emitter.removeAllListeners('Order-delivered');
});

emitter.on('log', (message) => {
    console.log(`LOG: ${message}`);
});

emitter.on('Order-cancelled', (orderId) => {
    orderStatus.status = 'Cancelled';
    console.log('Order cancelled:', orderId);
});

console.log(emitter.eventNames(),"before")

function placeOrder() {
    emitter.emit('Order-Placed', orderId);
    console.log('Listeners for log event:', emitter.listeners('log'));
    console.log('Order-delivered listener count:', emitter.listenerCount('Order-delivered'));
    console.log(emitter.eventNames())

    emitter.emit('Order-shipped',orderId)    // this will not be listened

}

placeOrder();

// console.log(emitter.eventNames());
