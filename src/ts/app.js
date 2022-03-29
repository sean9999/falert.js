"use strict";
exports.__esModule = true;
var falert_1 = require("./falert");
document.querySelector('#falert1').addEventListener('click', function (ev) {
    var f = new falert_1.Falert('HEY!', "watch out, dude", "notice");
});
document.querySelector('#falert2').addEventListener('click', function (ev) {
    var f = new falert_1.Falert('WOWZA!', "holy mackerel", "fatal");
});
document.querySelector('#falert3').addEventListener('click', function (ev) {
    var f = new falert_1.Falert('Warning', "Call your mom", "warning");
});
