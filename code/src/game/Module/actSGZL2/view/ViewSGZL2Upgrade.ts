/**
 * 三国战令（活动）进阶面板
 * @author: lujiahao 
 * @date: 2019-11-15 16:18:23 
 */
class ViewSGZL2Upgrade extends UIModalPanel {

    //>>>>start
    public stateCtrl: fairygui.Controller;
    public btnGo: Button0;
    public tfDes: fairygui.GRichTextField;
    public imgHead: fairygui.GLoader;
    //>>>>end

    public static URL: string = "ui://ggwi8wepqhocn";

    public static createInstance(): ViewSGZL2Upgrade {
        return <ViewSGZL2Upgrade><any>(fairygui.UIPackage.createObject("actComSgzl2", "ViewSGZL2Upgrade"));
    }

    public constructor() {
        super();
        this.loadRes("actComSgzl2", "actComSgzl2_atlas0");
    }

    protected childrenCreated() {
        GGlobal.createPack("actComSgzl2");
        this.view = fairygui.UIPackage.createObject("actComSgzl2", "ViewSGZL2Upgrade").asCom;
        this.contentPane = this.view;
        CommonManager.parseChildren(this.view, this);

        this.initView();

        super.childrenCreated();
    }

    protected initView(): void {
        this.btnGo.getTextField().stroke = 2;
    }

    //=========================================== API ==========================================
    private _cfgID;
    protected onShown() {
        let t = this;
        t._cfgID = t._args
        this.refreshData();
        this.registerEvent(true);
    }

    protected onHide() {
        this.registerEvent(false);
        //关闭界面时候重新请求数据
        GGlobal.modelActivity.CG_OPENACT(UIConst.ACTCOM_SGZL2); //重新请求更新奖励列表数据
    }
    //===================================== private method =====================================
    private refreshData() {
        this.stateCtrl.selectedIndex = GGlobal.modelSGZL2.upgradeFlag;

        let cfg = Config.sgzljin_332[this._cfgID]
        this.tfDes.text = cfg.wz
        IconUtil.setImg(this.imgHead, RoleUtil.getHeadRole(cfg.zy));
    }

    private registerEvent(pFlag: boolean) {
        GGlobal.control.register(pFlag, Enum_MsgType.SGZL2_REWARD_UPDATE, this.onUpdate, this);

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
                let t_qs = GGlobal.modelSGZL2.getCurQs();
                for (let key in Config.sgzljin_332) {
                    let cfg = Config.sgzljin_332[key];
                    if (cfg.qs == t_qs) {
                        let t_charCfg = Config.shop_011[cfg.shangpin];
                        if (t_charCfg) {
                            let t_tips = "充值168元后即可领取进阶奖励！";
                            GGlobal.modelchongzhi.CG_CHONGZHI_135(cfg.shangpin, t_tips, false);
                        }
                        break;
                    }
                }
                break;
        }
    }
}