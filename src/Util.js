export class Table {
    constructor(avg, latest, classification) {
        this.avg = avg;
        this.latest = latest;
        this.classification = classification;
    }
}

export function indicatiors(latest, logging = false) {
    if (latest.classification === 'GREED' || latest.classification === 'EXTREME GREED') {
        logging && console.log(`Index is ${latest.classification}. Selling!`)
        return 'SELL';
    } else if (latest.classification === 'FEAR' || latest.classification === 'EXTREME FEAR') {
        logging && console.log(`Index is ${latest.classification}. Buying!`)
        return 'BUY';
    }
    logging && console.log("Index is NEUTRAL. Hodl baby!")
    return 'HOLD';
}