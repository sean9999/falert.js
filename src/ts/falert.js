"use strict";
exports.__esModule = true;
exports.Falert = void 0;
var Falert = /** @class */ (function () {
    function Falert() {
    }
    Falert.instances = new Set();
    Falert.settings = {
        insertionNode: document.body,
        audio: {
            volume: 0.25
        },
        sounds: {}
    };
    return Falert;
}());
exports.Falert = Falert;
{
    //	preload audio
    var sounds = {
        fatal: 'https://github.com/sean9999/falert.js/raw/master/src/sounds/dramatic.mp3',
        warning: 'https://github.com/sean9999/falert.js/raw/master/src/sounds/concerning.mp3',
        notice: 'https://github.com/sean9999/falert.js/raw/master/src/sounds/noteworthy.mp3'
    };
    for (var _i = 0, _a = Object.entries(sounds); _i < _a.length; _i++) {
        var _b = _a[_i], k = _b[0], url = _b[1];
        var a = new Audio();
        //a.addEventListener("canplaythrough", console.info, false);
        a.addEventListener("error", console.error);
        a.volume = Falert.settings.audio.volume;
        a.src = url;
        Falert.settings.sounds[k] = a;
    }
}
;
html = "\n\t<div class=\"falert container flyin\">\n\t\t<div class=\"falert body breathing\">\n\t\t\t<h2>Alert!</h2>\n\t\t\t<p>You can't put your finger in the socket</p>\n\t\t</div>\n\t</div>\n\t";
constructor(head, string, body, string, type, string = "notice");
{
    var t = document.createElement('template');
    t.innerHTML = Falert.html.trim();
    var domNode_1 = t.content.firstChild;
    domNode_1.style.zIndex = (Falert.getHighestZindex() + 1).toString(10);
    //	get a new "top" value to push this node down the page
    var newTop = 0;
    for (var _c = 0, _d = Falert.instances; _c < _d.length; _c++) {
        var i = _d[_c];
        newTop += i.offsetHeight;
    }
    domNode_1.style.top = newTop + 'px';
    domNode_1.querySelector('.body').classList.add(type);
    domNode_1.addEventListener("animationend", function (ev) {
        console.log('animation end', ev);
        domNode_1.classList.remove('flyin');
        domNode_1.classList.add('swaying');
    });
    domNode_1.addEventListener('click', function (ev) {
        Falert.instances["delete"](domNode_1);
        domNode_1.remove();
    });
    domNode_1.querySelector('.body h2').innerHTML = head;
    domNode_1.querySelector('.body p').innerHTML = body;
    domNode_1.classList.add(type);
    document.body.appendChild(domNode_1);
    Falert.instances.add(domNode_1);
    console.log(Falert.settings.sounds[type]);
    Falert.settings.sounds[type].play();
}
getHighestZindex();
number;
{
    var z = 0;
    for (var _e = 0, _f = Falert.instances; _e < _f.length; _e++) {
        var f = _f[_e];
        var i = Number(f.style.zIndex);
        if (i > z) {
            z = i;
        }
    }
    return z;
}
