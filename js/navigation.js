$(document).ready(function () {
    // navigation bar
    $('.questra-homepage-link').attr('href','questra-homepage.html').addClass('hide');
    $('.questra-insurance-fund-link').attr('href','questra-insurance-fund.html').addClass('hide');
    $('.questra-packages-link').attr('href','questra-packages.html');
    $('.questra-investment-plan-link').attr('href','questra-investment-plan.html');
    $('.questra-instruction-link').attr('href','questra-instruction.html');
    var page = $('#page').attr('data-page');
    $('.' + page + '-link').attr('href', '#');
    $('.' + page + '-link').parents("li").addClass('active');

    // register link
    $('a.register-link').attr('href','https://private.atlanticgam.es/#/sign-up/partner=P09201496814793');

    // language
    var languageCookie = $.cookie("language");
    //var languageArr=["en","vi","ja","zh"];
    var languageArr=["en","vi","ja"];
    var mainLanguage = "en";
    $('#page').attr('data-language', languageCookie);
    var questra_languageList = "";
    var baseurl = window.location.origin;
    for (var i = 0; i < languageArr.length; i++) {
        var href = "";
        if(languageCookie == languageArr[i]){
            href = "#";
        }else{
            if(mainLanguage == languageArr[i]){
                href = baseurl + "/" + page + ".html";
            }else{
                href = baseurl + "/" + languageArr[i] + "/" + page + ".html";
            }
        }
        questra_languageList += "<li><a href=\"" + href + "\" hreflang=\"" + languageArr[i] + "\" class=\"language\"><span class=\"lang-sm lang-lbl\" lang=\"" + languageArr[i] + "\"></span></a></li>"
    }
    $('#questra-language-list').append(questra_languageList);

    $('#questra-current-language').attr('lang', languageCookie);
    $("#questra-language-list a").on("click", function (e) {
        var value = $(this).find('span').attr('lang');
        $.cookie('language', value, { expires: 7, path: '/' });
    });
});