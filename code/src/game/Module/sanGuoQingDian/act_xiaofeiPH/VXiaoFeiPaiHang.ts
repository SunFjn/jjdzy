class VXiaoFeiPaiHang extends UIModalPanel {
    public list: fairygui.GList;
    public constructor() {
        super();
        this.loadRes("sanGuoQingDian", "sanGuoQingDian_atlas0");
    }
    protected childrenCreated() {
        this.view = fairygui.UIPackage.createObject("sanGuoQingDian", "VXiaoFeiPaiHang").asCom;
        this.contentPane = this.view;
        CommonManager.parseChildren(this.view, this);
        this.list.itemRenderer = (i, r) => { r.setData(i) };
        super.childrenCreated();
    }
    public onShown() {
        super.onShown();
        this.list.numItems = 50;
    }
    // private getDatas() {
    //     const voact = GGlobal.modelActivity.get(UIConst.SANGUOQD, UIConst.XIAOFEIPH);
    //     var datas = [];
    //     const lib = Config.sgxfph_261;
    //     for(let key in lib) {
    //         const cfg = lib[key];
    //         if(cfg.qs == voact.qs) {
    //             datas.push(cfg);
    //         }
    //     }
    //     return datas;
    // }
    public onHide() {
        super.onHide();
        GGlobal.layerMgr.close(this.panelId);
        this.list.numItems = 0;
    }
}