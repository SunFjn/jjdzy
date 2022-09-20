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
var VHomeBtnMaidWel = (function (_super) {
    __extends(VHomeBtnMaidWel, _super);
    function VHomeBtnMaidWel() {
        return _super.call(this) || this;
    }
    VHomeBtnMaidWel.createInstance = function () {
        return (fairygui.UIPackage.createObject("home", "VHomeBtnMaidWel"));
    };
    VHomeBtnMaidWel.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.imgBg = (this.getChild("imgBg"));
        this.getTextField().addEventListener(fairygui.GObject.SIZE_CHANGED, this.cgeTxt, this);
    };
    // public setText(v) {
    // 	this.text = v;
    // }
    VHomeBtnMaidWel.prototype.cgeTxt = function () {
        var t = this.getTextField();
        this.imgBg.height = t.y + t.height + 20;
    };
    VHomeBtnMaidWel.URL = "ui://y0plc878q29p25";
    return VHomeBtnMaidWel;
}(fairygui.GLabel));
__reflect(VHomeBtnMaidWel.prototype, "VHomeBtnMaidWel");
