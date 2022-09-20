class View_chat_BaoWu extends UIModalPanel {

	public ownerLb: fairygui.GLabel;
	public nameLb: fairygui.GLabel;
	public powerLb: fairygui.GLabel;
	public sjIcon: fairygui.GLoader;
	public starLb: fairygui.GRichTextField;
	public t0: fairygui.Transition;
	public backIcon: fairygui.GLoader;
	public static URL: string = "ui://fx4pr5qewjpa2a";

	public constructor() {
		super();
		this.childrenCreated();
	}
	protected childrenCreated(): void {
		let s = this;
		s.view = fairygui.UIPackage.createObject("chat", "View_chat_BaoWu").asCom;
		s.contentPane = s.view;
		CommonManager.parseChildren(s.view, s);
		super.childrenCreated();
	}

	private sysEff: Part;
	private godWeaponEff: Part;
	//1图鉴2宝物3兵法4异宝5神剑6战甲7天书8武将10神兵
	/**614001 ID _1 星级_1 等阶_37500 战力*/
	private updateShow() {
		let self = this;
		let vo: Vo_Chat = this._args;
		let arr = vo.content.split("_");
		self.ownerLb.text = "拥有者：" + vo.name;
		let cfg;
		if (self.godWeaponEff) {
			EffectMgr.instance.removeEff(self.godWeaponEff);
			self.godWeaponEff = null;
		}
		let effID = 0;
		switch (vo.showtype) {
			case 2:
				cfg = Config.bao_214[arr[0]];
				if (cfg) {
					IconUtil.setImg(self.sjIcon, Enum_Path.PIC_URL + cfg.pic + ".png");
					self.nameLb.text = HtmlUtil.fontNoSize(cfg.name + "(" + Config.baolv_214[arr[2]].jie + ")", Color.getColorStr(cfg.pin));
					self.powerLb.text = "战力：" + arr[3];
					self.starLb.text = arr[1] + "";
				}
				break;
			case 3:
				cfg = Config.book_213[arr[0]];
				if (cfg) {
					effID = cfg.tptx;
					IconUtil.setImg(self.sjIcon, Enum_Path.PIC_URL + cfg.pic + ".png");
					self.nameLb.text = HtmlUtil.fontNoSize(cfg.name + "(" + Config.booklv_213[arr[2]].jie + ")", Color.getColorStr(cfg.pin));
					self.powerLb.text = "战力：" + arr[3];
					self.starLb.text = arr[1] + "";
				}
				break;
			case 4:
				cfg = Config.yb_217[arr[0]];
				if (cfg) {
					effID = cfg.tptx;
					IconUtil.setImg(self.sjIcon, Enum_Path.PIC_URL + cfg.pic + ".png");
					self.nameLb.text = HtmlUtil.fontNoSize(cfg.name + "(" + Config.yblv_217[arr[2]].jie + ")", Color.getColorStr(cfg.pin));
					self.powerLb.text = "战力：" + arr[3];
					self.starLb.text = arr[1] + "";
				}
				break;
			case 5:
				cfg = Config.sword_216[arr[0]];
				if (cfg) {
					effID = cfg.tptx;
					IconUtil.setImg(self.sjIcon, Enum_Path.PIC_URL + cfg.pic + ".png");
					self.nameLb.text = HtmlUtil.fontNoSize(cfg.name + "(" + Config.swordlv_216[arr[2]].jie + ")", Color.getColorStr(cfg.pin));
					self.powerLb.text = "战力：" + arr[3];
					self.starLb.text = arr[1] + "";
				}
				break;
			case 6:
				cfg = Config.clothes_212[arr[0]];
				if (cfg) {
					effID = cfg.tptx;
					IconUtil.setImg(self.sjIcon, Enum_Path.PIC_URL + cfg.pic + ".png");
					self.nameLb.text = HtmlUtil.fontNoSize(cfg.name + "(" + Config.clotheslv_212[arr[2]].jie + ")", Color.getColorStr(cfg.pinzhi));
					self.powerLb.text = "战力：" + arr[3];
					self.starLb.text = arr[1] + "";
				}
				break;
			case 7:
				cfg = Config.book_215[arr[0]];
				if (cfg) {
					IconUtil.setImg(self.sjIcon, Enum_Path.PIC_URL + cfg.pic + ".png");
					self.nameLb.text = HtmlUtil.fontNoSize(cfg.name + "(" + Config.booklv_215[arr[2]].jie + ")", Color.getColorStr(cfg.pin));
					self.powerLb.text = "战力：" + arr[3];
					self.starLb.text = arr[1] + "";
				}
				break;
			case 12:
				IconUtil.setImg(self.sjIcon, null);
				cfg = Config.sb_750[arr[0]];
				if (cfg) {
					self.nameLb.text = HtmlUtil.fontNoSize(cfg.name + "(" + Math.floor(parseInt(arr[2]) / 10) + "阶" + parseInt(arr[2]) % 10 + "级)", Color.getColorStr(cfg.pinzhi));
					self.powerLb.text = "战力：" + arr[3];
					self.starLb.text = arr[1] + "";
					if (!self.godWeaponEff) self.godWeaponEff = EffectMgr.addEff("uieff/" + cfg.picture, self.sjIcon.displayObject as fairygui.UIContainer, self.sjIcon.width / 2, self.sjIcon.height / 2, 1000);
				}
				break;
			case 13:
				IconUtil.setImg(self.sjIcon, null);
				cfg = Config.sbpf_750[arr[0]];
				if (cfg) {
					let job = Math.floor(cfg.id / 1000);
					let cfg1 = Config.sb_750[job * 1000];
					self.nameLb.text = HtmlUtil.fontNoSize(cfg.mz + "(" + Math.floor(parseInt(arr[2]) / 10) + "阶" + parseInt(arr[2]) % 10 + "级)", Color.getColorStr(cfg1.pinzhi));
					self.powerLb.text = "战力：" + arr[3];
					self.starLb.text = arr[1] + "";
					if (!self.godWeaponEff) self.godWeaponEff = EffectMgr.addEff("uieff/" + cfg.zs, self.sjIcon.displayObject as fairygui.UIContainer, self.sjIcon.width / 2, self.sjIcon.height / 2, 1000);
				}
				break;
		}
		if (self.sysEff) {
			EffectMgr.instance.removeEff(self.sysEff);
			self.sysEff = null;
		}

		if (effID > 0) {
			self.sysEff = EffectMgr.addEff("uieff/" + effID, self.sjIcon.displayObject as fairygui.UIContainer, self.sjIcon.width / 2, self.sjIcon.height / 2, 1000, -1, true);
		}
	}

	protected onShown(): void {
		let self = this;
		IconUtil.setImg(self.backIcon, Enum_Path.BACK_URL + "chatBg.png");
		self.updateShow();
	}

	protected onHide(): void {
		let self = this;
		IconUtil.setImg(self.backIcon, null);
		IconUtil.setImg(self.sjIcon, null);
		GGlobal.layerMgr.close(UIConst.CHAT_BAOWU);
		if (self.sysEff) {
			EffectMgr.instance.removeEff(self.sysEff);
			self.sysEff = null;
		}
	}
}