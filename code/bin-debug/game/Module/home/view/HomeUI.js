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
var HomeUI = (function (_super) {
    __extends(HomeUI, _super);
    function HomeUI() {
        var _this = _super.call(this) || this;
        _this.moneyGroupX = 0;
        //升级府邸
        _this.levelUpHd = function () {
            _this.openUI(UIConst.HOME_LEVELUP_UI, 300);
        };
        //府邸任务
        _this.taskHD = function () {
            _this.openUI(UIConst.HOME_TASK, 300);
        };
        //府邸商店
        _this.shopHD = function () {
            _this.openUI(UIConst.HOME_SHOP, 300);
        };
        //府邸列表
        _this.HomeListHD = function () {
            _this.openUI(UIConst.HOME_LIST_UI, 300);
        };
        //府邸列表
        _this.leaveHomeHD = function () {
            if (Model_player.isMineID(GGlobal.homemodel.home_masterID)) {
                GGlobal.homemodel.CG_House_outHouse_11103();
            }
            else {
                GGlobal.homemodel.CG_House_gotoRoom_11119(Model_player.voMine.id);
                // GGlobal.homemodel.CG_House_gotoYard_11101(Model_player.voMine.id);
            }
        };
        _this.maidOpen = function () {
            var model = GGlobal.homemodel;
            if (Model_player.isMineID(model.home_masterID)) {
                _this.openUI(UIConst.HOME_MAID, 300);
            }
            else {
                _this.showMaidWel();
            }
        };
        //家园数据更新。
        _this.dataUpdate = function () {
            var self = _this;
            var model = GGlobal.homemodel;
            self.head.setdata(model.home_masterHead, model.home_masterLevel);
            self.lbMaster.text = BroadCastManager.reTxt("府邸主人：{0}", model.home_masterName);
            self.lbHomeType.text = BroadCastManager.reTxt("档次：{0}", model.getHomeType);
            self.lbHomeLevel.text = BroadCastManager.reTxt("等级：{0}级", model.home_level);
            self.lbYB.text = ConfigHelp.numToStr(Model_player.voMine.yuanbao) + "";
            self.lbTongBi.text = ConfigHelp.numToStr(Model_player.voMine.homeMoney) + "";
            IconUtil.setImg(self.imgTongBi, Enum_Path.ICON70_URL + 22 + ".png");
            self.lbHomeExp.text = "" + ConfigHelp.numToStr(model.home_exp);
            self.changeEventFun();
            self.checkNotic();
        };
        _this.checkNotic = function () {
            _this.btnHomeLevelup.checkNotice = GGlobal.homemodel.checkHomeLevelUp_Condition();
        };
        _this.changeEventFun = function () {
            _this.c2.selectedIndex = Model_player.isMineID(GGlobal.homemodel.home_masterID) ? 0 : 1;
            _this.btnHomeList.y = _this.c2.selectedIndex == 0 ? 549 : 305;
        };
        _this._state = 0;
        _this.showOrHide = function () {
            _this._state = _this._state == 1 ? 0 : 1;
            _this.setUI(_this._state);
        };
        _this.setUI = function (v) {
            var self = _this;
            self._state = v;
            self.btnShow.icon = v ? "ui://y0plc878se7l23" : "ui://y0plc878se7l22";
            self.btnMaid.visible = v;
            self.groupLeftBtn.visible = v;
            self.groupTop.visible = v;
            // ViewMainTownTop.instance.visible = v;
        };
        _this.event = function (flag) {
            var self = _this;
            var fun = EventUtil.register;
            fun(flag, self.btnDesc, EventUtil.TOUCH, self.openWFSM, self);
            fun(flag, self.btnHomeLevelup, EventUtil.TOUCH, self.levelUpHd, self);
            fun(flag, self.btnHomeTask, EventUtil.TOUCH, self.taskHD, self);
            fun(flag, self.btnHomeShop, EventUtil.TOUCH, self.shopHD, self);
            fun(flag, self.btnExite, EventUtil.TOUCH, self.leaveHomeHD, self);
            fun(flag, self.btnHomeList, EventUtil.TOUCH, self.HomeListHD, self);
            fun(flag, self.soundOff, EventUtil.TOUCH, self.onSoundHD, self);
            fun(flag, self.soundOn, EventUtil.TOUCH, self.offSoundHD, self);
            fun(flag, self.btnMaid, EventUtil.TOUCH, self.maidOpen, self);
            var r = GGlobal.reddot;
            r.register(flag, UIConst.HOME_MAID, self.upBtnRed, self);
            r.register(flag, UIConst.HOME_TASK, self.upBtnRed, self);
            var m = GGlobal.model_HomeMaid;
            m.register(flag, Model_HomeMaid.useMaid, self.upMaidBtn, self);
            fun(flag, self.btnShow, EventUtil.TOUCH, self.showOrHide, self);
            var c = GGlobal.control;
            c.register(flag, HomeModel.HOME_UI_MAID_SHOW, self.showMaidWel, self);
            c.register(flag, HomeModel.HOME_UI_MAID_SHOW, self.upMaidBtn, self);
            c.register(flag, Enum_MsgType.ONRESIZE, self.resetPosition, self);
            c.register(flag, Enum_MsgType.HOME_DATA_UPDATE, self.dataUpdate, self);
            c.register(flag, HomeModel.HOME_SCENE_UPDATE, self.dataUpdate, self);
            c.register(flag, HomeModel.HOME_UI_DATA_UPDATE, self.dataUpdate, self);
        };
        return _this;
    }
    HomeUI.createInstance = function () {
        if (!HomeUI._instance) {
            HomeUI._instance = (fairygui.UIPackage.createObject("home", "HomeUI"));
        }
        return HomeUI._instance;
    };
    HomeUI.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        CommonManager.parseChildren(this, this);
        this.moneyGroupX = this.moneyGroup.x;
    };
    HomeUI.prototype.onSoundHD = function () {
        this.soundOn.visible = true;
        this.soundOff.visible = false;
        SoundManager.getInstance().setBGM(true);
        SoundManager.getInstance().setEFF(true);
        GGlobal.modelSetting.CGOperateSound(0, 0);
    };
    HomeUI.prototype.offSoundHD = function () {
        this.soundOn.visible = false;
        this.soundOff.visible = true;
        SoundManager.getInstance().setBGM(false);
        SoundManager.getInstance().setEFF(false);
        GGlobal.modelSetting.CGOperateSound(1, 1);
    };
    HomeUI.show = function () {
        var self = HomeUI.createInstance();
        self.showUI();
    };
    HomeUI.hide = function () {
        var self = HomeUI.createInstance();
        self.hideUI();
    };
    HomeUI.prototype.openWFSM = function () {
        GGlobal.layerMgr.open(UIConst.WFSM_PANEL, UIConst.HOME);
    };
    HomeUI.prototype.showUI = function () {
        var self = this;
        GGlobal.layerMgr.UI_floorUI.addChild(self);
        var control = GGlobal.control;
        self.setUI(1);
        self.event(1);
        self.dataUpdate();
        // control.listen(Enum_MsgType.ONRESIZE, self.resetPosition, self);
        // control.listen(Enum_MsgType.HOME_DATA_UPDATE, self.dataUpdate, self);
        // control.listen(HomeModel.HOME_SCENE_UPDATE, self.dataUpdate, self);
        // control.listen(HomeModel.HOME_UI_DATA_UPDATE, self.dataUpdate, self);
        control.listen(Enum_MsgType.MSG_BAG_VO_UPDATE, self.checkNotic, self);
        //侍女
        // let m = GGlobal.model_HomeMaid
        // m.CG_OPENUI_11301();//正在使用的侍女 已放登陆获取
        self.upMaidBtn();
        self.upBtnRed();
        self.showMaidWel();
    };
    HomeUI.prototype.hideUI = function () {
        var self = this;
        self.removeFromParent();
        var control = GGlobal.control;
        self.event(0);
        // control.remove(Enum_MsgType.ONRESIZE, self.resetPosition, self);
        // control.remove(Enum_MsgType.HOME_DATA_UPDATE, self.dataUpdate, self);
        // control.remove(HomeModel.HOME_SCENE_UPDATE, self.dataUpdate, self);
        // control.remove(HomeModel.HOME_UI_DATA_UPDATE, self.dataUpdate, self);
        control.remove(Enum_MsgType.MSG_BAG_VO_UPDATE, self.checkNotic, self);
        IconUtil.setImg(self.imgTongBi, null);
    };
    HomeUI.prototype.resetPosition = function () {
        var s = this;
        s.y = GGlobal.layerMgr.uiAlign;
        var backImg = s.getChild("n2").asImage;
        backImg.setXY(-GGlobal.layerMgr.offx, 0);
        backImg.setSize(App.stageWidth, 56);
        s.headGroup.setXY(-GGlobal.layerMgr.offx - 12, 1);
        s.groupLeftBtn.x = -GGlobal.layerMgr.offx - 12;
        s.moneyGroup.setXY(s.moneyGroupX + GGlobal.layerMgr.offx, 12);
    };
    // private _maidVo: Ishinv_020
    HomeUI.prototype.upMaidBtn = function () {
        var s = this;
        var m = GGlobal.model_HomeMaid;
        var model = GGlobal.homemodel;
        var maidId = Model_player.isMineID(model.home_masterID) ? m.useId : model.home_maid;
        var v = maidId > 0 ? Config.shinv_020[maidId] : null;
        IconUtil.setImg(s.btnMaid.img, Enum_Path.HOMEMAID_URL + (v ? v.yuanhua : "0") + ".png");
        s.upBtnRed();
    };
    //侍女 问候语
    HomeUI.prototype.showMaidWel = function () {
        var self = this;
        var model = GGlobal.homemodel;
        var m = GGlobal.model_HomeMaid;
        var maidId = Model_player.isMineID(model.home_masterID) ? m.useId : model.home_maid;
        var maidCfg = maidId > 0 ? Config.shinv_020[maidId] : null;
        self.vMaidWel.visible = true;
        self.vMaidWel.alpha = 0;
        if (maidCfg) {
            if (Model_player.isMineID(model.home_masterID)) {
                self.vMaidWel.text = maidCfg.hy;
            }
            else {
                self.vMaidWel.text = maidCfg.bfhy;
            }
            egret.Tween.removeTweens(self.vMaidWel);
            egret.Tween.get(self.vMaidWel).wait(500).to({ alpha: 1 }, 1000).wait(5000).to({ alpha: 0 }, 1000).call(function () { self.vMaidWel.visible = false; }, self);
        }
        else {
            egret.Tween.removeTweens(self.vMaidWel);
        }
    };
    HomeUI.prototype.upBtnRed = function () {
        var s = this;
        var r = GGlobal.reddot;
        var model = GGlobal.homemodel;
        if (Model_player.isMineID(model.home_masterID)) {
            s.btnMaid.checkNotice = r.checkCondition(UIConst.HOME_MAID);
            s.btnHomeTask.checkNotice = r.checkCondition(UIConst.HOME_TASK);
        }
        else {
            s.btnMaid.checkNotice = false;
            s.btnHomeTask.checkNotice = false;
        }
    };
    HomeUI.URL = "ui://y0plc878ye030";
    return HomeUI;
}(Sprite));
__reflect(HomeUI.prototype, "HomeUI");
