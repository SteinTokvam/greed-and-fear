import ccxt from 'ccxt';

// Konfigurer din Binance API-nøkkel og hemmelighet
const apiKey = '';
const secret = '';

// Initialiser binance
const binance = apiKey !== '' ? new ccxt.binance({
    apiKey: apiKey,
    secret: secret,
    enableRateLimit: true
}) : undefined;

// Kjøp-funksjon
export async function buy(symbol, amount) {
    if (!binance) {
        console.error('API Key not set. Cannot buy.');
        return;
    }
    try {
        // Få gjeldende markedspris
        const ticker = await binance.fetchTicker(symbol);
        const price = ticker.ask;  // Beste tilgjengelige salgspris (ask)

        // Utfør kjøp
        const order = await binance.createLimitBuyOrder(symbol, amount, price);
        console.log('Kjøpsordre opprettet:', order);
        return order;
    } catch (error) {
        console.error('Feil ved kjøp:', error);
    }
}

// Salg-funksjon
export async function sell(symbol, amount) {
    if (!binance) {
        console.error('API Key not set. Cannot sell.');
        return;
    }
    try {
        // Få gjeldende markedspris
        const ticker = await binance.fetchTicker(symbol);
        const price = ticker.bid;  // Beste tilgjengelige kjøpspris (bid)

        // Utfør salg
        const order = await binance.createLimitSellOrder(symbol, amount, price);
        console.log('Salgsordre opprettet:', order);
        return order;
    } catch (error) {
        console.error('Feil ved salg:', error);
    }
}