class VSJSaoDang extends UIModalPanel {
    public list: fairygui.GList;
    public constructor() {
        super();
        this.setExtends();
        this.loadRes("crossKing", "crossKing_atlas0");
    }
    protected childrenCreated(): void {
        const self = this;
        GGlobal.createPack("crossKing");
        self.view = fairygui.UIPackage.createObject("crossKing", "VSJMJSaoDang").asCom;
        self.contentPane = self.view;
        CommonManager.parseChildren(self.view, self);
        super.childrenCreated();

    }
    private setExtends() {
        fairygui.UIObjectFactory.setPackageItemExtension(ItemSJSD.URL, ItemSJSD);
    }
    private isFirst: boolean = true;
    protected onShown() {
        super.onShown();
        const self = this;
        const datas = self._args;
        if (self.isFirst) {
            self.isFirst = false;
            self.list.itemRenderer = (i, r) => { r.setData(self._args[i]) };
            self.list.setVirtual();
            self.list.callbackThisObj = self;
        }
        self.list.numItems = datas.length;
        self.list.scrollToView(self.list.numItems - 1, true);
    }
    protected onHide(): void {
        GGlobal.layerMgr.close(UIConst.SJMJ_SD);
    }
    public resetPosition(): void {
        this.setXY((fairygui.GRoot.inst.width - this.width) / 2, (fairygui.GRoot.inst.height - this.height) / 2);

    }
}