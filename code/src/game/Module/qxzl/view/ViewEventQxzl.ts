/**
 * 群雄逐鹿
 * @author: lujiahao 
 * @date: 2019-10-09 19:27:40 
 */
class ViewEventQxzl extends UIModalPanel {

    //>>>>start
	public tabCtrl: fairygui.Controller;
	public tab0: TabButton;
	public tab1: TabButton;
	public frame: fairygui.GLabel;
	public logCom: QxzlLogCom;
	//>>>>end

    public static URL: string = "ui://6d8dzzdgg6cv1f";

    public static createInstance(): ViewEventQxzl {
        return <ViewEventQxzl><any>(fairygui.UIPackage.createObject("qxzl", "ViewEventQxzl"));
    }

    public constructor() {
        super();
        this.loadRes("qxzl", "qxzl_atlas0");
    }

    protected childrenCreated() {
        GGlobal.createPack("qxzl");
        this.view = fairygui.UIPackage.createObject("qxzl", "ViewEventQxzl").asCom;
        this.contentPane = this.view;
        CommonManager.parseChildren(this.view, this);

        this.initView();

        super.childrenCreated();
    }

    protected initView(): void {
        let t = this;
    }

    //=========================================== API ==========================================
    protected onShown() {
        let t = this;
        t.registerEvent(true);
        ReddotMgr.ins().register(UIConst.QXZL + "|" + 4, t.tab1.noticeImg);

        t.tabCtrl.selectedIndex = -1;
        t.tabCtrl.selectedIndex = 0;

        GGlobal.modelQxzl.CG_QunXiongZhuLu_openRecord_8959();

        //打开界面s就清除红点
        GGlobal.reddot.setCondition(UIConst.QXZL, 4, false);
    }

    protected onHide() {
        let t = this;
        t.registerEvent(false);
        ReddotMgr.ins().unregister(t.tab1.noticeImg);
    }

    public dispose() {
        super.dispose();
    }

    //===================================== private method =====================================
    private refreshData(pTabIndex: number) {
        let t = this;
        let t_model = GGlobal.modelQxzl;
        let t_dataList = t_model.getEventVoByTabType(pTabIndex);
        let t_str = "";

        for (let v of t_dataList) {
            t_str += v.content + "\n";
        }

        t.logCom.tfContent.text = t_str;
    }

    private registerEvent(pFlag: boolean) {
        let t = this;
        GGlobal.control.register(pFlag, Enum_MsgType.QXZL_EVENT_UPDATE, t.onEventUpdate, t);
        EventUtil.register(pFlag, t.tabCtrl, fairygui.StateChangeEvent.CHANGED, t.onTabChange, t);
    }

    //======================================== handler =========================================
    private onTabChange(e: fairygui.StateChangeEvent) {
        let t = this;
        let t_tabIndex = t.tabCtrl.selectedIndex;
        if (t_tabIndex < 0)
            return;
        t.refreshData(t_tabIndex);
        t.logCom.ensureSizeCorrect();
        t.logCom.ensureBoundsCorrect();
        t.logCom.scrollPane.scrollToView(0);
    }

    private onEventUpdate() {
        let t = this;
        let t_tabIndex = t.tabCtrl.selectedIndex;
        if (t_tabIndex < 0)
            return;
        t.refreshData(t_tabIndex);
    }
}