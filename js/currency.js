// function httpGet(theUrl)
// {
//     var xmlHttp = null;
//     xmlHttp = new XMLHttpRequest();
//     xmlHttp.open( "GET", theUrl, false );
//     xmlHttp.send( null );
//     return xmlHttp.responseText;
// }
// function currencyRates(currency_from,currency_to){
// var yql_base_url = "https://query.yahooapis.com/v1/public/yql";
// var yql_query = 'select%20*%20from%20yahoo.finance.xchange%20where%20pair%20in%20("'+currency_from+currency_to+'")';
// var yql_query_url = yql_base_url + "?q=" + yql_query + "&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
// var http_response = httpGet(yql_query_url);
// var http_response_json = JSON.parse(http_response);
// //console.log(http_response);
// var rate = http_response_json.query.results.rate.Rate;
// return rate
// }

// var currency_from = ""; 
// var currency_to = "";
// var EUR_INR = currencyRates("EUR","INR");
// var EUR_USD = currencyRates("EUR","USD");
// var crate = EUR_INR;
// var sc = document.getElementById('sc').value;
// function selectCurrency(sc){
//     switch(sc){
//         case "INR":
//                     crate = EUR_INR;
//                     break;
//         case "USD":
//                     crate = EUR_USD;
//                     break;
//         default :
//                     crate = 0;
//      }
// }

// function currencyConverter(crate, currency_input){
//     return crate * currency_input;
// }

// var currency_input = 100;
// var rate = currencyConverter(crate,currency_input);
// console.log(rate);


