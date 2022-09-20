class ViewCZHB extends UIPanelBase {
	public bgImg: fairygui.GLoader;
	public btnweek: fairygui.GButton;
	public btnmouth: fairygui.GButton;
	public lbt0: fairygui.GRichTextField;
	public lbt1: fairygui.GRichTextField;
	public list: fairygui.GList;
	public c1: fairygui.Controller;
	public static URL: string = "ui://2o8uvlozk7mb3";

	public static createInstance(): ViewCZHB {
		return <ViewCZHB>(fairygui.UIPackage.createObject("czlb", "ViewCZHB"));
	}

	public constructor() {
		super();
		this.setSkin("czlb", "czlb_atlas0", "ViewCZHB");
	}

	protected setExtends() {
		let f = fairygui.UIObjectFactory.setPackageItemExtension;
		f(ItemCZHB.URL, ItemCZHB);
	}

	protected initView(): void {
		super.initView();
		const self = this;
		self.list.callbackThisObj = self;
		self.list.setVirtual();
		self.list.itemRenderer = self.itemRender;
	}


	private itemRender = (idx, obj: ItemCZHB) => {
		obj.setdata(idx);
	}

	private eventFun = (b) => {
		const self = this;
		const fun = EventUtil.register;
		EventUtil.register(b, self.c1, fairygui.StateChangeEvent.CHANGED, self.onChangerHandler, this);
		GGlobal.control.register(b, UIConst.CZLB_BT, self.update, self);
	}

	private onChangerHandler = () => {
		const self = this;
		let index = self.c1.selectedIndex;
		ViewCZHB.selectIndex = index;
		GGlobal.modelBT.CG_open_20001(index + 1);
	}

	public static selectIndex = 0;
	private update = () => {
		const self = this;
		let model = GGlobal.modelBT;
		if (ViewCZHB.selectIndex == 0) {
			self.list.numItems = model.czhb_lib_week.length;
		} else {
			self.list.numItems = model.czhb_lib_mouth.length;
		}
	}

	private onUpdate() {
		let self = this;
		const end = 0;
		let t = Model_GlobalMsg.getServerTime();
		let zero = TimeUitl.getZeroTime(t);
		let t1 = zero + 86400000;
		let str = TimeUitl.getRemainingTime(t1, t, { hour: "小时", minute: "分", second: "秒" });

		let weekRefreshDay = ConfigHelp.getSystemNum(9911);
		let monthRefreshDay = ConfigHelp.getSystemNum(9912);

		self.lbt0.text = "<font color='#15f234'>" + (weekRefreshDay - (Model_GlobalMsg.kaifuDay % weekRefreshDay||weekRefreshDay)) + "天 " + str + "后刷新</font>";
		self.lbt1.text = "<font color='#15f234'>" + (monthRefreshDay -(Model_GlobalMsg.kaifuDay % monthRefreshDay||monthRefreshDay)) + "天 " + str + "后刷新</font>";
	}

	protected onShown() {
		const self = this;
		self.eventFun(1);
		let index = self.c1.selectedIndex;
		ViewCZHB.selectIndex = index;
		Timer.instance.listen(self.onUpdate, self, 1000);
		GGlobal.modelBT.CG_open_20001(1);
		GGlobal.modelBT.CG_open_20001(2);

		GGlobal.mainUICtr.setIconNotice(UIConst.CZLB_BT,false);
	}

	protected onHide() {
		const self = this;
		Timer.instance.remove(self.onUpdate, self);
		self.eventFun(0);
		GGlobal.layerMgr.close2(UIConst.CZLB_BT);
	}
}