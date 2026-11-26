// ==UserScript==
// @name         Acumatica Live: [Critical Material] - Added Line QTY Inventory Info
// @namespace    https://github.com/flexxonwebapps
// @version      26.1124.1
// @description  Adding Inventory Summary Info (color-customizable) into the row data at Critical Material Page!
// @author       Martin M
// @match        https://flexxonlive.go.akamai-access.com/FlexxonLive/*
// @updateURL    https://raw.githubusercontent.com/flexxonwebapps/userscript/main/system-criticalmaterial.user.js
// @downloadURL  https://raw.githubusercontent.com/flexxonwebapps/userscript/main/system-criticalmaterial.user.js
// @icon         https://www.flexxon.com/wp-content/uploads/2021/04/cropped-Favicon-1-1.ico
// @grant        none
// ==/UserScript==

//============================================================
//============================================================
var $colorSetting = {
//------------------------------------------------------------
    // https://www.w3schools.com/tags/ref_colornames.asp

    inventoryInfoCloseButton: 'Tan',
    inventoryInfoOpenButton: 'Gainsboro',
    inventoryInfoHoverCloseButton: 'RosyBrown',
    inventoryInfoHoverOpenButton: 'Silver',


//------------------------------------------------------------
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
function toWindowUrl(oUrl){
    var uPath = '';
    if(oUrl){
        var d = document;
        var t = d.getElementById('ctl00_phF_form_edOrderType_text');
        var n = d.getElementById('ctl00_phF_form_edProdOrdID_text');
        var xT = t?(t.value||'').split('-')[0].replace(/\s/g,''):'', tCC = 0;
        var xN = n?(n.value||'').split('-')[0].replace(/\s/g,''):'', nCC = 0;
        var uLink = oUrl.split('?'); uPath = uLink[0] + '?';
        var ePmtrs = uLink[1].split('&');
        for(var i=0; i<ePmtrs.length; i++){
            if(i>0) uPath += '&';
            if(ePmtrs[i].split('=')[0].toUpperCase()=='ORDERTYPE'){
                uPath += 'OrderType='+xT; tCC ++;
            } else if(ePmtrs[i].split('=')[0].toUpperCase()=='PRODORDID'){
                uPath += 'ProdOrdID='+xN; nCC ++;
            } else {
                uPath += ePmtrs[i];
            }
        }
        if(tCC===0) uPath += '&OrderType='+xT;
        if(nCC===0) uPath += '&ProdOrdID='+xN;
    }
    return uPath;
}
function resetFrameHeight(f){
    var topTD = f.parentNode, fwDoc = f.contentWindow.document;
    var e = fwDoc.getElementById('frametogglebutton');
    var fwHeaderH = fwDoc.getElementById('ctl00_phG_grid_headerDiv').offsetHeight;
    var fwBodyH = fwDoc.getElementById('ctl00_phG_grid_scrollDiv').offsetHeight;
    if(f.className=='loadingdone'){
        var fHeight = parseFloat(f.style.height), dHeight = fwHeaderH+fwBodyH+20;
        topTD.style.height = Math.max(fHeight,dHeight) + 'px';
        if(dHeight > fHeight){
            f.style.height = dHeight + 'px';
        }
    } else {
        topTD.style.height = '1px';
    }
    e.innerHTML = '▲ ▲ ▲';
    e.className = '';
    e.style.background = $colorSetting.inventoryInfoCloseButton;
}
function toggeleFrame(d,f,e){
    if(d&&f&&e){
        var dTable = d.getElementById('ctl00_phG_grid_dataT0');
        var fOuter = d.getElementById('ctl00_phG_grid_scrollDiv');
        var onTable = fOuter.getElementsByTagName('TABLE')[1];
        var tr1 = onTable.getElementsByTagName('TR')[1];
        var trH = tr1.offsetHeight, focusTop = parseFloat(onTable.style.top);
        onTable.style.visibility = 'hidden';
        var dBody = dTable.getElementsByTagName('TBODY')[0];
        var dTRs = dBody.getElementsByTagName('TR'), trID = [], onRowId;
        for(var i=0;i<dTRs.length;i++){
            trID[i] = dTRs[i].id||'';
            if(trID[i].indexOf('ctl00_phG_grid_row_')!=-1 && dTRs[i].className!='addedstockinforow'){
                if( Math.abs(dTRs[i].offsetTop - focusTop) < (trH/2) ){
                    onRowId = trID[i];
                }
            }
        }
        var tClass = (e.className||'').split('=');
        var oTD = f.parentNode, nowH = parseFloat(oTD.style.height), oH;
        if(tClass[0]=='framehidden'){
            resetFrameHeight(f);
        } else {
            oH = e.offsetHeight;
            oTD.style.height = oH+'px';
            e.innerHTML = '▼ ▼ ▼';
            e.className = 'framehidden='+nowH;
            e.style.background = $colorSetting.inventoryInfoOpenButton;
            f.style.height = e.offsetHeight + 'px';
        }
        setTimeout(function(){
            onTable.style.top = d.getElementById(onRowId).offsetTop + 'px';
            onTable.style.visibility = '';
        },120);
    }
}
function addQtyInfoToCriticalMaterialPage(){
    console.log('UserJS: Running addQtyInfoToCriticalMaterialPage()!');

    var wLocation = location||window.location;
    var uDomain = wLocation.protocol + '//' + wLocation.hostname;
    var inSummaryPath = '/FlexxonLive/pages/in/in401000.aspx';

    var d = document, wUrl = window.top.location.href;
    var dTable = d.getElementById('ctl00_phG_grid_dataT0');
    var dtHead = dTable.getElementsByTagName('THEAD')[0], idColumn = -1;
    if(dtHead){
        var hTDs = dtHead.getElementsByTagName('TD');
        for(var i=0; i<hTDs.length;i++){
            if(hTDs[i].innerHTML=='Inventory ID'){
                idColumn = i; break;
            }
        }
    }
    if(idColumn>-1){
        var dtBody = dTable.getElementsByTagName('TBODY')[0];
        if(dtBody){
            var gapStyle = 'position:relative;height:1px;border:0;overflow:hidden;';
            var gapFrameStyle = 'display:block;position:absolute;top:0;left:0;width:100%;height:'+screen.height+'px;background:AliceBlue;border:0;margin:0;';
            var fOuter = d.getElementById('ctl00_phG_grid_scrollDiv');
            var onTable = fOuter.getElementsByTagName('TABLE')[1];
            onTable.style.visibility = 'hidden';
            var checkTRs = dtBody.getElementsByTagName('TR'), bTRs = [], bTDs = [], nTR = [], aFrame = [], toggleBtns = [];
            for(var i=0; i<checkTRs.length;i++){
                if(checkTRs[i].id!='ctl00_phG_grid_newRow') bTRs.push(checkTRs[i]);
            };
            var loadInfo = d.getElementById('inventoryloadinginfo');
            loadInfo.style.cssText = 'display:inline-block;border:1px solid #888; padding:4px 6px;';
            loadInfo.innerHTML = 'Inventory Info Loaded: <span>0</span> / ' + bTRs.length + '';
            for(var i=0; i<bTRs.length;i++){
                bTDs[i] = bTRs[i].getElementsByTagName('TD');
                if(bTRs[i].id!='ctl00_phG_grid_newRow' && bTDs[i][idColumn]){
                    nTR[i] = d.createElement('TR');
                    nTR[i].className = 'addedstockinforow';
                    nTR[i].innerHTML = '<td id="addiframetr'+i+'" colspan="'+bTDs[i].length+'" style="'+gapStyle+'"></td>';
                    aFrame[i] = d.createElement('IFRAME');
                    aFrame[i].border = '0';
                    aFrame[i].style.cssText = gapFrameStyle;
                    aFrame[i].sandbox = 'allow-scripts allow-forms allow-same-origin';
                    if(bTRs[i+1]){
                        dtBody.insertBefore(nTR[i],bTRs[i+1]);
                    } else {
                        dtBody.appendChild(nTR[i]);
                    };
                    nTR[i].firstChild.appendChild(aFrame[i]);
                    aFrame[i].onload = function(){
                        var d = document, f = this, fTD = this.parentNode, fwDoc = f.contentWindow.document;
                        var toggleBtns = d.createElement('DIV');
                        toggleBtns.id='frametogglebutton';
                        toggleBtns.style.cssText = 'position:fixed;bottom:0;left:0;width:100%;color:white;text-align:center;padding:6px 0px;margin:0;overflow:hidden;cursor:pointer;z-index:999;';
                        if(fTD.className=='hiddenbyclick'){
                            toggleBtns.innerHTML = '▼ ▼ ▼';
                            toggleBtns.className = 'framehidden='+f.offsetHeight;
                            toggleBtns.style.background = $colorSetting.inventoryInfoOpenButton;
                        } else {
                            toggleBtns.innerHTML = '▲ ▲ ▲';
                            toggleBtns.style.background = $colorSetting.inventoryInfoCloseButton;
                        }
                        toggleBtns.onclick = function(){
                            toggeleFrame(d,f,this); return false;
                        }
                        toggleBtns.onmouseover = function(){
                            var tClass = (this.className||'').split('=');
                            this.style.background = tClass[0]=='framehidden'?$colorSetting.inventoryInfoHoverOpenButton:$colorSetting.inventoryInfoHoverCloseButton;
                        }
                        toggleBtns.onmouseout = function(){
                            var tClass = (this.className||'').split('=');
                            this.style.background = tClass[0]=='framehidden'?$colorSetting.inventoryInfoOpenButton:$colorSetting.inventoryInfoCloseButton;
                        }
                        fwDoc.body.appendChild(toggleBtns);
                        var dCaption = fwDoc.getElementById('page-caption');
                        if(dCaption) dCaption.style.display = 'none';
                        var dSortArea = fwDoc.getElementById('ctl00_phF_form');
                        if(dSortArea) dSortArea.parentNode.style.display = 'none';
                        var dOuterH = 0, thisFrame = this;
                        var waitDataTimer = setInterval(function(){
                            var dTableOuter = fwDoc.getElementById('ctl00_phG_grid_scrollDiv');
                            if(dTableOuter){
                                dTableOuter.parentNode.style.height = 'auto';
                                dTableOuter.style.height = 'auto';
                                var inDivs =  dTableOuter.getElementsByTagName('DIV'), cNames = [], cc = 0;
                                for(var ii=0; ii<inDivs.length;ii++){
                                    cNames[ii] = inDivs[ii].className||'';
                                    if(cNames[ii].indexOf('empty-')!=-1) cc++;
                                }
                                var dRow1 = fwDoc.getElementById('ctl00_phG_grid_row_0');
                                dOuterH = dTableOuter.offsetHeight;
                                if((dRow1 && dOuterH>0) || cc>0){
                                    dOuterH = dTableOuter.offsetHeight;
                                    var dTableHead = fwDoc.getElementById('ctl00_phG_grid_headerDiv');
                                    var dHeaderH = dTableHead.offsetHeight||0;
                                    var fTD = thisFrame.parentNode;
                                    if(fTD.className!='hiddenbyclick'){
                                        fTD.style.height = ((dOuterH+dOuterH)+20) + 'px';
                                        thisFrame.style.height = ((dOuterH+dOuterH)+20) + 'px';
                                    }
                                    thisFrame.className = 'loadingdone';
                                    var fOuter = d.getElementById('ctl00_phG_grid_scrollDiv');
                                    var onTable = fOuter.getElementsByTagName('TABLE')[1];
                                    var tr1 = onTable.getElementsByTagName('TR')[1];
                                    var trH = tr1.offsetHeight, focusTop = parseFloat(onTable.style.top);
                                    onTable.style.top = (focusTop===0?0:bTRs[Math.ceil(trH/focusTop)].offsetTop) + 'px';
                                    onTable.style.visibility = '';
                                    window.top.history.replaceState('', '', toWindowUrl(wUrl));
                                    clearInterval(waitDataTimer); waitDataTimer=null;
                                    var loadInfo = d.getElementById('inventoryloadinginfo');
                                    var infoIdx = loadInfo.getElementsByTagName('SPAN')[0];
                                    infoIdx.innerText = parseInt(infoIdx.innerText) + 1;
                                }
                            }
                        },600);
                    };
                    aFrame[i].src = uDomain+inSummaryPath+'?InventoryID='+bTDs[i][idColumn].innerHTML.replace(/<[^>]*>?/gm,'').replace(/(^\s+|\s+$)/g,'').replace(/ /g,'+');
                    console.log('UserJS-Try: '+ bTDs[i][idColumn].innerHTML.replace(/<[^>]*>?/gm,''));
                }
            }
        }
    }
    console.log('UserJS: Loaded Function for Screen of [Critical Material]!');
}
function addControlBtns(nDiv){
    var d = document;
    var btnCSS = 'display:inline-block;color:#fff;font-weight:bold;padding:4px 6px;margin-left:10px;opacity:1;cursor:pointer;border:2px outset #999;';
    var btnHover = function(){ this.style.opacity=0.8 };
    var btnOut = function(){ this.style.opacity=1; if(this.className!='active') this.style.borderStyle='outset' };
    var btnDown = function(){ this.style.borderStyle='inset' };
    var btnUp = function(){ this.style.borderStyle='outset' };
    var nBtn1 = d.createElement('A');
    nBtn1.innerText = '📦 Show!';
    nBtn1.style.cssText = btnCSS+'background:green;';
    nBtn1.onmouseover = btnHover;
    nBtn1.onmouseout = btnOut;
    nBtn1.onmousedown = btnDown;
    nBtn1.onmouseup = btnUp;
    nDiv.appendChild(nBtn1);
    var nBtn3 = d.createElement('A');
    nBtn3.innerText = '📦 Collapse!';
    nBtn3.style.cssText = btnCSS+'background:DarkSlateBlue;';
    nBtn3.onmouseover = btnHover;
    nBtn3.onmouseout = btnOut;
    nBtn3.onmousedown = btnDown;
    nBtn3.onmouseup = btnUp;
    nDiv.appendChild(nBtn3);
    var nBtn2 = d.createElement('A');
    nBtn2.innerText = '📦 Hide ALL';
    nBtn2.style.cssText = btnCSS+'background:darkred;';
    nBtn2.onmouseover = btnHover;
    nBtn2.onmouseout = btnOut;
    nBtn2.onmousedown = btnDown;
    nBtn2.onmouseup = btnUp;
    nDiv.appendChild(nBtn2);
    function btnClickEvent(thisBtn,otherBtn1,otherBtn2){
        thisBtn.className='active';
        otherBtn1.className='';
        otherBtn2.className='';
        setTimeout(function(){
            thisBtn.style.border = '2px inset #999';
            otherBtn1.style.border = '2px outset #999';
            otherBtn2.style.border = '2px outset #999';
        },12);
    }
    function set1FrameHeight(openStatus){
        var d = document;
        var dTable = d.getElementById('ctl00_phG_grid_dataT0');
        var fOuter = d.getElementById('ctl00_phG_grid_scrollDiv');
        var onTable = fOuter.getElementsByTagName('TABLE')[1];
        if(dTable && onTable){
            var tr1 = onTable.getElementsByTagName('TR')[1];
            var trH = tr1.offsetHeight, focusTop = parseFloat(onTable.style.top);
            onTable.style.visibility = 'hidden';
            var dBody = dTable.getElementsByTagName('TBODY')[0];
            var dTRs = dBody.getElementsByTagName('TR'), trID = [], onRowId;
            for(var i=0;i<dTRs.length;i++){
                trID[i] = dTRs[i].id||'';
                if(trID[i].indexOf('ctl00_phG_grid_row_')!=-1 && dTRs[i].className!='addedstockinforow'){
                    if( Math.abs(dTRs[i].offsetTop - focusTop) < (trH/2) ){
                        onRowId = trID[i];
                    }
                }
            }
            var trTD = [], tdFrame = [], cBtn = [];
            for(var i=0;i<dTRs.length;i++){
                if(trID[i].indexOf('ctl00_phG_grid_row_')==-1 && dTRs[i].className=='addedstockinforow'){
                    trTD[i] = dTRs[i].getElementsByTagName('TD')[0];
                    tdFrame[i] = dTRs[i].getElementsByTagName('IFRAME')[0];
                    cBtn[i] = tdFrame[i].contentWindow.document.getElementById('frametogglebutton');
                    if(openStatus===true){
                        resetFrameHeight(tdFrame[i]);
                        trTD[i].className = '';
                    }
                    if(openStatus===false||openStatus===null){
                        if(cBtn[i]){
                            cBtn[i].innerHTML = '▼ ▼ ▼';
                            cBtn[i].className = 'framehidden='+tdFrame[i].offsetHeight;
                            cBtn[i].style.background = $colorSetting.inventoryInfoOpenButton;
                        }
                        if(openStatus===false){
                            tdFrame[i].style.height = (cBtn[i]?cBtn[i].offsetHeight:28) + 'px';
                            trTD[i].style.height = (cBtn[i]?cBtn[i].offsetHeight:28) + 'px';
                        }
                        if(openStatus===null){
                            tdFrame[i].style.height = '0px';
                            trTD[i].style.height = '0px';
                        }
                        trTD[i].className = 'hiddenbyclick';
                    }
                }
            }
            setTimeout(function(){
                onTable.style.top = d.getElementById(onRowId).offsetTop + 'px';
                onTable.style.visibility = '';
            },120);
        }
    }
    nBtn1.onclick = function(){
        btnClickEvent(this,nBtn2,nBtn3); set1FrameHeight(true); return false;
    }
    nBtn3.onclick = function(){
        btnClickEvent(this,nBtn1,nBtn2); set1FrameHeight(false); return false;
    }
    nBtn2.onclick = function(){
        btnClickEvent(this,nBtn1,nBtn3); set1FrameHeight(null); return false;
    }
}
function initializePage(){
        var d = document, wUrl = window.top.location.href;
        var navBar = d.getElementById('ctl00_phG_grid_at_tlb'), nDiv;
        if(navBar){
            navBar.style.position = 'relative';
            nDiv = d.createElement('DIV');
            nDiv.style.cssText = 'position:absolute;top:0;right:0;overflow:hidden;';
            nDiv.innerHTML='';
            navBar.appendChild(nDiv);
        }
        setInterval(function(){
            var nUrl = toWindowUrl(wUrl);
            if(d.URL!=nUrl){
                window.top.history.replaceState('', '', nUrl);
            }
            var rowData1 = d.getElementById('ctl00_phG_grid_row_0');
            var aTR0 = d.getElementById('addiframetr0');
            var aTR1 = d.getElementById('addiframetr1');
            if(rowData1){
                if(!aTR0 && !aTR1){
                    var isNoNav = nDiv.innerHTML=='';
                    if(isNoNav){
                        var nLoadInfo = d.createElement('SPAN');
                        nLoadInfo.id = 'inventoryloadinginfo';
                        nDiv.appendChild(nLoadInfo);
                    }
                    addQtyInfoToCriticalMaterialPage();
                    if(isNoNav){
                        setTimeout(function(){
                            addControlBtns(nDiv);
                        },120);
                    }
                }
            } else {
                nDiv.innerHTML='';
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
            if(sID=='AM401000') initializePage();
        }
    },600);
})();
