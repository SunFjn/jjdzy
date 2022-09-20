class View_GCBZ_Panel extends UIPanelBase {

	public c1: fairygui.Controller;
	public frame: fairygui.GLabel;
	public timeLb: fairygui.GRichTextField;
	public numLb: fairygui.GRichTextField;
	public list: fairygui.GList;
	public buyBt: Button2;
	public resetBt: Button1;
	public rewardGroup: fairygui.GGroup;
	public reportBt: Button2;
	public explainBt: Button2;
	public rewardBt: Button2;
	public shopBt: Button2;
	public gridIcon: ViewGrid2;
	public grid: ViewGrid;
	public locationBt1: Button2;
	public locationBt: Button1;
	public tab0: fairygui.GButton;
	public tab1: fairygui.GButton;

	public static URL: string = "ui://vgiijkm8uvs30";

	public static createInstance(): View_GCBZ_Panel {
		return <View_GCBZ_Panel><any>(fairygui.UIPackage.createObject("GCBZ", "View_GCBZ_Panel"));
	}

	public constructor() {
		super();
		this.setSkin("GCBZ", "GCBZ_atlas0", "View_GCBZ_Panel");
	}

	protected setExtends() {
		let f = fairygui.UIObjectFactory.setPackageItemExtension;
		f(Child_GCBZ.URL, Child_GCBZ);
		f(GCBZCityItem.URL, GCBZCityItem);
		f(GCBZ_ShopItem.URL, GCBZ_ShopItem);
		f(GCBZ_BattleReportItem.URL, GCBZ_BattleReportItem);
	}

	protected initView() {
		let self = this;
		CommonManager.parseChildren(self, self);
		self.list.callbackThisObj = self;
		self.list.scrollItemToViewOnClick = false;
		self.list.itemRenderer = self.renderHandler;
		self.list.setVirtual();
		self.buyBt.visible = false;
		self.tab0.data = 0;
		self.tab1.data = 1;
	}

	private renderHandler(index: number, child: Child_GCBZ) {
		let self = this;
		child.setVo(self.cityData[index], self.c1.selectedIndex);
	}

	/**攻城令 */
	private itemID = 410439;
	/**物资 */
	private itemID1 = 410438;
	private cityData: Vo_GCBZ[][];
	private updateShow() {
		let self = this;
		let model = GGlobal.modelgcbz;
		if (!model.cityData) return;
		if (self.isFirstOpen) {
			if (model.selDiff == 1) {
				self.c1.selectedIndex = Config.gcbz_777[model.curID].nd - 1;
			} else {
				self.c1.selectedIndex = model.diffState - 1;
			}
			let rewardMaxVo = ConfigHelp.makeItemListArr(JSON.parse(Config.xtcs_004[8251].other))[0];
			if (model.rewardNum >= rewardMaxVo.count) {
				ViewCommonWarn.text("驻守奖励已达上限，请及时领取");
			}
			if (!self.curTab) {
				self.curTab = self.c1.selectedIndex == 0 ? self.tab0 : self.tab1;
				self.curTab.selected = true;
			}
			self.isFirstOpen = false;
		}
		self.cityData = model.cityData[self.c1.selectedIndex + 1];
		if (model.curID <= 0) model.curID = self.cityData[0][0].cfg.tgs;
		self.list.numItems = self.cityData.length;
		let count = Model_Bag.getItemCount(self.itemID);
		if (model.resetNum > 0 || count <= 0) {
			self.gridIcon.visible = false;
			// self.buyBt.visible = true;
			self.numLb.text = "重置次数：" + model.resetNum + "/" + ConfigHelp.getSystemNum(8253);
		} else {
			self.gridIcon.visible = true;
			// self.buyBt.visible = false;
			let itemVo = VoItem.create(self.itemID);
			self.gridIcon.vo = itemVo
			self.numLb.text = itemVo.name + ":      " + count + "/1";
		}
		self.rewardGroup.visible = model.rewardNum > 0;
		let itemVo1 = VoItem.create(self.itemID1);
		itemVo1.count = model.rewardNum;
		self.grid.vo = itemVo1;
		self.timeLb.text = "剩余可驻守\n" + DateUtil2.formatUsedTime(model.times);
		if (model.times > 0 && model.zhuShouID > 0) {
			if (!Timer.instance.has(self.timeHandler, self)) {
				Timer.instance.listen(self.timeHandler, self, 1000);
			}
		} else {
			Timer.instance.remove(self.timeHandler, self);
		}
		self.locationBt.visible = self.locationBt1.visible = model.selDiff == 1 && self.c1.selectedIndex == Config.gcbz_777[model.curID].nd - 1;
	}

	private posArr0 = [{ x: 50, y: 650 }, { x: 90, y: 400 }, { x: 120, y: 150 }, { x: 450, y: 570 }];
	private posArr1 = [{ x: 70, y: 650 }, { x: 250, y: 440 }, { x: 280, y: 150 }, { x: 630, y: 260 }];
	private locationVomine() {
		let self = this;
		let model = GGlobal.modelgcbz;
		GGlobal.control.register(false, Enum_MsgType.GCBZ_OPEN, self.locationVomine, self);
		if (model.selDiff == 1 && self.c1.selectedIndex == Config.gcbz_777[model.curID].nd - 1) {
			let index = -1;
			let posX = 0;
			for (let i = 0; i < self.cityData.length; i++) {
				for (let j = 0; j < self.cityData[i].length; j++) {
					if (model.zhuShouID > 0) {
						if (self.cityData[i][j].cfg.tgs == model.zhuShouID) {
							index = i;
							if (Config.gcbz_777[model.curID].nd == 1) {
								posX = self.posArr0[j].x;
							} else {
								posX = self.posArr1[j].x;
							}
							break;
						}
					} else {
						if (self.cityData[i][j].cfg.tgs == model.curID) {
							index = i;
							if (Config.gcbz_777[model.curID].nd == 1) {
								posX = self.posArr0[j].x;
							} else {
								posX = self.posArr1[j].x;
							}
							break;
						}
					}
				}
				if (index >= 0) break;
			}
			self.list.scrollPane.setPosX(index * 720 + posX)
		}
	}

	private timeHandler() {
		let self = this;
		let model = GGlobal.modelgcbz;
		model.times--;
		if (model.times <= 0) {
			Timer.instance.remove(self.timeHandler, self);
		}
		self.timeLb.text = "剩余可驻守\n" + DateUtil2.formatUsedTime(model.times);
	}

	private isFirstOpen: boolean = false;
	protected onShown(): void {
		let self = this;
		self.isFirstOpen = true;
		self.updateShow();
		self.register(true);
		self.updateNotice();
		GGlobal.modelgcbz.CG_AttackCity_openUI_12051();
	}

	protected onHide(): void {
		let self = this;
		self.list.numItems = 0;
		self.register(false);
		if (self.curTab) self.curTab.selected = false;
		self.curTab = null;
		Timer.instance.remove(self.timeHandler, self);
	}

	private moveTo() {
		let self = this;
		for (let i = 0; i < self.cityData.length; i++) {
			for (let j = 0; j < self.cityData[i].length; j++) {
				if (self.cityData[i][j].cfg.tgs == GGlobal.modelgcbz.curID) {
					GGlobal.control.notify(Enum_MsgType.GCBZ_MOVE_TWEEN, j);
					return;
				}
			}
		}
	}

	private updateNotice() {
		let self = this;
		let r = GGlobal.reddot;
		self.reportBt.checkNotice = r.checkCondition(UIConst.GCBZ, 1);
		self.rewardBt.checkNotice = r.checkCondition(UIConst.GCBZ, 0);
	}

	private register(pFlag: boolean) {
		let self = this;
		let e = EventUtil.register;
		e(pFlag, self.c1, fairygui.StateChangeEvent.CHANGED, self.OnChange, self);
		e(pFlag, self.resetBt, egret.TouchEvent.TOUCH_TAP, self.OnReset, self);
		e(pFlag, self.buyBt, egret.TouchEvent.TOUCH_TAP, self.OnBuy, self);
		e(pFlag, self.reportBt, egret.TouchEvent.TOUCH_TAP, self.OnReport, self);
		e(pFlag, self.explainBt, egret.TouchEvent.TOUCH_TAP, self.OnExplain, self);
		e(pFlag, self.rewardBt, egret.TouchEvent.TOUCH_TAP, self.OnReward, self);
		e(pFlag, self.grid, egret.TouchEvent.TOUCH_TAP, self.OnReward, self);
		e(pFlag, self.shopBt, egret.TouchEvent.TOUCH_TAP, self.OnShop, self);
		e(pFlag, self.locationBt, egret.TouchEvent.TOUCH_TAP, self.OnLocation, self);
		e(pFlag, self.locationBt1, egret.TouchEvent.TOUCH_TAP, self.OnLocation, self);
		e(pFlag, self.tab0, egret.TouchEvent.TOUCH_TAP, self.tabHandler, self);
		e(pFlag, self.tab1, egret.TouchEvent.TOUCH_TAP, self.tabHandler, self);
		GGlobal.control.register(pFlag, Enum_MsgType.GCBZ_MOVE, self.moveTo, self);
		GGlobal.control.register(pFlag, Enum_MsgType.GCBZ_OPEN, self.locationVomine, self);
		GGlobal.control.register(pFlag, Enum_MsgType.GCBZ_RESET, self.listReset, self);
		GGlobal.control.register(pFlag, Enum_MsgType.GCBZ_REWARD_SHOW, self.rewardShow, self);
		GGlobal.control.register(pFlag, UIConst.GCBZ, self.updateShow, self);
		GGlobal.reddot.register(pFlag, UIConst.GCBZ, self.updateNotice, self);
	}

	private curTab: fairygui.GButton;
	private tabHandler(evt: egret.TouchEvent) {
		let self = this;
		let model = GGlobal.modelgcbz;
		let tab = evt.target as fairygui.GButton;
		if (tab.data == self.c1.selectedIndex) return;
		if (tab.data < model.diffState) {
			if (self.curTab) self.curTab.selected = false;
			self.c1.selectedIndex = tab.data;
			self.curTab = tab;
		} else {
			tab.selected = false;
			ViewCommonWarn.text("请先通关普通难度");
		}
	}


	private rewardShow() {
		let self = this;
		let model = GGlobal.modelgcbz
		let itemVo = VoItem.create(self.itemID1);
		itemVo.count = model.rewardNum;
		View_Reward_Show.show([itemVo], "", "", Handler.create(self, self.onDraw), model.rewardNum > 0 ? 1 : 0);
		self.grid.vo = itemVo;
	}

	private listReset() {
		let self = this;
		if (self.list.numItems > 0) {
			self.list.scrollToView(0);
		}
	}

	private OnChange() {
		let self = this;
		self.list.numItems = 0;
		self.updateShow();
	}

	private OnLocation() {
		let self = this;
		self.locationVomine();
	}

	private OnShop() {
		GGlobal.layerMgr.open(UIConst.GCBZ_SHOP);
	}

	private OnReward() {
		GGlobal.modelgcbz.CG_GCBZ_LOOKBOX();
	}

	private onDraw() {
		let model = GGlobal.modelgcbz;
		if (model.rewardNum > 0) {
			GGlobal.layerMgr.close2(UIConst.REWARD_SHOW);
			model.CG_AttackCity_getAward_12055();
		} else {
			ViewCommonWarn.text("没有可领奖励");
		}
	}

	private OnExplain() {
		GGlobal.layerMgr.open(UIConst.WFSM_PANEL, UIConst.GCBZ);
	}

	private OnReport() {
		GGlobal.layerMgr.open(UIConst.GCBZ_BATTLEREPORT);
	}

	private OnReset() {
		let self = this;
		let model = GGlobal.modelgcbz;
		if (model.isTimeIn()) {
			return ViewCommonWarn.text("非活动时间中");
		}
		if (model.selDiff == 0) {
			return ViewCommonWarn.text("请先选择难度进行挑战");
		} else if (model.curID % 1000 <= 1 && model.state == 0) {
			return ViewCommonWarn.text("未通关第一关，不可重置")
		}
		if (model.resetNum > 0 || Model_Bag.getItemCount(self.itemID) > 0) {
			let str = "";
			let cfg = Config.gcbz_777[model.curID];
			if (model.curID % 1000 <= 1) {
				str = ConfigHelp.reTxt("当前已在{0}，是否仍然重置？", HtmlUtil.fontNoSize(model.difArr[cfg.nd] + "第1关", Color.getColorStr(2)));
			} else {
				str = ConfigHelp.reTxt("重置后将回到{0}并退出已驻守的城池，是否重置？", HtmlUtil.fontNoSize(model.difArr[cfg.nd] + "第1关", Color.getColorStr(2)));
			}
			ViewAlert.show(str, Handler.create(self, () => {
				model.CG_AttackCity_again_12071();
			}))
		} else {
			ViewCommonWarn.text("已无重置次数");
		}
	}

	private OnBuy() {
		let self = this;
		let model = GGlobal.modelgcbz;
		if (model.isTimeIn()) {
			return ViewCommonWarn.text("当天活动已结束");
		}
		if (model.buyNum >= model.numData.length) {
			ViewCommonWarn.text("已达购买上限");
		} else {
			let t_canBuy = model.numData.length - model.buyNum;
			ViewAlertBuy2.show(1, t_canBuy, Enum_Attr.yuanBao,
				(pData) => {
					pData.desStr = `今日剩余购买次数：<font color='${Color.GREENSTR}'>${t_canBuy}</font>`;
					let t_total = self.getBuyCountNeedByCount(pData.value);
					pData.totalPrice = t_total;
				},
				async (pData) => {
					self.onBuyCountOk(pData.value);
					return true;
				}, self);
		}
	}

	private getBuyCountNeedByCount(pCount) {
		let self = this;
		let model = GGlobal.modelgcbz;
		let t_total = 0;
		for (let i = model.buyNum; i < pCount + model.buyNum; i++) {
			t_total += JSON.parse(model.numData[i].xh)[0][2];
		}
		return t_total;
	}

	private onBuyCountOk(pCount: number) {
		if (pCount <= 0)
			return;
		let t = this;
		let t_need = t.getBuyCountNeedByCount(pCount);
		if (!FastAPI.checkItemEnough(Enum_Attr.yuanBao, t_need, true))
			return;
		GGlobal.modelgcbz.CG_AttackCity_buyTimes_12073(pCount);
	}
}