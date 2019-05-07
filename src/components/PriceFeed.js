import axios from 'axios'
const PRICE_FEED_API = "https://defiscan-api.herokuapp.com/api/price/{TICKER}/usd"

async function getPriceFeed(strTicker) {
    const objResponse = await axios(PRICE_FEED_API.replace("{TICKER}", strTicker));
    console.log(objResponse)
    if(objResponse.data.prices.price) {
        return objResponse.data;
    } else {
        return {
            "error": "Cannot get feed"
        }
    }
}

export { getPriceFeed }