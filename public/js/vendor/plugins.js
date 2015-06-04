/*================ BEGIN jquery.nicescroll plagin for custom scrolling ================*/

/* jquery.nicescroll 3.0.0 InuYaksa*2012 MIT http://areaaperta.com/nicescroll */
(function(d){var s=false,w=false,B=5E3,C=2E3,D=function(){var d=document.getElementsByTagName("script"),d=d[d.length-1].src.split("?")[0];return d.split("/").length>0?d.split("/").slice(0,-1).join("/")+"/":""}(),q=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||false,r=window.cancelRequestAnimationFrame||window.webkitCancelRequestAnimationFrame||window.mozCancelRequestAnimationFrame||
    window.oCancelRequestAnimationFrame||window.msCancelRequestAnimationFrame||false,x=false,E=function(){if(x)return x;var d=document.createElement("DIV"),c={haspointerlock:"pointerLockElement"in document||"mozPointerLockElement"in document||"webkitPointerLockElement"in document};c.isopera="opera"in window;c.isopera12=c.isopera&&"getUserMedia"in navigator;c.isie="all"in document&&"attachEvent"in d&&!c.isopera;c.isieold=c.isie&&!("msInterpolationMode"in d.style);c.isie7=c.isie&&!c.isieold&&(!("documentMode"in
document)||document.documentMode==7);c.isie8=c.isie&&"documentMode"in document&&document.documentMode==8;c.isie9=c.isie&&"performance"in window&&document.documentMode>=9;c.isie10=c.isie&&"performance"in window&&document.documentMode>=10;c.isie9mobile=/iemobile.9/i.test(navigator.userAgent);if(c.isie9mobile)c.isie9=false;c.isie7mobile=!c.isie9mobile&&c.isie7&&/iemobile/i.test(navigator.userAgent);c.ismozilla="MozAppearance"in d.style;c.iswebkit="WebkitAppearance"in d.style;c.ischrome="chrome"in window;
    c.ischrome22=c.ischrome&&c.haspointerlock;c.cantouch="ontouchstart"in document.documentElement;c.hasmstouch=window.navigator.msPointerEnabled||false;c.ismac=/^mac$/i.test(navigator.platform);c.isios=c.cantouch&&/iphone|ipad|ipod/i.test(navigator.platform);c.isios4=c.isios&&!("seal"in Object);c.isandroid=/android/i.test(navigator.userAgent);c.trstyle=false;c.hastransform=false;c.hastranslate3d=false;c.transitionstyle=false;c.hastransition=false;c.transitionend=false;for(var h=["transform","msTransform",
        "webkitTransform","MozTransform","OTransform"],i=0;i<h.length;i++)if(typeof d.style[h[i]]!="undefined"){c.trstyle=h[i];break}c.hastransform=c.trstyle!=false;if(c.hastransform)d.style[c.trstyle]="translate3d(1px,2px,3px)",c.hastranslate3d=/translate3d/.test(d.style[c.trstyle]);c.transitionstyle=false;c.prefixstyle="";c.transitionend=false;for(var h="transition,webkitTransition,MozTransition,OTransition,OTransition,msTransition,KhtmlTransition".split(","),b=",-webkit-,-moz-,-o-,-o,-ms-,-khtml-".split(","),
                                                                                                                                                                                                                                                                                                                                                                    o="transitionend,webkitTransitionEnd,transitionend,otransitionend,oTransitionEnd,msTransitionEnd,KhtmlTransitionEnd".split(","),i=0;i<h.length;i++)if(h[i]in d.style){c.transitionstyle=h[i];c.prefixstyle=b[i];c.transitionend=o[i];break}c.hastransition=c.transitionstyle;a:{h=["-moz-grab","-webkit-grab","grab"];if(c.ischrome&&!c.ischrome22||c.isie)h=[];for(i=0;i<h.length;i++)if(b=h[i],d.style.cursor=b,d.style.cursor==b){h=b;break a}h="url(http://www.google.com/intl/en_ALL/mapfiles/openhand.cur),n-resize"}c.cursorgrabvalue=
        h;c.hasmousecapture="setCapture"in d;return x=c},F=function(j,c){function h(f,c,g){c=f.css(c);f=parseFloat(c);return isNaN(f)?(f=p[c]||0,g=f==3?g?b.win.outerHeight()-b.win.innerHeight():b.win.outerWidth()-b.win.innerWidth():1,b.isie8&&f&&(f+=1),g?f:0):f}function i(f,c){var g=0,e=0;if("wheelDeltaY"in f)g=Math.floor(f.wheelDeltaX/2),e=Math.floor(f.wheelDeltaY/2);else{var d=f.detail?f.detail*-1:f.wheelDelta/40;d&&(c?g=Math.floor(d*b.opt.mousescrollstep):e=Math.floor(d*b.opt.mousescrollstep))}g&&(b.scrollmom&&
b.scrollmom.stop(),b.lastdeltax+=g,b.synched("mousewheelx",function(){var f=b.lastdeltax;b.lastdeltax=0;b.rail.drag||b.doScrollLeftBy(f)}));e&&(b.scrollmom&&b.scrollmom.stop(),b.lastdeltay+=e,b.synched("mousewheely",function(){var f=b.lastdeltay;b.lastdeltay=0;b.rail.drag||b.doScrollBy(f)}))}var b=this;this.version="3.0.0";this.name="nicescroll";this.me=c;this.opt={doc:d("body"),win:false,zindex:9E3,cursoropacitymin:0,cursoropacitymax:1,cursorcolor:"#424242",cursorwidth:"5px",cursorborder:"1px solid #fff",
    cursorborderradius:"5px",scrollspeed:60,mousescrollstep:24,touchbehavior:false,hwacceleration:true,usetransition:true,boxzoom:false,dblclickzoom:true,gesturezoom:true,grabcursorenabled:true,autohidemode:true,background:"",iframeautoresize:true,cursorminheight:32,preservenativescrolling:true,railoffset:false,bouncescroll:true,spacebarenabled:true,railpadding:{top:0,right:0,left:0,bottom:0},disableoutline:true,horizrailenabled:true,railalign:"right",railvalign:"bottom",enabletranslate3d:true,enablemousewheel:true,
    enablekeyboard:true,smoothscroll:true,sensitiverail:true};this.opt.snapbackspeed=80;if(j)for(var o in b.opt)typeof j[o]!="undefined"&&(b.opt[o]=j[o]);this.iddoc=(this.doc=b.opt.doc)&&this.doc[0]?this.doc[0].id||"":"";this.ispage=/BODY|HTML/.test(b.opt.win?b.opt.win[0].nodeName:this.doc[0].nodeName);this.haswrapper=b.opt.win!==false;this.win=b.opt.win||(this.ispage?d(window):this.doc);this.docscroll=this.ispage&&!this.haswrapper?d(window):this.win;this.body=d("body");this.iframe=this.isfixed=false;
    this.isiframe=this.doc[0].nodeName=="IFRAME"&&this.win[0].nodeName=="IFRAME";this.istextarea=this.win[0].nodeName=="TEXTAREA";this.forcescreen=false;this.canshowonmouseevent=b.opt.autohidemode!="scroll";this.page=this.view=this.onzoomout=this.onzoomin=this.onscrollcancel=this.onscrollend=this.onscrollstart=this.onclick=this.ongesturezoom=this.onkeypress=this.onmousewheel=this.onmousemove=this.onmouseup=this.onmousedown=false;this.scroll={x:0,y:0};this.scrollratio={x:0,y:0};this.cursorheight=20;this.scrollvaluemax=
        0;this.observer=this.scrollmom=this.scrollrunning=false;do this.id="ascrail"+C++;while(document.getElementById(this.id));this.hasmousefocus=this.hasfocus=this.zoomactive=this.zoom=this.cursorfreezed=this.cursor=this.rail=false;this.visibility=true;this.hidden=this.locked=false;this.cursoractive=true;this.nativescrollingarea=false;this.events=[];this.saved={};this.delaylist={};this.synclist={};this.lastdeltay=this.lastdeltax=0;var e=this.detected=E();this.ishwscroll=(this.canhwscroll=e.hastransform&&
    b.opt.hwacceleration)&&b.haswrapper;this.istouchcapable=false;if(e.cantouch&&e.ischrome&&!e.isios&&!e.isandroid)this.istouchcapable=true,e.cantouch=false;if(e.cantouch&&e.ismozilla&&!e.isios)this.istouchcapable=true,e.cantouch=false;this.delayed=function(f,c,g,e){var d=b.delaylist[f],h=(new Date).getTime();if(!e&&d&&d.tt)return false;d&&d.tt&&clearTimeout(d.tt);if(d&&d.last+g>h&&!d.tt)b.delaylist[f]={last:h+g,tt:setTimeout(function(){b.delaylist[f].tt=0;c.call()},g)};else if(!d||!d.tt)b.delaylist[f]=
    {last:h,tt:0},setTimeout(function(){c.call()},0)};this.synched=function(f,c){b.synclist[f]=c;(function(){if(!b.onsync)q(function(){b.onsync=false;for(f in b.synclist){var c=b.synclist[f];c&&c.call(b);b.synclist[f]=false}}),b.onsync=true})();return f};this.unsynched=function(f){b.synclist[f]&&(b.synclist[f]=false)};this.css=function(f,c){for(var g in c)b.saved.css.push([f,g,f.css(g)]),f.css(g,c[g])};this.scrollTop=function(f){return typeof f=="undefined"?b.getScrollTop():b.setScrollTop(f)};this.scrollLeft=
        function(f){return typeof f=="undefined"?b.getScrollLeft():b.setScrollLeft(f)};BezierClass=function(b,c,g,e,d,h,i){this.st=b;this.ed=c;this.spd=g;this.p1=e||0;this.p2=d||1;this.p3=h||0;this.p4=i||1;this.ts=(new Date).getTime();this.df=this.ed-this.st};BezierClass.prototype={B2:function(b){return 3*b*b*(1-b)},B3:function(b){return 3*b*(1-b)*(1-b)},B4:function(b){return(1-b)*(1-b)*(1-b)},getNow:function(){var b=1-((new Date).getTime()-this.ts)/this.spd,c=this.B2(b)+this.B3(b)+this.B4(b);return b<0?
        this.ed:this.st+Math.round(this.df*c)},update:function(b,c){this.st=this.getNow();this.ed=b;this.spd=c;this.ts=(new Date).getTime();this.df=this.ed-this.st;return this}};if(this.ishwscroll){this.doc.translate={x:0,y:0,tx:"0px",ty:"0px"};e.hastranslate3d&&e.isios&&this.doc.css("-webkit-backface-visibility","hidden");var n=function(){var f=b.doc.css(e.trstyle);return f&&f.substr(0,6)=="matrix"?f.replace(/^.*\((.*)\)$/g,"$1").replace(/px/g,"").split(/, +/):false};this.getScrollTop=function(f){if(!f){if(f=
            n())return f.length==16?-f[13]:-f[5];if(b.timerscroll&&b.timerscroll.bz)return b.timerscroll.bz.getNow()}return b.doc.translate.y};this.getScrollLeft=function(f){if(!f){if(f=n())return f.length==16?-f[12]:-f[4];if(b.timerscroll&&b.timerscroll.bh)return b.timerscroll.bh.getNow()}return b.doc.translate.x};this.notifyScrollEvent=document.createEvent?function(b){var c=document.createEvent("UIEvents");c.initUIEvent("scroll",false,true,window,1);b.dispatchEvent(c)}:document.fireEvent?function(b){var c=
        document.createEventObject();b.fireEvent("onscroll");c.cancelBubble=true}:function(){};e.hastranslate3d&&b.opt.enabletranslate3d?(this.setScrollTop=function(f,c){b.doc.translate.y=f;b.doc.translate.ty=f*-1+"px";b.doc.css(e.trstyle,"translate3d("+b.doc.translate.tx+","+b.doc.translate.ty+",0px)");c||b.notifyScrollEvent(b.win[0])},this.setScrollLeft=function(f,c){b.doc.translate.x=f;b.doc.translate.tx=f*-1+"px";b.doc.css(e.trstyle,"translate3d("+b.doc.translate.tx+","+b.doc.translate.ty+",0px)");c||
    b.notifyScrollEvent(b.win[0])}):(this.setScrollTop=function(f,c){b.doc.translate.y=f;b.doc.translate.ty=f*-1+"px";b.doc.css(e.trstyle,"translate("+b.doc.translate.tx+","+b.doc.translate.ty+")");c||b.notifyScrollEvent(b.win[0])},this.setScrollLeft=function(f,c){b.doc.translate.x=f;b.doc.translate.tx=f*-1+"px";b.doc.css(e.trstyle,"translate("+b.doc.translate.tx+","+b.doc.translate.ty+")");c||b.notifyScrollEvent(b.win[0])})}else this.getScrollTop=function(){return b.docscroll.scrollTop()},this.setScrollTop=
        function(f){return b.docscroll.scrollTop(f)},this.getScrollLeft=function(){return b.docscroll.scrollLeft()},this.setScrollLeft=function(f){return b.docscroll.scrollLeft(f)};this.getTarget=function(b){return!b?false:b.target?b.target:b.srcElement?b.srcElement:false};this.hasParent=function(b,c){if(!b)return false;for(var g=b.target||b.srcElement||b||false;g&&g.id!=c;)g=g.parentNode||false;return g!==false};var p={thin:1,medium:3,thick:5};this.updateScrollBar=function(f){if(b.ishwscroll)b.rail.css({height:b.win.innerHeight()}),
    b.railh&&b.railh.css({width:b.win.innerWidth()});else{var c=b.isfixed?{top:parseFloat(b.win.css("top")),left:parseFloat(b.win.css("left"))}:b.win.offset(),g=c.top,e=c.left;g+=h(b.win,"border-top-width",true);b.win.outerWidth();b.win.innerWidth();e+=b.rail.align?b.win.outerWidth()-h(b.win,"border-right-width")-b.rail.width:h(b.win,"border-left-width");var d=b.opt.railoffset;d&&(d.top&&(g+=d.top),b.rail.align&&d.left&&(e+=d.left));b.locked||b.rail.css({top:g,left:e,height:f?f.h:b.win.innerHeight()});
        b.zoom&&b.zoom.css({top:g+1,left:b.rail.align==1?e-20:e+b.rail.width+4});if(b.railh&&!b.locked)g=c.top,e=c.left,f=b.railh.align?g+h(b.win,"border-top-width",true)+b.win.innerHeight()-b.railh.height:g+h(b.win,"border-top-width",true),e+=h(b.win,"border-left-width"),b.railh.css({top:f,left:e,width:b.railh.width})}};this.doRailClick=function(f,c,g){var e;!(b.rail.drag&&b.rail.drag.pt!=1)&&!b.locked&&!b.rail.drag&&(b.cancelScroll(),b.cancelEvent(f),c?(c=g?b.doScrollLeft:b.doScrollTop,e=g?(f.pageX-b.railh.offset().left-
    b.cursorwidth/2)*b.scrollratio.x:(f.pageY-b.rail.offset().top-b.cursorheight/2)*b.scrollratio.y,c(e)):(c=g?b.doScrollLeftBy:b.doScrollBy,e=g?b.scroll.x:b.scroll.y,f=g?f.pageX-b.railh.offset().left:f.pageY-b.rail.offset().top,g=g?b.view.w:b.view.h,e>=f?c(g):c(-g)))};b.hasanimationframe=q;b.hascancelanimationframe=r;b.hasanimationframe?b.hascancelanimationframe||(r=function(){b.cancelAnimationFrame=true}):(q=function(b){return setTimeout(b,16)},r=clearInterval);this.init=function(){b.saved.css=[];if(e.isie7mobile)return true;
        e.hasmstouch&&b.css(b.ispage?d("html"):b.win,{"-ms-touch-action":"none"});if(!b.ispage||!e.cantouch&&!e.isieold&&!e.isie9mobile){var f=b.docscroll;b.ispage&&(f=b.haswrapper?b.win:b.doc);e.isie9mobile||b.css(f,{"overflow-y":"hidden"});b.ispage&&e.isie7&&(b.doc[0].nodeName=="BODY"?b.css(d("html"),{"overflow-y":"hidden"}):b.doc[0].nodeName=="HTML"&&b.css(d("body"),{"overflow-y":"hidden"}));e.isios&&!b.ispage&&!b.haswrapper&&b.css(d("body"),{"-webkit-overflow-scrolling":"touch"});var c=d(document.createElement("div"));
            c.css({position:"relative",top:0,"float":"right",width:b.opt.cursorwidth,height:"0px","background-color":b.opt.cursorcolor,border:b.opt.cursorborder,"background-clip":"padding-box","-webkit-border-radius":b.opt.cursorborderradius,"-moz-border-radius":b.opt.cursorborderradius,"border-radius":b.opt.cursorborderradius});c.hborder=parseFloat(c.outerHeight()-c.innerHeight());b.cursor=c;var g=d(document.createElement("div"));g.attr("id",b.id);g.attr("class","ascrail");var h,i,j=["left","right"],y;for(y in j)i=j[y],(h=b.opt.railpadding[i])?
                g.css("padding-"+i,h+"px"):b.opt.railpadding[i]=0;g.append(c);g.width=Math.max(parseFloat(b.opt.cursorwidth),c.outerWidth())+b.opt.railpadding.left+b.opt.railpadding.right;g.css({width:g.width+"px",zIndex:b.ispage?b.opt.zindex:b.opt.zindex+2,background:b.opt.background});g.visibility=true;g.scrollable=true;g.align=b.opt.railalign=="left"?0:1;b.rail=g;c=b.rail.drag=false;if(b.opt.boxzoom&&!b.ispage&&!e.isieold&&(c=document.createElement("div"),b.bind(c,"click",b.doZoom),b.zoom=d(c),b.zoom.css({cursor:"pointer",
                    "z-index":b.opt.zindex,backgroundImage:"url("+D+"zoomico.png)",height:18,width:18,backgroundPosition:"0px 0px"}),b.opt.dblclickzoom&&b.bind(b.win,"dblclick",b.doZoom),e.cantouch&&b.opt.gesturezoom))b.ongesturezoom=function(c){c.scale>1.5&&b.doZoomIn(c);c.scale<0.8&&b.doZoomOut(c);return b.cancelEvent(c)},b.bind(b.win,"gestureend",b.ongesturezoom);b.railh=false;if(b.opt.horizrailenabled){b.css(f,{"overflow-x":"hidden"});c=d(document.createElement("div"));c.css({position:"relative",top:0,height:b.opt.cursorwidth,
                width:"0px","background-color":b.opt.cursorcolor,border:b.opt.cursorborder,"background-clip":"padding-box","-webkit-border-radius":b.opt.cursorborderradius,"-moz-border-radius":b.opt.cursorborderradius,"border-radius":b.opt.cursorborderradius});c.wborder=parseFloat(c.outerWidth()-c.innerWidth());b.cursorh=c;var k=d(document.createElement("div"));k.attr("id",b.id+"-hr");k.height=1+Math.max(parseFloat(b.opt.cursorwidth),c.outerHeight());k.css({height:k.height+"px",zIndex:b.ispage?b.opt.zindex:b.opt.zindex+
            2,background:b.opt.background});k.append(c);k.visibility=true;k.scrollable=true;k.align=b.opt.railvalign=="top"?0:1;b.railh=k;b.railh.drag=false}b.ispage?(g.css({position:"fixed",top:"0px",height:"100%"}),g.align?g.css({right:"0px"}):g.css({left:"0px"}),b.body.append(g),b.railh&&(k.css({position:"fixed",left:"0px",width:"100%"}),k.align?k.css({bottom:"0px"}):k.css({top:"0px"}),b.body.append(k))):(b.ishwscroll?(b.win.css("position")=="static"&&b.css(b.win,{position:"relative"}),f=b.win[0].nodeName==
            "HTML"?b.body:b.win,b.zoom&&(b.zoom.css({position:"absolute",top:1,right:0,"margin-right":g.width+4}),f.append(b.zoom)),g.css({position:"absolute",top:0}),g.align?g.css({right:0}):g.css({left:0}),f.append(g),k&&(k.css({position:"absolute",left:0,bottom:0}),k.align?k.css({bottom:0}):k.css({top:0}),f.append(k))):(b.isfixed=b.win.css("position")=="fixed",f=b.isfixed?"fixed":"absolute",g.css({position:f}),b.zoom&&b.zoom.css({position:f}),b.updateScrollBar(),b.body.append(g),b.zoom&&b.body.append(b.zoom),
            b.railh&&(k.css({position:f}),b.body.append(k))),e.isios&&b.css(b.win,{"-webkit-tap-highlight-color":"rgba(0,0,0,0)","-webkit-touch-callout":"none"}),e.isie&&b.opt.disableoutline&&b.win.attr("hideFocus","true"),e.iswebkit&&b.opt.disableoutline&&b.win.css({outline:"none"}));if(b.opt.autohidemode===false)b.autohidedom=false;else if(b.opt.autohidemode===true){if(b.autohidedom=d().add(b.rail),b.railh)b.autohidedom=b.autohidedom.add(b.railh)}else if(b.opt.autohidemode=="scroll"){if(b.autohidedom=d().add(b.rail),
                    b.railh)b.autohidedom=b.autohidedom.add(b.railh)}else if(b.opt.autohidemode=="cursor"){if(b.autohidedom=d().add(b.cursor),b.railh)b.autohidedom=b.autohidedom.add(b.railh.cursor)}else if(b.opt.autohidemode=="hidden")b.autohidedom=false,b.hide(),b.locked=false;if(e.isie9mobile)b.scrollmom=new z(b),b.onmangotouch=function(){var c=b.getScrollTop(),f=b.getScrollLeft();if(c==b.scrollmom.lastscrolly&&f==b.scrollmom.lastscrollx)return true;var g=c-b.mangotouch.sy,e=f-b.mangotouch.sx;if(Math.round(Math.sqrt(Math.pow(e,
                    2)+Math.pow(g,2)))!=0){var l=g<0?-1:1,d=e<0?-1:1,h=+new Date;b.mangotouch.lazy&&clearTimeout(b.mangotouch.lazy);if(h-b.mangotouch.tm>80||b.mangotouch.dry!=l||b.mangotouch.drx!=d)b.scrollmom.stop(),b.scrollmom.reset(f,c),b.mangotouch.sy=c,b.mangotouch.ly=c,b.mangotouch.sx=f,b.mangotouch.lx=f,b.mangotouch.dry=l,b.mangotouch.drx=d,b.mangotouch.tm=h;else if(b.scrollmom.stop(),b.scrollmom.update(b.mangotouch.sx-e,b.mangotouch.sy-g),b.mangotouch.tm=h,g=Math.max(Math.abs(b.mangotouch.ly-c),Math.abs(b.mangotouch.lx-
                f)),b.mangotouch.ly=c,b.mangotouch.lx=f,g>2)b.mangotouch.lazy=setTimeout(function(){b.mangotouch.lazy=false;b.mangotouch.dry=0;b.mangotouch.drx=0;b.mangotouch.tm=0;b.scrollmom.doMomentum(30)},100)}},g=b.getScrollTop(),k=b.getScrollLeft(),b.mangotouch={sy:g,ly:g,dry:0,sx:k,lx:k,drx:0,lazy:false,tm:0},b.bind(b.docscroll,"scroll",b.onmangotouch);else{if(e.cantouch||b.istouchcapable||b.opt.touchbehavior||e.hasmstouch){b.scrollmom=new z(b);b.ontouchstart=function(c){if(c.pointerType&&c.pointerType!=2)return false;
                if(!b.locked){if(e.hasmstouch)for(var f=c.target?c.target:false;f;){var g=d(f).getNiceScroll();if(g.length>0&&g[0].me==b.me)break;if(g.length>0)return false;if(f.nodeName=="DIV"&&f.id==b.id)break;f=f.parentNode?f.parentNode:false}b.cancelScroll();if((f=b.getTarget(c))&&/INPUT/i.test(f.nodeName)&&/range/i.test(f.type))return b.stopPropagation(c);if(b.forcescreen)g=c,c={original:c.original?c.original:c},c.clientX=g.screenX,c.clientY=g.screenY;b.rail.drag={x:c.clientX,y:c.clientY,sx:b.scroll.x,sy:b.scroll.y,
                    st:b.getScrollTop(),sl:b.getScrollLeft(),pt:2};b.opt.touchbehavior&&b.isiframe&&e.isie&&(g=b.win.position(),b.rail.drag.x+=g.left,b.rail.drag.y+=g.top);b.hasmoving=false;b.lastmouseup=false;b.scrollmom.reset(c.clientX,c.clientY);if(!e.cantouch&&!this.istouchcapable&&!e.hasmstouch){if(!f||!/INPUT|SELECT|TEXTAREA/i.test(f.nodeName))return!b.ispage&&e.hasmousecapture&&f.setCapture(),b.cancelEvent(c);if(/SUBMIT|CANCEL|BUTTON/i.test(d(f).attr("type")))pc={tg:f,click:false},b.preventclick=pc}}};b.ontouchend=
                function(c){if(c.pointerType&&c.pointerType!=2)return false;if(b.rail.drag&&b.rail.drag.pt==2&&(b.scrollmom.doMomentum(),b.rail.drag=false,b.hasmoving&&(b.hasmoving=false,b.lastmouseup=true,b.hideCursor(),e.hasmousecapture&&document.releaseCapture(),!e.cantouch)))return b.cancelEvent(c)};var o=b.opt.touchbehavior&&b.isiframe&&!e.hasmousecapture;b.ontouchmove=function(c,f){if(c.pointerType&&c.pointerType!=2)return false;if(b.rail.drag&&b.rail.drag.pt==2){if(e.cantouch&&typeof c.original=="undefined")return true;
                b.hasmoving=true;if(b.preventclick&&!b.preventclick.click)b.preventclick.click=b.preventclick.tg.onclick||false,b.preventclick.tg.onclick=b.onpreventclick;if(b.forcescreen){var g=c,c={original:c.original?c.original:c};c.clientX=g.screenX;c.clientY=g.screenY}g=ofy=0;if(o&&!f){var l=b.win.position(),g=-l.left;ofy=-l.top}var d=c.clientY+ofy,h=b.rail.drag.st-(d-b.rail.drag.y);if(b.ishwscroll&&b.opt.bouncescroll)h<0?h=Math.round(h/2):h>b.page.maxh&&(h=b.page.maxh+Math.round((h-b.page.maxh)/2));else if(h<
                    0&&(d=h=0),h>b.page.maxh)h=b.page.maxh,d=0;var i=c.clientX+g;if(b.railh&&b.railh.scrollable){var m=b.rail.drag.sl-(i-b.rail.drag.x);if(b.ishwscroll&&b.opt.bouncescroll)m<0?m=Math.round(m/2):m>b.page.maxw&&(m=b.page.maxw+Math.round((m-b.page.maxw)/2));else if(m<0&&(i=m=0),m>b.page.maxw)m=b.page.maxw,i=0}b.synched("touchmove",function(){b.rail.drag&&b.rail.drag.pt==2&&(b.prepareTransition&&b.prepareTransition(0),b.rail.scrollable&&b.setScrollTop(h),b.scrollmom.update(i,d),b.railh&&b.railh.scrollable?
                    (b.setScrollLeft(m),b.showCursor(h,m)):b.showCursor(h),e.isie10&&document.selection.clear())});return b.cancelEvent(c)}}}e.cantouch||b.opt.touchbehavior?(b.onpreventclick=function(c){if(b.preventclick)return b.preventclick.tg.onclick=b.preventclick.click,b.preventclick=false,b.cancelEvent(c)},b.onmousedown=b.ontouchstart,b.onmouseup=b.ontouchend,b.onclick=e.isios?false:function(c){return b.lastmouseup?(b.lastmouseup=false,b.cancelEvent(c)):true},b.onmousemove=b.ontouchmove,e.cursorgrabvalue&&(b.css(b.ispage?
                b.doc:b.win,{cursor:e.cursorgrabvalue}),b.css(b.rail,{cursor:e.cursorgrabvalue}))):(b.onmousedown=function(c,f){if(!(b.rail.drag&&b.rail.drag.pt!=1)){if(b.locked)return b.cancelEvent(c);b.cancelScroll();b.rail.drag={x:c.clientX,y:c.clientY,sx:b.scroll.x,sy:b.scroll.y,pt:1,hr:!!f};var g=b.getTarget(c);!b.ispage&&e.hasmousecapture&&g.setCapture();if(b.isiframe&&!e.hasmousecapture)b.saved.csspointerevents=b.doc.css("pointer-events"),b.css(b.doc,{"pointer-events":"none"});return b.cancelEvent(c)}},b.onmouseup=
                function(c){if(b.rail.drag&&(e.hasmousecapture&&document.releaseCapture(),b.isiframe&&!e.hasmousecapture&&b.doc.css("pointer-events",b.saved.csspointerevents),b.rail.drag.pt==1))return b.rail.drag=false,b.cancelEvent(c)},b.onmousemove=function(c){if(b.rail.drag){if(b.rail.drag.pt==1){if(e.ischrome&&c.which==0)return b.onmouseup(c);b.cursorfreezed=true;if(b.rail.drag.hr){b.scroll.x=b.rail.drag.sx+(c.clientX-b.rail.drag.x);if(b.scroll.x<0)b.scroll.x=0;var f=b.scrollvaluemaxw;if(b.scroll.x>f)b.scroll.x=
                f}else{b.scroll.y=b.rail.drag.sy+(c.clientY-b.rail.drag.y);if(b.scroll.y<0)b.scroll.y=0;f=b.scrollvaluemax;if(b.scroll.y>f)b.scroll.y=f}b.synched("mousemove",function(){b.rail.drag&&b.rail.drag.pt==1&&(b.showCursor(),b.rail.drag.hr?b.doScrollLeft(Math.round(b.scroll.x*b.scrollratio.x)):b.doScrollTop(Math.round(b.scroll.y*b.scrollratio.y)))});return b.cancelEvent(c)}}else b.checkarea=true});(e.cantouch||b.opt.touchbehavior)&&b.bind(b.win,"mousedown",b.onmousedown);e.hasmstouch&&(b.css(b.rail,{"-ms-touch-action":"none"}),
                b.css(b.cursor,{"-ms-touch-action":"none"}),b.bind(b.win,"MSPointerDown",b.ontouchstart),b.bind(document,"MSPointerUp",b.ontouchend),b.bind(document,"MSPointerMove",b.ontouchmove),b.bind(b.cursor,"MSGestureHold",function(b){b.preventDefault()}),b.bind(b.cursor,"contextmenu",function(b){b.preventDefault()}));this.istouchcapable&&(b.bind(b.win,"touchstart",b.ontouchstart),b.bind(document,"touchend",b.ontouchend),b.bind(document,"touchmove",b.ontouchmove));b.bind(b.cursor,"mousedown",b.onmousedown);
                b.bind(b.cursor,"mouseup",b.onmouseup);b.railh&&(b.bind(b.cursorh,"mousedown",function(c){b.onmousedown(c,true)}),b.bind(b.cursorh,"mouseup",function(c){if(!(b.rail.drag&&b.rail.drag.pt==2))return b.rail.drag=false,b.hasmoving=false,b.hideCursor(),e.hasmousecapture&&document.releaseCapture(),b.cancelEvent(c)}));b.bind(document,"mouseup",b.onmouseup);e.hasmousecapture&&b.bind(b.win,"mouseup",b.onmouseup);b.bind(document,"mousemove",b.onmousemove);b.onclick&&b.bind(document,"click",b.onclick);!e.cantouch&&
                !b.opt.touchbehavior&&(b.rail.mouseenter(function(){b.canshowonmouseevent&&b.showCursor();b.rail.active=true}),b.rail.mouseleave(function(){b.rail.active=false;b.rail.drag||b.hideCursor()}),b.opt.sensitiverail&&(b.rail.click(function(c){b.doRailClick(c,false,false)}),b.rail.dblclick(function(c){b.doRailClick(c,true,false)}),b.cursor.click(function(c){b.cancelEvent(c)}),b.cursor.dblclick(function(c){b.cancelEvent(c)})),b.railh&&(b.railh.mouseenter(function(){b.canshowonmouseevent&&b.showCursor();b.rail.active=
                    true}),b.railh.mouseleave(function(){b.rail.active=false;b.rail.drag||b.hideCursor()})),b.zoom&&(b.zoom.mouseenter(function(){b.canshowonmouseevent&&b.showCursor();b.rail.active=true}),b.zoom.mouseleave(function(){b.rail.active=false;b.rail.drag||b.hideCursor()})));b.opt.enablemousewheel&&(b.isiframe||b.bind(e.isie&&b.ispage?document:b.docscroll,"mousewheel",b.onmousewheel),b.bind(b.rail,"mousewheel",b.onmousewheel),b.railh&&b.bind(b.railh,"mousewheel",b.onmousewheelhr));!b.ispage&&!e.cantouch&&!/HTML|BODY/.test(b.win[0].nodeName)&&
                (b.win.attr("tabindex")||b.win.attr({tabindex:B++}),b.win.focus(function(c){s=b.getTarget(c).id||true;b.hasfocus=true;b.canshowonmouseevent&&b.noticeCursor()}),b.win.blur(function(){s=false;b.hasfocus=false}),b.win.mouseenter(function(c){w=b.getTarget(c).id||true;b.hasmousefocus=true;b.canshowonmouseevent&&b.noticeCursor()}),b.win.mouseleave(function(){w=false;b.hasmousefocus=false}))}b.onkeypress=function(c){if(b.locked&&b.page.maxh==0)return true;var c=c?c:window.e,f=b.getTarget(c);if(f&&/INPUT|TEXTAREA|SELECT|OPTION/.test(f.nodeName)&&
                (!f.getAttribute("type")&&!f.type||!/submit|button|cancel/i.tp))return true;if(b.hasfocus||b.hasmousefocus&&!s||b.ispage&&!s&&!w){var f=c.keyCode,g=c.ctrlKey||false;if(b.locked&&f!=27)return b.cancelEvent(c);var e=false;switch(f){case 38:case 63233:b.doScrollBy(72);e=true;break;case 40:case 63235:b.doScrollBy(-72);e=true;break;case 37:case 63232:b.railh&&(g?b.doScrollLeft(0):b.doScrollLeftBy(72),e=true);break;case 39:case 63234:b.railh&&(g?b.doScrollLeft(b.page.maxw):b.doScrollLeftBy(-72),e=true);
                break;case 33:case 63276:b.doScrollBy(b.view.h);e=true;break;case 34:case 63277:b.doScrollBy(-b.view.h);e=true;break;case 36:case 63273:b.railh&&g?b.doScrollPos(0,0):b.doScrollTo(0);e=true;break;case 35:case 63275:b.railh&&g?b.doScrollPos(b.page.maxw,b.page.maxh):b.doScrollTo(b.page.maxh);e=true;break;case 32:b.opt.spacebarenabled&&(b.doScrollBy(-b.view.h),e=true);break;case 27:b.zoomactive&&(b.doZoom(),e=true)}if(e)return b.cancelEvent(c)}};b.opt.enablekeyboard&&b.bind(document,e.isopera&&!e.isopera12?
                "keypress":"keydown",b.onkeypress);b.bind(window,"resize",b.resize);b.bind(window,"orientationchange",b.resize);b.bind(window,"load",b.resize);if(e.ischrome&&!b.ispage&&!b.haswrapper){var n=b.win.attr("style"),g=parseFloat(b.win.css("width"))+1;b.win.css("width",g);b.synched("chromefix",function(){b.win.attr("style",n)})}b.onAttributeChange=function(){b.lazyResize()};if(!b.ispage&&!b.haswrapper)"WebKitMutationObserver"in window?(b.observer=new WebKitMutationObserver(function(c){c.forEach(b.onAttributeChange)}),
                b.observer.observe(b.win[0],{attributes:true,subtree:false})):(b.bind(b.win,e.isie&&!e.isie9?"propertychange":"DOMAttrModified",b.onAttributeChange),e.isie9&&b.win[0].attachEvent("onpropertychange",b.onAttributeChange));!b.ispage&&b.opt.boxzoom&&b.bind(window,"resize",b.resizeZoom);b.istextarea&&b.bind(b.win,"mouseup",b.resize);b.resize()}if(this.doc[0].nodeName=="IFRAME"){var A=function(){b.iframexd=false;try{var c="contentDocument"in this?this.contentDocument:this.contentWindow.document}catch(f){b.iframexd=
            true,c=false}if(b.iframexd)return"console"in window&&console.log("NiceScroll error: policy restriced iframe"),true;b.forcescreen=true;if(b.isiframe)b.iframe={doc:d(c),html:b.doc.contents().find("html")[0],body:b.doc.contents().find("body")[0]},b.getContentSize=function(){return{w:Math.max(b.iframe.html.scrollWidth,b.iframe.body.scrollWidth),h:Math.max(b.iframe.html.scrollHeight,b.iframe.body.scrollHeight)}},b.docscroll=d(b.iframe.body);if(!e.isios&&b.opt.iframeautoresize&&!b.isiframe){b.win.scrollTop(0);
            b.doc.height("");var g=Math.max(c.getElementsByTagName("html")[0].scrollHeight,c.body.scrollHeight);b.doc.height(g)}b.resize();e.isie7&&b.css(d(b.iframe.html),{"overflow-y":"hidden"});b.css(d(b.iframe.body),{"overflow-y":"hidden"});"contentWindow"in this?b.bind(this.contentWindow,"scroll",b.onscroll):b.bind(c,"scroll",b.onscroll);b.opt.enablemousewheel&&b.bind(c,"mousewheel",b.onmousewheel);b.opt.enablekeyboard&&b.bind(c,e.isopera?"keypress":"keydown",b.onkeypress);if(e.cantouch||b.opt.touchbehavior)b.bind(c,
            "mousedown",b.onmousedown),b.bind(c,"mousemove",function(c){b.onmousemove(c,true)}),e.cursorgrabvalue&&b.css(d(c.body),{cursor:e.cursorgrabvalue});b.bind(c,"mouseup",b.onmouseup);b.zoom&&(b.opt.dblclickzoom&&b.bind(c,"dblclick",b.doZoom),b.ongesturezoom&&b.bind(c,"gestureend",b.ongesturezoom))};this.doc[0].readyState&&this.doc[0].readyState=="complete"&&setTimeout(function(){A.call(b.doc[0],false)},500);b.bind(this.doc,"load",A)}};this.showCursor=function(c,e){if(b.cursortimeout)clearTimeout(b.cursortimeout),
        b.cursortimeout=0;if(b.rail){if(b.autohidedom)b.autohidedom.stop().css({opacity:b.opt.cursoropacitymax}),b.cursoractive=true;if(typeof c!="undefined"&&c!==false)b.scroll.y=Math.round(c*1/b.scrollratio.y);if(typeof e!="undefined")b.scroll.x=Math.round(e*1/b.scrollratio.x);b.cursor.css({height:b.cursorheight,top:b.scroll.y});if(b.cursorh)!b.rail.align&&b.rail.visibility?b.cursorh.css({width:b.cursorwidth,left:b.scroll.x+b.rail.width}):b.cursorh.css({width:b.cursorwidth,left:b.scroll.x}),b.cursoractive=
        true;b.zoom&&b.zoom.stop().css({opacity:b.opt.cursoropacitymax})}};this.hideCursor=function(c){if(!b.cursortimeout&&b.rail&&b.autohidedom)b.cursortimeout=setTimeout(function(){if(!b.rail.active||!b.showonmouseevent)b.autohidedom.stop().animate({opacity:b.opt.cursoropacitymin}),b.zoom&&b.zoom.stop().animate({opacity:b.opt.cursoropacitymin}),b.cursoractive=false;b.cursortimeout=0},c||400)};this.noticeCursor=function(c,e,g){b.showCursor(e,g);b.rail.active||b.hideCursor(c)};this.getContentSize=b.ispage?
        function(){return{w:Math.max(document.body.scrollWidth,document.documentElement.scrollWidth),h:Math.max(document.body.scrollHeight,document.documentElement.scrollHeight)}}:b.haswrapper?function(){return{w:b.doc.outerWidth()+parseInt(b.win.css("paddingLeft"))+parseInt(b.win.css("paddingRight")),h:b.doc.outerHeight()+parseInt(b.win.css("paddingTop"))+parseInt(b.win.css("paddingBottom"))}}:function(){return{w:b.docscroll[0].scrollWidth,h:b.docscroll[0].scrollHeight}};this.onResize=function(c,e){if(!b.win)return false;
        if(!b.haswrapper&&!b.ispage)if(b.win.css("display")=="none")return b.visibility&&b.hideRail().hideRailHr(),false;else!b.hidden&&!b.visibility&&b.showRail().showRailHr();var g=b.page.maxh,d=b.page.maxw,h=b.view.w;b.view={w:b.ispage?b.win.width():parseInt(b.win[0].clientWidth),h:b.ispage?b.win.height():parseInt(b.win[0].clientHeight)};b.page=e?e:b.getContentSize();b.page.maxh=Math.max(0,b.page.h-b.view.h);b.page.maxw=Math.max(0,b.page.w-b.view.w);if(b.page.maxh==g&&b.page.maxw==d&&b.view.w==h)if(b.ispage)return b;
        else{g=b.win.offset();if(b.lastposition&&(d=b.lastposition,d.top==g.top&&d.left==g.left))return b;b.lastposition=g}b.page.maxh==0?(b.hideRail(),b.scrollvaluemax=0,b.scroll.y=0,b.scrollratio.y=0,b.cursorheight=0,b.setScrollTop(0),b.rail.scrollable=false):b.rail.scrollable=true;b.page.maxw==0?(b.hideRailHr(),b.scrollvaluemaxw=0,b.scroll.x=0,b.scrollratio.x=0,b.cursorwidth=0,b.setScrollLeft(0),b.railh.scrollable=false):b.railh.scrollable=true;b.locked=b.page.maxh==0&&b.page.maxw==0;if(b.locked)return b.ispage||
        b.updateScrollBar(b.view),false;!b.hidden&&!b.visibility?b.showRail().showRailHr():!b.hidden&&!b.railh.visibility&&b.showRailHr();b.istextarea&&b.win.css("resize")&&b.win.css("resize")!="none"&&(b.view.h-=20);b.ispage||b.updateScrollBar(b.view);b.cursorheight=Math.min(b.view.h,Math.round(b.view.h*(b.view.h/b.page.h)));b.cursorheight=Math.max(b.opt.cursorminheight,b.cursorheight);b.cursorwidth=Math.min(b.view.w,Math.round(b.view.w*(b.view.w/b.page.w)));b.cursorwidth=Math.max(b.opt.cursorminheight,
            b.cursorwidth);b.scrollvaluemax=b.view.h-b.cursorheight-b.cursor.hborder;if(b.railh)b.railh.width=b.page.maxh>0?b.view.w-b.rail.width:b.view.w,b.scrollvaluemaxw=b.railh.width-b.cursorwidth-b.cursorh.wborder;b.scrollratio={x:b.page.maxw/b.scrollvaluemaxw,y:b.page.maxh/b.scrollvaluemax};b.getScrollTop()>b.page.maxh?b.doScroll(b.page.maxh):(b.scroll.y=Math.round(b.getScrollTop()*(1/b.scrollratio.y)),b.scroll.x=Math.round(b.getScrollLeft()*(1/b.scrollratio.x)),b.cursoractive&&b.noticeCursor());b.scroll.y&&
        b.getScrollTop()==0&&b.doScrollTo(Math.floor(b.scroll.y*b.scrollratio.y));return b};this.resize=function(){b.delayed("resize",b.onResize,30);return b};this.lazyResize=function(){b.delayed("resize",b.resize,250)};this._bind=function(c,e,g,d){b.events.push({e:c,n:e,f:g,b:d});c.addEventListener?c.addEventListener(e,g,d||false):c.attachEvent?c.attachEvent("on"+e,g):c["on"+e]=g};this.bind=function(c,d,g,h){var i="jquery"in c?c[0]:c;i.addEventListener?(e.cantouch&&/mouseup|mousedown|mousemove/.test(d)&&
    b._bind(i,d=="mousedown"?"touchstart":d=="mouseup"?"touchend":"touchmove",function(b){if(b.touches){if(b.touches.length<2){var c=b.touches.length?b.touches[0]:b;c.original=b;g.call(this,c)}}else if(b.changedTouches)c=b.changedTouches[0],c.original=b,g.call(this,c)},h||false),b._bind(i,d,g,h||false),d=="mousewheel"&&b._bind(i,"DOMMouseScroll",g,h||false),e.cantouch&&d=="mouseup"&&b._bind(i,"touchcancel",g,h||false)):b._bind(i,d,function(c){if((c=c||window.event||false)&&c.srcElement)c.target=c.srcElement;
        return g.call(i,c)===false||h===false?b.cancelEvent(c):true})};this._unbind=function(b,c,g,e){b.removeEventListener?b.removeEventListener(c,g,e):b.detachEvent?b.detachEvent("on"+c,g):b["on"+c]=false};this.unbindAll=function(){for(var c=0;c<b.events.length;c++){var e=b.events[c];b._unbind(e.e,e.n,e.f,e.b)}};this.cancelEvent=function(b){b=b.original?b.original:b?b:window.event||false;if(!b)return false;b.preventDefault&&b.preventDefault();b.stopPropagation&&b.stopPropagation();b.preventManipulation&&
    b.preventManipulation();b.cancelBubble=true;b.cancel=true;return b.returnValue=false};this.stopPropagation=function(b){b=b.original?b.original:b?b:window.event||false;if(!b)return false;if(b.stopPropagation)return b.stopPropagation();if(b.cancelBubble)b.cancelBubble=true;return false};this.showRail=function(){if(b.page.maxh!=0&&(b.ispage||b.win.css("display")!="none"))b.visibility=true,b.rail.visibility=true,b.rail.css("display","block");return b};this.showRailHr=function(){if(!b.railh)return b;if(b.page.maxw!=
        0&&(b.ispage||b.win.css("display")!="none"))b.railh.visibility=true,b.railh.css("display","block");return b};this.hideRail=function(){b.visibility=false;b.rail.visibility=false;b.rail.css("display","none");return b};this.hideRailHr=function(){if(!b.railh)return b;b.railh.visibility=false;b.railh.css("display","none");return b};this.show=function(){b.hidden=false;b.locked=false;return b.showRail().showRailHr()};this.hide=function(){b.hidden=true;b.locked=true;return b.hideRail().hideRailHr()};this.remove=
        function(){b.doZoomOut();b.unbindAll();b.observer!==false&&b.observer.disconnect();b.events=[];if(b.cursor)b.cursor.remove(),b.cursor=null;if(b.cursorh)b.cursorh.remove(),b.cursorh=null;if(b.rail)b.rail.remove(),b.rail=null;if(b.railh)b.railh.remove(),b.railh=null;if(b.zoom)b.zoom.remove(),b.zoom=null;for(var c=0;c<b.saved.css.length;c++){var e=b.saved.css[c];e[0].css(e[1],typeof e[2]=="undefined"?"":e[2])}b.saved=false;b.me.data("__nicescroll","");b.me=null;b.doc=null;b.docscroll=null;b.win=null;
            return b};this.scrollstart=function(c){this.onscrollstart=c;return b};this.scrollend=function(c){this.onscrollend=c;return b};this.scrollcancel=function(c){this.onscrollcancel=c;return b};this.zoomin=function(c){this.onzoomin=c;return b};this.zoomout=function(c){this.onzoomout=c;return b};this.isScrollable=function(b){for(b=b.target?b.target:b;b&&b.nodeType==1&&!/BODY|HTML/.test(b.nodeName);){var c=d(b);if(/scroll|auto/.test(c.css("overflowY")||c.css("overflowX")||c.css("overflow")||""))return b.clientHeight!=
        b.scrollHeight;b=b.parentNode?b.parentNode:false}return false};this.onmousewheel=function(c){if(b.locked)return true;if(!b.rail.scrollable)return b.railh&&b.railh.scrollable?b.onmousewheelhr(c):true;if(b.opt.preservenativescrolling&&b.checkarea)b.checkarea=false,b.nativescrollingarea=b.isScrollable(c);if(b.nativescrollingarea)return true;if(b.locked)return b.cancelEvent(c);if(b.rail.drag)return b.cancelEvent(c);i(c,false);return b.cancelEvent(c)};this.onmousewheelhr=function(c){if(b.locked||!b.railh.scrollable)return true;
        if(b.opt.preservenativescrolling&&b.checkarea)b.checkarea=false,b.nativescrollingarea=b.isScrollable(c);if(b.nativescrollingarea)return true;if(b.locked)return b.cancelEvent(c);if(b.rail.drag)return b.cancelEvent(c);i(c,true);return b.cancelEvent(c)};this.stop=function(){b.cancelScroll();b.scrollmon&&b.scrollmon.stop();b.cursorfreezed=false;b.scroll.y=Math.round(b.getScrollTop()*(1/b.scrollratio.y));b.noticeCursor();return b};this.getTransitionSpeed=function(c){var e=Math.round(b.opt.scrollspeed*
    10),c=Math.min(e,Math.round(c/20*b.opt.scrollspeed));return c>20?c:0};b.opt.smoothscroll?b.ishwscroll&&e.hastransition&&b.opt.usetransition?(this.prepareTransition=function(c,d){var g=d?c>20?c:0:b.getTransitionSpeed(c),h=g?e.prefixstyle+"transform "+g+"ms ease-out":"";if(!b.lasttransitionstyle||b.lasttransitionstyle!=h)b.lasttransitionstyle=h,b.doc.css(e.transitionstyle,h);return g},this.doScrollLeft=function(c,e){var g=b.scrollrunning?b.newscrolly:b.getScrollTop();b.doScrollPos(c,g,e)},this.doScrollTop=
        function(c,e){var g=b.scrollrunning?b.newscrollx:b.getScrollLeft();b.doScrollPos(g,c,e)},this.doScrollPos=function(c,d,g){var h=b.getScrollTop(),i=b.getScrollLeft();((b.newscrolly-h)*(d-h)<0||(b.newscrollx-i)*(c-i)<0)&&b.cancelScroll();b.newscrolly=d;b.newscrollx=c;b.newscrollspeed=g||false;if(b.timer)return false;b.timer=setTimeout(function(){var g=b.getScrollTop(),h=b.getScrollLeft(),i,j;i=c-h;j=d-g;i=Math.round(Math.sqrt(Math.pow(i,2)+Math.pow(j,2)));i=b.prepareTransition(b.newscrollspeed?b.newscrollspeed:
        i);b.timerscroll&&b.timerscroll.tm&&clearInterval(b.timerscroll.tm);if(i>0){!b.scrollrunning&&b.onscrollstart&&b.onscrollstart.call(b,{type:"scrollstart",current:{x:h,y:g},request:{x:c,y:d},end:{x:b.newscrollx,y:b.newscrolly},speed:i});if(e.transitionend){if(!b.scrollendtrapped)b.scrollendtrapped=true,b.bind(b.doc,e.transitionend,b.onScrollEnd,false)}else b.scrollendtrapped&&clearTimeout(b.scrollendtrapped),b.scrollendtrapped=setTimeout(b.onScrollEnd,i);b.timerscroll={bz:new BezierClass(g,b.newscrolly,
        i,0,0,0.58,1),bh:new BezierClass(h,b.newscrollx,i,0,0,0.58,1)};if(!b.cursorfreezed)b.timerscroll.tm=setInterval(function(){b.showCursor(b.getScrollTop(),b.getScrollLeft())},60)}b.synched("doScroll-set",function(){b.timer=0;if(b.scrollendtrapped)b.scrollrunning=true;b.setScrollTop(b.newscrolly);b.setScrollLeft(b.newscrollx);if(!b.scrollendtrapped)b.onScrollEnd()})},50)},this.cancelScroll=function(){if(!b.scrollendtrapped)return true;var c=b.getScrollTop(),d=b.getScrollLeft();b.scrollrunning=false;
        e.transitionend||clearTimeout(e.transitionend);b.scrollendtrapped=false;b._unbind(b.doc,e.transitionend,b.onScrollEnd);b.prepareTransition(0);b.setScrollTop(c);b.railh&&b.setScrollLeft(d);b.timerscroll&&b.timerscroll.tm&&clearInterval(b.timerscroll.tm);b.timerscroll=false;b.cursorfreezed=false;b.showCursor(c,d);return b},this.onScrollEnd=function(){b.scrollendtrapped&&b._unbind(b.doc,e.transitionend,b.onScrollEnd);b.scrollendtrapped=false;b.prepareTransition(0);b.timerscroll&&b.timerscroll.tm&&clearInterval(b.timerscroll.tm);
        b.timerscroll=false;var c=b.getScrollTop(),d=b.getScrollLeft();b.setScrollTop(c);b.railh&&b.setScrollLeft(d);b.noticeCursor(false,c,d);b.cursorfreezed=false;if(c<0)c=0;else if(c>b.page.maxh)c=b.page.maxh;if(d<0)d=0;else if(d>b.page.maxw)d=b.page.maxw;if(c!=b.newscrolly||d!=b.newscrollx)return b.doScrollPos(d,c,b.opt.snapbackspeed);b.onscrollend&&b.scrollrunning&&b.onscrollend.call(b,{type:"scrollend",current:{x:d,y:c},end:{x:b.newscrollx,y:b.newscrolly}});b.scrollrunning=false}):(this.doScrollLeft=
        function(c){var e=b.scrollrunning?b.newscrolly:b.getScrollTop();b.doScrollPos(c,e)},this.doScrollTop=function(c){var e=b.scrollrunning?b.newscrollx:b.getScrollLeft();b.doScrollPos(e,c)},this.doScrollPos=function(c,e){function g(){if(b.cancelAnimationFrame)return true;b.scrollrunning=true;if(o=1-o)return b.timer=q(g)||1;var c=0,f=sy=b.getScrollTop();if(b.dst.ay){var f=b.bzscroll?b.dst.py+b.bzscroll.getNow()*b.dst.ay:b.newscrolly,e=f-sy;if(e<0&&f<b.newscrolly||e>0&&f>b.newscrolly)f=b.newscrolly;b.setScrollTop(f);
        f==b.newscrolly&&(c=1)}else c=1;var d=sx=b.getScrollLeft();if(b.dst.ax){d=b.bzscroll?b.dst.px+b.bzscroll.getNow()*b.dst.ax:b.newscrollx;e=d-sx;if(e<0&&d<b.newscrollx||e>0&&d>b.newscrollx)d=b.newscrollx;b.setScrollLeft(d);d==b.newscrollx&&(c+=1)}else c+=1;if(c==2){b.timer=0;b.cursorfreezed=false;b.bzscroll=false;b.scrollrunning=false;if(f<0)f=0;else if(f>b.page.maxh)f=b.page.maxh;if(d<0)d=0;else if(d>b.page.maxw)d=b.page.maxw;d!=b.newscrollx||f!=b.newscrolly?b.doScrollPos(d,f):b.onscrollend&&b.onscrollend.call(b,
        {type:"scrollend",current:{x:sx,y:sy},end:{x:b.newscrollx,y:b.newscrolly}})}else b.timer=q(g)||1}e=typeof e=="undefined"||e===false?b.getScrollTop(true):e;if(b.timer&&b.newscrolly==e&&b.newscrollx==c)return true;b.timer&&r(b.timer);b.timer=0;var d=b.getScrollTop(),h=b.getScrollLeft();((b.newscrolly-d)*(e-d)<0||(b.newscrollx-h)*(c-h)<0)&&b.cancelScroll();b.newscrolly=e;b.newscrollx=c;if(!b.bouncescroll||!b.rail.visibility)if(b.newscrolly<0)b.newscrolly=0;else if(b.newscrolly>b.page.maxh)b.newscrolly=
        b.page.maxh;if(!b.bouncescroll||!b.railh.visibility)if(b.newscrollx<0)b.newscrollx=0;else if(b.newscrollx>b.page.maxw)b.newscrollx=b.page.maxw;b.dst={};b.dst.x=c-h;b.dst.y=e-d;b.dst.px=h;b.dst.py=d;var i=Math.round(Math.sqrt(Math.pow(b.dst.x,2)+Math.pow(b.dst.y,2)));b.dst.ax=b.dst.x/i;b.dst.ay=b.dst.y/i;var j=0,k=i;if(b.dst.x==0)j=d,k=e,b.dst.ay=1,b.dst.py=0;else if(b.dst.y==0)j=h,k=c,b.dst.ax=1,b.dst.px=0;i=b.getTransitionSpeed(i);b.bzscroll=i>0?b.bzscroll?b.bzscroll.update(k,i):new BezierClass(j,
        k,i,0,1,0,1):false;if(!b.timer){(d==b.page.maxh&&e>=b.page.maxh||h==b.page.maxw&&c>=b.page.maxw)&&b.checkContentSize();var o=1;b.cancelAnimationFrame=false;b.timer=1;b.onscrollstart&&!b.scrollrunning&&b.onscrollstart.call(b,{type:"scrollstart",current:{x:h,y:d},request:{x:c,y:e},end:{x:b.newscrollx,y:b.newscrolly},speed:i});g();(d==b.page.maxh&&e>=d||h==b.page.maxw&&c>=h)&&b.checkContentSize();b.noticeCursor()}},this.cancelScroll=function(){b.timer&&r(b.timer);b.timer=0;b.bzscroll=false;b.scrollrunning=
        false;return b}):(this.doScrollLeft=function(c,e){var g=b.getScrollTop();b.doScrollPos(c,g,e)},this.doScrollTop=function(c,e){var g=b.getScrollLeft();b.doScrollPos(g,c,e)},this.doScrollPos=function(c,e){var g=c>b.page.maxw?b.page.maxw:c;g<0&&(g=0);var d=e>b.page.maxh?b.page.maxh:e;d<0&&(d=0);b.synched("scroll",function(){b.setScrollTop(d);b.setScrollLeft(g)})},this.cancelScroll=function(){});this.doScrollBy=function(c,e){var d=0,d=e?Math.floor((b.scroll.y-c)*b.scrollratio.y):(b.timer?b.newscrolly:
        b.getScrollTop(true))-c;if(b.bouncescroll){var h=Math.round(b.view.h/2);d<-h?d=-h:d>b.page.maxh+h&&(d=b.page.maxh+h)}b.cursorfreezed=false;py=b.getScrollTop(true);if(d<0&&py<=0)return b.noticeCursor();else if(d>b.page.maxh&&py>=b.page.maxh)return b.checkContentSize(),b.noticeCursor();b.doScrollTop(d)};this.doScrollLeftBy=function(c,e){var d=0,d=e?Math.floor((b.scroll.x-c)*b.scrollratio.x):(b.timer?b.newscrollx:b.getScrollLeft(true))-c;if(b.bouncescroll){var h=Math.round(b.view.w/2);d<-h?d=-h:d>b.page.maxw+
    h&&(d=b.page.maxw+h)}b.cursorfreezed=false;px=b.getScrollLeft(true);if(d<0&&px<=0)return b.noticeCursor();else if(d>b.page.maxw&&px>=b.page.maxw)return b.noticeCursor();b.doScrollLeft(d)};this.doScrollTo=function(c,e){e&&Math.round(c*b.scrollratio.y);b.cursorfreezed=false;b.doScrollTop(c)};this.checkContentSize=function(){var c=b.getContentSize();(c.h!=b.page.h||c.w!=b.page.w)&&b.resize(false,c)};b.onscroll=function(){b.rail.drag||b.cursorfreezed||b.synched("scroll",function(){b.scroll.y=Math.round(b.getScrollTop()*
    (1/b.scrollratio.y));if(b.railh)b.scroll.x=Math.round(b.getScrollLeft()*(1/b.scrollratio.x));b.noticeCursor()})};b.bind(b.docscroll,"scroll",b.onscroll);this.doZoomIn=function(c){if(!b.zoomactive){b.zoomactive=true;b.zoomrestore={style:{}};var h="position,top,left,zIndex,backgroundColor,marginTop,marginBottom,marginLeft,marginRight".split(","),g=b.win[0].style,i;for(i in h){var j=h[i];b.zoomrestore.style[j]=typeof g[j]!="undefined"?g[j]:""}b.zoomrestore.style.width=b.win.css("width");b.zoomrestore.style.height=
        b.win.css("height");b.zoomrestore.padding={w:b.win.outerWidth()-b.win.width(),h:b.win.outerHeight()-b.win.height()};if(e.isios4)b.zoomrestore.scrollTop=d(window).scrollTop(),d(window).scrollTop(0);b.win.css({position:e.isios4?"absolute":"fixed",top:0,left:0,"z-index":b.opt.zindex+100,margin:"0px"});h=b.win.css("backgroundColor");(h==""||/transparent|rgba\(0, 0, 0, 0\)|rgba\(0,0,0,0\)/.test(h))&&b.win.css("backgroundColor","#fff");b.rail.css({"z-index":b.opt.zindex+110});b.zoom.css({"z-index":b.opt.zindex+
    112});b.zoom.css("backgroundPosition","0px -18px");b.resizeZoom();b.onzoomin&&b.onzoomin.call(b);return b.cancelEvent(c)}};this.doZoomOut=function(c){if(b.zoomactive)return b.zoomactive=false,b.win.css("margin",""),b.win.css(b.zoomrestore.style),e.isios4&&d(window).scrollTop(b.zoomrestore.scrollTop),b.rail.css({"z-index":b.ispage?b.opt.zindex:b.opt.zindex+2}),b.zoom.css({"z-index":b.opt.zindex}),b.zoomrestore=false,b.zoom.css("backgroundPosition","0px 0px"),b.onResize(),b.onzoomout&&b.onzoomout.call(b),
        b.cancelEvent(c)};this.doZoom=function(c){return b.zoomactive?b.doZoomOut(c):b.doZoomIn(c)};this.resizeZoom=function(){if(b.zoomactive){var c=b.getScrollTop();b.win.css({width:d(window).width()-b.zoomrestore.padding.w+"px",height:d(window).height()-b.zoomrestore.padding.h+"px"});b.onResize();b.setScrollTop(Math.min(b.page.maxh,c))}};this.init();d.nicescroll.push(this)},z=function(d){var c=this;this.nc=d;this.steptime=this.lasttime=this.speedy=this.speedx=this.lasty=this.lastx=0;this.snapy=this.snapx=
    false;this.demuly=this.demulx=0;this.lastscrolly=this.lastscrollx=-1;this.timer=this.chky=this.chkx=0;this.time=function(){return+new Date};this.reset=function(d,i){c.stop();var b=c.time();c.steptime=0;c.lasttime=b;c.speedx=0;c.speedy=0;c.lastx=d;c.lasty=i;c.lastscrollx=-1;c.lastscrolly=-1};this.update=function(d,i){var b=c.time();c.steptime=b-c.lasttime;c.lasttime=b;var b=i-c.lasty,j=d-c.lastx,e=c.nc.getScrollTop(),n=c.nc.getScrollLeft();e+=b;n+=j;c.snapx=n<0||n>c.nc.page.maxw;c.snapy=e<0||e>c.nc.page.maxh;
    c.speedx=j;c.speedy=b;c.lastx=d;c.lasty=i};this.stop=function(){c.nc.unsynched("domomentum2d");c.timer&&clearTimeout(c.timer);c.timer=0;c.lastscrollx=-1;c.lastscrolly=-1};this.doSnapy=function(d,i){var b=false;if(i<0)i=0,b=true;else if(i>c.nc.page.maxh)i=c.nc.page.maxh,b=true;if(d<0)d=0,b=true;else if(d>c.nc.page.maxw)d=c.nc.page.maxw,b=true;b&&c.nc.doScrollPos(d,i,c.nc.opt.snapbackspeed)};this.doMomentum=function(d){var i=c.time(),b=d?i+d:c.lasttime,d=c.nc.getScrollLeft(),j=c.nc.getScrollTop(),e=
    c.nc.page.maxh,n=c.nc.page.maxw;c.speedx=n>0?Math.min(60,c.speedx):0;c.speedy=e>0?Math.min(60,c.speedy):0;b=b&&i-b<=50;if(j<0||j>e||d<0||d>n)b=false;d=c.speedx&&b?c.speedx:false;if(c.speedy&&b&&c.speedy||d){var p=Math.max(16,c.steptime);p>50&&(d=p/50,c.speedx*=d,c.speedy*=d,p=50);c.demulxy=0;c.lastscrollx=c.nc.getScrollLeft();c.chkx=c.lastscrollx;c.lastscrolly=c.nc.getScrollTop();c.chky=c.lastscrolly;var f=c.lastscrollx,l=c.lastscrolly,g=function(){var b=c.time()-i>600?0.04:0.02;if(c.speedx&&(f=Math.floor(c.lastscrollx-
    c.speedx*(1-c.demulxy)),c.lastscrollx=f,f<0||f>n))b=0.1;if(c.speedy&&(l=Math.floor(c.lastscrolly-c.speedy*(1-c.demulxy)),c.lastscrolly=l,l<0||l>e))b=0.1;c.demulxy=Math.min(1,c.demulxy+b);c.nc.synched("domomentum2d",function(){if(c.speedx)c.nc.getScrollLeft()!=c.chkx&&c.stop(),c.chkx=f,c.nc.setScrollLeft(f);if(c.speedy)c.nc.getScrollTop()!=c.chky&&c.stop(),c.chky=l,c.nc.setScrollTop(l);c.timer||(c.nc.hideCursor(),c.doSnapy(f,l))});c.demulxy<1?c.timer=setTimeout(g,p):(c.stop(),c.nc.hideCursor(),c.doSnapy(f,
    l))};g()}else c.doSnapy(c.nc.getScrollLeft(),c.nc.getScrollTop())}},t=d.fn.scrollTop;d.cssHooks.pageYOffset={get:function(j){var c=d.data(j,"__nicescroll")||false;return c&&c.ishwscroll?c.getScrollTop():t.call(j)},set:function(j,c){var h=d.data(j,"__nicescroll")||false;h&&h.ishwscroll?h.setScrollTop(parseInt(c)):t.call(j,c);return this}};d.fn.scrollTop=function(j){if(typeof j=="undefined"){var c=this[0]?d.data(this[0],"__nicescroll")||false:false;return c&&c.ishwscroll?c.getScrollTop():t.call(this)}else return this.each(function(){var c=
    d.data(this,"__nicescroll")||false;c&&c.ishwscroll?c.setScrollTop(parseInt(j)):t.call(d(this),j)})};var u=d.fn.scrollLeft;d.cssHooks.pageXOffset={get:function(j){var c=d.data(j,"__nicescroll")||false;return c&&c.ishwscroll?c.getScrollLeft():u.call(j)},set:function(j,c){var h=d.data(j,"__nicescroll")||false;h&&h.ishwscroll?h.setScrollLeft(parseInt(c)):u.call(j,c);return this}};d.fn.scrollLeft=function(j){if(typeof j=="undefined"){var c=this[0]?d.data(this[0],"__nicescroll")||false:false;return c&&
c.ishwscroll?c.getScrollLeft():u.call(this)}else return this.each(function(){var c=d.data(this,"__nicescroll")||false;c&&c.ishwscroll?c.setScrollLeft(parseInt(j)):u.call(d(this),j)})};var v=function(j){var c=this;this.length=0;this.name="nicescrollarray";this.each=function(d){for(var b=0;b<c.length;b++)d.call(c[b]);return c};this.push=function(d){c[c.length]=d;c.length++};this.eq=function(d){return c[d]};if(j)for(a=0;a<j.length;a++){var h=d.data(j[a],"__nicescroll")||false;h&&(this[this.length]=h,
    this.length++)}return this};(function(d,c,h){for(var i=0;i<c.length;i++)h(d,c[i])})(v.prototype,"show,hide,onResize,resize,remove,stop,doScrollPos".split(","),function(d,c){d[c]=function(){var d=arguments;return this.each(function(){this[c].apply(this,d)})}});d.fn.getNiceScroll=function(j){return typeof j=="undefined"?new v(this):d.data(this[j],"__nicescroll")||false};d.extend(d.expr[":"],{nicescroll:function(j){return d.data(j,"__nicescroll")?true:false}});d.fn.niceScroll=function(j,c){typeof c==
"undefined"&&typeof j=="object"&&!("jquery"in j)&&(c=j,j=false);var h=new v;typeof c=="undefined"&&(c={});if(j)c.doc=d(j),c.win=d(this);var i=!("doc"in c);if(!i&&!("win"in c))c.win=d(this);this.each(function(){var b=d(this).data("__nicescroll")||false;if(!b)c.doc=i?d(this):c.doc,b=new F(c,d(this)),d(this).data("__nicescroll",b);h.push(b)});return h.length==1?h[0]:h};window.NiceScroll={getjQuery:function(){return d}};if(!d.nicescroll)d.nicescroll=new v})(jQuery);

/*================ END jquery.nicescroll plagin for custom scrolling ================*/

/*================ BEGIN check for compatibility ================*/

window.checkForCompatibility = function(){
    //return true if browser IE11+ or Chrome, Mozzila, Opera with WebGL engine
    return requestAnimationFrame && window.outerWidth > 1024 && !document.all
};

/*================ END check for compatibility ================*/

/*================ BEGIN ThreeJS window resize plugin ================*/

var THREEx	= THREEx 		|| {};

/**
 * Update renderer and camera when the window is resized
 *
 * @param {Object} renderer the renderer to update
 * @param {Object} Camera the camera to update
 */
THREEx.WindowResize	= function(renderer, camera){//renderer - THREE renderer; camera - THREE camera
    var callback	= function(){
        // notify the renderer of the size change
        renderer.setSize( window.innerWidth, window.innerHeight );
        // update the camera
        camera.aspect	= window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    };

    // bind the resize event
    window.addEventListener('resize', callback, false);
    // return .stop() the function to stop watching window resize

    return {
        /**
         * Stop watching window resize
         */
        stop	: function(){
            window.removeEventListener('resize', callback);
        }
    };
};

/*================ END ThreeJS window resize plugin ================*/

/*================ BEGIN Slider plugin for music container ================*/

window.slider = function(elemId, sliderWidth, range1, range2, step, callback) {
    /*
     elemId - id of sliding block,
     sliderWidth - slider width,
     range1 - top border slider range,
     range2 - bottom border slider range,
     step - callback function when scrolling,
     callback - callback function when slider appled
    */
    var knobWidth = 12,				// Width and height of knob
        knobHeight = 12,			// chnging from slider height
        sliderHeight = 6;

    var offsX,
        tmp,
        d,
        isIE,
        point,
        slider,
        knob,
        sliderOffset;					// static

    d = document;
    isIE = d.all || window.opera;	// model of DOM
    point = (sliderWidth-knobWidth-3)/(range2-range1);
    // point - pixels per scroll

    slider = d.createElement('DIV'); // create slider
    slider.id = elemId + '_slider';
    slider.className = 'slider';
    d.getElementById(elemId).appendChild(slider);

    knob = d.createElement('DIV');	// create knob
    knob.id = elemId + '_knob';
    knob.className = 'knob';
    slider.appendChild(knob); // дand knob to document

    knob.style.left = 0;			// knob position to 0
    knob.style.width = knobWidth+'px';
    knob.style.height = knobHeight+'px';
    slider.style.width = sliderWidth+'px';
    slider.style.height = sliderHeight+'px';

    sliderOffset = slider.offsetLeft;			// sliderOffset - absolute offset of slider'а
    tmp = slider.offsetParent;		            // from left border (in IE not working)
    while(tmp.tagName != 'BODY') {
        sliderOffset += tmp.offsetLeft;
        tmp = tmp.offsetParent;
    }

    if(isIE)
    {								// add event listener
        knob.onmousedown = startCoord;
        slider.onclick = sliderClick;
        knob.onmouseup = endCoord;
        slider.onmouseup = endCoord;
    }
    else {
        knob.addEventListener("mousedown", startCoord, true);
        slider.addEventListener("click", sliderClick, true);
        knob.addEventListener("mouseup", endCoord, true);
        slider.addEventListener("mouseup", endCoord, true);
    }



    function setValue(x)	// pixels of knob new position
    {
        if(x < 0) knob.style.left = 0;
        else if(x > sliderWidth-knobWidth-3) knob.style.left = (sliderWidth-3-knobWidth)+'px';
        else {
            if(step == 0) knob.style.left = x+'px';
            else knob.style.left = Math.round(x/(step*point))*step*point+'px';
        }
    }
    function setValue2(x)
    {
        if(x < range1 || x > range2) alert('Value is not included into a slider range!');
        else setValue((x-range1)*point);

    }

    function getValue()
    //return position of knob
    {return Math.round(parseInt(knob.style.left)/point)+range1;}

    // event listeners //
    function sliderClick(e) {
        var x;

        if(isIE) {
            if(event.srcElement != slider) return; //IE onclick bug
            x = event.offsetX - Math.round(knobWidth/2);
        }
        else x = e.pageX-sliderOffset-knobWidth/2;
        setValue(x);
    }

    function startCoord(e) {
        if(isIE) {
            offsX = event.clientX - parseInt(knob.style.left);
            slider.onmousemove = mov;
        }
        else {
            slider.addEventListener("mousemove", mov, true);
        }
    }

    function mov(e)	{
        var x,
            value;

        if(isIE) x = event.clientX-offsX;
        else x = e.pageX-sliderOffset-knobWidth/2;
        setValue(x);
        value = getValue();

        if(callback)callback(value);
    }

    function endCoord()	{
        if(isIE) slider.onmousemove = null;
        else slider.removeEventListener("mousemove", mov, true);
    }

    // return setValue2 and getValue how methods off class
    this.setValue = setValue2;
    this.getValue = getValue;
};

/*================ END Slider plugin for music container ================*/

/*================ BEGIN getRandom plugin ================*/

window.getRandomInt = function(min, max){//min - minimum border of randomize; max - maximum border of randomize
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

/*================ END getRandom plugin ================*/

/*================ BEGIN Maximum Multiple plugin ================*/

window.getMaxMultiple = function(a, b){//a,b -two numbers
    return Math.floor(b / a) *a //maximum Multiple from a and b
};

/*================ END Maximum Multiple plugin ================*/

/*================ BEGIN Change cursor (default = pointer) ================*/
window.changeCursor =function(type){//type of cursor, "default" for example
    if(!type) type = 'pointer';
    document.getElementsByTagName('body')[0].style.cursor = type;
};

/*================ END Change cursor (default = pointer) ================*/


/*================ BEGIN throttling plugin ================*/
window.throttle = function(fn, threshhold, scope) {
    threshhold || (threshhold = 250);
    var last,
        deferTimer;
    //return function() if more than one fn dont apply before theshhold
    return function () {
        var context = scope || this;

        var now = +new Date,
            args = arguments;
        if (last && now < last + threshhold) {
            // hold on to it
            clearTimeout(deferTimer);
            deferTimer = setTimeout(function () {
                last = now;
                fn.apply(context, args);
            }, threshhold);
        } else {
            last = now;
            fn.apply(context, args);
        }
    };
};


/*================ END throttling plugin ================*/


/*================ BEGIN modal windows plugin ================*/

window.showModal = function(obj){// object with option of modal
    /*Options of input object:

     header - string, text of modal header;
     text - string,  text of modal;
     close - 1 or 0, add close button to top of the modal;
     retry - 1 or 0, add retry button to bottom of the modal;
     location - 1 or 0, add location button to bottom of the modal;
     back - 1 or 0, add funcion that help come back to the previous menu;
     submit - 1 or 0, add submit button to bottom of the modal;
     load - 1 or 0, add preloader icon;
     switch - 1 or 0, add switching slider to modal;
     background - rgba or hash, custom background of modal;
     buttons - array, add button from this array to modal;
     callback -function;
     */
    var retry = '',
        location = '',
        close = '',
        back = '',
        submit = '',
        resultText,
        scroller,
        button,
        background,
        modalWrapperTmp,
        modalWrapper,
        modalLayout,
        modalContainer,
        modalContent,
        modalInner,
        modalText,
        buttonEl,
        closeEl,
        backEl,
        submitEl,
        retryEl,
        locationEl;

    resultText = obj.text;
    button= '';
    background ='';


    /*=======Remove event listners if modal window is open=======*/
    if(GAME_NUMBER != 0) {
        game.pause = 1;
        game.removeEventListeners();
    }
    /*=======Add templates of buttons=======*/
    if(obj.retry){
        retry = '<input type="button" class="retry-btn btn" id="retry-btn" value="Retry game?">'
    };
    if(obj.close){
        close = '<span class="close-btn" id="close-btn" style="margin: 8px 0 16px 0;"></span>'
    };
    if(obj.back){
        back = '<span class="back-btn" id="back-btn" style="margin: 10px 8px 0 0"></span>'
    };
    if(obj.location){
        location = '<input type="button" class="location-btn btn" id="location-btn" value="'+ obj.location.text +'">'
    };
    if(obj.submit){
        submit = '<input type="button" class="submit-btn btn" id="submit-btn" value="'+ obj.submit.text +'">'
    };

    if(obj.buttons) {
        for (var i = 0; i < obj.buttons.length; i++) {

            if (obj.buttons[i].background) {
                background = obj.buttons[i].background
            } else {
                background = 'url(/images/lightwood.jpg)'
            }
            button = '<input type="button" class="menu-btn btn" style="background:' + background + ';" value="' + obj.buttons[i].text + '">';
            resultText += button;
        }
    }
    /*=======Add templates of another modal elements=======*/
    modalWrapperTmp = getTemplateByClass('modalWrapper');

    $('body').append(modalWrapperTmp);
    modalWrapper = $('#modalWrapper');
    modalLayout = modalWrapper.find('.modalLayout');
    modalContainer = modalWrapper.find('.modalContainer');
    modalContent = modalContainer.find('.modalContent');
    modalInner = modalContainer.find('.modalInner');
    modalText = modalContainer.find('.modalText');
    modalInner.append(close)
    modalContent.append(submit).append(retry).append(location);;
    modalContainer.find('h1').html(back + obj.header);
    modalText.html(resultText);

    $('.btn').on('mousedown', function(){
        var self =this;

        $(this).css({borderStyle: 'inset'});

        setTimeout(function(){$(self).css({borderStyle: 'outset'});}, 100)
    });
    /*=======Add event listners for all modal window elements=======*/
    if(obj.buttons) {
        for (var i = 0; i < obj.buttons.length; i++) {
            buttonEl = $(modalContent.find('input')[i]);
            buttonEl.on('click', obj, obj.buttons[i].callback)
            if(i + 1 == obj.buttons.length) buttonEl.addClass('clear-fix');
        }
    }
    if(obj.close) {
        modalLayout.on('click', function (e) {
            hideModal();
        });
    }


    if(obj.close){
        closeEl = $('#close-btn');
        closeEl.on('click', function(){
            hideModal();
        });
    }
    /*=======If text in window very big set height of this text=======*/
    if(modalText[0].clientHeight> $(window).height() -224) {
        modalText.css({height: modalInner.height() - 223 + 'px'});
    }else{
        modalText.css({height: 'auto'});
    }

    if(modalText[0].clientHeight> $(window).height() -224){
        scroller = modalText.niceScroll({cursoropacitymin : '1'});
    }

    if(obj.back){
        backEl = $('#back-btn').parent();
        backEl.addClass('pointer').addClass('underline');
        backEl.on('click', function(){
            obj.back()
        });
    }

    if(obj.submit){
        submitEl = $('#submit-btn');
        submitEl.on('click', function(){
            if(scroller)scroller.remove();
            obj.submit.callback();
        });
    }


    if(obj.retry){
        retryEl = $('#retry-btn');
        retryEl.on('click', function(){
            game.stats.gameOver = 1;
            updateModal({
                header: '<img class="logo-img" src="/images/icon128.png" width="58"/>To other side',
                text: '<br>To rotate view use arrow keys on your keyboard or click left key and drag.',
                background: 'url(/images/bg/main-bg2.jpg)',
                load:1,
                callback:newGame
            });
        });
    }
    if(obj.location){
        locationEl = $('#location-btn');
        locationEl.on('click', function(){
            document.location.href = obj.location.url;
        });
    }
    modalWrapper.animate({opacity: 1}, 500);
};

window.hideModal = function(fn){//callbak function
    if($('.ascrail'))$('.ascrail').remove();
    if($('#menuIcon'))$('#menuIcon').css({background: 'url(/images/sprite.png) 2px -303px'});
    /*=======Add event listeners if window is close=======*/
    if(GAME_NUMBER != 0) {
        game.addEventListeners();
        game.pause = 0;
    }

    $('#modalLayout').remove();
    $('#modalWrapper').fadeOut(function(){$('#modalWrapper').remove();});

    if(fn)fn();
};

window.updateModal = function(obj, fn){//obj - object of modal options, fn - callback functions
    /*Options of input object:

     header - string, text of modal header;
     text - string,  text of modal;
     close - 1 or 0, add close button to top of the modal;
     retry - 1 or 0, add retry button to bottom of the modal;
     location - 1 or 0, add location button to bottom of the modal;
     back - 1 or 0, add funcion that help come back to the previous menu;
     submit - 1 or 0, add submit button to bottom of the modal;
     load - 1 or 0, add preloader icon;
     switch - 1 or 0, add switching slider to modal;
     background - rgba or hash, custom background of modal;
     buttons - array, add button from this array to modal;
     callback -function;
     */
    var retry = '',
        location = '',
        close = '',
        back = '',
        submit = '',
        preloader = '',
        resultText,
        button,
        background,
        scroller,
        modalWrapper,
        modalLayout,
        modalContainer,
        modalContent,
        modalText,
        modalHeader,
        closeEl,
        modalInner;

    resultText = obj.text;
    button= '';
    background ='';

    if($('.ascrail'))$('.ascrail').remove();
    /*=======Add templates of buttons=======*/    if(obj.retry){
        retry = '<input type="button" class="retry-btn btn" id="retry-btn" value="Retry game?">'
    };
    if(obj.close){
        close = '<span class="close-btn" id="close-btn" style="margin: 8px 0 0 16px"></span>'
    };
    if(obj.back){
        back = '<span class="back-btn" id="back-btn" style="margin: 10px 8px 0 0;"></span>'
    };
    if(obj.submit){
        submit = '<input type="button" class="submit-btn btn" id="submit-btn" value="'+ obj.submit.text +'">'
    };
    if(obj.location){
        location = '<input type="button" class="location-btn btn" id="location-btn" value="'+ obj.location.text +'">'
    };

    if(obj.buttons) {
        for (var i = 0; i < obj.buttons.length; i++) {
            if (obj.buttons[i].background) {
                background = obj.buttons[i].background
            } else {
                background = 'url(/images/lightwood.jpg)'
            }
            button = '<input type="button" class="menu-btn btn" style="background:' + background + ';" value="' + obj.buttons[i].text + '">';
            resultText += button;
        }
    }
    /*=======Add templates of another modal elements=======*/
    modalWrapper = $('#modalWrapper');
    modalLayout = modalWrapper.find('.modalLayout');
    modalContainer = modalWrapper.find('.modalContainer');
    modalContent = modalContainer.find('.modalContent');
    modalText = modalContainer.find('.modalText');
    modalHeader = modalContainer.find('h1');
    closeEl = $('#close-btn');
    closeEl.hide();
    modalInner = modalContainer.find('.modalInner');
    /*=======Animate closing of window=======*/
    modalContainer.animate({width: '0px'},500, function(){
        var modalInnerTmp,
            buttonEl,
            retryEl,
            locationEl,
            backEl,
            submitEl,
            switchEl,
            resultEl,
            tmp;

        modalInner.remove;//remove old window content
        /*=======Add templates of another modal elements=======*/
        modalInnerTmp = getTemplateByClass('modalInner');
        modalInnerTmp.style.display= 'none';
        modalContainer.html(modalInnerTmp);
        modalContent = modalContainer.find('.modalContent');
        modalInner = modalContainer.find('.modalInner');
        modalText = modalContainer.find('.modalText');
        modalHeader = modalContainer.find('h1');
        modalLayout = modalWrapper.find('.modalLayout');

        if(obj.load)preloader = getTemplateByClass('preloaderContainer');

        modalInner.append(close);
        modalContent.append(submit).append(preloader).append(retry).append(location);;
        modalHeader.html(back + obj.header);
        modalText.html(resultText);

        if(obj.background){
            modalLayout.css({background: obj.background, opacity: '0'});
            modalContainer.css({background: 'rgba(0,0,0, 1)'});
        }

        modalInner.show();//show new window content

        if(modalText[0].clientHeight> $(window).height() -224) {
            modalText.css({height: modalInner.height() - 223 + 'px'});
        }else{
            modalText.css({height: 'auto'});
        }
        /*=======Add event listeners of all window elements=======*/
        $('.btn').on('mousedown', function(){
            var self =this;

            $(this).css({borderStyle: 'inset'});
            setTimeout(function(){$(self).css({borderStyle: 'outset'});}, 100)
        });

        if(obj.buttons) {
            for (var i = 0; i < obj.buttons.length; i++) {
                buttonEl = $(modalContent.find('input')[i]);

                buttonEl.on('click', obj, obj.buttons[i].callback);
                if(i + 1 == obj.buttons.length) buttonEl.addClass('clear-fix');
            }
        }
        if(obj.close) {
            modalLayout.on('click', function (e) {

                hideModal();
            });
        }
        if(obj.load) {
            modalLayout.unbind('click');
        }
        if(obj.close){
            closeEl.on('click', function(){
                hideModal();
            });
        }

        if(obj.background)modalLayout.animate({opacity: 1}, 500);

        if(obj.retry){
            retryEl = $('#retry-btn');
            retryEl.on('click', function(){
                game.stats.gameOver = 1;
                updateModal({
                    header: '<img class="logo-img" src="/images/icon128.png" width="58"/>To other side',
                    text: '<br>To rotate view use arrow keys on your keyboard or click left key and drag.',
                    background: 'url(/images/bg/main-bg2.jpg)',
                    load:1,
                    callback:newGame
                });
            });
        }

        if(obj.location){
            locationEl = $('#location-btn');
            locationEl.on('click', function(){
                document.location.href = obj.location.url;
            });
        }

        /*=======Animation of opening window=======*/
        modalContainer.animate({width: '470px'},400, function(){
            if(modalText[0].clientHeight> $(window).height() -224){
                scroller = modalText.niceScroll({cursoropacitymin : '1'});
            }

            if(obj.back){
                backEl = $('#back-btn').parent();
                backEl.addClass('pointer').addClass('underline');
                backEl.on('click', function(){
                    if(scroller)scroller.remove();

                    obj.back()
                });
            };

            if(obj.submit){
                submitEl = $('#submit-btn');
                submitEl.on('click', function(){
                    if(scroller)scroller.remove();
                    obj.submit.callback();

                });
            };
        });

        if(obj.switch){
            switchEl = $('#new-game__settings').find('.choise-block');
            resultEl = $('.new-game__result');
            tmp = {
                '0': 'Human',
                '1': 'PC'
            };
            /*=======Add swithing element and event listeners for this=======*/
            switchEl.find(".on_off").change(function() {
                var button,
                    curWrapper,
                    whiteResult,
                    blackResult,
                    surrArr;

                button = $(this).val();

                curWrapper =$(this).parent().parent();
                whiteResult = resultEl.find('.whitePlayer');
                blackResult = resultEl.find('.blackPlayer');

                if(button == '1'){ curWrapper.css('background-position', 'right'); }
                if(button == '0'){ curWrapper.css('background-position', 'left'); }

                surrArr = $('#new-game__settings').serializeArray();

                if(surrArr[0].value == 1 && surrArr[1].value == 1){
                    if($(this).attr('name')== 'whitePlayer'){
                        switchEl.find("input[value=0]")[1].click()
                    }else if($(this).attr('name')== 'blackPlayer'){
                        switchEl.find("input[value=0]")[0].click()
                    };
                }else{
                    whiteResult.html(tmp[surrArr[0].value]).data('value', surrArr[0].value);
                    blackResult.html(tmp[surrArr[1].value]).data('value', surrArr[1].value);
                }
                //help to not selecting another DOM
                return false
            });

            $('.reswitch').on('mousedown', function(){
                var surrArr,
                    self;

                self = this;
                surrArr = $('#new-game__settings').serializeArray();
                if(surrArr[0].value != surrArr[1].value){
                    if(surrArr[0].value == 0){

                        switchEl.find("input[value=0]")[1].click();
                        switchEl.find("input[value=1]")[0].click();
                    }else if(surrArr[0].value == 1){
                        switchEl.find("input[value=0]")[0].click();
                        switchEl.find("input[value=1]")[1].click()
                    };
                };
                $(this).css({borderStyle: 'inset'});

                setTimeout(function(){$(self).css({borderStyle: 'outset'});}, 100);
                //help to not selecting another DOM
                return false
            });
            switchEl.find("input[value=1]")[1].click();
            $('.submit-btn').css({marginTop: '0px'});
        }
        /*=======Show srolling bar(fix bug)=======*/
        setTimeout(function(){$('.ascrail').show();},1000);

        if(obj.callback)setTimeout(function(){obj.callback()}, 1000);
    });
};

/*================ END modal windows plugin ================*/

/*================ BEGIN Template compile plugin ================*/

window.getTemplateByClass = function(cl){// class of adding template
    var jadeTemplates,
        element;

    jadeTemplates = $('#jade-templates');
    element = jadeTemplates.find('.' + cl);
    element = element.clone();
    element[0].id =  cl;

    //return DOM element from body div#jade-templates from root/views/index.jade
    return element[0]
};

/*================ END Template compile plugin ================*/

/*================ BEGIN A Star Algorithm ================*/

window.aStarSearch = function(){
    return {
        findWay: function(obj){
            var closeArray,
                openArray,
                playerDirection,
                startCellCoords,
                globalCurrentCellCoords,
                table,
                newCellCoords,
                result;

            closeArray = [];
            openArray = [];
            result ={
                canGo: false,
                way: []
            };

            for(var i = 0; i<=16; i++){
                closeArray[i] = [];
                openArray[i] = [];

                for(var j = 0; j<=16; j++){
                    closeArray[i][j] = {};
                    openArray[i][j] = {};
                }
            }

            table = game.stats.players.whitePlayer.fieldArray;

            globalCurrentCellCoords = startCellCoords = obj.startCoords;

            closeArray[globalCurrentCellCoords.y][globalCurrentCellCoords.x] = newCell(globalCurrentCellCoords);

            if((game.stats.currentPlayer == 'white' && obj.plate) || (game.stats.currentPlayer == 'black' && !obj.plate)){
                playerDirection = +1;
            }else{
                playerDirection = -1
            }

            var directions = [
                {x: 0, y: +1 * playerDirection, _x: 0, _y: +2 * playerDirection},//up

                {x: -1 * playerDirection, y: 0, _x: -2 * playerDirection, _y: 0},//right

                {x: 0, y: -1 * playerDirection, _x: 0, _y: -2 * playerDirection},//down

                {x: +1 * playerDirection, y: 0, _x: +2 * playerDirection, _y: 0}//left

            ];

            function getCoof(coords1,coords2){
                var result ={};

                result.H = Math.abs(coords1.y - obj.endRow);

                result.G = closeArray[coords2.y][coords2.x].G +1

                result.F = result.G + result.H;

                return result
            }

            function newCell(coords1,coords2){
                var obj ={};

                obj.coords = {
                    x:coords1.x,
                    y:coords1.y
                };
                if(coords2){
                    var coof = getCoof(coords1,coords2);
                    obj.parent = {
                        x:coords2.x,
                        y:coords2.y
                    };
                    obj.F = coof.F;
                    obj.G = coof.G;
                    obj.H = coof.H;
                }else{
                    obj.F = 0;
                    obj.G = 0;
                    obj.H = 0;
                }

                return obj
            }

            function isTargetPlate(x,y){
                var result = false;

                if(obj.plate){
                    if(obj.plate.rotate == 0) {
                        for(var i = -1; i < 2 ; i++) {
                            if(obj.plate.coords.y + i == y && obj.plate.coords.x == x ){
                                result = true;
                                break
                            }
                        }
                    }else if(obj.plate.rotate == 1) {
                        for(var i = -1; i < 2 ; i++) {
                            if(obj.plate.coords.y == y && obj.plate.coords.x + i == x ){
                                result = true;
                                break
                            }
                        }
                    }
                }

                return result
            }


            function switchArrays(minCoords){
                closeArray[minCoords.y][minCoords.x].coords =  openArray[minCoords.y][minCoords.x].coords;
                closeArray[minCoords.y][minCoords.x].parent =  openArray[minCoords.y][minCoords.x].parent;

                closeArray[minCoords.y][minCoords.x].F =  openArray[minCoords.y][minCoords.x].F;
                closeArray[minCoords.y][minCoords.x].G =  openArray[minCoords.y][minCoords.x].G;
                closeArray[minCoords.y][minCoords.x].H =  openArray[minCoords.y][minCoords.x].H;

                openArray[minCoords.y][minCoords.x] = {};

                searchNear(minCoords);
            }

            function searchNear(currentCellCoords){
                var thisCoof,
                    minF = 200,
                    minCoords = {};

                for(var i in directions){
                    if(result.canGo == false && currentCellCoords.y + directions[i]._y >=0 && currentCellCoords.y + directions[i]._y <=16 && currentCellCoords.x + directions[i]._x >=0 && currentCellCoords.x + directions[i]._x <=16 ){
                        if(table[currentCellCoords.y + directions[i].y][currentCellCoords.x + directions[i].x].available && !isTargetPlate(currentCellCoords.x + directions[i].x, currentCellCoords.y + directions[i].y)) {
                            newCellCoords = {};
                            newCellCoords.x = currentCellCoords.x + directions[i]._x;
                            newCellCoords.y = currentCellCoords.y + directions[i]._y;

                            if(newCellCoords.y == obj.endRow){
                                result.canGo = true;
                                result.finalCoords = newCellCoords;
                                closeArray[newCellCoords.y][newCellCoords.x] = newCell(newCellCoords, currentCellCoords);
                            }else if (!openArray[newCellCoords.y][newCellCoords.x].coords &&
                                !closeArray[newCellCoords.y][newCellCoords.x].coords) {

                                openArray[newCellCoords.y][newCellCoords.x] = newCell(newCellCoords, currentCellCoords);

                                if( openArray[newCellCoords.y][newCellCoords.x].F < minF){
                                    minF = openArray[newCellCoords.y][newCellCoords.x].F;
                                    minCoords.x = newCellCoords.x;
                                    minCoords.y = newCellCoords.y;
                                }

                            }else if(openArray[newCellCoords.y][newCellCoords.x].coords){
                                if(closeArray[currentCellCoords.y][currentCellCoords.x].G > openArray[newCellCoords.y][newCellCoords.x].G + 1){
                                    closeArray[currentCellCoords.y][currentCellCoords.x].parent.x = newCellCoords.x;
                                    closeArray[currentCellCoords.y][currentCellCoords.x].parent.y = newCellCoords.y;
                                    thisCoof = getCoof(newCellCoords, currentCellCoords);

                                    closeArray[currentCellCoords.y][currentCellCoords.x].G = thisCoof.G;
                                    closeArray[currentCellCoords.y][currentCellCoords.x].F = thisCoof.F;

                                }

                            }

                        }
                    }
                }

                if(minF != 200){
                    switchArrays(minCoords);
                }else{
                    for(var i in openArray){
                        for(var j in openArray){
                            if(openArray[i][j].F){
                                if( openArray[i][j].F < minF){
                                    minF = openArray[i][j].F;
                                    minCoords.x = openArray[i][j].coords.x;
                                    minCoords.y = openArray[i][j].coords.y;
                                }
                            }
                        }
                    }
                    if(minF != 200){
                        switchArrays(minCoords);
                    }
                }
            }

            searchNear(globalCurrentCellCoords);


            if(result.canGo){
                var wayCoords = result.finalCoords;
                var tmpCoords = {};

                while(startCellCoords.x != wayCoords.x || startCellCoords.y != wayCoords.y ){
                    result.way.unshift({x: wayCoords.x, y: wayCoords.y});
                    tmpCoords.x = wayCoords.x;
                    tmpCoords.y = wayCoords.y;

                    wayCoords.x = closeArray[tmpCoords.y][tmpCoords.x].parent.x;
                    wayCoords.y = closeArray[tmpCoords.y][tmpCoords.x].parent.y;
                }
                result.way.unshift({x: startCellCoords.x, y: startCellCoords.y});
            }

            return  result
        }
    }
}();

/*================ END A Star Algorithm ================*/


/*================ BEGIN Animation plugin ================*/

window.Animate = function(){
    this.turnOn = 0;

    this.elastic = function(progress) {
        return Math.pow(2, 10 * (progress-1)) * Math.cos(20*Math.PI*1.5/3*progress)
    };

    this.linear = function(progress) {
        return progress
    };

    this.quad = function(progress) {
        return Math.pow(progress, 2)
    };

    this.quint = function(progress) {
        return Math.pow(progress, 5)
    };

    this.circ = function(progress) {
        return 1 - Math.sin(Math.acos(progress))
    };

    this.back = function(progress) {
        return Math.pow(progress, 2) * ((1.5 + 1) * progress - 1.5)
    };


    this.bounce = function(progress) {
        for(var a = 0, b = 1, result; 1; a += b, b /= 2) {
            if (progress >= (7 - 4 * a) / 11) {
                return -Math.pow((11 - 6 * a - 11 * progress) / 4, 2) + Math.pow(b, 2);
            }
        }
    };

    this.parabola = function(progress){
        var mod;

        mod = progress;
        if(progress > .5){
            mod = 1 - progress
        }
        return -(mod * mod) + 2 * mod
    };

    this.doubleParabola = function(progress){
        var mod;

        mod = progress;
        if(progress > .25 && progress < .5){
            mod = 0.5 - progress
        }else if(progress > .5 && progress < .75){
            mod = progress - 0.5
        }else if(progress > .75){
            mod = 1 - progress
        }
        return -(mod * mod) + 2 * mod
    };

    this.makeEaseInOut = function(delta) {
        return function(progress) {
            if (progress < .5)
                return delta(2*progress) / 2
            else
                return (2 - delta(2*(1-progress))) / 2
        }
    };


    this.makeEaseOut = function(delta) {
        return function(progress) {
            return 1 - delta(1 - progress)
        }
    };
};

window.animate = function(opts) {// animation options
    var linear,
        start,
        delta,
        timer;

    /*
    Animation option:
        delta - additional mach animation function or linar function,
        duration - duration of animation,
        step - function apply in evry frame,
        complete - callback function,
        delay - delay of animation in ms
     */

    linear = function(progress) {// progress of animation
        return progress
    };
    start = new Date;
    delta = opts.delta || linear;

    timer = setInterval(function() {
        var progress;

        progress = (new Date - start) / opts.duration;

        if (progress > 1) progress = 1;
        opts.step( delta(progress) );

        if (progress == 1) {
            clearInterval(timer);
            opts.complete && opts.complete();
        }
    }, opts.delay || 13);

    return timer;
};

/*================ END Animation plugin ================*/
