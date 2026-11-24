// ==UserScript==
// @name         Acumatica Live: [PurchaseReceipt/PackingWithPrice] - Additional HK Declaration Price Info
// @namespace    https://github.com/flexxonwebapps
// @version      26.1124.1
// @description  Adding HK Declaration Price from the sum value of the column.
// @author       You
// @match        https://flexxonlive.go.akamai-access.com/FlexxonLive/*
// @updateURL    https://raw.githubusercontent.com/flexxonwebapps/userscript/main/system-autopricefordeclarationhk.js
// @downloadURL  https://raw.githubusercontent.com/flexxonwebapps/userscript/main/system-autopricefordeclarationhk.js
// @icon         https://www.flexxon.com/wp-content/uploads/2021/04/cropped-Favicon-1-1.ico
// @grant        none
// ==/UserScript==


function nRoundup(n,ds,is05) {
    var v = Math.ceil(n * Math.pow(10,ds)) / Math.pow(10,ds);
    if(is05) v = Math.ceil(v/0.5)*0.5;
    return v;
}
function numberRound(n,ds){
    return Math.round(n * Math.pow(10,ds)) / Math.pow(10,ds);
}
function rHeaderArray(){
    var d = document, hdrElm = d.getElementById('ctl00_phG_grid_headerT'), tHEAD, rHdrData = [];
    if(hdrElm) tHEAD = hdrElm.getElementsByTagName('THEAD')[0];
    if(tHEAD){
        var hdrTDs = tHEAD.getElementsByTagName('TD');
        for(var i=0; i<hdrTDs.length; i++){
            rHdrData.push( hdrTDs[i].innerHTML.replace(/<[^>]*>?/gm,'').replace(/&nbsp;/g,'').replace(/(^\s+|\s+$)/g,"")||'' );
        }
        return rHdrData;
    } else {
        return null;
    }
}
function returnHeaderIndex(headerData){
    var idx = {};
    for(var i=0;i<headerData.length;i++){
        if(headerData[i] == 'Inv.Amount') idx.invAMT = i;
        if(headerData[i] == 'Total Cost') idx.rptCOST = i;
    }
    return idx;
}
function addDeclarationPriceHK(sID){
    var d = document, hdrArray = rHeaderArray(), sumValue = null;
    //console.log('UserJS:: hdrArray = ' + hdrArray.toString());
    if(hdrArray){
        var colIdx = returnHeaderIndex(hdrArray), colNbr;
        //console.log('UserJS:: colIdx = ' + JSON.stringify(colIdx));
        if(sID == 'PO3020PL') colNbr = colIdx.rptCOST;
        if(sID == 'GI953928') colNbr = colIdx.invAMT;
        if(colNbr>-1){
            var sumTD = d.getElementById('ctl00_phG_grid_colFS_0_'+(colNbr-1)), btmArea = d.getElementById('ctl00_phG_grid_ab_tlb_ul');
            //console.log('UserJS:: sumTD ==> ' + sumTD.innerHTML);
            if(sumTD && btmArea) sumValue = sumTD.innerHTML.replace(/<[^>]*>?/gm,'').replace('Sum:','').replace(/\s/g,"").replace(/&nbsp;/g,'').replace(/\,/g,'')||0;
            if(sumValue){
                console.log('UserJS:: sumValue = ' + sumValue);
                var eLI_ID = 'declarationhkprice', nLI = d.getElementById(eLI_ID);
                if(!nLI){
                    nLI = d.createElement('LI'); nLI.id = 'declarationhkprice';
                    btmArea.insertBefore(nLI, btmArea.children[btmArea.children.length-6]);
                    nLI.style.cssText = 'color: DarkOliveGreen; background:#eee; border-left: 1px solid #ddd; border-right: 1px solid #ddd; padding:0px 18px; cursor:pointer;';
                    eLI_ID = 'https://www.customs.gov.hk/en/service-enforcement-information/cargo-clearance/import-export-declaration/index.html';
                    nLI.onclick = function(){ window.open(eLI_ID,'_blank') };
                }
                nLI.innerHTML = 'DeclarationHK ($):: ' + Math.min(numberRound((0.2) + (nRoundup(Math.max(((sumValue*7.8) - 46000)/1000,0), 0)) * 0.125,1),200).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '~';
            }
        }
    }
    setTimeout(function(){addDeclarationPriceHK(sID)},(sumValue?1800:1200));
}

(function() {
    'use strict';
    var screenTimer = setInterval(function(){
        if(typeof __screenID != 'undefined'){
            clearInterval(screenTimer);
            screenTimer=null;
            var sID = __screenID.replace(/\./g,'').toString();
            if(sID == 'PO3020PL' || sID == 'GI953928') addDeclarationPriceHK(sID);
        }
    },600);
})();
