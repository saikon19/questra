var packages = ["white", "yellow", "green", "blue", "red", "black", "indigo"],
    prices = [90, 270, 810, 2430, 7290, 21870, 65610],
    commission = [.39, .36, .3, .24, .21, .1, .07],
    insurance = .1,
    revenue = 0,
    profits = [];
function account_to_packages(account) {
    for (var a = [], r = 0, t = prices.length - 1; t >= 0; t--)r = Math.floor(account / prices[t]), account -= prices[t] * r, a.push(r);
    return {numOfPackageArr: a.reverse(), account: account}
}
function getDateFormated(e) {
    var a = e.getDate() < 10 ? "0" + e.getDate() : e.getDate(), r = e.getMonth() + 1;
    r = 10 > r ? "0" + r : r;
    var t = e.getFullYear();
    return a + "/" + r + "/" + t
}

// function httpGet(theUrl)
// {
//     var xmlHttp = null;
//     xmlHttp = new XMLHttpRequest();
//     xmlHttp.open( "GET", theUrl, false );
//     xmlHttp.send( null );
//     return xmlHttp.responseText;
// }

function Get(yourUrl){
    var Httpreq = new XMLHttpRequest(); // a new request
    Httpreq.open("GET",yourUrl,false);
    Httpreq.send(null);
    return Httpreq.responseText;          
}

var Json_Obj=JSON.parse(Get('https://api.fixer.io/latest'));

console.log(Json_Obj);


// var currency_from = ""; 
// var currency_to = "";
// var currency_input = 0;

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


function currencyConverter(crate, currency_input){
    return crate * currency_input;
}

$(document).ready(function () {

    var myDDL = document.getElementById("sc");
    for (i = 0; i < Object.keys(Json_Obj.rates).length; i++) {
       var option = document.createElement("option");
       option.text = Object.keys(Json_Obj.rates)[i];
       option.value = Object.values(Json_Obj.rates)[i];
       try {
           myDDL.options.add(option);
       }
       catch (e) {
           alert(e);
       }
    }
    

    revenue = ($("#pro_id").val())/100;
    $("#pro_id").on("input", function (){
        revenue = ($("#pro_id").val())/100;
    });

    
    var labels =["whitelbl","yellowlbl","greenlbl","bluelbl","redlbl","blacklbl","indigolbl"];
    // var EUR_USD = Object.values(Json_Obj.rates)[29];
    // var x = EUR_USD,y ="&dollar;";
    var EUR_INR = Object.values(Json_Obj.rates)[14];
    var x = EUR_INR,y ="&#8377;";
    
    var sc = document.getElementById('sc');
        sc.addEventListener('change', function() {
            x = this.value;
            y = selectCurrencySymbol(this.options[this.selectedIndex].text );
            changelbl(x,y);
        // currencyConverter(crate,$('#startInvest').val());
        
    }, false);

    $('#cur_rate').on('input', function() { 
       x=$(this).val(); // get the current value of the input field.
       changelbl(x,y);
    });

    function changelbl(x,y){
        var con = x * $('#startInvest').val();
        $("#currency_label").html(y + "&nbsp;" +qlString(Math.round(con)));
        for(var i=0; i<labels.length;i++){
            $("#"+labels[i]+"").html(""+y+"&nbsp;"+qlString(Math.round(currencyConverter(x, prices[i])))+"");
        }
        $("#con_rates").html(y+"&nbsp;");
        $("#cur_rate").val(x);
     }

      function changeMainlbl(x,y){
        var con = x * $('#startInvest').val();
        $("#currency_label").html(y + "&nbsp;" +qlString(Math.round(con)));
     }

    var sc_value;
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
            case "JPY":
                        symbol = "&#165;";
                        break;
            case "CAD": 
                        symbol = "&#36;";
                        break;
            case "AUD":
                        symbol = "&#36;"
                        break;
            case "CNY":
                        symbol = "&#165;"
                        break;
            case "KRW":
                        symbol = "&#8361;"
                        break;
            case "MXN":
                        symbol = "&dollar;"
                        break;
            case "MYR":
                        symbol = "RM"
                        break;
            case "NOK":
                        symbol = "kr"
                        break;
            case "SEK":
                        symbol = "kr";
                        break;
            case "NZD":
                        symbol = "&dollar;";
                        break;
            case "PHP":
                        symbol="&#x20B1;";
                        break;
            case "PLN":
                        symbol="‎zł";
                        break;
            case "RUB":
                        symbol="‎₽";
                        break;
            case "SGD":
                        symbol="&dollar;";
                        break;
            case "THB": symbol="‎฿";
                        break;
            case "TRY": symbol ="₺";
                        break;
            case "ZAR":
                        symbol="R";
                        break;
            default :
                        symbol = "&curren;";
         }
                    // console.log(symbol);
                    return symbol;
    }

    $("#startInvest").on("input", function () {
        changeMainlbl(x,y);
    });

        changelbl(x,y);
        changeMainlbl(x,y);

        function qlString(n){
            if(y=="&#8377;")
                return n.toLocaleString('en-IN');
            else
                return n.toLocaleString('en-US');
        }

    $('[data-toggle="popover"]').popover();
    //$('.questra-radio').click(function(){
    //    $(this).popover('show');
    //});
    $('.questra-checkbox').click(function(){
        if(!$('#table_result').hasClass('hide')){
            $( "#calculate_button" ).trigger("click");
        }
    });
    $('#instruction').click(function(){
        var formula = $('#formula');
        if(formula.hasClass('hide')){
            formula.removeClass('hide');
            $('#instruction label').html('Hide formula');
        }else{
            formula.addClass('hide');
            $('#instruction label').html('Show formula');
        }
    });
    

    $('#table_view').click(function(){
            if($(this).prop("checked") == true){
                $('#table_fullview').removeClass('hide');
                $('#print_week').removeClass('disabled');
            }
            else if($(this).prop("checked") == false){
               $('#table_fullview').addClass('hide');
               $('#print_week').addClass('disabled');
            }
        });

    $('#table_year').click(function(){
            if($(this).prop("checked") == true){
                $('#summary_table').removeClass('hide');
                $('#print_year').removeClass('disabled');
            }
            else if($(this).prop("checked") == false){
               $('#summary_table').addClass('hide');
               $('#print_year').addClass('disabled');
            }
        });

    $('input').focus(function() { $(this).select(); } );
    $('.package').on('input', function () {
        $('startInvest').attr("readonly", "true"), $('#remain').hasClass("hide") || $('#remain').addClass("hide");
        for (var e = 0, a = 0; a < packages.length; a++) {
            var r = parseInt("" == $("#num-of-" + packages[a] + "-package").val() ? 0 : $("#num-of-" + packages[a] + "-package").val());
            e += r * prices[a]
        }
        $("#startInvest").val(e)
    });
    //$("#weeklyWithdrawAmount, #fromWeek, #toWeek, #startInvest, .package").on("input", function () {
    //    $('#redo').hasClass("hide") && $('#redo').removeClass("hide");
    //});

    $("#startInvest").on("input", function () {
        $(".package").attr("readonly", "true");
        var e = parseInt("" == $(this).val() ? 0 : $(this).val()), a = account_to_packages(e), r = a.numOfPackageArr;
        e = a.account;
        for (var t = 0; t < packages.length; t++)$("#num-of-" + packages[t] + "-package").val(r[t]);
        e > 0 ? ($('#remain_number').html(e), $('#remain').removeClass("hide")) : $("#remain").addClass("hide");
        
            // var currency_input= $(this).val();
            // var cur = currencyConverter(EUR_INR,currency_input);
            // console.log(cur);
            // $('#view_rupees').html(cur);
            
    });
    $("#redo_button").on("click", function (e) {
        $('#startInvest').removeAttr("readonly").val(0);
        $('.package').removeAttr("readonly").val(0);
        //$('#redo').hasClass("hide") || $('#redo').addClass("hide");
        $('#remain').hasClass("hide") || $('#remain').addClass("hide");
        // $('#questra-invest-manual-plan').prop('checked', true);
        // $('#questra-manual-plan').removeClass('hide');
        $('#weeklyWithdrawAmount').val(0);
        $('#fromWeek').val(0);
        $('#toWeek').val(0);
         $('#summary_table').addClass('hide');
        $('#table_fullview').addClass('hide');
        $('#print_buttons').addClass('hide');
        $('#summary').addClass('hide');
    });
    $("input[name='questra-invest-plan']").change(function(e){
        if($(this).attr('id') == 'questra-invest-manual-plan') {
            $('#questra-manual-plan').removeClass('disabled');
        } else {
            $('#questra-manual-plan').addClass('disabled');
            $('#weeklyWithdrawAmount').val(0);
        }
        //$('#redo').hasClass("hide") && $('#redo').removeClass("hide");
        $( "#calculate_button" ).trigger("click");
    });
    $('#calculate_button').on('click', function (argument) {

        $('#print_buttons').removeClass('hide');
        // Find the next Friday after next Monday
        var date = new Date();
        date.setDate(date.getDate() + (8 - date.getDay()) % 7 + 4);

        // Week profit
        var week_profit = 0;

        var startInvest = parseInt($('#startInvest').val() == "" ? 0 : $('#startInvest').val());
        var account = startInvest;
        var numOfPackagesArr = [];

       // Calculate insurance
        if($("#questra-insurance").is(':checked')){
            profits = [];
            for (var i = 0; i < packages.length; i++) {
                var profit = Math.round(prices[i] * revenue * (1 - insurance - commission[i]) * 100) / 100;
                profits.push(profit);
            }
        }
        else{
            profits = [];
            for (var i = 0; i < packages.length; i++) {
                var profit = Math.round(prices[i] * revenue * (1 - commission[i]) * 100) / 100;
                profits.push(profit);
            }
        }

       // Total amount invested
        var money_invested = 0;

        var withdraw_amount = parseInt(($('#weeklyWithdrawAmount').val() == "" ? 0 : $('#weeklyWithdrawAmount').val()));
        var allow_withdraw_amount = withdraw_amount;
        var fromWeek = parseInt(($('#fromWeek').val() == "" ? 0 : $('#fromWeek').val()));
        var toWeek = parseInt(($('#toWeek').val() == "" ? 0 : $('#toWeek').val()));
        var total_withdraw = 0;

        $('#table_result').hasClass('hide')&&$('#table_result').removeClass('hide')
        var table_result = $('#table_result tbody');
        var Summary_table_result = $('#Summary_table_result tbody');
        // Clear table
        table_result.html('');
        Summary_table_result.html('');

        // Create table header and body
        var table_header = "";
        for (var i = 0; i < packages.length; i++) {
            table_header += "<th><img src='images/" + packages[i] + "-package.png' class='img-rounded' width='30' height='30'></th>";
        }
        $("#questra-packagesColumn").replaceWith(table_header);

        var questra_invest_plan = $('input[name=questra-invest-plan]:checked').attr('id');

        var num_of_week = parseInt(($('#num-of-week').val() == "" ? 0 : $('#num-of-week').val()));
        for (var week = 1; week <= num_of_week; week++) {
            for (var i = 0; i < numOfPackagesArr.length; i++) {
                account += numOfPackagesArr[i] * prices[i];
            }
            account += week_profit;
            //account += 6;

            var obj = account_to_packages(account);
            numOfPackagesArr = obj.numOfPackageArr;
            account = obj.account;
            week_profit = 0;
            money_invested = 0;

            // Setup row and column
            var table_row = "";
            table_row = "<tr>" +
                "<td>" + week + "</td>" +
                "<td>" + getDateFormated(date) + "</td>";
            for (var i = 0; i < packages.length; i++) {
                table_row += "<td id='" + packages[i] + "_" + week + "' class='" + packages[i] + "'>" + numOfPackagesArr[i] 
                /*+ " <img src='../qgi/images/" + packages[i] + "-package.png' class='img-rounded' width='30' height='30'></td>"*/;
                week_profit += profits[i] * numOfPackagesArr[i];
                money_invested += numOfPackagesArr[i] * prices[i];
            }
            table_row += "<td id='week_profit_" + week + "'></td>";
            table_row += "<td id='account_" + week + "'></td>";
            table_row += "<td id='money_invested_" + week + "'></td>";
            table_row += "<td id='withdraw_amount_" + week + "'></td>";
            table_row += "</tr>";
            table_result.append(table_row);

            //Setup Summary_table_result
            var str ="";
            var week_interval =(week/52);
            if(week_interval %1 == 0){
                str = "<tr>"+
                "<td>"+week+"</td>"+
                "<td>"+getDateFormated(date)+"</td>"+
                "<td id='week_profit_s"+week+"'></td>"+
                "<td id='account_s" + week + "'></td>"+
                "<td id='money_invested_s" + week + "'></td>"+
                "<td id='withdraw_amount_s" + week + "'></td>"+
                "</tr>";
                Summary_table_result.append(str);
            }

            // Calculate weekly data
            switch(questra_invest_plan){
                case "questra-invest-manual-plan":
                    allow_withdraw_amount = withdraw_amount;
                    if (week >= fromWeek && week <= toWeek && allow_withdraw_amount > 0){
                        if (allow_withdraw_amount >= week_profit + account){
                            allow_withdraw_amount = week_profit + account;
                            week_profit = 0;
                            account = 0;
                        }else if (allow_withdraw_amount > week_profit){
                            account = account - (allow_withdraw_amount - week_profit);
                            week_profit = 0;
                        }else{
                            week_profit -= allow_withdraw_amount;
                        }
                        total_withdraw += allow_withdraw_amount;
                    }else{
                        allow_withdraw_amount = 0;
                    }
                    break;
                case "questra-invest-plan-A":
                    allow_withdraw_amount = 0;
                    break;
                case "questra-invest-plan-B":
                    fromWeek = 1;
                    allow_withdraw_amount = week_profit + account;
                    week_profit = 0;
                    account = 0;
                    total_withdraw += allow_withdraw_amount;
                    if (total_withdraw >= startInvest){
                        toWeek = week;
                        week_profit = total_withdraw - startInvest;
                        total_withdraw = startInvest;
                        allow_withdraw_amount -= week_profit;
                        questra_invest_plan = "questra-invest-plan-A";
                    }
                    break;
                case "questra-invest-plan-C":
                    fromWeek = 1;
                    toWeek = week;
                    allow_withdraw_amount = week_profit / 2;
                    week_profit -= allow_withdraw_amount;
                    total_withdraw += allow_withdraw_amount;
                    break;
                case "questra-invest-plan-D":
                    if(week <= num_of_week / 2){
                        fromWeek = week + 1;
                        allow_withdraw_amount = 0;
                    }else{
                        toWeek = week;
                        allow_withdraw_amount = week_profit + account;
                        week_profit = 0;
                        account = 0;
                        total_withdraw += allow_withdraw_amount;
                    }
                    break;
            }

            week_profit = Math.round(week_profit * 100) / 100;
            $('#week_profit_' + week + '').html("<span>&euro;&nbsp;" + qlString(week_profit)+"</span>");

            account = Math.round(account * 100) / 100;
            $('#account_' + week + '').html("<span>&euro;&nbsp;" + qlString(account) +"</span>");

            $('#money_invested_' + week + '').html("<span>&euro;&nbsp;" + qlString(money_invested) +"</span>");

            allow_withdraw_amount = Math.round(allow_withdraw_amount * 100) / 100;
            $('#withdraw_amount_' + week + '').html("<span>&euro;&nbsp;" + qlString(allow_withdraw_amount) +"</span>");

            if(week_interval % 1 == 0){
                $('#week_profit_s' + week + '').html("<span>&euro;&nbsp;" + qlString(week_profit)+"</span><span>&nbsp;("+y+"&nbsp;"+qlString(Math.round(x*week_profit))+")</span>");
                $('#account_s' + week + '').html("<span>&euro;&nbsp;" + qlString(account) +"</span><span>&nbsp;("+y+"&nbsp;"+qlString(Math.round(x*account))+")</span>");
                $('#money_invested_s' + week + '').html("<span>&euro;&nbsp;" + qlString(money_invested) +"</span><span>&nbsp;("+y+"&nbsp;"+qlString(Math.round(x*money_invested))+")</span>");
                $('#withdraw_amount_s' + week + '').html("<span>&euro;&nbsp;" + qlString(allow_withdraw_amount) +"</span><span>&nbsp;("+y+"&nbsp;"+qlString(Math.round(x*allow_withdraw_amount))+")</span>");
            }
            date.setDate(date.getDate() + 7);
        }

        // Summary
        total_withdraw = Math.round(total_withdraw * 100) / 100;
        var summary = $('#summary');
        $('#summary_startInvest').html("&euro;&nbsp;" + qlString($('#startInvest').val()) +"&nbsp;("+y+"&nbsp;"+qlString(Math.round(x*$('#startInvest').val()))+")");
        $('#summary_numOfWeek').html(num_of_week);
        $('#summary_moneyInvested').html("&euro;&nbsp;" + qlString(money_invested) +""+"&nbsp;("+y+"&nbsp;"+qlString(Math.round(x*money_invested))+")" );
        var numOfPackagesSummary = "";
        for (var i = 0; i < numOfPackagesArr.length; i++) {
            if (numOfPackagesArr[i] > 0) {
                numOfPackagesSummary += " " + numOfPackagesArr[i] + " <img src='images/" + packages[i] + "-package.png' class='img-rounded' width='30' height='30'> ";
            }
        }
        numOfPackagesSummary = numOfPackagesSummary.slice(0, -1);
        $('#summary_numOfActivePackages').html(numOfPackagesSummary);
        $('#summary_nextWeek').html(num_of_week + 1);
        var summary_imcome = week_profit + allow_withdraw_amount;
        summary_imcome = Math.round(summary_imcome * 100) / 100;
        $('#summary_income').html("&euro;&nbsp;" + qlString(summary_imcome) +"&nbsp;("+y+"&nbsp;"+qlString(Math.round(x*summary_imcome))+")");
        if (total_withdraw > 0) {
            $('#summary_withdraw').removeClass('hide');
            $('#summary_totalWithdraw').html("&euro;&nbsp;" + qlString(total_withdraw)  +"&nbsp;("+y+"&nbsp;"+qlString(Math.round(x*total_withdraw))+")");
            $('#summary_fromWeek').html(fromWeek);
            $('#summary_toWeek').html(toWeek);
        }else{
            $('#summary_withdraw').addClass('hide');
        }
        $('#summary_row').removeClass('hide');
        $('#summary').removeClass('hide');

            if($('#table_view').prop("checked") == true){
                $('#table_fullview').removeClass('hide');
            }
            else if($('#table_view').prop("checked") == false){
               $('#table_fullview').addClass('hide');
            }
    
            if($('#table_year').prop("checked") == true){
                $('#summary_table').removeClass('hide');
            }
            else if($('#table_year').prop("checked") == false){
               $('#summary_table').addClass('hide');
            }

    });
    $('#summary_table').addClass('hide');
    $('#table_fullview').addClass('hide');
    $('#summary').addClass('hide');
    $('#print_buttons').addClass('hide');
    
});

function printDiv(divName) {
    var printContents = document.getElementById(divName).innerHTML;
    var originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
}