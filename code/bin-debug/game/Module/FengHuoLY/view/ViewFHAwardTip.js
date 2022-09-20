/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
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
var ViewFHAwardTip = (function (_super) {
    __extends(ViewFHAwardTip, _super);
    function ViewFHAwardTip() {
        return _super.call(this) || this;
    }
    ViewFHAwardTip.createInstance = function () {
        return (fairygui.UIPackage.createObject("FengHuoLY", "ViewFHAwardTip"));
    };
    ViewFHAwardTip.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.n0 = (this.getChild("n0"));
        this.btn = (this.getChild("btn"));
    };
    ViewFHAwardTip.URL = "ui://edvdots4srrsa";
    return ViewFHAwardTip;
}(fairygui.GComponent));
__reflect(ViewFHAwardTip.prototype, "ViewFHAwardTip");
