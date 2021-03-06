var packages = ["white", "yellow", "green", "blue", "red", "black", "indigo"],
    prices = [90, 270, 810, 2430, 7290, 21870, 65610],
    commission = [.39, .36, .3, .24, .21, .1, .07],
    insurance = .1,
    revenue = .053,
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

$(document).ready(function () {
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
            }
            else if($(this).prop("checked") == false){
               $('#table_fullview').addClass('hide');
            }
        });

    $('#table_year').click(function(){
            if($(this).prop("checked") == true){
                $('#summary_table').removeClass('hide');
            }
            else if($(this).prop("checked") == false){
               $('#summary_table').addClass('hide');
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

            var currency_input= $(this).val();
            var cur = currencyConverter(EUR_INR,currency_input);
            console.log(cur);
            $('#view_rupees').html(cur);
            
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
        $('#summary').addClass('hide');
    });
    $("input[name='questra-invest-plan']").change(function(e){
        if($(this).attr('id') == 'questra-invest-manual-plan') {
            $('#questra-manual-plan').removeClass('hide');
        } else {
            $('#questra-manual-plan').addClass('hide');
        }
        //$('#redo').hasClass("hide") && $('#redo').removeClass("hide");
        $( "#calculate_button" ).trigger("click");
    });
    $('#calculate_button').on('click', function (argument) {
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
            console.log(week_interval);
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
            $('#week_profit_' + week + '').html("&euro; " + week_profit);

            account = Math.round(account * 100) / 100;
            $('#account_' + week + '').html("&euro; " + account);

            $('#money_invested_' + week + '').html("&euro; " + money_invested);

            allow_withdraw_amount = Math.round(allow_withdraw_amount * 100) / 100;
            $('#withdraw_amount_' + week + '').html("&euro; " + allow_withdraw_amount);

            if(week_interval % 1 == 0){
                $('#week_profit_s' + week + '').html("&euro; " + week_profit);
                $('#account_s' + week + '').html("&euro; " + account);
                $('#money_invested_s' + week + '').html("&euro; " + money_invested);
                $('#withdraw_amount_s' + week + '').html("&euro; " + allow_withdraw_amount);
            }
            date.setDate(date.getDate() + 7);
        }

        // Summary
        total_withdraw = Math.round(total_withdraw * 100) / 100;
        var summary = $('#summary');
        $('#summary_startInvest').html("&euro; " + $('#startInvest').val());
        $('#summary_numOfWeek').html(num_of_week);
        $('#summary_moneyInvested').html("&euro; " + money_invested);
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
        $('#summary_income').html("&euro; " + summary_imcome);
        if (total_withdraw > 0) {
            $('#summary_withdraw').removeClass('hide');
            $('#summary_totalWithdraw').html("&euro; " + total_withdraw);
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
});