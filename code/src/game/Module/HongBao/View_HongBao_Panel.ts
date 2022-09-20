class View_HongBao_Panel extends UIPanelBase {

	public frame: fairygui.GLabel;
	public backImg: fairygui.GLoader;
	public smLb: fairygui.GRichTextField;
	public nameLb: fairygui.GRichTextField;
	public itemRes: ViewResource;
	public numLb: fairygui.GRichTextField;
	public sendBt: fairygui.GButton;
	public list: fairygui.GList;

	public static URL: string = "ui://s01exr8xqz020";

	public static createInstance(): View_HongBao_Panel {
		return <View_HongBao_Panel><any>(fairygui.UIPackage.createObject("HongBao", "View_HongBao_Panel"));
	}

	public constructor() {
		super();
		this.setSkin("HongBao", "HongBao_atlas0", "View_HongBao_Panel")
	}

	protected setExtends() {
		let f = fairygui.UIObjectFactory.setPackageItemExtension;
		f(HongBaoItem.URL, HongBaoItem);
		f(ItemHongBaoRecord.URL, ItemHongBaoRecord);
	}
	protected initView() {
		let self = this;
		self.list.callbackThisObj = self;
		self.list.itemRenderer = self.renderHandler;
		self.list.setVirtual();
	}

	private renderHandler(index: number, item: HongBaoItem) {
		let model = GGlobal.modelHB;
		item.setVo(model.hbArr[index]);
	}

	public updateShow() {
		let self = this;
		let model = GGlobal.modelHB;
		let moneyVo = Vo_Currency.create(28);
		self.nameLb.text = moneyVo.name;
		self.itemRes.setImgUrl(moneyVo.icon);
		self.itemRes.setCount(model.moneyNum);
		self.numLb.text = "今日发红包剩余次数：" + model.surNum;
		model.hbArr.sort(self.sortHB);
		self.list.numItems = model.hbArr.length;
	}

	public sortHB(a: Vo_HongBao, b: Vo_HongBao) {
		let aState = 0;
		let bState = 0;
		if (a.drawNum < Model_HongBao.max && a.robNum == 0) {
			aState = 0;
		} else if (a.robNum > 0) {
			aState = 1;
		} else if (a.drawNum >= Model_HongBao.max) {
			aState = 2;
		}
		if (b.drawNum < Model_HongBao.max && b.robNum == 0) {
			bState = 0;
		} else if (b.robNum > 0) {
			bState = 1;
		} else if (b.drawNum >= Model_HongBao.max) {
			bState = 2;
		}
		if (aState == bState) {
			return b.id - a.id;
		} else {
			return aState - bState;
		}
	}

	protected onShown(): void {
		let self = this;
		self.updateShow();
		self.register(true);
		IconUtil.setImg(self.backImg, Enum_Path.BACK_URL + "7821.jpg");
		GGlobal.modelHB.CG_OPEN_HONGBAO_11769();
	}

	protected onHide(): void {
		let self = this;
		self.register(false);
		self.list.numItems = 0;
		IconUtil.setImg(self.backImg, null);
	}

	private register(pFlag: boolean) {
		let self = this;
		GGlobal.control.register(pFlag, UIConst.HONGBAO, self.updateShow, self);
		EventUtil.register(pFlag, self.smLb, egret.TouchEvent.TOUCH_TAP, self.OnSM, self);
		EventUtil.register(pFlag, self.sendBt, egret.TouchEvent.TOUCH_TAP, self.OnSend, self);
	}

	private OnSend() {
		GGlobal.layerMgr.open(UIConst.HONGBAO_SEND);
	}

	private OnSM(evt: egret.TouchEvent) {
		evt.stopPropagation();
		evt.stopImmediatePropagation();
		GGlobal.layerMgr.open(UIConst.WFSM_PANEL, UIConst.HONGBAO);
	}
}