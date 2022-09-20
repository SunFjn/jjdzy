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
var ViewMainTopUI1 = (function (_super) {
    __extends(ViewMainTopUI1, _super);
    function ViewMainTopUI1() {
        var _this = _super.call(this) || this;
        _this.moneyGroupX = 0;
        return _this;
    }
    ViewMainTopUI1.createInstance = function () {
        return (fairygui.UIPackage.createObject("MainUI", "ViewMainTopUI1"));
    };
    ViewMainTopUI1.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        CommonManager.parseChildren(s, s);
        s.moneyGroupX = s.moneyGroup.x;
        s.lbYB.enabled = true;
        s.lbYB.addClickListener(s.recharge, s);
        s.lbTongBi.addClickListener(s.buyTongbiHandler, s);
        s.btnAddYB.addClickListener(s.recharge, s);
        s.btnAddTB.addClickListener(s.buyTongbiHandler, s);
        s.soundOff.addClickListener(s.onSoundHD, s);
        s.soundOn.addClickListener(s.offSoundHD, s);
        s.btnAddYB.visible = !GGlobal.isIOS;
        s.lbYB.enabled = !GGlobal.isIOS;
        s.lbTongBi.enabled = !GGlobal.isIOS;
        s.updateSound();
        GGlobal.control.listen(Enum_MsgType.SETTING_CHANGE_HEAD, this.updateSound, this);
        this.listen();
        this.resetPosition();
    };
    ViewMainTopUI1.prototype.onSoundHD = function () {
        this.soundOn.visible = true;
        this.soundOff.visible = false;
        SoundManager.getInstance().setBGM(true);
        SoundManager.getInstance().setEFF(true);
        GGlobal.modelSetting.CGOperateSound(0, 0);
    };
    ViewMainTopUI1.prototype.offSoundHD = function () {
        this.soundOn.visible = false;
        this.soundOff.visible = true;
        SoundManager.getInstance().setBGM(false);
        SoundManager.getInstance().setEFF(false);
        GGlobal.modelSetting.CGOperateSound(1, 1);
    };
    ViewMainTopUI1.prototype.updateSound = function () {
        var sound = SoundManager.getInstance();
        this.soundOn.visible = sound.BGM || sound.EFF;
        this.soundOff.visible = !this.soundOn.visible;
    };
    ViewMainTopUI1.prototype.openVIP = function (event) {
        GGlobal.layerMgr.open(UIConst.VIP);
    };
    Object.defineProperty(ViewMainTopUI1, "instance", {
        get: function () {
            if (!ViewMainTopUI1._instance)
                ViewMainTopUI1._instance = ViewMainTopUI1.createInstance();
            return ViewMainTopUI1._instance;
        },
        enumerable: true,
        configurable: true
    });
    ViewMainTopUI1.prototype.setVipNotice = function () {
        this.ButtonVIP.checkNotice = GGlobal.reddot.checkCondition(UIConst.VIP) || GGlobal.reddot.checkCondition(UIConst.VIPGIFT);
    };
    ViewMainTopUI1.prototype.initUI = function () {
        this.update();
        this.updateHead();
    };
    ViewMainTopUI1.prototype.update = function () {
        var s = this;
        var v = Model_player.voMine;
        if (v) {
            s.lbPower.text = v.str + "";
            s.updateHead();
        }
        if (!s.powerEff) {
            s.powerEff = EffectMgr.addEff("uieff/10008", s.powerEffBt.displayListContainer, s.powerEffBt.width / 2 + 20, s.powerEffBt.height / 2 - 10, 800, -1, true);
        }
    };
    ViewMainTopUI1.prototype.updateHead = function () {
        var s = this;
        var v = Model_player.voMine;
        if (v) {
            s.head.setdata(Model_Setting.headId, v.level, null, null, false, Model_Setting.frameId);
        }
    };
    ViewMainTopUI1.prototype.updateGuanQia = function () {
        var s = this;
        var vomine = Model_player.voMine;
        if (!vomine)
            return;
        var m = GGlobal.modelGuanQia;
        var scenename = Config.map_200[Config.xiaoguai_205[Config.BOSS_205[m.curGuanQiaLv].lj].dt].n;
        s.lbGuanQia.text = m.curGuanQiaLv + "";
        s.lbGuanQia.text = BroadCastManager.reTxt("{0}", m.curGuanQiaLv);
        var expValue = ModelGuanQia.getExpGP(m.curGuanQiaLv);
        expValue = Math.ceil(Number(expValue) * (100 + vomine.expAdd) / 100);
        s.lbExp.text = ConfigHelp.numToStr(expValue) + "/时";
        s.lbTongbi.text = ConfigHelp.numToStr(ModelGuanQia.getTBGP(m.curGuanQiaLv)) + "/时";
        s.btnAddYB.visible = !GGlobal.isIOS;
        s.lbYB.enabled = !GGlobal.isIOS;
        s.lbTongBi.enabled = !GGlobal.isIOS;
    };
    ViewMainTopUI1.prototype.updateVIP = function () {
        var s = this;
        var vomine = Model_player.voMine;
        if (!vomine)
            return;
        this.lbVip.text = "P" + vomine.viplv + "";
        if (!s.vipEff) {
            s.vipEff = EffectMgr.addEff("uieff/10006", s.ButtonVIP.displayListContainer, s.ButtonVIP.width / 2, s.ButtonVIP.height / 2, 800, -1, true);
        }
    };
    // private checkWarNot() {
    // 	var icon = GGlobal.mainUICtr.getIcon(UIConst.CHAOZHIFL);
    // 	if(icon) {
    // 		var notice = GGlobal.modelWarToDead.checkNotice();
    // 		icon.checkNotice = notice;
    // 	}
    // }
    ViewMainTopUI1.prototype.listen = function () {
        var s = this;
        var r = GGlobal.reddot;
        var c = GGlobal.control;
        s.ButtonVIP.addClickListener(s.openVIP, s);
        if (Model_player.voMine) {
            s.initUI();
            s.update();
            s.updateVIP();
            s.updateGuanQia();
            s.setVipNotice();
            s.updateQCBar();
        }
        s.resetPosition();
        s.head.addClickListener(this.onSetting, this);
        var m = GGlobal.modelPlayer;
        m.listen(Model_player.MSG_UPDATE, s.updatePlayerdata, s);
        m.listen(Model_player.YUANBAO_UPDATE, s.updatePlayerdata, s);
        m.listen(Model_player.TONGBI_UPDATE, s.updatePlayerdata, s);
        m.listen(Model_player.ZHUANSHENG_UPDATE, s.updatePlayerdata, s);
        m.listen(Model_player.MSG_UPDATE, s.update, s);
        c.listen(Enum_MsgType.VIP_CHANGE, s.updateVIP, s);
        c.listen(Enum_MsgType.MSG_GQ_UPDATE, s.updateGuanQia, s);
        c.listen(Enum_MsgType.ONRESIZE, s.resetPosition, s);
        c.listen(Enum_MsgType.SETTING_CHANGE_HEAD, s.updateHead, s);
        c.listen(Enum_MsgType.SETTING_CHANGE_NAME, s.updatePlayerdata, s);
        c.listen(Enum_MsgType.ROLE_QICE_RAGE, s.updateQCBar, s);
        r.listen(ReddotEvent.CHECK_VIP, s.setVipNotice, s);
        c.listen(Enum_MsgType.QICE_SUIT_UPDATE, s.updateQCBar, s);
        c.listen(Enum_MsgType.QICE_SUIT_ACTIVE, s.updateQCBar, s);
        s.updatePlayerdata();
    };
    ViewMainTopUI1.prototype.remove = function () {
        var self = this;
        if (self.vipEff) {
            EffectMgr.instance.removeEff(self.vipEff);
            self.vipEff = null;
        }
        if (self.powerEff) {
            EffectMgr.instance.removeEff(self.powerEff);
            self.powerEff = null;
        }
    };
    ViewMainTopUI1.prototype.resetPosition = function () {
        var s = this;
        s.y = GGlobal.layerMgr.uiAlign;
        var backImg = s.getChild("n138").asImage;
        backImg.setXY(-GGlobal.layerMgr.offx, 0);
        backImg.setSize(App.stageWidth, 56);
        s.headGroup.setXY(-GGlobal.layerMgr.offx - 12, 1);
        s.moneyGroup.setXY(s.moneyGroupX + GGlobal.layerMgr.offx, 12);
    };
    ViewMainTopUI1.prototype.onSetting = function () {
        GGlobal.layerMgr.open(UIConst.SETTING);
    };
    ViewMainTopUI1.prototype.recharge = function (event) {
        event.stopImmediatePropagation();
        if (GGlobal.isIOS) {
            ViewAlert.show("由于苹果政策影响，iOS暂未开放充值", Handler.create(this, null), ViewAlert.OK);
        }
        else {
            ViewChongZhi.tryToOpenCZ();
        }
    };
    ViewMainTopUI1.prototype.buyTongbiHandler = function (event) {
        event.stopImmediatePropagation();
        View_CaiLiao_GetPanel.show(VoItem.create(Enum_Attr.TONGBI));
    };
    ViewMainTopUI1.prototype.updatePlayerdata = function () {
        var vomine = Model_player.voMine;
        if (!vomine)
            return;
        this.lbYB.text = ConfigHelp.numToStr(vomine.yuanbao) + "";
        this.lbTongBi.text = ConfigHelp.numToStr(vomine.tongbi) + "";
        this.lbName.text = vomine.name;
        if (vomine.zsID > 0) {
            this.zsLvLb.text = Config.zhuansheng_705[vomine.zsID].lv;
        }
        else {
            this.zsLvLb.text = "";
        }
    };
    ViewMainTopUI1.prototype.updateQCBar = function () {
        var self = this;
        var vomine = Model_player.voMine;
        if (GGlobal.modelQice.suitLv > 0) {
            self.qiceGroup.visible = true;
            var max = ~~(Config.changshu_101[75].num / 100);
            self.qcBar.value = vomine.qcRage;
            self.qcBar.max = max;
            if (vomine.qcRage >= max) {
                self.qcIcon.url = CommonManager.getUrl("MainUI", "rageMax");
            }
            else {
                self.qcIcon.url = CommonManager.getUrl("MainUI", "rage");
            }
        }
        else {
            vomine.qcRage = 0;
            vomine.qcTime = 0;
            self.qiceGroup.visible = false;
        }
    };
    ViewMainTopUI1.URL = "ui://7gxkx46wj30eo";
    return ViewMainTopUI1;
}(fairygui.GComponent));
__reflect(ViewMainTopUI1.prototype, "ViewMainTopUI1");
