'use strict';

let provider = ['Toyota', 'Ford', 'Hyundai', 'Volkswagen', 'Tesla', 'Peugeot', 'Chery', 'Fiat', 'Tata', 'Holden'];
let msg = ['Prius', 'Mustang', 'Tucson', 'Passat', 'S', '205', 'S22L', 'Punto', 'Nano', 'Barina'];
let requester = ['Tomoko', 'Brad', 'Jin Soo', 'Max', 'Adrianna', 'Michel', 'Aarav', 'Pari', 'Valeria', 'Shotaro'];

let tokenNumber;
let txIndex = 0;

module.exports.createToken = async function (bc, contx, args, provider1, requester1, msg1) {

    while (txIndex < args.assets) {
        txIndex++;
        tokenNumber = 'Client' + contx.clientIdx + '_TOKEN' + txIndex.toString();
        let provider1 = provider[Math.floor(Math.random() * provider.length)];
        let requester1 = requester[Math.floor(Math.random() * requester.length)];
        let msg1 = msg[Math.floor(Math.random() * msg.length)];
    
        let myArgs = {
            chaincodeFunction: 'subToken',
            chaincodeArguments: [tokenNumber, requester1 , provider1 ,msg1]
        };
    
        await bc.invokeSmartContract(contx, 'fabcar', 'v1', myArgs, 30);
    }

};
