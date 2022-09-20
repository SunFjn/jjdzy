/**
 * 三国战令进阶面板
 * @author: lujiahao 
 * @date: 2019-09-20 14:59:18 
 */
class ViewSGZLUpgrade extends UIModalPanel {

    //>>>>start
	public stateCtrl: fairygui.Controller;
	public btnGo: Button0;
	public tfDes: fairygui.GRichTextField;
	//>>>>end

    public static URL: string = "ui://d5y9ngt6tvlr27";

    public static createInstance(): ViewSGZLUpgrade {
        return <ViewSGZLUpgrade><any>(fairygui.UIPackage.createObject("actHolyBeast", "ViewSGZLUpgrade"));
    }

    public constructor() {
        super();
        this.loadRes("actHolyBeast", "actHolyBeast_atlas0");
    }

    protected childrenCreated() {
        GGlobal.createPack("actHolyBeast");
        this.view = fairygui.UIPackage.createObject("actHolyBeast", "ViewSGZLUpgrade").asCom;
        this.contentPane = this.view;
        CommonManager.parseChildren(this.view, this);

        this.initView();

        super.childrenCreated();
    }

    protected initView(): void {
        this.btnGo.getTextField().stroke = 2;
    }

    //=========================================== API ==========================================
    protected onShown() {
        let t = this;
        this.refreshData();
        this.registerEvent(true);
    }

    protected onHide() {
        this.registerEvent(false);
        //关闭界面时候重新请求数据
        GGlobal.modelEightLock.CG4571(UIConst.ACTHB_SGZL); //重新请求更新奖励列表数据
    }
    //===================================== private method =====================================
    private refreshData() {
        this.stateCtrl.selectedIndex = GGlobal.modelSGZL.upgradeFlag;
    }

    private registerEvent(pFlag: boolean) {
        GGlobal.control.register(pFlag, Enum_MsgType.SGZL_REWARD_UPDATE, this.onUpdate, this);

        EventUtil.register(pFlag, this.btnGo, egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
    }
    //======================================== handler =========================================
    private onUpdate() {
        this.refreshData();
    }

    private onBtnClick(e: egret.TouchEvent) {
        switch (e.currentTarget) {
            case this.btnGo:
                //需要判断充值过没有，没有充值过的话，都是打开首充界面
                // ViewChongZhi.tryToOpenCZ();
                let t_chargeId = Config.sgzljin_017[1].shangpin;
                let t_charCfg = Config.shop_011[t_chargeId];
                if (t_charCfg) {
                    let t_tips = "充值168元后即可领取进阶奖励！";
                    GGlobal.modelchongzhi.CG_CHONGZHI_135(t_chargeId, t_tips, false);
                }
                break;
        }
    }
}