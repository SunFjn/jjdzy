class VActPreViewBox extends UIModalPanel {
    public iconGot: fairygui.GImage;
    public btnHand: Button0;
    public constructor() {
        super();
        this.childrenCreated();
    }
    public grids = [];//86 118
    protected childrenCreated() {
        const self = this;
        self.view = fairygui.UIPackage.createObject("dailytask", "VActPreViewBox").asCom;
        self.contentPane = self.view;
        CommonManager.parseChildren(self.view, self);
        self.btnHand.addClickListener(self.onHand, self);
        super.childrenCreated();
    }
    private onHand() {
        GGlobal.modelactPreView.CG4051();
        this.doHideAnimation();
    }
    public onShown() {
        const self = this;
        ConfigHelp.cleanGridview(self.grids);
        let awards = ConfigHelp.makeItemListArr(JSON.parse(Config.xtcs_004[4301].other));
        const beginX = self.width - awards.length * 110 >> 1;
        self.grids = ConfigHelp.addGridview(awards, self, beginX, 118, true, false, 5, 120);
        self.onUpdate();
        GGlobal.modelactPreView.listen(ModelActPreView.msg_datas, self.onUpdate, self);
    }
    private onUpdate() {
        const self = this;
        self.btnHand.visible = !(self.iconGot.visible = ModelActPreView.gotSt == 1);
    }
    public onHide() {
        GGlobal.layerMgr.close(this.panelId);
        GGlobal.modelactPreView.remove(ModelActPreView.msg_datas, this.onUpdate, this);
    }
}