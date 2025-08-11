const emitter = require('./emitter');

let orderStatus = {
    id: null,
    status: 'Created',
    paymentStatus: 'Pending'
};

function shippedHandler(orderId) {
    orderStatus.status = 'Shipped';
    console.log('Order shipped...');
    emitter.emit('Order-delivered', orderId);
}

// Order event handlers
emitter.on('Order-Placed', (orderId) => {
    orderStatus.id = orderId;
    orderStatus.status = 'Placed';
    console.log('Order placed:', orderId);

    console.log('Listeners for Payment-initiate:', emitter.listenerCount('Payment-initiate'));
    emitter.emit('Payment-initiate', orderId);
});

emitter.on('Order-confirmed', (orderId) => {
    orderStatus.status = 'Confirmed';
    console.log('Order confirmed:', orderId);
    emitter.emit('Order-shipped', orderId);
});

emitter.on('Order-shipped', shippedHandler);

emitter.on('Order-delivered', (orderId) => {
    orderStatus.status = 'Delivered';
    console.log('Order delivered:', orderId);
    emitter.emit('log', `Order #${orderId} completed.`);
    emitter.removeAllListeners('Order-delivered');
});

emitter.on('Order-cancelled', (orderId) => {
    orderStatus.status = 'Cancelled';
    console.log('Order cancelled:', orderId);
});

emitter.on('log', (message) => {
    console.log(`LOG: ${message}`);
});
