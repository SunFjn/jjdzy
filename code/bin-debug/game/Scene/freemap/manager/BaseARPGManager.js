var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 管理进出寻路地图控制器
 * (问鼎和BOSS战场不受控制)
 * */
var BaseARPGManager = (function () {
    function BaseARPGManager() {
    }
    BaseARPGManager.prototype.setPackageItemExtension = function (clz) {
        fairygui.UIObjectFactory.setPackageItemExtension(clz.URL, clz);
    };
    BaseARPGManager.prototype.enter = function () {
    };
    BaseARPGManager.prototype.exite = function () {
    };
    return BaseARPGManager;
}());
__reflect(BaseARPGManager.prototype, "BaseARPGManager");
