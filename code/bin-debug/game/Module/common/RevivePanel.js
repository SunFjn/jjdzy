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
var RevivePanel = (function (_super) {
    __extends(RevivePanel, _super);
    function RevivePanel() {
        var _this = _super.call(this) || this;
        /**复活结束时间*/
        _this._time = 0;
        /**复活所需元宝*/
        _this._money = 0;
        /**归属系统类型*/
        _this._type = 0;
        _this.loadRes();
        return _this;
    }
    RevivePanel.createInstance = function () {
        return (fairygui.UIPackage.createObject("common", "RevivePanel"));
    };
    RevivePanel.prototype.childrenCreated = function () {
        var s = this;
        s.isClosePanel = false;
        s.view = fairygui.UIPackage.createObject("common", "RevivePanel").asCom;
        s.contentPane = s.view;
        this.n3 = (s.view.getChild("n3"));
        this.btn = (s.view.getChild("btn"));
        this.lbTime = (s.view.getChild("lbTime"));
        _super.prototype.childrenCreated.call(this);
    };
    /**设置复活结束时间  复活所需金钱*/
    RevivePanel.prototype.setReviveTime = function () {
        var cfg = 0;
        switch (this._type) {
            case UIConst.FHLY:
                cfg = ConfigHelp.getSystemNum(3906);
                this._money = ConfigHelp.getSystemNum(3905);
                break;
            case UIConst.WENDINGTX:
                cfg = ConfigHelp.getSystemNum(3906);
                this._money = ConfigHelp.getSystemNum(3905);
                break;
            case UIConst.HFKH_ZFZJ:
                cfg = ConfigHelp.getSystemNum(1012);
                this._money = ConfigHelp.getSystemNum(1013);
                break;
            case UIConst.LIANGCAO:
                cfg = ConfigHelp.getSystemNum(7602);
                this._money = ConfigHelp.getSystemNum(7603);
                break;
            case UIConst.TYJY_YMFB:
                cfg = ConfigHelp.getSystemNum(1012);
                this._money = ConfigHelp.getSystemNum(1013);
                break;
        }
        this._time = cfg * 1000 + Model_GlobalMsg.getServerTime();
    };
    RevivePanel.prototype.timeUpdate = function () {
        var now = Model_GlobalMsg.getServerTime();
        var t = ((this._time - now) / 1000) >> 0;
        this.lbTime.text = t + "秒";
        if (t <= 0) {
            switch (this._type) {
                case UIConst.LIANGCAO: //倒计时结束 烽火狼烟不需要通知后端
                case UIConst.FHLY: //倒计时结束 烽火狼烟不需要通知后端
                case UIConst.WENDINGTX://倒计时结束 问鼎天下不需要通知后端
                    GGlobal.layerMgr.close2(UIConst.REVIVE_PANEL);
                    Timer.instance.remove(this.timeUpdate, this);
                    break;
                case UIConst.HFKH_ZFZJ://倒计时结束 张飞醉酒通知后端复活
                    GGlobal.modelzfzj.CG_HeFuZhangFeiBoss_buyLive_9655(1);
                    GGlobal.layerMgr.close2(UIConst.REVIVE_PANEL);
                    Timer.instance.remove(this.timeUpdate, this);
                    break;
                case UIConst.TYJY_YMFB://倒计时结束 桃园结义不需要通知后端复活
                    // GGlobal.model_TYJY.CG_QUIT_TAOYUANBOSS(1);
                    GGlobal.model_TYJY.notify(Model_TYJY.ROLE_LIFE);
                    GGlobal.layerMgr.close2(UIConst.REVIVE_PANEL);
                    Timer.instance.remove(this.timeUpdate, this);
                    break;
            }
        }
    };
    RevivePanel.prototype.onRelife = function () {
        var m = Model_player.voMine;
        if (m.yuanbao < this._money) {
            ModelChongZhi.guideToRecharge();
            return;
        }
        ViewAlert.show("是否消耗<font color='#ffc334'>" + this._money + "元宝</font>立即复活", Handler.create(this, this.cg_revive));
    };
    RevivePanel.prototype.cg_revive = function () {
        switch (this._type) {
            case UIConst.FHLY:
                GGlobal.modelFengHuoLY.CG_REVIVE_3591();
                break;
            case UIConst.WENDINGTX:
                GGlobal.modelWenDingTX.revive4231();
                break;
            case UIConst.HFKH_ZFZJ:
                GGlobal.modelzfzj.CG_HeFuZhangFeiBoss_buyLive_9655(0);
                break;
            case UIConst.LIANGCAO:
                GGlobal.modelLiangCao.CG_relife_10133();
                break;
            case UIConst.TYJY_YMFB:
                GGlobal.model_TYJY.CG_QUIT_TAOYUANBOSS(1);
                break;
        }
    };
    RevivePanel.prototype.onShown = function () {
        this._type = this._args;
        this.setReviveTime();
        Timer.instance.listen(this.timeUpdate, this, 1000);
        this.btn.addClickListener(this.onRelife, this);
    };
    RevivePanel.prototype.onHide = function () {
        Timer.instance.remove(this.timeUpdate, this);
        this.btn.removeClickListener(this.onRelife, this);
        GGlobal.layerMgr.close(UIConst.REVIVE_PANEL);
    };
    RevivePanel.showView = function (arg) {
        if (!GGlobal.layerMgr.isOpenView(UIConst.REVIVE_PANEL))
            GGlobal.layerMgr.open(UIConst.REVIVE_PANEL, arg);
    };
    RevivePanel.hideView = function () {
        GGlobal.layerMgr.close2(UIConst.REVIVE_PANEL);
    };
    RevivePanel.URL = "ui://jvxpx9emcrbi3dv";
    return RevivePanel;
}(UIModalPanel));
__reflect(RevivePanel.prototype, "RevivePanel");
