class Child_ActCom_ZFZJ extends fairygui.GComponent implements IPanel {

	public c1: fairygui.Controller;
	public backImg: fairygui.GLoader;
	public expBar: fairygui.GProgressBar;
	public list: fairygui.GList;
	public timeLb: fairygui.GRichTextField;
	public explainLb: fairygui.GRichTextField;
	public rewardBt: Button1;
	public rankLb: fairygui.GRichTextField;
	public levelLb: fairygui.GRichTextField;
	public item0: ZFZJItem;
	public item1: ZFZJItem;
	public item2: ZFZJItem;
	public battleBt: fairygui.GButton;
	private itemArr: ZFZJItem[] = [];

	public static URL: string = "ui://4h4iwgjrgapng";
	public static pkg = "ActCom_ZFZJ";
	public static createInstance(): Child_ActCom_ZFZJ {
		return <Child_ActCom_ZFZJ><any>(fairygui.UIPackage.createObject("ActCom_ZFZJ", "Child_ActCom_ZFZJ"));
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
		self.expBar.titleType = fairygui.ProgressTitleType.ValueAndMax;
		self.itemArr = [self.item0, self.item1, self.item2];
	}

	private renderHandler(index: number, grid: ViewGrid) {
		grid.isShowEff = grid.tipEnabled = true;
		grid.vo = this.rewardList[index];
	}

	public initView(pParent: fairygui.GObject) {

	}

	public static setExtends() {
		let f = fairygui.UIObjectFactory.setPackageItemExtension;
		f(ZFZJItem.URL, ZFZJItem);
		f(ActCom_ZFZJ_RankItem.URL, ActCom_ZFZJ_RankItem);
		f(ActCom_ZFZJ_RewardItem.URL, ActCom_ZFZJ_RewardItem);
		f(ZFZJSceneInfo.URL, ZFZJSceneInfo);
	}

	private rewardList: IGridImpl[] = [];
	private updateShow() {
		let self = this;
		let model = GGlobal.modelzfzj;
		let cfg = Config.hfkhzfzj_286[model.bossLv];
		self.c1.selectedIndex = model.state;
		self.levelLb.text = "Lv." + cfg.id;
		self.rewardList = ConfigHelp.makeItemListArr(JSON.parse(cfg.reward));
		self.list.numItems = self.rewardList.length;
		self.expBar.value = model.zuiYi;
		self.expBar.max = cfg.zui;
		if (self.c1.selectedIndex == 0) {
			for (let i = 0; i < self.itemArr.length; i++) {
				self.itemArr[i].setVo(i + 1);
			}
			Timer.instance.remove(self.updateEnterTime, self);
		} else if (self.c1.selectedIndex == 1) {
			if (model.times > 0) {
				if (!Timer.instance.has(self.updateEnterTime, self)) {
					Timer.instance.listen(self.updateEnterTime, self, 1000);
				}
			} else {
				Timer.instance.remove(self.updateEnterTime, self);
			}
		} else {
			Timer.instance.remove(self.updateEnterTime, self);
		}
		self.rewardBt.checkNotice = GGlobal.reddot.checkCondition(UIConst.HFKH_ZFZJ_REWARD, 0);
	}

	private updateEnterTime() {
		let model = GGlobal.modelzfzj;
		let self = this;
		model.times--;
		if (model.times <= 0) {
			Timer.instance.remove(self.updateEnterTime, self);
		}
	}

	private timeHandler() {
		let self = this;
		if (self.vo.getSurTime() > 0) {
			self.timeLb.text = "剩余活动时间：" + DateUtil.getMSBySecond4(self.vo.getSurTime());
			Timer.instance.listen(self.timeHandler, self);
		} else {
			Timer.instance.remove(self.timeHandler, self);
		}
	}

	private vo: Vo_Activity;
	public openPanel(pData?: Vo_Activity) {
		let self = this;
		self.vo = pData;
		GGlobal.modelzfzj.activityVo = pData;
		if (pData.getSurTime() > 0) {
			self.timeLb.text = "剩余活动时间：" + DateUtil.getMSBySecond4(pData.getSurTime());
			Timer.instance.listen(self.timeHandler, self);
		} else {
			Timer.instance.remove(self.timeHandler, self);
		}
		IconUtil.setImg(self.backImg, Enum_Path.ACTCOM_URL + "zfzj.jpg");
		self.registerEvent(true);
		GGlobal.modelActivity.CG_OPENACT(UIConst.HFKH_ZFZJ);
	}

	public closePanel(pData?: any) {
		let self = this;
		Timer.instance.remove(self.timeHandler, self);
		Timer.instance.remove(self.updateEnterTime, self);
		IconUtil.setImg(self.backImg, null);
		self.list.numItems = 0;
		for (let i = 0; i < self.itemArr.length; i++) {
			self.itemArr[i].clean();
		}
		self.registerEvent(false);
	}

	private registerEvent(pFlag: boolean): void {
		let self = this;
		GGlobal.control.register(pFlag, UIConst.HFKH_ZFZJ, self.updateShow, self);
		EventUtil.register(pFlag, self.rewardBt, egret.TouchEvent.TOUCH_TAP, self.openReward, self);
		EventUtil.register(pFlag, self.rankLb, egret.TouchEvent.TOUCH_TAP, self.openRank, self);
		EventUtil.register(pFlag, self.explainLb, egret.TouchEvent.TOUCH_TAP, self.openExplain, self);
		EventUtil.register(pFlag, self.battleBt, egret.TouchEvent.TOUCH_TAP, self.onBattle, self);
	}

	private onBattle() {
		let self = this;
		let model = GGlobal.modelzfzj;
		if (model.times > 0) {
			ViewCommonWarn.text(model.times + "秒后进入挑战");
			return;
		}
		model.CG_HeFuZhangFeiBoss_join_9645();
	}

	private openReward(evt: egret.TouchEvent) {
		GGlobal.layerMgr.open(UIConst.HFKH_ZFZJ_REWARD);
	}

	private openRank(evt: egret.TouchEvent) {
		evt.stopPropagation();
		evt.stopImmediatePropagation();
		GGlobal.layerMgr.open(UIConst.HFKH_ZFZJ_RANK);
	}

	private openExplain(evt: egret.TouchEvent) {
		evt.stopPropagation();
		evt.stopImmediatePropagation();
		GGlobal.layerMgr.open(UIConst.WFSM_PANEL, UIConst.HFKH_ZFZJ);
	}
}