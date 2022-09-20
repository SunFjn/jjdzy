class View_YanHui_Tournament extends UIModalPanel {

	public frame: fairygui.GLabel;
	public item0: YanHui_ToumamentItem;
	public item1: YanHui_ToumamentItem;
	public item2: YanHui_ToumamentItem;
	public itemArr: YanHui_ToumamentItem[];

	public static URL: string = "ui://4x7dk3lhgz25l";

	public static createInstance(): View_YanHui_Tournament {
		return <View_YanHui_Tournament><any>(fairygui.UIPackage.createObject("YanHui", "View_YanHui_Tournament"));
	}

	public constructor() {
		super();
		this.childrenCreated();
	}

	protected childrenCreated(): void {
		let self = this;
		self.view = fairygui.UIPackage.createObject("YanHui", "View_YanHui_Tournament").asCom;
		self.contentPane = self.view;
		CommonManager.parseChildren(self.view, self);
		self.itemArr = [self.item0, self.item1, self.item2];
		super.childrenCreated();
	}

	private cfgArr: Ipartyboss_298[] = [];
	private updateShow() {
		let self = this;
		if (!self.cfgArr.length) {
			for (let key in Config.partyboss_298) {
				self.cfgArr.push(Config.partyboss_298[key]);
			}
			self.cfgArr.sort(function (a, b) {
				return a.fw - b.fw;
			});
		}
		for (let i = 0; i < self.itemArr.length; i++) {
			self.itemArr[i].setVo(self.cfgArr[i]);
		}
	}

	protected onShown(): void {
		let self = this;
		self.updateShow();
		GGlobal.control.listen(UIConst.YANHUI_BATTLE, self.updateShow, self);
	}

	protected onHide(): void {
		let self = this;
		GGlobal.control.remove(UIConst.YANHUI_BATTLE, self.updateShow, self);
	}
}