/**
 * 类型奖池奖励预览界面
 * @author: lujiahao 
 * @date: 2020-01-07 17:55:56 
 */
class ViewPoolPreviewLucky extends UIModalPanel {

    //>>>>start
	public frame: fairygui.GLabel;
	public list: fairygui.GList;
	//>>>>end

    public static URL: string = "ui://wx4kos8ulxqwm";

    public static createInstance(): ViewPoolPreviewLucky {
        return <ViewPoolPreviewLucky><any>(fairygui.UIPackage.createObject("luckyEgg", "ViewPoolPreviewLucky"));
    }

    public constructor() {
        super();
        this.loadRes("luckyEgg", "luckyEgg_atlas0");
    }

    private _dataList: VoPoolLuckyEgg[] = [];

    protected childrenCreated() {
        GGlobal.createPack("luckyEgg");
        this.view = fairygui.UIPackage.createObject("luckyEgg", "ViewPoolPreviewLucky").asCom;
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
        t.registerEvent(true);
        t.refreshData();
        let t_selectedIndex = 0;
        if (t._args && "poolType" in t._args) {
            if (t._dataList) {
                for (let i = 0; i < t._dataList.length; i++) {
                    if (t._dataList[i].poolType == t._args.poolType) {
                        t_selectedIndex = i;
                        break;
                    }
                }
            }
        }
        t.list.selectedIndex = -1;
        t.list.selectedIndex = t_selectedIndex;
        t.list.scrollToView(t_selectedIndex);
    }

    protected onHide() {
        let t = this;
        t.registerEvent(false);
        t._dataList.length = 0;
        t.list.numItems = 0;
    }

    public dispose() {
        super.dispose();
    }

    //===================================== private method =====================================
    private onItemRender(pIndex: number, pItem: LuckyPoolPreviewItem) {
        let t = this;
        if (t._dataList) {
            pItem.setData(t._dataList[pIndex]);
        }
    }

    private refreshData() {
        let t = this;
        let t_model = GGlobal.modelLuckyEgg;
        let t_qs = t_model.getCurQs();
        let t_list = t_model.getPoolVoListByQs(t_qs);
        t._dataList = t_list.concat();
        t._dataList.reverse();
        t.list.numItems = t._dataList.length;
    }

    private registerEvent(pFlag: boolean) {
        let t = this;
    }
    //======================================== handler =========================================
}