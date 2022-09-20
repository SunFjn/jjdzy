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
var ViewVideotapLook = (function (_super) {
    __extends(ViewVideotapLook, _super);
    function ViewVideotapLook() {
        var _this = _super.call(this) || this;
        _this.childrenCreated();
        return _this;
    }
    ViewVideotapLook.createInstance = function () {
        return (fairygui.UIPackage.createObject("common", "ViewVideotapLook"));
    };
    ViewVideotapLook.prototype.childrenCreated = function () {
        var self = this;
        self.view = fairygui.UIPackage.createObject("common", "ViewVideotapLook").asCom;
        self.contentPane = this.view;
        self.isShowMask = false;
        CommonManager.parseChildren(self.view, self);
        _super.prototype.childrenCreated.call(this);
    };
    ViewVideotapLook.prototype.resetPosition = function () {
        var self = this;
        self.setXY((fairygui.GRoot.inst.width - self.width) >> 1, (fairygui.GRoot.inst.height - self.height) >> 2);
    };
    ViewVideotapLook.prototype.onShown = function () {
        _super.prototype.onShown.call(this);
    };
    ViewVideotapLook.prototype.onHide = function () {
        GGlobal.layerMgr.close(UIConst.COMMON_VIDEOTAP);
    };
    ViewVideotapLook.URL = "ui://jvxpx9emqc9h3id";
    return ViewVideotapLook;
}(UIModalPanel));
__reflect(ViewVideotapLook.prototype, "ViewVideotapLook");
