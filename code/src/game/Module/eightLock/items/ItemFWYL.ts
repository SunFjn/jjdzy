class ItemFWYL extends fairygui.GComponent {
    public static URL = "ui://hincjqblsaktf";
    public btnQW: Button0;
    public bgImg: fairygui.GLoader;
    protected constructFromXML(xml) {
        super.constructFromXML(xml);
        CommonManager.parseChildren(this, this);
        this.btnQW.addClickListener(this.onHand, this);
    }
    private onHand(evt) {
        const sysID: number = this._data.open;
        if (sysID && ModuleManager.isOpen(sysID, true)) {
            evt.stopImmediatePropagation();
            GGlobal.layerMgr.open(sysID);
        }
    }
    private grids = [];
    private _data: Ifwreward_265;
    public setData(value: Ifwreward_265) {
        this._data = value;
        if (this.grids.length > 0) {
            ConfigHelp.cleanGridview(this.grids);
        }
        const rewards = ConfigHelp.makeItemListArr(JSON.parse(value.reward));
        this.grids = ConfigHelp.addGridview(rewards, this, 199, 48, true, false, 3, 90, 0.8);
        IconUtil.setImg(this.bgImg, "resource/image/sanGuoQD/" + value.sys + ".png");
    }
    public getData() {
        return this._data;
    }
    public clean() {
        IconUtil.setImg(this.bgImg, null);
        ConfigHelp.cleanGridEff(this.grids);
    }
}