// ==UserScript==
// @name         Acumatica Live: Reshresh-Page & Adjust-Height Automation
// @namespace    https://github.com/flexxonwebapps
// @version      26.1124.1
// @description  [Customizable] Set page by ID to auto-refresh the page by specific time.
// @author       Martin M
// @match        https://flexxonlive.go.akamai-access.com/FlexxonLive/*
// @updateURL    https://raw.githubusercontent.com/flexxonwebapps/userscript/main/bundle.user.sub.js
// @downloadURL  https://raw.githubusercontent.com/flexxonwebapps/userscript/main/bundle.user.sub.js
// @icon         https://www.flexxon.com/wp-content/uploads/2021/04/cropped-Favicon-1-1.ico
// @grant        none
// ==/UserScript==



//============================================================
//============================================================
var $pageSetting = {
    dashboardadjust: {
        adjclass: 'div#ctl00_phDS_dashSet div.row[data-row="2"] div.dashboard__card__full, div#ctl00_phDS_dashSet div.row[data-row="4"] div.dashboard__card__full, div#ctl00_phDS_dashSet div.row[data-row="6"] div.dashboard__card__full, div#ctl00_phDS_dashSet div.row[data-row="8"] div.dashboard__card__full, div#ctl00_phDS_dashSet div.row[data-row="9"] div.dashboard__card__full',
        adjscreen: ['DB000018'],
        adjheight: '96px'
    },
    refreshpage: {
//------------------------------------------------------------
        //Check Color Site::  https://www.w3schools.com/tags/ref_colornames.asp
        backcolor: 'purple',

        // Property as ID, Value as time in ms.
        'DB000018': 2400000,
        'DB123456': 120000,
        'DB987654': 4800000
//------------------------------------------------------------
    }
}
//============================================================
//============================================================
//============================================================
//============================================================
//***************🔻Do Not Edit Below Scripts🔻***************
//============================================================
//============================================================
//============================================================
//============================================================

function markCountDown(msTime,e){
    var cTime = parseInt(msTime)||0;
    if(!(cTime>0)) return console.error('UserJS:: Count Down Setting Error!');
    cTime += (new Date()).getTime();
    var countTimer = setInterval(function(){
        var nTime = new Date().getTime();
        var remainTime = cTime - nTime;
        // Time calculations for days, hours, minutes and seconds
        var dd = Math.floor(remainTime / (1000 * 60 * 60 * 24));
        var hh = Math.floor((remainTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var mm = Math.floor((remainTime % (1000 * 60 * 60)) / (1000 * 60));
        var ss = Math.floor((remainTime % (1000 * 60)) / 1000);

        // Display the result in the element with id="demo"
        var counterInfo = "[" + dd + " day(s)] " + hh + ":" + (mm>9?mm:('0'+mm.toString())) + ":" + (ss>9?ss:('0'+ss.toString())) + "";

        // If the count down is finished, write some text
        if (remainTime <= 0) {
            clearInterval(countTimer);
            if(e) e.innerHTML = "[0 day(s)] 0:00:00";
            //console.log( 'Timeout!' );
        } else {
            if(e) e.innerHTML = counterInfo;
            //console.log( counterInfo );
        }
    }, 1000);
}
(function() {
    'use strict';
    var screenTimer = setInterval(function(){
        if(typeof __screenID != 'undefined'){
            clearInterval(screenTimer);
            screenTimer=null;
            var sID = __screenID.replace(/\./g,'').toString();
            var refreshSetting = $pageSetting.refreshpage;
            if(refreshSetting && refreshSetting[sID]){
                var rfTime = parseInt(refreshSetting[sID])||0;
                if(rfTime > 0){
                    var tW = window.top;
                    var tDoc = tW.document, tCounter = tDoc.createElement('DIV');
                    tCounter.style.cssText = 'position:fixed;top:7px;left:444px;font-size:18px;font-weight:bold;color:#fff;background:'+refreshSetting.backcolor+';border:1px solid #777;padding:6px 10px;margin:0px;z-index:9999;';
                    tDoc.body.appendChild(tCounter);

                    console.log('UserJS:: Restarted Refresh Timer ['+rfTime+']!');
                    setTimeout(function(){
                        tW.location.reload();
                    },rfTime);
                    markCountDown(rfTime,tCounter);
                }
            }
            var pgAdjSetting = $pageSetting.dashboardadjust, adjS;
            if(pgAdjSetting) adjS = pgAdjSetting.adjscreen;
            if(adjS instanceof Array){
                var adjC = pgAdjSetting.adjclass, adjH = pgAdjSetting.adjheight;
                if(adjS.indexOf(sID)!=-1 && adjC && adjH){
                    var addCssText = adjC + ' {height: '+adjH+' !important; } ';
                    var d = document, sTag = d.createElement('STYLE');
                    var fCSS = d.createTextNode(addCssText);
                    sTag.appendChild(fCSS);
                    var h = d.getElementsByTagName('head')[0];
                    h.appendChild(sTag);
                }
            }
        }
    },600);


})();
