class View_YanHui_HoldPanel extends UIModalPanel {

	public frame: fairygui.GLabel;
	public numLb0: fairygui.GRichTextField;
	public list0: fairygui.GList;
	public holdBt0: fairygui.GButton;
	public costLb0: ViewResource2;
	public numLb1: fairygui.GRichTextField;
	public list1: fairygui.GList;
	public holdBt1: fairygui.GButton;
	public costLb1: ViewResource2;
	public checkBt: fairygui.GButton;
	public smLb: fairygui.GRichTextField;
	public vipLb0: fairygui.GRichTextField;
	public vipLb1: fairygui.GRichTextField;
	public backImg0: fairygui.GLoader;
	public backImg1: fairygui.GLoader;

	public static URL: string = "ui://4x7dk3lhh7qe3";

	public static createInstance(): View_YanHui_HoldPanel {
		return <View_YanHui_HoldPanel><any>(fairygui.UIPackage.createObject("YanHui", "View_YanHui_HoldPanel"));
	}

	public constructor() {
		super();
		this.childrenCreated();
	}

	protected childrenCreated(): void {
		let self = this;
		self.view = fairygui.UIPackage.createObject("YanHui", "View_YanHui_HoldPanel").asCom;
		self.contentPane = self.view;
		CommonManager.parseChildren(self.view, self);
		self.list0.callbackThisObj = self;
		self.list0.itemRenderer = self.listRenderHandler0;
		self.list1.callbackThisObj = self;
		self.list1.itemRenderer = self.listRenderHandler1;
		super.childrenCreated();
	}

	private listRenderHandler0(index: number, grid: ViewGrid) {
		grid.isShowEff = grid.tipEnabled = true;
		grid.vo = this.listArr0[index];
	}

	private listRenderHandler1(index: number, grid: ViewGrid) {
		grid.isShowEff = grid.tipEnabled = true;
		grid.vo = this.listArr1[index];
	}

	private listArr0: IGridImpl[];
	private listArr1: IGridImpl[];
	private updateShow() {
		let self = this;
		let cfg0 = Config.party_298[1];
		let cfg1 = Config.party_298[2];
		self.listArr0 = ConfigHelp.makeItemListArr(JSON.parse(cfg0.show));
		self.listArr1 = ConfigHelp.makeItemListArr(JSON.parse(cfg1.show));
		self.list0.numItems = self.listArr0.length;
		self.list1.numItems = self.listArr1.length;
		self.costLb0.visible = self.holdBt0.visible = Model_player.voMine.viplv >= cfg0.vip;
		self.vipLb0.visible = Model_player.voMine.viplv < cfg0.vip;
		self.vipLb0.text = "VIP" + cfg0.vip + "可举办";
		self.costLb1.visible = self.holdBt1.visible = Model_player.voMine.viplv >= cfg1.vip
		self.vipLb1.visible = Model_player.voMine.viplv < cfg1.vip;
		self.vipLb1.text = "VIP" + cfg1.vip + "可举办";
		self.numLb0.text = "可参与人数：" + cfg0.num;
		self.numLb1.text = "可参与人数：" + cfg1.num;
		if (Model_player.voMine.viplv >= cfg0.vip) {
			let costItem0 = ConfigHelp.makeItemListArr(JSON.parse(cfg0.consume))[0];
			self.costLb0.setImgUrl(costItem0.icon);
			self.costLb0.setCount(costItem0.count);
		}

		if (Model_player.voMine.viplv >= cfg1.vip) {
			let costItem1 = ConfigHelp.makeItemListArr(JSON.parse(cfg1.consume))[0];
			self.costLb1.setImgUrl(costItem1.icon);
			self.costLb1.setCount(costItem1.count);
		}
	}

	protected onShown(): void {
		let self = this;
		self.register(true);
		self.checkBt.selected = false;
		self.updateShow();
		IconUtil.setImg(self.backImg0, Enum_Path.YANHUI_URL + "type1.png");
		IconUtil.setImg(self.backImg1, Enum_Path.YANHUI_URL + "type2.png");
	}

	protected onHide(): void {
		let self = this;
		self.register(false);
		self.list0.numItems = 0;
		self.list1.numItems = 0;
		IconUtil.setImg(self.backImg0, null);
		IconUtil.setImg(self.backImg1, null);
	}

	public register(pFlag: boolean) {
		let self = this;
		EventUtil.register(pFlag, self.holdBt0, egret.TouchEvent.TOUCH_TAP, self.onHold0, self);
		EventUtil.register(pFlag, self.holdBt1, egret.TouchEvent.TOUCH_TAP, self.onHold1, self);
		EventUtil.register(pFlag, self.checkBt, egret.TouchEvent.TOUCH_TAP, self.onCheck, self);
		EventUtil.register(pFlag, self.smLb, egret.TouchEvent.TOUCH_TAP, self.onWFSM, self);
	}

	private onWFSM(evt: egret.TouchEvent) {
		evt.stopPropagation();
		evt.stopImmediatePropagation();
		GGlobal.layerMgr.open(UIConst.WFSM_PANEL, UIConst.YANHUI)
	}

	private onCheck() {
		let self = this;
	}

	private onHold0() {
		let self = this;
		let cfg0 = Config.party_298[1];
		if (ConfigHelp.checkEnough(cfg0.consume, false)) {
			GGlobal.modelYanHui.CG_House_juban_11457(cfg0.id, 0);
		} else {
			ModelChongZhi.guideToRecharge(Handler.create(self, () => {
				self.doHideAnimation();
			}));
		}
	}

	private onHold1() {
		let self = this;
		let cfg0 = Config.party_298[2];
		if (ConfigHelp.checkEnough(cfg0.consume, false)) {
			let value = self.checkBt.selected ? 1 : 0;
			GGlobal.modelYanHui.CG_House_juban_11457(cfg0.id, value);
		} else {
			ModelChongZhi.guideToRecharge(Handler.create(self, () => {
				self.doHideAnimation();
			}));
		}
	}
}