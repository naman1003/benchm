'use strict';

module.exports.info = 'Querying all cars.';

const helper = require('./helper2');

let bc, contx;

module.exports.init = async function (blockchain, context, args) {
    bc = blockchain;
    contx = context;

    await helper.createCar(bc, contx, args);

    //startingKey = 'Client' + contx.clientIdx + '_CAR' + args.startKey;
    //endingKey = 'Client' + contx.clientIdx + '_CAR' + args.endKey;

    return Promise.resolve();
};

module.exports.run = function () {

    let args = {
        chaincodeFunction: 'return_txn',
        chaincodeArguments: ['Michel', 'person1', 'person2', 99, 'true', 'false', contx.clientIdx ]     
    };

    return bc.bcObj.querySmartContract(contx, 'fabcar', 'v1', args, 30)

};

module.exports.end = function () {
    return Promise.resolve();
};
