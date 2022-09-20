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
var ChildSettingName = (function (_super) {
    __extends(ChildSettingName, _super);
    function ChildSettingName() {
        var _this = _super.call(this) || this;
        _this.nameReg = /[^0-9a-zA-Z\u4E00-\u9fa50]/g;
        return _this;
    }
    ChildSettingName.createInstance = function () {
        return (fairygui.UIPackage.createObject("setting", "ChildSettingName"));
    };
    ChildSettingName.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
        if ((PlatformManager.isTanWan && GGlobal.loginArg.os && GGlobal.loginArg.os != "ios") ||
            PlatformManager.is350 || PlatformManager.isWanZi) {
            self.changeBt.visible = true;
        }
        else {
            self.changeBt.visible = false;
        }
        if (PlatformManager.isTanWan && GGlobal.loginArg.os && GGlobal.loginArg.os == "ios") {
            self.btnCopy.visible = false;
            self.btnCopy1.visible = false;
        }
        else {
            self.btnCopy.visible = true;
            self.btnCopy1.visible = true;
        }
        // this.inputName.restrict = "0-9a-zA-Z\u4E00-\u9FCB";
    };
    ChildSettingName.prototype.onChange = function () {
        HLSDK.logout();
    };
    ChildSettingName.prototype.onFocusOut = function () {
        window.scrollTo(0, 0);
    };
    ChildSettingName.prototype.addListen = function () {
        var self = this;
        self.registerEvent(true);
    };
    ChildSettingName.prototype.registerEvent = function (pFlag) {
        var self = this;
        EventUtil.register(pFlag, self.btnSure, egret.TouchEvent.TOUCH_TAP, self.onSure, self);
        EventUtil.register(pFlag, self.btnCopy, egret.TouchEvent.TOUCH_TAP, self.onCopy, self);
        EventUtil.register(pFlag, self.btnCopyID, egret.TouchEvent.TOUCH_TAP, self.onCopyID, self);
        EventUtil.register(pFlag, self.changeBt, egret.TouchEvent.TOUCH_TAP, self.onChange, self);
        EventUtil.register(pFlag, self.checkVoice, fairygui.StateChangeEvent.CHANGED, self.onChanged, self);
        EventUtil.register(pFlag, self.checkVoiceBGM, fairygui.StateChangeEvent.CHANGED, self.onChangedBGM, self);
        EventUtil.register(pFlag, self.inputName, egret.TextEvent.CHANGE, self.onInput, self);
        GGlobal.control.register(pFlag, Enum_MsgType.SETTING_CHANGE_NAME, self.upCost, self);
        if (PlatformManager.isTanWan && GGlobal.loginArg && GGlobal.loginArg.os == "ios") {
            EventUtil.register(pFlag, self.inputName, egret.FocusEvent.FOCUS_OUT, self.onFocusOut, self);
        }
    };
    ChildSettingName.prototype.removeListen = function () {
        var self = this;
        self.registerEvent(false);
    };
    ChildSettingName.prototype.update = function () {
        var self = this;
        self.inputName.text = "";
        var sound = SoundManager.getInstance();
        self.checkVoiceBGM.selected = !sound.BGM;
        self.checkVoice.selected = !sound.EFF;
        self.labID.text = Model_player.voMine.id + "";
        self.upCost();
    };
    ChildSettingName.prototype.upCost = function () {
        var self = this;
        var cardCout = Model_Bag.getItemCount(Model_Setting.CHANGE_NAME);
        if (cardCout > 0) {
            var item = VoItem.create(Model_Setting.CHANGE_NAME);
            ImageLoader.instance.loader(Enum_Path.ICON70_URL + item.icon + ".png", self.imgCost);
            self._cost = 0;
            self.labCostCount.text = cardCout + "/1";
            self.labCostCount.color = Color.GREENINT;
            self.imgYB.visible = false;
            self.imgCost.visible = true;
        }
        else {
            self.imgYB.visible = true;
            self.imgCost.visible = false;
            self._cost = ConfigHelp.getSystemNum(1051);
            self.labCostCount.text = "" + self._cost;
            self.labCostCount.color = Model_player.voMine.yuanbao >= self._cost ? Color.GREENINT : Color.REDINT;
        }
        var voMine = Model_player.voMine;
        self.labName.text = voMine.name;
        self.labLevel.text = voMine.level + "";
        if (voMine.zsID > 0) {
            self.labZs.text = Config.zhuansheng_705[voMine.zsID].lv;
        }
        else {
            self.labZs.text = "";
        }
        var c = Model_Setting.showCamp ? 0 : voMine.country;
        self.viewHead.setdata(Model_Setting.headId, -1, null, -1, false, Model_Setting.frameId, c);
    };
    ChildSettingName.prototype.onSure = function () {
        if (!Model_GlobalMsg.rename) {
            ViewCommonWarn.text("改名系统维护中");
            return;
        }
        var name = this.inputName.text;
        name = name.replace(/\s+/g, ''); //过滤空格
        if (Model_player.voMine.yuanbao < this._cost) {
            ModelChongZhi.guideToRecharge();
            return;
        }
        if (name == "") {
            ViewCommonWarn.text("请输入名称");
            return;
        }
        var len = this.getStrByteLen(name);
        if (len > 12) {
            ViewCommonWarn.text("名字长度不能超过6个汉字或12个英文数字");
            return;
        }
        if (name == Model_player.voMine.name) {
            ViewCommonWarn.text("名称相同");
            return;
        }
        GGlobal.modelSetting.CGChangeName(name);
    };
    ChildSettingName.prototype.getStrByteLen = function (str) {
        var len = str.replace(/[^x00-xFF]/g, '**').length;
        return len;
    };
    ChildSettingName.prototype.onChangedBGM = function (e) {
        SoundManager.getInstance().setBGM(!this.checkVoiceBGM.selected);
        GGlobal.modelSetting.CGOperateSound(this.checkVoiceBGM.selected ? 1 : 0, this.checkVoice.selected ? 1 : 0);
        GGlobal.control.notify(Enum_MsgType.SETTING_CHANGE_HEAD);
    };
    ChildSettingName.prototype.onChanged = function (e) {
        SoundManager.getInstance().setEFF(!this.checkVoice.selected);
        GGlobal.modelSetting.CGOperateSound(this.checkVoiceBGM.selected ? 1 : 0, this.checkVoice.selected ? 1 : 0);
        GGlobal.control.notify(Enum_MsgType.SETTING_CHANGE_HEAD);
    };
    ChildSettingName.prototype.onCopy = function (e) {
        var str = this.labName.text;
        Model_Setting.onCopy(str, "复制成功");
    };
    ChildSettingName.prototype.onCopyID = function (e) {
        var str = this.labID.text;
        Model_Setting.onCopy(str, "复制成功");
    };
    ChildSettingName.prototype.onInput = function () {
        var e = this, t = e.inputName.text, n = t.length;
        if (t.length > 0) {
            var o = t.charAt(n - 1), i = o.match(e.nameReg);
            if (null == i)
                return;
            t = t.substr(0, n - 1);
        }
        var n = this.getStrByteLen(t);
        if (t != e.inputName.text) {
            e.inputName.text = t;
        }
    };
    ChildSettingName.URL = "ui://dt6yws4jg30n1";
    return ChildSettingName;
}(fairygui.GComponent));
__reflect(ChildSettingName.prototype, "ChildSettingName");
