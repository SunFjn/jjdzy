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
var JueXingIconBt = (function (_super) {
    __extends(JueXingIconBt, _super);
    function JueXingIconBt() {
        return _super.call(this) || this;
    }
    JueXingIconBt.createInstance = function () {
        return (fairygui.UIPackage.createObject("jueXing", "JueXingIconBt"));
    };
    JueXingIconBt.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.noticeImg = (this.getChild("noticeImg"));
        this.selImg = (this.getChild("selImg"));
    };
    JueXingIconBt.prototype.checkNotice = function (value) {
        this.noticeImg.visible = value;
    };
    JueXingIconBt.prototype.choose = function (value) {
        this.selImg.visible = value;
    };
    JueXingIconBt.URL = "ui://tbqdf7fdzgylc";
    return JueXingIconBt;
}(fairygui.GButton));
__reflect(JueXingIconBt.prototype, "JueXingIconBt");
