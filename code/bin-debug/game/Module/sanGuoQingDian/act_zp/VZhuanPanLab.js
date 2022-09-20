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
var VZhuanPanLab = (function (_super) {
    __extends(VZhuanPanLab, _super);
    function VZhuanPanLab() {
        return _super.call(this) || this;
    }
    VZhuanPanLab.createInstance = function () {
        return (fairygui.UIPackage.createObject("sanGuoQingDian", "VZhuanPanLab"));
    };
    VZhuanPanLab.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.lab = (this.getChild("lab"));
    };
    Object.defineProperty(VZhuanPanLab.prototype, "vo", {
        set: function (v) {
            var vc = Config.daoju_204[v.id];
            this.lab.text = v.na + "抽中了" + "[color=" + Color.getColorStr(vc.quality) + "]" + vc.name + "[/color]" + "*" + v.ct;
        },
        enumerable: true,
        configurable: true
    });
    VZhuanPanLab.URL = "ui://kdt501v2xx4116";
    return VZhuanPanLab;
}(fairygui.GComponent));
__reflect(VZhuanPanLab.prototype, "VZhuanPanLab");
