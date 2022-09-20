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
var ViewShaoZhuEscortLook = (function (_super) {
    __extends(ViewShaoZhuEscortLook, _super);
    function ViewShaoZhuEscortLook() {
        var _this = _super.call(this) || this;
        _this.loadRes("ShaoZhuEscort", "ShaoZhuEscort_atlas0");
        return _this;
    }
    ViewShaoZhuEscortLook.createInstance = function () {
        return (fairygui.UIPackage.createObject("ShaoZhuEscort", "ViewShaoZhuEscortLook"));
    };
    ViewShaoZhuEscortLook.prototype.childrenCreated = function () {
        GGlobal.createPack("ShaoZhuEscort");
        this.view = fairygui.UIPackage.createObject("ShaoZhuEscort", "ViewShaoZhuEscortLook").asCom;
        this.contentPane = this.view;
        this.isShowMask = false;
        this.lb = (this.view.getChild("lb"));
        _super.prototype.childrenCreated.call(this);
    };
    ViewShaoZhuEscortLook.prototype.resetPosition = function () {
        this.setXY((fairygui.GRoot.inst.width - this.width) >> 1, (fairygui.GRoot.inst.height - this.height) >> 2);
    };
    ViewShaoZhuEscortLook.prototype.onShown = function () {
        _super.prototype.onShown.call(this);
    };
    ViewShaoZhuEscortLook.prototype.onHide = function () {
        GGlobal.layerMgr.close(UIConst.SHAOZHU_ESCORT_LOOK);
    };
    ViewShaoZhuEscortLook.URL = "ui://lnw94ki2h1frq";
    return ViewShaoZhuEscortLook;
}(UIModalPanel));
__reflect(ViewShaoZhuEscortLook.prototype, "ViewShaoZhuEscortLook");
