class View_NZBZ_SaoDang extends UIModalPanel {

	public sureBt: fairygui.GButton;
	public rewardLb: fairygui.GRichTextField;

	public static URL: string = "ui://xzyn0qe381i01b";

	public constructor() {
		super();
		this.childrenCreated();
	}

	protected childrenCreated(): void {
		let a = this;
		a.view = fairygui.UIPackage.createObject("nzbz", "View_NZBZ_SaoDang").asCom;
		a.contentPane = a.view;
		a.sureBt = <fairygui.GButton><any>(a.view.getChild("sureBt"));
		a.rewardLb = <fairygui.GRichTextField><any>(a.view.getChild("rewardLb"));
		a.isShowOpenAnimation = false;
		super.childrenCreated();
		a.sureBt.addClickListener(a.sureHandler, a);
	}

	private sureHandler() {
		this.doHideAnimation();
	}

	protected onShown(): void {
		if (!this._args) return;
		let arr: IGridImpl[] = this._args;
		let rewardStr0: string = "";
		let rewardStr1: string = "";
		let rewardStr2: string = HtmlUtil.fontNoSize("积分    ", Color.getColorStr(2)) + "+" + Model_NZBZ.addJiFen;
		for (let i = 0; i < arr.length; i++) {
			let vo = arr[i];
			if (vo.gType == Enum_Attr.PRESTIGE) {
				rewardStr0 = HtmlUtil.fontNoSize("声望", Color.getColorStr(2)) + "           +" + vo.count;
			} else if (vo.gType == Enum_Attr.GONGXUN) {
				rewardStr1 = HtmlUtil.fontNoSize("功勋", Color.getColorStr(2)) + "           +" + vo.count;
			}
		}
		this.rewardLb.text = rewardStr0 + "\n" + rewardStr1 + "\n" + rewardStr2;
	}

	protected onHide(): void {
		GGlobal.layerMgr.close(UIConst.NANZHENG_BEIZHAN_SAODANG);
	}
}