/**连续消费 */
class ChildLXX814 extends fairygui.GComponent implements ICZFLView {
    public static URL = "ui://qzsojhcrtt6c14";
    private static _inst: ChildLXXF;
    public static getInst() {
        fairygui.UIObjectFactory.setPackageItemExtension(ChildLXX814.URL, ChildLXX814);
        fairygui.UIObjectFactory.setPackageItemExtension(ItemLXX814.URL, ItemLXX814);
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
        const day_seven = ModelLXX814.DAY_SEVEN;
        let day = GGlobal.modelLXX814.datas[self._curDay - 1].day;
        switch (tar) {
            case self.btnGet:
                GGlobal.modelLXX814.applayAwards(day);
                break;
            case self.btnForward:
                GGlobal.layerMgr.open(UIConst.CANGBAOGE);
                break;
            case self.btnBuLing:
                const cfg = Config.lxxf3_737[day];
                const award = ConfigHelp.makeItemListArr(JSON.parse(cfg.buling))[0];
                const content = `是否花费` + HtmlUtil.fontNoSize(`${award.count}元宝`, "#00ffff") + `补领【第${self._curDay}天】奖励?\n` +
                    `(活动总进度+1)`;
                ViewAlert.show(content, Handler.create(self, () => {
                    GGlobal.modelLXX814.applayAwards(day);
                }), 3);
                break;
            case self.btnBigAward:
                GGlobal.modelLXX814.applyBigAwards();
                break;
        }
    }
    /**展示大奖 */
    private showBigAward() {
        const self = this;
        if (self.gridBigAward) {
            self.gridBigAward.vo = null;
        }
        let actLib = ModelEightLock.originalDatas[UIConst.LXXF3];
        if (!actLib) {
            DEBUGWARING.log("连续消费814已经结束");
            GGlobal.layerMgr.close(UIConst.CHAOZHIFL);
            return;
        }
        let qs = actLib.qishu;
        let smlcfg = Config.lxxfreward3_737[qs * 1000 + 3]
        let bigcfg = Config.lxxfreward3_737[qs * 1000 + 7]
        if (bigcfg == null || smlcfg == null) {
            return;
        }

        if (GGlobal.modelLXX814.smlGiftGotSt > 0) {
            IconUtil.setImg(this.bigImg, Enum_Path.PIC_URL + bigcfg.pic + ".png");
        } else {
            IconUtil.setImg(this.bigImg, Enum_Path.PIC_URL + smlcfg.pic + ".png");
        }
        self.gridBigAward.vo = ConfigHelp.makeItem(JSON.parse(bigcfg.reward)[0]);
        self.txtZhanLi.text = "战力: " + bigcfg.power;

        self.gridBigAward1.vo = ConfigHelp.makeItem(JSON.parse(smlcfg.reward)[0]);
        self.txtZhanLi1.text = "战力: " + smlcfg.power;

        if (this._eff == null) {
            this._eff = EffectMgr.addEff("uieff/10022", (self["n88"] as Button2).displayListContainer, self["n88"].width / 2, self["n88"].height / 2, 800, -1);
        }
        if (this._eff1 == null) {
            this._eff1 = EffectMgr.addEff("uieff/10022", (self["n98"] as Button2).displayListContainer, self["n98"].width / 2, self["n98"].height / 2, 800, -1);
        }
    }
    private _eff1
    private _eff
    private onSel(evt: fairygui.ItemEvent) {
        const item = evt.itemObject as ItemLXX814;
        this.setSel(item.data);
    }
    private _curDay: number = 0;
    private _curItem: ItemLXX814;
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
            GGlobal.reddot.setCondition(UIConst.LXXF3, 0, GGlobal.modelLXX814.checkNotice());
            GGlobal.reddot.notify(UIConst.CHAOZHIFL);
        }
    }
    private valid: number = 0;
    private invalid: number = 0;
    private getItem(day: number) {
        const self = this;
        for (let i = 0; i < self.list._children.length; i++) {
            const item: ItemLXX814 = self.list._children[i] as ItemLXX814;
            if (item.data == day) {
                return item;
            }
        }
        return null;
    }
    private onUpdate() {
        const self = this;
        const day_seven = ModelLXX814.DAY_SEVEN;
        var day = GGlobal.modelLXX814.day;
        if (day > 0) {
            self.list.numItems = day_seven;
            if (day > day_seven) day = day_seven;
            self.list.scrollToView(day - 1);
            self.setSel(self._curDay > 0 ? self._curDay : day);
            self.showBigAward();
        }

    }
    private showDetail() {
        const self = this;
        const model = GGlobal.modelLXX814;
        const dayFined = model.dayFinished();
        if (GGlobal.modelLXX814.smlGiftGotSt > 0) {
            self.txtProgress.text = dayFined + "/" + ModelLXX814.DAY_SEVEN;

            if (dayFined >= ModelLXX814.DAY_SEVEN) {
                self.ctrl2.setSelectedIndex(0);
                if (model.bigGiftGotSt == 0) {
                    self.btnBigAward.visible = true;
                    self.iconBigGot.visible = false;
                    self.btnBigAward.checkNotice = dayFined >= ModelLXX814.DAY_SEVEN;
                } else {
                    self.btnBigAward.visible = false;
                    self.iconBigGot.visible = true;
                }
            } else {
                self.ctrl2.setSelectedIndex(1);
            }
        } else {
            self.txtProgress.text = dayFined + "/" + ModelLXX814.DAY_THREE;

            if (dayFined >= ModelLXX814.DAY_THREE) {
                self.ctrl2.setSelectedIndex(0);
                if (model.smlGiftGotSt == 0) {
                    self.btnBigAward.visible = true;
                    self.iconBigGot.visible = false;
                    self.btnBigAward.checkNotice = dayFined >= ModelLXX814.DAY_THREE;
                } else {
                    self.btnBigAward.visible = false;
                    self.iconBigGot.visible = true;
                }
            } else {
                self.ctrl2.setSelectedIndex(1);
            }
        }
        const data = model.datas[self._curDay - 1];
        if (!data) {
            return;
        }
        const cfg = Config.lxxf3_737[data.day];
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
        self.btnGet.visible = model.day >= self._curDay;
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
                self.txtYBCost.text = award.count + "";
                const bool = !model.invalidNotMap[self._curDay - 1] && data.state == 0 && award.count <= Model_player.voMine.yuanbao;
                self.btnBuLing.checkNotice = bool;
                model.setBLNot(self._curDay - 1, true);
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
        const info = GGlobal.modelLXX814.datas[self._curDay - 1];
        const costYB = Config.lxxf3_737[info.day].xiaohao;
        if ((info.costYB >= costYB && info.state == 0)) {//开服天数不达到 或者 充值条件达到并且未领取
            return 0;
        } else if (self._curDay == GGlobal.modelLXX814.day && info.costYB < costYB && info.state == 0) {
            return 1;
        } else if (info.state == 1) {
            return 2;
        } else if (info.state == 2) {
            return 3;
        }
        return 0;
    }
    private showLeftTm() {
        this.addTimer(1000 * 60 * 60);
    }
    private _act: Vo_Activity
    private addTimer(time: Readonly<number> = 1000) {
        this._act = ModelEightLock.getActVo(UIConst.LXXF3);
        Timer.instance.listen(this.onTimer, this, time, 0, true);
    }
    private removeTimer() {
        Timer.instance.remove(this.onTimer, this);
        this.txtLeftTm.text = "活动剩余时间: " + HtmlUtil.fontNoSize("00:00:00", "#00ff00");
    }
    public onTimer() {
        if (this._act) {
            var d = this._act.end - Math.floor(Model_GlobalMsg.getServerTime() / 1000);
            if (d < 0) {
                this.txtLeftTm.text = "活动剩余时间：已结束"
            } else {
                this.txtLeftTm.text = "活动剩余时间：" + HtmlUtil.fontNoSize(DateUtil.getMSBySecond4(d), "#00ff00");
            }
        }
        else {
            this.txtLeftTm.text = "活动剩余时间："
        }
    }
    public open() {
        const self = this;
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
    }
    public close() {
        const self = this;
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
            this._eff = null
        }
        if (this._eff1) {
            EffectMgr.instance.removeEff(this._eff1);
            this._eff1 = null
        }
        self.list.numItems = 0;
    }
}