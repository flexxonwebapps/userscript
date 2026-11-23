// ==UserScript==
// @name         Acumatica Live - [Dashboard]: Share Links
// @namespace    http://tampermonkey.net/
// @version      1.0.2
// @description  Dashboard customizable share links by adding header widgets.
// @author       You
// @match        https://flexxonlive.go.akamai-access.com/FlexxonLive/*
// @icon         https://www.flexxon.com/wp-content/uploads/2021/04/cropped-Favicon-1-1.ico
// @grant        none
// ==/UserScript==

(function(){
  'use strict';
  
  function wikiRun1st(){
    var d = document, checkLoad = 0;
    var appIframe = d.createElement('IFRAME');
    appIframe.id = 'wikilogisticlinks'; appIframe.className = 'wikibackground';
    appIframe.style.cssText = 'position:fixed;top:4%;left:0;height:96%;width:100%;border-top:1px silver dotted;padding:0;margin:0;z-index:99;top:calc(0% + 44px);height:calc(100% - 44px); font-size:18px;overflow:auto;';
    d.getElementById('wikipagediv').parentNode.appendChild(appIframe);
    var appDoc = appIframe.contentDocument || appIframe.contentWindow.document;
    var goLoad = function(){
      if(checkLoad===0){
        var loopTimer = setInterval(function(){
          var dashPage = d.getElementById('ctl00_phDS_dashSet'), docInfo = [];
          if(!dashPage){
            console.log('UserJS(WikiPage):: "ctl00_phDS_dashSet" element is not found yet.');
            return;
          }
          var rowElm1 = dashPage.getElementsByTagName('DIV');
          if(rowElm1[0].className == 'row'){
            var aRows = rowElm1[0].getElementsByTagName('DIV'), rNbr, rElms = [];
            for(var i=0; i<aRows.length;i++){
              if( (aRows[i].className||'').indexOf('row')===0 && aRows[i].hasAttribute('data-row')){
                rNbr = parseInt(aRows[i].getAttribute('data-row'));
                if(rNbr === 0 || rNbr >= 1) rElms.push(aRows[i]);
              }
            }
            var rDivs, rCC;
            for(var i=0; i<rElms.length;i++){
              rDivs = rElms[i].getElementsByTagName('DIV'); rCC = 0; docInfo[i] = [];
              for(var ii=0; ii<rDivs.length;ii++){
                if(rDivs[ii].className == 'widget-caption__title'){
                  docInfo[i].push( rDivs[ii].innerHTML.replace(/(^\s+|\s+$)/g,"") );
                  rCC++;
                  if(rCC==3) break;
                }
              }
            }
            if(docInfo.length>0){
              docInfo.sort();
              var listHTML = '', dotIdx, docType;
              for(var i=0; i<docInfo.length;i++){
                if(docInfo[i][0] && docInfo[i][1]){
                  dotIdx = docInfo[i][0].lastIndexOf('.');
                  docType = (dotIdx==-1?'SITE':docInfo[i][0].substring(dotIdx+1).replace(/(^\s+|\s+$)/g,''));
                  listHTML += '<li><a onclick="backActive(this);return openLocation(this.href);" title="✦File::  '+docInfo[i][0].substring(0,(dotIdx==-1?docInfo[i][0].length:dotIdx)).replace(/<[^>]*>?/gm,'').replace(/(^\s+|\s+$)/g,'')+' \n✦Type::  '+docType.replace(/<[^>]*>?/gm,'').toUpperCase()+' \n✦Description::  '+((docInfo[i][2]||'-').replace(/<[^>]*>?/gm,'').replace(/(^\s+|\s+$)/g,''))+' \n✦URL::  '+docInfo[i][1].replace(/(^\s+|\s+$)/g,'').replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")+'" href="'+(docInfo[i][1].replace(/(^\s+|\s+$)/g,'').replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">") )+'"><b>'+docInfo[i][0].substring(0,(dotIdx==-1?docInfo[i][0].length:dotIdx)).replace(/(^\s+|\s+$)/g,'')+'</b><i class="srcDescription">'+((docInfo[i][2]||'-').replace(/(^\s+|\s+$)/g,''))+'</i><span class="ui-li-count '+docType+'">'+docType.toUpperCase()+'</span></a></li>';
                }
              }
              wikiRun2nd();
              clearInterval(loopTimer);
              var sTagNM = 'scr'+'ipt';
              appDoc.open();
              appDoc.write('<!DOCTYPE html><html><head><meta charset="utf-8"><title>List My Link</title><link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jquerymobile/1.4.5/jquery.mobile.min.css"><'+sTagNM+' src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></'+sTagNM+'><'+sTagNM+'>$(document).on("mobileinit",function(){$.mobile.hashListeningEnabled=false;$.mobile.pushStateEnabled=false;$.mobile.changePage.defaults.changeHash=false;});</'+sTagNM+'><'+sTagNM+' src="https://ajax.googleapis.com/ajax/libs/jquerymobile/1.4.5/jquery.mobile.min.js"></'+sTagNM+'><style>div.wikibackground{background:#fff url(https://lh3.googleusercontent.com/pw/AP1GczOH5CJSq72z_bxSURsjWlOKmuecvs0JFOrryCh8PdDToW3o-W60tjqg8PlUTQ1FvJC99HqOooMBu5Hl_f3Ua3LqpMS39ET0EcpROsZsjrbUBbp2Gpw) repeat center center}div.edivision{margin:30px 2%}ul#linkagelist { position:fixed;top:60px;width:96%;height:90%;max-height:calc(100% - 120px);margin-top:20px;overflow-y:scroll; }ul#linkagelist i.srcDescription{display:inline-block;position:absolute;left:480px;font-size:80%;font-style:normal;width:calc(100% - 600px);overflow:hidden;text-overflow:ellipsis;line-height:1.5}div.ui-page-theme-a span.ui-body-inherit.pdf{background-color:Crimson;color:#fff;text-shadow:0 1px 0 #111}div.ui-page-theme-a span.ui-body-inherit.folder{background-color:PaleGoldenRod}div.ui-page-theme-a span.ui-body-inherit.xlsx,div.ui-page-theme-a span.ui-body-inherit.xls,div.ui-page-theme-a span.ui-body-inherit.spreadsheet{background-color:SeaGreen;color:#fff;text-shadow:0 1px 0 #111}div.ui-page-theme-a span.ui-body-inherit.doc,div.ui-page-theme-a span.ui-body-inherit.docx,div.ui-page-theme-a span.ui-body-inherit.documents{background-color:RoyalBlue;color:#fff;text-shadow:0 1px 0 #111}div.ui-page-theme-a span.ui-body-inherit.ppt,div.ui-page-theme-a span.ui-body-inherit.pptx,div.ui-page-theme-a span.ui-body-inherit.slides{background-color:Orange;color:#fff;text-shadow:0 1px 0 #111}</style><'+sTagNM+'>function openLocation(k,tt){if(k){var h=screen.height,w=screen.width,x=w*0.9,y=h*0.8,a=w*0.05,b=h*0.05,nm=""+(tt?(" - "+tt):""),f=window.open(k,nm,"channelmode=no,top="+b+",left="+a+",width="+x+",height="+y+",menubar=no,location=no,resizable=yes,scrollbars=yes,status=no,toolbar=no,titlebar=no");} return false;}function backActive(e){var e=e||this;setTimeout(function(){e.className=(e.className||"").replace(" ui-btn-active","").replace("ui-btn-active","");e.blur();},60);}</'+sTagNM+'></head><body><center><div id="linkwrapper" class="edivision"><ul id="linkagelist" data-role="listview" data-autodividers="true" data-filter="true" data-inset="true" data-filter-placeholder=" Search docs by keywords">'+listHTML+'</ul></div></center></body></html>');
              appDoc.close();
            } else {
              console.log('WikiJS: Reaching Link Information ...');
            }
          } else {
            console.log('WikiJS: Reaching 1st Row Content ...');
          }
        }, 600);
        checkLoad = 1;
      }
    }
    setTimeout(goLoad,0);
  }

  function wikiRun2nd(){
    var d = document, f = d.getElementById('wikilogisticlinks');
    if(!f) setTimeout(wikiRun2nd,600);
    var dashWrapper = f.parentNode;
    if(dashWrapper.id == 'ctl00_phDS_form_edContent_divContent'){
      f.style.position = 'relative';
      f.style.height = '400px';
    } else {
      while(dashWrapper.className!='dash-wrapper') dashWrapper = dashWrapper.parentNode;
      if(dashWrapper.className=='dash-wrapper'){
        dashWrapper.parentNode.id = 'wikigetframe';
        dashWrapper.style.filter = '';
        var myCssText = '', sTag = d.createElement('STYLE');
        myCssText += 'div#ctl00_phDS_dashSet div#wikigetframe div.dash-wrapper { filter:none; } ';
        myCssText += 'div#ctl00_phDS_dashSet.Dashboards.design div#wikigetframe div.dash-wrapper { filter:grayscale(0); } ';
        myCssText += 'div#ctl00_phDS_dashSet.Dashboards.design div#wikigetframe div.dash-wrapper div.widget-captionbar div.widget_caption__title { margin-top: 44px; } ';
        sTag.appendChild(d.createTextNode(myCssText));
        (d.getElementsByTagName('head')[0]||d.body).appendChild(sTag);
      } else {
        console.warn('WikiJS:: Error - "dash-wrapper" element is not found!');
      }
    }
  }

  function checkReqElementToRun(fnArray){
    setTimeout(function(){
      var d = document;
      var snInput = d.getElementById('wikipagediv');
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
      if(sID == 'DB000103') checkReqElementToRun([wikiRun1st]);
      //if(sID == 'DB000103') checkReqElementToRun();
    }
  },600);
})();
