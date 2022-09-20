var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var TqIt = (function (_super) {
    __extends(TqIt, _super);
    function TqIt() {
        return _super.call(this) || this;
    }
    TqIt.createInstance = function () {
        return (fairygui.UIPackage.createObject("tequan", "TqIt"));
    };
    TqIt.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.lb = (this.getChild("lb"));
    };
    TqIt.prototype.setText = function (val) {
        this.lb.text = val;
    };
    TqIt.URL = "ui://k82cjspump0412";
    return TqIt;
}(fairygui.GComponent));
__reflect(TqIt.prototype, "TqIt");
