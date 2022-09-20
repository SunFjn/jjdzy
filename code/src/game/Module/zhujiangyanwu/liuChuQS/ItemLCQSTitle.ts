class ItemLCQSTitle extends fairygui.GComponent {

	public imgBg: fairygui.GLoader;
	public lbHelpMe: fairygui.GRichTextField;
	public lbHelpOth: fairygui.GRichTextField;
	public btnSM: fairygui.GButton;

	public static URL: string = "ui://7a366usaloov1t";

	public static createInstance(): ItemLCQSTitle {
		return <ItemLCQSTitle><any>(fairygui.UIPackage.createObject("zjyw", "ItemLCQSTitle"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		CommonManager.parseChildren(this, this);
	}

	public addListen() {
		IconUtil.setImg(this.imgBg, Enum_Path.GUAN_QIA_URL + "lcqsBg.png");
		this.btnSM.addClickListener(this.onShuoMing, this);
		GGlobal.model_LiuChuQS.listen(Model_LiuChuQS.openui, this.onUpdate, this);
		this.onUpdate();
	}

	public removeListen() {
		IconUtil.setImg(this.imgBg, null);
		this.btnSM.removeClickListener(this.onShuoMing, this);
		GGlobal.model_LiuChuQS.remove(Model_LiuChuQS.openui, this.onUpdate, this);
	}

	private onShuoMing() {
		GGlobal.layerMgr.open(UIConst.WFSM_PANEL, UIConst.CHILD_LCQS);
	}

	private onUpdate() {
		let s = this;
		let m = GGlobal.model_LiuChuQS;
		s.lbHelpMe.text = "今日求助次数：" + m.helpMeCt + "/" + ConfigHelp.getSystemNum(6901)
		s.lbHelpOth.text = "今日帮助次数：" + m.helpOthCt + "/" + ConfigHelp.getSystemNum(6902)
	}
}