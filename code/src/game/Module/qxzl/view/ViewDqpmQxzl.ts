/**
 * 单枪匹马界面
 */
class ViewDqpmQxzl extends UIModalPanel{
	public tipsTxt: fairygui.GRichTextField;
	public lbYuanbao: fairygui.GRichTextField;
	public btnCancel: Button0;
	public btnOk: Button1;
    private _cost:number = 0;

	public static URL: string = "ui://6d8dzzdgvhu61l";

	public static createInstance(): ViewDqpmQxzl {
        return <ViewDqpmQxzl><any>(fairygui.UIPackage.createObject("qxzl", "View_Qxzl_Alert"));
    }

	public constructor() {
		super();
        this.loadRes("qxzl", "qxzl_atlas0");
	}

	protected childrenCreated() {
        GGlobal.createPack("qxzl");
        this.view = fairygui.UIPackage.createObject("qxzl", "View_Qxzl_Alert").asCom;
        this.contentPane = this.view;
        CommonManager.parseChildren(this.view, this);

        this.initView();

        super.childrenCreated();
    }

	protected initView(): void {
		let t = this;
		let cfg:Ixtcs_004 = Config.xtcs_004[7650];
		t._cost = Number(ConfigHelp.SplitStr(cfg.other)[0][2]);

        let cfg1:Ixtcs_004 = Config.xtcs_004[7651];
		t.tipsTxt.text = "是否花费" + t._cost + "元宝激活单枪匹马" + cfg1.num + "分钟，激活后可攻打任意敌国城池！";
		t.lbYuanbao.text = t._cost + "";
	}

    protected onShown() {
        let t = this;
        t.registerEvent(true);
    }

	protected onHide() {
        let t = this;
        t.registerEvent(false);
		GGlobal.layerMgr.close(UIConst.QXZL_DQPM);
    }

	public dispose() {
        super.dispose();
    }

	private registerEvent(pFlag: boolean) {
        let t = this;
        EventUtil.register(pFlag, t.btnCancel, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
		EventUtil.register(pFlag, t.btnOk, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
    }

	private onBtnClick(e: egret.TouchEvent) {
        let t = this;
        switch (e.currentTarget) {
            case t.btnCancel:
                GGlobal.layerMgr.close(UIConst.QXZL_DQPM);
                break;
			case t.btnOk:
                if(Model_player.voMine.yuanbao < t._cost)
                {
                    ViewCommonWarn.text("元宝不足");
                    return;
                }
                GGlobal.modelQxzl.CG_BuffBuy_8985();
                break;
        }
    }
}