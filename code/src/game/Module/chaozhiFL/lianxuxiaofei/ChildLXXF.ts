/**连续消费 */
class ChildLXXF extends fairygui.GComponent implements ICZFLView {
    public static URL = "ui://qzsojhcrtt6c14";
    private static _inst: ChildLXXF;
    public static getInst() {
        fairygui.UIObjectFactory.setPackageItemExtension(ChildLXXF.URL, ChildLXXF);
        fairygui.UIObjectFactory.setPackageItemExtension(ItemLXXF.URL, ItemLXXF);
        return this._inst || (this._inst = <any>fairygui.UIPackage.createObject("chaozhifanli", "ChildLXXF"));
    }
    public n66: fairygui.GLoader;
    public list: fairygui.GList;
    public txtProgress: fairygui.GRichTextField;
    public txtCost: fairygui.GRichTextField;
    public ctrl1: fairygui.Controller;
    public ctrl2: fairygui.Controller;
    public bigImg: fairygui.GLoader;
    public btnBigAward: Button0;
    public btnGet: Button0;
    public btnForward: Button0;
    public btnBuLing: Button0;
    public txtLeftTm: fairygui.GRichTextField;
    public txtYBCost: fairygui.GRichTextField;
    public iconBL: fairygui.GLoader;
    public iconBigGot: fairygui.GImage;
    public gridBigAward: ViewGrid;
    public gridBigAward1: ViewGrid;
    public txtZhanLi: fairygui.GRichTextField;
    public txtZhanLi1: fairygui.GRichTextField;
    public btnLeft; btnRight;
    public constructor() {
        super();
    }
    public grids;
    protected constructFromXML(xml) {
        super.constructFromXML(xml);
        const self = this;
        CommonManager.parseChildren(self, self);
        self.list.itemRenderer = (index, item) => { item.data = (index + 1) };
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
    }
    private onHand(evt) {
        const self = this;
        const tar = evt.currentTarget;
        const day_seven = GGlobal.modelLXXF.DAY_SEVEN;
        const bool = TimeUitl.isIn7Days();
        switch (tar) {
            case self.btnGet:
                if (GGlobal.modelLXXF.kaifuDay >= self._curDay) {
                    if (bool) {
                        GGlobal.modelLXXF.applayAwards(self._curDay);
                    } else {
                        GGlobal.modelLXXF.applayAwards(self._curDay + (GGlobal.modelLXXF.qishu - 1) * day_seven);
                    }
                } else {
                    ViewCommonWarn.text("开服天数不足");
                }
                break;
            case self.btnForward:
                GGlobal.layerMgr.open(UIConst.CANGBAOGE);
                break;
            case self.btnBuLing:
                const qishu = GGlobal.modelLXXF.qishu;
                const cfg = TimeUitl.isIn7Days() ? Config.lxxf1_737[self._curDay] : Config.lxxf2_737[self._curDay + (qishu - 1) * 7];
                const award = ConfigHelp.makeItemListArr(JSON.parse(cfg.buling))[0];
                const content = `是否花费` + HtmlUtil.fontNoSize(`${award.count}元宝`, "#00ffff") + `补领【第${self._curDay}天】奖励?\n` +
                    `(活动总进度+1)`;
                ViewAlert.show(content, Handler.create(self, () => {
                    if (bool) {
                        GGlobal.modelLXXF.applayAwards(self._curDay);
                    } else {
                        GGlobal.modelLXXF.applayAwards(self._curDay + (GGlobal.modelLXXF.qishu - 1) * day_seven);
                    }
                }), 3);
                break;
            case self.btnBigAward:
                GGlobal.modelLXXF.applyBigAwards();
                break;
        }
    }
    /**展示大奖 */
    private showBigAward() {
        const self = this;
        const bool = TimeUitl.isIn7Days();
        if (self.gridBigAward) {
            self.gridBigAward.vo = null;
        }
        if (bool) {
            if (GGlobal.modelLXXF.smlGiftGotSt > 0) {
                IconUtil.setImg(this.bigImg, Enum_Path.PIC_URL + Config.xtcs_004[3812].num + ".png");
            } else {
                IconUtil.setImg(this.bigImg, Enum_Path.PIC_URL + Config.xtcs_004[3811].num + ".png");
            }
            self.gridBigAward.vo = ConfigHelp.makeItem(JSON.parse(Config.xtcs_004[3806].other)[0]);
            self.txtZhanLi.text = "战力: " + Config.xtcs_004[4405].num;

            self.gridBigAward1.vo = ConfigHelp.makeItem(JSON.parse(Config.xtcs_004[3805].other)[0]);
            self.txtZhanLi1.text = "战力: " + Config.xtcs_004[4404].num;
        } else {
            const qishu = GGlobal.modelLXXF.qishu;
            if (qishu == 1) {
                if (GGlobal.modelLXXF.smlGiftGotSt > 0) {
                    IconUtil.setImg(this.bigImg, Enum_Path.PIC_URL + Config.xtcs_004[4401].num + ".png");
                } else {
                    IconUtil.setImg(this.bigImg, Enum_Path.PIC_URL + Config.xtcs_004[3813].num + ".png");
                }

                self.gridBigAward.vo = ConfigHelp.makeItem(JSON.parse(Config.xtcs_004[3808].other)[0]);
                self.txtZhanLi.text = "战力: " + Config.xtcs_004[4407].num;

                self.gridBigAward1.vo = ConfigHelp.makeItem(JSON.parse(Config.xtcs_004[3807].other)[0]);
                self.txtZhanLi1.text = "战力: " + Config.xtcs_004[4406].num;
            } else if (qishu == 2) {
                if (GGlobal.modelLXXF.smlGiftGotSt > 0) {
                    IconUtil.setImg(this.bigImg, Enum_Path.PIC_URL + Config.xtcs_004[4403].num + ".png");
                } else {
                    IconUtil.setImg(this.bigImg, Enum_Path.PIC_URL + Config.xtcs_004[4402].num + ".png");
                }

                self.gridBigAward.vo = ConfigHelp.makeItem(JSON.parse(Config.xtcs_004[3810].other)[0]);
                self.txtZhanLi.text = "战力: " + Config.xtcs_004[4409].num;

                self.gridBigAward1.vo = ConfigHelp.makeItem(JSON.parse(Config.xtcs_004[3809].other)[0]);
                self.txtZhanLi1.text = "战力: " + Config.xtcs_004[4408].num;
            } else if (qishu == 3) {//3,4,5期
                if (GGlobal.modelLXXF.smlGiftGotSt > 0) {
                    IconUtil.setImg(this.bigImg, Enum_Path.PIC_URL + Config.xtcs_004[3827].num + ".png");
                } else {
                    IconUtil.setImg(this.bigImg, Enum_Path.PIC_URL + Config.xtcs_004[3826].num + ".png");
                }

                self.gridBigAward.vo = ConfigHelp.makeItem(JSON.parse(Config.xtcs_004[3821].other)[0]);
                self.txtZhanLi.text = "战力: " + Config.xtcs_004[4411].num;

                self.gridBigAward1.vo = ConfigHelp.makeItem(JSON.parse(Config.xtcs_004[3820].other)[0]);
                self.txtZhanLi1.text = "战力: " + Config.xtcs_004[4410].num;
            } else if (qishu == 4) {
                if (GGlobal.modelLXXF.smlGiftGotSt > 0) {
                    IconUtil.setImg(this.bigImg, Enum_Path.PIC_URL + Config.xtcs_004[3829].num + ".png");
                } else {
                    IconUtil.setImg(this.bigImg, Enum_Path.PIC_URL + Config.xtcs_004[3828].num + ".png");
                }

                self.gridBigAward.vo = ConfigHelp.makeItem(JSON.parse(Config.xtcs_004[3823].other)[0]);
                self.txtZhanLi.text = "战力: " + Config.xtcs_004[4413].num;

                self.gridBigAward1.vo = ConfigHelp.makeItem(JSON.parse(Config.xtcs_004[3822].other)[0]);
                self.txtZhanLi1.text = "战力: " + Config.xtcs_004[4412].num;
            } else if (qishu == 5) {
                if (GGlobal.modelLXXF.smlGiftGotSt > 0) {
                    IconUtil.setImg(this.bigImg, Enum_Path.PIC_URL + Config.xtcs_004[3831].num + ".png");
                } else {
                    IconUtil.setImg(this.bigImg, Enum_Path.PIC_URL + Config.xtcs_004[3830].num + ".png");
                }

                self.gridBigAward.vo = ConfigHelp.makeItem(JSON.parse(Config.xtcs_004[3825].other)[0]);
                self.txtZhanLi.text = "战力: " + Config.xtcs_004[4415].num;

                self.gridBigAward1.vo = ConfigHelp.makeItem(JSON.parse(Config.xtcs_004[3824].other)[0]);
                self.txtZhanLi1.text = "战力: " + Config.xtcs_004[4414].num;
            }

        }
        if (this._eff == null) {
            this._eff = EffectMgr.addEff("uieff/10022", (self["n88"] as Button2).displayListContainer, self["n88"].width / 2, self["n88"].height / 2, 800, -1);
        }
        if (this._eff1 == null) {
            this._eff1 = EffectMgr.addEff("uieff/10022", (self["n98"] as Button2).displayListContainer, self["n98"].width / 2, self["n98"].height / 2, 800, -1);
        }
        // var childIndex = self.getChildIndex(self["n89"]);
        // ExtralFunc.addBigAdEff("ChildLXXF", (self["n88"] as Button2), "uieff/10022", this._childIndex - 1);
        // self.setChildIndex(self["n89"], 100);

        // childIndex = self.getChildIndex(self["n99"]);
        // ExtralFunc.addBigAdEff("ChildLXXF1", self["n98"], "uieff/10022", this._childIndex - 1);
        // self.setChildIndex(self["n99"], 100);
    }
    private _eff1
    private _eff
    private onSel(evt: fairygui.ItemEvent) {
        const item = evt.itemObject as ItemLXXF;
        this.setSel(item.data);
    }
    private _curDay: number = 0;
    private _curItem: ItemLXXF;
    private setSel(day: number) {
        const self = this;
        self._curDay = day;
        var item = self.getItem(day);
        if (item) {
            if (self._curItem) {
                self._curItem.setSelected(false);
            }
            (self._curItem = item).setSelected(true);
            self.showDetail();
        } else {
            self.invalid |= self.valid;
        }
        if (self.valid & self.invalid) {
            self.valid &= 0;
            self.invalid &= 0;
            if (TimeUitl.isIn7Days()) {
                GGlobal.reddot.setCondition(UIConst.LXXF1, 0, GGlobal.modelLXXF.checkNotice());
            } else {
                GGlobal.reddot.setCondition(UIConst.LXXF2, 0, GGlobal.modelLXXF.checkNotice());
            }
            GGlobal.reddot.notify(UIConst.CHAOZHIFL);
        }
    }
    private valid: number = 0;
    private invalid: number = 0;
    private getItem(day: number) {
        const self = this;
        for (let i = 0; i < self.list._children.length; i++) {
            const item: ItemLXXF = self.list._children[i] as ItemLXXF;
            if (item.data == day) {
                return item;
            }
        }
        return null;
    }
    private onUpdate() {
        const self = this;
        const day_seven = GGlobal.modelLXXF.DAY_SEVEN;
        self.list.numItems = day_seven;
        const day = Math.max(1, Math.min(GGlobal.modelLXXF.kaifuDay, day_seven));
        self.list.scrollToView(day - 1);
        self.setSel(self._curDay > 0 ? self._curDay : day);
        self.showBigAward();
    }
    private showDetail() {
        const self = this;
        const model = GGlobal.modelLXXF;
        const dayFined = model.dayFinished();
        if (GGlobal.modelLXXF.smlGiftGotSt > 0) {
            self.txtProgress.text = dayFined + "/" + model.DAY_SEVEN;

            if (dayFined >= model.DAY_SEVEN) {
                self.ctrl2.setSelectedIndex(0);
                if (model.bigGiftGotSt == 0) {
                    self.btnBigAward.visible = true;
                    self.iconBigGot.visible = false;
                    self.btnBigAward.checkNotice = dayFined >= model.DAY_SEVEN;
                } else {
                    self.btnBigAward.visible = false;
                    self.iconBigGot.visible = true;
                }
            } else {
                self.ctrl2.setSelectedIndex(1);
            }
        } else {
            self.txtProgress.text = dayFined + "/" + model.DAY_THREE;

            if (dayFined >= model.DAY_THREE) {
                self.ctrl2.setSelectedIndex(0);
                if (model.smlGiftGotSt == 0) {
                    self.btnBigAward.visible = true;
                    self.iconBigGot.visible = false;
                    self.btnBigAward.checkNotice = dayFined >= model.DAY_THREE;
                } else {
                    self.btnBigAward.visible = false;
                    self.iconBigGot.visible = true;
                }
            } else {
                self.ctrl2.setSelectedIndex(1);
            }
        }

        const qishu = GGlobal.modelLXXF.qishu;
        const data = model.datas[self._curDay];
        if (!data) {
            return;
        }
        const cfg = TimeUitl.isIn7Days() ? Config.lxxf1_737[self._curDay] : Config.lxxf2_737[self._curDay + (qishu - 1) * 7];
        if (!cfg) {
            return;
        }
        const enough = data.costYB - cfg.xiaohao >= 0;
        self.txtCost.text = HtmlUtil.fontNoSize(`消耗${cfg.xiaohao}元宝`, "#FFFFFF") + HtmlUtil.fontNoSize(`(${data.costYB}/${cfg.xiaohao})`, enough ? "#00FF00" : "#FF0000");
        if (self.grids) {
            ConfigHelp.cleanGridview(self.grids);
        }
        const numArr = JSON.parse(cfg.jiangli);
        const awards = ConfigHelp.makeItemListArr(numArr);
        self.grids = ConfigHelp.addGridview(awards, self, 36, 518, true, false, 10, 106);
        const state = self.getState();
        self.ctrl1.setSelectedIndex(state);//0领取 1前往  2已领取 3补领
        const kfDay = model.kaifuDay;
        self.btnGet.visible = kfDay >= self._curDay;
        switch (state) {
            case 0:
                if (data.costYB >= cfg.xiaohao && data.state == 0) {
                    self.btnGet.checkNotice = true;
                } else {
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
                const award = ConfigHelp.makeItemListArr(JSON.parse(cfg.buling))[0];
                // ImageLoader.instance.loader(Enum_Path.ICON70_URL + award.icon + ".png", self.iconBL);
                self.txtYBCost.text = award.count + "";
                const bool = !model.invalidNotMap[self._curDay] && kfDay > self._curDay && data.state == 0 && award.count <= Model_player.voMine.yuanbao;
                self.btnBuLing.checkNotice = bool;
                model.setBLNot(self._curDay, true);
                if (!bool && self.valid) {
                    self.invalid |= 1;
                }
                self.valid |= 1;
                break;
        }
        self.showLeftTm();
    }
    private getState() {
        const self = this;
        const info = GGlobal.modelLXXF.datas[self._curDay];
        const qishu = GGlobal.modelLXXF.qishu;
        const costYB = TimeUitl.isIn7Days() ? Config.lxxf1_737[self._curDay].xiaohao : Config.lxxf2_737[self._curDay + (qishu - 1) * 7].xiaohao;
        const kfDay = GGlobal.modelLXXF.kaifuDay;
        if (kfDay < self._curDay || (info.costYB >= costYB && info.state == 0)) {//开服天数不达到 或者 充值条件达到并且未领取
            return 0;
        } else if (kfDay >= self._curDay && info.costYB < costYB && info.state == 0) {
            if (kfDay == self._curDay) {
                return 1;
            } else {
                return 3;
            }
        } else if (info.state == 1) {
            return 2;
        }
        return 0;
    }
    private getActObj() {
        var arr = GGlobal.modelActivity.getGroup(UIConst.CHAOZHIFL);//Model_Activity.activityObj[UIConst.CHAOZHIFL];
        for (let i = 0; i < arr.length; i++) {
            const act = arr[i];
            if (act.id == UIConst.LXXF2) {
                return arr[i];
            }
        }
        return null;
    }
    private showLeftTm() {
        var leftDay = 8 - Model_GlobalMsg.kaifuDay;
        if (leftDay > 1) {
            this.addTimer(1000 * 60 * 60);
        } else {
            if (leftDay <= 0) {
                var ms = Model_GlobalMsg.getServerTime();
                const actObj = this.getActObj();
                if (!actObj) {
                    this.removeTimer();
                    return;
                }
                var timePassed = actObj.end * 1000 - ms;
                var day = timePassed / (1000 * 60 * 60 * 24);
                if (day > 1) {
                    this.addTimer(1000 * 60 * 60);
                } else {
                    this.addTimer();
                }
            } else {
                this.addTimer();
            }
        }
    }
    private addTimer(time: Readonly<number> = 1000) {
        Timer.instance.listen(this.onTimer, this, time, 0, true);
    }
    private removeTimer() {
        Timer.instance.remove(this.onTimer, this);
        this.txtLeftTm.text = "活动剩余时间: " + HtmlUtil.fontNoSize("00:00:00", "#00ff00");
    }
    public onTimer() {
        const self = this;
        var ms = Model_GlobalMsg.getServerTime();
        var day = 8 - Model_GlobalMsg.kaifuDay;
        var data = DateUtil.clearHourse(new Date(ms));
        if (day <= 0) {
            const actObj = self.getActObj();
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
            } else {
                var hour = (day - (day >> 0)) * 24 >> 0;
                self.txtLeftTm.text = "活动剩余时间: " + HtmlUtil.fontNoSize((day >> 0) + "天" + hour + "小时", "#00ff00");
            }
        } else {
            var h0 = data.getTime();
            var ax = 86400000 - (ms - h0);
            if (day <= 1) {
                self.txtLeftTm.text = "活动剩余时间: " + HtmlUtil.fontNoSize(DateUtil.getHMSBySecond((ax / 1000) >> 0), "#00ff00");
                if (ax < 0) {
                    self.removeTimer();
                }
            } else {
                var hour = ax / (1000 * 60 * 60) >> 0;
                self.txtLeftTm.text = "活动剩余时间: " + HtmlUtil.fontNoSize((day - 1) + "天" + hour + "小时", "#00ff00");
            }
        }
    }
    public open() {
        const self = this;
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
    }
    public close() {
        const self = this;
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
            this._eff = null
        }
        if (this._eff1) {
            EffectMgr.instance.removeEff(this._eff1);
            this._eff1 = null
        }
        self.list.numItems = 0;
    }
}