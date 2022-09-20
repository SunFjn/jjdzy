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
var ViewCrossMineralLook = (function (_super) {
    __extends(ViewCrossMineralLook, _super);
    function ViewCrossMineralLook() {
        var _this = _super.call(this) || this;
        _this.loadRes("crossKing", "crossKing_atlas0");
        return _this;
    }
    ViewCrossMineralLook.createInstance = function () {
        return (fairygui.UIPackage.createObject("crossKing", "ViewCrossMineralLook"));
    };
    ViewCrossMineralLook.prototype.childrenCreated = function () {
        GGlobal.createPack("crossKing");
        this.view = fairygui.UIPackage.createObject("crossKing", "ViewCrossMineralLook").asCom;
        this.contentPane = this.view;
        this.isShowMask = false;
        this.lb = (this.view.getChild("lb"));
        _super.prototype.childrenCreated.call(this);
    };
    ViewCrossMineralLook.prototype.resetPosition = function () {
        this.setXY((fairygui.GRoot.inst.width - this.width) >> 1, (fairygui.GRoot.inst.height - this.height) >> 2);
    };
    ViewCrossMineralLook.prototype.onShown = function () {
        _super.prototype.onShown.call(this);
    };
    ViewCrossMineralLook.prototype.onHide = function () {
        GGlobal.layerMgr.close(UIConst.CROSS_MINE_LOOK);
    };
    ViewCrossMineralLook.URL = "ui://yqpfulefupam5l";
    return ViewCrossMineralLook;
}(UIModalPanel));
__reflect(ViewCrossMineralLook.prototype, "ViewCrossMineralLook");
