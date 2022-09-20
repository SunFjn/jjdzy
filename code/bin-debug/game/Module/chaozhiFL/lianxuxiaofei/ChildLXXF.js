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
var ChildLXXF = (function (_super) {
    __extends(ChildLXXF, _super);
    function ChildLXXF() {
        var _this = _super.call(this) || this;
        _this._curDay = 0;
        _this.valid = 0;
        _this.invalid = 0;
        return _this;
    }
    ChildLXXF.getInst = function () {
        fairygui.UIObjectFactory.setPackageItemExtension(ChildLXXF.URL, ChildLXXF);
        fairygui.UIObjectFactory.setPackageItemExtension(ItemLXXF.URL, ItemLXXF);
        return this._inst || (this._inst = fairygui.UIPackage.createObject("chaozhifanli", "ChildLXXF"));
    };
    ChildLXXF.prototype.constructFromXML = function (xml) {
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
    ChildLXXF.prototype.onHand = function (evt) {
        var self = this;
        var tar = evt.currentTarget;
        var day_seven = GGlobal.modelLXXF.DAY_SEVEN;
        var bool = TimeUitl.isIn7Days();
        switch (tar) {
            case self.btnGet:
                if (GGlobal.modelLXXF.kaifuDay >= self._curDay) {
                    if (bool) {
                        GGlobal.modelLXXF.applayAwards(self._curDay);
                    }
                    else {
                        GGlobal.modelLXXF.applayAwards(self._curDay + (GGlobal.modelLXXF.qishu - 1) * day_seven);
                    }
                }
                else {
                    ViewCommonWarn.text("开服天数不足");
                }
                break;
            case self.btnForward:
                GGlobal.layerMgr.open(UIConst.CANGBAOGE);
                break;
            case self.btnBuLing:
                var qishu = GGlobal.modelLXXF.qishu;
                var cfg = TimeUitl.isIn7Days() ? Config.lxxf1_737[self._curDay] : Config.lxxf2_737[self._curDay + (qishu - 1) * 7];
                var award = ConfigHelp.makeItemListArr(JSON.parse(cfg.buling))[0];
                var content = "\u662F\u5426\u82B1\u8D39" + HtmlUtil.fontNoSize(award.count + "\u5143\u5B9D", "#00ffff") + ("\u8865\u9886\u3010\u7B2C" + self._curDay + "\u5929\u3011\u5956\u52B1?\n") +
                    "(\u6D3B\u52A8\u603B\u8FDB\u5EA6+1)";
                ViewAlert.show(content, Handler.create(self, function () {
                    if (bool) {
                        GGlobal.modelLXXF.applayAwards(self._curDay);
                    }
                    else {
                        GGlobal.modelLXXF.applayAwards(self._curDay + (GGlobal.modelLXXF.qishu - 1) * day_seven);
                    }
                }), 3);
                break;
            case self.btnBigAward:
                GGlobal.modelLXXF.applyBigAwards();
                break;
        }
    };
    /**展示大奖 */
    ChildLXXF.prototype.showBigAward = function () {
        var self = this;
        var bool = TimeUitl.isIn7Days();
        if (self.gridBigAward) {
            self.gridBigAward.vo = null;
        }
        if (bool) {
            if (GGlobal.modelLXXF.smlGiftGotSt > 0) {
                IconUtil.setImg(this.bigImg, Enum_Path.PIC_URL + Config.xtcs_004[3812].num + ".png");
            }
            else {
                IconUtil.setImg(this.bigImg, Enum_Path.PIC_URL + Config.xtcs_004[3811].num + ".png");
            }
            self.gridBigAward.vo = ConfigHelp.makeItem(JSON.parse(Config.xtcs_004[3806].other)[0]);
            self.txtZhanLi.text = "战力: " + Config.xtcs_004[4405].num;
            self.gridBigAward1.vo = ConfigHelp.makeItem(JSON.parse(Config.xtcs_004[3805].other)[0]);
            self.txtZhanLi1.text = "战力: " + Config.xtcs_004[4404].num;
        }
        else {
            var qishu = GGlobal.modelLXXF.qishu;
            if (qishu == 1) {
                if (GGlobal.modelLXXF.smlGiftGotSt > 0) {
                    IconUtil.setImg(this.bigImg, Enum_Path.PIC_URL + Config.xtcs_004[4401].num + ".png");
                }
                else {
                    IconUtil.setImg(this.bigImg, Enum_Path.PIC_URL + Config.xtcs_004[3813].num + ".png");
                }
                self.gridBigAward.vo = ConfigHelp.makeItem(JSON.parse(Config.xtcs_004[3808].other)[0]);
                self.txtZhanLi.text = "战力: " + Config.xtcs_004[4407].num;
                self.gridBigAward1.vo = ConfigHelp.makeItem(JSON.parse(Config.xtcs_004[3807].other)[0]);
                self.txtZhanLi1.text = "战力: " + Config.xtcs_004[4406].num;
            }
            else if (qishu == 2) {
                if (GGlobal.modelLXXF.smlGiftGotSt > 0) {
                    IconUtil.setImg(this.bigImg, Enum_Path.PIC_URL + Config.xtcs_004[4403].num + ".png");
                }
                else {
                    IconUtil.setImg(this.bigImg, Enum_Path.PIC_URL + Config.xtcs_004[4402].num + ".png");
                }
                self.gridBigAward.vo = ConfigHelp.makeItem(JSON.parse(Config.xtcs_004[3810].other)[0]);
                self.txtZhanLi.text = "战力: " + Config.xtcs_004[4409].num;
                self.gridBigAward1.vo = ConfigHelp.makeItem(JSON.parse(Config.xtcs_004[3809].other)[0]);
                self.txtZhanLi1.text = "战力: " + Config.xtcs_004[4408].num;
            }
            else if (qishu == 3) {
                if (GGlobal.modelLXXF.smlGiftGotSt > 0) {
                    IconUtil.setImg(this.bigImg, Enum_Path.PIC_URL + Config.xtcs_004[3827].num + ".png");
                }
                else {
                    IconUtil.setImg(this.bigImg, Enum_Path.PIC_URL + Config.xtcs_004[3826].num + ".png");
                }
                self.gridBigAward.vo = ConfigHelp.makeItem(JSON.parse(Config.xtcs_004[3821].other)[0]);
                self.txtZhanLi.text = "战力: " + Config.xtcs_004[4411].num;
                self.gridBigAward1.vo = ConfigHelp.makeItem(JSON.parse(Config.xtcs_004[3820].other)[0]);
                self.txtZhanLi1.text = "战力: " + Config.xtcs_004[4410].num;
            }
            else if (qishu == 4) {
                if (GGlobal.modelLXXF.smlGiftGotSt > 0) {
                    IconUtil.setImg(this.bigImg, Enum_Path.PIC_URL + Config.xtcs_004[3829].num + ".png");
                }
                else {
                    IconUtil.setImg(this.bigImg, Enum_Path.PIC_URL + Config.xtcs_004[3828].num + ".png");
                }
                self.gridBigAward.vo = ConfigHelp.makeItem(JSON.parse(Config.xtcs_004[3823].other)[0]);
                self.txtZhanLi.text = "战力: " + Config.xtcs_004[4413].num;
                self.gridBigAward1.vo = ConfigHelp.makeItem(JSON.parse(Config.xtcs_004[3822].other)[0]);
                self.txtZhanLi1.text = "战力: " + Config.xtcs_004[4412].num;
            }
            else if (qishu == 5) {
                if (GGlobal.modelLXXF.smlGiftGotSt > 0) {
                    IconUtil.setImg(this.bigImg, Enum_Path.PIC_URL + Config.xtcs_004[3831].num + ".png");
                }
                else {
                    IconUtil.setImg(this.bigImg, Enum_Path.PIC_URL + Config.xtcs_004[3830].num + ".png");
                }
                self.gridBigAward.vo = ConfigHelp.makeItem(JSON.parse(Config.xtcs_004[3825].other)[0]);
                self.txtZhanLi.text = "战力: " + Config.xtcs_004[4415].num;
                self.gridBigAward1.vo = ConfigHelp.makeItem(JSON.parse(Config.xtcs_004[3824].other)[0]);
                self.txtZhanLi1.text = "战力: " + Config.xtcs_004[4414].num;
            }
        }
        if (this._eff == null) {
            this._eff = EffectMgr.addEff("uieff/10022", self["n88"].displayListContainer, self["n88"].width / 2, self["n88"].height / 2, 800, -1);
        }
        if (this._eff1 == null) {
            this._eff1 = EffectMgr.addEff("uieff/10022", self["n98"].displayListContainer, self["n98"].width / 2, self["n98"].height / 2, 800, -1);
        }
        // var childIndex = self.getChildIndex(self["n89"]);
        // ExtralFunc.addBigAdEff("ChildLXXF", (self["n88"] as Button2), "uieff/10022", this._childIndex - 1);
        // self.setChildIndex(self["n89"], 100);
        // childIndex = self.getChildIndex(self["n99"]);
        // ExtralFunc.addBigAdEff("ChildLXXF1", self["n98"], "uieff/10022", this._childIndex - 1);
        // self.setChildIndex(self["n99"], 100);
    };
    ChildLXXF.prototype.onSel = function (evt) {
        var item = evt.itemObject;
        this.setSel(item.data);
    };
    ChildLXXF.prototype.setSel = function (day) {
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
            if (TimeUitl.isIn7Days()) {
                GGlobal.reddot.setCondition(UIConst.LXXF1, 0, GGlobal.modelLXXF.checkNotice());
            }
            else {
                GGlobal.reddot.setCondition(UIConst.LXXF2, 0, GGlobal.modelLXXF.checkNotice());
            }
            GGlobal.reddot.notify(UIConst.CHAOZHIFL);
        }
    };
    ChildLXXF.prototype.getItem = function (day) {
        var self = this;
        for (var i = 0; i < self.list._children.length; i++) {
            var item = self.list._children[i];
            if (item.data == day) {
                return item;
            }
        }
        return null;
    };
    ChildLXXF.prototype.onUpdate = function () {
        var self = this;
        var day_seven = GGlobal.modelLXXF.DAY_SEVEN;
        self.list.numItems = day_seven;
        var day = Math.max(1, Math.min(GGlobal.modelLXXF.kaifuDay, day_seven));
        self.list.scrollToView(day - 1);
        self.setSel(self._curDay > 0 ? self._curDay : day);
        self.showBigAward();
    };
    ChildLXXF.prototype.showDetail = function () {
        var self = this;
        var model = GGlobal.modelLXXF;
        var dayFined = model.dayFinished();
        if (GGlobal.modelLXXF.smlGiftGotSt > 0) {
            self.txtProgress.text = dayFined + "/" + model.DAY_SEVEN;
            if (dayFined >= model.DAY_SEVEN) {
                self.ctrl2.setSelectedIndex(0);
                if (model.bigGiftGotSt == 0) {
                    self.btnBigAward.visible = true;
                    self.iconBigGot.visible = false;
                    self.btnBigAward.checkNotice = dayFined >= model.DAY_SEVEN;
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
            self.txtProgress.text = dayFined + "/" + model.DAY_THREE;
            if (dayFined >= model.DAY_THREE) {
                self.ctrl2.setSelectedIndex(0);
                if (model.smlGiftGotSt == 0) {
                    self.btnBigAward.visible = true;
                    self.iconBigGot.visible = false;
                    self.btnBigAward.checkNotice = dayFined >= model.DAY_THREE;
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
        var qishu = GGlobal.modelLXXF.qishu;
        var data = model.datas[self._curDay];
        if (!data) {
            return;
        }
        var cfg = TimeUitl.isIn7Days() ? Config.lxxf1_737[self._curDay] : Config.lxxf2_737[self._curDay + (qishu - 1) * 7];
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
        var kfDay = model.kaifuDay;
        self.btnGet.visible = kfDay >= self._curDay;
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
                // ImageLoader.instance.loader(Enum_Path.ICON70_URL + award.icon + ".png", self.iconBL);
                self.txtYBCost.text = award.count + "";
                var bool = !model.invalidNotMap[self._curDay] && kfDay > self._curDay && data.state == 0 && award.count <= Model_player.voMine.yuanbao;
                self.btnBuLing.checkNotice = bool;
                model.setBLNot(self._curDay, true);
                if (!bool && self.valid) {
                    self.invalid |= 1;
                }
                self.valid |= 1;
                break;
        }
        self.showLeftTm();
    };
    ChildLXXF.prototype.getState = function () {
        var self = this;
        var info = GGlobal.modelLXXF.datas[self._curDay];
        var qishu = GGlobal.modelLXXF.qishu;
        var costYB = TimeUitl.isIn7Days() ? Config.lxxf1_737[self._curDay].xiaohao : Config.lxxf2_737[self._curDay + (qishu - 1) * 7].xiaohao;
        var kfDay = GGlobal.modelLXXF.kaifuDay;
        if (kfDay < self._curDay || (info.costYB >= costYB && info.state == 0)) {
            return 0;
        }
        else if (kfDay >= self._curDay && info.costYB < costYB && info.state == 0) {
            if (kfDay == self._curDay) {
                return 1;
            }
            else {
                return 3;
            }
        }
        else if (info.state == 1) {
            return 2;
        }
        return 0;
    };
    ChildLXXF.prototype.getActObj = function () {
        var arr = GGlobal.modelActivity.getGroup(UIConst.CHAOZHIFL); //Model_Activity.activityObj[UIConst.CHAOZHIFL];
        for (var i = 0; i < arr.length; i++) {
            var act = arr[i];
            if (act.id == UIConst.LXXF2) {
                return arr[i];
            }
        }
        return null;
    };
    ChildLXXF.prototype.showLeftTm = function () {
        var leftDay = 8 - Model_GlobalMsg.kaifuDay;
        if (leftDay > 1) {
            this.addTimer(1000 * 60 * 60);
        }
        else {
            if (leftDay <= 0) {
                var ms = Model_GlobalMsg.getServerTime();
                var actObj = this.getActObj();
                if (!actObj) {
                    this.removeTimer();
                    return;
                }
                var timePassed = actObj.end * 1000 - ms;
                var day = timePassed / (1000 * 60 * 60 * 24);
                if (day > 1) {
                    this.addTimer(1000 * 60 * 60);
                }
                else {
                    this.addTimer();
                }
            }
            else {
                this.addTimer();
            }
        }
    };
    ChildLXXF.prototype.addTimer = function (time) {
        if (time === void 0) { time = 1000; }
        Timer.instance.listen(this.onTimer, this, time, 0, true);
    };
    ChildLXXF.prototype.removeTimer = function () {
        Timer.instance.remove(this.onTimer, this);
        this.txtLeftTm.text = "活动剩余时间: " + HtmlUtil.fontNoSize("00:00:00", "#00ff00");
    };
    ChildLXXF.prototype.onTimer = function () {
        var self = this;
        var ms = Model_GlobalMsg.getServerTime();
        var day = 8 - Model_GlobalMsg.kaifuDay;
        var data = DateUtil.clearHourse(new Date(ms));
        if (day <= 0) {
            var actObj = self.getActObj();
            if (!actObj) {
                self.removeTimer();
                return;
            }
            var timePassed = actObj.end * 1000 - ms;
            var day = timePassed / (1000 * 60 * 60 * 24);
            if (day <= 1) {
                self.txtLeftTm.text = "活动剩余时间: " + HtmlUtil.fontNoSize(DateUtil.getHMSBySecond(timePassed / 1000 >> 0), "#00ff00");
                if (ax < 0) {
                    self.removeTimer();
                }
            }
            else {
                var hour = (day - (day >> 0)) * 24 >> 0;
                self.txtLeftTm.text = "活动剩余时间: " + HtmlUtil.fontNoSize((day >> 0) + "天" + hour + "小时", "#00ff00");
            }
        }
        else {
            var h0 = data.getTime();
            var ax = 86400000 - (ms - h0);
            if (day <= 1) {
                self.txtLeftTm.text = "活动剩余时间: " + HtmlUtil.fontNoSize(DateUtil.getHMSBySecond((ax / 1000) >> 0), "#00ff00");
                if (ax < 0) {
                    self.removeTimer();
                }
            }
            else {
                var hour = ax / (1000 * 60 * 60) >> 0;
                self.txtLeftTm.text = "活动剩余时间: " + HtmlUtil.fontNoSize((day - 1) + "天" + hour + "小时", "#00ff00");
            }
        }
    };
    ChildLXXF.prototype.open = function () {
        var self = this;
        self.showBigAward();
        self.list.addEventListener(fairygui.ItemEvent.CLICK, self.onSel, self);
        GGlobal.modelLXXF.listen(ModelLXXF.msg_datas, self.onUpdate, self);
        GGlobal.control.listen(Enum_MsgType.KAIFUDAY_UPDATE, self.onUpdate, self);
        GGlobal.modelLXXF.openUI();
        IconUtil.setImg(self.n66, Enum_Path.BACK_URL + "lxxf.jpg");
        self.gridBigAward.isShowEff = true;
        self.gridBigAward.tipEnabled = true;
        self.gridBigAward1.isShowEff = true;
        self.gridBigAward1.tipEnabled = true;
    };
    ChildLXXF.prototype.close = function () {
        var self = this;
        self.list.scrollToView(0);
        self.list.removeEventListener(fairygui.ItemEvent.CLICK, self.onSel, self);
        GGlobal.modelLXXF.remove(ModelLXXF.msg_datas, self.onUpdate, self);
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
        // ExtralFunc.addBigAdEff("ChildLXXF", self["n88"], null);
        // ExtralFunc.addBigAdEff("ChildLXXF1", self["n98"], null);
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
    ChildLXXF.URL = "ui://qzsojhcrtt6c14";
    return ChildLXXF;
}(fairygui.GComponent));
__reflect(ChildLXXF.prototype, "ChildLXXF", ["ICZFLView"]);
