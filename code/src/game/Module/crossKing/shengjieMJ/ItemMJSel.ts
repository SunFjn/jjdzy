class ItemMJSel extends fairygui.GComponent {
    public static URL = "ui://yqpfulefudgz42";
    private txtTitle: fairygui.GTextField;
    private txtOpenLv: fairygui.GTextField;
    // private iconST: fairygui.GImage;
    private grid1: ViewGrid;
    private grid2: ViewGrid;
    private noticeImg: fairygui.GImage;
    private iconBX: fairygui.GImage;
    private c1: fairygui.Controller;
    private iconSel: fairygui.GLoader;
    private taiziImg: fairygui.GLoader;
    private iconKQ: fairygui.GImage;
    private uirole: UIRole;

    private imgZhe: fairygui.GImage;
    private lbZhe: fairygui.GTextField;
    public imgDoub: fairygui.GImage;

    protected constructFromXML(xml: any) {
        super.constructFromXML(xml);
        const self = this;
        CommonManager.parseChildren(self, self);
        self.iconBX.displayObject.touchEnabled = true;
        self.iconBX.addClickListener(self.onHand, self);
        self.iconSel.visible = self.iconSel.touchable = false;
        self.grid1.isShowEff = true;
        self.grid2.isShowEff = true;
        self.displayObject.addEventListener(egret.Event.REMOVED_FROM_STAGE, self.onRemove, self);
    }
    private onHand(evt: egret.Event) {
        GGlobal.layerMgr.open(UIConst.SJMJ_BX, this.data.id);
        evt.stopImmediatePropagation();
    }
    private _data: Isjmjfb_258;
    public state: number;//0-等级不够 1-需要通关上一层 -1其他
    public set data(value: Isjmjfb_258) {
        const self = this;
        self._data = value;
        self.txtTitle.text = value.name;
        const target = self.getTGInfo();
        const level = Model_LunHui.realLv;
        self.state = -1;
        if (target == null || value.id > target.id) {
            self.c1.setSelectedIndex(0);
            if (!GGlobal.modelSJMJ.isLvlFit(value.id)) {
                self.txtOpenLv.color = 0xFF0000;
                self.txtOpenLv.text = `${ModelShengJieMJ.idToName[value.id / 1000 >> 0]}${value.open / 10 >> 0}阶开启`;
                self.state = 0;
            } else {
                if ((target == null && (value.id % 1000 >> 0) == 1) || (target && value.id == target.id + 1)) {
                    self.txtOpenLv.color = 0xffff00;
                    self.txtOpenLv.text = "首通奖励";
                    self.state = 2;
                } else {
                    self.txtOpenLv.color = 0xFF0000;
                    self.txtOpenLv.text = "需通上一关";
                    self.state = 1;
                }
                // if (self.preHasPass() || (!target.hasPassed && value.id == target.cfgFB.id)) {
                //     self.txtOpenLv.color = 0xFFFF00;
                //     self.txtOpenLv.text = "首通奖励";
                //     self.state = 2;
                // } else {
                //     self.txtOpenLv.color = 0xFF0000;
                //     self.txtOpenLv.text = "需通上一关";
                //     self.state = 1;
                // }
            }
            let rewardArr = ConfigHelp.makeItemListArr(JSON.parse(value.reward2));
            self.grid1.vo = rewardArr[0];
            self.grid2.vo = rewardArr[1];
            self.grid1.tipEnabled = true;
            self.grid2.tipEnabled = true;

            this.imgZhe.visible = false;
            this.lbZhe.text = "";
        } else {
            self.c1.setSelectedIndex(1);
            const info = GGlobal.modelSJMJ.idBoughts;
            var bool = self.noticeImg.visible = !info[value.id];
            self.iconKQ.visible = !bool;

            if (Number(value.zhekou) > 0) {
                this.imgZhe.visible = true;
                this.lbZhe.text = value.zhekou + "折";
            } else {
                this.imgZhe.visible = false;
                this.lbZhe.text = "";
            }
        }
        const childIndex = self.getChildIndex(self.taiziImg);
        if (!self.uirole) {
            self.uirole = UIRole.create();
            self.uirole.uiparent = self._container;
        }
        const monsterCfg = Config.NPC_200[value.boss];
        self.uirole.setBody(monsterCfg.mod);
        self.uirole.setWeapon(monsterCfg.mod);
        self.uirole.onAdd();
        self.uirole.setPos(97, 192);
        self._container.addChildAt(self.uirole.view, childIndex + 1);
        IconUtil.setImg(self.iconSel, Enum_Path.BACK_URL + "seletedbg.png");
        IconUtil.setImg(self.taiziImg, Enum_Path.BACK_URL + "taizi.png");


        let act = GGlobal.modelActivity.getActivityByID(UIConst.ACTCOM_DOUBLE);
        this.imgDoub.visible = (act != null)
    }
    public get data() {
        return this._data;
    }
    // private preHasPass() {
    //     const target = GGlobal.modelSJMJ.getData(this.data.id);
    //     if (target.hasPassed && this.data.id == target.cfgFB.id + 1) {
    //         return true;
    //     }
    //     return false;
    // }
    private _selected: boolean;
    public set selected(value: boolean) {
        this._selected = value;
        this.iconSel.visible = value;
    }
    public get selected() {
        return this._selected;
    }
    private onRemove() {
        if (this.uirole) {
            this.uirole.onRemove();
        }
        this.uirole = null;
        this.iconSel.visible = false;
        IconUtil.setImg(this.taiziImg, null);
        IconUtil.setImg(this.iconSel, null);
    }
    private getTGInfo() {
        const _data = this._data;
        const {fubenInfo} = GGlobal.modelSJMJ;
        const idAsKey = _data.id / 1000 >> 0;
        for (let key in fubenInfo) {
            const compareId = Number(key) / 1000 >> 0;
            if (compareId == idAsKey) {
                return Config.sjmjfb_258[key];
            }
        }
        return null;
    }
}