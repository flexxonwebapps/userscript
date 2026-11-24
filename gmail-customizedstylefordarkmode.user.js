// ==UserScript==
// @name         Gmail Addon Style for Dark Mode
// @namespace    https://github.com/flexxonwebapps
// @version      26.1124.2
// @description  Gmail Addon Style for Dark Mode ONLY
// @author       You
// @match        https://mail.google.com/mail/*
// @updateURL    https://raw.githubusercontent.com/flexxonwebapps/userscript/main/gmail-customizedstylefordarkmode.user.js
// @downloadURL  https://raw.githubusercontent.com/flexxonwebapps/userscript/main/gmail-customizedstylefordarkmode.user.js
// @icon         https://www.google.com/s2/favicons?sz=64&domain=google.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var myGmailStyle = function(){
        var d = document, s = '';

        //Header background
        s += 'div.aiw h1.qp {background: #444; border-bottom: 1px solid #999; } ';

        //header > User Icon
        s += 'div.gb_Wa.gb_0.gb_H {background: #333;box-shadow: 0 0 2px 0px #222;} ';
        s += 'div.gb_Wa.gb_0.gb_H:hover {border-color:#000;background: #222;box-shadow: 0 0 4px 0px #ccc;} ';


        //id='tabs-1' is applicable for Chrome Apps - "Gamil Settings Extender"...
        if(!d.getElementById('tabs-1')){
            //Adjust Main Area Position
            s += 'div.WR.aeN div.yJ div.wT div.byl, div.WR.aeN div.yJ div.wT div.n6, div.WR.aeN div.zw[gh="cl"] {padding: 0px 16px 0px 10px;} ';
            s += 'div.WR.aeN div.Ls77Lb.aZ6 div.aAw.FgKVne {margin-left:6px;} ';

            // Unread Email CSS
            s += 'form#aso_search_form_anchor.aJf[method=get][role=search] { margin-left:0px; }';
            s += 'div.unreadDiv {font-weight:600;color:#fff;border:1px solid #3d3f43;border-radius:8px;background-color:#3d3f43;padding:2px 7px;margin:0px 10px 0px 94px;cursor:pointer;} ';
            s += 'p.unreadButton {padding-top:2px;font-size:12px; margin:4px 8px;} ';
            s += 'p.unreadButton span {font-size:13px;white-space:nowrap;overflow:hidden;padding-left:20px} ';
            s += 'p.unreadButton span::before {background-image:url(https://www.gstatic.com/images/icons/material/system_gm/1x/mail_outline_white_20dp.png);background-repeat:no-repeat;content:" ";display:block;position:absolute;width:20px;height:20px;background-color:#3d3f43;border-top-right-radius:5px;top:24px;background-size:17px} ';
        }
        // Unread Email CSS for "Gamil Settings Extender" Plugin
        s += 'div.unreadDiv {border: 1px dotted #888; box-shadow: 0 0 4px 0px #222;} ';
        s += 'div.unreadDiv:hover {border-style:solid; box-shadow: 0 0 6px 0px #000;} ';
        s += 'div.unreadDiv:hover p.unreadButton {color:yellow;} ';

        //"Compose" (New Mail) button
        s += 'div.T-I.T-I-KE.L3:hover {background:Cornsilk;} ';

        //Main background
        s += 'div.nH.aqk.aql.bkL {background:#826b99;} ';

        //Left Menu
        s += 'div.WR.aeN {background:#70809D;} ';
        s += 'div.nH.oy8Mbf:not(.a6o):not(.anZ):not(.arL):not(.bGI):not(.aE3):not(.S4):not(.apa) {background:#55688A; border-right: 1px solid #888; padding-top: 8px; } ';

        //Email Area
        s += 'div.nH.bkK {padding-top:14px;padding-left:16px;} ';
        s += 'div.aBA+div.nH.bkK, div.a3W+div.nH.bkK {padding-left:0px;} ';
        s += 'div.nH.bkK div.nH.tabContent,  div.nH.bkK > div.nH:first-child { -webkit-border-radius: 16px 16px 0px 0px; border-radius: 16px 16px 0px 0px; } ';
        s += 'div.bGI.nH.S4 {background:#fefffe;} ';

        //Left menu items - General Items
        s += 'div.wT div.aEc span.nU a.n0 {color:white !important;} ';
        s += 'div.wT div.aEc div.KCRnif path {color:#7252b3;} ';

        //Left menu items - More & Add Label Icons
        s += 'div.Ls77Lb.aZ6 span.ah9 span.CJ {color:yellow;} ';
        s += 'div.Ls77Lb.aZ6 span.ah9 span.ait div, div.Ls77Lb.aZ6 span.ah9 div.KCRnif svg {background-color:#66511d;} ';
        s += 'div.Ls77Lb.aZ6 div.aAw.FgKVne {border-top:1px dotted #aaa;border-bottom:1px dotted #aaa; padding-bottom:10px; padding-right:16px; margin:0px 6px 10px 16px;} ';

        //Left menu items - Labels (General)
        s += 'div.wT div.aEc div.bsU, div.zw div.TO.nZ div.bsU {color:yellow;opacity:0.6;} ';
        s += 'div.wT div.aim {border-radius:17px;} ';

        //Left menu items - Labels (1st level)
        s += 'div.wT div.aEc {background:#213562; border-top: 2px solid #213562; border-bottom: 2px solid #213562; border-radius: 9px; margin: 4px 0px 2px;} ';
        s += 'div.wT div.aEc:hover {background: #7e106c;} ';

        //Left menu items - Labels (1st Level Active-Page)
        s += 'div.wT div.aim.ain div.aEc {background: #661b88;} ';
        s += 'div.wT div.aim.ain div.aEc span.nU a.n0 {color: yellow !important;} ';
        s += 'div.wT div.aim.ain div.aEc div.bsU {color: #fff; font-weight: normal;} ';

        //Left menu items - Labels (General Active-Page Dragover Email)
        s += 'div.wT div.aim.ain.nY div.TO.nZ, div.wT div.aim.ain div.TO.nZ.nY {background:Yellow !important;} ';
        s += 'div.wT div.aim.ain.nY div.TO.nZ div.aik[style*="margin-left"], div.wT div.aim.ain div.TO.nZ.nY div.aik[style*="margin-left"] {background:Yellow !important;} ';
        s += 'div.wT div.aim.ain.nY div.TO.nZ div.aEc, div.wT div.aim.ain div.TO.nZ.nY div.aEc {opacity:0.8;} ';

        //Left menu items - Sub-Labels (Dragover Emails)
        s += 'div.wT div.aim.nY, div.wT div.TO.nY {background:lightyellow !important;} ';
        s += 'div.wT div.aim.nY div.aik[style*="margin-left"][style*="12"], div.wT div.TO.nY div.aik[style*="margin-left"][style*="12"] {background:lightyellow !important;} ';
        s += 'div.wT div.aim.nY a.n0, div.wT div.TO.nY a.n0 {color:darkred;text-shadow:none;} ';
        s += 'div.TO.nZ, div.TK div.TO.nZ, div.zw div.TK div.TO.nZ { background-color: transparent; }';

        //Left menu items - Sub-Labels (General)
        s += 'div.wT div.aik[style*="margin-left"] {left:-4px; margin-top:2px;border-radius:13px;} ';
        s += 'div.wT div.aik[style*="margin-left"] div.bsU {color:IndianRed;opacity:0.8;} ';
        s += 'div.wT div.aik[style*="margin-left"][style*="12"] {background:#3c4e76;} ';

        //Left menu items - Sub-Labels (2nd Level General Dragover)
        s += 'div.wT div.TO.NQ div.aik[style*="margin-left"][style*="12"] {background:#415070;} ';
        s += 'div.wT div.TO.NQ div.aik[style*="margin-left"][style*="12"]:hover {background:#8787dd;} ';
        s += 'div.wT div.TO.NQ:hover {background:#8787dd;border-radius:16px;} ';

        //Left menu items - Sub-Labels (Active-Page)
        s += 'div.TO.nZ div.aik[style*="margin-left"], div.TK div.TO.nZ div.aik[style*="margin-left"], div.zw div.TK div.TO.nZ div.aik[style*="margin-left"] { background-color: #341430; }';
        s += 'div.TO.nZ div.aik[style*="margin-left"] a.n0, div.TK div.TO.nZ div.aik[style*="margin-left"] a.n0, div.zw div.TK div.TO.nZ div.aik[style*="margin-left"] a.n0 { color: Gold; }';

        //Right Hidden-Menu
        s += 'div.bAw.bcf.tRcrsc {background:#333; padding-bottom:16px;} ';
        s += 'div.bAw.bcf.tRcrsc div.aT5-aOt-I-JX-Jw {box-shadow:0px 0px 4px 0px #000;} ';

        ///Notification box (eg: UNDO reminder)
        s += 'div.bAp.b8.UC div.vh {background:Khaki; box-shadow:0px 0px 4px 1px #000;} ';

        // Forced to show Subject field
        s += 'div.aoD.az6 { display: block !important; } ';

        var sTag = d.createElement('STYLE');
        var fCSS = d.createTextNode(s);
        sTag.appendChild(fCSS);
        var h = d.getElementsByTagName('head')[0];
        h.appendChild(sTag);
    }
    //window.addEventListener('load',myGmailStyle);
    var loopTestingDocHead = setInterval(function(){
        var d = document;
        if(d){
            var h = d.getElementsByTagName('head')[0];
            if(h){
                setTimeout(myGmailStyle,60);
                clearInterval(loopTestingDocHead);
                return console.log('TamperMonkeyJS:: Added Gmail Style!');
            }
        }
        console.log('TamperMonkeyJS:: Looping to get document.head element!');
    },600);
    var loopTestingFilterElm = setInterval(function(){
        var d = document;
        if(d){
            var e = d.getElementById('aso_search_form_anchor');
            if(e){
                var testPlugin = d.getElementById('tabs-1');
                if(testPlugin){
                    console.log('TamperMonkeyJS:: Unread should be already existed by Installed Plugin!');
                } else {
                    var btnDiv = d.createElement('DIV'), inP = d.createElement('P'), inSpan = d.createElement('SPAN'), inText = d.createTextNode('Unread');
                    btnDiv.className = 'unreadDiv'; btnDiv.setAttribute("data-tooltip", "Filter Unread Messages");
                    btnDiv.appendChild(inP); inP.className = 'unreadButton';
                    inP.appendChild(inSpan);
                    inP.appendChild(inText);
                    var ePN = e.parentNode; ePN.parentNode.insertBefore(btnDiv,ePN);
                    btnDiv.onclick = function(){
                        var u = e.getElementsByTagName('INPUT')[0], oV = u.value||'';
                        u.value = 'is:unread' + (oV?(' '+oV):'');
                        var btns = e.getElementsByTagName('BUTTON');
                        for(var i=0; i<btns.length; i++){
                            if(btns[i].getAttribute('aria-label') == 'Search mail'){
                                btns[i].click(); break;
                            }
                        }
                    }
                    console.log('TamperMonkeyJS:: Added Unread Button!');
                }
                return clearInterval(loopTestingFilterElm);
            }
        }
        console.log('TamperMonkeyJS:: Looping to get FILTER element!');
    },600);
})();

