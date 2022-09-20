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
/**连续消费 */
var ChildLXX814 = (function (_super) {
    __extends(ChildLXX814, _super);
    function ChildLXX814() {
        var _this = _super.call(this) || this;
        _this._curDay = 0;
        _this.valid = 0;
        _this.invalid = 0;
        return _this;
    }
    ChildLXX814.getInst = function () {
        fairygui.UIObjectFactory.setPackageItemExtension(ChildLXX814.URL, ChildLXX814);
        fairygui.UIObjectFactory.setPackageItemExtension(ItemLXX814.URL, ItemLXX814);
        return this._inst || (this._inst = fairygui.UIPackage.createObject("chaozhifanli", "ChildLXXF"));
    };
    ChildLXX814.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
        self.list.itemRenderer = function (index, item) { item.data = (index + 1); };
        self.list.callbackThisObj = self;
        self.btnGet.addClickListener(self.onHand, self);
        self.btnForward.addClickListener(self.onHand, self);
        self.btnBuLing.addClickListener(self.onHand, self);
        self.btnBigAward.addClickListener(self.onHand, self);
        self.gridBigAward.isShowEff = true;
        self.gridBigAward.tipEnabled = true;
        self.gridBigAward1.isShowEff = true;
        self.gridBigAward1.tipEnabled = true;
        self.btnLeft.displayObject.touchEnabled = true;
        self.btnRight.displayObject.touchEnabled = true;
        CommonManager.listPageChange("ChildLXXF", self.list, self.btnLeft, self.btnRight, 5);
    };
    ChildLXX814.prototype.onHand = function (evt) {
        var self = this;
        var tar = evt.currentTarget;
        var day_seven = ModelLXX814.DAY_SEVEN;
        var day = GGlobal.modelLXX814.datas[self._curDay - 1].day;
        switch (tar) {
            case self.btnGet:
                GGlobal.modelLXX814.applayAwards(day);
                break;
            case self.btnForward:
                GGlobal.layerMgr.open(UIConst.CANGBAOGE);
                break;
            case self.btnBuLing:
                var cfg = Config.lxxf3_737[day];
                var award = ConfigHelp.makeItemListArr(JSON.parse(cfg.buling))[0];
                var content = "\u662F\u5426\u82B1\u8D39" + HtmlUtil.fontNoSize(award.count + "\u5143\u5B9D", "#00ffff") + ("\u8865\u9886\u3010\u7B2C" + self._curDay + "\u5929\u3011\u5956\u52B1?\n") +
                    "(\u6D3B\u52A8\u603B\u8FDB\u5EA6+1)";
                ViewAlert.show(content, Handler.create(self, function () {
                    GGlobal.modelLXX814.applayAwards(day);
                }), 3);
                break;
            case self.btnBigAward:
                GGlobal.modelLXX814.applyBigAwards();
                break;
        }
    };
    /**展示大奖 */
    ChildLXX814.prototype.showBigAward = function () {
        var self = this;
        if (self.gridBigAward) {
            self.gridBigAward.vo = null;
        }
        var actLib = ModelEightLock.originalDatas[UIConst.LXXF3];
        if (!actLib) {
            DEBUGWARING.log("连续消费814已经结束");
            GGlobal.layerMgr.close(UIConst.CHAOZHIFL);
            return;
        }
        var qs = actLib.qishu;
        var smlcfg = Config.lxxfreward3_737[qs * 1000 + 3];
        var bigcfg = Config.lxxfreward3_737[qs * 1000 + 7];
        if (bigcfg == null || smlcfg == null) {
            return;
        }
        if (GGlobal.modelLXX814.smlGiftGotSt > 0) {
            IconUtil.setImg(this.bigImg, Enum_Path.PIC_URL + bigcfg.pic + ".png");
        }
        else {
            IconUtil.setImg(this.bigImg, Enum_Path.PIC_URL + smlcfg.pic + ".png");
        }
        self.gridBigAward.vo = ConfigHelp.makeItem(JSON.parse(bigcfg.reward)[0]);
        self.txtZhanLi.text = "战力: " + bigcfg.power;
        self.gridBigAward1.vo = ConfigHelp.makeItem(JSON.parse(smlcfg.reward)[0]);
        self.txtZhanLi1.text = "战力: " + smlcfg.power;
        if (this._eff == null) {
            this._eff = EffectMgr.addEff("uieff/10022", self["n88"].displayListContainer, self["n88"].width / 2, self["n88"].height / 2, 800, -1);
        }
        if (this._eff1 == null) {
            this._eff1 = EffectMgr.addEff("uieff/10022", self["n98"].displayListContainer, self["n98"].width / 2, self["n98"].height / 2, 800, -1);
        }
    };
    ChildLXX814.prototype.onSel = function (evt) {
        var item = evt.itemObject;
        this.setSel(item.data);
    };
    ChildLXX814.prototype.setSel = function (day) {
        var self = this;
        self._curDay = day;
        var item = self.getItem(day);
        if (item) {
            if (self._curItem) {
                self._curItem.setSelected(false);
            }
            (self._curItem = item).setSelected(true);
            self.showDetail();
        }
        else {
            self.invalid |= self.valid;
        }
        if (self.valid & self.invalid) {
            self.valid &= 0;
            self.invalid &= 0;
            GGlobal.reddot.setCondition(UIConst.LXXF3, 0, GGlobal.modelLXX814.checkNotice());
            GGlobal.reddot.notify(UIConst.CHAOZHIFL);
        }
    };
    ChildLXX814.prototype.getItem = function (day) {
        var self = this;
        for (var i = 0; i < self.list._children.length; i++) {
            var item = self.list._children[i];
            if (item.data == day) {
                return item;
            }
        }
        return null;
    };
    ChildLXX814.prototype.onUpdate = function () {
        var self = this;
        var day_seven = ModelLXX814.DAY_SEVEN;
        var day = GGlobal.modelLXX814.day;
        if (day > 0) {
            self.list.numItems = day_seven;
            if (day > day_seven)
                day = day_seven;
            self.list.scrollToView(day - 1);
            self.setSel(self._curDay > 0 ? self._curDay : day);
            self.showBigAward();
        }
    };
    ChildLXX814.prototype.showDetail = function () {
        var self = this;
        var model = GGlobal.modelLXX814;
        var dayFined = model.dayFinished();
        if (GGlobal.modelLXX814.smlGiftGotSt > 0) {
            self.txtProgress.text = dayFined + "/" + ModelLXX814.DAY_SEVEN;
            if (dayFined >= ModelLXX814.DAY_SEVEN) {
                self.ctrl2.setSelectedIndex(0);
                if (model.bigGiftGotSt == 0) {
                    self.btnBigAward.visible = true;
                    self.iconBigGot.visible = false;
                    self.btnBigAward.checkNotice = dayFined >= ModelLXX814.DAY_SEVEN;
                }
                else {
                    self.btnBigAward.visible = false;
                    self.iconBigGot.visible = true;
                }
            }
            else {
                self.ctrl2.setSelectedIndex(1);
            }
        }
        else {
            self.txtProgress.text = dayFined + "/" + ModelLXX814.DAY_THREE;
            if (dayFined >= ModelLXX814.DAY_THREE) {
                self.ctrl2.setSelectedIndex(0);
                if (model.smlGiftGotSt == 0) {
                    self.btnBigAward.visible = true;
                    self.iconBigGot.visible = false;
                    self.btnBigAward.checkNotice = dayFined >= ModelLXX814.DAY_THREE;
                }
                else {
                    self.btnBigAward.visible = false;
                    self.iconBigGot.visible = true;
                }
            }
            else {
                self.ctrl2.setSelectedIndex(1);
            }
        }
        var data = model.datas[self._curDay - 1];
        if (!data) {
            return;
        }
        var cfg = Config.lxxf3_737[data.day];
        if (!cfg) {
            return;
        }
        var enough = data.costYB - cfg.xiaohao >= 0;
        self.txtCost.text = HtmlUtil.fontNoSize("\u6D88\u8017" + cfg.xiaohao + "\u5143\u5B9D", "#FFFFFF") + HtmlUtil.fontNoSize("(" + data.costYB + "/" + cfg.xiaohao + ")", enough ? "#00FF00" : "#FF0000");
        if (self.grids) {
            ConfigHelp.cleanGridview(self.grids);
        }
        var numArr = JSON.parse(cfg.jiangli);
        var awards = ConfigHelp.makeItemListArr(numArr);
        self.grids = ConfigHelp.addGridview(awards, self, 36, 518, true, false, 10, 106);
        var state = self.getState();
        self.ctrl1.setSelectedIndex(state); //0领取 1前往  2已领取 3补领
        self.btnGet.visible = model.day >= self._curDay;
        switch (state) {
            case 0:
                if (data.costYB >= cfg.xiaohao && data.state == 0) {
                    self.btnGet.checkNotice = true;
                }
                else {
                    self.btnGet.checkNotice = false;
                }
                self.invalid |= self.valid;
                break;
            case 1:
                self.invalid |= self.valid;
                break;
            case 2:
                self.invalid |= self.valid;
                break;
            case 3:
                var award = ConfigHelp.makeItemListArr(JSON.parse(cfg.buling))[0];
                self.txtYBCost.text = award.count + "";
                var bool = !model.invalidNotMap[self._curDay - 1] && data.state == 0 && award.count <= Model_player.voMine.yuanbao;
                self.btnBuLing.checkNotice = bool;
                model.setBLNot(self._curDay - 1, true);
                if (!bool && self.valid) {
                    self.invalid |= 1;
                }
                self.valid |= 1;
                break;
        }
        self.showLeftTm();
    };
    ChildLXX814.prototype.getState = function () {
        var self = this;
        var info = GGlobal.modelLXX814.datas[self._curDay - 1];
        var costYB = Config.lxxf3_737[info.day].xiaohao;
        if ((info.costYB >= costYB && info.state == 0)) {
            return 0;
        }
        else if (self._curDay == GGlobal.modelLXX814.day && info.costYB < costYB && info.state == 0) {
            return 1;
        }
        else if (info.state == 1) {
            return 2;
        }
        else if (info.state == 2) {
            return 3;
        }
        return 0;
    };
    ChildLXX814.prototype.showLeftTm = function () {
        this.addTimer(1000 * 60 * 60);
    };
    ChildLXX814.prototype.addTimer = function (time) {
        if (time === void 0) { time = 1000; }
        this._act = ModelEightLock.getActVo(UIConst.LXXF3);
        Timer.instance.listen(this.onTimer, this, time, 0, true);
    };
    ChildLXX814.prototype.removeTimer = function () {
        Timer.instance.remove(this.onTimer, this);
        this.txtLeftTm.text = "活动剩余时间: " + HtmlUtil.fontNoSize("00:00:00", "#00ff00");
    };
    ChildLXX814.prototype.onTimer = function () {
        if (this._act) {
            var d = this._act.end - Math.floor(Model_GlobalMsg.getServerTime() / 1000);
            if (d < 0) {
                this.txtLeftTm.text = "活动剩余时间：已结束";
            }
            else {
                this.txtLeftTm.text = "活动剩余时间：" + HtmlUtil.fontNoSize(DateUtil.getMSBySecond4(d), "#00ff00");
            }
        }
        else {
            this.txtLeftTm.text = "活动剩余时间：";
        }
    };
    ChildLXX814.prototype.open = function () {
        var self = this;
        self.showBigAward();
        self.list.addEventListener(fairygui.ItemEvent.CLICK, self.onSel, self);
        GGlobal.modelLXX814.listen(ModelLXX814.msg_datas, self.onUpdate, self);
        GGlobal.control.listen(Enum_MsgType.KAIFUDAY_UPDATE, self.onUpdate, self);
        GGlobal.modelEightLock.CG4571(UIConst.LXXF3);
        IconUtil.setImg(self.n66, Enum_Path.BACK_URL + "lxxf.jpg");
        self.onUpdate();
        self.gridBigAward.isShowEff = true;
        self.gridBigAward.tipEnabled = true;
        self.gridBigAward1.isShowEff = true;
        self.gridBigAward1.tipEnabled = true;
    };
    ChildLXX814.prototype.close = function () {
        var self = this;
        self.list.scrollToView(0);
        self.list.removeEventListener(fairygui.ItemEvent.CLICK, self.onSel, self);
        GGlobal.modelLXX814.remove(ModelLXX814.msg_datas, self.onUpdate, self);
        GGlobal.control.remove(Enum_MsgType.KAIFUDAY_UPDATE, self.onUpdate, self);
        self.grids && ConfigHelp.cleanGridview(self.grids);
        self.setSel(0);
        self.removeTimer();
        IconUtil.setImg(self.n66, null);
        IconUtil.setImg(self.bigImg, null);
        self.valid &= 0;
        self.invalid &= 0;
        if (self.gridBigAward) {
            ConfigHelp.cleanGridEff([self.gridBigAward]);
            self.gridBigAward.vo = null;
        }
        if (self.gridBigAward1) {
            ConfigHelp.cleanGridEff([self.gridBigAward1]);
        }
        if (this._eff) {
            EffectMgr.instance.removeEff(this._eff);
            this._eff = null;
        }
        if (this._eff1) {
            EffectMgr.instance.removeEff(this._eff1);
            this._eff1 = null;
        }
        self.list.numItems = 0;
    };
    ChildLXX814.URL = "ui://qzsojhcrtt6c14";
    return ChildLXX814;
}(fairygui.GComponent));
__reflect(ChildLXX814.prototype, "ChildLXX814", ["ICZFLView"]);
