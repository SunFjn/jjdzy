/**
 * 奇策套装界面
 * @author: lujiahao 
 * @date: 2019-10-23 17:29:34 
 */
class ViewSuitQice extends UIModalPanel {

    //>>>>start
    public frame: frame1;
    public btnUp: Button1;
    public g22: fairygui.GImage;
    public tfName: fairygui.GRichTextField;
    public powerCom: fairygui.GLabel;
    public list: fairygui.GList;
    //>>>>end

    public static URL: string = "ui://cokk050nb5kha";

    private _dataList: CfgSuitQice[] = [];
    private _curData: CfgSuitQice;

    public static createInstance(): ViewSuitQice {
        return <ViewSuitQice><any>(fairygui.UIPackage.createObject("qice", "ViewSuitQice"));
    }

    public constructor() {
        super();
        this.loadRes("qice", "qice_atlas0");
    }

    protected childrenCreated() {
        GGlobal.createPack("qice");
        this.view = fairygui.UIPackage.createObject("qice", "ViewSuitQice").asCom;
        this.contentPane = this.view;
        CommonManager.parseChildren(this.view, this);

        this.initView();

        super.childrenCreated();
    }

    protected initView(): void {
        let t = this;
        t.list.itemRenderer = t.onItemRender;
        t.list.callbackThisObj = t;
        t.list.foldInvisibleItems = true;
    }

    //=========================================== API ==========================================
    protected onShown() {
        let t = this;
        t.registerEvent(true);
        t.refreshData();
    }

    protected onHide() {
        let t = this;
        t.registerEvent(false);
        t.list.numItems = 0;
    }

    public dispose() {
        super.dispose();
    }

    //===================================== private method =====================================
    private onItemRender(pIndex: number, pItem: QiceSuitItem) {
        let t = this;
        if (t._dataList) {
            pItem.setData(t._dataList[pIndex]);
        }
    }

    private refreshData() {
        let t = this;
        let t_model = GGlobal.modelQice;

        t._curData = t_model.getCurCfgSuit();
        if (t._curData) {
            //已激活套装
            if (t_model.getNextCfgSuit()) {
                t.btnUp.title = "升级";
            }
            else {
                t.btnUp.title = "已满级";
            }
            t.powerCom.title = t._curData.cfg.zl + "";
            t.tfName.text = `套装${t._curData.level}级`;
        }
        else {
            //尚未激活套装
            t.powerCom.title = 0 + "";
            t.btnUp.title = "激活";
            t.tfName.text = `套装0级`;
        }

        if (t_model.checkSuitCanUp(false))
            t.btnUp.grayed = false;
        else
            t.btnUp.grayed = true;

        t._dataList.length = 0;
        {
            let t_cfg = t_model.getCurCfgSuit();
            if (t_cfg) {
                t._dataList.push(t_cfg);
            }
        }
        {
            let t_cfg = t_model.getNextCfgSuit()
            if (t_cfg) {
                t._dataList.push(t_cfg);
            }
        }
        t.list.numItems = t._dataList.length;
        t.list.ensureBoundsCorrect();
        t.list.ensureSizeCorrect();
        t.list.resizeToFit();
    }

    private registerEvent(pFlag: boolean) {
        let t = this;
        GGlobal.control.register(pFlag, Enum_MsgType.QICE_SUIT_UPDATE, t.onSuitUpdate, t);
        EventUtil.register(pFlag, t.btnUp, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
    }

    //======================================== handler =========================================
    private onSuitUpdate() {
        let t = this;
        t.refreshData();
    }

    private onBtnClick(e: egret.TouchEvent) {
        let t = this;
        switch (e.currentTarget) {
            case t.btnUp:
                GGlobal.modelQice.CG_QiCe_upQCtaozhuang_9705();
                break;
        }
    }
}