class View_ZSSF_GeneralGo extends UIModalPanel {

	public promptLb: fairygui.GRichTextField;
	public list: fairygui.GList;
	public gobt: fairygui.GButton;
	public listGroup: fairygui.GGroup;

	public static URL: string = "ui://3o8q23uucenr18";

	public static createInstance(): View_ZSSF_GeneralGo {
		return <View_ZSSF_GeneralGo><any>(fairygui.UIPackage.createObject("syzlb", "View_ZSSF_GeneralGo"));
	}

	public constructor() {
		super();
		this.childrenCreated();
	}

	protected childrenCreated(): void {
		let self = this;
		self.view = fairygui.UIPackage.createObject("syzlb", "View_ZSSF_GeneralGo").asCom;
		self.contentPane = self.view;
		CommonManager.parseChildren(self.view, self);
		self.list.callbackThisObj = self;
		self.list.itemRenderer = self.renderHandler;
		self.list.setVirtual();
		super.childrenCreated();
	}

	private renderHandler(index: number, item: ZSSFGeneralGoItem) {
		let self = this;
		item.onShow(self.listArr[index]);
	}

	private listArr: Ihero_211[];
	protected onShown(): void {
		let self = this;
		if (self._args == 5) {
			self.promptLb.text = "暂无可派遣的神将[color=#ff0000][size=24]\n皇庭只可派遣神将镇守[/size][/color]"
		} else {
			self.promptLb.text = "暂无可派遣的武将"
		}
		self.listArr = GGlobal.modelzssf.getHasWujiang(self._args);
		self.list.numItems = self.listArr.length;
		if (self.list.numItems > 0) self.list.selectedIndex = 0;
		self.listGroup.visible = self.list.numItems > 0;
		self.promptLb.visible = self.list.numItems <= 0;
		self.gobt.addClickListener(self.onGo, self);
	}

	protected onHide(): void {
		let self = this;
		self.list.numItems = 0;
	}

	private onGo() {
		let self = this;
		let model = GGlobal.modelzssf;
		model.cityID = self._args;
		model.goGeneralID = self.listArr[self.list.selectedIndex].type;
		model.CG_GuardArea_dispatch_10903(self._args, model.goGeneralID);
	}
}