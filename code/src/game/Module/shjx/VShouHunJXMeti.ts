class VShouHunJXMeti extends UIModalPanel {
    public list: fairygui.GList;
    public constructor() {
        super();
        this.loadRes("shouhunJX", "shouhunJX_atlas0");
    }
    protected childrenCreated() {
        let view = this.contentPane = fairygui.UIPackage.createObject("shouhunJX", "VShouHunJXMeti").asCom;
        CommonManager.parseChildren(view, this);
        this.list.itemRenderer = (i, r) => { r.setData(this.dataProviders[i]) };
        this.list.callbackThisObj = this;
        this.list.setVirtual();
        super.childrenCreated();
    }
    private dataProviders = [];
    private showList() {
        const lib = Config.shjxyj_266;
        this.dataProviders.length = 0;
        for (let key in lib) {
            const cfg = lib[key];
            if (cfg.yj == this._data.yj) {
                if(Model_Bag.getItemCount(cfg.id) > 0) {
                    this.dataProviders.push(cfg.id);
                }
            }
        }
        this.list.numItems = this.dataProviders.length;
    }
    private _data: Ishjx_266;
    public onShown() {
        this._data = this._args;
        this.showList();
    }
    public onHide() {
        GGlobal.layerMgr.close(this.panelId);
        this.list.numItems = 0;
    }
}