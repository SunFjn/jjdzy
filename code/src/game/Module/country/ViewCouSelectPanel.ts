class ViewCouSelectPanel extends UIPanelBase {

	public c1: fairygui.Controller;
	public frame: fairygui.GComponent;
	public tab1: fairygui.GButton;
	public tab0: fairygui.GButton;
	public tab2: fairygui.GButton;
	public btnJion: fairygui.GButton;
	public btnRandom: fairygui.GButton;
	public labReward: fairygui.GTextField;

	public static URL: string = "ui://uwzc58njlz1x1";

	public static createInstance(): ViewCouSelectPanel {
		return <ViewCouSelectPanel><any>(fairygui.UIPackage.createObject("country", "ViewCouSelectPanel"));
	}

	public constructor() {
		super();
		this.setSkin("country", "country_atlas0", "ViewCouSelectPanel");
	}

	protected initView(): void {
		super.initView();
	}

	protected onShown(): void {
		let self = this;
		IconUtil.setImg(self.tab0.getChild("n0").asLoader, Enum_Path.IMAGE_MODULES_URL + "country/countrybg.png");
		IconUtil.setImg(self.tab1.getChild("n0").asLoader, Enum_Path.IMAGE_MODULES_URL + "country/countrybg.png");
		IconUtil.setImg(self.tab2.getChild("n0").asLoader, Enum_Path.IMAGE_MODULES_URL + "country/countrybg.png");
		IconUtil.setImg(self.tab0.getChild("icon").asLoader, Enum_Path.IMAGE_MODULES_URL + "country/country1.png");
		IconUtil.setImg(self.tab1.getChild("icon").asLoader, Enum_Path.IMAGE_MODULES_URL + "country/country2.png");
		IconUtil.setImg(self.tab2.getChild("icon").asLoader, Enum_Path.IMAGE_MODULES_URL + "country/country3.png");
		self.addListen();
		self.updateView();
	}

	protected onHide(): void {
		let self = this;
		IconUtil.setImg(self.tab0.getChild("n0").asLoader, null);
		IconUtil.setImg(self.tab1.getChild("n0").asLoader, null);
		IconUtil.setImg(self.tab2.getChild("n0").asLoader, null);
		IconUtil.setImg(self.tab0.getChild("icon").asLoader, null);
		IconUtil.setImg(self.tab1.getChild("icon").asLoader, null);
		IconUtil.setImg(self.tab2.getChild("icon").asLoader, null);
		this.removeListen();
	}

	private addListen(): void {
		this.btnJion.addClickListener(this.onJoin, this);
		this.btnRandom.addClickListener(this.onRandom, this);
		GGlobal.control.listen(Enum_MsgType.COUNTRY_UPDATE, this.onHide, this);
	}

	private removeListen(): void {
		this.btnJion.removeClickListener(this.onJoin, this);
		this.btnRandom.removeClickListener(this.onRandom, this);
		GGlobal.control.remove(Enum_MsgType.COUNTRY_UPDATE, this.onHide, this);
		GGlobal.layerMgr.close(UIConst.COUNTRY_SELECT);
	}

	private updateView(): void {
		this.labReward.text = ConfigHelp.getSystemNum(3401) + ""
	}

	private onJoin(): void {
		ViewAlert.show("确定加入" + Model_Country.getCountryName(this.c1.selectedIndex + 1) + "？", Handler.create(this, function func() {
			GGlobal.modelCountry.CG_SELECT_COUNTRY(this.c1.selectedIndex + 1);
		}, null, true), ViewAlert.OKANDCANCEL, "确定", "取消");
	}

	private onRandom(): void {
		GGlobal.modelCountry.CG_RANDOM_COUNTRY()
	}

	public guide_country_random_join(step) {
		let self = this;
		GuideStepManager.instance.showGuide(self.btnRandom, self.btnRandom.width / 2, self.btnRandom.height / 2);
		GuideStepManager.instance.showGuide1(step.source.index, self.btnRandom, self.btnRandom.width / 2, 0, -90, -106, -100);
		if (self.btnRandom.parent) self.btnRandom.parent.setChildIndex(self.btnRandom, self.btnRandom.parent.numChildren - 1);
	}
}