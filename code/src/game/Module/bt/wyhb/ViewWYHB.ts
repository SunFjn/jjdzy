class ViewWYHB extends UIPanelBase {
	public c1: fairygui.Controller;
	public frame: fairygui.GLabel;
	public bgImg: fairygui.GLoader;
	public list: fairygui.GList;
	public lbPro0: fairygui.GRichTextField;
	public lbPro1: fairygui.GRichTextField;
	public lbPro2: fairygui.GRichTextField;
	public btnlv: TabButton4;
	public btncz: TabButton4;
	public static URL: string = "ui://27qy37vtk7mb0";

	public static createInstance(): ViewWYHB {
		return <ViewWYHB>(fairygui.UIPackage.createObject("wyhb", "ViewWYHB"));
	}

	public constructor() {
		super();
		this.isShowOpenAnimation = false;
		this.setSkin("wyhb", "wyhb_atlas0", "ViewWYHB");
	}

	protected setExtends() {
		let f = fairygui.UIObjectFactory.setPackageItemExtension;
		f(ItemWyhb.URL, ItemWyhb);
	}

	protected initView(): void {
		super.initView();
		const self = this;
		self.list.callbackThisObj = self;
		self.list.setVirtual();
		self.list.itemRenderer = self.itemRender;
	}

	private eventFun = (b) => {
		const self = this;
		const fun = EventUtil.register;
		EventUtil.register(b, self.c1, fairygui.StateChangeEvent.CHANGED, this.onChangerHandler, this);
		GGlobal.control.register(b, UIConst.WYHB_BT, self.update, self);
	}

	private itemRender = (idx, obj: ItemWyhb) => {
		obj.setdata(idx);
	}

	private lastQs = -1;
	public static selectIndex = 0;
	private update = () => {
		const self = this;
		let model = GGlobal.modelBT;
		if (ViewWYHB.selectIndex == 0) {
			self.list.numItems = model.wyhb_lib_lvl.length;
			self.lbPro0.text = BroadCastManager.reTxt("已领:<font color='#15f234'>{0}元</font>", model.hasGetLvMoney);
			self.lbPro1.text = BroadCastManager.reTxt("剩余可领:<font color='#15f234'>{0}元</font>", model.totalLvReMoney-model.hasGetLvMoney);
			self.lbPro2.text = BroadCastManager.reTxt("当前等级:<font color='#15f234'>{0}级</font>", Model_player.voMine.level);
		} else {
			self.list.numItems = model.wyhb_lib_yb.length;
			self.lbPro0.text = BroadCastManager.reTxt("已领:<font color='#15f234'>{0}元</font>", model.hasGetMoney);
			self.lbPro1.text = BroadCastManager.reTxt("剩余可领:<font color='#15f234'>{0}元</font>", model.totalReMoney-model.hasGetMoney);
			self.lbPro2.text = BroadCastManager.reTxt("当前充值:<font color='#15f234'>{0}元</font>", ModelBT.realRechargeValue);
		}
		self.btnlv.checkNotice = GGlobal.reddot.checkCondition(UIConst.WYHB_BT, 1);
		self.btncz.checkNotice = GGlobal.reddot.checkCondition(UIConst.WYHB_BT, 2);
	}

	private onChangerHandler = () => {
		const self = this;
		let index = self.c1.selectedIndex;
		ViewWYHB.selectIndex = index;
		GGlobal.modelBT.CG_open_20011(index + 1);
	}

	protected onShown() {
		const self = this;
		self.eventFun(1);
		GGlobal.modelBT.CG_open_20011(1);
		GGlobal.modelBT.CG_open_20011(2);
		GGlobal.modelBT.initHB();
		GGlobal.mainUICtr.setIconNotice(UIConst.WYHB_BT, GGlobal.reddot.checkCondition(UIConst.WYHB_BT));
	}

	protected onHide() {
		const self = this;
		self.eventFun(0);
		GGlobal.layerMgr.close(UIConst.WYHB_BT);
	}
}