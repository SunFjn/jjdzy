class View_GCBZ_CityData extends UIModalPanel {

	public frame: fairygui.GLabel;
	public head: ViewHead;
	public dataLb: fairygui.GRichTextField;
	public rewardLb: fairygui.GRichTextField;
	public promptLb: fairygui.GRichTextField;
	public battleBt: Button0;
	public zsBt: Button1;
	public group0: fairygui.GGroup;
	public static URL: string = "ui://vgiijkm8r5gem";

	public constructor() {
		super();
		this.childrenCreated();
	}

	protected childrenCreated(): void {
		let self = this;
		self.view = fairygui.UIPackage.createObject("GCBZ", "View_GCBZ_CityData").asCom;
		self.contentPane = self.view;
		CommonManager.parseChildren(self.view, self);
		self.battleBt.visible = false;
		super.childrenCreated();
	}

	private vo: Vo_GCBZ;
	private updateShow() {
		let self = this;
		let model = GGlobal.modelgcbz;
		let vo = self.vo;
		self.frame.text = vo.cfg.mz + "驻守大将";
		let itemVo = ConfigHelp.makeItemListArr(JSON.parse(vo.cfg.zsjl))[0];
		let times = Math.ceil(Model_GlobalMsg.getServerTime() / 1000) - vo.times;
		self.rewardLb.text = ConfigHelp.reTxt("每{0}分钟可获得{1}", ConfigHelp.getSystemNum(8250), HtmlUtil.fontNoSize(itemVo.count + itemVo.name, Color.getColorStr(2)));
		if (vo.id > 0) {
			self.dataLb.text = ConfigHelp.reTxt("{0}\n战力：{1}\n已驻守：{2}\n共收益：{3}", vo.id == Model_player.voMine.id ? HtmlUtil.fontNoSize(vo.name, Color.getColorStr(2)) : vo.name,
				vo.power, DateUtil2.formatUsedTime(times, "hh时uu分ss秒"), Math.floor(times / (ConfigHelp.getSystemNum(8250) * 60)) * itemVo.count + itemVo.name);
			self.head.setdata(vo.headID, 0, "", 0, false, vo.frameID);
		} else {
			self.dataLb.text = "";
			self.head.setdata(0);
		}
		if (model.curID > vo.cfg.tgs) {
			self.group0.visible = false;
		} else {
			self.zsBt.visible = self.group0.visible = vo.id != Model_player.voMine.id;
			self.zsBt.enabled = model.curID == vo.cfg.tgs && model.state == 1;
			self.promptLb.text = model.curID == vo.cfg.tgs && model.state == 1 && model.times <= 0 ? "今日驻守时\n间已达上限" : "";
			self.promptLb.text = model.curID == vo.cfg.tgs && model.state == 1 ? "" : "需通关该城池";
			if (model.isTimeIn()) {
				self.promptLb.text = "非活动时间中";
				self.zsBt.enabled = false;
			}
		}
	}

	protected onShown(): void {
		let self = this;
		self.vo = self._args;
		self.updateShow();
		// self.battleBt.addClickListener(self.onBattle, self);
		self.zsBt.addClickListener(self.OnZS, self);
	}

	private OnZS() {
		let self = this;
		let model = GGlobal.modelgcbz;
		let rewardMaxVo = ConfigHelp.makeItemListArr(JSON.parse(Config.xtcs_004[8251].other))[0];
		if (model.isTimeIn()) {
			return ViewCommonWarn.text("非活动时间中");
		} else if (model.rewardNum >= rewardMaxVo.count) {
			return ViewCommonWarn.text("驻守奖励已达上限，请及时领取");
		} else if (model.times <= 0) {
			return ViewCommonWarn.text("今日驻守时间已达上限");
		}

		if (model.zhuShouID > 0) {
			ViewAlert.show(ConfigHelp.reTxt("进攻该城池将退出{0}的驻守，\n是否发起进攻？", HtmlUtil.fontNoSize(Config.gcbz_777[model.zhuShouID].mz, Color.getColorStr(5))),
				Handler.create(self, () => {
					self.doHideAnimation();
					if (self.vo.id > 0) {
						model.CG_AttackCity_plunder_12057(self.vo.cfg.tgs)
					} else {
						model.CG_AttackCity_dispatch_12053(self.vo.cfg.tgs);
					}
				}))
		} else {
			self.doHideAnimation();
			if (self.vo.id > 0) {
				model.CG_AttackCity_plunder_12057(self.vo.cfg.tgs)
			} else {
				model.CG_AttackCity_dispatch_12053(self.vo.cfg.tgs);
			}
		}
	}

	// private onBattle() {
	// 	let self = this;
	// 	let model = GGlobal.modelgcbz;
	// 	if (model.isTimeIn()) {
	// 		return ViewCommonWarn.text("非活动时间中");
	// 	}
	// 	if (model.selDiff == 0) {
	// 		ViewAlert.show(ConfigHelp.reTxt("是否选择{0}难度进行挑战，当天不可更换难度", model.difArr[self.vo.cfg.nd]), Handler.create(self, () => {
	// 			GGlobal.modelgcbz.CG_AttackCity_choose_12077(self.vo.cfg.nd, self.vo.cfg.tgs);
	// 		}));
	// 	} else {
	// 		if (model.curID < self.vo.cfg.tgs) {
	// 			GGlobal.modelgcbz.CG_AttackCity_move_12075(self.vo.cfg.tgs)
	// 		} else {
	// 			GGlobal.modelgcbz.CG_AttackCity_attackNPC_12061(self.vo.cfg.tgs);
	// 		}
	// 	}
	// }

	protected onHide(): void {
		let self = this;
		self.zsBt.removeClickListener(self.OnZS, self);
	}
}