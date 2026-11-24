// ==UserScript==
// @name         Acumatica Live: [Kit Assembly] - Compulsory QTY Checking while HOLD Status
// @namespace    https://github.com/flexxonwebapps
// @version      26.1124.1
// @description  Double check the QTY prevent ZERO is existed at component.
// @author       You
// @match        https://flexxonlive.go.akamai-access.com/FlexxonLive/*
// @updateURL    https://raw.githubusercontent.com/flexxonwebapps/userscript/main/system-assemblysafetycheck.js
// @downloadURL  https://raw.githubusercontent.com/flexxonwebapps/userscript/main/system-assemblysafetycheck.js
// @icon         https://www.flexxon.com/wp-content/uploads/2021/04/cropped-Favicon-1-1.ico
// @grant        none
// ==/UserScript==

function kitAssemblyCheck(){
    var d = document, $assemblyCheckDone=0;
    function getTableData(hdrTableId,dNewLineId){
        var dTable = d.getElementById(hdrTableId), dLength = 0, zeroQty = 0, dQtySum = 0, dInIDs = [];
        var dtHead = dTable.getElementsByTagName('THEAD')[0];
        if(dtHead){
            var hTDs = dtHead.getElementsByTagName('TD'), dTexts = [], qtyColumn = null, inIdColumn = null;
            for(var ii=0;ii<hTDs.length;ii++){
                dTexts[ii] = hTDs[ii].innerHTML.replace(/<[^>]*>?/gm,'').replace(/(^\s+|\s+$)/g,'');
                if(dTexts[ii] == 'Quantity') qtyColumn = ii;
                if(dTexts[ii] == 'Inventory ID') inIdColumn = ii;
                if(qtyColumn&&inIdColumn) break;
            }
            var nLine = d.getElementById(dNewLineId), dtBody;
            if(qtyColumn!=null && nLine){
                dtBody = nLine.parentNode;
                var dLines = dtBody.getElementsByTagName('TR');
                dLength = dLines.length;
                if(dLength>1){
                    var dColumns = [], dQTYs = [];
                    for(var i=0;i<dLength;i++){
                        if(dLines[i].id!=dNewLineId){
                            dColumns[i] = dLines[i].getElementsByTagName('TD');
                            dQTYs[i] = dColumns[i][qtyColumn].innerHTML.split('</div>');
                            dQTYs[i] = parseInt(dQTYs[i][dQTYs[i].length-1])||0;
                            if(dQTYs[i]>0){
                                dQtySum += dQTYs[i];
                            } else {
                                zeroQty ++;
                                if(inIdColumn) dInIDs.push('🆔 '+dColumns[i][inIdColumn].innerHTML.replace(/<[^>]*>?/gm,''));
                            }
                        }
                    }
                }
            }
        }
        return [dLength,zeroQty,dInIDs,dQtySum];
    }
    function dataCheck(eThis){
        var aQty = d.getElementById('ctl00_phF_form_t0_edQty');
        aQty = parseInt(aQty.value)||0;
        if(!(aQty>0)) return alert('Kitting QTY is not found!');
        var tData1 = getTableData('ctl00_phG_tab_t0_componentsGrid_dataT0','ctl00_phG_tab_t0_componentsGrid_newRow');
        if(!(tData1[0]>1)) return alert('Stock Components are empty!');
        if(tData1[1]>0){
            if(confirm('Zero QTY is found in Stock Components!\n\n'+(tData1[2].toString().replace(/\,/g,'\n'))+'\n\nAre you sure to continue?')!=true){
                return;
            }
        }
        var tData2 = getTableData('ctl00_phG_tab_t2_serialNumbersGrid_headerT','ctl00_phG_tab_t2_serialNumbersGrid_newRow');
        if(!(tData2[0]>1)) return alert('Kit Line Details are empty! Please at least add correct info with [@TEMP] location at least.');
        if(tData2[1]>0) return alert('Zero QTY is found in Kit Line Details!');
        if(tData2[3]!=aQty) return alert('Unmatched QTY between total kitting QTY & Kit Line Details!');


        var kDate = d.getElementById('ctl00_phF_form_t0_edTranDate_text');
        if(kDate) kDate = kDate.value||'';
        if(kDate){
            kDate = kDate.split('/');
            var transTime = new Date(parseInt(kDate[2]),parseInt(kDate[1])-1,parseInt(kDate[0]));
            var nDate = new Date(), thisMonth1Time = (new Date(nDate.getFullYear(),nDate.getMonth(),1)).getTime();
            if(transTime && thisMonth1Time){
                if(transTime<thisMonth1Time){
                    return alert('Date-back transaction is now allowed!');
                }
            } else {
                return alert('Unexpected Time Error!');
            }
        } else {
            return alert('Unexpected Date Error!');
        }
        var holdLI = d.getElementById('ctl00_phDS_ds_ToolBar_ReleaseFromHold');
        if(holdLI){
            holdLI.style.display = 'inline-block';
            eThis.parentNode.removeChild(eThis);
            $assemblyCheckDone=1;
        } else {
            return alert('Unexpected Error!');
        }
    }
    function initializeHoldCover(tBar){
        if(!d.getElementById('kittingcheckstyle')){
            var sTag = d.createElement('STYLE');
            sTag.id = 'kittingcheckstyle';
            var fCSS = d.createTextNode('div.qp-tool-bar ul.items-list li#ctl00_phDS_ds_ToolBar_ReleaseFromHold { display:none; }');
            sTag.appendChild(fCSS);
            var h = d.getElementsByTagName('head')[0];
            h.appendChild(sTag);
        }
        if(!d.getElementById('kittingcheckqtybutton')){
            var rBtn = d.createElement('UL');
            rBtn.id = 'kittingcheckqtybutton';
            rBtn.style.cssText = 'list-style:none;padding:0;margin:0;';
            rBtn.innerHTML = '<li><div style="color:#fff;font-weight:bold;background:FireBrick;padding:6px 12px;margin:2px 4px;cursor:pointer;">Initial Check</div></li>';
            (d.getElementById('ctl00_phDS_ds_ToolBar')||tBar.parentNode).appendChild(rBtn);
            rBtn.onclick = function(){
                dataCheck(this);
            }
        }
    }
    function intervalCheckQty(tBar){
        var statusInput = d.getElementById('ctl00_phF_form_t0_edStatus_text');
        var sValue = statusInput.value||'';
        if(sValue){
            if(sValue=='On Hold'){
                var holdLI = d.getElementById('ctl00_phDS_ds_ToolBar_ReleaseFromHold');
                if(holdLI){
                    if($assemblyCheckDone===0){
                        initializeHoldCover(tBar);
                    } else {
                        holdLI.style.display = 'inline-block';
                    }
                } else {
                    console.log('On-Hold button is not found!');
                }
            } else {
                var checkBtn = d.getElementById('kittingcheckqtybutton');
                if(checkBtn) checkBtn.parentNode.removeChild(checkBtn);
            }
        } else {
            console.log('Status is not found!');
        }
    }
    function checkStartupBar(){
        var tBar = d.getElementById('ctl00_phDS_ds_ToolBar_bar');
        if(tBar){
            var statusInput = d.getElementById('ctl00_phF_form_t0_edStatus_text');
            if(statusInput){
                intervalCheckQty(tBar);
                setInterval(function(){
                    intervalCheckQty(tBar);
                },120);
            } else {
                console.log('Status is not found!');
                setTimeout(checkStartupBar,60);
            }
        } else {
            setTimeout(checkStartupBar,240);
        }
    }
    checkStartupBar();
}

(function() {
    'use strict';
    var screenTimer = setInterval(function(){
        if(typeof __screenID != 'undefined'){
            clearInterval(screenTimer);
            screenTimer=null;
            var sID = __screenID.replace(/\./g,'').toString();
            if(sID=='IN307000') kitAssemblyCheck();
        }
    },600);
})();
