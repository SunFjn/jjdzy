class Child_ActCom_HFSC extends fairygui.GComponent implements IPanel {

	public c1: fairygui.Controller;
	public backImg: fairygui.GLoader;
	public drawBt: Button1;
	public list: fairygui.GList;
	public drawImg: fairygui.GImage;
	public tab0: fairygui.GButton;
	public tab1: fairygui.GButton;

	public static URL: string = "ui://444si0mygapn2";
	public static pkg: string = "ActCom_HFSC";
	public static createInstance(): Child_ActCom_HFSC {
		return <Child_ActCom_HFSC><any>(fairygui.UIPackage.createObject("ActCom_HFSC", "Child_ActCom_HFSC"));
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
	}

	public initView(pParent: fairygui.GObject) {

	}

	private renderHandler(index: number, grid: ViewGrid) {
		grid.isShowEff = grid.tipEnabled = true;
		grid.vo = this.listData[index];
	}

	private listData: IGridImpl[] = [];
	public updateShow() {
		let self = this;
		let model = GGlobal.modelhfsc;
		let cfg = Config.hfkhhfsc_286[self.c1.selectedIndex + 1];
		self.listData = ConfigHelp.makeItemListArr(JSON.parse(cfg.reward));
		self.list.numItems = self.listData.length;
		self.tab0.getChild("noticeImg").visible = model.scData[0] == 1;
		self.tab1.getChild("noticeImg").visible = model.scData[1] == 1;
		switch (model.scData[self.c1.selectedIndex]) {
			case 0:
				self.drawBt.text = "充点小钱";
				self.drawBt.visible = true;
				self.drawImg.visible = false;
				break;
			case 1:
				self.drawBt.text = "领取";
				self.drawBt.visible = true;
				self.drawBt.checkNotice = true;
				self.drawImg.visible = false;
				break;
			case 2:
				self.drawBt.visible = false;
				self.drawImg.visible = true;
				break;
		}
	}

	private OnDraw() {
		let self = this;
		let model = GGlobal.modelhfsc;
		let cfg = Config.hfkhhfsc_286[self.c1.selectedIndex + 1];
		if (model.scData[self.c1.selectedIndex] == 1) {
			GGlobal.modelhfsc.CG_HeFuFristRecharge_getreward_9631(self.c1.selectedIndex + 1);
		} else if (model.scData[self.c1.selectedIndex] == 0) {
			GGlobal.modelchongzhi.CG_CHONGZHI_135(cfg.cz, null, false);
		}
	}

	public openPanel(pData?: any) {
		let self = this;
		let model = GGlobal.modelhfsc;
		self.registerEvent(true);
		let selIndex = 0;
		if (model.scData[0] != 1 && model.scData[1] == 1) {
			selIndex = 1;
		}
		if (self.c1.selectedIndex == selIndex) {
			self.updateShow();
		} else {
			self.c1.selectedIndex = selIndex;
		}
		IconUtil.setImg(self.backImg, Enum_Path.ACTCOM_URL + "hfsc.jpg");
		GGlobal.modelActivity.CG_OPENACT(UIConst.HFKH_HFSC);
	}
	public closePanel(pData?: any) {
		let self = this;
		self.list.numItems = 0;
		IconUtil.setImg(self.backImg, null);
		self.registerEvent(false);
	}

	private registerEvent(pFlag: boolean): void {
		let self = this;
		GGlobal.control.register(pFlag, UIConst.HFKH_HFSC, self.updateShow, self);
		EventUtil.register(pFlag, self.c1, fairygui.StateChangeEvent.CHANGED, self.updateShow, self);
		EventUtil.register(pFlag, self.drawBt, egret.TouchEvent.TOUCH_TAP, self.OnDraw, self);
	}
}