// ==UserScript==
// @name         Acumatica Live: [Shipments/Invoices] - Additional Weight, Volume, & Total Info
// @namespace    http://tampermonkey.net/
// @version      1.6
// @description  Adding detail Weight & Volume information in Shipments "PACKAGES" tab, and display Total QTY at Invoices.
// @author       You
// @match        https://flexxonlive.go.akamai-access.com/FlexxonLive/*
// @icon         https://www.flexxon.com/wp-content/uploads/2021/04/cropped-Favicon-1-1.ico
// @grant        none
// ==/UserScript==


function getAcumaticaTableData(tableID,nRowID){
    var dTable = document.getElementById(tableID), v = null;
    if(dTable){
        var dHead = dTable.getElementsByTagName('THEAD')[0];
        var dBody = dTable.getElementsByTagName('TBODY')[0];
        if(dHead){
            //String.fromCharCode(9) || \t
            //String.fromCharCode(10) || \n
            v = '';
            var dTDs = dHead.getElementsByTagName('TD'), dTD_L = dTDs.length;
            for(var iii=0; iii<dTD_L; iii++){
                v += dTDs[iii].innerHTML||'';
                v += String.fromCharCode((iii==dTD_L-1)?10:9);
            }
        }
        if(dBody){
            var dTRs = dBody.getElementsByTagName('TR'); dTDs = [], dTD_L = [];
            for(var i=0; i<dTRs.length; i++){
                dTDs[i] = dTRs[i].getElementsByTagName('TD');
                dTD_L[i] = dTDs[i].length;
                if(dTRs[i].id!=nRowID){
                    for(var ii=0; ii<dTD_L[i]; ii++){
                        v += (dTDs[i][ii].innerHTML||'').replace(/<[^>]*>?/gm,'');
                        v += String.fromCharCode((ii==dTD_L[i]-1)?10:9);
                    }
                }
            }
        }
    }; return v;
}
function returnHeaderIndex(headerData){
    var idx = {};
    for(var i=0;i<headerData.length;i++){
        if(headerData[i] == 'Carton') idx.CartonNbr = i;
        if(headerData[i] == 'Qty'||headerData[i] == 'Quantity') idx.QTY = i;
        if(headerData[i] == 'Net Weight') idx.NW = i;
        if(headerData[i] == 'Gross Weight') idx.GW = i;
        if(headerData[i] == 'Length') idx.L = i;
        if(headerData[i] == 'Width') idx.W = i;
        if(headerData[i] == 'Height') idx.H = i;
    }
    return idx;
}
function numberRound(n,ds){
    return Math.round(n * Math.pow(10,ds)) / Math.pow(10,ds);
}
function nRoundup(n,ds,is05) {
    var v = Math.ceil(n * Math.pow(10,ds)) / Math.pow(10,ds);
    if(is05) v = Math.ceil(v/0.5)*0.5;
    return v;
}
function wInfo(i1,i2,i3,i4,i5,i6){
    var zs = ' style="font-size:16px;"';
    return 'PKG: <u'+zs+'>'+(i6||'0')+'</u>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;C.W.: <u'+zs+'><b style="color:red;">'+(i1||'0.0')+'</b> KGS</u>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;G.W.: <u'+zs+'>'+(i2||'0.0')+' KGS</u>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;V.W.: <u'+zs+'>'+(i3||'0.0')+'KGS</u>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;M³W: <u'+zs+'>'+(i4||'0.0')+'KGS</u>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;CBM: <u'+zs+'>'+(i5||'0.0')+'</u>';
}
function loadChargeWeightInfo(nRowID){
    var d = document, newRow = d.getElementById(nRowID);
    if(newRow){
        var iBtn = d.getElementById('chargingweightarea');
        if(iBtn){
            var pkData = getAcumaticaTableData('ctl00_phG_tab_t3_gridPackages_dataT0',nRowID);
            var dBody = newRow.parentNode;
            var dRows = dBody.getElementsByTagName('TR'), cwTotal = 0, gwTotal = 0, vwTotal = 0, cbmTotal = 0, m3Total = 0, ctnTotal = 0;
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
                var dL = pkContent.length;
                if(dL>0){
                    var idx = returnHeaderIndex(headerData), rNbrs = [], rSize = [];
                    for(var i=0;i<dL;i++){
                        rNbrs[i] = [(pkContent[i][idx.CartonNbr]||''),(parseFloat(pkContent[i][idx.NW])||0),(parseFloat(pkContent[i][idx.GW])||0),(parseFloat(pkContent[i][idx.L])||0),(parseFloat(pkContent[i][idx.W])||0),(parseFloat(pkContent[i][idx.H])||0)];
                        if(rNbrs[i][2]) gwTotal = gwTotal + rNbrs[i][2];
                        if(rNbrs[i][2] || (rNbrs[i][3]&&rNbrs[i][4]&&rNbrs[i][5])){
                            rSize[i] = rNbrs[i][3]*rNbrs[i][4]*rNbrs[i][5];
                            cwTotal += Math.max(nRoundup(rNbrs[i][2],4,true), nRoundup(rSize[i]/5000,4,true) );
                            vwTotal += nRoundup(rSize[i]/5000,4,true);
                            cbmTotal += rSize[i]/1000000;
                            m3Total += rSize[i]/1000000*167;
                            if(rSize[i]>0||rNbrs[i][2]>0) ctnTotal+= 1;
                        }
                    }
                }
            }
            iBtn.innerHTML = wInfo((parseInt(cwTotal)!=cwTotal?cwTotal:(cwTotal.toString()+'.0')),numberRound(gwTotal,3),nRoundup(vwTotal,2),nRoundup(m3Total,2),nRoundup(cbmTotal,3),ctnTotal);
        }
    }
}
function getCalculationHTML(nRowID){
    var d = document, newRow = d.getElementById(nRowID);
    if(newRow){
        var pkData = getAcumaticaTableData('ctl00_phG_tab_t3_gridPackages_dataT0',nRowID);
        var dBody = newRow.parentNode, h = '';
        var dRows = dBody.getElementsByTagName('TR'), cwTotal = 0, gwTotal = 0, vwTotal = 0, m3Total = 0, cbmTotal = 0, ctnTotal = 0;
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
            var dL = pkContent.length;
            if(dL>0){
                h += '<div><table id="weightdetails" border="0" cellpadding="0" cellspacing="0">';
                h += '<thead><tr>';
                h += '<td>Ctn#</td>';
                var zs = ' style="width:48px;"';
                h += '<td'+zs+'>L</td>';
                h += '<td'+zs+'>W</td>';
                h += '<td'+zs+'>L</td>';
                h += '<td style="color:DarkRed;background:#e9dad8;">C.W.</td>';
                h += '<td>G.W.</td>';
                h += '<td>V.W.</td>';
                h += '<td>M³W</td>';
                h += '<td>CBM</td>';
                h += '<td>Pack QTY</td>';
                h += '</tr></thead>';
                h += '<tbody>';
                var idx = returnHeaderIndex(headerData), rNbrs = [], fakeIdx = 0, rSize = [], pQty = 0, pSumQty = 0;
                for(var i=0;i<dL;i++){
                    rNbrs[i] = [(pkContent[i][idx.CartonNbr]||''),(parseFloat(pkContent[i][idx.NW])||0),(parseFloat(pkContent[i][idx.GW])||0),(parseFloat(pkContent[i][idx.L])||0),(parseFloat(pkContent[i][idx.W])||0),(parseFloat(pkContent[i][idx.H])||0),(parseInt((pkContent[i][idx.QTY]||'').replace(/\,/g,''))||0)];
                    pQty += rNbrs[i][6];
                    pSumQty += rNbrs[i][6];
                    if(rNbrs[i][2] || (rNbrs[i][3]&&rNbrs[i][4]&&rNbrs[i][5])){
                        if(i>0){
                            //if(rNbrs[i][6]) if(rNbrs[i][0]!=rNbrs[i-1][0]){
                            h = h.replace('<[{perPkgQty#'+fakeIdx+'}]>',(pQty-rNbrs[i][6]).toString().replace(/\B(?=(\d{3})+(?!\d))/g,','));
                            pQty = rNbrs[i][6];
                            //}
                        }
                        fakeIdx += 1;
                        rSize[i] = rNbrs[i][3]*rNbrs[i][4]*rNbrs[i][5];
                        cwTotal += Math.max(nRoundup(rNbrs[i][2],4,true), nRoundup(rSize[i]/5000,4,true) );
                        if(rNbrs[i][2]) gwTotal += rNbrs[i][2];
                        vwTotal += nRoundup(rSize[i]/5000,4,true);
                        m3Total += rSize[i]/1000000*167;
                        cbmTotal += rSize[i]/1000000;
                        if(rSize[i]>0||rNbrs[i][2]>0) ctnTotal+= 1;
                        h += '<tr>';
                        h += '<td>'+(rNbrs[i][0]?rNbrs[i][0]:'')+'</td>';
                        h += '<td>'+(rNbrs[i][3]?rNbrs[i][3]:'?')+'</td>';
                        h += '<td>'+(rNbrs[i][4]?rNbrs[i][4]:'?')+'</td>';
                        h += '<td>'+(rNbrs[i][5]?rNbrs[i][5]:'?')+'</td>';
                        h += '<td class="cwdata">'+(rSize[i]?Math.max(rNbrs[i][2], nRoundup(rSize[i]/5000,4,true) ):'<i style="color:red;">(N/A)</i>')+'</td>';
                        h += '<td>'+(rNbrs[i][2]?rNbrs[i][2]:'<i style="color:red;">(N/A)</i>')+'</td>';
                        h += '<td>'+(rSize[i]?nRoundup(rSize[i]/5000,4,true):'<i style="color:red;">(N/A)</i>')+'</td>';
                        h += '<td>'+(rSize[i]?nRoundup(rSize[i]/1000000*167,4):'<i style="color:red;">(N/A)</i>')+'</td>';
                        h += '<td>'+(rSize[i]?nRoundup(rSize[i]/1000000,4):'<i style="color:red;">(N/A)</i>')+'</td>';
                        h += '<td><[{perPkgQty#'+fakeIdx+'}]></td>';
                        h += '</tr>';
                    }
                }
                h = h.replace('<[{perPkgQty#'+fakeIdx+'}]>',pQty.toString().replace(/\B(?=(\d{3})+(?!\d))/g,','));
                h += '</tbody>';
                h += '<tfoot><tr>';
                h += '<td>Total:</td>';
                h += '<td colspan="3" style="text-align:left;"><span><b>'+ctnTotal+' </b>CTN(s)</span></td>';
                //h += '<td></td>';
                //h += '<td></td>';
                h += '<td style="color:Crimson;background:SeaShell;"><u><b>'+(parseInt(cwTotal)!=cwTotal?cwTotal:(cwTotal.toString()+'.0'))+'</b></u></td>';
                h += '<td><u>'+numberRound(gwTotal,3)+'</td>';
                h += '<td><u>'+nRoundup(vwTotal,2)+'</u></td>';
                h += '<td><u>'+nRoundup(m3Total,2)+'</u></td>';
                h += '<td><u>'+nRoundup(cbmTotal,3)+'</u></td>';
                h += '<td><u>'+pSumQty.toString().replace(/\B(?=(\d{3})+(?!\d))/g,',')+'</u></td>';
                h += '</tr></tfoot>';
                h += '</table></div>';
            }
            if(h) h += '<div style="color:darkred;font-size:13px;margin-top:10px;"> * [C.W.] = Chargeable Weight, [G.W.] = Gross Weight. [V.W.] = Volumetric Weight (same as "Dimensions Weight"), M³W = CBM Weight.</div>';
        }
    }
    var cssText = '';
    if(h) cssText = 'table#weightdetails {border:0;padding:0;margin:0;width:100%;border:1px solid #bbb;} table#weightdetails td {text-align:center; border:1px solid #eee; padding:8px 6px;} table#weightdetails thead td {font-weight:bold;background:#ddd;border-bottom-color:#bbb;} table#weightdetails td.cwdata {background:Ivory;} table#weightdetails tfoot td {border-color:transparent;border-top-color:#bbb;} table#weightdetails tfoot td span { display:inline-block;border-bottom:1px solid; } table#weightdetails tfoot td u {display:inline-block;text-decoration:none;border-bottom:2px double;margin-bottom:1px;}';
    return h?('<html><head><title>Packing Calculation Details - '+(d.getElementById('ctl00_phF_form_t0_edShipmentNbr_text').value||'?')+'</title><style>'+cssText+'</style></head><body>'+h+'</body></html>'):'';
}
function showAlertWeight(nRowID){
    var nHtml = getCalculationHTML(nRowID);
    if(!nHtml) return alert('Oops! Related packing data is NOT found.');
    var h = screen.height, w = screen.width;
    var x = w*0.6, y = h*0.5;
    var a = w*0.3, b = h*0.3;
    var n = 'PackingInfoPage#'+(new Date()).getTime()+'';
    var packingWindow = window.open('','_blank', 'channelmode=no,top='+b+',left='+a+',width='+x+',height='+y+',menubar=no,location=no,resizable=yes,scrollbars=yes,status=no,toolbar=no,titlebar=no');
    packingWindow.name = n;
    packingWindow.document.body.innerHTML = getCalculationHTML(nRowID);
    return false;
}
function createInfoArea(nRowID){
    var d = document, tabArea = d.getElementById('ctl00_phG_tab_t3_gridPackages_at_tlb_ul').parentNode;
    tabArea.style.position = 'relative';
    var nDiv = d.createElement('DIV');
    nDiv.style.cssText = 'position:absolute;top:0;right:2px;width:auto;font-size:10px;margin:0px 0px;overflow:hidden;';
    tabArea.appendChild(nDiv);

    var pInfoText = d.createElement('A');
    pInfoText.id = 'chargingweightarea';
    pInfoText.style.cssText = 'display:inline-block;position:relative;height:auto;width:auto;color:DarkBlue;font-weight:bold;border:2px dotted darkred;background:FloralWhite;padding:4px 12px;margin:1px 4px;white-space:nowrap;';
    pInfoText.innerHTML = wInfo();
    nDiv.appendChild(pInfoText);

    var pBtn = d.createElement('BUTTON');
    pBtn.type = 'button';
    pBtn.innerHTML = '☷';
    pBtn.title = 'Show the list of measurement details';
    pBtn.style.cssText = 'display:inline-block;position:relative;top:-1px;right:0;color:#000;font-weight:bold;background:PaleTurquoise;border:2px outset #999;padding:6px 12px;margin:0px;opacity:0.9;cursor:pointer;';
    var btnHover = function(){ this.style.opacity=0.8 };
    var btnOut = function(){ this.style.borderStyle='outset';this.style.opacity=1; };
    var btnDown = function(){ this.style.borderStyle='inset';this.style.opacity=0.9; };
    var btnUp = function(){ this.style.borderStyle='outset';this.style.opacity=1; };
    pBtn.onmouseover = btnHover;
    pBtn.onmouseout = btnOut;
    pBtn.onmousedown = btnDown;
    pBtn.onmouseup = btnUp;
    nDiv.appendChild(pBtn);
    pBtn.onclick = function(){showAlertWeight(nRowID)};
}
function addWeightInfo(){
    var d = document, nRowID = 'ctl00_phG_tab_t3_gridPackages_newRow', statusID = 'ctl00_phF_form_t0_edStatus_text';
    var xStatus = d.getElementById(statusID);
    if(!xStatus.value){
        setTimeout(addWeightInfo,600); return;
    }
    createInfoArea(nRowID);
    setInterval(function(){
        var pkTable = d.getElementById('ctl00_phG_tab_t3');
        if(pkTable) if(pkTable.style.display!='none') loadChargeWeightInfo(nRowID);
    },600);
}
function addQtySumInfo(){
    var d = document, tabArea = d.getElementById('ctl00_phG_tab_t0_grid_at_tlb_ul').parentNode;
    tabArea.style.position = 'relative';
    var nDiv = d.createElement('DIV');
    nDiv.style.cssText = 'position:absolute;top:0;right:2px;width:auto;font-size:10px;margin:2px 0px 0px;overflow:hidden;';
    tabArea.appendChild(nDiv);

    var qInfoText = d.createElement('A');
    qInfoText.style.cssText = 'display:inline-block;position:relative;height:auto;width:auto;color:DarkBlue;font-weight:bold;border:2px dotted darkred;background:FloralWhite;padding:4px 10px;margin:1px 4px;white-space:nowrap;';
    qInfoText.innerHTML = '<span>Total QTY:</span>&nbsp;&nbsp;&nbsp;<span id="qtysuminfo" style="font-size:16px;">0</span>';
    nDiv.appendChild(qInfoText);

    var nRowID = 'ctl00_phG_tab_t0_grid_newRow';
    setInterval(function(){
        var newRow = d.getElementById(nRowID), qInfo = d.getElementById('qtysuminfo'), sumQty = 0;
        if(newRow&&qInfo){
            var invData = getAcumaticaTableData('ctl00_phG_tab_t0_grid_dataT0',nRowID);
            var dBody = newRow.parentNode, dRows = dBody.getElementsByTagName('TR');
            if(dRows.length>1){
                var headerData, invContent = []; invData = invData.split(/\n/);
                for(var ii=0;ii<invData.length;ii++){
                    if(ii==0){
                        headerData = invData[ii].split(/\t/);
                    }
                    if(ii>0){
                        invContent.push( invData[ii].split(/\t/) );
                    }
                }
                var dL = invContent.length;
                if(dL>0){
                    var idx = returnHeaderIndex(headerData);
                    for(var i=0;i<dL;i++){
                        if(invContent[i][idx.QTY]) sumQty += parseFloat(invContent[i][idx.QTY].replace(/\,/g,''))||0;
                    }
                }
            }
        } else {
            sumQty = 0;
        }
        qInfo.innerHTML = sumQty.toString().replace(/\B(?=(\d{3})+(?!\d))/g,',');
    },1200);
}
(function() {
    'use strict';
    var screenTimer = setInterval(function(){
        if(typeof __screenID != 'undefined'){
            clearInterval(screenTimer);
            screenTimer=null;
            var sID = __screenID.replace(/\./g,'').toString();
            if(sID == 'SO302000') addWeightInfo();
            if(sID == 'SO303000') addQtySumInfo();
        }
    },600);
})();
