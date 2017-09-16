const ENDPOINT_URL = 'http://api.reimaginebanking.com';
const API_KEY = '5a9650e5909592b214a68ecf5a3c28ca';
const BITCOIN_PRICE_URL = 'https://api.coinmarketcap.com/v1/ticker/bitcoin/';

export async function getBitcoinPrice() {
    try {
        let response = await fetch(`${BITCOIN_PRICE_URL}`);
        let responseJson = await response.json();
        console.log(responseJson[0]);
        return responseJson && responseJson[0];
      } catch(error) {
        console.error(error);
      }
}


function generateURL(path) {
    return `${ENDPOINT_URL}/${path}?key=${API_KEY}`;
}

export async function getAccounts() {
    try {
        let response = await fetch(generateURL('accounts'));
        let responseJson = await response.json();
        console.log(responseJson);
        return responseJson;
      } catch(error) {
        console.error(error);
      }
}


export async function getAccountInfo(id) {
    try {
        let response = await fetch(generateURL(`accounts/${id}`));
        let responseJson = await response.json();
        console.log(responseJson);
        return responseJson;
      } catch(error) {
        console.error(error);
      }
}