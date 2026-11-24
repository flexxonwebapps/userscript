// ==UserScript==
// @name         Tradelink - Declaration Page CSS
// @namespace    http://tampermonkey.net/
// @version      26.1124.1
// @description  HK Declaration System (Tradelink) - Page CSS - Highlight & added hotkey for calculator.
// @author       You
// @match        https://cloud.tradelinksig.com/scm-tdec-app/*.do*
// @updateURL    https://raw.githubusercontent.com/flexxonwebapps/userscript/main/tradelink-declarationpagehighlightedinput.js
// @downloadURL  https://raw.githubusercontent.com/flexxonwebapps/userscript/main/tradelink-declarationpagehighlightedinput.js
// @icon         https://www.tradelink-ebiz.com//img/logo/favicon.png
// @grant        none
// ==/UserScript==

function addStyleToDoc(cssTextNode,sID){
    if(window.top === window.self){
        var d = document, sTag;
        if(sID) sTag = d.getElementById(sID);
        if(!sTag){
            var fCSS = d.createTextNode(cssTextNode);
            sTag = d.createElement('STYLE');
            sTag.id = sID||''; sTag.appendChild(fCSS);
            var h = d.getElementsByTagName('head')[0];
            h.appendChild(sTag);
        }
    }
}
(function(){
    'use strict';
    var s = '';
    /*============================================================*/
    /*============================================================*/
    /*>>>强制修改网页字体<<<*/
    /*该代码运行于CHROME_v72 & FIREFOX_v65 的STYLUS_v1.5.2扩展之上*/
    /*很多网页用浏览器的设置字体功能无法生效,而这个CSS可以解决这些问题.*/
    s +=' :not([class*="icon"]):not([class*="button"]):not([class*=mjx]):not([class*=fa]):not(i){ ';
    /*使修改字体不会应用于部分特殊字符符号和图标以及按钮等网页元素,完美解决字符集不全导致图标,按钮变方块的问题.*/
    /*font-weight: 500!important; /*字体粗细,整百数字*/
    s +='     font-family: "微软雅黑" !important; ';
    /*字体设置,可分别设置中英文,前面英文字体,后面中文字体安装对应字体后可选：HYQIHEI 55S、阿里巴巴普惠体 2.0 55 Regular、苹方黑体、微软雅黑、pingfang sc regular、PingFang SC Heavy、hiragino sans gb、opposans、.萍方-简、小米兰亭 pro vf、XHei Intel、ping hei、思源黑体 CN*/
    /*color: #8b8b8b00 !important;    /*更改字体颜色及透明度(注意:这是全局修改),如无需要,可直接注释掉整行代码.*/
    s +='     text-shadow: 0.01em 0.01em 0.01em #000 !important; ';
    /*更改字体阴影及透明度,可修改数值实现不同的效果.*/
    /*十六进制颜色代码前的方块可点击,用可视化UI更改颜色与透明度.*/
    s +=' } ';
    s +=' body { ';
    s +='     -webkit-text-stroke-width: 0.24px; ';
    s +='     text-shadow: 0 0 rgba(128, 128, 128, 0.2); ';
    s +=' } ';

    addStyleToDoc(s,'commonbodystyle'); s = '';

    s += ' body span#toolbar-name-id { ';
    s += '   font-size:18px; ';
    s += ' } ';
    s += ' body input.field-error { ';
    s += '   background: red !important; ';
    s += ' } ';

    s += ' body .main-text { ';
    s += '   color:#000; ';
    s += '   font-weight:bold; ';
    s += '   padding-top:4px; ';
    s += '   padding-bottom:4px; ';
    s += ' } ';

    s += ' input.main-text[id="tradeDeclaration.consigneeInfo.consigneeName0"] { ';
    s += '   background: LightGreen; ';
    s += ' } ';
    s += ' input.main-text[id="tradeDeclaration.consigneeInfo.consigneeAddress.line0"], input.main-text[id="tradeDeclaration.consigneeInfo.consigneeAddress.line1"] { ';
    s += '   background: LightGreen; ';
    s += ' } ';
    s += ' input.main-text[id="tradeDeclaration.consigneeInfo.consigneeAddress.cityName"] { ';
    s += '   background: LightGreen; ';
    s += ' } ';

    s += ' input.main-text[id="tradeDeclaration.shipmentInfo.departureArrivalDate"] { ';
    s += '   background: LightGreen; ';
    s += ' } ';
    s += ' select.main-select#transportMode { ';
    s += '   background: LightGreen; ';
    s += ' } ';
    s += ' select.main-select#messageNameSel { ';
    s += '   background: LightGreen; ';
    s += ' } ';

    s += ' input.main-text[id="tradeDeclaration.shipmentInfo.transportId"] { ';
    s += '   background: LightGreen; ';
    s += ' } ';
    s += ' input.main-text[id="tradeDeclaration.shipmentInfo.transportRefNo"] { ';
    s += '   background: LightGreen; ';
    s += ' } ';
    s += ' input.main-text[id="tradeDeclaration.portAndLocationInfo.destinationPlace"] { ';
    s += '   background: LightGreen; ';
    s += ' } ';

    s += ' input.main-text[id="tradeDeclaration.portAndLocationInfo.exportingDestinationCountry.value"] { ';
    s += '   background: LightGreen; ';
    s += ' } ';
    s += ' input.main-text[id="tradeDeclaration.portAndLocationInfo.portOfLoadingDischargeName"] { ';
    s += '   background: LightGreen; ';
    s += ' } ';
    s += ' input.main-text[id="customerReferences0.value"] { ';
    s += '   background: LightGreen; ';
    s += ' } ';
    s += ' input.main-text[id="customerReferences1.value"] { ';
    s += '   background: Khaki; ';
    s += ' } ';

    s += ' select#_samePackage { ';
    s += '   background: #0ff; ';
    s += ' } ';
    s += ' select#_consolidationIndicator { ';
    s += '   background: yellow; ';
    s += ' } ';
    s += ' body input.main-text#_productCode { ';
    s += '   background: Lavender; ';
    s += ' } ';
    s += ' body input.main-text#_originCountry { ';
    s += '   background: LightGreen; ';
    s += ' } ';
    s += ' body input.main-text#_descriptionOfCommodity { ';
    s += '   background: LightGreen; ';
    s += ' } ';

    s += ' body input.main-text#_customsCargoRefNo { ';
    s += '   background: Yellow; ';
    s += ' } ';
    s += ' body input.main-text#_masterAirWaybillNo { ';
    s += '   background: LightGreen; ';
    s += ' } ';
    s += ' body input.main-text#_houseAirWaybillNo { ';
    s += '   background: Yellow; ';
    s += ' } ';
    s += ' body input.main-text#_hsCode { ';
    s += '   background: LightGreen; ';
    s += ' } ';
    s += ' body input.main-text#_quantity { ';
    s += '   background: LightGreen;; ';
    s += '   text-align:center !important; ';
    s += ' } ';
    s += ' body input.main-text-for-calculator { ';
    s += '   color:#000; ';
    s += '   font-weight:bold; ';
    s += '   background: LightGreen; ';
    s += '   padding-top:4px; ';
    s += '   padding-bottom:4px;; ';
    s += '   text-align:center !important; ';
    s += ' } ';
    s += ' body input.main-text#_noOfPackages { ';
    s += '   background: LightGreen; ';
    s += '   text-align:center !important; ';
    s += ' } ';
    s += ' body input.main-text#_typeOfPackage { ';
    s += '   background: Khaki; ';
    s += ' } ';

    s += ' body input.main-text#totalNoOfPackages { ';
    s += '   color:#000; ';
    s += '   font-weight:bold; ';
    s += '   background: LightGreen; ';
    s += '   padding-top:4px; ';
    s += '   padding-bottom:4px;; ';
    s += '   text-align:center !important; ';
    s += ' } ';

    addStyleToDoc(s);
    setInterval(function(){
        var d = document;
        var dID = d.getElementById('_id_udr');
        var xWC = d.getElementById('welcome');
        if(dID&&!xWC){
            var uPrice = d.getElementById('_itemCifFobValue');
            if(uPrice){
                var p = uPrice.parentNode, eCalculator = p.getElementsByTagName('IMG')[0];
                if(p.className!='keyupcalculordone' && eCalculator){
                    p.className = 'keyupcalculordone';
                    uPrice.addEventListener('keyup',function(evt){
                        var e = evt||window.event;
                        setTimeout(function(){
                            if(e.keyCode == 187) eCalculator.click();
                        },60);
                    });
                    console.log('UserJS:: Added Key-UP Calculator Event!');
                }
            }
        }
    },600);
})();
