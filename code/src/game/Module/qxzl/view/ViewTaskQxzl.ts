/**
 * 群雄逐鹿任务面板
 * @author: lujiahao 
 * @date: 2019-09-30 15:55:53 
 */
class ViewTaskQxzl extends UIModalPanel {

    //>>>>start
    public tabCtrl: fairygui.Controller;
    public stateCtrl: fairygui.Controller;
    public tab0: TabButton;
    public tab1: TabButton;
    public frame: fairygui.GLabel;
    public list: fairygui.GList;
    public tfDes: fairygui.GRichTextField;
    //>>>>end

    public static URL: string = "ui://6d8dzzdgrak312";

    public static createInstance(): ViewTaskQxzl {
        return <ViewTaskQxzl><any>(fairygui.UIPackage.createObject("qxzl", "ViewTaskQxzl"));
    }

    private _dataList: VoTaskQxzl[];

    public constructor() {
        super();
        this.loadRes("qxzl", "qxzl_atlas0");
    }

    protected childrenCreated() {
        GGlobal.createPack("qxzl");
        this.view = fairygui.UIPackage.createObject("qxzl", "ViewTaskQxzl").asCom;
        this.contentPane = this.view;
        CommonManager.parseChildren(this.view, this);

        this.initView();

        super.childrenCreated();
    }

    protected initView(): void {
        this.list.itemRenderer = this.onItemRender;
        this.list.callbackThisObj = this;
        this.list.setVirtual();

        this.tab1.visible = false;
    }

    //=========================================== API ==========================================
    protected onShown() {
        let t = this;
        GGlobal.modelQxzl.CG_QunXiongZhuLu_openTaskUI_8955();
        t.registerEvent(true);
        t.refreshReddot();

        t.tabCtrl.selectedIndex = -1;
        t.tabCtrl.selectedIndex = 0;
    }

    protected onHide() {
        let t = this;
        t.registerEvent(false);
        t.list.numItems = 0
    }

    public dispose() {
        super.dispose();
    }

    //===================================== private method =====================================
    private onItemRender(pIndex: number, pItem: QxzlTaskItem) {
        if (this._dataList) {
            pItem.setData(this._dataList[pIndex]);
        }
    }

    private refreshData(pTabIndex: number) {
        let t = this;
        let t_model = GGlobal.modelQxzl;
        let t_tabType = t.getTabTypeByTabIndex(pTabIndex);
        let t_map = t_model.getTypeVoListMap(t_tabType);
        let t_showList = [];
        for (let k in t_map) {
            let t_voList = t_map[k];
            let t_showVo = t_voList[t_voList.length - 1];
            for (let i = t_voList.length - 1; i >= 0; i--) {
                let t_vo = t_voList[i];
                if (t_vo.state == EnumQxzl.STATE_DONE)
                    continue;
                t_showVo = t_vo;
            }
            t_showList.push(t_showVo);
        }
        t_showList.sort((pA: VoTaskQxzl, pB: VoTaskQxzl) => {
            if (pA.sortValue > pB.sortValue)
                return -1;
            else if (pA.sortValue < pB.sortValue)
                return 1;
            else
                return pA.id - pB.id;
        });
        this._dataList = t_showList;
        t.list.numItems = t_showList.length;
    }

    private getTabTypeByTabIndex(pTabIndex: number): number {
        return pTabIndex + 1;
    }

    private refreshReddot() {
        let t = this;
        let t_model = GGlobal.modelQxzl;
        let t_reddot = false;
        for (let i = 0; i < 2; i++) {
            let t_tabType = t.getTabTypeByTabIndex(i);
            let t_voList = t_model.getTaskVoListByTabType(t_tabType);
            for (let v of t_voList) {
                if (v && v.state == EnumQxzl.STATE_CAN_GET) {
                    t_reddot = true;
                    break;
                }
            }
            t["tab" + i].noticeImg.visible = t_reddot;
        }
    }

    private registerEvent(pFlag: boolean) {
        let t = this;
        GGlobal.control.register(pFlag, Enum_MsgType.QXZL_TASK_UPDATE, t.onTaskUpdate, t);

        EventUtil.register(pFlag, t.tabCtrl, fairygui.StateChangeEvent.CHANGED, t.onTabChange, t);
    }

    //======================================== handler =========================================
    private onTabChange(e: fairygui.StateChangeEvent) {
        let t = this;
        let t_tabIndex = t.tabCtrl.selectedIndex;
        if (t_tabIndex < 0)
            return;
        t.refreshData(t_tabIndex);

        t.list.scrollToView(0);
    }

    private onTaskUpdate() {
        this.refreshData(this.tabCtrl.selectedIndex);
        this.refreshReddot();
    }
}