class VTuiSongMsgBox extends UIModalPanel {
    public iconGot: fairygui.GImage;
    public btnHand: Button0;
    public constructor() {
        super();
        this.childrenCreated();
    }
    public grids = [];//86 118
    protected childrenCreated() {
        const s = this;
        s.view = fairygui.UIPackage.createObject("dailytask", "VActPreViewBox").asCom;
        s.contentPane = s.view;
        CommonManager.parseChildren(s.view, s);
        s.btnHand.addClickListener(s.onHand, s);
        super.childrenCreated();
    }
    private onHand() {
        let s = this;
        if(s.newVers && s.newVers.url && s.newVers.url.length > 0){
            ViewCommonWarn.text("更新客户端后可领取每日奖励")
            return;
        }
        GGlobal.modelactPreView.CG4055()
        this.doHideAnimation();
    }
    private newVers
    public onShown() {
        const s = this;
        s.newVers = this._args
        ConfigHelp.cleanGridview(s.grids);
        let awards = ConfigHelp.makeItemListArr(JSON.parse(Config.xtcs_004[4302].other));
        const beginX = s.width - awards.length * 110 >> 1;
        s.grids = ConfigHelp.addGridview(awards, s, beginX, 118, true, false, 5, 120);
        s.onUpdate();
        GGlobal.modelactPreView.listen(ModelActPreView.msg_tsMsg, s.onUpdate, s);
    }
    private onUpdate() {
        const s = this;
        s.btnHand.visible = !(s.iconGot.visible = ModelActPreView.tSMsgSt == 1);
    }
    public onHide() {
        GGlobal.layerMgr.close(UIConst.TUISONG_SET_BOX);
        GGlobal.modelactPreView.remove(ModelActPreView.msg_tsMsg, this.onUpdate, this);
    }
}