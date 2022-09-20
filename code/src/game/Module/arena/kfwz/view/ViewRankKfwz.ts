/**
 * 跨服王者排行榜界面
 * @author: lujiahao 
 * @date: 2019-12-09 14:51:52 
 */
class ViewRankKfwz extends UIModalPanel {

    //>>>>start
	public tabCtrl: fairygui.Controller;
	public gradeCtrl: fairygui.Controller;
	public myCtrl: fairygui.Controller;
	public tab0: TabButton;
	public tab1: TabButton;
	public tab2: TabButton;
	public tab3: TabButton;
	public tab4: TabButton;
	public frame: fairygui.GLabel;
	public list: fairygui.GList;
	public iconGrade: fairygui.GLoader;
	public tfMyRank: fairygui.GRichTextField;
	public imageMyFlag: fairygui.GImage;
	//>>>>end

    public static URL: string = "ui://me1skowlpmqq77";

    public static createInstance(): ViewRankKfwz {
        return <ViewRankKfwz><any>(fairygui.UIPackage.createObject("Arena", "ViewRankKfwz"));
    }

    private _dataList: VoRankCfgKfwz[];

    public constructor() {
        super();
        this.loadRes("Arena", "Arena_atlas0");
    }

    protected childrenCreated() {
        GGlobal.createPack("Arena");
        this.view = fairygui.UIPackage.createObject("Arena", "ViewRankKfwz").asCom;
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
        let t_rangeId = t_model.getRangeId();
        let t_selectedIndex = t_rangeId - 1;
        t.tabCtrl.selectedIndex = -1;
        t.tabCtrl.selectedIndex = t_selectedIndex;

        let t_tabBtn: TabButton = t["tab" + t_selectedIndex];
        if (t_tabBtn) {
            t.imageMyFlag.visible = true;
            t.imageMyFlag.x = t_tabBtn.x + t_tabBtn.width - t.imageMyFlag.width;
            t.imageMyFlag.y = t_tabBtn.y;
        }
        else {
            t.imageMyFlag.visible = false;
        }
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
    private onItemRender(pIndex: number, pItem: KfwzRankItem) {
        let t = this;
        if (t._dataList) {
            pItem.setData(t._dataList[pIndex]);
        }
    }

    private refreshDataByTabIndex(pTabIndex: number) {
        let t = this;
        let t_model = GGlobal.modelKfwz;
        let t_rangeId = pTabIndex + 1;
        let t_myRangeId = t_model.getRangeId();
        let t_isMyRange = t_rangeId == t_myRangeId;
        t.myCtrl.selectedIndex = t_isMyRange ? 1 : 0;

        if (t_isMyRange) {
            t.gradeCtrl.selectedIndex = t_model.myGrade - 1;
            let t_strMyRank = "未上榜";
            if (t_model.myRank > 0) {
                t_strMyRank = t_model.myRank + "";
            }
            t.tfMyRank.text = `我的排名：${t_strMyRank}`;
        }

        t._dataList = t_model.getRankCfgListByRangeId(t_rangeId);
        t.list.numItems = t._dataList.length;
    }

    private registerEvent(pFlag: boolean) {
        let t = this;
        GGlobal.control.register(pFlag, Enum_MsgType.KFWZ_RANK_UPDATE, t.onRankUpdate, t);

        EventUtil.register(pFlag, t.tabCtrl, fairygui.StateChangeEvent.CHANGED, t.onTabChange, t);
    }

    //======================================== handler =========================================
    private onRankUpdate(pData: { rangeId: number }) {
        let t = this;
        if (pData.rangeId == t.tabCtrl.selectedIndex + 1)
            t.refreshDataByTabIndex(t.tabCtrl.selectedIndex);
    }

    private onTabChange(e: fairygui.StateChangeEvent) {
        let t = this;
        if (t.tabCtrl.selectedIndex < 0)
            return;
        let t_model = GGlobal.modelKfwz;
        t_model.CG_CrossTeamKing_openRank_10847(t.tabCtrl.selectedIndex + 1);

        t.refreshDataByTabIndex(t.tabCtrl.selectedIndex);
        t.list.scrollToView(0);
    }
}