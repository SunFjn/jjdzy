class Child_ZSSF extends fairygui.GComponent implements IPanel {

	public c1: fairygui.Controller;
	public backImg: fairygui.GLoader;
	public goBt: Button1;
	public surLb: fairygui.GRichTextField;
	public item0: ZSSFCityItem;
	public item4: ZSSFCityItem;
	public item2: ZSSFCityItem;
	public item1: ZSSFCityItem;
	public item3: ZSSFCityItem;
	public resTimeLb: fairygui.GRichTextField;
	public resBt: fairygui.GButton;
	public costLb: ViewResource;
	public cityLb0: fairygui.GRichTextField;
	public cityLb1: fairygui.GRichTextField;
	public cityIcon: fairygui.GLoader;
	public rewardLb0: ViewResource2;
	public qdLb: fairygui.GRichTextField;
	public timeLb: fairygui.GRichTextField;
	public rewardLb1: ViewResource2;
	public head0: ViewHead;
	public head1: ViewHead;
	public goGeneralBt: Button2;
	public resCom: ViewResource2;
	public ldNumLb: fairygui.GRichTextField;
	public powerLb: fairygui.GLabel;
	private itemArr: ZSSFCityItem[] = [];
	public ldBt: Button1;
	public reportBt: Button5;
	public shopBt: Button2;
	public smBt: Button2;
	public cityPrompt: fairygui.GRichTextField;
	public cityDataGroup: fairygui.GGroup;
	public freegroup: fairygui.GGroup;
	public ldImg: fairygui.GImage;

	public static URL: string = "ui://3o8q23uult8ir";

	public static createInstance(): Child_ZSSF {
		return <Child_ZSSF><any>(fairygui.UIPackage.createObject("syzlb", "Child_ZSSF"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let self = this;
		CommonManager.parseChildren(self, self);
		self.itemArr = [self.item0, self.item1, self.item2, self.item3, self.item4];
	}

	public initView(pParent: fairygui.GObject) {

	}

	private curItem: ZSSFCityItem;
	public updateShow() {
		let self = this;
		let model = GGlobal.modelzssf;
		self.surLb.text = "今日掠夺次数：" + model.ldNum;
		IconUtil.setImg(self.backImg, Enum_Path.BACK_URL + "zssf" + self.c1.selectedIndex + ".jpg");
		Timer.instance.remove(self.resHandler, self);
		Timer.instance.remove(self.timeHandler, self);
		if (self.c1.selectedIndex == 0) {
			for (let i = 0; i < self.itemArr.length; i++) {
				self.itemArr[i].onShow(model.cityData[i + 1]);
			}
			if (!self.curItem) {
				self.itemArr[0].setChoose(true);
				self.curItem = self.itemArr[0];
			}
			let curData = self.curItem.cityData;
			let cfg = Config.zssf_294[curData.id];
			self.cityLb0.text = cfg.name;
			self.cityIcon.url = CommonManager.getUrl("syzlb", curData.id == 5 ? "city1" : "city0");
			let rewardArr = ConfigHelp.makeItemListArr(JSON.parse(cfg.reward));
			self.rewardLb0.setImgUrl(rewardArr[0].icon);
			self.goGeneralBt.visible = curData.state == 0;
			if (curData.state == 0) {
				self.goGeneralBt.checkNotice = model.getHasWujiang(curData.id).length > 0;
				self.timeLb.text = "";
				self.rewardLb0.setCount(cfg.time / Model_ZSSF.rewardTime * rewardArr[0].count);
				self.qdLb.text = "需镇守时长：" + Math.floor(cfg.time / 3600) + "小时";
				self.timeLb.visible = self.rewardLb1.visible = false;
				self.head0.setdata(0);
			} else {
				if (curData.state == 1) {
					let surTime = ConfigHelp.getSurTime(curData.times);
					let rewardTime = Math.floor((cfg.time - surTime) / Model_ZSSF.rewardTime);
					self.timeLb.text = "剩余时间：" + DateUtil.getHMSBySecond2(surTime);
					self.rewardLb0.setCount(rewardTime * rewardArr[0].count + HtmlUtil.fontNoSize("(+" + rewardArr[0].count + "/10分钟)", Color.getColorStr(2)));
					if (surTime > 0) {
						Timer.instance.listen(self.timeHandler, self, 1000);
					}
				} else {
					self.timeLb.text = "已完成";
					self.rewardLb0.setCount(cfg.time / Model_ZSSF.rewardTime * rewardArr[0].count);
				}
				self.timeLb.visible = true;
				self.qdLb.text = "被掠夺：" + curData.bldNum + "/" + Config.xtcs_004[8007].num;
				let rewardArr1 =  ConfigHelp.makeItemListArr(JSON.parse(cfg.reward1));
				self.rewardLb1.visible = true;
				self.rewardLb1.setImgUrl(rewardArr1[0].icon);
				self.rewardLb1.setCount(curData.bldNum * rewardArr1[0].count);
				self.head0.setdata(RoleUtil.getHeadRole(Config.hero_211[curData.generalID].head), -1, "总加成:" + (curData.per / 1000) + "%", -1, true);
			}
			self.goBt.checkNotice = model.ldNum > 0;
		} else {
			if (!model.ldData) return;
			self.goBt.checkNotice = false;
			for (let i = 0; i < self.itemArr.length; i++) {
				self.itemArr[i].onShow1(i + 1, model.ldData[i + 1]);
			}
			if (!self.curItem) {
				self.itemArr[0].setChoose(true);
				self.curItem = self.itemArr[0];
			}
			let curData = self.curItem.cityData1;
			let cfg = Config.zssf_294[self.curItem.cityID];
			self.cityLb1.text = cfg.name;
			self.cityIcon.url = CommonManager.getUrl("syzlb", self.curItem.cityID == 5 ? "city1" : "city0");
			if (curData) {
				let rewardArr = ConfigHelp.makeItemListArr(JSON.parse(cfg.reward1));
				self.resCom.setImgUrl(rewardArr[0].icon);
				self.resCom.setCount(rewardArr[0].count);
				self.ldNumLb.text = "可掠夺次数：" + curData.ldNum + "/" + Config.xtcs_004[8007].num;
				self.powerLb.text = curData.power + "";
				self.head1.setdata(RoleUtil.getHeadRole(Config.hero_211[curData.job].head), -1, "", -1, true);
				self.ldBt.checkNotice = curData.ldNum > 0 && model.ldNum > 0;
				self.ldImg.visible = curData.state == 1;
				self.ldBt.visible = curData.state != 1;
			} else {
				self.ldImg.visible = false;
			}
			self.cityDataGroup.visible = curData ? true : false;
			self.cityPrompt.visible = curData ? false : true;
			let surTime = ConfigHelp.getSurTime(model.resTime);
			if (surTime > 0) {
				self.freegroup.visible = true;
				self.resBt.text = "刷新";
				self.resTimeLb.text = DateUtil2.formatUsedTime(surTime, "下次免费刷新时间：uu分ss秒");
				Timer.instance.listen(self.resHandler, self, 1000);
				let costArr = ConfigHelp.makeItemListArr(JSON.parse(Config.xtcs_004[8005].other));
				self.costLb.setImgUrl(costArr[0].icon);
				self.costLb.setCount(costArr[0].count);
			} else {
				self.freegroup.visible = false;
				self.resBt.text = "免费刷新";
			}
		}
		self.reportBt.checkNotice = GGlobal.reddot.checkCondition(UIConst.ZSSF, 1);
	}

	private timeHandler() {
		let self = this;
		let cfg = Config.zssf_294[self.curItem.cityData.id];
		let rewardArr = ConfigHelp.makeItemListArr(JSON.parse(cfg.reward));
		let surTime = ConfigHelp.getSurTime(self.curItem.cityData.times);
		self.timeLb.text = "剩余时间：" + DateUtil.getHMSBySecond2(surTime);
		let rewardTime = Math.floor((cfg.time - surTime) / Model_ZSSF.rewardTime);
		self.timeLb.text = "剩余时间：" + DateUtil.getHMSBySecond2(surTime);
		self.rewardLb0.setCount(rewardTime * rewardArr[0].count + HtmlUtil.fontNoSize("(+" + rewardArr[0].count + "/10分钟)", Color.getColorStr(2)));
		if (surTime <= 0) {
			Timer.instance.remove(self.timeHandler, self);
		}
	}

	private resHandler() {
		let self = this;
		let model = GGlobal.modelzssf;
		let surTime = ConfigHelp.getSurTime(model.resTime);
		self.resTimeLb.text = self.resTimeLb.text = DateUtil2.formatUsedTime(surTime, "下次免费刷新时间：uu分ss秒");;
		if (surTime <= 0) {
			Timer.instance.remove(self.resHandler, self);
			self.freegroup.visible = false;
			self.resBt.text = "免费刷新";
		}
	}

	public openPanel(pData?: any) {
		let self = this;
		GGlobal.modelzssf.CG_GuardArea_openUI_10901();
		self.c1.selectedIndex = 0;
		self.registerEvent(true);
	}

	public closePanel(pData?: any) {
		let self = this;
		IconUtil.setImg(self.backImg, null);
		Timer.instance.remove(self.resHandler, self);
		Timer.instance.remove(self.timeHandler, self);
		self.registerEvent(false);
	}

	private registerEvent(pFlag: boolean): void {
		let self = this;
		GGlobal.control.register(pFlag, UIConst.ZSSF, self.updateShow, self);
		GGlobal.control.register(pFlag, Enum_MsgType.ZSSF_PLAYEFF, self.playEff, self);
		EventUtil.register(pFlag, self.c1, fairygui.StateChangeEvent.CHANGED, self.updateShow, self);
		EventUtil.register(pFlag, self.goBt, egret.TouchEvent.TOUCH_TAP, self.onGo, self);
		EventUtil.register(pFlag, self.goGeneralBt, egret.TouchEvent.TOUCH_TAP, self.onGoGeneral, self);
		EventUtil.register(pFlag, self.ldBt, egret.TouchEvent.TOUCH_TAP, self.onLD, self);
		EventUtil.register(pFlag, self.reportBt, egret.TouchEvent.TOUCH_TAP, self.onReport, self);
		EventUtil.register(pFlag, self.shopBt, egret.TouchEvent.TOUCH_TAP, self.onShop, self);
		EventUtil.register(pFlag, self.resBt, egret.TouchEvent.TOUCH_TAP, self.onRes, self);
		EventUtil.register(pFlag, self.smBt, egret.TouchEvent.TOUCH_TAP, self.onWFSM, self);
		for (let i = 0; i < self.itemArr.length; i++) {
			EventUtil.register(pFlag, self.itemArr[i], egret.TouchEvent.TOUCH_TAP, self.onItem, self);
		}
	}

	private onWFSM() {
		GGlobal.layerMgr.open(UIConst.WFSM_PANEL, UIConst.ZSSF);
	}

	private onRes() {
		let model = GGlobal.modelzssf;
		let surTime = ConfigHelp.getSurTime(model.resTime);
		if (surTime <= 0) {
			model.CG_GuardArea_refresh_10913(0);
		} else {
			if (ConfigHelp.checkEnough(Config.xtcs_004[8005].other, true)) {
				model.CG_GuardArea_refresh_10913(1);
			}
		}
	}

	private onShop() {
		GGlobal.layerMgr.open(UIConst.ZSSF_SHOP);
	}

	private onReport() {
		let self = this;
		self.reportBt.checkNotice = false;
		GGlobal.reddot.setCondition(UIConst.ZSSF, 1, false);
		GGlobal.layerMgr.open(UIConst.ZSSF_BATTLEREPORT);
	}

	private onLD() {
		let self = this;
		let model = GGlobal.modelzssf
		if (self.ldBt.checkNotice) {
			model.cityID = self.curItem.cityData1.cityID;
			model.CG_GuardArea_plunder_10911(self.curItem.cityData1.cityID);
		} else {
			if (model.ldNum <= 0) {
				return ViewCommonWarn.text("掠夺次数不足");
			} else if (self.curItem.cityData1.ldNum <= 0) {
				return ViewCommonWarn.text("被掠夺次数不足");
			}
		}
	}

	private onGo() {
		let self = this;
		self.c1.selectedIndex = self.c1.selectedIndex == 0 ? 1 : 0;
		if (self.curItem) self.curItem.setChoose(false);
		Timer.instance.remove(self.timeHandler, self);
		self.curItem = null;
		GGlobal.modelzssf.CG_GuardArea_openPlunderUI_10909();
	}

	private onGoGeneral() {
		let self = this;
		GGlobal.layerMgr.open(UIConst.ZSSF_GO, self.curItem.cityData.id);
	}

	private onItem(evt: egret.TouchEvent) {
		let self = this;
		let item = evt.target as ZSSFCityItem;
		if (self.curItem && item.hashCode == self.curItem.hashCode) return;
		if (self.curItem) self.curItem.setChoose(false);
		item.setChoose(true);
		self.curItem = item;
		self.updateShow();
	}

	public playEff() {
		let self = this;
		for (let i = 0; i < self.itemArr.length; i++) {
			EffectMgr.addEff("uieff/10092", self.itemArr[i].displayListContainer, self.itemArr[i].width / 2, self.itemArr[i].height / 2, 1000, 1000, false);
		}
	}
}