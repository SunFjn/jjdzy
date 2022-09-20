class Child_JiaDing_JinSheng extends fairygui.GComponent implements IPanel {

	public c1: fairygui.Controller;
	public curItem: JiaDingJinShengRoleItem;
	public nextItem: JiaDingJinShengRoleItem;
	public labPower: fairygui.GLabel;
	public btnOnekey: Button1;
	public imgArrow: fairygui.GImage;
	public labAttrCur: fairygui.GRichTextField;
	public labAttrNext: fairygui.GRichTextField;
	public labUp: fairygui.GLabel;
	public costLb: fairygui.GRichTextField;

	public static URL: string = "ui://ypo8uejwctaj2";

	public static createInstance(): Child_JiaDing_JinSheng {
		return <Child_JiaDing_JinSheng><any>(fairygui.UIPackage.createObject("JiaDing", "Child_JiaDing_JinSheng"));
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
		let self = this;
	}

	public updateShow() {
		let self = this;
		let model = GGlobal.modelHouseKeeper;
		let cfg = Config.jdjins_021[model.jdID];
		self.curItem.setVo(cfg);
		self.labPower.text = cfg.power + "";
		if (cfg.next > 0) {
			self.labAttrCur.text = ConfigHelp.attrString(JSON.parse(cfg.attr), "+", Color.getColorStr(1), Color.getColorStr(1));
			let nextcfg = Config.jdjins_021[cfg.next];
			self.labAttrNext.text = ConfigHelp.attrString(JSON.parse(nextcfg.attr), "+", Color.getColorStr(2), Color.getColorStr(2));
			let costItem = ConfigHelp.makeItemListArr(JSON.parse(cfg.xiaohao))[0];
			let count = Model_Bag.getItemCount(costItem.id);
			self.costLb.text = "消耗：" + HtmlUtil.fontNoSize(costItem.name, Color.getColorStr(costItem.quality)) + "X"
				+ costItem.count + HtmlUtil.fontNoSize("(" + count + "/" + costItem.count + ")", Color.getColorStr(count >= costItem.count ? 2 : 6));
			self.nextItem.setVo(nextcfg);
			self.c1.selectedIndex = 0;
		} else {
			self.labAttrCur.text = ConfigHelp.attrString(JSON.parse(cfg.attr), "+", Color.getColorStr(1), Color.getColorStr(2));
			self.c1.selectedIndex = 1;
		}

		self.setNotice()
	}

	public openPanel(pData?: any) {
		let self = this;
		if (GGlobal.modelHouseKeeper.jdLv > 0) {
			self.updateShow();
		} else {
			GGlobal.modelHouseKeeper.CG_HouseKeeper_openUI_11351();
		}
		self.register(true);
	}

	public closePanel(pData?: any) {
		let self = this;
		self.curItem.clean();
		self.nextItem.clean();
		self.register(false);
	}

	public register(pFlag: boolean) {
		let self = this;
		GGlobal.control.register(pFlag, UIConst.HOME_JIADING, self.updateShow, self);
		EventUtil.register(pFlag, self.btnOnekey, egret.TouchEvent.TOUCH_TAP, self.onJingSheng, self);
		GGlobal.reddot.register(pFlag, UIConst.HOME_JIADING, self.setNotice, self);
	}

	private setNotice() {
		let s = this;
		s.btnOnekey.checkNotice = GGlobal.reddot.checkCondition(UIConst.HOME_JIADING, 2);
	}

	private onJingSheng() {
		let self = this;
		let model = GGlobal.modelHouseKeeper;
		let cfg = Config.jdjins_021[model.jdID];
		if (model.jdLv >= cfg.tiaojian) {
			let costItem = ConfigHelp.makeItemListArr(JSON.parse(cfg.xiaohao))[0];
			let count = Model_Bag.getItemCount(costItem.id);
			if (count >= costItem.count) {
				model.CG_HouseKeeper_upHouseKeeper_11353();
			} else {
				View_CaiLiao_GetPanel.show(costItem as VoItem);
			}
		} else {
			ViewCommonWarn.text(ConfigHelp.reTxt("家丁达到{0}可晋升", Config.jdsj_021[cfg.tiaojian].jie));
		}
	}
}