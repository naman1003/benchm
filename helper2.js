'use strict';

let colors = ['blue', 'red', 'green', 'yellow', 'black', 'purple', 'white', 'violet', 'indigo', 'brown'];
let makes = ['Toyota', 'Ford', 'Hyundai', 'Volkswagen', 'Tesla', 'Peugeot', 'Chery', 'Fiat', 'Tata', 'Holden'];
let models = ['Prius', 'Mustang', 'Tucson', 'Passat', 'S', '205', 'S22L', 'Punto', 'Nano', 'Barina'];
let owners = ['Tomoko', 'Brad', 'Jin Soo', 'Max', 'Adrianna', 'Michel', 'Aarav', 'Pari', 'Valeria', 'Shotaro'];
let prev_owners = ['Tomoko1', 'Brad1', 'Jin Soo1', 'Max1', 'Adrianna1', 'Michel1', 'Aarav1', 'Pari1', 'Valeria1', 'Shotaro1'];

let carNumber;
let txIndex = 0;

module.exports.createCar = async function (bc, contx, args, color, make, model, owner, prev_owner) {

    while (txIndex < args.assets) {
        txIndex++;
        carNumber = 'Client' + contx.clientIdx + '_CAR' + txIndex.toString();
        color = colors[Math.floor(Math.random() * colors.length)];
        make = makes[Math.floor(Math.random() * makes.length)];
        model = models[Math.floor(Math.random() * models.length)];
        owner = owners[Math.floor(Math.random() * owners.length)];
        prev_owner = prev_owners[Math.floor(Math.random() * prev_owners.length)];
    
        let myArgs = {
            chaincodeFunction: 'changeCarOwner',
            chaincodeArguments: [carNumber, make, model, color, owner, prev_owner]
        };
    
        await bc.invokeSmartContract(contx, 'fabcar', 'v1', myArgs, 30);
    }

};
