class ViewLBPaiHang extends UIModalPanel {
    public list: fairygui.GList;
    public constructor() {
        super();
        this.loadRes("LvBuComeUp", "LvBuComeUp_atlas0");
    }
    protected childrenCreated() {
        super.childrenCreated();
        GGlobal.createPack("LvBuComeUp");
        const self = this;
        self.view = self.contentPane = fairygui.UIPackage.createObject("LvBuComeUp", "ViewLBPaiHang").asCom;
        self.list = self.view.getChild("list").asList;
        self.list.itemRenderer = self.onRender;
        self.list.setVirtual();
        self.list.callbackThisObj = self;
    }
    private onRender(index: number, item: ItemLBPH) {
        var data = this.datas[index];
        item.vo = data;
        item.index = index;
    }
    private datas: any[];
    private onUpdate(datas: any[]) {
        this.datas = datas;
        this.list.numItems = datas.length;
    }
    protected onShown() {
        super.onShown();
        GGlobal.modelLvBuCompup.listen(ModelLvBuComeUp.msg_paiHang, this.onUpdate, this);
        GGlobal.modelLvBuCompup.CG2713();
    }
    protected onHide() {
        super.onHide();
        GGlobal.layerMgr.close(UIConst.VIEWLBPAIHANG);
        GGlobal.modelLvBuCompup.remove(ModelLvBuComeUp.msg_paiHang, this.onUpdate, this);
        this.list.numItems = 0;
    }
}