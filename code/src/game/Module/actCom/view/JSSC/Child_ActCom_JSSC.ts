class Child_ActCom_JSSC extends fairygui.GComponent implements IPanel {

	public backImg: fairygui.GLoader;
	public timeLb: fairygui.GRichTextField;
	public flLb: fairygui.GRichTextField;
	public numLb: fairygui.GRichTextField;
	public moneyBt: Button1;
	public boxImg: fairygui.GLoader;
	private t0: fairygui.Transition;

	public static URL: string = "ui://yug4d48utidc1";
	public static pkg = "ActCom_JSSC";
	public static createInstance(): Child_ActCom_JSSC {
		return <Child_ActCom_JSSC><any>(fairygui.UIPackage.createObject("ActCom_JSSC", "Child_ActCom_JSSC"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let self = this;
		CommonManager.parseChildren(self, self);
		self.t0 = self.getTransition("t0");
	}

	protected _viewParent: fairygui.GObject;
	initView(pParent: fairygui.GObject) {
		let self = this;
		self._viewParent = pParent;
		self.addRelation(self._viewParent, fairygui.RelationType.Size);
	}

	public updateShow() {
		let self = this;
		let model = GGlobal.modelJSSC;
		let cfg = Config.jssc_774[model.numMax];
		let cfg1 = Config.jssc_774[model.buyNum + 1];
		let num = model.numMax - model.buyNum > 0 ? model.numMax - model.buyNum : 0;
		if (!cfg) {
			cfg = Config.jssc_774[model.numMax + 1];
			self.numLb.text = "投资次数：" + num + "\n再充值" + HtmlUtil.fontNoSize((cfg.cz - model.chongzhiNum) + "元", Color.getColorStr(2)) + "可投资1次";
		} else {
			if (!Config.jssc_774[model.numMax + 1]) {
				self.numLb.text = "投资次数：" + num + "\n已达最大投资次数";
			} else {
				let cfg2 = Config.jssc_774[model.numMax + 1];
				self.numLb.text = "投资次数：" + num + "\n再充值" + HtmlUtil.fontNoSize((cfg2.cz - model.chongzhiNum) + "元", Color.getColorStr(2)) + "可投资1次";
			}
		}
		if (!cfg1) {
			cfg1 = Config.jssc_774[model.buyNum];
		}
		let costItem = ConfigHelp.makeItemListArr(JSON.parse(cfg1.xh))[0];
		self.moneyBt.text = "    " + costItem.count;
		self.flLb.text = "至少返利\n" + cfg1.min + "元宝";
		self.moneyBt.checkNotice = num > 0 && Model_player.voMine.yuanbao >= costItem.count;
	}

	private vo: Vo_Activity;
	public openPanel(pData?: Vo_Activity) {
		let self = this;
		self.vo = pData;
		self.moneyBt.touchable = true;
		self.t0.setPaused(true);
		Model_GlobalMsg.CG_ACTTIVITY_OR_SYSTEM_DATA(pData.id);
		Timer.instance.listen(self.timeHandler, self, 1000);
		IconUtil.setImg(self.backImg, Enum_Path.ACTCOM_URL + "jssc.jpg");
		self.moneyBt.addClickListener(self.moneyHandler, self);
		GGlobal.control.listen(UIConst.ACTCOM_JSSC, self.updateShow, self);
		GGlobal.control.listen(UIConst.ACTCOM_JSSC_EFF, self.showEff, self);
	}

	private moneyHandler() {
		let self = this;
		let model = GGlobal.modelJSSC;
		if (self.moneyBt.checkNotice) {
			GGlobal.modelJSSC.CG_GoldenMouse_buy_11581();
		} else {
			let num = model.numMax - model.buyNum > 0 ? model.numMax - model.buyNum : 0;
			if (num <= 0) {
				ViewCommonWarn.text("已无投资次数");
			} else {
				ModelChongZhi.guideToRecharge();
			}
		}
	}

	private showEff(money: number) {
		let self = this;
		self.moneyBt.touchable = false;
		self.t0.setPaused(false);
		EffectMgr.addEff("uieff/10093", self.boxImg.displayObject as fairygui.UIContainer, self.boxImg.width / 2, self.boxImg.height / 2, 900, 900, false);
		let times = setTimeout(function () {
			clearTimeout(times);
			self.moneyBt.touchable = true;
			self.t0.setPaused(true);
			let vo = Vo_Currency.create(Enum_Attr.yuanBao);
			vo.count = money;
			GGlobal.layerMgr.open(UIConst.REWARD_SHOW1, [vo]);
		}, 900);
	}

	public closePanel() {
		let self = this;
		Timer.instance.remove(self.timeHandler, self);
		GGlobal.control.remove(UIConst.ACTCOM_JSSC, self.updateShow, self);
		GGlobal.control.remove(UIConst.ACTCOM_JSSC_EFF, self.showEff, self);
	}

	private timeHandler() {
		let self = this;
		let times = self.vo.getSurTime()
		if (times > 0) {
			self.timeLb.text = "剩余时间：" + DateUtil.getMSBySecond4(times);
		} else {
			self.timeLb.text = "活动已结束";
			Timer.instance.remove(self.timeHandler, self);
		}
	}
}