
import { buy, sell } from './BinanceClient.js';
import { fetchGreedAndFearIndex } from './GreedAndFear.js';
import { indicatiors } from './Util.js';

export async function run () {
    const index = await fetchGreedAndFearIndex(1);

    const latest = index[index.length-1];

    const indicator = indicatiors(latest, true);

    if(indicator === "SELL") {
        sell('BTC/USDT', 0.01)    
    } else if (indicator === 'BUY') {
        buy('BTC/USDT', 0.01)
    }
};
