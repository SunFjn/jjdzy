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
var guideTip = (function (_super) {
    __extends(guideTip, _super);
    function guideTip() {
        return _super.call(this) || this;
    }
    guideTip.createInstance = function () {
        return (fairygui.UIPackage.createObject("MainUI", "guideTip"));
    };
    guideTip.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.imgAuto = (this.getChild("imgAuto"));
        this.g2 = (this.getChild("g2"));
    };
    guideTip.URL = "ui://7gxkx46wfzsd55";
    return guideTip;
}(fairygui.GComponent));
__reflect(guideTip.prototype, "guideTip");
