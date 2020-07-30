'use strict';

const { Contract } = require('fabric-contract-api');

class FabCar extends Contract {

    async init(){
        return;
    }

    async initLedger(ctx) {
        console.info('============= START : Initialize Ledger ===========');
        const cars = [
            {
                color: 'blue',
                make: 'Toyota',
                model: 'Prius',
                owner: 'Tomoko',
            },
            {
                color: 'red',
                make: 'Ford',
                model: 'Mustang',
                owner: 'Brad',
            },
            {
                color: 'green',
                make: 'Hyundai',
                model: 'Tucson',
                owner: 'Jin Soo',
            },
            {
                color: 'yellow',
                make: 'Volkswagen',
                model: 'Passat',
                owner: 'Max',
            },
            {
                color: 'black',
                make: 'Tesla',
                model: 'S',
                owner: 'Adriana',
            },
            {
                color: 'purple',
                make: 'Peugeot',
                model: '205',
                owner: 'Michel',
            },
            {
                color: 'white',
                make: 'Chery',
                model: 'S22L',
                owner: 'Aarav',
            },
            {
                color: 'violet',
                make: 'Fiat',
                model: 'Punto',
                owner: 'Pari',
            },
            {
                color: 'indigo',
                make: 'Tata',
                model: 'Nano',
                owner: 'Valeria',
            },
            {
                color: 'brown',
                make: 'Holden',
                model: 'Barina',
                owner: 'Shotaro',
            },
        ];
        
        const txns =[
            {
                requester: 'Steward',
                provider: 'Bob',
            },
            ];

        for (let i = 0; i < cars.length; i++) {
            cars[i].docType = 'car';
            await ctx.stub.putState('CAR' + i, Buffer.from(JSON.stringify(cars[i])));
            console.info('Added <--> ', cars[i]);
        }
        
        await ctx.stub.putState('TOKEN' + 0, Buffer.from(JSON.stringify(txns[0])));
            console.info('Added <--> ', txns[0]);
            
        console.info('============= END : Initialize Ledger ===========');
    }

    async queryCar(ctx, carNumber) {
        const carAsBytes = await ctx.stub.getState(carNumber); // get the car from chaincode state
        if (!carAsBytes || carAsBytes.length === 0) {
            throw new Error(`${carNumber} does not exist`);
        }
        console.log(carAsBytes.toString());
        return carAsBytes.toString();
    }

    async createCar(ctx, carNumber, make, model, color, owner) {
        console.info('============= START : Create Car ===========');

        const car = {
            color,
            docType: 'car',
            make,
            model,
            owner,
        };

        await ctx.stub.putState(carNumber, Buffer.from(JSON.stringify(car)));
        console.info('============= END : Create Car ===========');
    }

    async deleteCars(ctx, cars) {
        const deleteCars = JSON.parse(cars);
        console.log(`All cars ${deleteCars}`);

        for (let carNumber of deleteCars) {
            console.log(`Deleting car ${carNumber} from world state`)
            await ctx.stub.deleteState(carNumber);
        }
    }

    async queryCarsByRangeWithPagination(ctx, startKey, batchSize) {
        let { iterator, metadata} = await ctx.stub.getStateByRangeWithPagination(startKey, undefined, parseInt(batchSize,10));

        let carResults = [];
        let results = await iterator.next();
        let iterate = results.value ? true: false;
        while (iterate) {
            if (results.value && results.value.value.toString()) {
                const Key = results.value.key;
                carResults.push(Key);
            }
            if (results.done) {
                iterate = false;
                await iterator.close();
                console.log('End of data.');
                console.info(carResults);
            } else {
                results = await iterator.next();
            }
        }
        return JSON.stringify(carResults);
    }
    
        async subToken(ctx, tokNumber, requester, provider,msg)
    {
        const txn = {
           requester,
           provider,
           msg,
           };
        
        await ctx.stub.putState(tokNumber, Buffer.from(JSON.stringify(txn)));
     }  
    

    async queryAllCars(ctx) {
        const startKey = 'CAR0';
        const endKey = 'CAR999';

        const iterator = await ctx.stub.getStateByRange(startKey, endKey);

        const allResults = [];
        while (true) {
            const res = await iterator.next();

            if (res.value && res.value.value.toString()) {
                console.log(res.value.value.toString('utf8'));

                const Key = res.value.key;
                let Record;
                try {
                    Record = JSON.parse(res.value.value.toString('utf8'));
                } catch (err) {
                    console.log(err);
                    Record = res.value.value.toString('utf8');
                }
                allResults.push({ Key, Record });
            }
            if (res.done) {
                console.log('end of data');
                await iterator.close();
                console.info(allResults);
                return JSON.stringify(allResults);
            }
        }
    }

    async queryAllToken(ctx) {
        const startKey = 'TOKEN0';
        const endKey = 'TOKEN999';

        const iterator = await ctx.stub.getStateByRange(startKey, endKey);

        const allResults = [];
        while (true) {
            const res = await iterator.next();

            if (res.value && res.value.value.toString()) {
                console.log(res.value.value.toString('utf8'));

                const Key = res.value.key;
                let Record;
                try {
                    Record = JSON.parse(res.value.value.toString('utf8'));
                } catch (err) {
                    console.log(err);
                    Record = res.value.value.toString('utf8');
                }
                allResults.push({ Key, Record });
            }
            if (res.done) {
                console.log('end of data');
                await iterator.close();
                console.info(allResults);
                return JSON.stringify(allResults);
            }
        }
    }


  async changeCarOwner(ctx, carNumber, make, model, color, owner,prev_own) {
        console.info('============= START : changeCarOwner ===========');
        const car = {
            color,
            docType: 'car',
            make,
            model,
            owner,
            prev_own,
        };
        

        await ctx.stub.putState(carNumber, Buffer.from(JSON.stringify(car)));
        console.info('============= END : changeCarOwner ===========');
    }
    
  async queryCarToken(ctx, carNumber) {
        const carAsBytes = await ctx.stub.getState(carNumber); // get the car from chaincode state
        if (!carAsBytes || carAsBytes.length === 0) {
            throw new Error(`${carNumber} does not exist`);
        }
        console.log(carAsBytes.toString());
       return carAsBytes.toString();
       
    }
    
           async return_txn(ctx,giv_did,this_per,other_per,car_num, make, model,clientIdx)
        {
        var k;
        var num;
        var car_;
        var result;
        const allres= [];
        var owner;
        var prev_owner;
        var buyer;
        var seller;
        var carAsBytes;
        for(k=0; k<car_num+1; k++)
        {
        num= k+1;
        car_= 'Client' + clientIdx +'_CAR' + num.toString();
        //result = await contract.evaluateTransaction('queryCar', car_);
        //result1= result.toString();
         carAsBytes = await ctx.stub.getState(car_); // get the car from chaincode state
        if (!carAsBytes || carAsBytes.length === 0) {
            throw new Error(`${carNumber} does not exist`);
        }
        result = (carAsBytes.toString());
       
        //owner= await get_owner(result1);
var count=0;
var start_index=0;
var i;
for (i = 0; i < result.length; i++) 
{
  if(result[i]==",")
  {count= count+1;
  }
  
  if(count==4)
  {
  start_index=i+10;
  break;
  }
  }
owner= "";
var j;
for (j= start_index; j< result.length; j++)
{if(result[j]=="\"")
{
break;
}
else
{ owner = owner.concat(result[j]);
  
}}
        
        //prev_owner= await get_prev_owner(result1);
count=0;
start_index=0;

for (i = 0; i < result.length; i++) {
  if(result[i]==",")
  {count= count+1;
  }
  
  if(count==5)
  {
  start_index=i+13;
  break;
  }
  }
prev_owner= "";

for (j= start_index; j< result.length; j++)
{if(result[j]=="\"")
{
break;
}
else
{ prev_owner = prev_owner.concat(result[j]);
  
}
}
        
        if(owner==giv_did)
        {
        //await print_(result1,this_per,other_per,make,model);
        buyer=this_per;
        seller = other_per;
        break;
        }
        else if(prev_owner==giv_did)
        {
         //await print_(result1, other_per, this_per,make,model)
         buyer= other_per;
         seller= this_per;
         break;
         }
        }
        
if(make=='true' && model== 'true')
{
var final_str="";
var count=0;
for(var i=0; i< result.length; i++)
{
if(result[i]==",")
  {count= count+1;
  }
  
  final_str= final_str.concat(result[i]);
 if(count==4)
 {
 break;
 }
 }
 final_str= final_str + "buyer:" + buyer + ", seller:" +seller +"}";
 allres.push({txn : final_str});
 }
 
else 
{
if(make=='true' && model== 'false')
{
var final_str="";
var count=0;
for(var i=0; i< result.length; i++)
{
if(result[i]==",")
  {count= count+1;
  }
  
  final_str= final_str.concat(result[i]);
 if(count==3)
 {
 break;
 }
 }
 final_str= final_str + "buyer:" + buyer + ", seller:" +seller +"}";
  allres.push({txn : final_str});
 }
 
else
// (make=='false' && model== 'true')
{
//console.log("reached here");
var final_str="";
var count=0;
for(var i=0; i< result.length; i++)
{
if(result[i]==",")
  {count= count+1;
  }
  
  final_str= final_str.concat(result[i]);
 if(count==2)
 {
 i=i+1;
 for(var j=i;j<result.length;j++)
 {
 if(result[j]==",")
 {
 i=j;
 count=count+1;
 //final_str= final_str.concat(result[i]);
 break;
 }
 }
 }
 if(count==4)
 {
 break;
 }
 }
 final_str= final_str + "buyer:" + buyer + ", seller:" +seller +"}";
  allres.push({txn : final_str});
 }
 }
 return JSON.stringify(allres);
 }
    
    


    
}

module.exports = FabCar;
