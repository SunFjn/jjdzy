class VKingShipPly extends fairygui.GComponent {

	public titleImg: fairygui.GLoader;
	public nameLb: fairygui.GRichTextField;
	public powerLb: fairygui.GRichTextField;
	public roleGroup: fairygui.GGroup;

	public static URL: string = "ui://uwzc58njteph24";

	private awatar: UIRole = null;

	public static createInstance(): VKingShipPly {
		return <VKingShipPly><any>(fairygui.UIPackage.createObject("country", "VKingShipPly"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let self = this;
		CommonManager.parseChildren(self, self);
		self.addClickListener(self.clickRole, self);
	}

	private clickRole() {
		let self = this;
		if (Model_Kingship.status != 1) return;
		if (Model_Kingship.battleCount <= 0) {
			Model_Kingship.buyHandler()
			// ViewCommonWarn.text("已无挑战次数");
			return;
		}
		if (self.vo.id == Model_player.voMine.id) {
			ViewCommonWarn.text("不能挑战自己");
			return;
		}
		GGlobal.modelKingship.CG_BATTLE_5203(self.vo.pos, self.vo.id);
	}

	private vo: Vo_Kingship;
	//index0 侍卫   1国王 2丞相  3大将军  rev 1不反转  0反转
	public setVo(v: Vo_Kingship, index: number, rev = 0) {
		let self = this;
		self.vo = v;
		if (v == null) {
			self.titleImg.url = "";
			self.titleImg.visible = false;
			self.powerLb.visible = false;
			self.nameLb.text = "";
			self.remove();
			return;
		}
		if (!self.awatar) {
			self.awatar = UIRole.create();
		}
		let moxing = 0;
		if (v.type == 1) {
			let fscfg = Config.sz_739[v.job];
			if (fscfg) {
				moxing = fscfg.moxing;
				self.awatar.setBody(moxing);
				self.awatar.setWeapon(v.job);
			} else {
				moxing = v.job;
				self.awatar.setBody(moxing);
				self.awatar.setWeapon(moxing);
			}
			self.awatar.setGodWeapon(v.godWeapon);
		} else {
			moxing = v.job;
			self.awatar.setBody(moxing);
			if (Config.NPC_200[v.id].weapon) {
				self.awatar.setWeapon(moxing);
			} else {
				self.awatar.setWeapon(0);
			}
		}
		self.awatar.setHorseId(v.horseId);

		self.awatar.uiparent = self.displayListContainer;
		self.awatar.onAdd();
		var cfg = Config.mod_200[moxing];
		if (rev == 1) {
			self.awatar.setScaleXY(1, 1);
			if (v.horseId) {
				self.awatar.setPos(self.width / 2 - 50, self.height);
			} else {
				self.awatar.setPos(self.width / 2, self.height);
			}
		} else {
			self.awatar.setScaleXY(-1, 1);
			if (v.horseId) {
				self.awatar.setPos(self.width / 2 + 50, self.height);
			} else {
				self.awatar.setPos(self.width / 2, self.height);
			}
		}

		// self.awatar.setPos(self.width / 2, self.height);
		if (cfg && cfg.h) {
			if (v.horseId) {
				// self.roleGroup.y = self.height - cfg.zh * 0.6 - self.roleGroup.height;
				self.roleGroup.y = self.height - cfg.zh - self.roleGroup.height;
			} else {
				self.roleGroup.y = self.height - cfg.h - self.roleGroup.height;
			}
		} else {
			self.nameLb.y = self.height - 100 - self.roleGroup.height;
		}
		self.nameLb.text = v.name;
		self.powerLb.text = "战力：" + ConfigHelp.numToStr(v.power);
		let titleArr = JSON.parse(Config.xtcs_004[1067].other);
		if (titleArr[Model_player.voMine.country - 1].length >= v.pos) {
			var cfgCH = Config.chenghao_702[titleArr[Model_player.voMine.country - 1][v.pos - 1]]
			ImageLoader.instance.loader(Enum_Path.TITLE_URL + cfgCH.picture + ".png", self.titleImg);
		} else {
			self.titleImg.url = "ui://uwzc58njqnae1e";
		}
		self.titleImg.visible = true;
		self.nameLb.color = self.vo.id == Model_player.voMine.id ? Color.getColorInt(2) : Color.getColorInt(1);
	}

	public remove() {
		if (this.awatar) {
			this.awatar.onRemove();
			this.awatar = null;
		}
	}
}