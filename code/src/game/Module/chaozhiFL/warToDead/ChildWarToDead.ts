class ChildWarToDead extends fairygui.GComponent implements ICZFLView {
    public static URL = "ui://qzsojhcrasooh";
    private static _inst: ChildWarToDead;
    public static getInst() {
        return this._inst || (this._inst = <any>fairygui.UIPackage.createObject("chaozhifanli", "ChildWarToDead"));
    }
    public bg: fairygui.GLoader;
    public list: fairygui.GList;
    public txtLayer: fairygui.GRichTextField;
    public gridBigAward: ViewGrid;
    public gridBigAward1: ViewGrid;
    public txtZhanLi: fairygui.GRichTextField;
    public txtZhanLi1: fairygui.GRichTextField;
    public txtHighestLayer: fairygui.GRichTextField;
    public txtHighestLayer1: fairygui.GRichTextField;
    public txtTJZhanLi: fairygui.GRichTextField;
    public btnHand: Button0;
    public txtLeftTm: fairygui.GRichTextField;
    public btnLeft: fairygui.GImage;
    public btnRight: fairygui.GImage;
    public iconTG: fairygui.GTextField;
    private awatar: UIRole;
    private grids = [];
    private readonly awaterPos = { x: 320, y: 388 };
    private readonly gridStartPos = { x: 175, y: 490 };

    protected constructFromXML(xml) {
        super.constructFromXML(xml);
        const self = this;
        CommonManager.parseChildren(self, self);
        self.list.addEventListener(fairygui.ItemEvent.CLICK, self.onSel, self);
        self.list.itemRenderer = self.onItemRender;
        self.list.callbackThisObj = self;
        self.list.setVirtual();
        self.btnHand.addClickListener(self.onHand, self);
        self.btnLeft.displayObject.touchEnabled = true;
        self.btnRight.displayObject.touchEnabled = true;
        self.gridBigAward.isShowEff = true;
        self.gridBigAward1.isShowEff = true;
        CommonManager.listPageChange("ChildWarToDead", self.list, self.btnLeft, self.btnRight, 5);
    }
    private onItemRender(index: number, render: ItemWarToDead) {
        var data = this.datas![index];
        render.data = data;
    }
    private onHand() {
        if (GGlobal.modelWarToDead.warHasEnd()) {
            return;
        }
        if (!this.selData) {
            return;
        }
        const qishu = GGlobal.modelWarToDead.qiShu;
        if (TimeUitl.isIn7Days()) {
            id = this.selData.id;
        } else if (ModelEightLock.originalDatas[UIConst.WARTODEAD1]) {
            var id = this.selData.id - (qishu - 1) * 1000;
        } else {
            id = this.selData.id - (qishu - 1) * 20
        }
        var highestLayer = GGlobal.modelWarToDead.highestLayer;

        if (id > highestLayer + 1) {
            ViewCommonWarn.text("需通关上一关卡");
        } else {
            if (ModelEightLock.originalDatas[UIConst.WARTODEAD1]) {
                GGlobal.modelWarToDead.CG4751();
            } else {
                GGlobal.modelWarToDead.challenge();
            }
        }
    }
    private selData: Ixzdd1_252 | Ixzdd2_252;
    private onSel(evt: fairygui.ItemEvent) {
        var item = evt.itemObject as ItemWarToDead;
        this.selData = item.data;
        this!.list.selectedIndex = this.datas!.indexOf(this.selData);
        this.showDetail();
    }
    private datas: any[];
    private onUpdate() {
        const model = GGlobal.modelWarToDead;
        const self = this;
        self.datas = model.getAllDatas();
        self.list.numItems = self.datas!.length;
        self.btnHand.checkNotice = model.checkNotice();
        self.setSel();
        self.showDetail();
    }
    private setSel() {
        const self = this;
        const model = GGlobal.modelWarToDead;
        var maxLayer: number = 0;
        for (let i = 0; i < self.datas!.length; i++) {
            var data = self.datas![i];
            if (data.id > maxLayer) {
                maxLayer = data.id;
            }
        }
        const qishu = GGlobal.modelWarToDead.qiShu;
        if (qishu >= 2) {
            maxLayer = maxLayer - (qishu - 1) * 1000;
        }
        var layer = model.highestLayer ? model.highestLayer : 0;//当前关卡
        layer = Math.min(layer + 1, maxLayer);//下一关
        if (layer < 1) layer = 1;
        self.selData = self.datas![layer - 1];
        self.list.scrollToView(self.list.selectedIndex = layer - 1);
    }
    private showDetail() {
        const self = this;
        const {selData} = self;
        const {modelWarToDead} = GGlobal;
        const qishu = modelWarToDead.qiShu;
        const lastLayer = self.datas![self.datas!.length - 1];
        if (!lastLayer) return;
        self.txtZhanLi.text = `战力+${lastLayer.power2}`;
        self.txtZhanLi1.text = `战力+${lastLayer.power1}`;
        var curGua = 0

        if (TimeUitl.isIn7Days()) {
            curGua = selData.id
            self.txtHighestLayer.text = `通关第${lastLayer.id}关`;
        } else if (ModelEightLock.originalDatas[UIConst.WARTODEAD1]) {
            curGua = selData.id - (qishu - 1) * 1000
            self.txtHighestLayer.text = `通关第${lastLayer.id - (qishu - 1) * 1000}关`;
        } else {
            curGua = selData.id - (qishu - 1) * 20
            self.txtHighestLayer.text = `通关第${lastLayer.id - (qishu - 1) * 20}关`;
        }
        self.txtLayer.text = `第${curGua}关`;
        self.txtHighestLayer1.text = `通关第10关`;

        ConfigHelp.cleanGridEff([self.gridBigAward]);
        self.gridBigAward.vo = ConfigHelp.makeItemListArr(JSON.parse(selData.reward2))[0];
        self.gridBigAward.tipEnabled = true;
        ConfigHelp.cleanGridEff([self.gridBigAward1]);
        self.gridBigAward1.vo = ConfigHelp.makeItemListArr(JSON.parse(selData.reward1))[0];
        self.gridBigAward1.tipEnabled = true;
        const childIndex = self.getChildIndex(self["n56"]);
        ExtralFunc.addBigAdEff("ChildWarToDead", self["n40"], "uieff/10022", childIndex - 1);
        ExtralFunc.addBigAdEff("ChildWarToDead1", self["n63"], "uieff/10022", childIndex - 1);
        self.txtTJZhanLi.text = HtmlUtil.fontNoSize(`推荐战力 `, "#00FF00") + HtmlUtil.fontNoSize(`${selData.power}`, "#ff9900");
        var awars = ConfigHelp.makeItemListArr(JSON.parse(selData.reward));
        if (self.grids) {
            ConfigHelp.cleanGridview(self.grids);
        }
        self.grids = ConfigHelp.addGridview(awars, self, self.gridStartPos.x, self.gridStartPos.y, true, false, 5, 110, 0.8);
        if (modelWarToDead.highestLayer >= curGua) {
            self.iconTG.visible = true;
            self.btnHand.visible = false;
        } else {
            self.iconTG.visible = false;
            self.btnHand.visible = true;
        }
        self.updateAwater();
        self.showLeftTm();
    }
    private showLeftTm() {
        let self = this;
        var leftDay = 8 - Model_GlobalMsg.kaifuDay;
        if (leftDay > 1) {
            this.addTimer(1000 * 60 * 60);
        } else {
            if (leftDay <= 0) {
                var ms = Model_GlobalMsg.getServerTime();
                let actObj: any = ModelEightLock.originalDatas[UIConst.WARTODEAD1];
                if (!actObj) {
                    actObj = self.getActObj();
                }
                if (!actObj) {
                    self.removeTimer();
                    return;
                }
                var timePassed = actObj.end * 1000 - ms;
                var day = timePassed / (1000 * 60 * 60 * 24);
                if (day > 1) {
                    self.addTimer(1000 * 60 * 60);
                } else {
                    self.addTimer();
                }
            } else {
                self.addTimer();
            }
        }
    }
    private addTimer(time: Readonly<number> = 1000) {
        Timer.instance.listen(this.onTimer, this, time, 0, true);
    }
    private removeTimer() {
        Timer.instance.remove(this.onTimer, this);
        this.txtLeftTm.text = "00:00:00";
    }
    public onTimer() {
        const self = this;
        var ms = Model_GlobalMsg.getServerTime();
        var day = 8 - Model_GlobalMsg.kaifuDay;
        var data = DateUtil.clearHourse(new Date(ms));
        if (day <= 0) {
            let actObj: any = ModelEightLock.originalDatas[UIConst.WARTODEAD1];
            if (!actObj) {
                actObj = self.getActObj();
            }
            if (!actObj) {
                self.removeTimer();
                return;
            }
            var timePassed = actObj.end * 1000 - ms;
            var day = timePassed / (1000 * 60 * 60 * 24);
            if (day <= 1) {
                self.txtLeftTm.text = DateUtil.getHMSBySecond(timePassed / 1000 >> 0);
                if (timePassed < 0) {
                    self.removeTimer();
                }
            } else {
                var hour = (day - (day >> 0)) * 24 >> 0;
                self.txtLeftTm.text = (day >> 0) + "天" + hour + "小时";
            }
        } else {
            var h0 = data.getTime();
            var ax = 86400000 - (ms - h0);
            if (day <= 1) {
                self.txtLeftTm.text = DateUtil.getHMSBySecond((ax / 1000) >> 0);
                if (ax < 0) {
                    self.removeTimer();
                }
            } else {
                var hour = ax / (1000 * 60 * 60) >> 0;
                self.txtLeftTm.text = (day - 1) + "天" + hour + "小时";
            }
        }
    }
    private getActObj() {
        var arr = GGlobal.modelActivity.getGroup(UIConst.CHAOZHIFL);//Model_Activity.activityObj[UIConst.CHAOZHIFL];
        for (let i = 0; i < arr.length; i++) {
            const act = arr[i];
            if (act.id == UIConst.WARTODEAD_7OUT || act.id == UIConst.WARTODEAD_7IN) {
                return arr[i];
            }
        }
        return null;
    }
    private updateAwater() {
        const self = this;
        if (!self.awatar) {
            self.awatar = UIRole.create();
            self.awatar.uiparent = self._container;
            self.awatar.setPos(self.awaterPos.x, self.awaterPos.y);
            self.awatar.setScaleXY(1.2, 1.2);
        }
        let lb = Config.NPC_200[self.selData.boss];
        self.awatar.setBody(lb.mod);
        if (lb.weapon) {
            self.awatar.setWeapon(lb.mod);
        } else {
            self.awatar.setWeapon(null);
        }
        self.awatar.onAdd();
    }
    public open(): void {
        const self = this;
        GGlobal.modelWarToDead.listen(ModelWarToDead.msg_datas, self.onUpdate, self);
        if (ModelEightLock.originalDatas[UIConst.WARTODEAD1]) {
            GGlobal.modelEightLock.CG4571(UIConst.WARTODEAD1)
        } else {
            GGlobal.modelWarToDead.openUI();
        }
        IconUtil.setImg(self.bg, Enum_Path.BACK_URL + "cjfl.jpg");
    }
    public close() {
        const self = this;
        if (self.awatar) {
            self.awatar.onRemove();
            self.awatar = null;
        }
        self.selData = null;
        self.list.scrollToView(0);
        self.removeTimer();
        GGlobal.modelWarToDead.remove(ModelWarToDead.msg_datas, self.onUpdate, self);
        ConfigHelp.cleanGridview(self.grids);
        IconUtil.setImg(self.bg, null);
        ExtralFunc.addBigAdEff("ChildWarToDead", self["n40"], null);
        ExtralFunc.addBigAdEff("ChildWarToDead1", self["n63"], null);
        if (self.gridBigAward) {
            ConfigHelp.cleanGridEff([self.gridBigAward]);
        }
        if (self.gridBigAward1) {
            ConfigHelp.cleanGridEff([self.gridBigAward1]);
        }
        self.list.numItems = 0;
    }
}