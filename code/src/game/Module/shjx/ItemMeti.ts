class ItemMeti extends fairygui.GComponent {
    public static URL = "ui://4aepcdbwrjpy25";
    public grid: ViewGrid;
    public txtName: fairygui.GTextField;
    public txtDes: fairygui.GTextField;
    public btnHand: Button1;
    protected constructFromXML(xml) {
        super.constructFromXML(xml);
        CommonManager.parseChildren(this, this);
        this.grid.tipEnabled = true;
        this.btnHand.checkNotice = true;
        this.btnHand.addClickListener(this.onHand, this);
    }
    private onHand() {
        const view: VSHJXPeiyang = GGlobal.layerMgr.getView(UIConst.SHJXXILIAN);
        if (view) {
            view.switchMeti(this.grid.vo as VoItem);
        }
        GGlobal.layerMgr.close(UIConst.SHJXXCAILIAO);
    }
    private _data: number;
    public setData(value: number) {
        this._data = value;
        this.grid.vo = VoItem.create(value);
        this.grid.showEff(true);
        this.grid.showText = Model_Bag.getItemCount(this.grid.vo.id) + "";
        this.txtName.text = this.grid.vo.name;
        this.txtName.color = this.grid.vo.qColor;
        this.txtDes.text = Config.daoju_204[this.grid.vo.id].miaoshu;
    }
    public getData() {
        return this._data;
    }
    public clean() {
        ConfigHelp.cleanGridEff(this.grid);
    }
}