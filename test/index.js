import fs from 'fs';
import { fetchGreedAndFearIndex } from '../src/GreedAndFear.js';
import { indicatiors } from '../src/Util.js';

function parseCSV(csvString) {
    const lines = csvString.split('\n'); 

    const headers = lines[0].split(','); 

    const rows = lines.slice(1).map(line => {
        const values = line.split(','); 
        let obj = {};
        headers.forEach((header, index) => {
            obj[header.trim()] = values[index].trim(); 
        });
        return obj;
    });

    return rows.map(row => {
        return {
            open: parseFloat(row.Open),
            high: parseFloat(row.High),
            low: parseFloat(row.Low),
            close: parseFloat(row.Close),
            date: new Date(row.Start),
        }
    }).reverse();
}

class Development {
    constructor(balance, date, price, holding) {
        this.balance = balance;
        this.date = date;
        this.price = price;
        this.holding = holding;
    }
}

async function test(csvFilePath, length) {

    const index = await fetchGreedAndFearIndex(length);
    index.pop();

    var res = {}

    
    fs.readFile(csvFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Feil ved lesing av fil:', err);
            return;
        }

        const parsedData = parseCSV(data);

        const result = []

        const startingBalance = 100000
        var balance = startingBalance
        var holding = []
        const logging = false
        for (let i = 0; i < parsedData.length; i++) {
            
            const indicator = indicatiors(index[i], logging);
            if(indicator === "SELL") {
                if (holding.length === 0) {
                    logging && console.log("Not holding anything. Nothing to sell.")
                } else {
                    
                    balance += holding[0].amount * parsedData[i].close
                    holding.shift()
                }
            } else if (indicator === 'BUY') {
                if(balance >= 0.1 * parsedData[i].close) {
                    holding.push({
                        amount: 0.1,
                        price: parsedData[i].close
                    })
                    balance -= 0.1 * parsedData[i].close    
                } else if(balance <= 0) {
                    logging && console.log("Not enough money. can't buy")
                } else {
                    holding.push({
                        amount: balance / parsedData[i].close,
                        price: parsedData[i].close
                    })
                    balance = 0
                }
            }
            
            result.push(new Development(balance, parsedData[i].date, parsedData[i].close, holding.length))
        }
        logging && console.table(result)
        holding.forEach(element => {
            balance += element.amount * parsedData[parsedData.length - 1].close
        })

        
        res = {
            balance,
            pl: (((balance/startingBalance)-1)*100).toFixed(2),
            startDate: parsedData[0].date,
            endDate: parsedData[parsedData.length - 1].date
        }
        console.log(res)
    });
}

//Only works today 2024-10-17
test('bitcoin_2023-10-18_2024-10-17.csv', 366)
test('bitcoin_2020-10-17_2024-10-17.csv', 1462)