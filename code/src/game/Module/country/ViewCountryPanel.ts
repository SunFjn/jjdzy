class ViewCountryPanel extends UIPanelBase {

	public btn00: VCountryBtn;
	public btn01: VCountryBtn;
	public btn10: VCountryBtn;
	public btn20: VCountryBtn;
	public btn11: VCountryBtn;
	public btn21: VCountryBtn;
	public btnSkill: Button1;
	public lab0: fairygui.GTextField;
	public labName0: fairygui.GTextField;
	public lab1: fairygui.GTextField;
	public labName1: fairygui.GTextField;
	public lab2: fairygui.GTextField;
	public labName2: fairygui.GTextField;
	public img: fairygui.GLoader;
	public viewHead: ViewHead;

	public static URL: string = "ui://uwzc58njhy5r0";

	public static createInstance(): ViewCountryPanel {
		return <ViewCountryPanel><any>(fairygui.UIPackage.createObject("country", "ViewCountryPanel"));
	}

	public constructor() {
		super();
		this.setSkin("country", "country_atlas0", "ViewCountryPanel");
	}
	protected setExtends() {
		fairygui.UIObjectFactory.setPackageItemExtension(VCountryBtn.URL, VCountryBtn);
	}

	protected initView(): void {
		super.initView();
	}

	private _first: boolean = true;
	protected onShown(): void {
		let s = this;
		s.addListen();
		s.updateView();
		GGlobal.modelCountry.CG_OPENUI();
		if (s._first) {//红点需要
			GGlobal.modelCountry.CG_COUNTRY_DONATION();
			s._first = false;
		}
		s.btn00.setIcon(1);
		s.btn01.setIcon(2);
		s.btn10.setIcon(3);
		s.btn11.setIcon(4);
		s.btn20.setIcon(7);
		// s.btn20.touchable = false;
		s.btn21.setIcon(6);
		s.btn21.touchable = false;
		// s.btn21.visible = false;
	}

	protected onHide(): void {
		this.removeListen();
	}

	private addListen(): void {
		let s = this;
		s.btn00.addClickListener(s.openView00, s);
		s.btn10.addClickListener(s.openView10, s);
		s.btn20.addClickListener(s.openView20, s);
		s.btn01.addClickListener(s.openView01, s);
		s.btn11.addClickListener(s.openView11, s);
		s.btn21.addClickListener(s.openView21, s);
		s.btnSkill.addClickListener(s.openSkill, s);
		GGlobal.control.listen(Enum_MsgType.COUNTRY_OPEN_UI, s.updateView, s)
		GGlobal.control.listen(Enum_MsgType.COUNTRY_DONATE_UPDATE, s.updateView, s)
		GGlobal.reddot.listen(ReddotEvent.CHECK_COUNTRY, s.checkNoticce, s);
		GGlobal.reddot.listen(UIConst.COUNTRY_SKILL, s.checkNoticce, s);
	}

	private removeListen(): void {
		let s = this;
		s.btn00.removeClickListener(s.openView00, s);
		s.btn10.removeClickListener(s.openView10, s);
		s.btn20.removeClickListener(s.openView20, s);
		s.btn01.removeClickListener(s.openView01, s);
		s.btn11.removeClickListener(s.openView11, s);
		s.btn21.removeClickListener(s.openView21, s);
		s.btnSkill.removeClickListener(s.openSkill, s);
		GGlobal.control.remove(Enum_MsgType.COUNTRY_OPEN_UI, s.updateView, s)
		GGlobal.control.remove(Enum_MsgType.COUNTRY_DONATE_UPDATE, s.updateView, s)
		GGlobal.reddot.remove(ReddotEvent.CHECK_COUNTRY, s.checkNoticce, s);
		GGlobal.reddot.remove(UIConst.COUNTRY_SKILL, s.checkNoticce, s);
		GGlobal.layerMgr.close(UIConst.COUNTRY);
		IconUtil.setImg(s.img, null);
		IconUtil.setImg(s.frame.getChild("icon").asLoader, null);
	}

	private updateView(): void {
		let s = this;
		IconUtil.setImg(s.frame.getChild("icon").asLoader, Model_Country.getCountryUrl(Model_player.voMine.country));
		s.labName0.text = Model_Country.kingName ? Model_Country.kingName : "虚位以待";
		s.labName1.text = Model_Country.ministerName ? Model_Country.ministerName : "虚位以待";
		s.labName2.text = Model_Country.genName ? Model_Country.genName : "虚位以待";

		var ctrName = Model_Country.getCouNameMin(Model_player.voMine.country)
		s.lab0.text = ctrName + "王"
		s.lab1.text = "【" + ctrName + "】丞相："
		s.lab2.text = "【" + ctrName + "】大将军："

		IconUtil.setImg(s.img, s.getCouFlag(Model_player.voMine.country));

		if (Model_Country.kingName) {
			s.viewHead.setdata(Model_Country.kingHead, Model_Country.kingLv, "", -1, false, Model_Country.kingFrame);
		} else {
			s.viewHead.setdata(null);
		}
		s.checkNoticce();
	}

	private checkNoticce(): void {
		let s = this;
		let r = GGlobal.reddot;
		s.btn00.checkNotice = r.checkCondition(UIConst.COUNTRY_DONATE);//Model_Country.checkDonate();
		s.btn10.checkNotice = r.checkCondition(UIConst.NANZHENG_BEIZHAN);
		s.btn11.checkNotice = r.checkCondition(UIConst.COUNTRY_KINGSHIP);
		s.btn20.checkNotice = r.checkCondition(UIConst.COUNTRY_BOSS);
		s.btnSkill.checkNotice = r.checkCondition(UIConst.COUNTRY_SKILL);
	}


	private getCouFlag(c: number): string {
		return Enum_Path.IMAGE_MODULES_URL + "country/countrya" + c + ".png";
	}

	private openView00(e: egret.TouchEvent): void {
		GGlobal.layerMgr.open(UIConst.COUNTRY_DONATE);
	}

	private openView10(e: egret.TouchEvent): void {
		GGlobal.layerMgr.open(UIConst.NANZHENG_BEIZHAN);
	}

	private openView20(e: egret.TouchEvent): void {
		// ViewCommonWarn.text("功能暂未开放");
		GGlobal.layerMgr.open(UIConst.COUNTRY_BOSS);
	}

	private openView01(e: egret.TouchEvent): void {
		GGlobal.layerMgr.open(UIConst.SHOP, Config.stroe_218[2].px);
	}

	private openView11(e: egret.TouchEvent): void {
		GGlobal.layerMgr.open(UIConst.COUNTRY_KINGSHIP);
	}

	private openView21(e: egret.TouchEvent): void {
		ViewCommonWarn.text("功能暂未开放");
	}

	private openSkill() {
		GGlobal.layerMgr.open(UIConst.COUNTRY_SKILL);
	}

	public guidePage(step) {
		let self = this;
		if (step.arg == UIConst.NANZHENG_BEIZHAN) {
			GuideStepManager.instance.showGuide(self.btn10, self.btn10.width / 2, self.btn10.height / 2);
			GuideStepManager.instance.showGuide1(step.source.index, self.btn10, self.btn10.width / 2, 0, -90, -106, -100);
			if (self.btn10.parent) self.btn10.parent.setChildIndex(self.btn10, self.btn10.parent.numChildren - 1);
		}
	}
}