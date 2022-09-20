/**
 * @author: lujiahao 
 * @date: 2019-11-21 20:19:15 
 */
class ViewRewardCJS extends UIModalPanel {

    //>>>>start
    public frame: fairygui.GLabel;
    public list: fairygui.GList;
    //>>>>end

    public static URL: string = "ui://ehocr0vupwnzb";

    public static createInstance(): ViewRewardCJS {
        return <ViewRewardCJS><any>(fairygui.UIPackage.createObject("actCJS", "ViewRewardCJS"));
    }

    private _dataList: VoLayerRewardCJS[];

    public constructor() {
        super();
        this.loadRes("actCJS", "actCJS_atlas0");
    }

    protected childrenCreated() {
        GGlobal.createPack("actCJS");
        this.view = fairygui.UIPackage.createObject("actCJS", "ViewRewardCJS").asCom;
        this.contentPane = this.view;
        CommonManager.parseChildren(this.view, this);

        this.initView();

        super.childrenCreated();
    }

    protected initView(): void {
        this.list.itemRenderer = this.onItemRender;
        this.list.callbackThisObj = this;
        this.list.setVirtual();
    }

    //=========================================== API ==========================================
    protected onShown() {
        let t = this;
        t.registerEvent(true);

        let t_model = GGlobal.modelCJS;
        t_model.CG_AchievementTree_openFloorUI_10571();

        t.refreshData();
        t.list.scrollToView(0);
    }

    protected onHide() {
        this.registerEvent(false);
        this.list.numItems = 0;
    }

    public dispose() {
        super.dispose();
    }

    //===================================== private method =====================================
    private onItemRender(pIndex: number, pItem: CJSRewardItem) {
        if (this._dataList) {
            pItem.setData(this._dataList[pIndex]);
        }
    }

    private refreshData() {
        let t = this;
        let t_model = GGlobal.modelCJS;

        let t_qs = t_model.getCurQs();
        let t_sourceList = t_model.getRewardVoListByQs(t_qs).concat();
        t_sourceList.sort((pA, pB) => {
            return pB.sortValue - pA.sortValue;
        });
        t._dataList = t_sourceList;
        t.list.numItems = t_sourceList.length;
    }

    private registerEvent(pFlag: boolean) {
        let t = this;
        GGlobal.control.register(pFlag, Enum_MsgType.CJS_UPDATE, t.onUpdate, t);
        GGlobal.control.register(pFlag, Enum_MsgType.CJS_REWARD_UPDATE, t.onRewardUpdate, t);
    }

    //======================================== handler =========================================
    private onUpdate() {
        let t = this;
        t.refreshData();
    }

    private onRewardUpdate() {
        let t = this;
        t.refreshData();
    }
}