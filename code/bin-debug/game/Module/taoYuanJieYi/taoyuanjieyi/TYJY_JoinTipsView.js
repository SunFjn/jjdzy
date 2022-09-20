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
/**
 * 加入义盟弹窗tips
 */
var TYJY_JoinTipsView = (function (_super) {
    __extends(TYJY_JoinTipsView, _super);
    function TYJY_JoinTipsView() {
        var _this = _super.call(this) || this;
        _this.loadRes("taoYuanJieYi", "taoYuanJieYi_atlas0");
        return _this;
    }
    TYJY_JoinTipsView.prototype.childrenCreated = function () {
        GGlobal.createPack("taoYuanJieYi");
        this.view = fairygui.UIPackage.createObject("taoYuanJieYi", "TYJY_JoinTipsView").asCom;
        this.contentPane = this.view;
        CommonManager.parseChildren(this.view, this);
        _super.prototype.childrenCreated.call(this);
        // this.resetPosition();
    };
    TYJY_JoinTipsView.prototype.resetPosition = function () {
        this.setXY((fairygui.GRoot.inst.width - this.width) / 2, (fairygui.GRoot.inst.height - this.height) / 2);
    };
    TYJY_JoinTipsView.prototype.onShown = function () {
        this.btnGo.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this.updateShow();
    };
    TYJY_JoinTipsView.prototype.onHide = function () {
        if (this.btnGo) {
            this.btnGo.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        }
    };
    TYJY_JoinTipsView.prototype.onClick = function () {
        GGlobal.layerMgr.open(UIConst.TAOYUANJIEYI);
        this.closeEventHandler(null);
    };
    TYJY_JoinTipsView.show = function () {
        if (GGlobal.sceneType != SceneCtrl.GUANQIA)
            return; //在副本中不弹窗
        if (GGlobal.layerMgr.isOpenView(UIConst.TYJY_JOINTIPS)) {
            var v = GGlobal.layerMgr.getView(UIConst.TYJY_JOINTIPS);
            v.updateShow();
        }
        else {
            GGlobal.layerMgr.open(UIConst.TYJY_JOINTIPS);
        }
    };
    TYJY_JoinTipsView.prototype.updateShow = function () {
        this.tipsLb.text = "海内存知己，天涯诺比邻。\n恭喜你加入了义盟<font color='" + Color.YELLOWSTR + "'>" + GGlobal.model_TYJY.joinGang + "</font>\n快和兄弟们一起闯荡吧";
    };
    return TYJY_JoinTipsView;
}(UIModalPanel));
__reflect(TYJY_JoinTipsView.prototype, "TYJY_JoinTipsView");
