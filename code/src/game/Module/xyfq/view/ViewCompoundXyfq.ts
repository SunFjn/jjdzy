/**
 * @author: lujiahao 
 * @date: 2020-04-10 10:33:24 
 */
class ViewCompoundXyfq extends UIModalPanel {

    //>>>>start
    public frame: fairygui.GLabel;
    public list: fairygui.GList;
    //>>>>end

    public static URL: string = "ui://7hwmix0gszt5v";

    public static createInstance(): ViewCompoundXyfq {
        return <ViewCompoundXyfq><any>(fairygui.UIPackage.createObject("xyfq", "ViewCompoundXyfq"));
    }

    public constructor() {
        super();
        this.loadRes("xyfq", "xyfq_atlas0");
    }

    protected childrenCreated() {
        GGlobal.createPack("xyfq");
        this.view = fairygui.UIPackage.createObject("xyfq", "ViewCompoundXyfq").asCom;
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
    private onItemRender(pIndex: number, pItem: XyfqCompItem) {
        let t = this;
        if (t._dataList) {
            pItem.setData(t._dataList[pIndex]);
        }
    }

    private refreshData() {
        let t = this;
        let t_model = GGlobal.modelXyfq;
        t._dataList = t_model.getCompQianVoList().concat();
        t._dataList.reverse();
        t.list.numItems = t._dataList.length;
    }

    private registerEvent(pFlag: boolean) {
        let t = this;
        GGlobal.control.register(pFlag, Enum_MsgType.XYFQ_UPDATE, t.onUpdate, t);
    }
    //======================================== handler =========================================
    private onUpdate() {
        let t = this;
        t.list.refreshVirtualList();
    }
}