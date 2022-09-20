class ArpgPlayerNamePlug extends fairygui.GComponent {

	public static POOL = [];
	public static create(): ArpgPlayerNamePlug {
		return ArpgPlayerNamePlug.POOL.length ? ArpgPlayerNamePlug.POOL.pop() : ArpgPlayerNamePlug.createInstance();
	}

	public static URL: string = "ui://jvxpx9emdzc53f1";
	public static createInstance(): ArpgPlayerNamePlug {
		return <ArpgPlayerNamePlug><any>(fairygui.UIPackage.createObject("common", "ArpgPlayerNamePlug"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let s = this;
		CommonManager.parseChildren(s, s);
		s.touchable = false;
	}

	public role: ArpgRole;
	public hpbar: SceneBar;
	public titleImg: fairygui.GLoader;
	public nameLb: fairygui.GRichTextField;
	public autoRemove = 1;

	public update() {
		let a = this;
		a.updateHp();
		if (a.role.nameBarVild) a.updateShow();
	}

	vo;
	public onAdd() {
		let a = this;
		a.role.headGroup.addChild(a.displayObject);
		a.role.nameBarVild = 1;
		a.vo = ModelArpgMap.getPlayerData(a.role.id);
		this.nameLb.color = Model_player.isMineID(a.role.id) ? Color.GREENINT : Color.WHITEINT;
	}

	private updateHp() {
		let a = this;
		a.hpbar.max = a.vo.maxHp;
		a.hpbar.value = a.vo.hp;
	}

	private updateShow() {
		let a = this;
		a.role.nameBarVild = 0;
		a.nameLb.text = a.role.name;
		let vo = a.vo;
		if (!vo) { DEBUG && console.error("没有这个玩家：" + a.role.id); }
		if (vo.title > 0) {
			let cfg = Config.chenghao_702[vo.title];
			a.titleImg.visible = true;
			ImageLoader.instance.loader(Enum_Path.TITLE_URL + cfg.picture + ".png", a.titleImg, Handler.create(this, this.resetTitlePos));
			a.titleImg.setXY(61, -116);
		} else {
			a.titleImg.visible = false;
		}
		a.updateNameColor();
	}

	private resetTitlePos() {
		let a = this;
		let xx = (172 - a.titleImg.width) >> 1
		a.titleImg.setXY(xx, 41 - a.titleImg.height);
	}

	public updateNameColor() {
		if (Model_player.isMineID(this.role.id)) {
			this.nameLb.color = Color.GREENINT;
			return;
		}
		let sceneType = ModelArpgMap.getInstance().sceneType;
		let checkEnemy = false;
		switch (sceneType) {
			case EnumMapType.WDTX:
				checkEnemy = true;
				break;
			case EnumMapType.BOSSZC_LOCAL:
			case EnumMapType.BOSSZC_CROSS:
				checkEnemy = GGlobal.modelBossZc.sceneState == 2;
				break;
			case EnumMapType.LIANGCAO:
				checkEnemy = !GameUnitManager.isMyCamp(this.role.camp);
				break;
		}
		if (checkEnemy) {
			this.nameLb.color = Color.REDINT;
		} else {
			this.nameLb.color = Color.WHITEINT;
		}
	}

	public onRemove() {
		let a = this;
		a.role.nameBarVild = 1;
		this.nameLb.color = Color.WHITEINT;
		a.vo = null;
		a.role.headGroup.removeChild(a.displayObject);
		ArpgPlayerNamePlug.POOL.push(this);
	}

	public onEvent(evt, arg) {
		let self = this;
		if (evt == EVT_SC.EVT_HURT) {
			self.hpbar.value = 1;
			self.hpbar.value = 1;
		}
	}
}