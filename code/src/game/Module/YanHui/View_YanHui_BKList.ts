class View_YanHui_BKList extends UIModalPanel {

	public frame: fairygui.GLabel;
	public contentLb: fairygui.GRichTextField;

	public static URL: string = "ui://4x7dk3lhgz25i";

	public static createInstance(): View_YanHui_BKList {
		return <View_YanHui_BKList><any>(fairygui.UIPackage.createObject("YanHui", "View_YanHui_BKList"));
	}

	public constructor() {
		super();
		this.childrenCreated();
	}

	protected childrenCreated(): void {
		let self = this;
		self.view = fairygui.UIPackage.createObject("YanHui", "View_YanHui_BKList").asCom;
		self.contentPane = self.view;
		CommonManager.parseChildren(self.view, self);
		super.childrenCreated();
	}

	protected onShown(): void {
		let self = this;
		let model = GGlobal.modelYanHui;
		let str = "";
		for (let i = 0; i < model.bkList.length; i++) {
			let cfg = Config.partylw_298[model.bkList[i].rewardId];
			str += (i == 0 ? "" : "\n") + HtmlUtil.fontNoSize(model.bkList[i].name, Color.getColorStr(3)) + "携带" + HtmlUtil.fontNoSize(cfg.name, Color.getColorStr(cfg.id + 3))
				+ "前来赴宴 宴会氛围值" + HtmlUtil.fontNoSize("+" + cfg.fw, Color.getColorStr(3));
		}
		self.contentLb.text = str;
	}

	protected onHide(): void {

	}
}