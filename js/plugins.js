// Avoid `console` errors in browsers that lack a console.
!function(){for(var e,n=function(){},o=["assert","clear","count","debug","dir","dirxml","error","exception","group","groupCollapsed","groupEnd","info","log","markTimeline","profile","profileEnd","table","time","timeEnd","timeline","timelineEnd","timeStamp","trace","warn"],i=o.length,r=window.console=window.console||{};i--;)e=o[i],r[e]||(r[e]=n)}();

// Console.log to div 
// https://github.com/bahmutov/console-log-div
!function(){"use strict";function e(e){return"string"==typeof e?e:JSON.stringify(e)}function n(){var e=document.getElementById(i);e||(e=document.createElement("fieldset"),e.id=i,document.body.appendChild(e)),e.classList.add("id");var n=e.style;return n.fontFamily="monospace",n.marginTop="20px",n.whiteSpace="pre",n.borderRadius="5px",e}function t(){var n=Array.prototype.slice.call(arguments,0).map(e).join(" "),t=p.textContent;p.textContent=t+n+"\n"}function o(){r.apply(null,arguments),t.apply(null,arguments)}function l(e,n){var t=n.length,o=e.length,l=document.createElement("table");l.style.width="100%",l.setAttribute("border","1");var r=document.createElement("thead"),a=document.createElement("td");a.innerHTML="Index",r.appendChild(a);for(var d=0;t>d;d++)a=document.createElement("td"),a.innerHTML=n[d],r.appendChild(a);l.appendChild(r);for(var c=0;o>c;c++){var i=document.createElement("tr");a=document.createElement("td"),a.innerHTML=c,i.appendChild(a);for(var p=0;t>p;p++)a=document.createElement("td"),a.innerHTML=e[c][n[p]],i.appendChild(a);l.appendChild(i)}var u=document.getElementById("console-log-text");u.appendChild(l)}if(!console.log.toDiv){var r=console.log.bind(console),a=console.error.bind(console),d=console.warn.bind(console),c=console.table?console.table.bind(console):null,i="console-log-div",p=function(){var e=n(),t=document.createTextNode("console output"),o=document.createElement("legend");o.appendChild(t),e.appendChild(o);var l=document.createElement("div");return l.id="console-log-text",e.appendChild(l),l}();console.log=o,console.log.toDiv=!0,console.error=function(){a.apply(null,arguments);var e=Array.prototype.slice.call(arguments,0);e.unshift("ERROR:"),t.apply(null,e)},console.warn=function(){d.apply(null,arguments);var e=Array.prototype.slice.call(arguments,0);e.unshift("WARNING:"),t.apply(null,e)},console.table=function(){"function"==typeof c&&c.apply(null,arguments);var e,n=arguments[0];"undefined"!=typeof n[0]&&(e=Object.keys(n[0])),l(n,e)},window.addEventListener("error",function(e){t("EXCEPTION:",e.message+"\n  "+e.filename,e.lineno+":"+e.colno)})}}();


// Dom Element Exists Plugin
// Tiny jQuery Plugin
// by Chris Goodchild
$.fn.exists = function(callback) {
  var args = [].slice.call(arguments, 1);

  if (this.length) {
    callback.call(this, args);
  }

  return this;
};


// FRAME RATE CALC for OPT ENGINE
// Based on http://www.kaizou.org/2011/06/effectively-measuring-browser-framerate-using-css/

var FPS = function(elem, property, output, fs) {
    var lastMargin = "";
    var framesRendered = 0;
    var measurements = 0;
    var timer1 = function() {
        measurements++;
        var style = window.getComputedStyle(elem);
        if (style[property] != lastMargin) {
            lastMargin = style[property];
            framesRendered++;
        }
        setTimeout(arguments.callee, 0);
    };
    timer1();
    var timer2 = function() {
        output.innerHTML = framesRendered*5 + "/" + measurements*5;
        fs = framesRendered;
        framesRendered = 0;
        measurements = 0;
        setTimeout(arguments.callee, 1 * 200);
    };
    timer2();
}
var f = new FPS(document.getElementById("ball"), "bottom", document.getElementById("fps"));

var Bouncer = function(elem, height, period) {
    elem.style.position = "absolute";
    elem.style.webkitTransitionDuration = period + "ms";
    elem.style.webkitTransitionProperty = "bottom";
    var isUp = false;
    var bounce = function() {
        if (isUp) {
            elem.style.bottom = height * 2 + "px";
            elem.style.webkitTransitionFunction = "ease-in";
        } else {
            elem.style.bottom = "0";
            elem.style.webkitTransitionFunction = "ease-out";
        }
        isUp ^= true;
        setTimeout(bounce, period);
    }
    bounce();
}
var b = new Bouncer(document.getElementById("ball"), 200, 1000);
window.addOne = function() {
    var node = document.getElementById("ball").cloneNode(true);
    document.body.appendChild(node);
    node.style.left = Math.random() * 400 + "px";
    var b = new Bouncer(node, Math.random() * 400, Math.random() * 2000);
    return false;
}



// jQuery BroadSign XML Calls
// Plugin by Frank JE Flitton
// https://github.com/FrankFlitton/jQuery-BroadSign-Player-API
//  
// Include last to avoid errors. 
//
// Action defaults to "Stop" behavior.
// Supports: action, frame_id, enabled, name, and id values.

var BroadSignSocket=new WebSocket("ws://localhost:2324");console.log("BroadSign Socket Init");var BSState="";!function(o){o.fn.BroadSignState=function(){0==BroadSignSocket.readyState?BSState="CONNECTING":1==BroadSignSocket.readyState?BSState="OPEN":2==BroadSignSocket.readyState?BSState="CLOSING":3==BroadSignSocket.readyState&&(BSState="CLOSED"),console.log("BroadSign Socket Status: "+BSState)}}(jQuery),$.fn.BroadSignState(),BroadSignSocket.onmessage=function(o){console.log("BroadSign Socket Message: "+o.data)},BroadSignSocket.onopen=function(){console.log("BroadSign Socket Status: OPEN")},BroadSignSocket.onclose=function(){console.log("BroadSign Socket Status: CLOSED")},BroadSignSocket.onerror=function(){console.log("BroadSign Socket Status: ERROR")},function(o){o.fn.BroadSignAction=function(n){console.log("Start BroadSign Socket Call"),o.fn.BroadSignState();var e=(new Date).getTime(),t={action:"stop",frame_id:null,enabled:null,name:null,id:e},a=o.extend(t,n),S='id="'+a.id+'" ',r='action="'+a.action+'" ',i="";if(null!=a.frame_id)var i='frame_id="'+a.frame_id+'" ';var c="";if(null!=a.enabled)var c='enabled="'+a.enabled+'" ';var d="";if(null!=a.name)var d='name="'+a.name+'" ';var l='<rc version="1" '+S+r+i+c+d+"/>\r\n\r\n";return console.log("To send: "+l),BroadSignSocket.send(l),console.log("Sent"),this}}(jQuery);

// Debug console show if left click or spacebar press.

$("body").click(function(){
    $("body").toggleClass("debug");
});
$('body').keypress(function(event) {
    if(event.which == 32 ) {
        $("body").toggleClass("debug");
    }
});