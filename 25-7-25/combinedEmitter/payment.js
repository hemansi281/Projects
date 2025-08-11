const emitter = require('./emitter');

emitter.on('Payment-initiate', (orderId) => {
    console.log('Payment initiated for:', orderId);

    const paymentSuccess = Math.random() > 0.5;

    function processPayment() {
        if (paymentSuccess) {
            emitter.emit('Payment-success', orderId);
            console.log("success");
        } else {
            emitter.emit('Payment-failed', orderId);
        }

        emitter.removeListener('Order-shipped', () => {}); // Dummy cleanup if needed
    }

    processPayment();
});

emitter.once('Payment-success', (orderId) => {
    console.log('Payment successful for:', orderId);
    emitter.emit('Order-confirmed', orderId);
});

emitter.on('Payment-failed', (orderId) => {
    console.log('Payment failed for:', orderId);
    emitter.emit('Order-cancelled', orderId);
});
