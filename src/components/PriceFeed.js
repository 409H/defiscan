import axios from 'axios'
const PRICE_FEED_API = "https://defiscan-api.herokuapp.com/api/v1/price/{TICKER}/usd"
const PRICE_FEED_SETTINGS = "https://defiscan-api.herokuapp.com/api/v1/price/settings"

async function getPriceFeed(strTicker) {
    const objResponse = await axios(PRICE_FEED_API.replace("{TICKER}", strTicker));
    if(objResponse.data.prices.price) {
        return objResponse.data;
    } else {
        return {
            "error": "Cannot get feed"
        }
    }
}

function getPriceFeedSettings() {
    return axios(PRICE_FEED_SETTINGS)
        .then(response => {
            return response;
        })
        .catch(function(error) {
            return {
                "refresh_rate": -1
            }
        })
}

export { getPriceFeed, getPriceFeedSettings }