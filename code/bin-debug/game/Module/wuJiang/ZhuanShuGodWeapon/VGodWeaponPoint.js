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
var VGodWeaponPoint = (function (_super) {
    __extends(VGodWeaponPoint, _super);
    function VGodWeaponPoint() {
        return _super.call(this) || this;
    }
    VGodWeaponPoint.createInstance = function () {
        return (fairygui.UIPackage.createObject("wuJiang", "VGodWeaponPoint"));
    };
    VGodWeaponPoint.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        CommonManager.parseChildren(this, this);
    };
    VGodWeaponPoint.prototype.setVo = function (rewardVo, num) {
        var self = this;
        self.lbPoint.text = num + "次";
        self.btnPoint.isShowEff = true;
        self.btnPoint.tipEnabled = true;
        self.btnPoint.vo = rewardVo;
    };
    VGodWeaponPoint.prototype.clean = function () {
        this.btnPoint.clean();
    };
    VGodWeaponPoint.URL = "ui://zyx92gzwm4uj47";
    return VGodWeaponPoint;
}(fairygui.GComponent));
__reflect(VGodWeaponPoint.prototype, "VGodWeaponPoint");
