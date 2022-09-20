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
var HongBaoLabel = (function (_super) {
    __extends(HongBaoLabel, _super);
    function HongBaoLabel() {
        return _super.call(this) || this;
    }
    HongBaoLabel.createInstance = function () {
        return (fairygui.UIPackage.createObject("shaozhuAct", "HongBaoLabel"));
    };
    HongBaoLabel.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.n0 = (this.getChild("n0"));
    };
    HongBaoLabel.prototype.setText = function (str) {
        this.n0.text = str;
    };
    HongBaoLabel.prototype.reScroll = function () {
        this.scrollPane.setPercY(0);
        ;
    };
    HongBaoLabel.URL = "ui://w5ll6n5jhsa2i";
    return HongBaoLabel;
}(fairygui.GComponent));
__reflect(HongBaoLabel.prototype, "HongBaoLabel");
