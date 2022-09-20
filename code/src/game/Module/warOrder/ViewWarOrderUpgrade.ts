/** This is an automatically generated class by FairyGUI. Please do not modify it. **/


class ViewWarOrderUpgrade extends UIModalPanel {
    //注意：start和end之间的属性是脚本自动修改，在这之间插入的代码会被删除，不要在start和end之间添加代码
    //>>>>start
    public stateCtrl: fairygui.Controller;
    public list: fairygui.GList;
    public btnGo: Button1;
    public tf0: fairygui.GRichTextField;
    public tf1: fairygui.GRichTextField;
    public tf2: fairygui.GRichTextField;
    public img: fairygui.GLoader;
    public tfDes: fairygui.GImage;
    static pkg = "warOrder";
    //>>>>end
    public static URL: string = "ui://5xptxudgp5ib1";

    public static createInstance(): ViewWarOrderUpgrade {
        return <ViewWarOrderUpgrade>(fairygui.UIPackage.createObject("warOrder", "ViewWarOrderUpgrade"));
    }

    public constructor() {
        super();
        this.childrenCreated();
    }

    protected childrenCreated(): void {
        let self = this;
        self.view = fairygui.UIPackage.createObject("warOrder", "ViewWarOrderUpgrade").asCom;
        self.contentPane = self.view;
        CommonManager.parseChildren(self.view, self);
        super.childrenCreated();
        self.list.itemRenderer = self.onItemRender0;
        self.list.callbackThisObj = self;
    }

    // protected constructFromXML(xml: any): void {
    //     super.constructFromXML(xml);
    //     let t = this;
    //     CommonManager.parseChildren(t, t);
    //     t.list.itemRenderer = this.onItemRender0;
    //     t.list.callbackThisObj = this;
    // }

    protected onShown() {
        let self = this;
        self._cfgID = self._args
        self.registerEvent(true);
        self.refreshData();
        IconUtil.setImg(self.img, Enum_Path.ICON70_URL + 4 + ".png");
    }

    protected onHide(): void {
        let self = this;
        self.registerEvent(false);
        GGlobal.modelActivity.CG_OPENACT(self._cfgID.groupId); //重新请求更新奖励列表数据
        IconUtil.setImg(self.img, null);
    }

    //=========================================== API ==========================================
    private _cfgID: Vo_Activity;
    // public openPanel(pData?: any) {
    //     let t = this;
    //     t._cfgID = pData
    //     this.refreshData();
    //     this.registerEvent(true);
    //     IconUtil.setImg(t.img, Enum_Path.ICON70_URL + 4 + ".png");
    // }

    // public closePanel() {
    //     let t = this;
    //     t.registerEvent(false);
    //     //关闭界面时候重新请求数据
    //     GGlobal.modelActivity.CG_OPENACT(t._cfgID.groupId); //重新请求更新奖励列表数据
    //     IconUtil.setImg(t.img, null);
    // }
    //===================================== private method =====================================
    private _rewardArr: IGridImpl[]
    private refreshData() {
        let t = this
        let m = GGlobal.modelWarOrder
        let voWarO = m.getWarOrder(t._cfgID.id)
        t.stateCtrl.selectedIndex = voWarO.upgradeFlag;

        let cfg = Config.xsljh1_338[t._cfgID.qs]
        t._rewardArr = ConfigHelp.makeItemListArr(cfg.reward)
        t.list.numItems = t._rewardArr.length
        let t_charCfg = Config.shop_011[cfg.cz];

        t.btnGo.text = t_charCfg.RMB + "元"

        t.tf2.text = HtmlUtil.fontNoSize(cfg.jz, Color.GREENSTR) + "  超值奖励等你来拿"
    }

    private registerEvent(pFlag: boolean) {
        GGlobal.control.register(pFlag, Enum_MsgType.WarOrder_REWARD_UPDATE, this.onUpdate, this);

        EventUtil.register(pFlag, this.btnGo, egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
    }
    //======================================== handler =========================================
    private onUpdate() {
        this.refreshData();
    }

    private onBtnClick(e: egret.TouchEvent) {
        let m = GGlobal.modelWarOrder
        switch (e.currentTarget) {
            case this.btnGo:
                let t_qs = this._cfgID.qs;
                for (let key in Config.xsljh1_338) {
                    let cfg = Config.xsljh1_338[key];
                    if (cfg.qs == t_qs) {
                        GGlobal.modelchongzhi.CG_CHONGZHI_135(cfg.cz, null, false);
                        break;
                    }
                }
                break;
        }
        GGlobal.layerMgr.close(UIConst.WAR_ORDER_UPGRADE)
    }

    private onItemRender0(pIndex: number, pItem: ViewGrid) {
        pItem.isShowEff = true;
        pItem.tipEnabled = true;
        pItem.vo = this._rewardArr[pIndex];
    }
}