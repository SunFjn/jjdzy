class VWuJiangGrid extends fairygui.GButton {

	public labName: fairygui.GTextField;
	public bg: fairygui.GLoader;
	public imgIcon: fairygui.GLoader;
	public selectImg: fairygui.GImage;
	public imgBattle: fairygui.GImage;
	public starLb: fairygui.GRichTextField;
	public starGroup: fairygui.GGroup;
	public maskBg: fairygui.GImage;
	public sourceLb: fairygui.GRichTextField;
	public sourceGroup: fairygui.GGroup;
	public noticeImg: fairygui.GImage;

	public static URL: string = "ui://zyx92gzwtht45";

	public static createInstance(): VWuJiangGrid {
		return <VWuJiangGrid><any>(fairygui.UIPackage.createObject("wuJiang", "VWuJiangGrid"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let self = this
		CommonManager.parseChildren(self, self);
	}

	public godWeaponVo: Vo_ZSGodWeapon;
	private _vo: Ihero_211
	public set vo(v: Ihero_211) {
		let self = this;
		self._vo = v;
		var star = Model_WuJiang.wuJiangStar[v.type]
		self.labName.text = Model_WuJiang.createWuJiangColorName(v.type);
		self.labName.color = Color.getColorInt(Model_WuJiang.getHeroQuality(v))
		self.imgBattle.visible = v.type == Model_player.voMine.job
		if (Model_WuJiang.isActivation(v.type)) {
			self.starLb.text = star + ""
			self.starGroup.visible = true;
			if (Model_WuJiang.isGodWuJiang(v.type)) {
				self.starGroup.visible = false;
			}
			self.maskBg.visible = false;
			self.sourceGroup.visible = false;
		} else {
			self.starGroup.visible = false;
			self.sourceGroup.visible = false;
			self.maskBg.visible = true;
			self.sourceLb.text = v.way;
		}
		ImageLoader.instance.loader(Enum_Path.HEAD_URL + v.head + ".png", self.imgIcon);
		ImageLoader.instance.loader(Enum_Path.ICON70_URL + "BmG_" + Model_WuJiang.getHeroQuality(v) + ".png", self.bg);
		self.setNot();
	}

	public get vo() {
		return this._vo;
	}

	public setNot() {
		const v = this.vo;
		if (ViewWuJiangPanel._selPage == 0) {
			this.noticeImg.visible = Model_WuJiang.checkStarVo(v) || GGlobal.reddot.checkCondition(UIConst.WUJIANGZHILI, v.type) || GGlobal.reddot.checkCondition(UIConst.WUJIANGZHILI_SKILL, v.type);
		} else if (ViewWuJiangPanel._selPage == 2) {
			this.noticeImg.visible = ModelGodWuJiang.checkJiHuoNotice(v.type) || ModelGodWuJiang.checkXiulianNotice(v.type);
		} else {
			if (Model_WuJiang.hasShiZhuang(v.type)) {//武将 //神将
				this.noticeImg.visible = Model_WuJiang.SZCheck(v) && (Model_WuJiang.wuJiangStar[v.type] || ModelGodWuJiang.getWuJiangIsActivation(v.type));
			} else {
				this.noticeImg.visible = false;
			}
		}

	}

	public setSuitVo(v: Ihero_211) {
		this.vo = v;
		this.imgBattle.visible = false
		this.noticeImg.visible = false;
	}
}