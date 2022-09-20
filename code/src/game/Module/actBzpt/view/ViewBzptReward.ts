/**
 * @author: lujiahao 
 * @date: 2019-10-25 13:55:50 
 */
class ViewBzptReward extends UIModalPanel {

    //>>>>start
    public stateCtrl: fairygui.Controller;
    public frame: fairygui.GLabel;
    public itemList: fairygui.GList;
    public btnGo: Button0;
    public btnGet: Button1;
    public imageGet: fairygui.GImage;
    //>>>>end

    public static URL: string = "ui://twm3bfyglploc";

    private _curVo: VoBoxBzpt;

    public constructor() {
        super();
        this.loadRes("actBzpt", "actBzpt_atlas0");
    }

    protected childrenCreated() {
        GGlobal.createPack("actBzpt");
        this.view = fairygui.UIPackage.createObject("actBzpt", "ViewBzptReward").asCom;
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
        t.refreshData();
        t.registerEvent(true);
    }

    protected onHide() {
        let t = this;
        t.registerEvent(false);
        t.itemList.numItems = 0;
    }

    //===================================== private method =====================================
    private refreshData() {
        let t = this;
        if (t._curVo) {
            t.itemList.numItems = t._curVo.rewardList.length;
            t.stateCtrl.selectedIndex = t._curVo.state;
            if (t._curVo.state == 1)
                t.btnGet.noticeImg.visible = true;
            else
                t.btnGet.noticeImg.visible = false;
        }
        else {

        }
    }

    private onItemRender(pIndex: number, pItem: ViewGrid) {
        let t = this;
        if (t._curVo && t._curVo.rewardList) {
            let t_list = t._curVo.rewardList;
            pItem.isShowEff = true;
            pItem.tipEnabled = true;
            pItem.vo = t_list[pIndex];
        }
    }

    private registerEvent(pFlag: boolean): void {
        let t = this;
        GGlobal.control.register(pFlag, Enum_MsgType.BZPT_BOX_OPEN, t.onRewardUpdate, t);

        EventUtil.register(pFlag, t.btnGet, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        EventUtil.register(pFlag, t.btnGo, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
    }

    //======================================== handler =========================================
    private onRewardUpdate() {
        this.refreshData();
    }

    private onBtnClick(e: egret.TouchEvent) {
        let t = this;
        if (!t._curVo)
            return;
        switch (e.currentTarget) {
            case t.btnGo:
                // t.closeView();
                ViewCommonWarn.text("领取条件不足");
                break;

            case t.btnGet:
                GGlobal.modelBzpt.CG_BaoZangPinTu_gotAward_10653(t._curVo.id);
                break;
        }
    }
}