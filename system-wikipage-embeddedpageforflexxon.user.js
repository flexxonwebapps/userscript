// ==UserScript==
// @name         Acumatica Live - [Dashboard]: EmbeddedPageForAcumaticaUsers
// @namespace    https://github.com/flexxonwebapps
// @version      26.1124.2
// @description  Dashboard customizable share links by adding header widgets.
// @author       You
// @match        https://flexxonlive.go.akamai-access.com/FlexxonLive/*
// @updateURL    https://raw.githubusercontent.com/flexxonwebapps/userscript/main/system-wikipage-embeddedpageforflexxon.user.js
// @downloadURL  https://raw.githubusercontent.com/flexxonwebapps/userscript/main/system-wikipage-embeddedpageforflexxon.user.js
// @icon         https://www.flexxon.com/wp-content/uploads/2021/04/cropped-Favicon-1-1.ico
// @grant        none
// ==/UserScript==


(function(){
  'use strict';

  function runWikiScriptMaster(){
    var oPageID = 'myloadedpage';
    var d = document, oPage = d.getElementById(oPageID);
    if(oPage) oPage.parentNode.removeChild(oPage);
    var e = d.getElementById('wikipageframe'); oPage = d.getElementById(oPageID);
    if(e && !oPage){
      var loopTimer = setInterval(function(){
        var dashPage = d.getElementById('ctl00_phDS_dashSet');
        if(dashPage){
          var table1st = dashPage.getElementsByTagName('TABLE')[0];
          if(table1st){
            var tID = (table1st.id||''), hdr, uEmail, idCode, pkCode;
            if(tID){
              var dataTR = d.getElementById(tID+'_row_0');
              if(dataTR){
                var dTDs = dataTR.getElementsByTagName('TD');
                for(var i=0; i<dTDs.length; i++){
                  hdr = d.getElementById(tID+'_colHS_0_'+i);
                  if(hdr){
                    hdr = hdr.innerHTML.replace(/<[^>]*>?/gm,'').replace(/&nbsp;/g, ' ').replace(/(^\s+|\s+$)/g,'');
                    if(hdr == 'Email') uEmail = dTDs[i].innerHTML.replace(/<[^>]*>?/gm,'').replace(/&nbsp;/g, ' ').replace(/\s/g,'');
                    if(hdr == 'Identity#') idCode = dTDs[i].innerHTML.replace(/<[^>]*>?/gm,'').replace(/&nbsp;/g, ' ').replace(/\s/g,'');
                    if(hdr == 'PKID') pkCode = dTDs[i].innerHTML.replace(/<[^>]*>?/gm,'').replace(/&nbsp;/g, ' ').replace(/\s/g,'');
                  }
                  if(uEmail && idCode && pkCode) break;
                }
                if(uEmail && idCode && pkCode){
                  console.log('WikiJS=Email:: '+uEmail);
                  console.log('WikiJS=ID# '+idCode);
                  console.log('WikiJS=PK# '+pkCode);
                  var thisWidget = e.parentNode;
                  while(thisWidget.className!='dash-wrapper') thisWidget = thisWidget.parentNode;
                  if(thisWidget.className=='dash-wrapper'){
                    var wDivs = thisWidget.getElementsByTagName('DIV'), goSrc;
                    for(var i=0; i<wDivs.length; i++){
                      if(wDivs[i].className == 'widget_caption__title toolsBtn'){
                        goSrc = wDivs[i].innerHTML.replace(/&nbsp;/g, ' ').replace(/(^\s+|\s+$)/g,'').replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
                        break;
                      }
                    }
                    if(goSrc){
                      goSrc += '&user=' + uEmail + '&id=' + idCode + '&pk=' + pkCode + '';
                      e.id = oPageID; dashPage.appendChild(e);
                      e.innerHTML = '<iframe src="'+goSrc+'" border="0" onload="this.style.background=&quot;white&quot;;"></iframe>';
                      var toolUL = d.getElementById('ctl00_usrCaption_tlbTools_ul');
                      if(toolUL){
                        var nLI = d.createElement('LI');  nLI.id = 'newtabopener';
                        toolUL.appendChild(nLI);
                        nLI.title = "Open PAGE at new tab. (Do not reveal your page url to anyone else!)";
                        nLI.innerHTML = '<a target="_blank"><b>➔</b></a>';
                        nLI.onclick = function(){
                          window.open(goSrc,'_blank');
                        }
                      }
                    }
                  }
                  return clearInterval(loopTimer);
                }
              }
            }
          }
        }
        console.log('WikiJS:: Keep looping to search required data...');
      },600);
    }
  }

  function addCustomCSS(){
    var customCSS = `
      div#ctl00_phDS_dashSet table[id^="ctl00_phDS_dashSet_dashWidget"], div#ctl00_phDS_dashSet div.dash-wrapper {
        visibility:hidden;
        opacity:0;
      }
      div#ctl00_phDS_dashSet.Dashboards.design table[id^="ctl00_phDS_dashSet_dashWidget"], div#ctl00_phDS_dashSet.Dashboards.design div.dash-wrapper{
        visibility:visible;
        opacity:1;
      }
      div#ctl00_phDS_dashSet div#myloadedpage {
        position:fixed;top:50px;bottom:0;left:0;right:0;width:100%;border:0;padding:0;margin:0 auto;
            box-shadow: 0px 0px 2px 0px #777;
      }
      div#ctl00_phDS_dashSet div#myloadedpage iframe {
        position:absolute;top:0;bottom:0;left:0;right:0;height:100%;width:100%;border:0;padding:0;margin:auto;
        background:white url(https://lh3.googleusercontent.com/pw/AP1GczOJIu_E2-wNxyW1G-52tHjezy_kpy7MLSxMopx2DwoOVySbt-udGy80rOnhmJ-JQI5YxsSUBPKKbsrcwEqK2KI_--FbPl-o7lVslUd4G-kW5sUJJvE) no-repeat scroll center center;
        background-size:128px;
      }
      div#ctl00_phDS_dashSet.Dashboards.design div#myloadedpage {
        display:none;
      }
        li#newtabopener {
            position: relative;
            top:-1px;
            height: 16px;
            width: 18px;
            background: DarkRed;
            border: #aaa 2px outset;
            border-radius: 5px;
            padding: 4px;
        }
        li#newtabopener:hover {
            background: FireBrick;
            border: #444 2px inset;
        }
        li#newtabopener a {
            position: absolute;
            top: 0;
            right: 0;
            height: 16px;
            line-height: 16px;
            font-size: 16px;
            color: #fff;
            text-decoration: none;
            border-top: 2px solid;
            border-right: 2px solid;
            margin: 3px 4px;
            z-index: 999;
            cursor:pointer;
        }
        li#newtabopener:hover a {
            color:yellow;
        }
        li#newtabopener b {
            display:block;
            transform: rotate(-45deg);
        }
  `;
    var d = document, sTag = d.createElement('STYLE');
    var fCSS = d.createTextNode(customCSS);
    sTag.appendChild(fCSS);
    var h = d.getElementsByTagName('head')[0]||d.body;
    h.appendChild(sTag);
  }

  function checkReqElementToRun(fnArray){
    setTimeout(function(){
      var d = document;
      var snInput = d.getElementById('wikipageframe');
      if(snInput){
        setTimeout(function(){
          for(let i=0; i<fnArray.length;i++) fnArray[i]();
        },1200);
      } else {
        console.warn('Required Element is not found yet!');
        checkReqElementToRun(fnArray);
      }
    },600);
  }

  var screenTimer = setInterval(function(){
    if(typeof __screenID != 'undefined'){
      clearInterval(screenTimer);
      screenTimer=null;
      var sID = __screenID.replace(/\./g,'').toString();
      if(sID == 'DB000073'||sID == 'DB000104'||sID =='DB000101'||sID =='DB000098') checkReqElementToRun([addCustomCSS,runWikiScriptMaster]);
    }
  },600);
})();
