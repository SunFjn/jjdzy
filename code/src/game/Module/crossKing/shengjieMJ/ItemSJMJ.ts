class ItemSJMJ extends fairygui.GComponent {
    public static URL = "ui://yqpfulefgenj3x";
    public bgLD: fairygui.GLoader;
    public taiziImg: fairygui.GLoader;
    private txtTitle: fairygui.GTextField;
    private txtName: fairygui.GTextField;
    private txtSDCount: fairygui.GTextField;
    private btnHand: Button1;
    private txtOpenLv: fairygui.GTextField;
    private c1: fairygui.Controller;
    private iconPassed: fairygui.GImage;
    private uirole: UIRole;
    private gridContainer: fairygui.GComponent;
    public container: EmptyComp;
    public imgDoub: fairygui.GImage;

    public constructFromXML(xml: any) {
        super.constructFromXML(xml);
        const self = this;
        CommonManager.parseChildren(self, self);
        self.iconPassed = self["n5"];
        self.btnHand.addClickListener(self.onHand, self);
        self.displayObject.addEventListener(egret.Event.REMOVED_FROM_STAGE, self.dispose, self);
    }
    private onHand() {
        const fbCfg = this.getFBCfg();//副本表信息
        GGlobal.layerMgr.open(UIConst.SJMJ2, fbCfg.id);
    }
    private grids = [];
    private _data: Isjmj_258;
    public set data(value: Isjmj_258) {
        const self = this;
        self._data = value;
        const fbCfg = self.getFBCfg();//副本表信息
        const monsterCfg = Config.NPC_200[fbCfg.boss];
        self.container.setUIRole(monsterCfg.mod);
        self.txtName.text = monsterCfg.name;
        self.txtTitle.text = fbCfg.name;
        if (self.grids) {
            ConfigHelp.cleanGridview(self.grids);
        }
        const awars = ConfigHelp.makeItemListArr(JSON.parse(fbCfg.kf));
        awars.length > 3 && (awars.length = 3);
        self.grids = ConfigHelp.addGridview(awars, self.gridContainer, 0, 0, true, false, 5, 87, 0.8);
        // const sdCnt: number = GGlobal.modelSJMJ.fubenInfo[fbCfg.id] != null ? GGlobal.modelSJMJ.fubenInfo[fbCfg.id] : 1;
        const sdCnt: number = GGlobal.modelSJMJ.sdCntDic[value.id];
        self.txtSDCount.text = "挑战次数: " + (sdCnt <= 0 ? HtmlUtil.fontNoSize(sdCnt + "", "#ff0000") : HtmlUtil.fontNoSize(sdCnt + "", "#00ff00"));
        self["n13"].visible = self["txtSDCount"].visible = sdCnt > 0;
        const openLv = value.lv;
        if (Model_LunHui.realLv < openLv) {
            self.c1.setSelectedIndex(1);
            self.txtOpenLv.text = `${openLv}级开启`;
            self["n17"].visible = true;
            self["n20"].visible = true;
        } else {
            self.c1.setSelectedIndex(0);
            self.txtOpenLv.text = "";
            self["n17"].visible = false;
            self["n20"].visible = false;
        }
        self.iconPassed.visible = false;
        self.btnHand.checkNotice = GGlobal.modelSJMJ.noticeSingle(value.id) || GGlobal.modelSJMJ.checkTabRed(value.id);
        IconUtil.setImg(self.taiziImg, Enum_Path.BACK_URL + "taizi.png");

        let act = GGlobal.modelActivity.getActivityByID(UIConst.ACTCOM_DOUBLE);
        this.imgDoub.visible = (act != null)
    }
    public get data() {
        return this._data;
    }
    public dispose() {
        const self = this;
        self.container.setUIRole(null);
          IconUtil.setImg(this.taiziImg, null);
          ConfigHelp.cleanGridEff(this.grids);
    }
    public setBg(index: number) {
        const bgIndex = index % 3 >> 0;
        IconUtil.setImg(this.bgLD, `${Enum_Path.BACK_URL}sjmj_${bgIndex}.png`);
    }
    private getFBCfg() {
        const {_data} = this;
        const {fubenInfo} = GGlobal.modelSJMJ;
        const idAsKey = _data.id;
        for (let key in fubenInfo) {
            const compareId = Number(key) / 1000 >> 0;
            if (compareId == idAsKey) {
                return Config.sjmjfb_258[key];
            }
        }
        return Config.sjmjfb_258[_data.id * 1000 + 1];
    }
}