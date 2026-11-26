// ==UserScript==
// @name         Tradelink - Master Page CSS
// @namespace    https://github.com/flexxonwebapps
// @version      26.1124.1
// @description  HK Declaration System (Tradelink) - Master Page CSS for highlighted issues and reminder.
// @author       You
// @match        https://cloud.tradelinksig.com/scm-tdec-app/*.do*
// @updateURL    https://raw.githubusercontent.com/flexxonwebapps/userscript/main/tradelink-masterpagehighlightedcss.user.js
// @downloadURL  https://raw.githubusercontent.com/flexxonwebapps/userscript/main/tradelink-masterpagehighlightedcss.user.js
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

    s += ' table#grid tr.ui-state-hover td { ';
    //s += '   height: 36px; ';
    s += '   background-color: lightyellow; ';
    s += ' } ';
    s += ' table#grid td[aria-describedby="grid_messageReference"] { ';
    s += '   color:green; ';
    s += ' } ';
    s += ' table#grid tr.ui-state-hover td[aria-describedby="grid_messageReference"] { ';
    //s += '   position:absolute; ';
    //s += '   font-size:32px; ';
    s += '   font-size:120%; ';
    s += '   font-weight:bolder; ';
    s += '   color:green; ';
    //s += '   height:auto; ';
    //s += '   max-height:32px; ';
    s += '   background:yellow; ';
    //s += '   padding:4px 10px; ';
    //s += '   line-height:1; ';
    s += ' } ';
    s += ' table.ui-jqgrid-btable td:not([title="Government received"])[aria-describedby="grid_status"] { ';
    s += '   color:red; ';
    s += ' } ';
    s += ' table.ui-jqgrid-btable td[aria-describedby="grid_departureArrivalDate"] { ';
    s += '   color:SlateBlue; font-weight:bold; ';
    s += ' } ';
    s += ' div.ui-jqgrid table.ui-jqgrid-btable tr.ui-row-ltr td[aria-describedby="grid_tdChargeOutput.govtCharge"], div.ui-jqgrid table.ui-jqgrid-btable tr.ui-row-ltr td[aria-describedby="grid_tdChargeOutput.penaltyCharge"], div.ui-jqgrid table.ui-jqgrid-btable tr.ui-row-ltr td[aria-describedby="grid_tdChargeOutput.totalCharge"] { ';
    s += '   text-align:right; ';
    s += ' } ';

    s += ' ul.topnav ul.subnav a[tabindex="2210"], ul.topnav ul.subnav a[tabindex="2240"] { ';
    s += '   color:MediumBlue; background-color:#0FF; ';
    s += ' } ';

    s += ' table#documentSummary tr:first-child { ';
    s += '   background-color: yellow; ';
    s += ' } ';
    s += ' table#documentSummary tr:nth-child(2) { ';
    s += '   background-color: yellow; ';
    s += ' } ';
    s += ' table#documentSummary tr:first-child font { ';
    s += '   color:darkred !important; ';
    s += ' } ';
    s += ' table#documentSummary tr:nth-child(2) font { ';
    s += '   color: red !important; ';
    s += ' } ';
    s += ' table#documentSummary td:nth-child(3) { ';
    s += '   background-color: white; ';
    s += ' } ';

    s += ' div.ui-jqgrid table.ui-jqgrid-htable th div.ui-jqgrid-sortable { ';
    s += '   height: auto; ';
    s += '   white-space: normal; ';
    s += ' } ';


    addStyleToDoc(s);

    function getNumberChangeRowColor(e,c2,tMS){
        if(e){
            var n = (e.innerText||'').toString().replace(/\s/g,'');
            if(n==''){
                setTimeout(function(){
                    getNumberChangeRowColor(e,c2,tMS);
                },600);
                return;
            } else {
                n = parseInt(n)||0;
            }
            n = (n > 0)?true:false;
            if(n===true){
                n = e.parentNode;
                while(n.tagName != 'TR') n = n.parentNode;
                setInterval(function(){
                    var c = n.style.backgroundColor;
                    n.style.background = c=='yellow'?c2:'yellow';
                },tMS);
            }
        }
    }
    function reviseHTML(eID,oText,nText){
        var e = document.getElementById(eID);
        if(e) e.innerHTML = e.innerHTML.replace(oText,nText);
    }
    window.addEventListener('load',function(){
        var d = document;
        var xWC = d.getElementById('welcome');
        var dID = d.getElementById('_id_udr');
        if(xWC&&!dID){
            getNumberChangeRowColor(d.getElementById('totalOutstandingTdec'),'Lime',360);
            getNumberChangeRowColor(d.getElementById('jqgh_grid_lastUpdDate'),'Magenta',240);
        }
        var dTable = d.getElementById('grid');
        if(dTable){
            reviseHTML('jqgh_grid_translogMessageReference','Transaction History','#');
            reviseHTML('jqgh_grid_lastUpdDate',' Date &amp; Time','');
            reviseHTML('jqgh_grid_tdChargeOutput.govtCharge','Government','Gov.');
            reviseHTML('jqgh_grid_tdChargeOutput.penaltyCharge',' Charge','');
            reviseHTML('jqgh_grid_tdChargeOutput.totalCharge','Totals','Total');
            reviseHTML('jqgh_grid_transportMode','Transport ','');
            reviseHTML('jqgh_grid_masternumber','Reference No.','Ref.#');


            var eUDR = d.createElement('DIV');
            eUDR.style.cssText = 'display:none;position:fixed;top:0;left:0;font-family:arial;font-weight:bolder;font-size:30px;color:yellow;padding:6px 60px;margin:6px;';
            eUDR.innerHTML = '<div style="position:absolute;height:100%;width:100%;top:0;bottom:0;left:0;right:0;background:DarkGreen;opacity:0.9;margin:0;"></div><div id="udrtext" style="position:relative;z-index:1;"></div>';
            d.body.appendChild(eUDR);
            var moTimer = null;
            function moEvent(x){
                var e = document.getElementById('udrtext');
                if(e&&x){
                    if(moTimer!==null) clearTimeout(moTimer);
                    moTimer = setTimeout(function(){
                        e.parentNode.style.display='block';
                        e.innerHTML = '<span style="color:LightGreen;">UDR#</span>  '+x;
                    },60);
                }
            }
            function moTerminate(){
                if(moTimer!==null) clearTimeout(moTimer);
                var e = document.getElementById('udrtext');
                if(e){
                    e.parentNode.style.display='none';
                    e.innerHTML = '';
                }
            }
            setInterval(function(){
                var dTRs = dTable.getElementsByTagName('TR');
                for(var i=0;i<dTRs.length;i++){
                    if(dTRs[i].className!='jqgfirstrow'){
                        if(dTRs[i].id=='eventmark'+i){
                            break;
                        } else {
                            dTRs[i].id='eventmark'+i;
                            dTRs[i].onmouseout = moTerminate;
                            dTRs[i].onmouseover = function(){
                                var inTDs = this.getElementsByTagName('TD');
                                for(var ii=0;ii<inTDs.length;ii++){
                                    if(inTDs[ii].getAttribute('aria-describedby')=='grid_messageReference'){
                                        moEvent(inTDs[ii].innerText);
                                        break;
                                    }
                                }
                            }
                        }
                    }
                }
            },600);
        }
    });
})();
