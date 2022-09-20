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
var VNianShou = (function (_super) {
    __extends(VNianShou, _super);
    function VNianShou() {
        return _super.call(this) || this;
    }
    VNianShou.createInstance = function () {
        return (fairygui.UIPackage.createObject("actComNianShou", "VNianShou"));
    };
    VNianShou.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        CommonManager.parseChildren(s, s);
    };
    VNianShou.prototype.setImg = function (pz) {
        var s = this;
        IconUtil.setImg(s.img, Enum_Path.IMAGE_URL + "actCom/nianshou/ns.png");
        IconUtil.setImg(s.imgPz, Enum_Path.IMAGE_URL + "actCom/nianshou/" + pz + ".png");
    };
    VNianShou.prototype.clean = function () {
        _super.prototype.clean.call(this);
        var s = this;
        IconUtil.setImg(s.img, null);
        IconUtil.setImg(s.imgPz, null);
    };
    VNianShou.URL = "ui://ht2966i4plkmg";
    return VNianShou;
}(fairygui.GButton));
__reflect(VNianShou.prototype, "VNianShou");
