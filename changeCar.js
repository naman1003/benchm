'use strict';

module.exports.info = 'Changing car owners.';

let txIndex = 0;
let colors = ['blue', 'red', 'green', 'yellow', 'black', 'purple', 'white', 'violet', 'indigo', 'brown'];
let makes = ['Toyota', 'Ford', 'Hyundai', 'Volkswagen', 'Tesla', 'Peugeot', 'Chery', 'Fiat', 'Tata', 'Holden'];
let models = ['Prius', 'Mustang', 'Tucson', 'Passat', 'S', '205', 'S22L', 'Punto', 'Nano', 'Barina'];
let owners = ['Tomoko', 'Brad', 'Jin Soo', 'Max', 'Adrianna', 'Michel', 'Aarav', 'Pari', 'Valeria', 'Shotaro'];
let prev_owners = ['Tomoko1', 'Brad1', 'Jin Soo1', 'Max1', 'Adrianna1', 'Michel1', 'Aarav1', 'Pari1', 'Valeria1', 'Shotaro1'];
let bc, contx;

module.exports.init = function(blockchain, context, args) {
    bc = blockchain;
    contx = context;

    return Promise.resolve();
};

module.exports.run = function() {
    txIndex++;
    let carNumber = 'Client' + contx.clientIdx + '_CAR' + txIndex.toString();
    let carColor = colors[Math.floor(Math.random() * colors.length)];
    let carMake = makes[Math.floor(Math.random() * makes.length)];
    let carModel = models[Math.floor(Math.random() * models.length)];
    let carOwner = owners[Math.floor(Math.random() * owners.length)];
    let prevcarOwner = prev_owners[Math.floor(Math.random() * prev_owners.length)];

    let args = {
        chaincodeFunction: 'changeCarOwner',
        chaincodeArguments: [carNumber, carMake, carModel, carColor, carOwner, prevcarOwner]
    };

    return bc.invokeSmartContract(contx, 'fabcar', 'v1', args, 30);
};

module.exports.end = function() {
    return Promise.resolve();
};
