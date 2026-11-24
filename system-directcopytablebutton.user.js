// ==UserScript==
// @name         Acumatica Live: [*] - Copy Table Data (Customizable)
// @namespace    https://github.com/flexxonwebapps
// @version      26.1124.1
// @description  An added button for copying inquiry data.
// @author       Martin M
// @match        https://flexxonlive.go.akamai-access.com/FlexxonLive/*
// @updateURL    https://raw.githubusercontent.com/flexxonwebapps/userscript/main/system-directcopytablebutton.user.js
// @downloadURL  https://raw.githubusercontent.com/flexxonwebapps/userscript/main/system-directcopytablebutton.user.js
// @icon         https://www.flexxon.com/wp-content/uploads/2021/04/cropped-Favicon-1-1.ico
// @grant        none
// ==/UserScript==



//https://www.w3schools.com/colors/colors_names.asp
var $copy_Button_color = 'MediumVioletRed';

//['AB123456','CD234567']
var $refer_PageID = '@ALL';


//============================================================
//============================================================
//============================================================
//============================================================
//***************🔻Do Not Edit Below Scripts🔻***************
//============================================================
//============================================================
//============================================================
//============================================================

var $pageCopiedText = "", $nPageTime = (new Date()).getTime();
window.addEventListener("copy", function(ev){
  if($pageCopiedText!=""){
    ev.preventDefault();
    ev.clipboardData.setData("text/plain",$pageCopiedText);
    //console.log("UserJS: Copied ["+$pageCopiedText+"]");
  }
});
function doCopyToClipboard(v,isMultiLines,dLength){
    var d = document;
    var u = d.getElementById('inputcopyzone-'+$nPageTime);
    if(!u){
        u = d.createElement('DIV');
        u.style.cssText = 'position:fixed;top:0;left:0;height:0px;width:0px;overflow:hidden;';
        u.innerHTML = isMultiLines?'<textarea id="inputcopyzone-'+$nPageTime+'" rows="1" cols="1" style="resize:none;display:none;" readonly></textarea>':'<input id="inputcopyzone-'+$nPageTime+'" type="text" value="" style="display:none;" size="1" readonly/>';
        d.body.appendChild(u);
    }
    if(v){
        var x = d.getElementById('inputcopyzone-'+$nPageTime);
        var nV = v.toString().replace(/(^\\s+|\\s+$)/g,"").replace(/\\,/g,"");
        x.value = (v.replace(/\\s/g,"")==""||isNaN(nV))?v:parseFloat(nV);
        x.style.display = "block";
        x.focus(); x.select();
        x.setSelectionRange(0, 99999);
        var c = "green", t = "Succeeded!";
        try {
            $pageCopiedText = x.value;
            d.execCommand("copy");
            navigator.clipboard.writeText(x.value);
        } catch(err){
            c = "red";
            t = "Error!";
        }
        x.style.display = "none"; x.value=""; $pageCopiedText="";
        var y = d.createElement('DIV');
        y.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;overflow:hidden;z-index:999999;font-weight:bold;';
        var a = d.createElement('DIV')
        a.style.cssText = "display:block;position:absolute;top:0;bottom:0;left:0;right:0;width:204px;height:44px;font-size:18px;font-family:arial;color:"+c+";text-align:center;background-color:FloralWhite;border:4px solid YellowGreen;padding:10px;margin:auto;overflow:hidden;";
        a.innerHTML = 'Copy ' + t + ('<br/><small style="color:black;">(*<u style="color:blue;">'+(dLength||0)+'</u> Record'+((dLength||0)>1?'s are':'is')+' captured)</small>');
        y.appendChild(a);
        d.body.appendChild(y);
        setTimeout(function(){
            d.body.removeChild(y);
        },1200);
  }
  return false;
}
function createClickingBtn(wBar,clickFunction){
    if(wBar){
        var d = document;
        var btnCSS = 'display:inline-block;color:#fff;font-weight:bold;background:'+$copy_Button_color+';border:2px outset #999;padding:4px 8px;margin:5px;opacity:1;cursor:pointer;';
        var btnHover = function(){ this.style.opacity=0.8 };
        var btnOut = function(){ this.style.borderStyle='outset';this.style.opacity=1; };
        var btnDown = function(){ this.style.borderStyle='inset';this.style.opacity=0.9; };
        var btnUp = function(){ this.style.borderStyle='outset';this.style.opacity=1; };
        wBar.style.position = 'relative';
        var nDiv = d.createElement('DIV');
        nDiv.style.cssText = 'position:absolute;top:0;right:0;overflow:hidden;';
        wBar.appendChild(nDiv);
        var b = d.createElement('BUTTON');
        b.type = 'button';
        b.style.cssText = btnCSS;
        b.innerText = 'Copy Existing Table Data!';
        b.onmouseover = btnHover;
        b.onmouseout = btnOut;
        b.onmousedown = btnDown;
        b.onmouseup = btnUp;
        nDiv.appendChild(b);
        b.onclick = clickFunction||null;
    }
}
function getAcumaticaTableData(tableID,nRowID,isSkipHiddenColumn){
    var dTable = document.getElementById(tableID), v = null;
    if(dTable){
        var dHead = dTable.getElementsByTagName('THEAD')[0];
        var dBody = dTable.getElementsByTagName('TBODY')[0];
        if(dHead){
            //String.fromCharCode(9) || \t
            //String.fromCharCode(10) || \n
            v = '';
            var hTDs = dHead.getElementsByTagName('TD'), dTD_L = hTDs.length;
            for(var iii=0; iii<dTD_L; iii++){
                if(!isSkipHiddenColumn || (hTDs[iii].style.display!='none' && isSkipHiddenColumn)){
                    v += (hTDs[iii].innerHTML||'').replace(/<[^>]*>?/gm,'').replace(/&nbsp;/g, ' ');
                    if(iii<dTD_L-1) v += String.fromCharCode(9);
                }
                if(iii==dTD_L-1) v += String.fromCharCode(10);
            }
        }
        if(dBody){
            var dTRs = dBody.getElementsByTagName('TR'), dTDs = []; dTD_L = [];
            for(var i=0; i<dTRs.length; i++){
                dTDs[i] = dTRs[i].getElementsByTagName('TD');
                dTD_L[i] = dTDs[i].length;
                if(nRowID && dTRs[i].id!=nRowID){
                    for(var ii=0; ii<dTD_L[i]; ii++){
                        if(!isSkipHiddenColumn || (hTDs[ii].style.display!='none' && isSkipHiddenColumn)){
                            v += (dTDs[i][ii].innerHTML||'').replace(/<[^>]*>?/gm,'').replace(/&nbsp;/g, ' ');
                            if(ii<dTD_L[i]-1) v += String.fromCharCode(9);
                        }
                        if(ii==dTD_L[i]-1) v += String.fromCharCode(10);
                    }
                }
            }
        }
    }; return v;
}

function checkTableDataReady(){
    var d = document, nRowID = 'ctl00_phG_grid_newRow', row1ID = 'ctl00_phG_grid_row_0', dataTableID = 'ctl00_phG_grid_dataT0', calculateReadyClass = 'addqtycalculationdone';
    var nRowElm = d.getElementById(nRowID)||d.getElementById(row1ID);
    if(!nRowElm){
        setTimeout(checkTableDataReady,600); return;
    }
    createClickingBtn(d.getElementById('ctl00_phDS_ds'),function(){
        var pkData = getAcumaticaTableData(dataTableID,nRowID,true);
        var dLength = pkData.split(/\n/).length;
        doCopyToClipboard(pkData,true,dLength-2);
    });
}

(function() {
    'use strict';
    var screenTimer = setInterval(function(){
        if(typeof __screenID != 'undefined'){
            clearInterval(screenTimer);
            screenTimer=null;
            var sID = __screenID.replace(/\./g,'').toString();
            if($refer_PageID){
                if($refer_PageID === '@ALL'){
                    checkTableDataReady();
                } else if($refer_PageID instanceof Array){
                    for(var i=0; i<$refer_PageID.length; i++){
                        if(sID == $refer_PageID[i]){
                            checkTableDataReady(); break;
                        }
                    }
                }
            }
        }
    },600);
})();
