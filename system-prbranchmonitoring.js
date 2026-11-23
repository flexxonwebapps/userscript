// ==UserScript==
// @name         Acumatica Live: [Purchase Receipts] Checking Branch
// @namespace    http://tampermonkey.net/
// @version      1.20
// @description  Checking the branch data of PR, PO, and warehouse. Show alert if not matched. And highlight IPO Transfer Vendor PN.
// @author       Martin M
// @match        https://flexxonlive.go.akamai-access.com/FlexxonLive/*
// @icon         https://www.flexxon.com/wp-content/uploads/2021/04/cropped-Favicon-1-1.ico
// @grant        none
// ==/UserScript==

//============================================================
//============================================================


function showErrorBox(x,aElm,timeInSec,zIdx){
    // Create error box element
    var d = document, errElmID = 'brancherrorbox', oErrBox = d.getElementById(errElmID);
    if(oErrBox) oErrBox.parentNode.removeChild(oErrBox);
    var errBox = d.createElement('DIV');

    // Style the error box
    errBox.id = errElmID;
    errBox.style.cssText = 'position:fixed;top:0;right:0;max-width:40%;font-family:arial,sans-serif;font-size:24px;color:#fff;border:1px solid #eee;box-shadow:0px 2px 2px rgba(0,0,0,0.4);background:Crimson;padding:6px 12px;margin:20px;opacity:0;';
    errBox.style.transition = 'opacity 0.3s ease-in-out'; // Add transition for fade effect
    errBox.style.zIndex = zIdx||9999;

    // Set the error message
    errBox.innerHTML = x;
    (aElm||d.body).appendChild(errBox);

    // Trigger fade-in
    setTimeout(function(){
        if(errBox) errBox.style.opacity = '1';
    },0);
    var sec = timeInSec||3;
    // Fade out and remove after 3 seconds
    setTimeout(function(){
        if(errBox) errBox.style.opacity = '0';
    }, sec*1000);
    setTimeout(function(){
        if(errBox) errBox.parentNode.removeChild(errBox);
    }, sec*1100); // Match transition duration
}

function rInText(h){
    return h.innerHTML.replace(/<[^>]*>?/gm,'').replace(/(^\s+|\s+$)/g,'').replace(/&nbsp;/g,'')||'';
}

function rBranchCheckingAction(x,i){
    var errMsg = 'TamperMonkeyJS:: PR Branch '+x+' are NOT matched! (@Row#'+(i+1)+')';
    showErrorBox(errMsg);
    console.log(errMsg);
    return errMsg;
}

function runBranchChecking(branchPR){
    var lineTB = document.getElementById('ctl00_phG_tab_t0_grid_dataT0');
    var lineHdr = lineTB.getElementsByTagName('THEAD')[0].getElementsByTagName('TR')[0];
    var lineBD = lineTB.getElementsByTagName('TBODY')[0];
    var branchIdx = -1, whIdx = -1, vPartIdx = -1;
    if(branchPR){
        var hdrTDs = lineHdr.getElementsByTagName('TD'), hdrTT;
        for(var i=0;i<hdrTDs.length;i++){
            hdrTT = hdrTDs[i].innerHTML.replace(/<[^>]*>?/gm,'').replace(/(^\s+|\s+$)/g,'');
            if(hdrTT == 'Branch') branchIdx = i;
            if(hdrTT == 'Warehouse') whIdx = i;
            if(hdrTT == 'Vendor P/N') vPartIdx = i;
            if(branchIdx!=-1&&whIdx!=-1&&vPartIdx!=-1) break;
        }
    }
    if(branchIdx>=0||whIdx>=0||vPartIdx>=0){
        var bodyTRs = lineBD.getElementsByTagName('TR'), lineTDs, odrBranch, whBranch, vendorPN, errMsg;
        for(i=0;i<bodyTRs.length;i++){
            if(bodyTRs[i].id && bodyTRs[i].id!='ctl00_phG_tab_t0_grid_newRow'){
                lineTDs = bodyTRs[i].getElementsByTagName('TD'); errMsg = null;
                if(branchIdx>=0) odrBranch = rInText(lineTDs[branchIdx]).replace('FL','F');
                if(whIdx>=0) whBranch = 'F'+(rInText(lineTDs[whIdx]).substring(0, 1)||'');
                if(vPartIdx>=0) vendorPN = rInText(lineTDs[vPartIdx])||'';
                if(branchIdx>=0&&whIdx>=0){
                    var wrongIdx = [0,0];
                    if(odrBranch && (odrBranch!=branchPR)) wrongIdx[0]++;
                    if(whBranch && (whBranch!=branchPR)) wrongIdx[1]++;
                    if(wrongIdx[0]>0||wrongIdx[1]>0){
                        errMsg = rBranchCheckingAction('vs Order & Warehouse Branches',i);
                        break;
                    }
                } else {
                    if(branchIdx>=0){
                        if(odrBranch && (odrBranch!=branchPR)){
                            errMsg = rBranchCheckingAction('& Order Branch',i);
                            break;
                        }
                    }
                    if(whIdx>=0){
                        if(whBranch && (whBranch!=branchPR)){
                            errMsg = rBranchCheckingAction('& WH Branch',i);
                            break;
                        }
                    }
                }
                if(vPartIdx>=0){
                    if(lineTDs[vPartIdx].style.color.toLowerCase() != 'red'){
                        if(vendorPN == 'IPO Transfer' || (vendorPN.indexOf('IPO')!=-1 && vendorPN.indexOf('Transfer')!=-1)){
                            lineTDs[vPartIdx].style.color = 'red';
                            lineTDs[vPartIdx].style.background = 'mistyrose';
                        }
                    }
                }
            }
        }
        if(!errMsg) console.log('TamperMonkeyJS:: No dismatched branches found!');
        return errMsg;
        //console.log(([branchPR,odrBranch,whBranch]).toString());
    }
}

function checkingItemForTransferIPO(lineBD,hdrTDs){
    var hdrTT, vPartIdx = -1;
    for(var i=0;i<hdrTDs.length;i++){
        hdrTT = hdrTDs[i].innerHTML.replace(/<[^>]*>?/gm,'').replace(/(^\s+|\s+$)/g,'');
        if(hdrTT == 'Vendor P/N') vPartIdx = i;
        if(vPartIdx!=-1) break;
    }
    if(vPartIdx>=0){
        var bodyTRs = lineBD.getElementsByTagName('TR'), vendorPN, tdText;
        for(i=0;i<bodyTRs.length;i++){
            if(bodyTRs[i].id && bodyTRs[i].id!='ctl00_phG_tab_t0_grid_newRow'){
                vendorPN = bodyTRs[i].getElementsByTagName('TD')[vPartIdx];
                if(vendorPN) tdText = (vendorPN.innerHTML||'').replace(/<[^>]*>?/gm,'').replace(/&nbsp;/g,' ').replace(/(^\\s+|\\s+$)/g,"").toUpperCase();
                if(tdText == 'IPO Transfer' || (tdText.indexOf('IPO')!=-1 && tdText.indexOf('Transfer')!=-1)){
                    vendorPN.style.color = 'red';
                } else {
                    tdText = '';
                }
            }
        }
    }
}

function branchCheckingForPR(){
    var d = document, nbrPR, lineTB, lineHdr, lineBD;
    var loopCheck = setInterval(function(){
        nbrPR = d.getElementById('ctl00_phF_form_t0_edReceiptNbr_text');
        lineTB = d.getElementById('ctl00_phG_tab_t0_grid_dataT0');
        if(nbrPR&&lineTB){
            lineHdr = lineTB.getElementsByTagName('THEAD')[0].getElementsByTagName('TR')[0];
            lineBD = lineTB.getElementsByTagName('TBODY')[0];
            if(lineHdr&&lineBD){
                clearInterval(loopCheck); loopCheck = null;
                console.log('TamperMonkeyJS:: [Branch Checking Function] elements are ready!');
                function intervalCheck(tm){
                    setTimeout(function(){
                        var nbrPR = d.getElementById('ctl00_phF_form_t0_edReceiptNbr_text');
                        var branchPR = (nbrPR.value||'').substring(0, 2);
                        var errMsg = runBranchChecking(branchPR);
                        var nTM = errMsg?3600:600;
                        intervalCheck(nTM);
                    },tm);
                }
                intervalCheck(0);
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
            if(sID=='PO302000') branchCheckingForPR();
        }
    },600);
})();
