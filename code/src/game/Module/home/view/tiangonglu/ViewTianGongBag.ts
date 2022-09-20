class ViewTianGongBag extends UIModalPanel {
	public frame: fairygui.GLabel;
	public n1: fairygui.GLabel;
	public bagList: fairygui.GList;
	public slectList: fairygui.GList;
	public n4: fairygui.GLabel;
	public n5: fairygui.GRichTextField;
	public bg: fairygui.GImage;
	public n7: fairygui.GRichTextField;
	public btnGO: fairygui.GButton;
	public btnAll: fairygui.GButton;

	public static URL: string = "ui://y0plc878ye039";

	public static createInstance(): ViewTianGongBag {
		return <ViewTianGongBag><any>(fairygui.UIPackage.createObject("home", "ViewTianGongBag"));
	}

	public constructor() {
		super();
		this.childrenCreated();
	}

	protected childrenCreated(): void {
		const self = this;
		self.contentPane = self.view = fairygui.UIPackage.createObject("home", "ViewTianGongBag").asCom;
		CommonManager.parseChildren(self.view, self);
		super.childrenCreated();
		self.bagList.callbackThisObj = self;
		self.bagList.itemRenderer = self.bagItemRender;
		self.bagList.setVirtual();

		self.slectList.callbackThisObj = self;
		self.slectList.itemRenderer = self.selectItemRender;
		self.slectList.setVirtual();
	}

	private bagItemRender = (idx, obj) => {
		const model = GGlobal.homemodel;
		const item: TianGongItem = obj as TianGongItem;
		item.setdata(model.bagdata[idx], 0);
	}

	private selectItemRender = (idx, obj) => {
		const model = GGlobal.homemodel;
		const item: TianGongItem = obj as TianGongItem;
		let items = model.optArr[idx];
		let vo: IGridImpl = VoItem.create(items[0]);
		vo.count = items[1];
		item.setdata(vo, 1);
	}

	private buildBag() {
		GGlobal.homemodel.buildTianGongBagData();
		this.viewUpdate();
	}

	private viewUpdate() {
		const self = this;
		const model = GGlobal.homemodel;
		self.bagList.numItems = model.bagdata.length;
		self.slectList.numItems = model.optArr.length;

		let score = 0;
		for (let i = 0; i < model.optArr.length; i++) {
			let item = model.optArr[i];
			let cfg = Config.daoju_204[item[0]];
			score += cfg.tgjf * item[1];
		}
		self.n7.text = ConfigHelp.numToStr(model.score) + "<font color='#15f234'>(+" + ConfigHelp.numToStr(score)  + ")</font>";
	}

	fenjieHD = () => {
		GGlobal.homemodel.CG_House_sacrifice_11117();
	}

	/**
	 * 传入1是注册事件 0为移除
	 */
	public eventFunction(type) {
		const self = this;
		EventUtil.register(type, self.btnGO, EventUtil.TOUCH, self.fenjieHD, self);
	}

	private allAdd() {
		GGlobal.homemodel.allIn();
	}

	onShown() {
		const self = this;
		const model = GGlobal.homemodel;
		const controller = GGlobal.control;
		model.buildTianGongBagData();
		self.viewUpdate();
		controller.listen(HomeModel.HOME_UI_DATA_UPDATE, self.viewUpdate, self);
		controller.listen(HomeModel.HOME_UI_DATA_RE, self.viewUpdate, self);
		controller.listen(Enum_MsgType.MSG_BAG_VO_UPDATE, self.buildBag, self);
		self.btnAll.addClickListener(self.allAdd, self);
	}

	onHide() {
		const self = this;
		const controller = GGlobal.control;
		const model = GGlobal.homemodel;
		model.bagdata = [];
		model.optArr = [];
		self.bagList.numItems = 0;
		self.slectList.numItems = 0;
		controller.remove(HomeModel.HOME_UI_DATA_UPDATE, self.viewUpdate, self);
		controller.remove(HomeModel.HOME_UI_DATA_RE, self.viewUpdate, self);
		controller.remove(Enum_MsgType.MSG_BAG_VO_UPDATE, self.buildBag, self);
		self.btnAll.removeClickListener(self.allAdd, self);
		GGlobal.layerMgr.close(UIConst.HOME_TIANGONG_bag_UI);
	}
}