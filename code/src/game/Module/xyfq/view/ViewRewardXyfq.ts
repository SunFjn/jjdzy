/**
 * @author: lujiahao 
 * @date: 2020-04-09 16:24:53 
 */
class ViewRewardXyfq extends UIModalPanel {

    //>>>>start
    public frame: fairygui.GLabel;
    public list: fairygui.GList;
    //>>>>end

    public static URL: string = "ui://7hwmix0gbnypt";

    public static createInstance(): ViewRewardXyfq {
        return <ViewRewardXyfq><any>(fairygui.UIPackage.createObject("xyfq", "ViewRewardXyfq"));
    }

    public constructor() {
        super();
        this.loadRes("xyfq", "xyfq_atlas0");
    }

    protected childrenCreated() {
        GGlobal.createPack("xyfq");
        this.view = fairygui.UIPackage.createObject("xyfq", "ViewRewardXyfq").asCom;
        this.contentPane = this.view;
        CommonManager.parseChildren(this.view, this);

        this.initView();

        super.childrenCreated();
    }

    private _dataList: VoQianXyfq[];

    protected initView(): void {
        let t = this;
        t.list.itemRenderer = t.onItemRender;
        t.list.callbackThisObj = t;
        t.list.setVirtual();
    }

    //=========================================== API ==========================================
    protected onShown() {
        let t = this;
        let t_model = GGlobal.modelXyfq;
        t.registerEvent(true);
        t.refreshData();
        t.list.scrollToView(0);
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
    private onItemRender(pIndex: number, pItem: XyfqRewardItem) {
        let t = this;
        if (t._dataList) {
            pItem.setData(t._dataList[pIndex]);
        }
    }

    private refreshData() {
        let t = this;
        let t_model = GGlobal.modelXyfq;
        t._dataList = t_model.getQianVoList().concat();
        t._dataList.reverse();
        t.list.numItems = t._dataList.length;
    }

    private registerEvent(pFlag: boolean) {
        let t = this;
    }
    //======================================== handler =========================================
}