const {RippleAPI} = require('ripple-lib');

const api = new RippleAPI({
  server: 'wss://s1.ripple.com' // Public rippled server hosted by Ripple, Inc.
});
api.on('error', (errorCode, errorMessage) => {
  console.log(errorCode + ': ' + errorMessage);
});
api.connect().then(() => {
  console.log('connected');

  const sourceAddress = 'SOURCE_ADDRESS'
  const destinationAddress = 'DESTINATION_ADDRESS'

  const address = destinationAddress
  const payment = {
    "source": {
      "address": destinationAddress,
      "maxAmount": {
        "value": "0.5",
        "currency": "XRP"
      }
    },
    "destination": {
      "address": sourceAddress,
      "amount": {
        "value": "0.5",
        "currency": "XRP"
      }
    }
  }

const secret = 'shsWGZcmZz6YsWWmcnpfr6fLTdtFV'

 return api.preparePayment(address, payment).then(prepared => {
    console.log('Payment transaction prepared...');
    const {signedTransaction} = api.sign(prepared.txJSON, secret);
    console.log('Payment transaction signed...');
    return api.submit(signedTransaction).then(success => {
      console.log(success)
    })
  });
});

api.on('disconnected', (code) => {
  // code - [close code](https://developer.mozilla.org/en-US/docs/Web/API/CloseEvent) sent by the server
  // will be 1000 if this was normal closure
  console.log('disconnected, code:', code);
});

