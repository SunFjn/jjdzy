/**
 * 成就奖励界面
 * @author: lujiahao 
 * @date: 2019-11-08 18:16:58 
 */
class ViewAchieveReward extends UIModalPanel {

    //>>>>start
	public frame: fairygui.GLabel;
	public list: fairygui.GList;
	//>>>>end

    public static URL: string = "ui://dllc71i9g7h32b";

    public static createInstance(): ViewAchieveReward {
        return <ViewAchieveReward><any>(fairygui.UIPackage.createObject("rebirth", "ViewAchieveReward"));
    }

    private _dataList: VoMasterAchievement[] = [];

    public constructor() {
        super();
        this.loadRes("rebirth", "rebirth_atlas0");
    }

    protected childrenCreated() {
        GGlobal.createPack("rebirth");
        this.view = fairygui.UIPackage.createObject("rebirth", "ViewAchieveReward").asCom;
        this.contentPane = this.view;
        CommonManager.parseChildren(this.view, this);

        this.initView();

        super.childrenCreated();
    }

    protected initView(): void {
        let t = this;
        t.list.itemRenderer = t.onItemRender;
        t.list.callbackThisObj = t;
        t.list.foldInvisibleItems = true;
    }

    //=========================================== API ==========================================
    protected onShown() {
        let t = this;
        t.registerEvent(true);

        GGlobal.modelAchievement.CG_Achievement_openGoalUI_10325();

        t.refreshData();

        t.list.selectedIndex = -1;
        t.list.selectedIndex = 0;
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
    private onItemRender(pIndex: number, pItem: AchieveRewardItem) {
        let t = this;
        if (t._dataList) {
            pItem.setData(t._dataList[pIndex]);
        }
    }

    private refreshData() {
        let t = this;
        let t_model = GGlobal.modelAchievement;
        t._dataList.length = 0;
        let t_sourceList = t_model.getMasterVoList();
        for (let v of t_sourceList) {
            let t_rewardList = v.rewardList;
            if (t_rewardList && t_rewardList.length > 0) {
                t._dataList.push(v);
            }
        }

        t._dataList.sort((pA, pB) => {
            return pB.sortValue - pA.sortValue;
        });

        t.list.numItems = t._dataList.length;
    }

    private registerEvent(pFlag: boolean) {
        let t = this;
        GGlobal.control.register(pFlag, Enum_MsgType.ACHIEVEMENT_REWARD_UPDATE, t.onUpdate, t);
    }
    //======================================== handler =========================================
    private onUpdate() {
        let t = this;
        t.refreshData();
    }
}