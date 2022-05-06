"use strict";


// Establishing connection to SignalR PriceHub 
var connection = new signalR.HubConnectionBuilder().withUrl("/priceHub").build();

var msftTimeout;
var amznTimeout;
var aaplTimeout;



// These functions recieve the prices sent over from the PriceHub for its respective stock symbol and set the new price that is seen on the app.
connection.on("ReceivePriceMsft", function (price) {
    if (document.getElementById("msftPrice").value > price) {
        document.getElementById("msftPrice").style.backgroundColor = "lightsalmon";
    }
    else {
        document.getElementById("msftPrice").style.backgroundColor = "mediumspringgreen";
    }

    var msft = document.getElementById("msftPrice").value = `${price}`;
});

connection.on("ReceivePriceAmzn", function (price) {
    if (document.getElementById("amznPrice").value > price){
        document.getElementById("amznPrice").style.backgroundColor = "lightsalmon";
    }
    else {
        document.getElementById("amznPrice").style.backgroundColor = "mediumspringgreen";
    }

    var amzn = document.getElementById("amznPrice").value = `${price}`;

});

connection.on("ReceivePriceAapl", function (price) {
    if (document.getElementById("aaplPrice").value > price) {
        document.getElementById("aaplPrice").style.backgroundColor = "lightsalmon";
    }
    else {
        document.getElementById("aaplPrice").style.backgroundColor = "mediumspringgreen";
    }

    var aapl = document.getElementById("aaplPrice").value = `${price}`;

});


// Starting SignalR Connection. Enabling subscribe buttons and disabling unsubscribe buttons. 
connection.start().then(function () {
    document.getElementById("subscribeMsft").disabled = false;
    document.getElementById("subscribeAmzn").disabled = false;
    document.getElementById("subscribeAapl").disabled = false;
    document.getElementById("unsubscribeMsft").disabled = true;
    document.getElementById("unsubscribeAmzn").disabled = true;
    document.getElementById("unsubscribeAapl").disabled = true;
}).catch(function (err) {
    return console.error(err.toString());
});


// On clicking Subscribe button of individual stocks in app, it will invoke the PriceHub methods to get price for that specific stock. 3 different calls for the 3 different stocks.
document.getElementById("subscribeMsft").addEventListener("click", function UpdateMsft(event) {
    connection.invoke("SendMsftPrice").catch(function (err) {
        return console.error(err.toString());
    });
    msftTimeout = setTimeout(UpdateMsft, 1000);
    document.getElementById("subscribeMsft").disabled = true;
    document.getElementById("unsubscribeMsft").disabled = false;


});

document.getElementById("subscribeAmzn").addEventListener("click", function UpdateAmzn(event) {
    connection.invoke("SendAmznPrice").catch(function (err) {
        return console.error(err.toString());
    });
    amznTimeout = setTimeout(UpdateAmzn, 1000);
    document.getElementById("subscribeAmzn").disabled = true;
    document.getElementById("unsubscribeAmzn").disabled = false;

});

document.getElementById("subscribeAapl").addEventListener("click", function UpdateAapl(event) {
    connection.invoke("SendAaplPrice").catch(function (err) {
        return console.error(err.toString());
    });
    aaplTimeout = setTimeout(UpdateAapl, 1000);
    document.getElementById("subscribeAapl").disabled = true;
    document.getElementById("unsubscribeAapl").disabled = false;


});


// These functions handle the unsubscribe logic and stop the repeated calls to PriceHub that send over new prices. 

document.getElementById("unsubscribeMsft").addEventListener("click", function StopMsft(event) {
    clearTimeout(msftTimeout);
    document.getElementById("subscribeMsft").disabled = false;
    document.getElementById("unsubscribeMsft").disabled = true;


});

document.getElementById("unsubscribeAmzn").addEventListener("click", function StopMsft(event) {
    clearTimeout(amznTimeout);
    document.getElementById("subscribeAmzn").disabled = false;
    document.getElementById("unsubscribeAmzn").disabled = true;


});

document.getElementById("unsubscribeAapl").addEventListener("click", function StopAapl(event) {
    clearTimeout(aaplTimeout);
    document.getElementById("subscribeAapl").disabled = false;
    document.getElementById("unsubscribeAapl").disabled = true;


});



