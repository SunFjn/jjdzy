class ChildTipBagBySys extends fairygui.GComponent {

	public g22: fairygui.GImage;
	public lbDesTit: fairygui.GRichTextField;
	public img: fairygui.GImage;
	public imgDes: fairygui.GImage;
	public pic: fairygui.GLoader;
	public t0: fairygui.Transition;

	public static URL: string = "ui://jvxpx9emq2i93g3";

	public static createInstance(): ChildTipBagBySys {
		return <ChildTipBagBySys><any>(fairygui.UIPackage.createObject("common", "ChildTipBagBySys"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let self = this;
		CommonManager.parseChildren(self, self);
		self.t0 = self.getTransition("t0");
	}

	private sysEff: Part;
	private godWeaponEff: Part;
	public set vo(v: VoItem) {
		let self = this;
		let sys = (v as VoItem).cfg.sys
		let tz = v.tzPas;
		if (self.godWeaponEff) {
			EffectMgr.instance.removeEff(self.godWeaponEff);
			self.godWeaponEff = null;
		}
		self.t0.setPaused(false);
		let cfg1: Ibao_214 | Ibook_215 | Iyb_217 | Iclothes_212 | Ibook_213 | Isword_216;
		let effID = 0;
		switch (sys) {
			case UIConst.BAOWU:
				cfg1 = Config.bao_214[tz];
				IconUtil.setImg(self.pic, Enum_Path.PIC_URL + cfg1.pic + ".png");
				break;
			case UIConst.TIANSHU:
				cfg1 = Config.book_215[tz]
				IconUtil.setImg(self.pic, Enum_Path.PIC_URL + cfg1.pic + ".png");
				break;
			case UIConst.SHEN_JIAN:
				cfg1 = Config.sword_216[tz];
				effID = cfg1.tptx;
				IconUtil.setImg(self.pic, Enum_Path.PIC_URL + cfg1.pic + ".png");
				break;
			case UIConst.YIBAO:
				cfg1 = Config.yb_217[tz];
				effID = cfg1.tptx;
				IconUtil.setImg(self.pic, Enum_Path.PIC_URL + cfg1.pic + ".png");
				break;
			case UIConst.ZHAN_JIA:
				cfg1 = Config.clothes_212[tz];
				effID = cfg1.tptx;
				IconUtil.setImg(self.pic, Enum_Path.ZHANJIA_URL + cfg1.pic + ".png");
				break;
			case UIConst.BINGFA:
				cfg1 = Config.book_213[tz];
				effID = cfg1.tptx;
				IconUtil.setImg(self.pic, Enum_Path.PIC_URL + cfg1.pic + ".png");
				break;
			case UIConst.ZS_GODWEAPON:
				IconUtil.setImg(self.pic, null);
				let cfg7 = Config.sb_750[tz];
				self.godWeaponEff = EffectMgr.addEff("uieff/" + cfg7.picture, self.pic.displayObject as fairygui.UIContainer, self.pic.width / 2, self.pic.height / 2, 1000);
				break;
			case UIConst.SHAOZHU:
				IconUtil.setImg(self.pic, null);
				let cfg8 = Config.son_267[tz];
				self.t0.setPaused(true);
				self.godWeaponEff = EffectMgr.addEff("uieff/" + cfg8.zs, self.pic.displayObject as fairygui.UIContainer, self.pic.width / 2, self.pic.height, 1000);
				break;
			case UIConst.SHAOZHU_FASHION:
				IconUtil.setImg(self.pic, null);
				let cfg9 = Config.sonshow_267[tz];
				self.t0.setPaused(true);
				self.godWeaponEff = EffectMgr.addEff("uieff/" + cfg9.zs, self.pic.displayObject as fairygui.UIContainer, self.pic.width / 2, self.pic.height, 1000);
				break;
			case UIConst.QICE_STAR:
				let cfg10 = Config.qc_760[tz];
				IconUtil.setImg(self.pic, Enum_Path.PIC_URL + cfg10.pic + ".png");
				break;
			case UIConst.HORSE:
			case UIConst.HORSE_HH:
				IconUtil.setImg(self.pic, null);
				self.t0.setPaused(true);
				let cfgHorse = Config.zq_773[tz];
				self.godWeaponEff = EffectMgr.addEff("body/" + cfgHorse.model + "/ride_st/ani", self.pic.displayObject as fairygui.UIContainer, self.pic.width / 2, self.pic.height, 1000);
				break;
		}
		if (self.sysEff) {
			EffectMgr.instance.removeEff(self.sysEff);
			self.sysEff = null;
		}
		if (effID > 0) {
			self.sysEff = EffectMgr.addEff("uieff/" + effID, self.pic.displayObject as fairygui.UIContainer, self.pic.width / 2, self.pic.height / 2, 1000, -1, true);
		}
	}

	public clean() {
		let self = this;
		IconUtil.setImg(self.pic, null);
		if (self.godWeaponEff) {
			EffectMgr.instance.removeEff(self.godWeaponEff);
			self.godWeaponEff = null;
		}
		if (self.sysEff) {
			EffectMgr.instance.removeEff(self.sysEff);
			self.sysEff = null;
		}
	}
}