class Child_ActCom_SJXS extends fairygui.GComponent implements IPanel {

	public backImg: fairygui.GLoader;
	public powerLb: fairygui.GLabel;
	public targetBt: Button2;
	public moneyLb0: fairygui.GRichTextField;
	public moneyLb1: fairygui.GRichTextField;
	public timeLb: fairygui.GRichTextField;
	public drawBt1: fairygui.GButton;
	public drawBt10: fairygui.GButton;
	public rankBt: fairygui.GButton;
	public grid0: ViewGrid2;
	public grid1: ViewGrid2;
	public list: fairygui.GList;
	public rankItemArr: SJXS_RankItem[] = [];
	public skillArr: ViewSkillGrid[] = [];
	public nameIcon: fairygui.GLoader;

	public static URL: string = "ui://iwvd88mqr3je6";
	public static pkg: string = "ActCom_SJXS";
	public static createInstance(): Child_ActCom_SJXS {
		return <Child_ActCom_SJXS><any>(fairygui.UIPackage.createObject("ActCom_SJXS", "Child_ActCom_SJXS"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let self = this;
		CommonManager.parseChildren(self, self);
		self.list.callbackThisObj = self;
		self.list.itemRenderer = self.renderHandler;
		for (let i = 0; i < 5; i++) {
			self.rankItemArr.push(self["rank" + i]);
			if (i < 4) {
				self.skillArr.push(self["skill" + i]);
			}
		}
	}

	public static setExtends() {
		let f = fairygui.UIObjectFactory.setPackageItemExtension;
		f(SJXS_RankItem.URL, SJXS_RankItem);
		f(ActCom_SJXS_RewardItem.URL, ActCom_SJXS_RewardItem);
		f(VSJXSRank.URL, VSJXSRank);
	}

	initView(pParent: fairygui.GObject) {

	}

	private renderHandler(index: number, grid: ViewGrid) {
		grid.isShowEff = grid.tipEnabled = true;
		grid.vo = this.rewardList[index];
	}

	public updateShow() {
		let self = this;
		let model = GGlobal.modelsjxs;
		let surTime = model.endTime - Math.ceil(Model_GlobalMsg.getServerTime() / 1000);
		if (surTime > 0) {
			if (!Timer.instance.listen(self.timeHandler, self)) {
				Timer.instance.listen(self.timeHandler, self, 1000);
			}
		} else {
			Timer.instance.remove(self.timeHandler, self);
			self.timeLb.text = HtmlUtil.fontNoSize("活动已结束", Color.getColorStr(6));
		}
		let cost0 = ConfigHelp.makeItemListArr(JSON.parse(ConfigHelp.getSystemDesc(7401)))[0];
		let cost1 = ConfigHelp.makeItemListArr(JSON.parse(ConfigHelp.getSystemDesc(7402)))[0];
		self.grid0.vo = cost0;
		self.moneyLb0.text = cost0.count + "";
		self.grid1.vo = cost1;
		self.moneyLb1.text = cost1.count + "";
		self.targetBt.checkNotice = model.checkNotice();
	}

	private OnDraw(evt: egret.TouchEvent) {
		let self = this;
		self.drawHandler(evt.target.data);
	}

	private drawHandler(value) {
		let self = this;
		let money = 0;
		let type = 0;
		switch (value) {
			case 1:
				money = parseInt(self.moneyLb0.text);
				type = 1;
				break;
			case 10:
				type = 2;
				money = parseInt(self.moneyLb1.text);
				break;
		}
		if (Model_player.voMine.yuanbao >= money) {
			self.drawBt1.touchable = self.drawBt10.touchable = false;
			GGlobal.modelsjxs.CG_GodGenThisLife_turn_9551(type);
		} else {
			ModelChongZhi.guideToRecharge();
		}
	}


	private timeHandler() {
		let self = this;
		let model = GGlobal.modelsjxs;
		let surTime = model.endTime - Math.ceil(Model_GlobalMsg.getServerTime() / 1000);
		if (surTime > 0) {
			self.timeLb.text = "活动剩余时间：" + DateUtil.getMSBySecond4(surTime);
		} else {
			self.timeLb.text = HtmlUtil.fontNoSize("活动已结束", Color.getColorStr(6));
			Timer.instance.remove(self.timeHandler, self);
		}
	}

	private showReward(arr: IGridImpl[]) {
		let self = this;
		View_Reward_Show2.show(self.vo.groupId, arr.length, Handler.create(self, function () {
			self.drawHandler(arr.length);
		}), arr, parseInt(self.moneyLb0.text), parseInt(self.moneyLb1.text), 0);
		self.drawBt1.touchable = self.drawBt10.touchable = true;
		self.updateShow();
	}
	private rewardList: IGridImpl[];
	private awater: UIRole;
	private vo: Vo_Activity;
	openPanel(pData?: Vo_Activity) {
		let self = this;
		let model = GGlobal.modelsjxs;
		let cfg = Config.god_288[pData.qs];
		self.vo = pData;
		if (!model.rankData) {
			model.getRankData();
		}
		if (!self.awater) {
			self.awater = UIRole.create();
			self.awater.uiparent = self.backImg.displayObject as fairygui.UIContainer;
			self.awater.setScaleXY(1.5, 1.5);
			self.awater.setPos(self.backImg.width / 2, self.backImg.height - 20);
		}
		self.awater.setBody(cfg.mod);
		self.awater.setWeapon(cfg.mod);
		self.awater.onAdd();
		IconUtil.setImg(self.nameIcon, Enum_Path.ACTCOM_URL + "sjxs_" + cfg.mod + ".png");

		self.registerEvent(true);
		let skillIDArr = JSON.parse(cfg.skill);
		for (let i = 0; i < self.rankItemArr.length; i++) {
			self.rankItemArr[i].setVo(model.rankData[pData.qs][i]);
			if (i < 4) {
				self.skillArr[i].setVo(skillIDArr[i][0], cfg.mod);
			}
		}
		self.powerLb.text = cfg.power + "";
		self.drawBt1.data = 1;
		self.drawBt10.data = 10;
		self.rewardList = ConfigHelp.makeItemListArr(JSON.parse(cfg.show));
		self.list.numItems = self.rewardList.length;
		self.drawBt1.touchable = self.drawBt10.touchable = true;
		GGlobal.modelActivity.CG_OPENACT(UIConst.SHENJIANG_XIANSHI);
		if (!model.targertData) {
			GGlobal.modelsjxs.CG_GodGenThisLife_openTargetAwardUI_9555();
		}
		IconUtil.setImg(self.backImg, Enum_Path.ACTCOM_URL + "sjxs.png");
	}

	closePanel(pData?: any) {
		let self = this;
		self.registerEvent(false);
		self.list.numItems = 0;
		for (let i = 0; i < self.rankItemArr.length; i++) {
			self.rankItemArr[i].clean();
			if (i < 4) {
				self.skillArr[i].clean();
			}
		}
		Timer.instance.remove(self.timeHandler, self);
		if (self.awater) {
			self.awater.onRemove();
			self.awater = null;
		}
		IconUtil.setImg(self.backImg, null);
		IconUtil.setImg(self.nameIcon, null);
	}

	private registerEvent(pFlag: boolean): void {
		let self = this;
		EventUtil.register(pFlag, self.drawBt1, egret.TouchEvent.TOUCH_TAP, self.OnDraw, self);
		EventUtil.register(pFlag, self.drawBt10, egret.TouchEvent.TOUCH_TAP, self.OnDraw, self);
		EventUtil.register(pFlag, self.rankBt, egret.TouchEvent.TOUCH_TAP, self.openRank, self);
		EventUtil.register(pFlag, self.targetBt, egret.TouchEvent.TOUCH_TAP, self.openTarget, self);
		GGlobal.control.register(pFlag, UIConst.SHENJIANG_XIANSHI, self.updateShow, self);
		GGlobal.control.register(pFlag, Enum_MsgType.SJXS_REWARD, self.showReward, self);
	}

	private openRank() {
		let self = this;
		GGlobal.layerMgr.open(UIConst.SHENJIANG_XIANSHI_RANK, GGlobal.modelsjxs.rankData[self.vo.qs]);
	}

	private openTarget() {
		GGlobal.layerMgr.open(UIConst.SHENJIANG_XIANSHI_REWARD);
	}
}