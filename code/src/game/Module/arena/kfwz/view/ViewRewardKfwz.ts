/**
 * 跨服王者目标奖励预览界面
 * @author: lujiahao 
 * @date: 2019-12-07 13:53:25 
 */
class ViewRewardKfwz extends UIModalPanel {

    //>>>>start
	public stateCtrl: fairygui.Controller;
	public frame: fairygui.GLabel;
	public itemList: fairygui.GList;
	public tfDes: fairygui.GRichTextField;
	public btnGet: Button1;
	public imageGet: fairygui.GImage;
	//>>>>end

    public static URL: string = "ui://me1skowls0r579";

    public static createInstance(): ViewRewardKfwz {
        return <ViewRewardKfwz><any>(fairygui.UIPackage.createObject("Arena", "ViewRewardKfwz"));
    }

    private _curData: VoTargetKfwz;

    public constructor() {
        super();
        this.loadRes("Arena", "Arena_atlas0");
    }

    protected childrenCreated() {
        GGlobal.createPack("Arena");
        this.view = fairygui.UIPackage.createObject("Arena", "ViewRewardKfwz").asCom;
        this.contentPane = this.view;
        CommonManager.parseChildren(this.view, this);

        this.initView();

        super.childrenCreated();
    }

    protected initView(): void {
        let t = this;
        t.itemList.itemRenderer = t.onItemRender;
        t.itemList.callbackThisObj = t;
        t.itemList.setVirtual();
    }

    //=========================================== API ==========================================
    protected onShown() {
        let t = this;
        t.registerEvent(true);
        t._curData = t._args;
        t.refreshData();
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
        let t = this;
        if (!t._curData)
            return;
        let t_dataList = t._curData.rewardList;
        if (t_dataList) {
            pItem.isShowEff = true;
            pItem.tipEnabled = true;
            pItem.vo = t_dataList[pIndex];
        }
    }

    private refreshData() {
        let t = this;
        let t_model = GGlobal.modelKfwz;
        if (t._curData) {
            let t_cur = t_model.winCount;
            let t_max = t._curData.cfg.cs;
            let t_color = Color.GREENSTR;
            if (t_cur < t_max) {
                t_color = Color.REDSTR;
            }
            t.tfDes.text = `今日胜场${t_max}场可领取<font color='${t_color}'>（${t_cur}/${t_max}）</font>`;
            t.itemList.numItems = t._curData.rewardList.length;

            t.stateCtrl.selectedIndex = t._curData.state;
        }
        else {
        }
    }

    private registerEvent(pFlag: boolean) {
        let t = this;
        GGlobal.control.register(pFlag, Enum_MsgType.KFWZ_UPDATE, t.onUpdate, t);
        EventUtil.register(pFlag, t.btnGet, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
    }
    //======================================== handler =========================================
    private onUpdate() {
        let t = this;
        t.refreshData();
    }

    private onBtnClick(e: egret.TouchEvent) {
        let t = this;
        let t_model = GGlobal.modelKfwz;
        switch (e.currentTarget) {
            case t.btnGet:
                //领取奖励
                if (t._curData) {
                    t_model.CG_CrossTeamKing_getReward_10849(t._curData.id);
                }
                break;
        }
    }
}