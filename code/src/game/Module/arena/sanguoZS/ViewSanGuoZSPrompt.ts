class ViewSanGuoZSPrompt extends UIModalPanel {

	public rankLb: fairygui.GRichTextField;
	public moneyLb: fairygui.GRichTextField;
	public t0: fairygui.Transition;
	public effImg: fairygui.GComponent;
	public maskSp: fairygui.GGraph;

	public static URL: string = "ui://me1skowln7xv35";

	public constructor() {
		super();
		this.isShowOpenAnimation = false;
		this.childrenCreated();
	}

	protected childrenCreated(): void {
		this.view = fairygui.UIPackage.createObject("Arena", "ViewSanGuoZSPrompt").asCom;
		this.contentPane = this.view;
		this.rankLb = <fairygui.GRichTextField><any>(this.view.getChild("rankLb"));
		this.moneyLb = <fairygui.GRichTextField><any>(this.view.getChild("moneyLb"));
		this.effImg = <fairygui.GComponent><any>(this.view.getChild("effImg"));
		this.maskSp = <fairygui.GGraph><any>(this.view.getChild("maskSp"));
		this.effImg.mask = this.maskSp.displayObject;
		super.childrenCreated();
	}

	protected onShown(): void {
		let rank = Model_SGZS.myRank;
		this.rankLb.text = "历史最高排名提高至：" + HtmlUtil.fontNoSize(rank + "", Color.getColorStr(2));
		this.moneyLb.text = Model_SGZS.lastMoney + "";
		GGlobal.layerMgr.UI_Popup.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.doHideAnimation, this);
	}

	protected onHide(): void {
		GGlobal.layerMgr.close(UIConst.SANGUO_ZHANSHEN_RANK_REWARD);
		GGlobal.layerMgr.UI_Popup.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.doHideAnimation, this);
	}
}