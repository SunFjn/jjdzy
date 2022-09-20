class ItemFWJD extends fairygui.GComponent {
    public static URL = "ui://hincjqblsaktd";
    public txtName: fairygui.GTextField;
    public txtInfo: fairygui.GTextField;
    public btnQW: Button0;
    public btnGet: Button1;
    public iconGot: fairygui.GImage;
    public n11:fairygui.GList;
    protected constructFromXML(xml) {
        super.constructFromXML(xml);
        CommonManager.parseChildren(this, this);
        this.btnQW.addClickListener(this.onHand, this);
        this.btnGet.addClickListener(this.onHand, this);
        this.n11.callbackThisObj = this;
        this.n11.itemRenderer = this.listReder;
        this.n11.setVirtual();
    }

    private _awards=[];
    private listReder(idx,obj){
        let item:ViewGrid = obj as ViewGrid;
        item.isShowEff = true;
        item.tipEnabled = true;
        item.vo = this._awards[idx];
    }

    private onHand(evt: egret.TouchEvent) {
        const tar = evt.currentTarget;
        switch (tar) {
            case this.btnQW:
                evt.stopImmediatePropagation();
                GGlobal.layerMgr.open(UIConst.BAZHENTU_JIANDING);
                break;
            case this.btnGet:
                GGlobal.modelEightLock.CG4611(this._data.id);
                break;
        }
    }
    private _data: Ifwjd_264;
    public setData(value: Ifwjd_264) {
        this._data = value;
        this.txtName.text = `完美鉴定${value.time}次`;
        const cnt = ModelEightLock.hasJianDing;
        this.txtInfo.text = HtmlUtil.fontNoSize(`(${cnt}/${value.time})`, cnt >= value.time ? "#00ff00" : "#ff0000");
       this._awards = ConfigHelp.makeItemListArr(JSON.parse(value.reward));
       this.n11.numItems = this._awards.length;
        switch (GGlobal.modelEightLock.getFWDJState(value)) {
            case 0://未达条件
            default:
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
                this.btnQW.visible = this.btnGet.visible = false;
                this.iconGot.visible = true;
                break;
        }
    }
    public getData() {
        return this._data;
    }
    public clean() {
         this.n11.numItems = 0;
        // ConfigHelp.cleanGridEff(this.grids);
    }
}