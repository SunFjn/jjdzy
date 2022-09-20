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
var View_TSMS_Panel = (function (_super) {
    __extends(View_TSMS_Panel, _super);
    function View_TSMS_Panel() {
        var _this = _super.call(this) || this;
        _this.loadRes();
        return _this;
    }
    View_TSMS_Panel.prototype.childrenCreated = function () {
        var s = this;
        s.isShowMask = false;
        s.isClosePanel = false;
        s.view = fairygui.UIPackage.createObject("common", "View_TSMS_Panel").asCom;
        s.contentPane = s.view;
        s.t0 = s.view.getTransition("t0");
        s.iconImg = s.view.getChild("iconImg").asLoader;
        _super.prototype.childrenCreated.call(this);
        s.touchable = false;
    };
    View_TSMS_Panel.prototype.onShown = function () {
        IconUtil.setImg(this.iconImg, "resource/image/shenji/" + this._args + ".png");
        this.t0.play();
    };
    View_TSMS_Panel.prototype.onHide = function () {
        IconUtil.setImg(this.iconImg, null);
        GGlobal.layerMgr.close(UIConst.TSMS_PANEL);
    };
    View_TSMS_Panel.prototype.resetPosition = function () {
        this.setXY(100, 280);
    };
    View_TSMS_Panel.URL = "ui://jvxpx9emhc263ew";
    return View_TSMS_Panel;
}(UIModalPanel));
__reflect(View_TSMS_Panel.prototype, "View_TSMS_Panel");
