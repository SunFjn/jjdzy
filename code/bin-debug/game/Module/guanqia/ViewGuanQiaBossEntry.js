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
var ViewGuanQiaBossEntry = (function (_super) {
    __extends(ViewGuanQiaBossEntry, _super);
    function ViewGuanQiaBossEntry() {
        return _super.call(this) || this;
    }
    ViewGuanQiaBossEntry.createInstance = function () {
        if (!ViewGuanQiaBossEntry._instance)
            ViewGuanQiaBossEntry._instance = (fairygui.UIPackage.createObject("MainUI", "ViewGuanQiaBossEntry"));
        return ViewGuanQiaBossEntry._instance;
    };
    ViewGuanQiaBossEntry.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        s.btn = (s.getChild("btn"));
        s.img = (s.getChild("img"));
        s.autoBt = (s.getChild("autoBt"));
        s.imgAuto = (s.getChild("imgAuto"));
        s.prog = (s.getChild("prog"));
        this.tip = (this.getChild("tip"));
        this.forwardBtn = (this.getChild("forwardBtn"));
        this.forwardLB = (this.forwardBtn.getChild("forwardLB"));
        this.grpExtral = (this.getChild("grpExtral"));
        this.gridExtral = (this.grpExtral.getChild("gridExtral"));
        this.txtExtral = (this.grpExtral.getChild("n16"));
        this.img2 = (this.grpExtral.getChild("img2"));
        s.tip.visible = false;
        s.resetPosition();
        s.btn.addClickListener(s.onTouch, s);
        s.tip.addEventListener(egret.TouchEvent.TOUCH_TAP, s.onAutoT, s);
        s.imgAuto.addEventListener(egret.TouchEvent.TOUCH_TAP, s.onAutoT, s);
        s.forwardBtn.visible = false;
        s.forwardBtn.addClickListener(this.onForward, this);
        s.grpExtral.addClickListener(this.onOpenGQMap, this);
        this.img.visible = false;
    };
    ViewGuanQiaBossEntry.prototype.onOpenGQMap = function () {
        GGlobal.layerMgr.open(UIConst.GUANQIAMAP);
    };
    //有免费扫荡或者有千人斩并且关卡大于30关
    ViewGuanQiaBossEntry.prototype.checkReddot = function () {
        this.img.visible =
            (GGlobal.reddot.checkCondition(UIConst.GUANQIABOSSUI) && GGlobal.modelGuanQia.curGuanQiaLv >= 30 &&
                Model_LunHui.realLv >= Config.xtcs_004[4424].num) //扫荡 0
                || GGlobal.modelGuanQia.guanQiaNot() //关卡大地图 2
                || (GGlobal.reddot.checkCondition(UIConst.GUANQIABOSSUI, 1) && Model_LunHui.realLv >= Config.xtcs_004[4425].num) //千人斩 1
                || GGlobal.reddot.checkCondition(UIConst.GUANQIABOSSUI, 4);
    };
    ViewGuanQiaBossEntry.prototype.setVisible = function (value) {
        this.visible = value;
        if (value) {
            this.onShown();
        }
        else {
            this.onHide();
        }
    };
    ViewGuanQiaBossEntry.prototype.showEntryEffect = function () {
        if (!this._entryEff) {
            this._entryEff = EffectMgr.addEff("uieff/10029", this.displayListContainer, 65, 138, 1000, -1, true);
        }
    };
    ViewGuanQiaBossEntry.prototype.onShown = function () {
        var s = this;
        var c = GGlobal.control;
        s.update();
        s.checkReddot();
        s.updateAuto();
        s.checkAutoState();
        s.showEntryEffect();
        GGlobal.reddot.listen(UIConst.GUANQIABOSSUI, s.checkReddot, s);
        c.listen(Enum_MsgType.MSG_WAVEUPDATE, s.onWaveUD, s);
        c.listen(Enum_MsgType.MSG_GQ_UPDATE, s.update, s);
        c.listen(Enum_MsgType.MSG_AUTO_C, s.updateAuto, s);
        c.listen(Enum_MsgType.MSG_BAG_ITME_UPDATE, s.checkAutoState, s);
        c.listen(Enum_MsgType.ONRESIZE, s.resetPosition, s);
        GGlobal.modelGuanQia.listen(ModelGuanQia.msg_gqGetRed, this.switchForwardbtn, this);
        GGlobal.modelGuanQia.listen(ModelGuanQia.msg_gqGetRed, this.showRawTip, this);
        GGlobal.modelGuanQia.listen(ModelGuanQia.msg_gqGetRed, this.checkReddot, this);
    };
    ViewGuanQiaBossEntry.prototype.onHide = function () {
        var s = this;
        var c = GGlobal.control;
        GGlobal.reddot.remove(UIConst.GUANQIABOSSUI, s.checkReddot, s);
        c.remove(Enum_MsgType.MSG_WAVEUPDATE, s.onWaveUD, s);
        c.remove(Enum_MsgType.MSG_GQ_UPDATE, s.update, s);
        c.remove(Enum_MsgType.MSG_AUTO_C, s.updateAuto, s);
        c.remove(Enum_MsgType.MSG_BAG_ITME_UPDATE, s.checkAutoState, s);
        c.remove(Enum_MsgType.ONRESIZE, s.resetPosition, s);
        GGlobal.modelGuanQia.remove(ModelGuanQia.msg_gqGetRed, this.switchForwardbtn, this);
        GGlobal.modelGuanQia.remove(ModelGuanQia.msg_gqGetRed, this.showRawTip, this);
        GGlobal.modelGuanQia.remove(ModelGuanQia.msg_gqGetRed, this.checkReddot, this);
        if (s._eff) {
            EffectMgr.instance.removeEff(s._eff);
            s._eff = null;
        }
    };
    //背包不可熔炼且容量不足时停止挂机
    ViewGuanQiaBossEntry.prototype.checkAutoState = function () {
        if (!GGlobal.modelGuanQia.auto)
            return;
        var m = GGlobal.modelGuanQia;
        var curNum = Model_Bag.getResNum();
        var equipList = Model_RongLian.onekeyRongLianArr();
        if ((equipList.length + curNum) < 20) {
            ViewCommonWarn.text("装备背包空间不足，请手动分解");
            m.setAuto(false);
        }
        else {
            if (curNum < 20) {
                if (equipList.length) {
                    Model_RongLian.onekeyRongLian();
                }
            }
        }
    };
    ViewGuanQiaBossEntry.prototype.update = function () {
        var m = GGlobal.modelGuanQia;
        var maxWave = Config.BOSS_205[m.curGuanQiaLv].BS;
        this.prog.setVo(m.curWave, maxWave);
        this.updateAuto();
        this.switchForwardbtn();
        this.showRawTip();
    };
    ViewGuanQiaBossEntry.prototype.showRawTip = function () {
        var m = GGlobal.modelGuanQia;
        if (m.curGuanQiaLv <= Config.xtcs_004[5401].num) {
            var cfg = Config.dgq_205[ModelGuanQia.curGQID];
            if (cfg) {
                this.grpExtral.visible = true;
                var canGetCfg = null;
                for (var key in Config.dgq_205) {
                    if (GGlobal.modelGuanQia.curGQNotice(Config.dgq_205[key])) {
                        canGetCfg = Config.dgq_205[key];
                        break;
                    }
                }
                if (canGetCfg) {
                    var reward = ConfigHelp.makeItemListArr(JSON.parse(canGetCfg.jiangli))[0];
                }
                else {
                    if (ModelGuanQia.hasPassed()) {
                        var nextCfg = Config.dgq_205[cfg.ID + 1];
                        if (nextCfg) {
                            reward = ConfigHelp.makeItemListArr(JSON.parse(nextCfg.jiangli))[0];
                        }
                        else {
                            reward = ConfigHelp.makeItemListArr(JSON.parse(cfg.jiangli))[0];
                        }
                    }
                    else {
                        reward = ConfigHelp.makeItemListArr(JSON.parse(cfg.jiangli))[0];
                    }
                }
                this.gridExtral.vo = reward;
                var not = GGlobal.modelGuanQia.guanQiaNot();
                if (not) {
                    this.txtExtral.text = "  可领取  ";
                }
                else {
                    if (ModelGuanQia.hasPassed()) {
                        var nextCfg = Config.dgq_205[cfg.ID + 1];
                        if (nextCfg) {
                            var infoArr = JSON.parse(nextCfg.guanqia);
                        }
                        else {
                            infoArr = JSON.parse(cfg.guanqia);
                        }
                    }
                    else {
                        infoArr = JSON.parse(cfg.guanqia);
                    }
                    var low = infoArr[0][0], max = infoArr[0][1];
                    if (m.curGuanQiaLv <= max) {
                        this.txtExtral.text = max - m.curGuanQiaLv + 1 + "\u5173\u540E\u53EF\u9886\u53D6";
                    }
                }
                this.img2.visible = GGlobal.modelGuanQia.guanQiaNot();
            }
            else {
                this.grpExtral.visible = false;
            }
        }
        else {
            this.grpExtral.visible = false;
        }
    };
    ViewGuanQiaBossEntry.prototype.onTouch = function (e) {
        if (ModelGuanQia.hasPassed()) {
            ViewGQDetail.trytoOpen();
        }
        else {
            GGlobal.layerMgr.open(UIConst.GUANQIABOSSUI);
        }
    };
    ViewGuanQiaBossEntry.prototype.onForward = function () {
        ViewGQDetail.trytoOpen();
    };
    ViewGuanQiaBossEntry.prototype.switchForwardbtn = function () {
        if (ModelGuanQia.hasPassed()) {
            this.forwardBtn.visible = true;
            this.imgAuto.visible = false;
            var nextCfg = Config.dgq_205[ModelGuanQia.curGQID + 1];
            if (nextCfg) {
                this.forwardLB.text = "前往" + nextCfg.mingcheng;
            }
            if (!this.eff && !(Model_player.taskId <= Config.xtcs_004[2801].num || Model_player.taskId >= Config.xtcs_004[2806].num)) {
                this.eff = EffectMgr.addEff("eff/200007/ani", this.displayListContainer, 68, 213, 1000, -1, true, 1, Main.skill_part_type);
            }
        }
        else {
            this.forwardBtn.visible = false;
            this.imgAuto.visible = true;
            if (this.eff) {
                EffectMgr.instance.removeEff(this.eff);
                this.eff = null;
            }
        }
    };
    ViewGuanQiaBossEntry.prototype.onAutoT = function (e) {
        e.stopPropagation();
        var m = GGlobal.modelGuanQia;
        if (ModelGuanQia.hasPassed()) {
            ViewGQDetail.trytoOpen();
            return;
        }
        if (m.curGuanQiaLv < ModelGuanQia.autoWave) {
            ViewCommonWarn.text("自动战斗通关" + ModelGuanQia.autoWave + "关后开启");
            return;
        }
        if (m.isMaxGuanQia()) {
            ViewCommonWarn.text("已达最大通关数");
            return;
        }
        if (m.auto) {
            m.setAuto(false);
            return;
        }
        var s = !GGlobal.modelGuanQia.auto;
        if (s) {
            var d = GGlobal.modelGuanQia.challBossWithCond();
            if (!d)
                return;
        }
        ViewAlert.show("开启自动任务获得以下功能：\n1、自动挑战首领\n2、自动熔炼装备", Handler.create(this, function func() {
            GGlobal.modelGuanQia.setAuto(!GGlobal.modelGuanQia.auto);
            this.checkAutoBoss();
        }, null, true), ViewAlert.OKANDCANCEL, "确定", "取消");
    };
    ViewGuanQiaBossEntry.prototype.checkAutoBoss = function () {
        var m = GGlobal.modelGuanQia;
        var maxWave = Config.BOSS_205[m.curGuanQiaLv].BS;
        if (m.curWave >= maxWave && m.auto && !ModelGuanQia.hasPassed()) {
            var rest = GGlobal.modelGuanQia.challBossWithCond();
            if (!rest) {
                m.setAuto(false);
            }
            else {
                GGlobal.modelGuanQia.CG_FIGHTBOSS_1113();
            }
        }
    };
    ViewGuanQiaBossEntry.prototype.updateAuto = function () {
        var isAuto = GGlobal.modelGuanQia.auto;
        if (isAuto) {
            this.imgAuto.icon = CommonManager.getUrl("MainUI", "Bt_ZDTZ_down1");
        }
        else {
            this.imgAuto.icon = CommonManager.getUrl("MainUI", "Bt_ZDTZ_up1");
        }
    };
    ViewGuanQiaBossEntry.prototype.canShowGuide = function () {
        var curGQ = GGlobal.modelGuanQia.curGuanQiaLv;
        var ret = curGQ >= 12 && curGQ <= 30 && Model_player.taskId >= 43;
        return ret;
    };
    ViewGuanQiaBossEntry.prototype.onWaveUD = function () {
        this.update();
        this.checkAutoBoss();
    };
    ViewGuanQiaBossEntry.prototype.resetPosition = function () {
        this.setXY(-GGlobal.layerMgr.offx, fairygui.GRoot.inst.height - 412);
    };
    ViewGuanQiaBossEntry.prototype.guideAuto = function (step) {
        var self = this;
        GuideStepManager.instance.showGuide(self.autoBt, self.autoBt.width / 2, self.autoBt.height / 2);
        GuideStepManager.instance.showGuide1(step.source.index, self.autoBt, self.autoBt.width, self.autoBt.height / 2, 0, 50, -35);
        GGlobal.control.listen(Enum_MsgType.MSG_AUTO_C, self.guideListen, self);
    };
    ViewGuanQiaBossEntry.prototype.guideListen = function () {
        if (GGlobal.modelGuanQia.auto) {
            GGlobal.control.remove(Enum_MsgType.MSG_AUTO_C, this.guideListen, this);
            GGlobal.modelPlayer.CG_SCENETASK_SUBMISSION(1);
        }
    };
    ViewGuanQiaBossEntry.URL = "ui://7gxkx46whf054w";
    return ViewGuanQiaBossEntry;
}(fairygui.GComponent));
__reflect(ViewGuanQiaBossEntry.prototype, "ViewGuanQiaBossEntry");
