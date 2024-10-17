function GreedAndFear(value, classification, timestamp) {
    this.value = value;
    this.classification = classification;
    this.timestamp = timestamp;
}

export async function fetchGreedAndFearIndex(limit) {
    const greed_and_fear_index = await fetch(`https://api.alternative.me/fng/?limit=${limit}`)
        .then(response => response.json())
        .then(data => data.data.map(data => {
            return new GreedAndFear(
                parseInt(data.value),
                data.value_classification.toUpperCase(),
                new Date(data.timestamp * 1000)
            )
        }));
    return greed_and_fear_index.toSorted((a, b) => a.timestamp - b.timestamp);
}