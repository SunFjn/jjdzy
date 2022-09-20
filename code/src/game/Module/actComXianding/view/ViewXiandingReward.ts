/**
 * 活跃度奖励面板
 * @author: lujiahao 
 * @date: 2019-09-16 11:29:27 
 */
class ViewXiandingReward extends UIModalPanel {

    //>>>>start
    public stateCtrl: fairygui.Controller;
    public frame: fairygui.GLabel;
    public itemList: fairygui.GList;
    public btnGo: Button0;
    public btnGet: Button1;
    public imageGet: fairygui.GImage;
    //>>>>end

    public static URL: string = "ui://s98a5pruucru6";

    private _curVo: VoXiandingReward;

    public constructor() {
        super();
        this.loadRes("actComXianding", "actComXianding_atlas0");
    }

    protected childrenCreated() {
        GGlobal.createPack("actComXianding");
        this.view = fairygui.UIPackage.createObject("actComXianding", "ViewXiandingReward").asCom;
        this.contentPane = this.view;
        CommonManager.parseChildren(this.view, this);

        this.initView();

        super.childrenCreated();
    }

    protected initView(): void {
        this.itemList.itemRenderer = this.onItemRender;
        this.itemList.callbackThisObj = this;
        // this.itemList.setVirtual();
    }

    //=========================================== API ==========================================
    protected onShown() {
        let t = this;
        t._curVo = t._args;
        this.refreshData();
        this.registerEvent(true);
    }

    protected onHide() {
        this.registerEvent(false);
        this.itemList.numItems = 0;
    }

    //===================================== private method =====================================
    private refreshData() {
        let t = this;
        if (t._curVo) {
            this.itemList.numItems = t._curVo.rewardList.length;
            this.stateCtrl.selectedIndex = t._curVo.state;
            if (t._curVo.state == Enum_Xianding.TASK_STATE_CAN_GET)
                this.btnGet.noticeImg.visible = true;
            else
                this.btnGet.noticeImg.visible = false;
        }
        else {
        }
    }

    private onItemRender(pIndex: number, pItem: ViewGrid) {
        if (this._curVo && this._curVo.rewardList) {
            let t_list = this._curVo.rewardList;
            pItem.isShowEff = true;
            pItem.tipEnabled = true;
            pItem.vo = t_list[pIndex];
        }
    }

    private registerEvent(pFlag: boolean): void {
        GGlobal.control.register(pFlag, Enum_MsgType.XIANDING_REWARD_UPDATE, this.onRewardUpdate, this);

        EventUtil.register(pFlag, this.btnGet, egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
        EventUtil.register(pFlag, this.btnGo, egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
    }

    //======================================== handler =========================================
    private onRewardUpdate() {
        this.refreshData();
    }

    private onBtnClick(e: egret.TouchEvent) {
        if (!this._curVo)
            return;
        switch (e.currentTarget) {
            case this.btnGo:
                // this.closeView();
                ViewCommonWarn.text("领取条件不足");
                break;

            case this.btnGet:
                GGlobal.modelXianding.cmdSendGetScoreReward(this._curVo.id);
                break;
        }
    }
}