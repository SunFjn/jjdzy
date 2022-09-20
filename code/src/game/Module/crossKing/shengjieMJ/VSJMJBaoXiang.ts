class VSJMJBaoXiang extends UIModalPanel {
    public static URL = "ui://yqpfulefrydj45";
    private txtTitle: fairygui.GTextField;
    private btnCancal: Button0;
    private btnHand: Button1;
    private iconCost: fairygui.GLoader;
    private txtCost: fairygui.GTextField;
    private c1: fairygui.Controller;

    private imgZhe: fairygui.GImage;
    private lbZhe: fairygui.GTextField;
    private backImg: fairygui.GLoader;

    public constructor() {
        super();
        this.loadRes("crossKing", "crossKing_atlas0");
    }
    private grids = [];
    protected childrenCreated(): void {
        const self = this;
        GGlobal.createPack("crossKing");
        this.view = fairygui.UIPackage.createObject("crossKing", "VSJMJBaoXiang").asCom;
        this.contentPane = self.view;
        CommonManager.parseChildren(self.view, self);
        self.btnCancal.addClickListener(self.onHand, self);
        self.btnHand.addClickListener(self.onHand, self);
        super.childrenCreated();
    }
    private onHand(evt) {
        const tar = evt.currentTarget;
        switch (tar) {
            case this.btnCancal:
                GGlobal.layerMgr.close(UIConst.SJMJ_BX);
                break;
            case this.btnHand:
                GGlobal.modelSJMJ.CG3789(this._args);
                break;
        }
    }
    protected onShown() {
        super.onShown();
        IconUtil.setImg(this.backImg, Enum_Path.BACK_URL + "sjmjBX.png")
        GGlobal.modelSJMJ.listen(ModelShengJieMJ.msg_datas_sjmj, this.onUpdate, this);
        this.onUpdate();
    }
    protected onHide(): void {
        IconUtil.setImg(this.backImg, null)
        IconUtil.setImg(this.iconCost, null);
        GGlobal.layerMgr.close(UIConst.SJMJ_BX);
        GGlobal.modelSJMJ.remove(ModelShengJieMJ.msg_datas_sjmj, this.onUpdate, this);
    }
    private onUpdate() {
        const cfg = Config.sjmjfb_258[this._args];
        this.txtTitle.text = `首通${HtmlUtil.fontNoSize(cfg.name, "#FF9900")}可开启`;
        if (GGlobal.modelSJMJ.idBoughts[this._args]) {
            this.c1.setSelectedIndex(1);
        } else {
            this.c1.setSelectedIndex(0);
        }
        const rewards = ConfigHelp.makeItemListArr(JSON.parse(cfg.reward4));
        const wid = 102 * rewards.length + (rewards.length - 1) * 18;
        const beginX = 593 - wid >> 1;
        if (this.grids) {
            ConfigHelp.cleanGridview(this.grids);
        }
        this.grids = ConfigHelp.addGridview(rewards, this, beginX, 123, true, false, 5, 120);
        const cost: IGridImpl = ConfigHelp.makeItemListArr(JSON.parse(cfg.money))[0];
        IconUtil.setImg(this.iconCost, Enum_Path.ICON70_URL + cost.icon + ".png");
        this.txtCost.text = "" + cost.count;
        this.btnHand.checkNotice = true;

        if (Number(cfg.zhekou) > 0) {
            this.imgZhe.visible = true;
            this.lbZhe.text = cfg.zhekou + "折";
        } else {
            this.imgZhe.visible = false;
            this.lbZhe.text = "";
        }
    }
    public resetPosition(): void {
        this.setXY((fairygui.GRoot.inst.width - this.width) / 2, (fairygui.GRoot.inst.height - this.height) / 2);
    }
}