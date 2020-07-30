'use strict';

module.exports.info = 'Querying a car.';

const helper = require('./helper1');

let txIndex = 0;
let limitIndex, bc, contx;

module.exports.init = async function(blockchain, context, args) {
    bc = blockchain;
    contx = context;
    limitIndex = args.assets;

    await helper.createToken(bc, contx, args);

    return Promise.resolve();
};

module.exports.run = function() {
    txIndex++;
    let tokenNumber = 'Client' + contx.clientIdx + '_TOKEN' + txIndex.toString();

    let args = {
        chaincodeFunction: 'queryCarToken',
        chaincodeArguments: [tokenNumber]
    };

    if (txIndex === limitIndex) {
        txIndex = 0;
    }

    return bc.bcObj.querySmartContract(contx, 'fabcar', 'v1', args, 30);
};

module.exports.end = function() {
    return Promise.resolve();
};
