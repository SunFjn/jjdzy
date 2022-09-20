class VZSGodWeaponGrid extends fairygui.GButton {

	public labName: fairygui.GTextField;
	public bg: fairygui.GLoader;
	public imgIcon: fairygui.GLoader;
	public selectImg: fairygui.GImage;
	public imgBattle: fairygui.GImage;
	public starLb: fairygui.GRichTextField;
	public starGroup: fairygui.GGroup;
	public maskBg: fairygui.GImage;
	public noticeImg: fairygui.GImage;

	public static URL: string = "ui://zyx92gzwhi633y";

	public static createInstance(): VWuJiangGrid {
		return <VWuJiangGrid><any>(fairygui.UIPackage.createObject("wuJiang", "VZSGodWeaponGrid"));
	}

	public constructor() {
		super();
	}


	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let self = this
		CommonManager.parseChildren(self, self);
	}

	private _vo: Vo_ZSGodWeapon
	public set vo(v: Vo_ZSGodWeapon) {
		let self = this;
		self._vo = v;
		self.labName.text = v.cfg.name;
		self.labName.color = Color.getColorInt(v.quality);
		self.imgBattle.visible = v.job == Model_player.voMine.job
		if (v.starLv > 0) {
			self.starLb.text = v.starLv + ""
			self.starGroup.visible = true;
			self.maskBg.visible = false;
		} else {
			self.starGroup.visible = false;
			self.maskBg.visible = true;
		}
		ImageLoader.instance.loader(Enum_Path.ICON70_URL + v.cfg.tupian + ".png", self.imgIcon);
		ImageLoader.instance.loader(Enum_Path.ICON70_URL + "BmG_" + Model_WuJiang.getHeroQuality(v.wujiangVo) + ".png", self.bg);
	}

	public get vo() {
		return this._vo;
	}

	public setNot(value: boolean) {
		this.noticeImg.visible = value;
	}

	public setSuitVo(v: Vo_ZSGodWeapon) {
		let self = this;
		self.imgBattle.visible = false
		self.noticeImg.visible = false;
		self._vo = v;
		self.labName.text = v.cfg.name;
		self.labName.color = Color.getColorInt(v.quality);
		if (v.starLv > 0) {
			self.starLb.text = v.starLv + ""
			self.starGroup.visible = true;
			self.maskBg.visible = false;
		} else {
			self.starGroup.visible = false;
			self.maskBg.visible = true;
		}
		let itemVo = ConfigHelp.makeItemListArr(v.costArr)[0];
		ImageLoader.instance.loader(Enum_Path.ICON70_URL + itemVo.icon + ".png", self.imgIcon);
		ImageLoader.instance.loader(Enum_Path.ICON70_URL + "BmG_" + itemVo.quality + ".png", self.bg);
	}
}