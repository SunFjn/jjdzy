class ViewJingShengPrompt extends UIModalPanel {

	public maskSp: fairygui.GGraph;
	public effImg: fairygui.GComponent;
	public rankLb: fairygui.GRichTextField;
	public moneyLb0: fairygui.GRichTextField;
	public moneyLb1: fairygui.GRichTextField;
	public t0: fairygui.Transition;
	public n12: fairygui.GImage;

	public static URL: string = "ui://dllc71i9myon1i";

	public constructor() {
		super();
		this.childrenCreated();
	}

	protected childrenCreated(): void {
		let a = this;
		a.view = fairygui.UIPackage.createObject("rebirth", "ViewJingShengPrompt").asCom;
		a.contentPane = a.view;
		a.maskSp = <fairygui.GGraph><any>(a.view.getChild("maskSp"));
		a.effImg = <fairygui.GComponent><any>(a.view.getChild("effImg"));
		a.rankLb = <fairygui.GRichTextField><any>(a.view.getChild("rankLb"));
		a.moneyLb0 = <fairygui.GRichTextField><any>(a.view.getChild("moneyLb0"));
		a.moneyLb1 = <fairygui.GRichTextField><any>(a.view.getChild("moneyLb1"));
		a.n12 = <fairygui.GImage><any>(a.view.getChild("n12"));
		a.t0 = a.view.getTransition("t0");
		a.effImg.mask = a.maskSp.displayObject;
		super.childrenCreated();
	}

	protected onShown(): void {
		let a = this;
		let cfg = Config.up_231[Model_JinSheng.level];
		this.rankLb.text = "恭喜晋升达到" + HtmlUtil.fontNoSize(cfg.pin + cfg.name, Color.getColorStr(2));
		let rewardArr = ConfigHelp.makeItemListArr(JSON.parse(cfg["reward"]));
		a.moneyLb1.visible = false;
		a.n12.visible = false;
		if (Model_GlobalMsg.kaifuDay <= 7 && cfg["time"] != "0") {
			a.moneyLb0.text = rewardArr[0].count + " +";
			let rewardArr1 = ConfigHelp.makeItemListArr(JSON.parse(cfg["time"]));
			a.moneyLb1.visible = true;
			a.n12.visible = true;
			a.moneyLb1.text = rewardArr1[0].count + "";
		} else {
			a.moneyLb0.text = rewardArr[0].count + "";
		}
		GGlobal.layerMgr.UI_Popup.addEventListener(egret.TouchEvent.TOUCH_BEGIN, a.doHideAnimation, a);
	}

	protected onHide(): void {
		GGlobal.layerMgr.close(UIConst.JINSHENG_PROMPT);
		GGlobal.layerMgr.UI_Popup.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.doHideAnimation, this);
	}
}