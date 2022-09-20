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
/**关卡BOSS入口*/ var ViewGQBossUI = (function (_super) {
    __extends(ViewGQBossUI, _super);
    function ViewGQBossUI() {
        var _this = _super.call(this) || this;
        _this._limitLevel = -1;
        _this._l = -999999;
        _this.awards = [];
        _this.isShowOpenAnimation = false;
        _this.setSkin("guanqia", "guanqia_atlas0", "ViewGQBossUI");
        return _this;
    }
    ViewGQBossUI.createInstance = function () {
        return (fairygui.UIPackage.createObject("guanqia", "ViewGQBossUI"));
    };
    ViewGQBossUI.prototype.setExtends = function () {
        fairygui.UIObjectFactory.setPackageItemExtension(PanellistItem.URL, PanellistItem);
        fairygui.UIObjectFactory.setPackageItemExtension(VGQInfo.URL, VGQInfo);
    };
    ViewGQBossUI.prototype.initView = function () {
        _super.prototype.initView.call(this);
        var s = this;
        s.btnQRS.addClickListener(s.openQRZ, s);
        s.btnRank.addClickListener(s.openRank, s);
        s.btnFight.addClickListener(s.fightBossHandler, s);
        s.btnSweeping.addClickListener(s.sweepingHandler, s);
        s.btnSendHelp.addClickListener(s.helpHD, s);
        s.rank0.index = 0;
        s.rank1.index = 1;
        s.rank2.index = 2;
        s.grid.tipEnabled = true;
        s.n61.callbackThisObj = s;
        s.n61.itemRenderer = s.awardsRender;
        // s.preview.resetPosition = s.preview.resetPosition1;
    };
    ViewGQBossUI.prototype.awardsRender = function (idx, obj) {
        var item = obj;
        item.vo = this.awards[idx];
        item.tipEnabled = true;
        item.grid.showEff(true);
    };
    ViewGQBossUI.prototype.openQRZ = function () {
        GGlobal.layerMgr.open(UIConst.QIANRENZHAN);
    };
    ViewGQBossUI.prototype.openRank = function () {
        GGlobal.layerMgr.open(UIConst.GUANQIARNK);
    };
    //扫荡
    ViewGQBossUI.prototype.sweepingHandler = function () {
        GGlobal.layerMgr.open(UIConst.GUANQIASWEEPING);
    };
    ViewGQBossUI.prototype.helpHD = function () {
        if (this._limitLevel == -1) {
            this._limitLevel = ConfigHelp.getSystemNum(3924);
        }
        if (GGlobal.modelGuanQia.curGuanQiaLv < this._limitLevel) {
            ViewCommonWarn.text(BroadCastManager.reTxt("关卡求助{0}关开启", this._limitLevel));
            return;
        }
        if (GGlobal.modelGuanQia.help == 0) {
            ViewCommonWarn.text("求助次数不足");
            return;
        }
        GGlobal.modelGuanQia.helpRed = 0;
        this.checkNotice();
        GGlobal.modelGuanQiaHelp.CG_5901_HELP();
    };
    //挑战BOSS
    ViewGQBossUI.prototype.fightBossHandler = function () {
        if (this.hasNotPass()) {
            GGlobal.modelGuanQia.CG_FIGHTBOSS_1113();
        }
    };
    ViewGQBossUI.prototype.hasNotPass = function () {
        if (ModelGuanQia.hasPassed()) {
            var nextGQ = ModelGuanQia.curGQID + 1;
            var cfg = Config.dgq_205[nextGQ];
            if (cfg) {
                ViewCommonWarn.text("请先前往" + cfg.mingcheng);
            }
            return false;
        }
        return true;
    };
    ViewGQBossUI.prototype.checkNotice = function () {
        // this.progress.visible = this.btnQRS.visible = Model_player.voMine.level >= Config.xtcs_004[4425].num;
        // this.btnSweeping.visible = Model_player.voMine.level >= Config.xtcs_004[4424].num;
        this.progress.visible = this.btnQRS.visible = Model_LunHui.realLv >= Config.xtcs_004[4425].num;
        this.btnSweeping.visible = Model_LunHui.realLv >= Config.xtcs_004[4424].num;
        this.btnQRS.checkNotice = GGlobal.reddot.checkCondition(UIConst.GUANQIABOSSUI, 1);
        this.btnSweeping.checkNotice = GGlobal.reddot.checkCondition(UIConst.GUANQIABOSSUI);
        var m = GGlobal.modelGuanQia;
        if (this._limitLevel == -1) {
            this._limitLevel = ConfigHelp.getSystemNum(3924);
        }
        this.btnSendHelp.checkNotice = (m.help > 0 || m.helpCount > 0) && m.helpRed == 1 && m.curGuanQiaLv >= this._limitLevel;
    };
    ViewGQBossUI.prototype.onShown = function () {
        var s = this;
        var c = GGlobal.control;
        s.reqRankData();
        s.updateGK();
        s.updateRnk();
        s.updateWave();
        s.checkNotice();
        GGlobal.reddot.listen(UIConst.GUANQIABOSSUI, s.checkNotice, s);
        c.listen(Enum_MsgType.MSG_WAVEUPDATE, s.updateWave, s);
        c.listen(Enum_MsgType.MSG_GQ_UPDATE, s.updateGK, s);
        c.listen(Enum_MsgType.MSG_BOSSINFO, s.updateRnk, s);
        c.listen(Model_player.MSG_HERO_LEVEL, s.checkNotice, s);
        IconUtil.setImg(this.guanqiaBg, Enum_Path.BACK_URL + "guanqia.jpg");
        GGlobal.modelGuanQia.listen(ModelGuanQia.msg_gqGetRed, this.updateMap, this);
    };
    ViewGQBossUI.prototype.onHide = function () {
        var s = this;
        var c = GGlobal.control;
        GGlobal.layerMgr.close(UIConst.GUANQIABOSSUI);
        GGlobal.reddot.remove(UIConst.GUANQIABOSSUI, s.checkNotice, s);
        c.remove(Enum_MsgType.MSG_WAVEUPDATE, s.updateWave, s);
        c.remove(Enum_MsgType.MSG_GQ_UPDATE, s.updateGK, s);
        c.remove(Enum_MsgType.MSG_BOSSINFO, s.updateRnk, s);
        c.remove(Model_player.MSG_HERO_LEVEL, s.checkNotice, s);
        IconUtil.setImg(s.guanqiaBg, null);
        GGlobal.modelGuanQia.remove(ModelGuanQia.msg_gqGetRed, s.updateMap, s);
        if (s.eff) {
            EffectMgr.instance.removeEff(s.eff);
            s.eff = null;
        }
        s.n61.numItems = 0;
        s.guanQiaInfo.clean();
    };
    ViewGQBossUI.prototype.reqRankData = function () {
        var s = this;
        var now = egret.getTimer();
        if (now - s._l >= 30000) {
            s._l = 0;
            GGlobal.modelGuanQia.CS_BOSSINFO_1103();
        }
    };
    /**更新怪物波次**/
    ViewGQBossUI.prototype.updateWave = function () {
        var s = this;
        var m = GGlobal.modelGuanQia;
        var gkcfg = Config.BOSS_205[m.curGuanQiaLv];
        if (m.isMaxGuanQia()) {
            s.btnFight.visible = false;
            s.lbCant.text = BroadCastManager.reTxt("已达最大关卡", gkcfg.BS - m.curWave);
        }
        else if (m.curWave >= gkcfg.BS) {
            s.btnFight.visible = true;
            s.lbCant.text = "";
        }
        else {
            s.btnFight.visible = false;
            s.lbCant.text = BroadCastManager.reTxt("再击杀<font color='" + Color.TEXT_YELLOW + "'>{0}</font>波怪可挑战BOSS", gkcfg.BS - m.curWave);
        }
    };
    ViewGQBossUI.prototype.updateGK = function () {
        var s = this;
        var m = GGlobal.modelGuanQia;
        var color = m.help > 0 ? Color.WHITESTR : Color.REDSTR;
        s.lbHelp.text = BroadCastManager.reTxt("求助次数：<font color='{0}'>{1}/{2}</font>", color, m.help, ConfigHelp.getSystemNum(3925));
        color = m.helpCount > 0 ? Color.WHITESTR : Color.REDSTR;
        s.lbHelpCount.text = BroadCastManager.reTxt("帮助次数：<font color='{0}'>{1}/{2}</font>", color, m.helpCount, ConfigHelp.getSystemNum(3926));
        s.lbGuanQia.text = BroadCastManager.reTxt("第{0}关", m.curGuanQiaLv);
        var lib = Config.kill_205;
        s.progress.max = 100;
        if (lib[m.killAwardsIndex + 1]) {
            s.progress.max = lib[m.killAwardsIndex + 1]["num"];
            s.progress.value = m.killCount;
        }
        else {
            s.progress.max = lib[m.killAwardsIndex]["num"];
            s.progress.value = m.killCount;
        }
        var add = Model_player.voMine.expAdd;
        if (add == 0)
            s.lbExp.text = ConfigHelp.numToStr(ModelGuanQia.getExpGP(m.curGuanQiaLv)) + "/小时";
        else
            s.lbExp.text = ConfigHelp.numToStr(ModelGuanQia.getExpGP(m.curGuanQiaLv)) + "/小时<font color='#3ba5ff'>(+" + add + "%)</font>";
        s.lbTongBi.text = ConfigHelp.numToStr(ModelGuanQia.getTBGP(m.curGuanQiaLv)) + "/小时";
        var gkcfg = Config.BOSS_205[m.curGuanQiaLv];
        this.awards = ConfigHelp.makeItemListArr(JSON.parse(gkcfg.reward));
        this.n61.numItems = this.awards.length;
        s.updateMap();
    };
    ViewGQBossUI.prototype.updateRnk = function () {
        var m = GGlobal.modelGuanQia;
        var r = m.rank_3;
        var s = this;
        s.rank0.update(r[0]);
        s.rank1.update(r[1]);
        s.rank2.update(r[2]);
    };
    ViewGQBossUI.prototype.updateMap = function () {
        var curCfg = Config.dgq_205[ModelGuanQia.curGQID];
        if (curCfg) {
            this.guanQiaInfo.visible = true;
            this.rewardGrp.visible = true;
            this.guanQiaInfo.setData(curCfg);
            this.grid.vo = ConfigHelp.makeItemListArr(JSON.parse(curCfg.jiangli))[0];
        }
        else {
            this.guanQiaInfo.visible = false;
            this.rewardGrp.visible = false;
        }
        if (ModelGuanQia.hasPassed()) {
            if (!this.eff) {
                this.eff = EffectMgr.addEff("eff/200007/ani", this.displayListContainer, 80, 273, 1000, -1, true, 1, Main.skill_part_type);
            }
            if ((Model_player.taskId <= Config.xtcs_004[2801].num || Model_player.taskId >= Config.xtcs_004[2806].num)) {
                QuestGuideArrow.instance.specialToHide = true;
                QuestGuideArrow.instance.release();
            }
        }
        else {
            if (this.eff) {
                EffectMgr.instance.removeEff(this.eff);
                this.eff = null;
            }
        }
    };
    ViewGQBossUI.prototype.guidePage = function (step) {
        var self = this;
        GuideStepManager.instance.showGuide(self.btnFight, self.btnFight.width / 2, self.btnFight.height / 2);
        GuideStepManager.instance.showGuide1(step.source.index, self.btnFight, self.btnFight.width / 2, 0, -90, -106, -100);
    };
    ViewGQBossUI.URL = "ui://r92dp953hfx70";
    return ViewGQBossUI;
}(UIPanelBase));
__reflect(ViewGQBossUI.prototype, "ViewGQBossUI");
