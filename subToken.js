'use strict';

module.exports.info = 'Submitting tokens.';

let txIndex = 0;
let provider = ['Toyota', 'Ford', 'Hyundai', 'Volkswagen', 'Tesla', 'Peugeot', 'Chery', 'Fiat', 'Tata', 'Holden'];
let msg = ['Prius', 'Mustang', 'Tucson', 'Passat', 'S', '205', 'S22L', 'Punto', 'Nano', 'Barina'];
let requester = ['Tomoko', 'Brad', 'Jin Soo', 'Max', 'Adrianna', 'Michel', 'Aarav', 'Pari', 'Valeria', 'Shotaro'];
let bc, contx;

module.exports.init = function(blockchain, context, args) {
    bc = blockchain;
    contx = context;

    return Promise.resolve();
};

module.exports.run = function() {
    txIndex++;
    let tokenNumber = 'Client' + contx.clientIdx + '_TOKEN' + txIndex.toString();
    let provider1 = provider[Math.floor(Math.random() * provider.length)];
    let requester1 = requester[Math.floor(Math.random() * requester.length)];
    let msg1 = msg[Math.floor(Math.random() * msg.length)];
    

    let args = {
        chaincodeFunction: 'subToken',
        chaincodeArguments: [tokenNumber, requester1, provider1, msg1]
    };

    return bc.invokeSmartContract(contx, 'fabcar', 'v1', args, 30);
};

module.exports.end = function() {
    return Promise.resolve();
};
