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
 * 三国战令（活动）进阶面板
 * @author: lujiahao
 * @date: 2019-11-15 16:18:23
 */
var ViewSGZL2Upgrade = (function (_super) {
    __extends(ViewSGZL2Upgrade, _super);
    function ViewSGZL2Upgrade() {
        var _this = _super.call(this) || this;
        _this.loadRes("actComSgzl2", "actComSgzl2_atlas0");
        return _this;
    }
    ViewSGZL2Upgrade.createInstance = function () {
        return (fairygui.UIPackage.createObject("actComSgzl2", "ViewSGZL2Upgrade"));
    };
    ViewSGZL2Upgrade.prototype.childrenCreated = function () {
        GGlobal.createPack("actComSgzl2");
        this.view = fairygui.UIPackage.createObject("actComSgzl2", "ViewSGZL2Upgrade").asCom;
        this.contentPane = this.view;
        CommonManager.parseChildren(this.view, this);
        this.initView();
        _super.prototype.childrenCreated.call(this);
    };
    ViewSGZL2Upgrade.prototype.initView = function () {
        this.btnGo.getTextField().stroke = 2;
    };
    ViewSGZL2Upgrade.prototype.onShown = function () {
        var t = this;
        t._cfgID = t._args;
        this.refreshData();
        this.registerEvent(true);
    };
    ViewSGZL2Upgrade.prototype.onHide = function () {
        this.registerEvent(false);
        //关闭界面时候重新请求数据
        GGlobal.modelActivity.CG_OPENACT(UIConst.ACTCOM_SGZL2); //重新请求更新奖励列表数据
    };
    //===================================== private method =====================================
    ViewSGZL2Upgrade.prototype.refreshData = function () {
        this.stateCtrl.selectedIndex = GGlobal.modelSGZL2.upgradeFlag;
        var cfg = Config.sgzljin_332[this._cfgID];
        this.tfDes.text = cfg.wz;
        IconUtil.setImg(this.imgHead, RoleUtil.getHeadRole(cfg.zy));
    };
    ViewSGZL2Upgrade.prototype.registerEvent = function (pFlag) {
        GGlobal.control.register(pFlag, Enum_MsgType.SGZL2_REWARD_UPDATE, this.onUpdate, this);
        EventUtil.register(pFlag, this.btnGo, egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
    };
    //======================================== handler =========================================
    ViewSGZL2Upgrade.prototype.onUpdate = function () {
        this.refreshData();
    };
    ViewSGZL2Upgrade.prototype.onBtnClick = function (e) {
        switch (e.currentTarget) {
            case this.btnGo:
                //需要判断充值过没有，没有充值过的话，都是打开首充界面
                // ViewChongZhi.tryToOpenCZ();
                var t_qs = GGlobal.modelSGZL2.getCurQs();
                for (var key in Config.sgzljin_332) {
                    var cfg = Config.sgzljin_332[key];
                    if (cfg.qs == t_qs) {
                        var t_charCfg = Config.shop_011[cfg.shangpin];
                        if (t_charCfg) {
                            var t_tips = "充值168元后即可领取进阶奖励！";
                            GGlobal.modelchongzhi.CG_CHONGZHI_135(cfg.shangpin, t_tips, false);
                        }
                        break;
                    }
                }
                break;
        }
    };
    //>>>>end
    ViewSGZL2Upgrade.URL = "ui://ggwi8wepqhocn";
    return ViewSGZL2Upgrade;
}(UIModalPanel));
__reflect(ViewSGZL2Upgrade.prototype, "ViewSGZL2Upgrade");
