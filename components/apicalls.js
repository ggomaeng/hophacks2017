import moment from 'moment';

const ENDPOINT_URL = 'http://api.reimaginebanking.com';
const API_KEY = '5a9650e5909592b214a68ecf5a3c28ca';
const BITCOIN_PRICE_URL = 'https://api.coinmarketcap.com/v1/ticker/bitcoin/';

export async function getBitcoinPrice() {
  try {
    let response = await fetch(`${BITCOIN_PRICE_URL}`);
    let responseJson = await response.json();
    // console.log(responseJson[0]);
    return responseJson && responseJson[0];
  } catch (error) {
    console.error(error);
  }
}


function generateURL(path, morethanone) {
  const more = morethanone ? '&' : '?';
  return `${ENDPOINT_URL}/${path}${more}key=${API_KEY}`;
}

export async function getAccounts() {
  try {
    let response = await fetch(generateURL('accounts'));
    let responseJson = await response.json();
    // console.log(responseJson);
    return responseJson;
  } catch (error) {
    console.error(error);
  }
}


export async function getAccountInfo(id) {
  try {
    let response = await fetch(generateURL(`accounts/${id}`));
    let responseJson = await response.json();
    // console.log(responseJson);
    return responseJson;
  } catch (error) {
    console.error(error);
  }
}

export async function getTransactions(bitcoin_id, bank_id) {
  try {
    var response = await fetch(generateURL(`accounts/${bitcoin_id}/transfers?type=payer`, true));
    var result1 = await response.json();
    var response2 = await fetch(generateURL(`accounts/${bitcoin_id}/transfers?type=payee`, true));
    var result2 = await response2.json();
    var response3 = await fetch(generateURL(`accounts/${bank_id}/transfers?type=payer`, true));
    var result3 = await response3.json();
    var response4 = await fetch(generateURL(`accounts/${bank_id}/transfers?type=payee`, true));
    var result4 = await response4.json();

    var finalresult = result1.concat(result2).concat(result3).concat(result4);
    console.log(finalresult);
    return finalresult;
  } catch (error) {
    console.error(error);
  }
}

export async function transfer(from, to, amount, description) {

  // console.log(from, to, amount, description);

  const body = {
    medium: 'balance',
    payee_id: to,
    amount: parseFloat(amount),
    transaction_date: moment().format(),
    description: description
  }

  console.log(JSON.stringify(body));

  const options = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body)
  }


  try {
    let response = await fetch(generateURL(`accounts/${from}/transfers`), options);
    let responseJson = await response.json();
    console.log(responseJson);
    return responseJson;
  } catch (error) {
    console.error(error);
  }

}