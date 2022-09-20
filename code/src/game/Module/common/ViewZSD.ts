/**还是直升丹 */
class ViewZSD extends UIModalPanel {
    public btnClose: fairygui.GImage;
    public iconContent: fairygui.GLoader;
    public grid: ViewGrid;
    public btnZG: Button4;
    public btnUSE: Button1;
    public bg: fairygui.GLoader;
    public promptLb: fairygui.GRichTextField;
    public constructor() {
        super();
        this.loadRes("ZhiShengDan", "ZhiShengDan_atlas0")
    }
    protected childrenCreated() {
        const self = this;
        GGlobal.createPack("ZhiShengDan");
        const view = fairygui.UIPackage.createObject("ZhiShengDan", "ViewZSD").asCom;
        self.contentPane = view;
        CommonManager.parseChildren(view, self);
        self.isClosePanel = false;
        self.btnClose.displayObject.touchEnabled = true;
        self.btnZG.displayObject.touchEnabled = true;
        self.btnUSE.displayObject.touchEnabled = true;
        self.btnZG.addClickListener(self.onHand, this);
        self.btnUSE.addClickListener(self.onHand, this);
        self.btnZG.checkNotice = false;
        self.btnUSE.checkNotice = false;
        self.closeButton = self.btnClose;
        self.bg = self["n0"];
        super.childrenCreated();
    }
    private onHand(evt) {
        const tar = evt.currentTarget;
        switch (tar) {
            case this.btnZG:
                const cfg = Config.zsd_257[this._args];
                if (TimeUitl.isIn7Days()) {
                    GGlobal.layerMgr.open(UIConst.SYSTEM_ZHI_GOU, { day: cfg.kf, type: 2 });
                } else {
                    var vo = new VoItem();
                    vo.initLib(cfg.item);
                    View_CaiLiao_GetPanel.show(vo);
                }
                break;
            case this.btnUSE:
                GGlobal.modelGlobalMsg.CG3741(Config.zsd_257[this._args].id);
                break;
        }
    }
    protected onShown() {
        super.onShown();
        let self = this;
        let cfg = Config.zsd_257[self._args];
        self.iconContent.icon = CommonManager.getUrl("ZhiShengDan", cfg.day + "");
        IconUtil.setImg(self.bg, Enum_Path.BACK_URL + "zsdBG.png");
        var temp = new VoItem();
        self.grid.isShowEff = true;
        self.grid.tipEnabled = true;
        temp.initLib(cfg.item);
        this.grid.vo = temp;
        self.btnUSE.visible = self.btnZG.visible = self.promptLb.visible = false;
        if (cfg.kf > Model_GlobalMsg.kaifuDay) {
            let date: Date = new Date(Model_GlobalMsg.getServerTime());
            let key = "zhishengdan_" + self._args + Model_player.voMine.id + "_" + date.getDay() + date.getMonth() + date.getFullYear();
            let value = egret.localStorage.getItem(key);
            if (!value) {
                egret.localStorage.setItem(key, "zhishengdan_show");
            }
            self.promptLb.visible = true;
            self.promptLb.text = (cfg.kf - Model_GlobalMsg.kaifuDay) + "天后可购买";
        } else {
            if (Model_Bag.getItemCount(temp.id) > 0) {
                self.btnUSE.visible = true;
            } else {
                self.btnZG.visible = true;
            }
        }
    }
    protected onHide() {
        let self = this;
        GGlobal.layerMgr.close(self.panelId);
        IconUtil.setImg(self.bg, null);
        self.grid.clean();
    }
    public static show(_args: any) {
        let cfg = Config.zsd_257[_args];
        if (cfg && cfg.kf > Model_GlobalMsg.kaifuDay) {
            let date: Date = new Date(Model_GlobalMsg.getServerTime());
            let key = "zhishengdan_" + _args + Model_player.voMine.id + "_" + date.getDay() + date.getMonth() + date.getFullYear();
            let value = egret.localStorage.getItem(key);
            if (!value) {
                GGlobal.layerMgr.open(UIConst.ZHISHENGDAN, _args);
            }
        } else {
            GGlobal.layerMgr.open(UIConst.ZHISHENGDAN, _args);
        }
    }
}