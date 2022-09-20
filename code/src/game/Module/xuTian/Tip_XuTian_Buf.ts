class Tip_XuTian_Buf extends UIModalPanel {

	public img: fairygui.GLoader;
	public lb: fairygui.GRichTextField;

	public static URL: string = "ui://j0lk55yeopmfk";

	public static createInstance(): Tip_XuTian_Buf {
		return <Tip_XuTian_Buf><any>(fairygui.UIPackage.createObject("xuTian", "Tip_XuTian_Buf"));
	}

	public constructor() {
		super();
		this.loadRes("xuTian", "xuTian_atlas0");
	}

	protected childrenCreated(): void {
		var self = this;
		GGlobal.createPack("xuTian");
		self.view = fairygui.UIPackage.createObject("xuTian", "Tip_XuTian_Buf").asCom;
		self.contentPane = self.view;
		CommonManager.parseChildren(self.view, self);
		super.childrenCreated();
	}


	onShown() {
		let self = this;
		let id = this._args
		let buf = Config.xtwlbf_776[id];
		self.img.url = CommonManager.getUrl("xuTian", "buf" + buf.lx)
		self.lb.text = buf.ms
	}

}