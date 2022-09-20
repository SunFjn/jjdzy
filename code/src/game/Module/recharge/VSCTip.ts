class VSCTip extends fairygui.GComponent {
	public n0: fairygui.GLoader;
	public n3: fairygui.GLoader;
	public container: EmptyComp;
	public n8: fairygui.GLoader;
	public n9: fairygui.GLoader;
	public t0: fairygui.Transition;

	public static URL: string = "ui://jvxpx9em810t3dy";

	public static inst: VSCTip;
	public static createInstance(): VSCTip {
		if (!VSCTip.inst) {
			VSCTip.inst = <VSCTip><any>(fairygui.UIPackage.createObject("common", "VSCTip"));
		}
		return VSCTip.inst;
	}

	public constructor() {
		super();

	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.n0 = <fairygui.GLoader><any>(this.getChild("n0"));
		this.n3 = <fairygui.GLoader><any>(this.getChild("n3"));
		this.container = <EmptyComp><any>(this.getChild("container"));
		this.n8 = <fairygui.GLoader><any>(this.getChild("n8"));
		this.n9 = <fairygui.GLoader><any>(this.getChild("n9"));
		this.t0 = this.getTransition("t0");
	}

	private clickHD() {
		GGlobal.layerMgr.open(UIConst.SHOUCHONG)
	}

	private secSkill
	private awatar: UIRole;
	public showPanel() {
		let self = this;
		let st = GGlobal.modelRecharge.isFirstGet();//是否已领取6元奖励
		IconUtil.setImg(self.n0, Enum_Path.BACK_URL + "shouchong/bg.png");
		IconUtil.setImg(self.n9, Enum_Path.BACK_URL + "shouchong/point.png");
		if (st) {
			IconUtil.setImg(self.n3, Enum_Path.BACK_URL + "shouchong/power98.png");
			IconUtil.setImg(self.n8, Enum_Path.BACK_URL + "shouchong/title98.png");
			self.clearAwatar();
			this.container.visible = true;
		} else {
			this.container.visible = false;
			IconUtil.setImg(self.n3, Enum_Path.BACK_URL + "shouchong/power6.png");
			IconUtil.setImg(self.n8, Enum_Path.BACK_URL + "shouchong/title6.png");
			const lib = Config.xsc_731[1];
			let showInfo = JSON.parse(lib.zuo)[0];
			let type = showInfo[0];
			let value = showInfo[1];
			if (!self.awatar) {
				self.awatar = UIRole.create();
				self.awatar.uiparent = self._container;
				self.awatar.setScaleXY(1.2, 1.2);
			}
			let position = { x: 115, y: 170 };
			self.awatar.setPos(position.x, position.y);
			self.awatar.setBody(value);
			self.awatar.setWeapon(value);
			self.awatar.onAdd();

			// let cfgh = Config.hero_211[value]
			// var skillsArr = ConfigHelp.SplitStr(cfgh.skills);
			// var secSkill = skillsArr[1][0];
			// if (self.secSkill != secSkill) {
			// 	self.secSkill = secSkill;
			// 	Timer.instance.remove(self.playSkill, self);
			// 	self.playSkill();
			// }
		}
		const pic = JSON.parse(Config.xsc_731[4].zuo)[0][1];
		self.container.showPic(Enum_Path.PIC_URL + pic + ".png");
		self.addClickListener(self.clickHD, self);
	}

	private clearAwatar() {
		let s = this;
		if (s.awatar) {
			s.awatar.onRemove();
			s.awatar = null;
		}
		// Timer.instance.remove(s.playSkill, s);
	}

	// private playSkill() {
	// 	let self = this;
	// 	self.awatar.playSkillID(self.secSkill, false);
	// 	Timer.instance.callLater(self.playSkill, 5000, self);
	// }

	public hidePanel() {
		let s = this;
		IconUtil.setImg(s.n0, null);
		IconUtil.setImg(s.n9, null);
		IconUtil.setImg(s.n3, null);
		IconUtil.setImg(s.n8, null);
		s.removeClickListener(s.clickHD, s);
		s.clearAwatar();
		// Timer.instance.remove(s.playSkill, s);
		// s.secSkill = 0;
	}
}