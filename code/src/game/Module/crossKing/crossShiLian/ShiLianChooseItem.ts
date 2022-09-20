class ShiLianChooseItem extends fairygui.GComponent {

	public backImg: fairygui.GLoader;
	public titleIcon: fairygui.GLoader;
	public modelIcon: fairygui.GLoader;
	public battleBt: fairygui.GButton;
	public nameLb: fairygui.GRichTextField;
	public powerLb: fairygui.GRichTextField;
	public grid0: ViewGrid;
	public grid1: ViewGrid;
	private gridArr: ViewGrid[];

	public static URL: string = "ui://yqpfulefkh256e";

	public static createInstance(): ShiLianChooseItem {
		return <ShiLianChooseItem><any>(fairygui.UIPackage.createObject("crossKing", "ShiLianChooseItem"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let self = this;
		CommonManager.parseChildren(self, self);
		self.gridArr = [self.grid0, self.grid1];
	}

	private awatar: UIRole = null;
	public roleData: { id: number, type: number, name: string, power: number, job: number, godWeapon: number };
	public setVo(roleData: { id: number, type: number, name: string, power: number, job: number, godWeapon: number, horseId: number }, cfg: Ikfsl_767) {
		let self = this;
		let model = GGlobal.modelkfsl;
		let cfg2 = Config.kfsl_767[model.floor];
		if (!cfg) {
			self.battleBt.visible = false;
		} else {
			self.battleBt.visible = true;
			if (model.maxFloor - model.floor >= 10) {
				self.battleBt.text = Model_player.voMine.str > roleData.power ? "扫荡" : "挑战";
			} else {
				self.battleBt.text = "挑战"
			}
		}
		self.roleData = roleData;
		IconUtil.setImg(self.backImg, Enum_Path.SHILIAN_URL + "nd" + (roleData.type - 1) + ".png");
		self.titleIcon.url = CommonManager.getUrl("crossKing", "nd" + (roleData.type - 1));
		self.nameLb.text = roleData.name;
		self.powerLb.text = ConfigHelp.getYiWanText(roleData.power);
		let cfg1 = Config.slzd_767[cfg.lx];
		let strArr = ["", "ptyl", "knyl", "emyl"];
		let rewardArr = ConfigHelp.makeItemListArr(JSON.parse(cfg1[strArr[roleData.type]]));
		for (let i = 0; i < self.gridArr.length; i++) {
			self.gridArr[i].tipEnabled = self.gridArr[i].isShowEff = true;
			self.gridArr[i].vo = rewardArr[i];
		}
		if (!self.awatar) {
			self.awatar = UIRole.create();
			self.awatar.uiparent = self.modelIcon.displayObject as fairygui.UIContainer;
			self.awatar.view.touchEnabled = self.awatar.view.touchChildren = false;
			self.awatar.setPos(self.modelIcon.width / 2, self.modelIcon.height + 20);
		}
		if (Config.sz_739[roleData.job]) {
			self.awatar.setBody(Config.sz_739[roleData.job].moxing);
		} else {
			self.awatar.setBody(roleData.job);
		}
		self.awatar.setWeapon(roleData.job);
		self.awatar.setGodWeapon(roleData.godWeapon);
		self.awatar.setHorseId(roleData.horseId);
		if (roleData.horseId) {
			self.awatar.setScaleXY(0.7, 0.7);
		} else {
			self.awatar.setScaleXY(1, 1);
		}
		self.awatar.onAdd();
		self.battleBt.addClickListener(self.battleHandler, self);
	}

	private battleHandler() {
		let self = this;
		let model = GGlobal.modelkfsl;
		if (model.maxFloor - model.floor >= 10 && Model_player.voMine.str > self.roleData.power) {
			model.CG_CROSSTRIAL_SAODANG_10483(self.roleData.type);
		} else {
			model.CG_CrossTrial_challenge_10473(self.roleData.type);
		}
	}

	public clean() {
		let self = this;
		IconUtil.setImg(self.backImg, null)
		if (self.awatar) {
			self.awatar.onRemove();
			self.awatar = null;
		}
		ConfigHelp.cleanGridEff(self.gridArr);
		self.battleBt.removeClickListener(self.battleHandler, self);
	}
}