'use strict';

module.exports.info = 'Querying all cars.';

const helper = require('./helper1');

let startingKey, endingKey, bc, contx;

module.exports.init = async function (blockchain, context, args) {
    bc = blockchain;
    contx = context;

    await helper.createToken(bc, contx, args);

    startingKey = 'Client' + contx.clientIdx + '_TOKEN' + args.startKey;
    endingKey = 'Client' + contx.clientIdx + '_TOKEN' + args.endKey;

    return Promise.resolve();
};

module.exports.run = function () {

    let args = {
        chaincodeFunction: 'queryAllToken',
        chaincodeArguments: [startingKey, endingKey]     
    };

    return bc.bcObj.querySmartContract(contx, 'fabcar', 'v1', args, 60)

};

module.exports.end = function () {
    return Promise.resolve();
};
