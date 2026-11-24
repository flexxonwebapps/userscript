// ==UserScript==
// @name         Acumatica Live: [Shipments/PickingLineData] - Customized Picking List & Print Function
// @namespace    http://tampermonkey.net/
// @version      26.1124.1
// @description  Adding Button for open Picking Data Page at Shipments & print customized picking list at picking data page. + Hide [Delete] shipment button + Capacitor Warning.
// @author       You
// @match        https://flexxonlive.go.akamai-access.com/FlexxonLive/*
// @updateURL    https://raw.githubusercontent.com/flexxonwebapps/userscript/main/system-customizedpickingslip.js
// @downloadURL  https://raw.githubusercontent.com/flexxonwebapps/userscript/main/system-customizedpickingslip.js
// @icon         https://www.flexxon.com/wp-content/uploads/2021/04/cropped-Favicon-1-1.ico
// @grant        none
// ==/UserScript==


function xhttpSendingRequest(opts){
    var xHttpRequest;
    var sendMethod = (opts.method||'').toUpperCase();
    if(sendMethod=='GET'||sendMethod=='POST'||sendMethod=='PUT'){
        if(window.XMLHttpRequest){
            xHttpRequest = new XMLHttpRequest();
        } else {
            xHttpRequest = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xHttpRequest.ontimeout = function(){alert("Timeout Error!!!")};
        xHttpRequest.onerror = function(err){
            setTimeout(function(){xhttpSendingRequest(opts)},360);
            if(err.target) console.warn( err.target.status );
            console.error(JSON.stringify(err));
        }
        xHttpRequest.onreadystatechange = function(){
            if(this.readyState == 4){
                if(this.status == 200){
                    opts.success(this.responseText,this.responseXML);
                }
                if(this.status != 200){
                    if(this.status!=0) opts.failure(this.status);
                }
                xHttpRequest = null;
            }
        }
        var xPmtr = opts.textparameter;
        xHttpRequest.open(sendMethod,opts.urlsending+((sendMethod=='GET'&&xPmtr)?('?'+xPmtr):''),true);
        if((sendMethod=='POST'||sendMethod=='PUT')&&opts.content_type){
            //Send the proper header information along with the request
            xHttpRequest.setRequestHeader('Content-type', opts.content_type);
        }
        xHttpRequest.send((((sendMethod=='POST'||sendMethod=='PUT')&&xPmtr)?(xPmtr):''));
    }
    return xHttpRequest;
}
function getparameter(pmtr){
    var $url = (location||window.location).href;
    var $P = pmtr||'', $s = $P+'=';
    var $pL = $P.length;
    var $pi = $url.indexOf($s)+$pL+1;
    if($P!=''&&$pi!=$pL&&$url.indexOf('?')!=-1){
        $P='';
        if($url.indexOf('#')!=-1){ $url=$url.split('#')[0]; }
        if($url.indexOf('?'+$s)!=-1){ $s='?'+$s; }
        if($url.indexOf('&'+$s)!=-1&&$url.indexOf('?'+$s)!=-1){ $s='&'+$s; }
        var $end = $url.split($s)[1].indexOf('&');
        $P=($end==-1)?$url.substring($pi):$url.substring($pi,$pi+$end);
        return $P||'';
    } else { return ''; }
}
function openLocation(k){
    var h = screen.height, w = screen.width;
    var x = w*0.9, y = h*0.8;
    var a = w*0.05, b = h*0.05;
    var n = 'PickingDataPage#'+(new Date()).getTime()+'';
    var d = window.open(k,'_blank', 'channelmode=no,top='+b+',left='+a+',width='+x+',height='+y+',menubar=no,location=no,resizable=yes,scrollbars=yes,status=no,toolbar=no,titlebar=no');
    d.name = n; return false;
}
function addScriptBySrc(k,toElm,loadFn,isReferOrigin){
    var d = document, h = toElm||d.head||d.getElementsByTagName('HEAD')[0];
    if(h&&k){
        var e = d.createElement('SCRIPT');
        e.type = 'text/javascript';
        if(loadFn) e.onload = loadFn;
        if(isReferOrigin) e.referrerPolicy = 'origin';
        e.src = k;
        h.appendChild(e);
    }
}
function addScriptByNodeText(nodeText,toElm){
    var d = document, h = toElm||d.head||d.getElementsByTagName('HEAD')[0];
    if(h&&nodeText){
        var x = d.createTextNode(nodeText);
        var s = d.createElement('SCRIPT');
        s.type = 'text/javascript';
        s.appendChild(x);
        h.appendChild(s);
    }
}
function addStyleByNodeText(cssTxt,toElm){
    var d = document, h = toElm||d.head||d.getElementsByTagName('HEAD')[0];
    if(h&&cssTxt){
        var s = d.createElement('STYLE'); s.type = 'text/css';
        if (s.styleSheet){
            s.styleSheet.cssText = cssTxt;
        } else {
            s.appendChild(d.createTextNode(cssTxt));
        }
        h.appendChild(s);
    }
}
function addLinkCSS(kLink){
    var d = document, kTag = document.createElement('LINK');
    kTag.rel = 'stylesheet'; kTag.type = 'text/css';
    kTag.href = kLink;
    (d.head||d.getElementsByTagName('HEAD')[0]).appendChild(kTag);
}
function cloneObject(obj){
    if(obj==null||typeof obj!='object') return obj;
    var copyObj = obj.constructor();
    for (var attr in obj) {
        if(obj.hasOwnProperty(attr)) copyObj[attr] = obj[attr];
    }
    return copyObj;
}

function createLoadingCover(opts){
    var c = {
        closebtn: null,
        loadzone: null,
        timer: null,
        layer: null,
        options: opts,
        setopacity: function(e,n){e.style.opacity=n;e.style.filter='alpha(opacity='+(n*100)+')'},
        addingload: function(pElm,iStyle,iSIZE,Pos){
            var LL=0;c.loadzone=document.createElement('div');pElm.appendChild(c.loadzone);
            function LIZ(n){return(iSIZE*n)}
            function ldgStying(w,h){c.loadzone.style.cssText='position:'+(Pos||'relative')+';width:'+w+'px;height:'+h+'px;background:'+c.options.loading_background+';border:'+c.options.loading_border+';z-index:'+(c.options.zindex+40)+';cursor:wait;'}
            var loadingLw=0,loadingLh=0;
            function LG(PosT,PosL){
                var d = document;
                var LDdot=d.createElement('div');
                LDdot.style.cssText='position:absolute;top:'+PosT+'px;left:'+PosL+'px;width:'+loadingLw+'px;height:'+loadingLh+'px;background:'+c.options.dot_background+';cursor:wait;';
                c.loadzone.appendChild(LDdot);
            }
            if(iStyle=='squaredot'){
                LL=12;ldgStying(LIZ(7),LIZ(7));loadingLw=LIZ(1),loadingLh=LIZ(1);
                LG(0,0);LG(0,LIZ(2));LG(0,LIZ(4));LG(0,LIZ(6));LG(LIZ(2),LIZ(6));LG(LIZ(4),LIZ(6));LG(LIZ(6),LIZ(6));LG(LIZ(6),LIZ(4));LG(LIZ(6),LIZ(2));LG(LIZ(6),0);LG(LIZ(4),0);LG(LIZ(2),0);
            }else if(iStyle=='marqueedot'){
                LL=12;ldgStying(LIZ(23),LIZ(2));loadingLw=LIZ(1),loadingLh=LIZ(2);
                LG(0,0);LG(0,LIZ(2));LG(0,LIZ(4));LG(0,LIZ(6));LG(0,LIZ(8));LG(0,LIZ(10));LG(0,LIZ(12));LG(0,LIZ(14));LG(0,LIZ(16));LG(0,LIZ(18));LG(0,LIZ(20));LG(0,LIZ(22));
            }else if(iStyle=='squareline'){
                LL=12;ldgStying(LIZ(4),LIZ(4));loadingLw=LIZ(1),loadingLh=LIZ(1);
                LG(0,0);LG(0,LIZ(1));LG(0,LIZ(2));LG(0,LIZ(3));LG(LIZ(1),LIZ(3));LG(LIZ(2),LIZ(3));LG(LIZ(3),LIZ(3));LG(LIZ(3),LIZ(2));LG(LIZ(3),LIZ(1));LG(LIZ(3),0);LG(LIZ(2),0);LG(LIZ(1),0);
            }else if(iStyle=='marqueeline'){
                LL=14;ldgStying(LIZ(11),LIZ(2));loadingLw=LIZ(1),loadingLh=LIZ(2);
                for(var i=0;i<LL;i++){
                    LG(0,LIZ(i));
                }
            }
            function LOADING(){
                if(LL>0){
                    for(var i=0;i<LL;i++){
                        c.setopacity(c.loadzone.children[i],Math.max(0,1-(0.1*(LL-i))))
                    }
                    c.loadzone.appendChild(c.loadzone.children[0]);
                    c.timer=setTimeout(LOADING,40)
                }
            };
            LOADING();
        },
        clearload: function(customizeHTML,clickToCloseMode,closeCallBackFunction){
            clearTimeout(c.timer);c.timer=null;
            if(c.loadzone!==null){
                c.loadzone.parentNode.removeChild(c.loadzone);
                c.loadzone=null;
            }
            if(customizeHTML&&c.layer){
                var d = document;
                c.loadzone = d.createElement('div');
                c.loadzone.style.cssText = 'width:auto;height:auto;max-width:80%;max-height:80%;'+(c.options.replacebox_style||'');
                c.loadzone.style.position = 'absolute';
                c.loadzone.style.zIndex = (c.options.zindex+60);
                c.loadzone.innerHTML = ''+customizeHTML+'';
                c.layer.parentNode.appendChild(c.loadzone);
                c.layer.style.cursor = 'default';
                c.getcenter(c.loadzone,c.layer);
                var thisCloseClick = function(){
                    c.allclose(closeCallBackFunction);
                }
                if(clickToCloseMode==1||clickToCloseMode==2||clickToCloseMode==3){
                    c.layer.onclick = thisCloseClick;
                }
                if(clickToCloseMode==1){
                    c.loadzone.onclick = thisCloseClick;
                }
                if(clickToCloseMode==3||clickToCloseMode==4){
                    c.closebtn = d.createElement('DIV');
                    var dfStyle = 'position:absolute;top:0;right:0;width:64px;height:64px;background:transparent url(https://lh3.googleusercontent.com/7hsme9KcxeDCuf1E9hAXlPLyIhSW4v7WUPaM4cEPcRWlwRQFSLJjJcOMTAdg_QEVJJ0) no-repeat center/contain;overflow:hidden;cursor:pointer;z-index:'+(c.options.zindex+80)+'';
                    c.closebtn.style.cssText = dfStyle;
                    var cOpty = '0.8'; c.closebtn.style.opacity=cOpty;
                    c.closebtn.onmouseover = function(){this.style.opacity='1'};
                    c.closebtn.onmouseout = function(){this.style.opacity=cOpty};
                    c.layer.parentNode.appendChild(c.closebtn);
                    c.closebtn.onclick = thisCloseClick;
                }
            }
        },
        allclose: function(closeCallBackFunction){
            c.clearload();
            if(c.closebtn!==null){
                c.closebtn.parentNode.removeChild(c.closebtn); c.closebtn = null;
            }
            if(c.layer!==null){
                c.layer.parentNode.removeChild(c.layer);c.layer=null;
            }
            if(typeof closeCallBackFunction === 'function'){
                setTimeout(closeCallBackFunction,0);
            }
        },
        setclosebyclick: function(confirmQuestion,callBackFunction){
            if(c.layer!==null){
                c.layer.onclick = function(e){
                    if(confirmQuestion){
                        var r = confirm(confirmQuestion);
                        if(r!==true) return;
                    }
                    c.allclose();
                    if(typeof callBackFunction === 'function'){
                        setTimeout(callBackFunction,0);
                    }
                    var cFN = c.options.clickinglayer;
                    if(typeof cFN === 'function'){
                        setTimeout(cFN,0);
                    }
                }
            }
        },
        start: function(e,callBackFunction){
            if(e){
                if(c.layer!==null) c.allclose();
                var d = document;
                c.layer= d.createElement('div');
                c.layer.style.cssText = 'position:absolute;top:0px;left:0px;width:100%;height:100%;background:' + c.options.layer_background + ';z-index:' + c.options.zindex + ';cursor:wait;';
                c.setopacity(c.layer,c.options.opacity);
                e.appendChild(c.layer);
                c.addingload(e,c.options.loading_style,c.options.size,'absolute');
                c.getcenter(c.loadzone,c.layer);
                if(typeof callBackFunction === 'function'){
                    setTimeout(callBackFunction,0);
                }
            } else {
                alert('Error: Unavailable/Missing element.');
            }
        },
        getcenter: function(eInner,eOuter){
            if(eInner&&eOuter){
                eInner.style.visibility = 'hidden';
                setTimeout(function(){
                    var eH=eInner.offsetHeight+(parseInt(eInner.style.marginTop)||0)+(parseInt(eInner.style.marginBottom)||0);
                    var eW=eInner.offsetWidth+(parseInt(eInner.style.marginLeft)||0)+(parseInt(eInner.style.marginRight)||0);
                    eInner.style.top=((eOuter.offsetHeight-eH)/2)+'px';
                    eInner.style.left=((eOuter.offsetWidth-eW)/2)+'px';
                    eInner.style.visibility = 'visible';
                },60);
            }
        }
    };
    function setevent(obj,evt,ofn,evtcap){
        if(!setevent.guid){setevent.guid=0}var eCap=evtcap||false;if(obj.attachEvent){obj.attachEvent('on'+evt,ofn,eCap)}else if(obj.addEventListener){obj.addEventListener(evt,ofn,eCap)}else{if(!ofn.$$guid){ofn.$$guid=setevent.guid++}if(!obj.events){obj.events={}}var fns=obj.events[evt];if(!fns){fns=obj.events[evt]={};if(obj['on'+evt]){fns[0]=obj['on'+evt]}obj['on'+evt]=function(e){var event=e||event||window.event;var returnValue=true,fn=this.events[event.type];for(var i in fn){if(!Object.prototype[i]){this.$$handler=fn[i];if(this.$$handler(event)===false){returnValue=false}}}if(this.$$handler){this.$$handler=null}return returnValue}}fns[ofn.$$guid]=ofn}if(eCap===true){if(obj.setCapture){obj.setCapture()}else{eval('obj.captureEvents(Event.'+evt.toUpperCase()+')')}}
    }
    setevent(window,'resize',function(){
        setTimeout(function(){
            c.getcenter(c.loadzone,c.layer);
            //c.getcenter(c.replaceHTML,c.layer);
        },60);
    }); return c;
}
var $bodyLoadingCover2 = createLoadingCover({
    layer_background: 'black',
    size: 10,
    loading_style: 'squaredot',
    loading_background: 'transparent',
    loading_border: 'solid 10px transparent',
    dot_background: 'white',
    replacebox_style: 'border:10px solid Gainsboro;border-radius:5px; box-shadow:0px 0px 18px 10px #777; background:#fff; color:#000;text-align:center;overflow:auto;',
    zindex: 999000,
    opacity: 0.6,
    clickinglayer:function(){
        closeBodyLoading2();
    }
});
function openBodyLoading2(fn,abortRequest){
    var d = document;
    var c = d.getElementById('bodycover2');
    c.style.display = 'block';
    if(!$bodyLoadingCover2.layer){
        $bodyLoadingCover2.start(c,fn);
    }
}
function closeBodyLoading2(){
    $bodyLoadingCover2.allclose();
    var d = document;
    d.getElementById('bodycover2').style.display = 'none';
}
function showAlertBodyLoading2(x,c,s,f,i){
    if(!$bodyLoadingCover2.layer) openBodyLoading2();
    var h = '<h'+(s||1)+' style="color:'+c+';border:0;padding:20px 20px;background:transparent;margin:0;">'+(x||'Error!')+'</h'+(s||1)+'>';
    $bodyLoadingCover2.clearload(h,(i||1),f);
}
function createCoverDIV(id){
    var d = document, e = d.createElement('DIV');
    d.body.appendChild(e);
    e.style.cssText = 'display:none;position:fixed;top:0px;left:0px;height:100%;width:100%;overflow:hidden;z-index:999000;';
    e.id = id||'';
}
function imageLoadAsBase64(blobInfo, success, failure, progress){
    var fReader = new FileReader();
    fReader.onprogress = function(data){
        progress((data.loaded / data.total) * 100);
    }
    fReader.onerror = function(event){
        failure('Invalid Upload: ['+(event.toString()||'?')+']!');
    }
    fReader.onloadend = function(){
        success(fReader.result);
    }
    fReader.readAsDataURL(blobInfo.blob());
}
function initializeEditor(textAreaId){
    var toolbarOptions = [
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        //[{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
        [{ 'font': [] }],

        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],
        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme

        [{ 'direction': 'rtl' }],                         // text direction
        [{ 'align': [] }],
        [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],

        ['clean'],                                         // remove formatting button
        ['link', 'image']
    ];
    var editorQuill = new Quill('#'+textAreaId, {
        modules: {
            toolbar: toolbarOptions
        },
        theme: 'snow'
    });
    return editorQuill;
}
function returnMatrixHtml(vArray,setColor){
    var perMatrixFrame = document.createElement('div'), setMatrixData = {
        //fromCharCode() //..(BarcodeValue)
        msg: '',
        //size in pixel.
        dim: 64,
        //Use Rectangle Style?
        rct: false,
        //padding in no. of mini-square.
        pad: 1,
        //Front & Background Color.
        pal: [ (setColor||'#444'), '#fff' ],
        //Optimized SVG Graphic Size, 1=true, 0=false.
        vrb: 1
    }
    var recordSeparator = String.fromCharCode(30), groupSeparator = String.fromCharCode(29);
    var codingValue = '[)>' + recordSeparator +'06';
    if(vArray instanceof Array){
        for(var i=0;i<vArray.length;i++){
            codingValue += groupSeparator + vArray[i];
        }
    }
    codingValue += recordSeparator + String.fromCharCode(4);
    setMatrixData.msg = codingValue;
    perMatrixFrame.appendChild( addDataMatrixBarcode(setMatrixData) );
    return perMatrixFrame.innerHTML||'';
}
var $barcoding128cc = 0;
function createJsBarcode128(v,setColor){
    $barcoding128cc += 1;
    var d = document, e = d.createElement('div');
    var n = 'bc128-' + $barcoding128cc + 'n';
    e.innerHTML = '<svg id="'+n+'"></svg>';
    e.style.display = 'none';
    d.body.appendChild(e);
    JsBarcode('#'+n, v, {
        format: 'CODE128',
        width: 1,
        height: 10,
        background:"#ffffff",
        lineColor:(setColor||"#444444"),
        margin:0,
        displayValue: false
    });
    var h = e.innerHTML;
    d.body.removeChild(e);
    return h;
}
var $barcodingUPCcc = 0;
function createJsBarcodeUpc(v,setColor){
    $barcodingUPCcc += 1;
    var d = document, e = d.createElement('div');
    var n = 'upc-' + $barcodingUPCcc + 'n';
    e.innerHTML = '<svg id="'+n+'"></svg>';
    e.style.display = 'none';
    d.body.appendChild(e);
    JsBarcode('#'+n, v, {
        format: 'UPC',
        background:"#ffffff",
        lineColor:(setColor||"#000000"),
        width: 3,
        height: 30,
        margin:0,
        displayValue:true,
        font:'arial',
        fontOptions:'normal',
        fontSize:24,
        textAlign:'center',
        textPosition:'bottom',
        textMargin:2
    });
    var h = e.innerHTML;
    d.body.removeChild(e);
    return h;
}
function returnHeaderIndex(headerData){
    var idx = {};
    for(var i=0;i<headerData.length;i++){
        if(headerData[i] == 'Shipment Date') idx.ShipDate = i;
        if(headerData[i] == 'Inventory ID') idx.InventoryID = i;
        if(headerData[i] == 'Shipment Nbr.'){ idx.ShipmentNbr = i; } else if(headerData[i] == 'Shipment No.') idx.ShipmentNbr = i;
        if(headerData[i] == 'Order Nbr.') idx.OrderNbr = i;
        if(headerData[i] == 'Branch Name') idx.ShipperName = i;
        if(headerData[i] == 'Branch Address') idx.ShipperAdress = i;
        if(headerData[i] == 'Destination Company') idx.ConsigneeName = i;
        if(headerData[i] == 'Address Line 1') idx.ConsignAddress1 = i;
        if(headerData[i] == 'Address Line 2') idx.ConsignAddress2 = i;
        if(headerData[i] == 'Address Line 3') idx.ConsignAddress3 = i;
        if(headerData[i] == 'City') idx.ConsignCity = i;
        if(headerData[i] == 'Postal Code') idx.ConsignPostcode = i;
        if(headerData[i] == 'State') idx.ConsignState = i;
        if(headerData[i] == 'Country Name') idx.ConsignCountry = i;
        if(headerData[i] == 'Carton') idx.Carton = i;
        if(headerData[i] == 'Customer') idx.CustomerID = i;
        if(headerData[i] == 'Customer Name') idx.CustomerName = i;
        if(headerData[i] == 'Customer Location') idx.CustomerLocationID = i;
        if(headerData[i] == 'Customer Order Nbr.') idx.CustomerOrderNbr = i;
        if(headerData[i] == 'Customer P/N') idx.CustomerPN = i;
        if(headerData[i] == 'End Customer') idx.EndCustomerId = i;
        if(headerData[i] == 'Non Stock/MPN'){ idx.MPN = i; } else if(headerData[i] == 'Non-Stock/MPN') idx.MPN = i;
        if(headerData[i] == 'Cust. Line Nbr.') idx.CustomerLineNbr = i;
        if(headerData[i] == 'SO Line#') idx.SoLineNbr = i;
        if(headerData[i] == 'Qty' || headerData[i] == 'Quantity') idx.Qty = i;
        if(headerData[i] == 'Ship-Line QTY') idx.ShippingQty = i;
        if(headerData[i] == 'Lot/Serial Nbr.') idx.LotNbr = i;
        if(headerData[i] == 'Date Code') idx.DateCode = i;
        if(headerData[i] == 'COO') idx.COO = i;
        if(headerData[i] == 'Brand') idx.Brand = i;
        if(headerData[i] == 'Sys.Receipt Date') idx.ReceiptDate = i;
        if(headerData[i] == 'WH Location') idx.WarehouseLocation = i;
        if(headerData[i] == 'Warehouse') idx.WarehouseCode = i;
        if(headerData[i] == 'Shipping Terms') idx.Incoterm = i;
    }
    return idx;
}
function addPackingSlipRowContent(isBC,v1,v2,v3,v4,v5,v6,v7,v8,v9,v10,v11,v12,i){
    var h = '';
    h += '<table style="border:0;padding:0;margin:0;width:100%;" border="0" cellpadding="0" cellspacing="0"><tbody><tr>';

    h += '<td valign="center">';
    h += '<div class="wlocation"><b>'+v9+'</b></div>';
    if(isBC) h += '<div class="matrixbarcode">'+returnMatrixHtml(['4K'+v11,'P'+v3,'1P'+v2,'Q'+v7,'10D'+v4,'1T'+v5,'4L'+v6])+'</div>';
    var recDate = v8.split('/'), y = recDate[2], m = recDate[1], d = recDate[0];
    var isDate = (y&&m&&d)?1:0;
    h += '<div class="receivedate"><span>(Receipt Date)</span><br/><b>'+(isDate?(y+'-'+m+'-'+(d>9?d:('0'+d))):'?')+'</b></div>';
    h += '</td>';

    h += '<td class="dataleft">';
    h += '<div class="seqnumber"><span><i class="pkindex">'+(i+1)+'</i></span><span class="sonbr"><i>'+v10+'-'+v12+'<br/>('+v11+')</i></span></div>';
    h += '<div><table style="border:0;padding:5px 0px;margin:0;" border="0" cellpadding="0" cellspacing="0"><tbody>';
    h += '<tr>';
    h += '<td>';
    h += '<div class="column1data"><div class="bctitle">🆔  '+(isBC?'':'<u>')+'<b class="maintext">'+v1+'</b>'+(isBC?'':'</u>')+'</div>'+(isBC?('<div>'+createJsBarcode128(v1)+'</div>'):'')+'</div>';
    h += '</td>';
    h += '<td>';
    h += '<div class="column2data"><div class="bctitle">🏭  '+v2+'</div>'+(isBC?('<div>'+createJsBarcode128(v2,'#777777')+'</div>'):'')+'</div>';
    h += '</td>';
    h += '<td>';
    h += '<div class="column3data"><div class="bctitle">📦  <b class="maintext">'+v7.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",").split('.')[0]+'</b></div>'+(isBC?('<div>'+createJsBarcode128(v7)+'</div>'):'')+'</div>';
    h += '</td>';
    h += '</tr>';
    h += '<tr style="'+(isBC?'':'position:relative;left:40px;')+'">';
    h += '<td>';
    h += '<div class="column1data"><div class="bctitle">👲  '+v3+'</div>'+(isBC?('<div>'+createJsBarcode128(v3,'#777777')+'</div>'):'')+'</div>';
    h += '</td>';
    h += '<td>';
    h += '<div class="column2data"><div class="bctitle">#️⃣  '+v5+'</div>'+(isBC?('<div>'+createJsBarcode128(v5,'#777777')+'</div>'):'')+'</div>';
    h += '</td>';
    h += '<td>';
    h += '<table style="border:0;padding:0;margin:0;" border="0" cellpadding="0" cellspacing="0"><tbody><tr>';
    h += '<td class="column4data"><div class="bctitle">🌎  '+v6+'</div>'+(isBC?('<div>'+createJsBarcode128(v6,'#777777')+'</div>'):'')+'</td>';
    h += '<td class="column5data"><div class="bctitle">📅  '+v4+'</div>'+(isBC?('<div>'+createJsBarcode128(v4,'#777777')+'</div>'):'')+'</td>';
    h += '</td></tr></tbody></table>';
    h += '</td>';
    h += '</tr>';
    h += '</tbody></table></div>';
    h += '</td>';
    h += '</tr></tbody></table>';
    return h;
}
function createPickingSlip(pkData,noteValue,isWithBarcode){
    var lbWidth = '1020px';  //A4
    var lbHeight = '704px';  //A4
    var lbMargin = '2px';  //browser need to be set as default margin as this is not the white margin.
    var innerContentWidth = (parseInt(lbWidth) - (parseInt(lbMargin)*2)), eachPageRows = isWithBarcode?5:6;

    pkData = pkData.split(/\n/);
    var headerData, oPkContent = [];

    for(var ii=0;ii<pkData.length;ii++){
        if(ii==0){
            headerData = pkData[ii].split(/\t/);
        }
        if(ii>0){
            oPkContent.push( pkData[ii].split(/\t/) );
        }
    }

    var idx = returnHeaderIndex(headerData);

    var shipDate = oPkContent[0][idx.ShipDate].split('/');
    var sy = shipDate[2].toString();
    var sm = shipDate[1].toString();
    var sd = shipDate[0].toString();

    var labelHTML = '<style>hr {border:none;border-top:1px solid #000;;margin:0;} td {overflow:hidden;} td.dataleft {width:936px;max-width:936px;min-width:936px;border-left:1px solid #bbb;padding:'+(isWithBarcode?'5':'3')+'px 0px;} td.dataleft div.bctitle {color:#888;font-size:1'+(isWithBarcode?'2':'4')+'px;} div.bctitle b.maintext {color:#000;font-size:1'+(isWithBarcode?'2':'4')+'px;} div.seqnumber {position:absolute;top:-1px;right:0px;border:1px solid #000;border-radius:0px 0px 0px 13px;background:#ddd;} div.seqnumber span {display:inline-block;color:#777;font-size:12px;padding:6px;vertical-align:top;} div.seqnumber span.sonbr { background:WhiteSmoke;border-left:1px solid #444;padding:0px; } div.seqnumber i.pkindex {display:inline-block;background:#f7f7f7;border:0;border-radius:25px;padding:1px 4px 1px 3px;} div.seqnumber span.sonbr i {display:inline-block;font-size:12px;transform:scale(0.80);margin:0px -4px;}';
    labelHTML += 'div.column1data {width:3'+(isWithBarcode?'48':'24')+';border-color:transparent;border-style:solid;border-width:8px 20px;} div.headerdata1, div.headerdata2, div.headerdata3, div.headerdata4, div.headerdata5, div.column2data, div.column3data, td.column4data, td.column5data {border-color:transparent;border-style:solid;border-width:8px 20px;} div.headerdata1 {width:132px;} div.headerdata2 {width:1'+(isWithBarcode?'80':'96')+'px;} div.headerdata3 {width:1'+(isWithBarcode?'20':'08')+'px;} div.headerdata4 {width:'+(isWithBarcode?'192':'212')+'px;} div.headerdata5 {width:1'+(isWithBarcode?'20':'68')+'px;} '+'div.column2data {width:2'+(isWithBarcode?'76':'64')+'px;} div.column3data {width:208px;} td.column4data {width:'+(isWithBarcode?'66':'48')+'px;max-width:'+(isWithBarcode?'66':'48')+'px;min-width:'+(isWithBarcode?'66':'48')+'px;} td.column5data {width:'+(isWithBarcode?'76':'96')+'px;max-width:'+(isWithBarcode?'76':'96')+'px;min-width:'+(isWithBarcode?'76':'96')+'px;border-right:0;} div.bctitle {border-bottom: 4px solid transparent;text-overflow: ellipsis;} div.matrixbarcode {text-align:center;margin-top:0px;} div.matrixbarcode.headcode {margin-top:0px;} div.wlocation {position:absolute;top:0;left:0;right:0;width:100%;text-align:center;border-bottom:1px dashed #bbb;padding:'+(isWithBarcode?'3':'12')+'px 0px;} div.wlocation b {font-size:12px;transform:scale(0.80);font-weight:800;} div.receivedate {position:absolute;bottom:0;left:0;right:0;width:100%;text-align:center;font-size:12px;color:#666;border-top:1px dashed #bbb;padding:'+(isWithBarcode?'0px':'8px')+' 0px;} div.receivedate b {'+(isWithBarcode?'display:inline-block;color:#111;transform:scale(0.90);':'')+'} div.receivedate span {display:inline-block;color:#aaa;font-weight:normal;transform:scale(0.'+(isWithBarcode?'6':'7')+');padding-bottom:'+(isWithBarcode?'0px;margin:-2px 0px -3px;':'6px;')+'} div.shipto.addressinfo, div.shipfrom.addressinfo { height:40px !important; } div.addnotetext {font-family:"Microsoft JhengHei","Arial";font-weight:bold;font-size:15px;white-space:normal;word-wrap:break-word;background:WhiteSmoke;}</style>';

    var wrapperStyle = 'position:relative;width:'+lbWidth+';border:0;background:white;margin:10px 30px;', openWapperDiv = '<div class="labelwrapper" style="'+wrapperStyle+'">';
    var innerWrapperDiv = '<div style="position:relative;height:'+lbHeight+';border:'+lbMargin+' solid transparent;">';
    var uViewGap = '<input type="hidden" name="viewgaps"/>', gapDiv = '<div class="viewgaps" style="width:100%;height:30px;background:transparent;">'+uViewGap+'</div>', headerHTML = '';

    labelHTML += openWapperDiv;
    labelHTML += gapDiv;
    labelHTML += innerWrapperDiv;

    headerHTML += '<div style="border-bottom:1px solid #000;">';
    headerHTML += '<div style="border-bottom:14px solid transparent;">';
    headerHTML += '<h1 style="font-family:arial black;font-size:20px;text-align:center;margin:0;">Flexxon Picking Slip</h1>';
    headerHTML += '</div>';
    headerHTML += '</div>';

    headerHTML += '<center><table class="headertable" style="border:0;padding:2px 0px;margin:0;width:100%;border-bottom: 1px solid #000;" border="0" cellpadding="0" cellspacing="0"><tbody><tr><td valign="center" style="width:946px;min-width:946px;max-width:946px;">';
    headerHTML += '<table style="border:0;padding:0;margin:0;" border="0" cellpadding="0" cellspacing="0"><tbody><tr>';
    headerHTML += '<td><div class="headerdata1"><div class="bctitle"><i>Ship Date:</i>  <br/><b>'+(sy+'-'+sm+'-'+(sd>9?sd:('0'+sd)))+'</b></div>'+(isWithBarcode?('<div>'+createJsBarcode128(sy+(sm>9?sm:('0'+sm))+(sd>9?sd:('0'+sd)))+'</div>'):'')+'</div></td>';
    headerHTML += '<td><div class="headerdata2"><div class="bctitle"><i>Shipment No.:</i>  <br/><b>'+oPkContent[0][idx.ShipmentNbr]+'</b></div>'+(isWithBarcode?('<div>'+createJsBarcode128(oPkContent[0][idx.ShipmentNbr])+'</div>'):'')+'</div></td>';
    //headerHTML += '</tr><tr>';
    headerHTML += '<td><div class="headerdata3"><div class="bctitle"><i>Warehouse:</i>  <br/><b>'+oPkContent[0][idx.WarehouseCode]+'</b></div>'+(isWithBarcode?('<div>'+createJsBarcode128(oPkContent[0][idx.WarehouseCode])+'</div>'):'')+'</div></td>';
    headerHTML += '<td style="border-color:#444;border-style:solid;border-width:0px 1px;"><div class="headerdata4"><div class="bctitle"><i>Customer:</i>&nbsp;&nbsp;'+(isWithBarcode?'':'<br/>')+'<span style="display:inline-block;font-family:Verdana;font-size:12px;'+(isWithBarcode?'transform:scale(0.90);position:absolute;left:68px;top:6px;width:160px;overflow:hidden;text-overflow:ellipsis;':'margin:0px 0px -3px;')+'">'+oPkContent[0][idx.CustomerID]+ (oPkContent[0][idx.CustomerID]==oPkContent[0][idx.EndCustomerId]?'':('&nbsp;&nbsp;<i style="left:0;text-decoration:none;">➤</i>&nbsp;&nbsp;'+oPkContent[0][idx.EndCustomerId])) +'</span><br/><span class="custname">☖ '+oPkContent[0][idx.CustomerName]+'</span></div>'+(isWithBarcode?('<div>'+createJsBarcode128(oPkContent[0][idx.CustomerID])+''+(isWithBarcode?('<small style="display:inline-block;position:relative;top:-3px;color:#fff;font-family:Arial Black;background:#888;font-size:12px;transform:scale(0.60);padding:1px 5px;margin:-2px 0px 0px;vertical-align:top;">'+(oPkContent[0][idx.Incoterm]||'???')+'</small>'):'')+'</div>'):'')+'</div>'+(isWithBarcode?'':('<small style="display:inline-block;position:absolute;top:0;right:0px;color:#888;font-family:Arial Black;font-size:12px;transform:scale(0.90);border:1px solid #aaa;padding:0px 4px 1px;">'+(oPkContent[0][idx.Incoterm]||'???')+'</small>'))+'</td>';
    headerHTML += '<td><div class="headerdata5"><div class="bctitle"><i>Total Qty:</i>  <br/><b style="left:0;"><[{totalQtyText}]></b></div>'+(isWithBarcode?('<div><[{totalQtyBarcode}]></div>'):'')+'</div></td>';
    headerHTML += '</tr></tbody></table>';

    headerHTML += '</td>';
    if(isWithBarcode) headerHTML += '<td valign="center" style="border-left:1px solid #000;"><div class="headcode matrixbarcode">'+ returnMatrixHtml(['K'+oPkContent[0][idx.CustomerID],'11K'+oPkContent[0][idx.ShipmentNbr],'6D'+sy+(sm>9?sm:('0'+sm))+(sd>9?sd:('0'+sd))]) +'</div></td>';
    headerHTML += '</tr></tbody></table></center>';

    labelHTML += headerHTML;

    var uInfo = window.parent.document.getElementById('btnUserMenu'), uName;
    if(uInfo) uName = uInfo.getElementsByTagName('SPAN')[0].innerHTML;
    var nDate = new Date(), mEng = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
    var yr = nDate.getFullYear(), mh = mEng[nDate.getMonth()], dy = nDate.getDate(), hr = nDate.getHours(), ms = nDate.getMinutes();
    dy = dy>9?dy:('0'+dy.toString()); ms = ms>9?ms:('0'+ms.toString());
    var fixBottomCSS = 'position:absolute;bottom:0;background:none;padding:0;margin:0;overflow:hidden;font-size:12px;transform:scale(0.80);';

    var pageNumber = 1, nPkContent = [], eachQty = [], totalQty = 0;
    for(var iii=0;iii<oPkContent.length;iii++){
        if(oPkContent[iii][idx.InventoryID]) nPkContent.push(oPkContent[iii]);
    }; oPkContent = nPkContent;
    var startIdx = (noteValue?-1:0), idxCount=-1;
    for(var i=startIdx;i<oPkContent.length;i++){
        labelHTML += '<hr/>'; idxCount++;
        if(i==-1){
            labelHTML += '<table style="border:0;padding:0;margin:0;width:100%;" border="0" cellpadding="0" cellspacing="0"><tbody><tr>';
            labelHTML += '<td><div style="height:'+(isWithBarcode?'82':'64')+'px;border-color:white;border-style:solid;border-width:15px 20px;width:'+(innerContentWidth-40)+'px;"><div class="addnotetext">'+noteValue.replace(/\r\n|\r|\n/g,'<br/>')+'</div></div></td>';
            labelHTML += '</tr></tbody></table>';
        } else {
            if(oPkContent[i][idx.LotNbr] == '' || oPkContent[i][idx.LotNbr] == '/' || oPkContent[i][idx.LotNbr] == '-'){
                oPkContent[i][idx.LotNbr] = '/';
            }
            if(oPkContent[i][idx.DateCode] == '' || oPkContent[i][idx.DateCode] == '/' || oPkContent[i][idx.DateCode] == '-'){
                oPkContent[i][idx.DateCode] = '/';
            }
            eachQty[i] = parseInt(oPkContent[i][idx.Qty].replace(/\,/g,''));
            if(isNaN(eachQty[i])) eachQty[i] = parseInt(oPkContent[i][idx.ShippingQty].replace(/\,/g,''));
            labelHTML += addPackingSlipRowContent(isWithBarcode,oPkContent[i][idx.InventoryID],oPkContent[i][idx.MPN],oPkContent[i][idx.CustomerPN],oPkContent[i][idx.DateCode],oPkContent[i][idx.LotNbr],oPkContent[i][idx.COO],eachQty[i],oPkContent[i][idx.ReceiptDate],oPkContent[i][idx.WarehouseLocation],oPkContent[i][idx.OrderNbr],oPkContent[i][idx.CustomerLineNbr],oPkContent[i][idx.SoLineNbr],i);
            totalQty += eachQty[i]||0;
        }
        if((idxCount+1)%eachPageRows==0||idxCount==oPkContent.length-1+Math.abs(startIdx)){
            labelHTML += '<hr/>';
            labelHTML += '<div style="position:absolute;bottom:0;left:0;width:100%;background:none;padding:2px 0px">';
            //labelHTML += '<hr style="border-color:silver;"/>';
            labelHTML += '<div style="color:#999;border:0;">';
            labelHTML += '<div style="left:-12px;'+fixBottomCSS+'">«Printed on: <b><i>'+dy+'-'+mh+'-'+yr+' ['+hr+':'+ms+']</i></b>»</div>';
            labelHTML += '<h1 style="font-family:arial;font-size:12px;transform:scale(0.80);text-align:center;margin:0;">(Page '+ pageNumber +' of '+ (Math.ceil((oPkContent.length+Math.abs(startIdx))/eachPageRows)||0) +')</h1>';
            if(uName) labelHTML += '<div style="right:-12px;'+fixBottomCSS+'">«Printed by: <b><i>'+uName+'</i></b>»</div>';
            labelHTML += '</div>';
            labelHTML += '</div>';
            pageNumber+= 1;
            if(idxCount!=oPkContent.length-1+Math.abs(startIdx)){
                labelHTML += '</div>';
                labelHTML += '</div>';
                labelHTML += '<div class="pagebreak"></div>';
                labelHTML += openWapperDiv;
                labelHTML += gapDiv;
                labelHTML += innerWrapperDiv;
                labelHTML += headerHTML;
            }
        }
    }
    labelHTML += '</div>';
    labelHTML += '</div>';

    var tqText = totalQty.toString().replace(/\B(?=(\d{3})+(?!\d))/g,',');
    while(labelHTML.indexOf('<[{totalQtyText}]>')!=-1) labelHTML = labelHTML.replace('<[{totalQtyText}]>',tqText);
    if(isWithBarcode){
        var tqBarcode = createJsBarcode128(totalQty);
        while(labelHTML.indexOf('<[{totalQtyBarcode}]>')!=-1) labelHTML = labelHTML.replace('<[{totalQtyBarcode}]>',tqBarcode);
    }

    var tt = oPkContent[0][idx.ShipmentNbr]+' ('+oPkContent[0][idx.CustomerID]+') - Picking Slip';
    var printingStyleHTML = '<style>@media print { @page {size: landscape} div.pagebreak {page-break-after:always;} html, body {margin:0px !important;} div.labelwrapper {margin:0px auto !important;break-inside:avoid;} div.labelwrapper * {print-color-adjust:exact;-webkit-print-color-adjust:exact;}  div#printingbutton, div.viewgaps {display: none !important;} }</style>';
    printingStyleHTML += '<style>* {text-size-adjust:none;-webkit-text-size-adjust:none;} div {font-family:arial;font-size:12px;} html, body { background:#ccc;border:0;padding:0;margin:0px 16px; } p {    margin: 3px 0px;} table.headertable div {font-weight:bold;} table.headertable div.bctitle b {font-size:'+(isWithBarcode?'12px;display:inline-block;transform:scale(0.90);margin:1px -1px -2px;position:relative;left:-2px;}':'21px;} table.headertable div.bctitle span.custname {display:inline;transform:scale(0.90);position:relative;line-height: 1.8;overflow:hidden;text-overflow: ellipsis;}')+' table.headertable div.bctitle i {display:inline-block;font-size:12px;transform:scale(0.80);font-weight:normal;text-decoration:underline;border-bottom:2px solid transparent;position:relative;left:-5px;} div,table.labelwrapper {text-align:left;white-space:nowrap;overflow:hidden; } div.rowtext {height:18px;} div.rowtext.title {width:128px;} div.rowtext.middle {width:12px;} div.rowtext.barcode128 {height:30px;} div.bottomtext {text-align:center;width:178px;font-size:13px;} table td {position:relative;} div.addressinfo { border:10px solid transparent; } div.whereinfo {position:absolute;top:11px;left:12px;font-size:9px;color:#444;} div.shipto.addressinfo, div.shipfrom.addressinfo { height:55px; } div.addressinfo div { white-space:normal; } div.shipto div.addresshead {padding-left:32px;} div.shipfrom div.addresshead {max-height:32px; padding-left:20px;} div.addresshead { font-size:10px;border-bottom:1px solid #000; } div.addressbody {font-size:8px;border-top:5px solid transparent;} div#printingbutton input {color:red;background-color:yellow;} div#printingbutton input:hover {color:white;background-color:red;}</style>';
    var doprintingbuttonHTML = '<div id="printingbutton" style="position:fixed;top:0;right:0;border:10px solid transparent;"><div style="position:absolute;top:0;left:0;height:100%;width:100%;background:#000;opacity:0.1;"></div><div style="position:relative;border:20px solid transparent;"><input type="button" value=" PRINT ME! " style="font-family:arial black;font-size:24px;padding:4px 6px;cursor:pointer;" onclick="if(window.print){window.print();}else{alert(&quot;Sorry! Your browser is not supported for this action.&quot;);}"></div><div style="position:relative;border:20px solid transparent;border-top:0;"><input type="button" value=" Print as PDF! " style="font-family:arial black;font-size:24px;padding:4px 6px;cursor:pointer;" onclick="printAsPDF(document,&quot;'+tt+'&quot;);"></div></div>';

    return '<html><head><title>'+tt+'</title>'+printingStyleHTML+'</head><body>'+labelHTML +doprintingbuttonHTML+'</body></html>';
}

function checkingCapacitorItem(){
    var d = document, warningID = 'shipmentcapacitorbox';
    var warningBox = d.getElementById(warningID);
    if(!warningBox){
        var dTableHdr = d.getElementById('ctl00_phG_tab_t0_grid_headerDiv'), tHead, hdrTR, hTDs, dscptnIDX = -1;
        if(dTableHdr) tHead = dTableHdr.getElementsByTagName('THEAD')[0];
        if(tHead) hdrTR = tHead.getElementsByTagName('TR')[0];
        if(hdrTR) hTDs = hdrTR.getElementsByTagName('TD');
        var hdrL = hTDs.length, hTD;
        if(hdrL>0){
            for(var i=0; i<hdrL; i++){
                hTD = (hTDs[i].innerHTML||'').replace(/<[^>]*>?/gm,'').replace(/&nbsp;/g,' ').replace(/(^\s+|\s+$)/g,"");
                if(hTD.replace(/\s/g,"")=='Description'){
                    dscptnIDX = i; break;
                }
            }
            if(dscptnIDX>=0){
                var dTableBody = d.getElementById('ctl00_phG_tab_t0_grid_dataT0'), tBody, bTRs, trTD, trText, cc = 0;
                if(dTableBody) tBody = dTableBody.getElementsByTagName('TBODY')[0];
                if(tBody) bTRs = tBody.getElementsByTagName('TR');
                for(var ii=0; ii<bTRs.length; ii++){
                    trTD = bTRs[ii].getElementsByTagName('TD')[dscptnIDX];
                    if(trTD) trText = (trTD.innerHTML||'').replace(/<[^>]*>?/gm,'').replace(/&nbsp;/g,' ').replace(/(^\\s+|\\s+$)/g,"").toUpperCase();
                    if(trText.indexOf('CAP ')!=-1 || trText.indexOf('CAP.')!=-1 || trText.indexOf('CAPACITOR')!=-1){
                        trTD.style.color = 'red'; cc++;
                    } else {
                        trText = '';
                    }
                }
                if(cc>0){
                    var pgTabArea = d.getElementById('ctl00_phG_tab_tabDiv');
                    if(pgTabArea){
                        var nDIV = d.createElement('DIV');
                        nDIV.innerHTML = '<span style="display:inline-block;color:yellow;background:OrangeRed;padding:10px 16px;">Capacitor-Item(s) found!</span><b style="display:inline-block;color:FireBrick;background:yellow;padding:6px 16px;"><u>SF</u> <b style="color:red;">NOT allowed</b></b>'
                        nDIV.style.cssText = 'position: absolute; width: auto; right: 0;';
                        pgTabArea.appendChild(nDIV);
                        nDIV.id = warningID;
                    }
                }
            }
        }
        warningBox = d.getElementById(warningID);
        if(!warningBox) setTimeout(checkingCapacitorItem,600);
    }
}


function initializePage_Shipments(){
    var d = document, navBar = d.getElementById('ctl00_phDS_ds');
    if(navBar){
        var btnHover = function(){ this.style.opacity=0.8 };
        var btnOut = function(){ this.style.borderStyle='outset';this.style.opacity=1; };
        var btnDown = function(){ this.style.borderStyle='inset';this.style.opacity=0.9; };
        var btnUp = function(){ this.style.borderStyle='outset';this.style.opacity=1; };

        function createPkBtn(wBar,rightPX,x,bg,c,fn){
            if(wBar&&x){
                wBar.style.position = 'relative';
                var nDiv = d.createElement('DIV');
                nDiv.style.cssText = 'position:absolute;top:0;overflow:hidden;';
                nDiv.style.right = (rightPX||0) + 'px';
                wBar.appendChild(nDiv);

                var btnCSS = 'display:inline-block;font-weight:bold;border:2px outset #999;padding:4px 8px;margin:4px;opacity:1;cursor:pointer;';
                var b = d.createElement('BUTTON');
                b.type = 'button';
                b.style.cssText = btnCSS;
                b.style.color = c||'white';
                b.style.background = bg||'black';
                b.innerText = x;
                b.onmouseover = btnHover;
                b.onmouseout = btnOut;
                b.onmousedown = btnDown;
                b.onmouseup = btnUp;
                nDiv.appendChild(b);
                b.onclick = fn;
            }
        }
        function preCreateBtn(){
            var wBar = d.getElementById('ctl00_phDS_ds_ToolBar');
            if(wBar){
                createPkBtn(wBar,0,'Picking Data','DarkSlateBlue','white',function(){
                    var x = d.getElementById('ctl00_phF_form_t0_edShipmentNbr_text'), n;
                    if(x) n = x.value||'';
                    if(n){
                        window.open('https://flexxonlive.go.akamai-access.com/FlexxonLive/Main?ScreenId=GI100118&ShipmentNumber='+n);
                    }
                });
                createPkBtn(wBar,108,'Show Note','CadetBlue','white',function(){
                    var noteArea = d.getElementById('ctl00_phF_form_t0_CstPXTextEdit3');
                    if(noteArea){
                        var v = (noteArea.value||'').replace(/(^\s+|\s+$)/g,'').replace(/\r\n|\r|\n/g,'<br/>').replace(/\☑/g,'⚫').replace(/\s/g,'&nbsp;').replace(/(\b(https?|ftp|file):\/\/([-A-Z0-9+&@#%?=~_|!:,.;]*)([-A-Z0-9+&@#%?\/=~_|!:,.;]*)[-A-Z0-9+&@#\/%=~_|])/ig,'<a title="$1" href="$1" rel="$3" target="_blank">$1</a>');
                        showAlertBodyLoading2('<div style="text-align:left;font-size:16px;font-weight:normal;line-height:1.5;">'+v+'</div><img id="imgtranslate" src="https://upload.wikimedia.org/wikipedia/commons/d/db/Google_Translate_Icon.png" with="64" height="64" style="position:fixed;right:10px;bottom:10px;border:0;margin:0;cursor:pointer;opacity:0.8;" onmouseover="this.style.opacity=1;" onmouseout="this.style.opacity=0.8;"/>','#000',4,closeBodyLoading2,3);
                        d.getElementById('imgtranslate').onclick = function(){
                            openLocation('https://translate.google.com.hk/?hl=zh-TW&tab=wT&sl=en&tl=zh-TW&op=translate&text='+encodeURIComponent(noteArea.value));
                        }
                    }
                });
                var sTag = d.getElementById('hidedelete');
                if(!sTag){
                    sTag = d.createElement('STYLE');
                    sTag.id = 'hidedelete';
                }
                (d.getElementsByTagName('head')[0]||d.body).appendChild(sTag);
                var fCSS = d.createTextNode('#ctl00_phDS_ds_ToolBar_Delete, #ctl00_phDS_ds_ToolBar_bar li[tooltip="Delete (Ctrl+Del)."] { display:none; }');
                sTag.appendChild(fCSS);
                createCoverDIV('bodycover2');
                checkingCapacitorItem();
            } else {
                setTimeout(preCreateBtn,600);
            }
        };preCreateBtn();
    }
}

function initializePickingAddon(){
    var d = document, topArea = d.getElementById('ctl00_phF_form');
    if(topArea){
        createCoverDIV('bodycover2');

        topArea = topArea.parentNode;
        topArea.style.position = 'relative';
        var nDiv = d.createElement('DIV');
        nDiv.id = 'areaforpickingaddonfunction';
        nDiv.style.cssText = 'position:absolute;top:0;right:0;margin:10px 10px 0px 0px;overflow:hidden;';
        topArea.appendChild(nDiv);

        var xArea = d.createElement('TEXTAREA');
        xArea.style.cssText = 'position:relative;border: 2px dotted darkred;background:FloralWhite;resize:none;margin-right:80px;height:30px;width:264px;max-height:30px;max-width:264px;min-height:30px;min-width:264px;';
        xArea.placeholder = ' Paste picking data here from Excel...\n then press [F9] or click button to print~';
        xArea.onfocus = function(){this.style.background='LightYellow';this.select()};
        xArea.onblur = function(){this.style.background='FloralWhite'};
        nDiv.appendChild(xArea);
        var printData = function(){
            var oValue = (xArea.value||''), v = oValue;
            //var snInput = d.getElementById('ctl00_phF_form_edShipmentNumber_text'), snValue = (snInput.value||'').replace(/\s/g,'');
            //setTimeout(function(){ xArea.value = oValue; if(snValue) snInput.value = snValue; },12);
            if(!v || v.replace(/\s/g,'') == ''){
                var dPager = d.getElementById('ctl00_phG_grid_ab_pager');
                if(dPager.getElementsByTagName('*').length==0){
                    var dTable = d.getElementById('ctl00_phG_grid_dataT0');
                    if(dTable){
                        var dHead = dTable.getElementsByTagName('THEAD')[0];
                        var dBody = dTable.getElementsByTagName('TBODY')[0];
                        if(dHead&&dBody){
                            //String.fromCharCode(9) || \t
                            //String.fromCharCode(10) || \n
                            v = '';
                            var dTDs = dHead.getElementsByTagName('TD'), dTD_L = dTDs.length;
                            for(var iii=0; iii<dTD_L; iii++){
                                v += dTDs[iii].innerHTML||'';
                                v += String.fromCharCode((iii==dTD_L-1)?10:9);
                            }
                            var dTRs = dBody.getElementsByTagName('TR'); dTDs = [], dTD_L = [];
                            for(var i=0; i<dTRs.length; i++){
                                dTDs[i] = dTRs[i].getElementsByTagName('TD');
                                dTD_L[i] = dTDs[i].length;
                                if(dTRs[i].id!='ctl00_phG_grid_newRow'){
                                    for(var ii=0; ii<dTD_L[i]; ii++){
                                        v += (dTDs[i][ii].innerHTML||'').replace(/<[^>]*>?/gm,'');
                                        v += String.fromCharCode((ii==dTD_L[i]-1)?10:9);
                                    }
                                }
                            }
                        } else {
                            console.warn('Data content is not found!');
                        }
                    } else {
                        console.warn('Data table is not found!');
                    }
                } else {
                    alert('Picking data is not found!\n\n*Possible reason::\n (1) Excel Data is not yet pasted to the text-area.\n (2) Sorted shipment data has more than 1 page.'); return;
                }
            } else {
                var oData = v.split(/\n/);
                if(! oData.length>1){
                    alert('Picking data is invalid/empty!'); return;
                }
            }
            function openPrintWindow(v,noteText,opts){
                var h = screen.height, w = screen.width;
                var x = w*0.9, y = h*0.8;
                var a = w*0.05, b = h*0.05;
                var n = 'Pick-List-'+(new Date()).getTime()+'-Window';
                var printingWindow = window.open('','_blank', 'channelmode=no,top='+b+',left='+a+',width='+x+',height='+y+',menubar=no,location=no,resizable=yes,scrollbars=yes,status=no,toolbar=no,titlebar=no');
                printingWindow.name = n;
                var pDoc = printingWindow.document;
                pDoc.body.innerHTML = createPickingSlip(v,(noteText||''),opts);
                var pWinHead = pDoc.getElementsByTagName('HEAD')[0];
                addScriptBySrc('https://cdn.jsdelivr.net/npm/vue/dist/vue.js',pWinHead,function(){
                    addScriptBySrc('https://raw.githack.com/eKoopmans/html2pdf/master/dist/html2pdf.bundle.js',pWinHead,function(){
                        var d = document, x = '';
                        x += 'function printAsPDF(d,fName){';
                        x += '  var pBtnArea = d.getElementById("printingbutton");';
                        x += '  if(pBtnArea) pBtnArea.style.display="none";';
                        x += '  d.body.style.background = "transparent";';
                        x += '  setTimeout(function(){';
                        x += '    html2pdf(d.body,{';
                        x += '      margin: 0,';
                        x += '      filename: fName,';
                        x += '      image: { type: "jpeg", quality: 0.98 },';
                        x += '      html2canvas:  { scale: 2 },';
                        x += '      pagebreak: { mode: "css", before: "", after: ".pagebreak", avoid: ".labelwrapper"},';
                        x += '      jsPDF: {unit: "px", format: [794 , 1123], orientation: "landscape"}';
                        x += '    });';
                        x += '    setTimeout(function(){';
                        x += '      d.body.style.background="#ccc";';
                        x += '      if(pBtnArea) pBtnArea.style.display="block";';
                        x += '    },2400);';
                        x += '  },120);';
                        x += '}';
                        addScriptByNodeText(x,pWinHead);
                    });
                });
            }
            var $editorQuill;
            function clickToGetPrint(v,opts){
                if($editorQuill){
                    //var pNote = d.getElementById('addnote_ifr').contentWindow.document.body;
                    //var noteBody = pNote.innerHTML||'';
                    var noteBody = $editorQuill.root.innerHTML||'';
                    console.log(noteBody);
                    var noteValue = noteBody.replace(/<[^>]*>?/gm,'').replace(/\s+$/g,'');
                    if(noteValue!='') noteValue = noteBody.replace(/\s+$/g,'');
                    //var pNote = d.getElementById('addnote')
                    //var noteValue = (pNote.value).replace(/\s+$/g,'');
                } else {
                    noteValue = '';
                }
                /*
                if(noteValue.split().length>3){
                    if(confirm('There are 3 more lines found in the added note. Maybe some information will be hidden.')!=true) return;
                }
                */
                openPrintWindow(v,noteValue,opts);
                //closeBodyLoading2();
            }
            var bHTML = '', bAttr1 = '<button type="button" style="font-weight:bold;font-size:16px;padding:4px 8px;cursor:pointer;" id=';
            bHTML += bAttr1+'"printpknb">📋 Print Picking Slip with Barcode ✅</button>';
            bHTML += '<br/><br/>';
            bHTML += bAttr1+'"printpkxb">📋 Print Picking Slip without Barcode ❎</button>';
            bHTML += '<br/><br/>';
            bHTML += '<div style="display:inline-block;"><div id="addnote" style="width:100%;height:120px;background:#fff;resize:none;white-space:nowrap;"></div></div>';
            //placeholder="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;... Add note here if have ...... " onblur="if(this.value.replace(/(^\s+|\s+$)/g,&quot;&quot;)==&quot;&quot;){this.style.background=&quot;Gainsboro&quot; } else { this.style.background=&quot;HoneyDew&quot; };" onfocus="this.style.background=&quot;FloralWhite&quot;"
            bHTML += '<div style="margin-top:6px;">「<a target="_blank" href="https://www.w3school.com.cn/html/html_styles.asp">Click to learn about basic style of HTML (CN)</a>」</div>';
            bHTML += '<div style="margin-top:6px;">「<a target="_blank" href="https://www.w3schools.com/html/html_styles.asp">Click to learn about basic style of HTML (EN)</a>」</div>';
            showAlertBodyLoading2(bHTML,'#000',4,closeBodyLoading2,3);
            var pBtn1 = d.getElementById('printpknb'), pBtn2 = d.getElementById('printpkxb');
            pBtn1.onclick = function(){ clickToGetPrint(v,true); };
            pBtn2.onclick = function(){ clickToGetPrint(v); };
            $editorQuill = initializeEditor('addnote');
        }

        var cssTxt = 'label.switch{position:relative;display:inline-block;width:60px;height:34px} label.switch input{opacity:0;width:0;height:0} label.switch span.slider{position:absolute;cursor:pointer;top:0;left:0;right:0;bottom:0;background-color:#ccc;-webkit-transition:.4s;transition:.4s} label.switch span.slider:before{position:absolute;content:"";height:26px;width:26px;left:4px;bottom:4px;background-color:#fff;-webkit-transition:.4s;transition:.4s} label.switch input:checked+.slider{background-color:#2196f3} label.switch input:focus+.slider{box-shadow:0 0 1px #2196f3} label.switch input:checked+.slider:before{-webkit-transform:translateX(26px);-ms-transform:translateX(26px);transform:translateX(26px)} label.switch span.slider.round{border-radius:34px} label.switch span.slider.round:before{border-radius:50%}';
        addStyleByNodeText(cssTxt);

        var pBtn = d.createElement('BUTTON');
        pBtn.type = 'button';
        pBtn.innerHTML = '◀ Print!';
        pBtn.style.cssText = 'position:absolute;top:0;right:0;padding:8px 12px;margin:1px;cursor:pointer;';
        nDiv.appendChild(pBtn);
        pBtn.onclick = printData;
        xArea.onkeyup = function(evt){
            var e = evt||window.event;
            if(e.key=='F9') setTimeout(printData,12);
        }
    }
}
function initializePage_PickingLineData(){
    addLinkCSS('https://FlexxonMartinMa.github.io/quilljs.css');
    var quilljsURL = 'https://FlexxonMartinMa.github.io/quilljs.min.js';
    //quilljsURL = 'https://script.google.com/macros/s/AKfycbyB7KW_gtwu385Zij68Asy8nIQeKSq-KsN7VHP6HKXcnAmSgjbW0hfqqLDKPl_viNvpMA/exec';
    //?akey=1yaNGNIrCKTEHLfMPGnGKeeAz31EhMsSioGmUZzH8f_rCX0un0GDMLx0w
    xhttpSendingRequest({
        //'GET'or'POST'or'PUT'.
        method: 'GET',
        success: function(responsedText,responseXML){
            eval(responsedText);
            console.log('#TMPK::UserJS: Quill JS is loaded!');
        },
        failure: function(failStatus){
            console.warn(failStatus);
        },
        urlsending: quilljsURL,
        //'application/x-www-form-urlencoded' for POST method only.
        content_type: 'text/javascript',
        textparameter: ''
    });
    addScriptBySrc('https://FlexxonMartinMa.github.io/addDataMatrixBarcode.js');
    addScriptBySrc('https://FlexxonMartinMa.github.io/JsBarcode.js');

    var sN = getparameter('ShipmentNumber');
    if(sN) initializePickingAddon();
    setTimeout(function(){
        var d = document;
        var snInput = d.getElementById('ctl00_phF_form_edShipmentNumber_text');
        if(snInput){
            snInput.onchange = function(){
                var v = snInput.value.replace(/\s/g,'');
                var a = d.getElementById('areaforpickingaddonfunction');
                if(v==''){
                    if(a) a.parentNode.removeChild(a);
                } else {
                    if(!a) initializePickingAddon();
                }
            }
        } else {
            console.warn('Input field is not found during initialization!');
        }
    },120);
}
(function(){
    'use strict';
    var screenTimer = setInterval(function(){
        if(typeof __screenID != 'undefined'){
            clearInterval(screenTimer);
            screenTimer=null;
            var sID = __screenID.replace(/\./g,'').toString();
            if(sID == 'SO302000') initializePage_Shipments();
            if(sID == 'GI100118') initializePage_PickingLineData();
        }
    },600);
})();
