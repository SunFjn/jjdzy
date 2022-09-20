class ZSSFCityItem extends fairygui.GLabel {

	public timeLb: fairygui.GRichTextField;
	public nameLb: fairygui.GRichTextField;
	public btGroup: fairygui.GGroup;
	public head: ViewHead;
	public costLb: ViewResource2;
	public selImg: fairygui.GImage;
	public ldImg: fairygui.GImage;
	public lockImg: fairygui.GImage;
	public noticeImg: fairygui.GImage;
	public nameGroup: fairygui.GGroup;
	public timesGroup: fairygui.GGroup;
	public drawBt: Button1;
	public backBt: Button0;

	public static URL: string = "ui://3o8q23uuspfrw";

	public static createInstance(): ZSSFCityItem {
		return <ZSSFCityItem><any>(fairygui.UIPackage.createObject("syzlb", "ZSSFCityItem"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let self = this;
		CommonManager.parseChildren(self, self);
		self.costLb.setType(0);
		self.selImg.visible = false;
	}
	//0-未开启,1-正在镇守,2-镇守完毕
	public cityData: { id: number, state: number, times: number, generalID: number, bldNum: number, per: number }
	public onShow(cityData: { id: number, state: number, times: number, generalID: number, bldNum: number, per: number }) {
		let self = this;
		let cfg = Config.zssf_294[cityData.id];
		self.cityData = cityData;
		self.noticeImg.visible = false;
		self.ldImg.visible = self.drawBt.visible = self.timesGroup.visible = self.btGroup.visible = self.lockImg.visible = self.nameGroup.visible = false;
		if (Model_player.voMine.reincarnationLevel >= cfg.lh || Model_player.voMine.viplv >= cfg.vip) {
			self.touchable = true;
			if (cityData.state != 0) {
				self.drawBt.visible = cityData.state == 2;
				self.btGroup.visible = self.timesGroup.visible = cityData.state == 1;
				self.head.setdata(RoleUtil.getHeadRole(Config.hero_211[cityData.generalID].head), -1, "", -1, true);
				let costItem = ConfigHelp.makeItemListArr(JSON.parse(Config.xtcs_004[8004].other))[0];
				if (cityData.state == 1) {
					self.costLb.setCount(costItem.count);
					self.costLb.setImgUrl(costItem.icon);
					let surTime = ConfigHelp.getSurTime(cityData.times);
					self.timeLb.text = "剩余时间：" + DateUtil.getHMSBySecond2(surTime);
					Timer.instance.listen(self.timeHandler, self);
				} else {
					Timer.instance.remove(self.timeHandler, self);
				}
			} else {
				self.noticeImg.visible = GGlobal.modelzssf.getHasWujiang(cityData.id).length > 0;
				self.nameGroup.visible = true;
				self.nameLb.text = "无人镇守";
				self.head.setdata(0);
			}
			self.nameLb.color = Color.getColorInt(1);
		} else {
			self.head.setdata(0);
			self.lockImg.visible = self.nameGroup.visible = true;
			self.nameLb.text = "轮回" + cfg.lh + "世或VIP" + cfg.vip + "开放";
			self.nameLb.color = Color.getColorInt(6);
			self.touchable = false;
		}
		self.registerEvent(true);
	}

	private timeHandler() {
		let self = this;
		let surTime = ConfigHelp.getSurTime(self.cityData.times);
		self.timeLb.text = "剩余时间：" + DateUtil.getHMSBySecond2(surTime);
		if (surTime <= 0) {
			GGlobal.modelzssf.CG_GuardArea_openUI_10901();
			Timer.instance.remove(self.timeHandler, self);
		}
	}

	public cityID = 0;
	public cityData1: { name: string, job: number, power: number, cityID: number, ldNum: number, state: number };
	public onShow1(cityID: number, value: { name: string, job: number, power: number, cityID: number, ldNum: number, state: number }) {
		let self = this;
		self.touchable = true;
		self.noticeImg.visible = false;
		let cfg = Config.zssf_294[cityID];
		self.cityID = cityID;
		self.cityData1 = value;
		self.drawBt.visible = self.timesGroup.visible = self.btGroup.visible = self.lockImg.visible = false;
		self.nameGroup.visible = true;
		if (value && value.job > 0) {
			self.nameLb.text = value.name;
			self.head.setdata(RoleUtil.getHeadRole(Config.hero_211[value.job].head), -1, "", -1, true);
			self.ldImg.visible = value.state == 1;
		} else {
			self.nameLb.text = "无人镇守";
			self.head.setdata(0);
			self.ldImg.visible = false;
		}
		Timer.instance.remove(self.timeHandler, self);
		self.registerEvent(true);
	}

	public clean() {
		let self = this;
		self.registerEvent(false);
		self.costLb.setImgUrl();
		Timer.instance.remove(self.timeHandler, self);
	}

	private registerEvent(pFlag: boolean): void {
		let self = this;
		EventUtil.register(pFlag, self.drawBt, egret.TouchEvent.TOUCH_TAP, self.onDraw, self);
		EventUtil.register(pFlag, self.backBt, egret.TouchEvent.TOUCH_TAP, self.onBack, self);
	}

	private onDraw() {
		let model = GGlobal.modelzssf
		model.cityID = this.cityData.id
		model.CG_GuardArea_getAward_10905(model.cityID);
	}

	private onBack() {
		let self = this;
		let model = GGlobal.modelzssf;
		let costItem = ConfigHelp.makeItemListArr(JSON.parse(Config.xtcs_004[8004].other))[0];
		ViewAlert.show("是否花费" + HtmlUtil.fontNoSize(costItem.count + "元宝", Color.getColorStr(2)) + "提前召回", Handler.create(this, function func() {
			if (ConfigHelp.checkEnough(Config.xtcs_004[8004].other, false)) {
				model.cityID = self.cityData.id;
				model.CG_GuardArea_recall_10907(self.cityData.id)
			} else {
				ModelChongZhi.guideToRecharge(Handler.create(self, function () {
					GGlobal.layerMgr.close2(UIConst.ZSSF);
				}));
			}
		}, null, true), ViewAlert.OKANDCANCEL, "确定", "取消");
	}

	public _choose = false;
	public setChoose(value) {
		this.selImg.visible = value;
		this._choose = value;
	}
}