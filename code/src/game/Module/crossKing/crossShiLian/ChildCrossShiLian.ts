class ChildCrossShiLian extends fairygui.GComponent implements IPanel {

	public c1: fairygui.Controller;
	public backImg: fairygui.GLoader;
	public passLb: fairygui.GLabel;
	public wfsmLb: fairygui.GRichTextField;
	public linkLb: fairygui.GRichTextField;
	public moneyRe: ViewResource;
	public shopBt: fairygui.GButton;
	public item0: ShiLianChooseItem;
	public item1: ShiLianChooseItem;
	public item2: ShiLianChooseItem;
	public group0: fairygui.GGroup;
	public item00: ShiLianBuffChooseItem;
	public item01: ShiLianBuffChooseItem;
	public item02: ShiLianBuffChooseItem;
	public nextBt: fairygui.GButton;
	public group1: fairygui.GGroup;
	public backIcon: fairygui.GLoader;
	public boxIcon: fairygui.GLoader;
	public costRe: ViewResource;
	public drawBt: fairygui.GButton;
	public nextBt0: fairygui.GButton;
	public group2: fairygui.GGroup;
	public maxLb: fairygui.GRichTextField;
	public numLb: fairygui.GRichTextField;
	private itemArr: ShiLianChooseItem[] = [];
	private buffItemArr: ShiLianBuffChooseItem[] = [];
	private boxEff: Part;

	public static URL: string = "ui://yqpfulefkh255v";

	public static createInstance(): ChildCrossShiLian {
		return <ChildCrossShiLian><any>(fairygui.UIPackage.createObject("crossKing", "ChildCrossShiLian"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let self = this;
		CommonManager.parseChildren(self, self);
		self.itemArr = [self.item0, self.item1, self.item2];
		self.buffItemArr = [self.item00, self.item01, self.item02];
	}

	initView(pParent: fairygui.GObject) {
	}

	public updateShow() {
		let self = this;
		let model = GGlobal.modelkfsl;
		if (model.floor <= 0) return;
		let cfg = Config.kfsl_767[model.floor];
		if (!cfg) {
			cfg = Config.kfsl_767[model.pass];
			self.maxLb.visible = true;
			self.passLb.text = "试炼" + model.pass + "关";
		} else {
			self.maxLb.visible = false;
			self.passLb.text = "试炼" + model.floor + "关";
		}
		let type = Math.floor(cfg.lx / 100);
		self.c1.selectedIndex = type - 1;
		self.moneyRe.setImgUrl("410411");
		self.moneyRe.setCount(model.trialNum);
		switch (type) {
			case 1:
				for (let i = 0; i < self.itemArr.length && i < model.roleData.length; i++) {
					self.itemArr[i].setVo(model.roleData[i], cfg);
				}
				break;
			case 2:
				for (let i = 0; i < self.buffItemArr.length && i < model.buffData.length; i++) {
					self.buffItemArr[i].setVo(model.buffData[i], cfg);
				}
				break;
			case 3:
				if (Config.kfsl_767[model.floor + 1]) {
					self.maxLb.visible = false;
					self.nextBt0.visible = model.chestNum > 0;
				} else {
					self.nextBt0.visible = false;
					self.maxLb.visible = true;
				}
				let cfg1 = Config.slbx_767[cfg.lx];
				let costArr = ConfigHelp.makeItemListArr(JSON.parse(cfg1.xh));
				self.costRe.visible = model.chestNum > 0;
				self.drawBt.text = model.chestNum > 0 ? "开启宝箱" : "免费开箱";
				self.costRe.setImgUrl(costArr[0].icon);
				self.costRe.setCount(costArr[0].count);
				self.numLb.text = "开箱次数：" + (cfg1.sx - model.chestNum) + "/" + cfg1.sx;
				break;
		}
		if (type != 1) {
			for (let i = 0; i < self.itemArr.length; i++) {
				self.itemArr[i].clean();
			}
		}
		if (type != 2) {
			for (let i = 0; i < self.buffItemArr.length; i++) {
				self.buffItemArr[i].clean();
			}
		}
	}

	private nextHandler() {
		GGlobal.modelkfsl.CG_CrossTrial_nextFloor_10481();
	}

	openPanel(pData?: any) {
		let self = this;
		let model = GGlobal.modelkfsl;
		self.registerEvent(true);
		IconUtil.setImg(self.backImg, Enum_Path.SHILIAN_URL + "back.jpg");
		IconUtil.setImg(self.backIcon, Enum_Path.SHILIAN_URL + "back1.png");
		IconUtil.setImg(self.boxIcon, Enum_Path.SHILIAN_URL + "box.png");
		if (!self.boxEff) {
			self.boxEff = EffectMgr.addEff("uieff/10090", self.boxIcon.displayObject as fairygui.UIContainer, self.boxIcon.width / 2 - 7, self.boxIcon.height / 2 - 29, 1000);
		}
		if (model.floor <= 0) {
			model.CG_CrossTrial_openUI_10471();
		} else {
			self.updateShow();
		}
	}

	closePanel(pData?: any) {
		let self = this;
		self.registerEvent(false);
		IconUtil.setImg(self.backImg, null);
		IconUtil.setImg(self.backIcon, null);
		IconUtil.setImg(self.boxIcon, null);
		if (self.boxEff) {
			EffectMgr.instance.removeEff(self.boxEff);
			self.boxEff = null;
		}
		for (let i = 0; i < self.itemArr.length; i++) {
			self.itemArr[i].clean();
			self.buffItemArr[i].clean();
		}
	}

	private registerEvent(pFlag: boolean): void {
		let self = this;
		GGlobal.control.register(pFlag, UIConst.CROSS_SHILIAN, self.updateShow, self);
		EventUtil.register(pFlag, self.nextBt, egret.TouchEvent.TOUCH_TAP, self.nextHandler, self);
		EventUtil.register(pFlag, self.nextBt0, egret.TouchEvent.TOUCH_TAP, self.nextHandler, self);
		EventUtil.register(pFlag, self.wfsmLb, egret.TouchEvent.TOUCH_TAP, self.wfsmHandler, self);
		EventUtil.register(pFlag, self.linkLb, egret.TouchEvent.TOUCH_TAP, self.linkHandler, self);
		EventUtil.register(pFlag, self.shopBt, egret.TouchEvent.TOUCH_TAP, self.openshop, self);
		EventUtil.register(pFlag, self.drawBt, egret.TouchEvent.TOUCH_TAP, self.openBox, self);
	}

	private openBox() {
		let model = GGlobal.modelkfsl;
		if (model.chestNum <= 0) {
			GGlobal.modelkfsl.CG_CrossTrial_getChest_10479();
		} else {
			let cfg = Config.kfsl_767[model.floor];
			let cfg1 = Config.slbx_767[cfg.lx];
			if (model.chestNum >= cfg1.sx) {
				ViewCommonWarn.text("开箱次数不足");
				return;
			}
			if (ConfigHelp.checkEnough(cfg1.xh, false)) {
				GGlobal.modelkfsl.CG_CrossTrial_getChest_10479();
			} else {
				ModelChongZhi.guideToRecharge();
			}
		}
	}

	private openshop() {
		GGlobal.layerMgr.open(UIConst.SHOP, Config.stroe_218[7].px);
	}

	private wfsmHandler(evt: egret.TouchEvent) {
		evt.stopPropagation();
		evt.stopImmediatePropagation();
		GGlobal.layerMgr.open(UIConst.WFSM_PANEL, UIConst.CROSS_SHILIAN);
	}

	private linkHandler(evt: egret.TouchEvent) {
		evt.stopPropagation();
		evt.stopImmediatePropagation();
		GGlobal.layerMgr.open(UIConst.CROSS_SHILIAN_BUFF);
	}
}