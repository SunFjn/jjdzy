class ViewSHJXInfo extends UIModalPanel {
    public grid: ViewGrid;
    public labOwner: fairygui.GLabel;
    public labName: fairygui.GLabel;
    public labPower: fairygui.GLabel;
    public constructor() {
        super();
        this.childrenCreated();
    }
    protected childrenCreated() {
        this.contentPane = this.view = fairygui.UIPackage.createObject("chat", "ViewSHJXInfo").asCom;
        CommonManager.parseChildren(this.view, this);
        this.grid.tipEnabled = true;
        super.childrenCreated();
    }
    private onUpdate() {
        //装备id_战力_印记位置,印记id,印记类型@印记位置,印记id,印记类型@印记位置,印记id,印记类型@印记位置,印记id,印记类型
        const arr = this._args.content.split("_");
        this.labOwner.text = arr[0];
        const equipID: number = arr[1];
        this.grid.vo = VoEquip.create(equipID);
        this.grid.showEff(true);
        this.labName.text = this.grid.vo.name;
        this.labPower.text = arr[2];
        if(arr[3]) {
            const ids = arr[3].split(/\@/gi);
            for(let i = 0; i < 4; i++) {
                this[`item${i + 1}`].setData(ids[i]);
            }
        }
    }
    public onShown() {
        this.onUpdate();
    }
    public onHide() {
        GGlobal.layerMgr.close(this.panelId);
        ConfigHelp.cleanGridEff(this.grid);
    }
}