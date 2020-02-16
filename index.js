const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req,res) {

    var crypto = req.body.crypto;
    var fiat = req.body.fiat;
    var amount = req.body.amount;

    //var baseURL = "https://apiv2.bitcoinaverage.com/indices/global/ticker"

    //var finalURL = baseURL + crypto + fiat;

    var options = {
        url: "https://apiv2.bitcoinaverage.com/convert/global",
        method: "GET",
        qs: {
            from: crypto,
            to: fiat,
            amount: amount
        }
    }
    
    request(options, function(error, response, body){

    var data = JSON.parse(body);
    //var price = data.last;
    var price = data.price;

    var currentDate = data.time;
    res.write("<p>The current dat is " + currentDate + "</p>");

    //res.write ("<h1>The current price of " + crypto + " is " + price + fiat + "</h1>");
    res.write (amount + crypto + " is " + price + fiat + "</h1>");
    res.send();
    })
})
app.listen(3000, function() {
    console.log("The server is listening to port 3000");
})
