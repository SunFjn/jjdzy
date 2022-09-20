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
var VBaZTChip = (function (_super) {
    __extends(VBaZTChip, _super);
    function VBaZTChip() {
        return _super.call(this) || this;
    }
    VBaZTChip.createInstance = function () {
        return (fairygui.UIPackage.createObject("baZhenTu", "VBaZTChip"));
    };
    VBaZTChip.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        CommonManager.parseChildren(s, s);
        this.getTextField().addEventListener(fairygui.GObject.SIZE_CHANGED, this.resize1, this);
    };
    VBaZTChip.prototype.resize1 = function () {
        this.imgDi.width = Math.max(140, this.getTextField().x + this.getTextField().width - 10);
    };
    VBaZTChip.URL = "ui://xrzn9ppab5l216";
    return VBaZTChip;
}(fairygui.GLabel));
__reflect(VBaZTChip.prototype, "VBaZTChip");
