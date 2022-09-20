/**
 * @author: lujiahao 
 * @date: 2020-04-09 10:20:22 
 */
class ViewTaskXyfq extends UIModalPanel {

    //>>>>start
    public tabCtrl: fairygui.Controller;
    public frame: fairygui.GLabel;
    public list: fairygui.GList;
    public tfCount: fairygui.GRichTextField;
    public tab1: TabButton;
    public tab0: TabButton;
    //>>>>end

    public static URL: string = "ui://7hwmix0gbnypq";

    public static createInstance(): ViewTaskXyfq {
        return <ViewTaskXyfq><any>(fairygui.UIPackage.createObject("xyfq", "ViewTaskXyfq"));
    }

    public constructor() {
        super();
        this.loadRes("xyfq", "xyfq_atlas0");
    }

    protected childrenCreated() {
        GGlobal.createPack("xyfq");
        this.view = fairygui.UIPackage.createObject("xyfq", "ViewTaskXyfq").asCom;
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

    private _dataList: VoTaskXyfq[];

    //=========================================== API ==========================================
    protected onShown() {
        let t = this;
        t.registerEvent(true);

        t.tabCtrl.selectedIndex = -1;
        t.tabCtrl.selectedIndex = 0;

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
    private onItemRender(pIndex: number, pItem: XyfqItemTask) {
        let t = this;
        if (t._dataList) {
            pItem.setData(t._dataList[pIndex]);
        }
    }

    private refreshData() {
        let t = this;
        let t_model = GGlobal.modelXyfq;
        let t_tabIndex = t.tabCtrl.selectedIndex;
        let t_type = t.getTypeByTab(t_tabIndex);
        let t_dataList = t_model.getTaskVoListByType(t_type).concat();
        t_dataList.sort((pA, pB) => {
            return pB.sortValue - pA.sortValue;
        });
        t._dataList = t_dataList;
        t.list.numItems = t_dataList.length;

        switch (t_type) {
            case 1: //总目标
                t.tfCount.text = `总抽签数：${t_model.countTotal}次`;
                break;
            case 2: //每日目标
                t.tfCount.text = `今日抽签数：${t_model.countDaily}次`;
                break;
        }
    }

    private _typeList = [2, 1];
    private getTypeByTab(pTabIndex: number) {
        return this._typeList[pTabIndex];
    }

    private registerEvent(pFlag: boolean) {
        let t = this;
        GGlobal.control.register(pFlag, Enum_MsgType.XYFQ_TASK_UPDATE, t.onTaskUpdate, t);

        EventUtil.register(pFlag, t.tabCtrl, fairygui.StateChangeEvent.CHANGED, t.onTabChange, t);

        if (pFlag) {
            ReddotMgr.ins().register(ReddotEnum.VALUE_XYFQ_TASK_DAILY, t.tab0.noticeImg);
            ReddotMgr.ins().register(ReddotEnum.VALUE_XYFQ_TASK_TOTAL, t.tab1.noticeImg);
        }
        else {
            ReddotMgr.ins().unregister(t.tab0.noticeImg);
            ReddotMgr.ins().unregister(t.tab1.noticeImg);
        }
    }
    //======================================== handler =========================================
    private onTaskUpdate(pData: { type: number }) {
        let t = this;
        let t_curType = t.getTypeByTab(t.tabCtrl.selectedIndex);
        if (pData.type == t_curType) {
            t.refreshData();
        }
    }

    private onTabChange(e: fairygui.StateChangeEvent) {
        let t = this;
        let t_tabIndex = t.tabCtrl.selectedIndex;
        if (t_tabIndex < 0)
            return;
        t.refreshData();
    }
}