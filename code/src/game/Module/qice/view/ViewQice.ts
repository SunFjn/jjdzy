/**
 * 奇策界面
 * @author: lujiahao 
 * @date: 2019-10-21 21:05:24 
 */
class ViewQice extends UIPanelBase {

    //>>>>start
    public tabCtrl: fairygui.Controller;
    public frame: frame3;
    public tab0: TabButton;
    public tab1: TabButton;
    public tab2: TabButton;
    //>>>>end

    public static URL: string = "ui://cokk050nj82l0";

    private _tabContronller: TabController;

    public static createInstance(): ViewQice {
        return <ViewQice><any>(fairygui.UIPackage.createObject("qice", "ViewQice"));
    }

    public constructor() {
        super();
        this.setSkin("qice", "qice_atlas0", "ViewQice");
    }

    protected initView(): void {
        super.initView();

        let t = this;
        t._tabContronller = new TabController();
        t._tabContronller.initView(t, t.tabCtrl);
        t._tabContronller.setPanelClassMap(
            [
                ChildStarQice,
                ChildLevelQice,
                ChildLotteryQice,
            ]);

        t._tabContronller.tabChange = t.onTabChange;
        t._tabContronller.tabChangeCaller = t;
    }

    private _uidList = [UIConst.QICE_STAR, UIConst.QICE_LEVEL, UIConst.QICE_LOTTERY];
    private onTabChange(pTabIndex: number, pVo: TabBtnVo): boolean {
        let t = this;
        let arr = this._uidList;
        let t_id = arr[pTabIndex];
        if (t_id > 0 && !ModuleManager.isOpen(t_id, true)) {
            return false;
        }
        switch (pTabIndex) {
            case 0:
                pVo.data = t._targetId;
                t._targetId = 0;
                break;
        }
        return true;
    }

    private _targetId = 0;
    protected onShown() {
        let t = this;
        t.registerEvent(true);

        ReddotMgr.ins().register(UIConst.QICE_STAR + "", t.tab0.noticeImg);
        ReddotMgr.ins().register(UIConst.QICE_LEVEL + "", t.tab1.noticeImg);
        ReddotMgr.ins().register(UIConst.QICE_LOTTERY + "", t.tab2.noticeImg);

        let t_selectIndex = 0;
        if (t._args) {
            let t_arg = ~~t._args;
            if (t_arg < 10) {
                t_selectIndex = t_arg;
            }
            else {
                t_selectIndex = 0;
                t._targetId = t_arg;
            }
        }
        t._tabContronller.selectedIndex = -1;
        t._tabContronller.selectedIndex = t_selectIndex;
    }

    protected onHide() {
        let t = this;
        t.registerEvent(false);
        t._tabContronller.close();
        ReddotMgr.ins().unregister(t.tab0.noticeImg);
        ReddotMgr.ins().unregister(t.tab1.noticeImg);
        ReddotMgr.ins().unregister(t.tab2.noticeImg);
    }

    public dispose() {
        let t = this;
        if (t._tabContronller)
            t._tabContronller.destroy();
        super.dispose();
    }

    //=========================================== API ==========================================
    //===================================== private method =====================================
    private registerEvent(pFlag: boolean) {
        let t = this;
        t._tabContronller.registerEvent(pFlag);
    }
    //======================================== handler =========================================
}