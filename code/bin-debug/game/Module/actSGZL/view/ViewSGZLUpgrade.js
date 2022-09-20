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
 * 三国战令进阶面板
 * @author: lujiahao
 * @date: 2019-09-20 14:59:18
 */
var ViewSGZLUpgrade = (function (_super) {
    __extends(ViewSGZLUpgrade, _super);
    function ViewSGZLUpgrade() {
        var _this = _super.call(this) || this;
        _this.loadRes("actHolyBeast", "actHolyBeast_atlas0");
        return _this;
    }
    ViewSGZLUpgrade.createInstance = function () {
        return (fairygui.UIPackage.createObject("actHolyBeast", "ViewSGZLUpgrade"));
    };
    ViewSGZLUpgrade.prototype.childrenCreated = function () {
        GGlobal.createPack("actHolyBeast");
        this.view = fairygui.UIPackage.createObject("actHolyBeast", "ViewSGZLUpgrade").asCom;
        this.contentPane = this.view;
        CommonManager.parseChildren(this.view, this);
        this.initView();
        _super.prototype.childrenCreated.call(this);
    };
    ViewSGZLUpgrade.prototype.initView = function () {
        this.btnGo.getTextField().stroke = 2;
    };
    //=========================================== API ==========================================
    ViewSGZLUpgrade.prototype.onShown = function () {
        var t = this;
        this.refreshData();
        this.registerEvent(true);
    };
    ViewSGZLUpgrade.prototype.onHide = function () {
        this.registerEvent(false);
        //关闭界面时候重新请求数据
        GGlobal.modelEightLock.CG4571(UIConst.ACTHB_SGZL); //重新请求更新奖励列表数据
    };
    //===================================== private method =====================================
    ViewSGZLUpgrade.prototype.refreshData = function () {
        this.stateCtrl.selectedIndex = GGlobal.modelSGZL.upgradeFlag;
    };
    ViewSGZLUpgrade.prototype.registerEvent = function (pFlag) {
        GGlobal.control.register(pFlag, Enum_MsgType.SGZL_REWARD_UPDATE, this.onUpdate, this);
        EventUtil.register(pFlag, this.btnGo, egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
    };
    //======================================== handler =========================================
    ViewSGZLUpgrade.prototype.onUpdate = function () {
        this.refreshData();
    };
    ViewSGZLUpgrade.prototype.onBtnClick = function (e) {
        switch (e.currentTarget) {
            case this.btnGo:
                //需要判断充值过没有，没有充值过的话，都是打开首充界面
                // ViewChongZhi.tryToOpenCZ();
                var t_chargeId = Config.sgzljin_017[1].shangpin;
                var t_charCfg = Config.shop_011[t_chargeId];
                if (t_charCfg) {
                    var t_tips = "充值168元后即可领取进阶奖励！";
                    GGlobal.modelchongzhi.CG_CHONGZHI_135(t_chargeId, t_tips, false);
                }
                break;
        }
    };
    //>>>>end
    ViewSGZLUpgrade.URL = "ui://d5y9ngt6tvlr27";
    return ViewSGZLUpgrade;
}(UIModalPanel));
__reflect(ViewSGZLUpgrade.prototype, "ViewSGZLUpgrade");
