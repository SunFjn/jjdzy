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
 * 单枪匹马界面
 */
var ViewDqpmQxzl = (function (_super) {
    __extends(ViewDqpmQxzl, _super);
    function ViewDqpmQxzl() {
        var _this = _super.call(this) || this;
        _this._cost = 0;
        _this.loadRes("qxzl", "qxzl_atlas0");
        return _this;
    }
    ViewDqpmQxzl.createInstance = function () {
        return (fairygui.UIPackage.createObject("qxzl", "View_Qxzl_Alert"));
    };
    ViewDqpmQxzl.prototype.childrenCreated = function () {
        GGlobal.createPack("qxzl");
        this.view = fairygui.UIPackage.createObject("qxzl", "View_Qxzl_Alert").asCom;
        this.contentPane = this.view;
        CommonManager.parseChildren(this.view, this);
        this.initView();
        _super.prototype.childrenCreated.call(this);
    };
    ViewDqpmQxzl.prototype.initView = function () {
        var t = this;
        var cfg = Config.xtcs_004[7650];
        t._cost = Number(ConfigHelp.SplitStr(cfg.other)[0][2]);
        var cfg1 = Config.xtcs_004[7651];
        t.tipsTxt.text = "是否花费" + t._cost + "元宝激活单枪匹马" + cfg1.num + "分钟，激活后可攻打任意敌国城池！";
        t.lbYuanbao.text = t._cost + "";
    };
    ViewDqpmQxzl.prototype.onShown = function () {
        var t = this;
        t.registerEvent(true);
    };
    ViewDqpmQxzl.prototype.onHide = function () {
        var t = this;
        t.registerEvent(false);
        GGlobal.layerMgr.close(UIConst.QXZL_DQPM);
    };
    ViewDqpmQxzl.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    ViewDqpmQxzl.prototype.registerEvent = function (pFlag) {
        var t = this;
        EventUtil.register(pFlag, t.btnCancel, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        EventUtil.register(pFlag, t.btnOk, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
    };
    ViewDqpmQxzl.prototype.onBtnClick = function (e) {
        var t = this;
        switch (e.currentTarget) {
            case t.btnCancel:
                GGlobal.layerMgr.close(UIConst.QXZL_DQPM);
                break;
            case t.btnOk:
                if (Model_player.voMine.yuanbao < t._cost) {
                    ViewCommonWarn.text("元宝不足");
                    return;
                }
                GGlobal.modelQxzl.CG_BuffBuy_8985();
                break;
        }
    };
    ViewDqpmQxzl.URL = "ui://6d8dzzdgvhu61l";
    return ViewDqpmQxzl;
}(UIModalPanel));
__reflect(ViewDqpmQxzl.prototype, "ViewDqpmQxzl");
