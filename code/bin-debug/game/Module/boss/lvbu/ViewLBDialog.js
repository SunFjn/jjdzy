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
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var ViewLBDialog = (function (_super) {
    __extends(ViewLBDialog, _super);
    function ViewLBDialog() {
        var _this = _super.call(this) || this;
        _this.isShowOpenAnimation = false;
        _this.isShowMask = false;
        _this.isFullScreen = false;
        _this.setSkin("Boss", "", "ViewLBDialog");
        return _this;
    }
    ViewLBDialog.createInstance = function () {
        return (fairygui.UIPackage.createObject("Boss", "ViewLBDialog"));
    };
    ViewLBDialog.prototype.initView = function () {
        _super.prototype.initView.call(this);
    };
    ViewLBDialog.prototype.close = function () {
        GGlobal.layerMgr.close2(UIConst.LVBUDAILOG);
    };
    ViewLBDialog.prototype.onShown = function () {
        this.setXY(-500, 380);
        var str = Config.lvbuboss_224[GGlobal.modelBoss.curEnterId].taici;
        this.lb.text = str;
        egret.Tween.get(this).to({ x: 41 }, 500).wait(2000).to({ x: 700 }, 500).call(this.close, this);
    };
    ViewLBDialog.prototype.onHide = function () {
    };
    ViewLBDialog.URL = "ui://47jfyc6ebx2z2e";
    return ViewLBDialog;
}(UIPanelBase));
__reflect(ViewLBDialog.prototype, "ViewLBDialog");
