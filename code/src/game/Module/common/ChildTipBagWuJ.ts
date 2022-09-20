class ChildTipBagWuJ extends fairygui.GComponent {

	public g22: fairygui.GImage;
	public lbDesTit: fairygui.GRichTextField;
	public img: fairygui.GImage;
	public skill0: VWuJiangSkillS;
	public skill1: VWuJiangSkillS;
	public skill2: VWuJiangSkillS;
	public skill3: VWuJiangSkillS;
	public imgDes: fairygui.GImage;

	public static URL: string = "ui://jvxpx9emq2i93g1";

	public static createInstance(): ChildTipBagWuJ {
		return <ChildTipBagWuJ><any>(fairygui.UIPackage.createObject("common", "ChildTipBagWuJ"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let self = this;
		CommonManager.parseChildren(self, self);
	}

	public set vo(v: VoItem) {
		let self = this
		let tzPas = v.tzPas
		var mx
		let weapon
		let hero
		let hasSkill = true;
		if (v.tz == UIConst.WU_JIANG_SZ) {
			mx = Config.sz_739[tzPas].moxing;
			weapon = tzPas
			hero = Config.hero_211[Math.floor(tzPas / 1000)]
		} else {
			hero = Config.hero_211[tzPas]
			weapon = mx = hero.type
		}
		if (hasSkill) {
			var skillsArr = ConfigHelp.SplitStr(hero.skills);
			var secSkill = skillsArr[1][0];
			self.skill0.setVo(skillsArr[0][0], 0);
			self.skill1.setVo(skillsArr[1][0], 1);
			self.skill2.setVo(skillsArr[2][0], 2);
			self.skill3.setVo(skillsArr[3][0], 3);
			self.skill0.visible = true;
			self.skill1.visible = true;
			self.skill2.visible = true;
			self.skill3.visible = true;
		} else {
			self.skill0.visible = false;
			self.skill1.visible = false;
			self.skill2.visible = false;
			self.skill3.visible = false;
		}

		if (!self.awatar) {
			self.awatar = UIRole.create();
			self.awatar.setPos(self.img.x, self.img.y);
			self.awatar.uiparent = self.displayListContainer;
			self.awatar.view.touchEnabled = self.awatar.view.touchChildren = false;
		}
		self.awatar.setBody(mx);
		self.awatar.setWeapon(weapon);
		self.awatar.onAdd();
		self.awatar.setScaleXY(1.5, 1.5);
	}

	public clean() {
		super.clean();
		let self = this;
		if (self.awatar) {
			self.awatar.onRemove();
			self.awatar = null;
		}
	}

	private awatar: UIRole = null;
}