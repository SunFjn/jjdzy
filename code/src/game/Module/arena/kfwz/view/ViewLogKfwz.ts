/**
 * 跨服王者日志界面
 * @author: lujiahao 
 * @date: 2019-12-11 11:03:41 
 */
class ViewLogKfwz extends UIModalPanel {

    //>>>>start
	public frame: fairygui.GLabel;
	public list: fairygui.GList;
	//>>>>end

    public static URL: string = "ui://me1skowls0r57k";

    public static createInstance(): ViewLogKfwz {
        return <ViewLogKfwz><any>(fairygui.UIPackage.createObject("Arena", "ViewLogKfwz"));
    }

    private _dataList: VoLogKfwz[];

    public constructor() {
        super();
        this.loadRes("Arena", "Arena_atlas0");
    }

    protected childrenCreated() {
        GGlobal.createPack("Arena");
        this.view = fairygui.UIPackage.createObject("Arena", "ViewLogKfwz").asCom;
        this.contentPane = this.view;
        CommonManager.parseChildren(this.view, this);

        this.initView();

        super.childrenCreated();
    }

    protected initView(): void {
        let t = this;
        t.list.itemRenderer = t.onItemRender;
        t.list.callbackThisObj = t;
        t.list.setVirtual();
    }

    //=========================================== API ==========================================
    protected onShown() {
        let t = this;
        let t_model = GGlobal.modelKfwz;
        t.registerEvent(true);
        t.refreshData();

        t_model.CG_CrossTeamKing_getLog_10851();

        t.list.scrollToView(0);
    }

    protected onHide() {
        let t = this;
        t.registerEvent(false);
        t._dataList = null;
        t.list.numItems = 0;
    }

    public dispose() {
        super.dispose();
    }

    //===================================== private method =====================================
    private onItemRender(pIndex: number, pItem: KfwzLogItem) {
        let t = this;
        if (t._dataList) {
            pItem.setData(t._dataList[pIndex]);
        }
    }

    private refreshData() {
        let t = this;
        let t_model = GGlobal.modelKfwz;

        let t_list = t_model.logVoList.concat();
        for (let v of t_list) {
            v.isFold = true; //折叠所有数据
        }
        t._dataList = t_list;
        t.list.numItems = t_list.length;
    }

    private registerEvent(pFlag: boolean) {
        let t = this;
        GGlobal.control.register(pFlag, Enum_MsgType.KFWZ_LOG_UPDATE, t.onLogUpdate, t);
        GGlobal.control.register(pFlag, Enum_MsgType.KFWZ_LOG_CHANGE_SIZE, t.onLogSizeChange, t);
    }
    //======================================== handler =========================================
    private onLogUpdate() {
        let t = this;
        t.refreshData();
    }

    private onLogSizeChange() {
        let t = this;
        t.list.refreshVirtualList();
    }
}