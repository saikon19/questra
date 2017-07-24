function httpGet(theUrl)
{
    var xmlHttp = null;
    xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false );
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

var currency_from = ""; 
var currency_to = "";
var currency_input = 0;

function currencyRates(currency_from,currency_to){
var yql_base_url = "https://query.yahooapis.com/v1/public/yql";
var yql_query = 'select%20*%20from%20yahoo.finance.xchange%20where%20pair%20in%20("'+currency_from+currency_to+'")';
var yql_query_url = yql_base_url + "?q=" + yql_query + "&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
var http_response = httpGet(yql_query_url);
var http_response_json = JSON.parse(http_response);
//console.log(http_response);
var rate = http_response_json.query.results.rate.Rate;
return rate
}

var EUR_INR = currencyRates("EUR","INR");
var EUR_USD = currencyRates("EUR","USD");
var EUR_GBP = currencyRates("EUR","GBP");
var crate = 0;

function currencyConverter(crate, currency_input){
    return crate * currency_input;
}

$(document).ready(function () {

    $('#sc').val("USD");

    var labels =["whitelbl","yellowlbl","greenlbl","bluelbl","redlbl","blacklbl","indigolbl"];
    var x,y;
    var sc = document.getElementById('sc');
        sc.addEventListener('change', function() {
            x = selectCurrency(this.value);
            y = selectCurrencySymbol(this.value);
            console.log(this.value);
            changelbl(x,y);
        // currencyConverter(crate,$('#startInvest').val());
        
    }, false);

    function changelbl(x,y){
        var con = x * $('#startInvest').val();
        $("#currency_label").html(y + "&nbsp;" + Math.round(con));
        for(var i=0; i<labels.length;i++){
            $("#"+labels[i]+"").html(""+y+"&nbsp;"+Math.round(currencyConverter(x, prices[i]))+"");
        }
     }

      function changeMainlbl(x,y){
        var con = x * $('#startInvest').val();
        $("#currency_label").html(y + "&nbsp;" + Math.round(con));
     }

    var sc_value;
    function selectCurrency(sc_value){
        switch(sc_value){
            case "INR":
                        crate = EUR_INR;
                        break;
            case "USD":
                        crate = EUR_USD;
                        break;
            case "GBP":
                        crate = EUR_GBP;
                        break;
            default :
                        crate = 0;
         }
                    console.log(crate);
                    return crate;
    }
    var symbol="";
    function selectCurrencySymbol(sc_value){
        switch(sc_value){
            case "INR":
                        symbol = "&#8377;";
                        break;
            case "USD":
                        symbol = "&dollar;";
                        break;
            case "GBP":
                        symbol = "&pound;";
                        break;
            default :
                        symbol = "&dollar;";
         }
                    console.log(symbol);
                    return symbol;
    }

    $("#startInvest").on("input", function () {
        changeMainlbl(x,y);
    });
});
