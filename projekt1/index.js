"use strict";
exports.__esModule = true;
var express = require('express');
var app = express();
app.get('/', function (req, res) {
    var num1 = +req.query.num1;
    var num2 = +req.query.num2;
    var operation = +req.query.operation;
    var dodaj = num1 + num2;
    var usun = num1 - num2;
    var podziel = num1 / num2;
    var pomnoz = num1 * num2;
    if (operation == dodaj) {
        res.send(dodaj.toString());
    }
    else if (operation == usun) {
        res.send(usun.toString());
    }
    else if (operation == podziel) {
        res.send(podziel.toString());
    }
    else if (operation == pomnoz) {
        res.send(pomnoz.toString());
    }
});
app.listen(3000);
