class View_YanHui_JingJiu_Panel extends UIModalPanel {

	public c1: fairygui.Controller;
	public frame: fairygui.GLabel;
	public item0: YanHui_JingJiuItem;
	public item1: YanHui_JingJiuItem;
	public item2: YanHui_JingJiuItem;
	public list: fairygui.GList;
	public backImg: fairygui.GLoader;
	public itemArr: YanHui_JingJiuItem[] = [];
	public tab0: TabButton;
	public tab1: TabButton;

	public static URL: string = "ui://4x7dk3lhgz25r";

	public static createInstance(): View_YanHui_JingJiu_Panel {
		return <View_YanHui_JingJiu_Panel><any>(fairygui.UIPackage.createObject("YanHui", "View_YanHui_JingJiu_Panel"));
	}

	public constructor() {
		super();
		this.childrenCreated();
	}

	protected childrenCreated(): void {
		let self = this;
		self.view = fairygui.UIPackage.createObject("YanHui", "View_YanHui_JingJiu_Panel").asCom;
		self.contentPane = self.view;
		CommonManager.parseChildren(self.view, self);
		self.list.callbackThisObj = self;
		self.list.itemRenderer = self.renderHandler;
		self.list.setVirtual();
		self.itemArr = [self.item0, self.item1, self.item2];
		super.childrenCreated();
	}

	private renderHandler(index: number, item: YanHui_JingJiuRewardItem) {
		item.setVo(GGlobal.modelYanHui.jingJiuRewardData[index]);
	}

	private updateShow() {
		let self = this;
		let model = GGlobal.modelYanHui;
		self.tab1.checkNotice = GGlobal.reddot.checkCondition(UIConst.YANHUI);
		if (self.c1.selectedIndex == 0) {
			for (let i = 0; i < self.itemArr.length; i++) {
				self.itemArr[i].setVo(Config.party9_298[i + 1]);
			}
		} else {
			model.jingJiuRewardData.sort(function (a, b) {
				if (a.state == b.state) {
					return a.id - b.id;
				} else {
					return a.state - b.state;
				}
			})
			self.list.numItems = model.jingJiuRewardData.length;
		}
	}

	protected onShown(): void {
		let self = this;
		self.c1.selectedIndex = 0;
		self.updateShow();
		IconUtil.setImg(self.backImg, Enum_Path.YANHUI_URL + "jingjiu.jpg");
		self.register(true);
	}

	protected onHide(): void {
		let self = this;
		self.list.numItems = 0;
		self.register(false);
		IconUtil.setImg(self.backImg, null);
	}

	private register(pFlag: boolean) {
		let self = this;
		GGlobal.reddot.register(pFlag, UIConst.YANHUI, self.updateShow, self);
		EventUtil.register(pFlag, self.c1, fairygui.StateChangeEvent.CHANGED, self.updateShow, self);
	}
}