class RoleHpAndNamePlug extends fairygui.GComponent {

	public static POOL = [];
	public static isSelf: boolean;
	public static create(isSelf: boolean = true): RoleHpAndNamePlug {
		RoleHpAndNamePlug.isSelf = isSelf;
		return RoleHpAndNamePlug.POOL.length ? RoleHpAndNamePlug.POOL.pop() : RoleHpAndNamePlug.createInstance();
	}

	public static URL: string = "ui://jvxpx9emta899l";
	public static createInstance(): RoleHpAndNamePlug {
		return <RoleHpAndNamePlug><any>(fairygui.UIPackage.createObject("common", "BattleHpAndName"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let s = this;
		CommonManager.parseChildren(s, s);
	}

	public role: SceneCharRole;
	public hpbar: SceneBar;
	public titleImg: fairygui.GLoader;
	public countryImg: fairygui.GLoader;
	public countryGroup: fairygui.GGroup;
	public nameLb: fairygui.GRichTextField;
	public jxLb: fairygui.GRichTextField;
	public shieldImg: fairygui.GImage;
	/** 角色被移除时是否自动移除该挂件*/
	public autoRemove = 1;

	public update() {
		let a = this;
		a.updateHp();
		if (a.role.nameBarVild) a.updateShow();
	}

	public onAdd() {
		let s = this;
		s.role.headGroup.addChild(s.displayObject);
		s.role.nameBarVild = true;
		if (GGlobal.modelGuanQia.inGuanQiaBoss() || GGlobal.sceneType != SceneCtrl.GUANQIA) {
			if (s.role.curhp < s.role.maxhp) {
				s.role.curShield = 0;
			}
			s.role.showHpShield(s.role.curShield > 0);
			s.shieldImg.visible = s.role.curShield > 0;
		} else {
			s.role.showHpShield(false);
			s.shieldImg.visible = false;
		}
	}

	private updateHp() {
		let s = this;
		s.hpbar.max = s.role.maxhp;
		s.hpbar.value = s.role.curhp;
		if (GGlobal.modelGuanQia.inGuanQiaBoss() || GGlobal.sceneType != SceneCtrl.GUANQIA) {
			if (s.role.curhp > s.role.maxhp) {
				s.role.curShield = s.role.curhp - s.role.maxhp;
			} else if (s.role.curhp < s.role.maxhp) {
				s.role.curShield = 0;
			}
			if (s.role.curShield > 0) {
				s.role.showHpShield(true);
				s.shieldImg.visible = true;
				s.shieldImg.scaleX = s.role.curShield / s.role.maxShield;
			} else {
				s.shieldImg.visible = false;
				s.role.showHpShield(false);
			}
		} else {
			s.shieldImg.visible = false;
			s.role.showHpShield(false);
		}
	}

	private updateShow() {
		let a = this;
		a.role.nameBarVild = false;
		a.nameLb.text = a.role.name;
		if (a.role.country > 0) {
			a.countryImg.url = CommonManager.getCommonUrl("country" + a.role.country);
			a.countryImg.visible = true;
			a.jxLb.text = Model_GuanXian.getJiangXianStr(1);
		} else {
			a.countryImg.visible = false;
		}

		if (a.role.guanzhi > 0) {
			a.jxLb.text = Model_GuanXian.getJiangXianStr(a.role.guanzhi);
			a.jxLb.visible = true;
		} else {
			a.jxLb.visible = false;
		}
		a.jxLb.x = a.countryImg.visible ? 54 : (172 - a.jxLb.width) >> 1;
		if (a.role.title > 0) {
			let cfg = Config.chenghao_702[a.role.title];
			a.titleImg.visible = true;
			ImageLoader.instance.loader(Enum_Path.TITLE_URL + cfg.picture + ".png", a.titleImg, Handler.create(this, this.resetTitlePos));
			if (a.role.guanzhi <= 0 && a.role.country <= 0) {
				a.titleImg.setXY(61, -96);
			} else {
				a.titleImg.setXY(61, -116);
			}
		} else {
			a.titleImg.visible = false;
		}
	}

	private resetTitlePos() {
		let a = this;
		let xx = (172 - a.titleImg.width) >> 1;
		if (!a.role) {
			return;
		}
		if (a.role.guanzhi <= 0 && a.role.country <= 0) {
			a.titleImg.setXY(xx, 25 - a.titleImg.height);
		} else {
			a.titleImg.setXY(xx, 21 - a.titleImg.height);
		}
	}

	public onRemove() {
		let s = this;
		s.role.nameBarVild = true;
		s.role.showHpShield(false);
		s.role.headGroup.removeChild(s.displayObject);
		s.role = null;
	}

	public onEvent(evt, arg) {
		let self = this;
		if (evt == EVT_SC.EVT_HURT) {
			self.hpbar.max = self.role.maxhp;
			self.hpbar.value = self.role.curhp;
		}
	}
}