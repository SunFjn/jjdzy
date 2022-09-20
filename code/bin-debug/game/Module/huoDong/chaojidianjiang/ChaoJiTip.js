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
var ChaoJiTip = (function (_super) {
    __extends(ChaoJiTip, _super);
    function ChaoJiTip() {
        return _super.call(this) || this;
    }
    ChaoJiTip.createInstance = function () {
        return (fairygui.UIPackage.createObject("huoDong", "ChaoJiTip"));
    };
    ChaoJiTip.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.tip = (this.getChild("tip"));
        this.t0 = this.getTransition("t0");
    };
    ChaoJiTip.URL = "ui://vrw7je9rwuzz10";
    return ChaoJiTip;
}(fairygui.GComponent));
__reflect(ChaoJiTip.prototype, "ChaoJiTip");
