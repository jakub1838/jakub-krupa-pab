"use strict";
exports.__esModule = true;
var express_1 = require("express");
var app = (0, express_1["default"])();
var notes = [];
app.use(express_1["default"].json());

//dodawanie
app.post('/note', function (req, res) {
    var note = req.body;
    note.id = Date.now();
    notes.push(note);
    res.status(201).send(note.id);
});
//odczytanie
app.get('/note/:id', function (req, res) {
    var id = parseInt(req.params.id, 10);
    var item = note.find(id);
    if (item) {
        return res.status(200).send(item);
    }
    res.status(404).send("item not found");
});
//edycja
app.put('/note/:id', function (req, res) {
});
//usuwanie
app["delete"]('/note/:id', function (req, res) {
    var id = parseInt(req.params.id, 10);
    var item = note.find(id);
    var del = note.splice(id);
    if (item) {
        del;
        return res.status(204);
    }
    res.status(400).send("item not found");
});
app.listen(3000);
