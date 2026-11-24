// ==UserScript==
// @name         Acumatica Live: [FLX MRP Display] - Add up QTY.on.Hand to Assigned Columns & add copy button
// @namespace    https://github.com/flexxonwebapps
// @version      26.1124.1
// @description  Add up QTY.on.Hand to related Available Acutal and Total Demand/Supply columns, with copy existing data button.
// @author       You
// @match        https://flexxonlive.go.akamai-access.com/FlexxonLive/*
// @updateURL    https://raw.githubusercontent.com/flexxonwebapps/userscript/main/bundle.user.sub.js
// @downloadURL  https://raw.githubusercontent.com/flexxonwebapps/userscript/main/bundle.user.sub.js
// @icon         https://www.flexxon.com/wp-content/uploads/2021/04/cropped-Favicon-1-1.ico
// @grant        none
// ==/UserScript==




var $enable_Loading = true;

//https://www.w3schools.com/colors/colors_names.asp
var $updated_text_color = 'MediumBlue';

var $copy_Button_color = 'MediumVioletRed';

var $loading_Background = 'white';
var $loading_dot_color = 'PaleTurquoise';
var $loading_size = 10;
var $loading_opacity = 0.6;
var $loading_speed = 120;



//============================================================
//============================================================
//============================================================
//============================================================
//***************🔻Do Not Edit Below Scripts🔻***************
//============================================================
//============================================================
//============================================================
//============================================================

var $pageCopiedText = "";
window.addEventListener("copy", function(ev){
  if($pageCopiedText!=""){
    ev.preventDefault();
    ev.clipboardData.setData("text/plain",$pageCopiedText);
    //console.log("UserJS: Copied ["+$pageCopiedText+"]");
  }
});
function doCopyToClipboard(v,isMultiLines,dLength){
    var d = document;
    var u = d.getElementById('inputcopyzone');
    if(!u){
        u = d.createElement('DIV');
        u.style.cssText = 'position:fixed;top:0;left:0;height:0px;width:0px;overflow:hidden;';
        u.innerHTML = isMultiLines?'<textarea id="inputcopyzone" rows="1" cols="1" style="resize:none;display:none;" readonly></textarea>':'<input id="inputcopyzone" type="text" value="" style="display:none;" size="1" readonly/>';
        d.body.appendChild(u);
    }
    if(v){
        var x = d.getElementById("inputcopyzone");
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
        y.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;overflow:hidden;z-index:999999;';
        var a = d.createElement('DIV')
        a.style.cssText = "display:block;position:absolute;top:0;bottom:0;left:0;right:0;width:204px;height:40px;font-size:18px;font-family:arial;color:"+c+";text-align:center;background-color:FloralWhite;border:4px solid YellowGreen;padding:10px;margin:auto;overflow:hidden;";
        a.innerHTML = 'Copy ' + t + ('<br/><small style="color:black;">(<b>*<u style="color:red;">'+(dLength||0)+'</u></b> Record'+((dLength||0)>1?'s are':'is')+' captured)</small>');
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
var $loadingLayerId = 'updatingtableqtyrequest';
var $loadingTimer = null, $loadingIndex = 1;
function closeBodyLoading(){
    var d = document, e = d.getElementById($loadingLayerId);
    if(e){
        if($loadingTimer!=null) clearInterval($loadingTimer);
        $loadingTimer = null;
        e.style.display = 'none';
    }
}
function activateBodyLoading(){
    var d = document, e = d.getElementById($loadingLayerId);
    if(e){
        closeBodyLoading();
        e.style.display = 'block';
        var z = parseInt($loading_size)||10;
        var lSpans = e.getElementsByTagName('SPAN'), m, m2;
        var goLoading = function(){
            var sL = lSpans.length;
            $loadingIndex++; if($loadingIndex>=sL) $loadingIndex = 0;
            for(var i=0; i<sL; i++){
                m = i==$loadingIndex?2:1;
                m2 = i==$loadingIndex?0.5:1;
                lSpans[i].style.cssText = 'display:inline-block;width:'+(z*m)+'px;height:'+(z*m)+'px;background:'+$loading_dot_color+';margin:'+(z*m2)+'px '+(z*m)+'px;';
            }
        }
        $loadingTimer = setInterval(goLoading,$loading_speed);
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
            var dTRs = dBody.getElementsByTagName('TR'); dTDs = [], dTD_L = [];
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

function returnHeaderIndex(headerData){
    var idx = {};
    for(var i=0;i<headerData.length;i++){
        if(headerData[i] == 'Total Actual Supply') idx.taSupply = i;
        if(headerData[i] == 'Available (Supply-Demand) (Actual)') idx.aaSupplyDemand = i;
        if(headerData[i] == 'Total Supplies') idx.tSupply = i;
        if(headerData[i] == 'Available (Supply-Demand)') idx.avSupplyDemand = i;
        if(headerData[i] == 'Qty. On Hand') idx.dQty = i;
    }
    return idx;
}
function updateRowQtyContents(rTDs,pkContent,i,idx){
    var span1 = '<span style="color:'+$updated_text_color+';font-weight:bold;">', span0 = '.00</span>';
    rTDs[idx.taSupply].innerHTML = span1 + ((parseInt(pkContent[i][idx.taSupply].replace(/\,/g,''))||0) + (parseInt(pkContent[i][idx.dQty].replace(/\,/g,''))||0)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + span0;
    rTDs[idx.aaSupplyDemand].innerHTML = span1 + ((parseInt(pkContent[i][idx.aaSupplyDemand].replace(/\,/g,''))||0) + (parseInt(pkContent[i][idx.dQty].replace(/\,/g,''))||0)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + span0;
    rTDs[idx.tSupply].innerHTML = span1 + ((parseInt(pkContent[i][idx.tSupply].replace(/\,/g,''))||0) + (parseInt(pkContent[i][idx.dQty].replace(/\,/g,''))||0)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + span0;
    rTDs[idx.avSupplyDemand].innerHTML = span1 + ((parseInt(pkContent[i][idx.avSupplyDemand].replace(/\,/g,''))||0) + (parseInt(pkContent[i][idx.dQty].replace(/\,/g,''))||0)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + span0;
}
function updateTableColumnQTY(newRow,nRowID,row1ID,dataTableID,calculateReadyClass){
    var pkData = getAcumaticaTableData(dataTableID,nRowID);
    var dBody = newRow.parentNode;
    var dRows = dBody.getElementsByTagName('TR');
    if(dRows.length>1){
        var headerData, pkContent = []; pkData = pkData.split(/\n/);
        for(var ii=0;ii<pkData.length;ii++){
            if(ii==0){
                headerData = pkData[ii].split(/\t/);
            }
            if(ii>0){
                pkContent.push( pkData[ii].split(/\t/) );
            }
        }
        var overRow = document.getElementById('ctl00_phG_grid_scrollDiv').getElementsByTagName('TABLE')[1], rIndex = -1, overTDs;
        if(overRow.className=='RowNavigator'){
            var topPos = overRow.offsetTop||0;
            var rHeight = overRow.offsetHeight||0;
            overRow.style.visibility = 'hidden';
            rIndex = Math.round(topPos/rHeight);
            overTDs = overRow.getElementsByTagName('TBODY')[0].getElementsByTagName('TD');
        }
        var dL = pkContent.length;
        if(dL>0){
            var idx = returnHeaderIndex(headerData), rTDs = [];
            for(var i=0;i<dL;i++){
                if(dRows[i]){
                    rTDs[i] = dRows[i].getElementsByTagName('TD');
                    if(nRowID && dRows[i].id == nRowID){
                        dRows[i].className = calculateReadyClass;
                    } else {
                        if(dRows[i].id==row1ID) dRows[i].className = calculateReadyClass;
                        updateRowQtyContents(rTDs[i],pkContent,i,idx);
                        if(rIndex==i){
                            updateRowQtyContents(overTDs,pkContent,i,idx);
                            overRow.style.visibility = 'visible';
                        }
                    }
                }
            }
        }
    }
}
function checkTableDataReady(){
    var d = document, nRowID = 'ctl00_phG_grid_newRow', row1ID = 'ctl00_phG_grid_row_0', dataTableID = 'ctl00_phG_grid_dataT0', calculateReadyClass = 'addqtycalculationdone';
    var nRowElm = d.getElementById(nRowID)||d.getElementById(row1ID);
    if(!nRowElm){
        setTimeout(checkTableDataReady,600); return;
    }
    if($enable_Loading===true){
        var e = d.createElement('DIV'); e.id = $loadingLayerId;
        e.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;overflow:hidden;z-index:999990;display:none;';
        var z = parseInt($loading_size)||10;
        var h = '', sDot = '<span style="display:inline-block;width:'+z+'px;height:'+z+'px;background:'+$loading_dot_color+';margin:'+z+'px;"></span>';
        h += '<div style="position:absolute;top:0;left:0;width:100%;height:100%;background:'+$loading_Background+';opacity:'+$loading_opacity+';"></div>';
        h += '<div style="position:absolute;top:0;bottom:0;left:0;right:0;width:'+(z*18)+'px;height:'+(z*3)+'px;text-align:center;white-space:nowrap;margin:auto;">';
        h += sDot;
        h += sDot;
        h += sDot;
        h += sDot;
        h += sDot;
        h += sDot;
        h += '</div>';
        e.innerHTML = h;
        d.body.appendChild(e);
    }
    createClickingBtn(d.getElementById('ctl00_phDS_ds'),function(){
        var pkData = getAcumaticaTableData(dataTableID,nRowID,true);
        var dLength = pkData.split(/\n/).length;
        doCopyToClipboard(pkData,true,dLength-2);
    });
    setInterval(function(){
        var nRowElm = d.getElementById(nRowID)||d.getElementById(row1ID);
        if(nRowElm){
            if(nRowElm.className!=calculateReadyClass){
                if($enable_Loading===true) activateBodyLoading();
                updateTableColumnQTY(nRowElm,nRowID,row1ID,dataTableID,calculateReadyClass);
                if($enable_Loading===true) setTimeout(closeBodyLoading,240);
            }
        }
    },600);
}

(function() {
    'use strict';
    var screenTimer = setInterval(function(){
        if(typeof __screenID != 'undefined'){
            clearInterval(screenTimer);
            screenTimer=null;
            var sID = __screenID.replace(/\./g,'').toString();
            if(sID == 'GI100180') checkTableDataReady();
        }
    },600);
})();
