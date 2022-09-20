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
 * 义盟副本子界面
 */
var Child_TYBoss = (function (_super) {
    __extends(Child_TYBoss, _super);
    function Child_TYBoss() {
        var _this = _super.call(this) || this;
        _this._cost = 0;
        return _this;
    }
    Child_TYBoss.createInstance = function () {
        return (fairygui.UIPackage.createObject("taoYuanJieYi", "Child_TYBoss"));
    };
    Child_TYBoss.prototype.initView = function (pParent) {
        this._viewParent = pParent;
        this.addRelation(this._viewParent, fairygui.RelationType.Size);
    };
    Child_TYBoss.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
        self.vres.setType(1);
    };
    Child_TYBoss.prototype.openPanel = function (pData) {
        var self = this;
        GGlobal.model_TYJY.CG_OPEN_TYBOSSUI();
        GGlobal.control.listen(UIConst.TYJY_YMFB, self.updateView, self);
        self.lowBtn.addClickListener(self.onLow, self);
        self.highBtn.addClickListener(self.onHigh, self);
        self.challengeBtn.addClickListener(self.onChallenge, self);
        self.lowItem.setData(0);
        self.highItem.setData(1);
    };
    Child_TYBoss.prototype.closePanel = function () {
        this.onHide();
    };
    Child_TYBoss.prototype.onHide = function () {
        var self = this;
        GGlobal.control.remove(UIConst.TYJY_YMFB, self.updateView, self);
        self.lowBtn.removeClickListener(self.onLow, self);
        self.highBtn.removeClickListener(self.onHigh, self);
        self.challengeBtn.removeClickListener(self.onChallenge, self);
        self.lowItem.clean();
        self.highItem.clean();
        Timer.instance.remove(self.onUpdate, self);
    };
    /**
     * 更新页面数据
     */
    Child_TYBoss.prototype.updateView = function () {
        var model = GGlobal.model_TYJY;
        var s = this;
        Timer.instance.listen(s.onUpdate, s, 1000);
        if (Model_TYJY.curBossID == 0) {
            var value = model.bossPro;
            var total = Config.xtcs_004[7702].num;
            s.expBar.max = total;
            s.expBar.value = value;
            s.expBar._titleObject.text = value + "/" + total;
            if (value >= total) {
                s.c1.selectedIndex = 1;
                s.lowBtn.checkNotice = true;
                s.highBtn.checkNotice = true;
                s.vres.icon = CommonManager.getMoneyUrl(Enum_Attr.yuanBao);
                var cfg = Config.tyjyboss_251[343002];
                s._cost = Number(ConfigHelp.SplitStr(cfg.consume)[0][2]);
                s.vres.text = "" + s._cost;
                if (Model_player.voMine.yuanbao >= s._cost) {
                    s.vres.color = Color.GREENINT;
                }
                else {
                    s.vres.color = Color.REDINT;
                }
            }
            else {
                s.c1.selectedIndex = 0;
                s.tipsLb.text = "每日总共完成" + total + "个义盟任务可选择一个boss开启";
            }
        }
        else {
            s.getImg.visible = false;
            s.challengeBtn.visible = false;
            s.challengeBtn.checkNotice = false;
            s.c1.selectedIndex = 2;
            if (Model_TYJY.curBossID == 343001) {
                s.nameLb.text = model.bossOpenByPlayer + "开启了低级BOSS";
            }
            else {
                s.nameLb.text = model.bossOpenByPlayer + "开启了高级BOSS";
            }
            if (model.bossGet == 0) {
                s.challengeBtn.visible = true;
                s.challengeBtn.text = "挑战BOSS";
            }
            else if (model.bossGet == 1) {
                s.challengeBtn.visible = true;
                s.challengeBtn.text = "领取奖励";
                s.challengeBtn.checkNotice = true;
            }
            else {
                s.getImg.visible = true;
            }
        }
    };
    Child_TYBoss.prototype.onUpdate = function () {
        var model = GGlobal.model_TYJY;
        var end = model.bossTime ? model.bossTime : 0;
        if (end > 0) {
            this.labTime.text = "剩余时间：<font color='#15f234'>" + DateUtil.getMSBySecond4(end) + "</font>";
        }
        else {
            this.labTime.text = "00:00:00";
        }
    };
    /**
     * 低级开启
     */
    Child_TYBoss.prototype.onLow = function (e) {
        GGlobal.layerMgr.open(UIConst.TYJY_BOSSTIPS);
    };
    /**
     * 高级开启
     */
    Child_TYBoss.prototype.onHigh = function (e) {
        if (Model_player.voMine.yuanbao < this._cost) {
            ViewCommonWarn.text("元宝不足");
            return;
        }
        GGlobal.model_TYJY.CG_OPEN_BOSS(343002);
    };
    /**
     * 挑战BOSS
     */
    Child_TYBoss.prototype.onChallenge = function (e) {
        if (GGlobal.model_TYJY.bossGet == 0) {
            if (GGlobal.sceneType == SceneCtrl.TAOYUANJIEYI)
                return;
            GGlobal.model_TYJY.CG_CHALLENGE_BOSS();
        }
        else {
            GGlobal.model_TYJY.CG_GET_BOSSREWARD();
        }
    };
    Child_TYBoss.URL = "ui://m2fm2aiyvfmxz";
    return Child_TYBoss;
}(fairygui.GComponent));
__reflect(Child_TYBoss.prototype, "Child_TYBoss", ["IPanel"]);
