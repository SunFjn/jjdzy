/**
 * 驻守奖励领取界面
 * @author: lujiahao 
 * @date: 2019-10-10 15:26:04 
 */
class ViewRewardQxzl extends UIModalPanel {

    //>>>>start
	public stateCtrl: fairygui.Controller;
	public frame: fairygui.GLabel;
	public itemList: fairygui.GList;
	public btnGet: Button1;
	public tfDes: fairygui.GRichTextField;
	//>>>>end

    public static URL: string = "ui://6d8dzzdgi2j21h";

    public static createInstance(): ViewRewardQxzl {
        return <ViewRewardQxzl><any>(fairygui.UIPackage.createObject("qxzl", "ViewRewardQxzl"));
    }

    public constructor() {
        super();
        this.loadRes("qxzl", "qxzl_atlas0");
    }

    protected childrenCreated() {
        GGlobal.createPack("qxzl");
        this.view = fairygui.UIPackage.createObject("qxzl", "ViewRewardQxzl").asCom;
        this.contentPane = this.view;
        CommonManager.parseChildren(this.view, this);

        this.initView();

        super.childrenCreated();
    }

    protected initView(): void {
        let t = this;
        t.itemList.itemRenderer = t.onItemRender;
        t.itemList.callbackThisObj = t;
        // t.itemList.setVirtual();
    }

    //=========================================== API ==========================================
    protected onShown() {
        let t = this;
        t.registerEvent(true);
        t.refreshData();

        GGlobal.modelQxzl.CG_QunXiongZhuLu_getDefendAwardInfo_8977();
    }

    protected onHide() {
        let t = this;
        t.registerEvent(false);
        t.itemList.numItems = 0;
    }

    public dispose() {
        super.dispose();
    }

    //===================================== private method =====================================
    private onItemRender(pIndex: number, pItem: ViewGrid) {
        let t_dataList = GGlobal.modelQxzl.rewardList;
        if (t_dataList) {
            pItem.isShowEff = true;
            pItem.tipEnabled = true;
            pItem.vo = t_dataList[pIndex];
        }
    }

    private refreshData() {
        let t = this;
        let t_model = GGlobal.modelQxzl;
        t.itemList.numItems = t_model.rewardList.length;

        t.tfDes.visible = false;
        if (t_model.rewardList.length < 1) {
            t.tfDes.visible = true;
        }

        let t_state = 0;
        if (t_model.rewardList.length > 0) {
            for (let v of t_model.rewardList) {
                if (v && v.count > 0) {
                    t_state = 1;
                    break;
                }
            }
        }
        t.stateCtrl.selectedIndex = t_state;
    }

    private registerEvent(pFlag: boolean) {
        let t = this;
        GGlobal.control.register(pFlag, Enum_MsgType.QXZL_REWARD_UPDATE, t.onReawrdUpdate, t);

        EventUtil.register(pFlag, t.btnGet, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
    }

    //======================================== handler =========================================
    private onReawrdUpdate() {
        let t = this;
        t.refreshData();
    }

    private onBtnClick(e: egret.TouchEvent) {
        let t = this;
        switch (e.currentTarget) {
            case t.btnGet:
                GGlobal.modelQxzl.CG_QunXiongZhuLu_gotDefendAward_8979();
                break;
        }
    }
}