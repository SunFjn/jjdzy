class ItemFWCol extends fairygui.GComponent {
    public static URL = "ui://hincjqblvib6b";
    public txtName: fairygui.GTextField;
    public txtInfo: fairygui.GTextField;
    public btnQW: Button0;
    public btnGet: Button1;
    public iconGot: fairygui.GImage;
    public n11: fairygui.GList;
    protected constructFromXML(xml) {
        super.constructFromXML(xml);
        CommonManager.parseChildren(this, this);
        this.btnQW.addClickListener(this.onHand, this);
        this.btnGet.addClickListener(this.onHand, this);
        this.n11.callbackThisObj = this;
        this.n11.itemRenderer = this.listReder;
        this.n11.setVirtual();
    }
    private _awards = [];
    private listReder(idx, obj) {
        let item: ViewGrid = obj as ViewGrid;
        item.isShowEff = true;
        item.tipEnabled = true;
        item.vo = this._awards[idx];
    }
    private onHand(evt: egret.TouchEvent) {
        const tar = evt.currentTarget;
        switch (tar) {
            case this.btnQW:
                evt.stopImmediatePropagation();
                GGlobal.layerMgr.open(UIConst.BAZHENTU);
                break;
            case this.btnGet:
                GGlobal.modelEightLock.CG4591(this._data.id);
                break;
        }
    }
    private _data: Ifwsj_263;
    public setData(value: Ifwsj_263) {
        this._data = value;
        this.txtName.text = value.name;
        const finNum = this.getFinNum();
        this.txtInfo.text = HtmlUtil.fontNoSize(`(${finNum}/${value.num})`, finNum >= value.num ? "#00ff00" : "#ff0000");
        this._awards = ConfigHelp.makeItemListArr(JSON.parse(value.reward));
        this.n11.numItems = this._awards.length;
        const state = GGlobal.modelEightLock.fuwenColDic[value.id];
        switch (state) {
            case 0:
            default://未达标
                this.btnQW.visible = true;
                this.btnGet.visible = false;
                this.iconGot.visible = false;
                break;
            case 1://可领取
                this.btnQW.visible = false;
                this.btnGet.visible = this.btnGet.checkNotice = true;
                this.iconGot.visible = false;
                break;
            case 2://已领取
                this.btnQW.visible = false;
                this.btnGet.visible = false;
                this.iconGot.visible = true;
                break;
        }
    }
    public getData() {
        return this._data;
    }
    private getFinNum() {
        const pinzhi = this._data.pz;
        return ModelEightLock.pinZhiDic[pinzhi] == null ? 0 : ModelEightLock.pinZhiDic[pinzhi];
    }
    public clean() {
        this.n11.numItems = 0;
        // ConfigHelp.cleanGridEff(this.grids);
    }
}