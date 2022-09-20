class Child_JiaDing_UpJie extends fairygui.GComponent implements IPanel {

	public imgDi: fairygui.GImage;
	public modelImg: fairygui.GLoader;
	public labNeedName: fairygui.GRichTextField;
	public boxNeed: ViewResource;
	public labPower: fairygui.GLabel;
	public btnOnekey: Button0;
	public btnUp: Button0;
	public expBar: fairygui.GProgressBar;
	public labAttrCur: fairygui.GRichTextField;
	public labAttrNext: fairygui.GRichTextField;
	public labAttrMax: fairygui.GRichTextField;
	public imgArrow: fairygui.GImage;
	public labUp: fairygui.GLabel;
	public iconJie: IconJie;
	public nameLb: fairygui.GLabel;
	public upLb: fairygui.GRichTextField;
	public c1: fairygui.Controller;

	public static URL: string = "ui://ypo8uejwctaj1";

	public static createInstance(): Child_JiaDing_UpJie {
		return <Child_JiaDing_UpJie><any>(fairygui.UIPackage.createObject("JiaDing", "Child_JiaDing_UpJie"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let self = this;
		CommonManager.parseChildren(self, self);
	}

	public initView(pParent: fairygui.GObject) {

	}

	private uiRole: UIRole;
	public updateShow() {
		let self = this;
		let model = GGlobal.modelHouseKeeper;
		let cfg = Config.jdjins_021[model.jdID];
		let cfg1 = Config.jdsj_021[model.jdLv];
		self.nameLb.text = cfg.mingzi;
		self.labPower.text = cfg1.power + "";
		if (!self.uiRole) {
			self.uiRole = UIRole.create();
			self.uiRole.uiparent = self.modelImg.displayObject as fairygui.UIContainer;
			self.uiRole.setPos(self.modelImg.width / 2, self.modelImg.height);
		}
		self.uiRole.setBody(cfg.moxing);
		self.uiRole.onAdd();
		if (cfg.next > 0) {
			if (cfg.tiaojian > 0) {
				self.upLb.text = ConfigHelp.reTxt("提升到{0}可晋升为{1}", Config.jdsj_021[cfg.tiaojian].jie, Config.jdjins_021[cfg.next].mingzi);
			} else {
				self.upLb.text = "";
			}
		} else {
			self.upLb.text = "已达最高职位";
		}
		let nextcfg = Config.jdsj_021[model.jdLv + 1];
		if (nextcfg) {
			self.c1.selectedIndex = 0;
			self.labAttrCur.text = ConfigHelp.attrString(JSON.parse(cfg1.attr), "+", Color.getColorStr(1), Color.getColorStr(1));
			self.labAttrNext.text = ConfigHelp.attrString(JSON.parse(nextcfg.attr), "+", Color.getColorStr(2), Color.getColorStr(2));
		} else {
			self.c1.selectedIndex = 1;
			self.labAttrMax.text = ConfigHelp.attrString(JSON.parse(cfg1.attr), "+", Color.getColorStr(1), Color.getColorStr(2));
		}
		self.iconJie.setVal(model.jdLv);
		self.expBar.value = model.jdExp;
		self.expBar.max = cfg1.exp;
		let costItem = VoItem.create(Model_HouseKeeper.costID);
		self.labNeedName.text = costItem.name;
		self.labNeedName.color = costItem.qColor;
		let count = Model_Bag.getItemCount(Model_HouseKeeper.costID);
		self.boxNeed.setImgUrl(costItem.icon);
		self.boxNeed.setCount(count);
		self.setNotice();
	}

	public openPanel(pData?: any) {
		let self = this;
		self.register(true);
		if (GGlobal.modelHouseKeeper.jdLv <= 0) {
			GGlobal.modelHouseKeeper.CG_HouseKeeper_openUI_11351();
		} else {
			self.updateShow();
		}
	}

	public closePanel(pData?: any) {
		let self = this;
		if (self.uiRole) {
			self.uiRole.onRemove();
			self.uiRole = null;
		}
		self.register(false);
	}

	public register(pFlag: boolean) {
		let self = this;
		GGlobal.control.register(pFlag, UIConst.HOME_JIADING, self.updateShow, self);
		GGlobal.reddot.register(pFlag, UIConst.HOME_JIADING, self.setNotice, self);
		EventUtil.register(pFlag, self.btnUp, egret.TouchEvent.TOUCH_TAP, self.onUp, self);
		EventUtil.register(pFlag, self.btnOnekey, egret.TouchEvent.TOUCH_TAP, self.onOneKey, self);
	}

	private setNotice() {
		let s = this;
		s.btnUp.checkNotice = GGlobal.reddot.checkCondition(UIConst.HOME_JIADING, 1);
		s.btnOnekey.checkNotice = GGlobal.reddot.checkCondition(UIConst.HOME_JIADING, 1);
	}

	private onUp() {
		let cfg = Config.fdsj_019[GGlobal.homemodel.home_level];
		let model = GGlobal.modelHouseKeeper;
		if (Math.floor((model.jdLv + 1) / 10) > cfg.jiading) {
			return ViewCommonWarn.text("府邸等级不足");
		}
		let count = Model_Bag.getItemCount(Model_HouseKeeper.costID);
		if (count > 0) {
			model.CG_HouseKeeper_upHouseKeeperLevel_11355(1);
		} else {
			View_CaiLiao_GetPanel.show(VoItem.create(Model_HouseKeeper.costID));
		}
	}

	private onOneKey() {
		let cfg = Config.fdsj_019[GGlobal.homemodel.home_level];
		let model = GGlobal.modelHouseKeeper;
		if (Math.floor((model.jdLv + 1) / 10) > cfg.jiading) {
			return ViewCommonWarn.text("府邸等级不足");
		}
		let count = Model_Bag.getItemCount(Model_HouseKeeper.costID);
		if (count > 0) {
			model.CG_HouseKeeper_upHouseKeeperLevel_11355(2);
		} else {
			View_CaiLiao_GetPanel.show(VoItem.create(Model_HouseKeeper.costID));
		}
	}
}