/**
 * 段位奖励界面
 * @author: lujiahao 
 * @date: 2019-12-07 14:37:45 
 */
class ViewGradeRewardKfwz extends UIModalPanel {

    //>>>>start
	public gradeCtrl: fairygui.Controller;
	public frame: fairygui.GLabel;
	public list: fairygui.GList;
	public iconGrade: fairygui.GLoader;
	//>>>>end

    public static URL: string = "ui://me1skowlpmqq75";

    public static createInstance(): ViewGradeRewardKfwz {
        return <ViewGradeRewardKfwz><any>(fairygui.UIPackage.createObject("Arena", "ViewGradeRewardKfwz"));
    }

    private _dataList: VoGradeKfwz[];

    public constructor() {
        super();
        this.loadRes("Arena", "Arena_atlas0");
    }

    protected childrenCreated() {
        GGlobal.createPack("Arena");
        this.view = fairygui.UIPackage.createObject("Arena", "ViewGradeRewardKfwz").asCom;
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
    private onItemRender(pIndex: number, pItem: KfwzGradeItem) {
        let t = this;
        if (t._dataList) {
            pItem.setData(t._dataList[pIndex]);
        }
    }

    private refreshData() {
        let t = this;
        let t_model = GGlobal.modelKfwz;
        let t_list = t_model.getGradeList().concat();
        t_list.splice(0, 1);
        t._dataList = t_list;
        t.list.numItems = t_list.length;

        t.gradeCtrl.selectedIndex = t_model.myGrade - 1;
    }

    private registerEvent(pFlag: boolean) {
        let t = this;
    }
    //======================================== handler =========================================
}