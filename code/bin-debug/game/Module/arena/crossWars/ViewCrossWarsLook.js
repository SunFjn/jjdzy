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
var ViewCrossWarsLook = (function (_super) {
    __extends(ViewCrossWarsLook, _super);
    function ViewCrossWarsLook() {
        var _this = _super.call(this) || this;
        _this.loadRes("Arena", "Arena_atlas0");
        return _this;
    }
    ViewCrossWarsLook.createInstance = function () {
        return (fairygui.UIPackage.createObject("Arena", "ViewCrossWarsLook"));
    };
    ViewCrossWarsLook.prototype.childrenCreated = function () {
        GGlobal.createPack("Arena");
        var self = this;
        self.view = fairygui.UIPackage.createObject("Arena", "ViewCrossWarsLook").asCom;
        self.contentPane = self.view;
        self.isShowMask = false;
        self.lb = (self.view.getChild("lb"));
        _super.prototype.childrenCreated.call(this);
    };
    ViewCrossWarsLook.prototype.resetPosition = function () {
        var self = this;
        self.setXY((fairygui.GRoot.inst.width - self.width) >> 1, (fairygui.GRoot.inst.height - self.height) >> 2);
    };
    ViewCrossWarsLook.prototype.onShown = function () {
        _super.prototype.onShown.call(this);
    };
    ViewCrossWarsLook.prototype.onHide = function () {
        GGlobal.layerMgr.close(UIConst.CROSS_WARS_LOOK);
    };
    ViewCrossWarsLook.URL = "ui://yqpfulefnw6y2r";
    return ViewCrossWarsLook;
}(UIModalPanel));
__reflect(ViewCrossWarsLook.prototype, "ViewCrossWarsLook");
