class View_XuTian_CangKu extends UIModalPanel {

	public list: fairygui.GList;

	public constructor() {
		super();
		this.loadRes("xuTian", "xuTian_atlas0");
	}

	protected childrenCreated(): void {
		var self = this;
		GGlobal.createPack("xuTian");
		self.view = fairygui.UIPackage.createObject("xuTian", "View_XuTian_CangKu").asCom;
		self.contentPane = self.view;
		CommonManager.parseChildren(self.view, self);


		self.list.callbackThisObj = self;
		self.list.itemRenderer = self.itemRender;
		super.childrenCreated();
	}

	private rewArr: IGridImpl[]
	itemRender = (idx, obj) => {
		let item: ViewGridRender = obj as ViewGridRender;
		item.vo = this.rewArr[idx];
	}

	update = () => {
		let self = this;
		let model = GGlobal.model_XuTian;
		self.rewArr = model.cangKu
		self.list.numItems = self.rewArr.length;
	}

	onShown() {
		let self = this;
		self.update();
		let model = GGlobal.model_XuTian;
		model.CG_OPEN_WARE()
		self.registerEvent(true);
	}

	onHide() {
		let self = this;
		self.list.numItems = 0;
		self.registerEvent(false);
	}


	private registerEvent(pFlag: boolean): void {
		let self = this;
		GGlobal.model_XuTian.register(pFlag, Model_XuTian.CANG_KU, self.update, self);
	}
}
