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
var YJDQ_Tab = (function (_super) {
    __extends(YJDQ_Tab, _super);
    function YJDQ_Tab() {
        return _super.call(this) || this;
    }
    YJDQ_Tab.createInstance = function () {
        return (fairygui.UIPackage.createObject("FuBen", "YJDQ_Tab"));
    };
    YJDQ_Tab.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var a = this;
        a.noticeImg = a.getChild("noticeImg").asImage;
    };
    YJDQ_Tab.prototype.checkNotice = function (value) {
        this.noticeImg.visible = value;
    };
    YJDQ_Tab.URL = "ui://pkuzcu87r4og10";
    return YJDQ_Tab;
}(fairygui.GButton));
__reflect(YJDQ_Tab.prototype, "YJDQ_Tab");
