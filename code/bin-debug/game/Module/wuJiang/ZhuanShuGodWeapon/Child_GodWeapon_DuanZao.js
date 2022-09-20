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
var Child_GodWeapon_DuanZao = (function (_super) {
    __extends(Child_GodWeapon_DuanZao, _super);
    function Child_GodWeapon_DuanZao() {
        var _this = _super.call(this) || this;
        _this.gridArr = [];
        _this._cost1 = 0;
        _this._cost10 = 0;
        _this._disCost1 = 0;
        _this._disCost10 = 0;
        _this._first = false;
        return _this;
    }
    Child_GodWeapon_DuanZao.createInstance = function () {
        return (fairygui.UIPackage.createObject("wuJiang", "Child_GodWeapon_DuanZao"));
    };
    Child_GodWeapon_DuanZao.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        CommonManager.parseChildren(s, s);
        s.t0 = s.getTransition("t0");
        s.gridArr = [s.gird0, s.gird1, s.gird2, s.gird3];
        s.list.itemRenderer = s.renderItem;
        s.list.callbackThisObj = s;
        s.list.setVirtualAndLoop();
        s.list.touchable = false;
        s.dzItem = VoItem.create(Model_ZSGodWeapon.duanzaoC);
    };
    Child_GodWeapon_DuanZao.prototype.onOpen = function () {
        var s = this;
        Model_ZSGodWeapon.getDaZaoData();
        s.addListen();
        s.update();
        s.checkSBZKShow();
        if (GGlobal.modelActivity.getActivityByID(UIConst.ACTCOM_SBZK)) {
            GGlobal.modelActivity.CG_OPENACT(UIConst.ACTCOM_SBZK);
        }
    };
    Child_GodWeapon_DuanZao.prototype.onClose = function () {
        var s = this;
        s.removeListen();
        s._first = false;
    };
    Child_GodWeapon_DuanZao.prototype.onGodBt = function () {
        var self = this;
        if (self.godBt.checkNotice) {
            GGlobal.modelGodWeapon.CG_GodWeapon_makeWuqi_7863(0, 1);
        }
        else {
            View_CaiLiao_GetPanel.show(VoItem.create(Model_ZSGodWeapon.shenjiangC));
        }
    };
    Child_GodWeapon_DuanZao.prototype.addListen = function () {
        var self = this;
        self.btnBuy1.addClickListener(self.onBuy1, self);
        self.btnBuy10.addClickListener(self.onBuy10, self);
        self.checkBox.addClickListener(self.onCheck, self);
        self.godBt.addClickListener(self.onGodBt, self);
        Timer.instance.listen(self.scrollComp1, self, 100);
        self.btnBuy1.touchable = self.btnBuy10.touchable = true;
        var key = Model_player.voMine.id + "_ZSGodWeaponCheck";
        var val = egret.localStorage.getItem(key);
        Model_ZSGodWeapon.skipTween = val == "1" ? true : false;
        self.checkBox.selected = Model_ZSGodWeapon.skipTween;
        self.vres10.setType(1);
        self.vres1.setType(1);
        GGlobal.reddot.listen(UIConst.ZS_GODWEAPON, self.update, self);
        GGlobal.control.listen(UIConst.ZS_GODWEAPON_DUANZAO, self.playEff, self);
        GGlobal.control.listen(UIConst.ZS_GODWEAPON_REWARD, self.updateButton, self);
        GGlobal.control.listen(Enum_MsgType.ACTIVITY_LOGIN_SEND, self.checkSBZKShow, self);
        GGlobal.control.listen(Enum_MsgType.ACTIVITY_ACTOPENSTATE, self.checkSBZKShow, self);
        if (!self.eff) {
            self.eff = EffectMgr.addEff("uieff/10050", self.effImg.displayObject, self.effImg.width / 2, self.effImg.height / 2, 1000, -1, true);
        }
        self.t0.setPaused(false);
        GGlobal.control.listen(UIConst.ACTCOM_SBZK, self.checkSBZKShow, self);
    };
    Child_GodWeapon_DuanZao.prototype.updateButton = function () {
        var self = this;
        self.btnBuy1.touchable = self.btnBuy10.touchable = true;
    };
    Child_GodWeapon_DuanZao.prototype.removeListen = function () {
        var self = this;
        self.btnBuy1.removeClickListener(self.onBuy1, self);
        self.btnBuy10.removeClickListener(self.onBuy10, self);
        self.checkBox.removeClickListener(self.onCheck, self);
        self.godBt.removeClickListener(self.onGodBt, self);
        for (var i = 0; i < 4; i++) {
            self.gridArr[i].clean();
        }
        Timer.instance.remove(self.scrollComp1, self);
        self.list.numItems = 0;
        if (self.eff) {
            EffectMgr.instance.removeEff(self.eff);
            self.eff = null;
        }
        GGlobal.reddot.remove(UIConst.ZS_GODWEAPON, self.update, self);
        GGlobal.control.remove(UIConst.ZS_GODWEAPON_DUANZAO, self.playEff, self);
        GGlobal.control.remove(UIConst.ZS_GODWEAPON_REWARD, self.updateButton, self);
        GGlobal.control.remove(Enum_MsgType.ACTIVITY_LOGIN_SEND, self.checkSBZKShow, self);
        GGlobal.control.remove(Enum_MsgType.ACTIVITY_ACTOPENSTATE, self.checkSBZKShow, self);
        GGlobal.control.remove(UIConst.ACTCOM_SBZK, self.checkSBZKShow, self);
    };
    Child_GodWeapon_DuanZao.prototype.update = function () {
        var self = this;
        //奖励展示
        var arr = Model_ZSGodWeapon.daZaoArr[Model_ZSGodWeapon.qishu - 1];
        var cfg = Config.sbdzzs_750[Model_ZSGodWeapon.qishu];
        var curIndex = 0;
        var curIndex1 = 0;
        var pointMax = 0;
        var num = Model_ZSGodWeapon.dazaoNum;
        if (cfg) {
            self.showArr = ConfigHelp.makeItemListArr(ConfigHelp.SplitStr(cfg.jiangli));
        }
        else {
            self.showArr = [];
        }
        self.list.numItems = self.showArr.length;
        for (var i = 0; i < self.gridArr.length; i++) {
            if (i < arr.length) {
                self.gridArr[i].setVo(ConfigHelp.makeItemListArr(JSON.parse(arr[i].jiangli))[0], arr[i].cishu);
                pointMax = arr[i].cishu;
                if (Model_ZSGodWeapon.dazaoNum >= arr[i].cishu) {
                    curIndex = i;
                    curIndex1 = i + 1;
                }
            }
        }
        var pointArr = [0, 150, 650, 1350, 2000];
        if (num >= pointMax) {
            self.expBar.value = 2000;
        }
        else {
            var valT = arr[curIndex + 1].cishu - (arr[curIndex] ? arr[curIndex].cishu : 0);
            self.expBar.value = pointArr[curIndex1] + Math.floor((num - (arr[curIndex] ? arr[curIndex].cishu : 0)) * (pointArr[curIndex1 + 1] - pointArr[curIndex1]) / valT);
        }
        self.expBar.max = 2000;
        self.expBar._titleObject.text = Model_ZSGodWeapon.dazaoNum + "/" + pointMax;
        //花费
        if (self._cost1 == 0) {
            self._cost1 = Number(JSON.parse(ConfigHelp.getSystemDesc(6730))[0][2]);
        }
        if (self._cost10 == 0) {
            self._cost10 = Number(JSON.parse(ConfigHelp.getSystemDesc(6731))[0][2]);
        }
        var count = Model_Bag.getItemCount(Model_ZSGodWeapon.duanzaoC);
        if (count > 0) {
            ImageLoader.instance.loader(Enum_Path.ICON70_URL + self.dzItem.icon + ".png", self.vres1.getChild("icon").asLoader);
            self.vres1.text = "" + count + "/1";
            self.vres1.color = Color.WHITEINT;
            self.btnBuy1.checkNotice = true;
        }
        else {
            self.vres1.icon = CommonManager.getMoneyUrl(Enum_Attr.yuanBao);
            self.vres1.text = "" + self._cost1;
            if (Model_player.voMine.yuanbao >= this._cost1) {
                self.vres1.color = Color.GREENINT;
            }
            else {
                self.vres1.color = Color.REDINT;
            }
            self.btnBuy1.checkNotice = false;
        }
        if (count > 9) {
            ImageLoader.instance.loader(Enum_Path.ICON70_URL + self.dzItem.icon + ".png", self.vres10.getChild("icon").asLoader);
            self.vres10.text = count + "/10";
            self.vres10.color = Color.WHITEINT;
            self.btnBuy10.checkNotice = true;
        }
        else {
            self.vres10.icon = CommonManager.getMoneyUrl(Enum_Attr.yuanBao);
            self.vres10.text = "" + self._cost10;
            if (Model_player.voMine.yuanbao >= self._cost10) {
                self.vres10.color = Color.GREENINT;
            }
            else {
                self.vres10.color = Color.REDINT;
            }
            self.btnBuy10.checkNotice = false;
        }
        var count1 = Model_Bag.getItemCount(Model_ZSGodWeapon.shenjiangC);
        self.drugCount.color = count1 > 0 ? Color.getColorInt(2) : Color.getColorInt(6);
        self.godBt.checkNotice = count1 > 0;
        self.drugCount.text = count1 + "/1";
        self.hightLb.text = "再打造" + HtmlUtil.fontNoSize(Model_ZSGodWeapon.hightNum + "次", Color.getColorStr(2)) + "必出高级奖励\n使用神匠锤必出神兵";
    };
    Child_GodWeapon_DuanZao.prototype.playEff = function (dropArr) {
        var self = this;
        if (self.eff) {
            EffectMgr.instance.removeEff(self.eff);
            self.eff = null;
        }
        self.t0.setPaused(true);
        self.eff = EffectMgr.addEff("uieff/10051", self.effImg.displayObject, self.effImg.width / 2, self.effImg.height / 2, 1000, -1, true);
        var times = setTimeout(function () {
            clearTimeout(times);
            if (self.eff) {
                EffectMgr.instance.removeEff(self.eff);
                self.eff = null;
            }
            self.t0.setPaused(false);
            if (!self.eff) {
                self.eff = EffectMgr.addEff("uieff/10050", self.effImg.displayObject, self.effImg.width / 2, self.effImg.height / 2, 1000, -1, true);
            }
            GGlobal.layerMgr.open(UIConst.ZS_GODWEAPON_REWARD, dropArr);
        }, 1000);
    };
    Child_GodWeapon_DuanZao.prototype.onBuy1 = function () {
        var self = this;
        var count = Model_Bag.getItemCount(Model_ZSGodWeapon.duanzaoC);
        if (count > 0) {
            GGlobal.modelGodWeapon.CG_GodWeapon_makeWuqi_7863(0, 0);
            self.btnBuy1.touchable = self.btnBuy10.touchable = false;
        }
        else {
            if (GGlobal.modelActivity.getActivityByID(UIConst.ACTCOM_SBZK)) {
                if (Model_player.voMine.yuanbao < self._disCost1) {
                    ModelChongZhi.guideToRecharge();
                    return;
                }
            }
            else {
                if (Model_player.voMine.yuanbao < self._cost1) {
                    ModelChongZhi.guideToRecharge();
                    return;
                }
            }
            GGlobal.modelGodWeapon.CG_GodWeapon_makeWuqi_7863(0, 0);
            self.btnBuy1.touchable = self.btnBuy10.touchable = false;
        }
    };
    Child_GodWeapon_DuanZao.prototype.onBuy10 = function () {
        var self = this;
        var count = Model_Bag.getItemCount(Model_ZSGodWeapon.duanzaoC);
        if (count > 9) {
            GGlobal.modelGodWeapon.CG_GodWeapon_makeWuqi_7863(1, 0);
            self.btnBuy1.touchable = self.btnBuy10.touchable = false;
        }
        else {
            if (GGlobal.modelActivity.getActivityByID(UIConst.ACTCOM_SBZK)) {
                if (Model_player.voMine.yuanbao < self._disCost10) {
                    ModelChongZhi.guideToRecharge();
                    return;
                }
            }
            else {
                if (Model_player.voMine.yuanbao < self._cost10) {
                    ModelChongZhi.guideToRecharge();
                    return;
                }
            }
            GGlobal.modelGodWeapon.CG_GodWeapon_makeWuqi_7863(1, 0);
            self.btnBuy1.touchable = self.btnBuy10.touchable = false;
        }
    };
    Child_GodWeapon_DuanZao.prototype.renderItem = function (index, obj) {
        var v = obj;
        v.isShowEff = true;
        v.vo = this.showArr[index];
    };
    Child_GodWeapon_DuanZao.prototype.onCheck = function (e) {
        Model_ZSGodWeapon.skipTween = this.checkBox.selected;
        var key = Model_player.voMine.id + "_ZSGodWeaponCheck";
        var val = Model_ZSGodWeapon.skipTween ? "1" : "0";
        egret.localStorage.setItem(key, val);
    };
    Child_GodWeapon_DuanZao.prototype.scrollComp1 = function () {
        var s = this;
        var pos = s.list.scrollPane.posX + 5;
        s.list.scrollPane.setPosX(pos, true);
    };
    Child_GodWeapon_DuanZao.prototype.getSelectJob = function () {
        return 0;
    };
    /**
     * 检查神兵折扣活动是否开启
     */
    Child_GodWeapon_DuanZao.prototype.checkSBZKShow = function () {
        var itemNum = Model_Bag.getItemCount(Model_ZSGodWeapon.duanzaoC);
        if (GGlobal.modelActivity.getActivityByID(UIConst.ACTCOM_SBZK)) {
            this.tipsGroup.visible = true;
            if (itemNum > 0) {
                this.vres1.visible = true;
                this.vresG1.visible = false;
            }
            else {
                this.vres1.visible = true;
                this.vresG1.visible = true;
            }
            if (itemNum > 9) {
                this.vres10.visible = true;
                this.vresG10.visible = false;
            }
            else {
                this.vres10.visible = true;
                this.vresG10.visible = true;
            }
            if (!this.vresG1.visible && !this.vresG10.visible)
                return;
            var curCfg = Model_ZSGodWeapon.getIsbzk_281(GGlobal.model_actCom.forgeNum);
            var nextCfg = void 0;
            if (curCfg) {
                nextCfg = Config.sbzk_281[curCfg.id + 1];
            }
            if (nextCfg) {
                var arr = JSON.parse(nextCfg.time);
                var count = arr[0][0] - GGlobal.model_actCom.forgeNum;
                if (curCfg.off >= 100) {
                    this.tips.text = "打造" + HtmlUtil.fontNoSize(String(count), Color.YELLOWSTR) + "次后可享" + HtmlUtil.font(String(nextCfg.off / 10) + "折", Color.getColorStr(6), 22) + "优惠";
                }
                else {
                    this.tips.text = "当前打造享" + HtmlUtil.font(String(curCfg.off / 10) + "折", Color.getColorStr(6), 22) + "优惠\n打造" + HtmlUtil.fontNoSize(String(count), Color.YELLOWSTR) + "次后可享" + HtmlUtil.font(String(nextCfg.off / 10) + "折", Color.getColorStr(6), 22) + "优惠";
                }
                var arr1 = JSON.parse(curCfg.time);
                var count1 = arr1[0][1] - GGlobal.model_actCom.forgeNum;
                if (count1 >= 10) {
                    this._disCost10 = Math.ceil(this._cost10 * (curCfg.off / 100));
                    this.discount10.text = "(" + this._disCost10 + ")";
                }
                else {
                    var one = this._cost10 / 10;
                    var total = one * count1 * (curCfg.off / 100) + one * (10 - count1) * (nextCfg.off / 100);
                    this._disCost10 = Math.ceil(total);
                    this.discount10.text = "(" + this._disCost10 + ")";
                }
            }
            else {
                this.tips.text = "已享最高折扣" + HtmlUtil.font(String(curCfg.off / 10) + "折", Color.getColorStr(6), 22) + "优惠";
                this._disCost10 = Math.ceil(this._cost10 * (curCfg.off / 100));
                this.discount10.text = "(" + this._disCost10 + ")";
            }
            this._disCost1 = Math.ceil(this._cost1 * (curCfg.off / 100));
            this.discount1.text = "(" + this._disCost1 + ")";
        }
        else {
            this.vres1.visible = true;
            this.vres10.visible = true;
            this.tipsGroup.visible = false;
            this.vresG1.visible = false;
            this.vresG10.visible = false;
        }
    };
    Child_GodWeapon_DuanZao.URL = "ui://zyx92gzwm4uj45";
    return Child_GodWeapon_DuanZao;
}(fairygui.GComponent));
__reflect(Child_GodWeapon_DuanZao.prototype, "Child_GodWeapon_DuanZao");
