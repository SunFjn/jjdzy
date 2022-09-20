class ViewOffLine extends UIModalPanel {
	public constructor() {
		super();
		this.loadRes();
	}

	private backImg: fairygui.GLoader;
	private sureBt: fairygui.GButton;
	protected childrenCreated(): void {
		const self = this;
		self.isClosePanel = false;
		self.view = fairygui.UIPackage.createObject("common", "ViewOffLine").asCom;
		self.contentPane = self.view;
		self.backImg = self.view.getChild("backImg").asLoader;
		if (GGlobal.commonpkg) {
			ImageLoader.instance.loader(Enum_Path.BACK_URL + "offline.jpg", self.backImg);
		}
		self.sureBt = self.view.getChild("sureBt").asButton;
		self.sureBt.addClickListener(self.onHand, self);
		super.childrenCreated();
		if (self.closeButton) {
			self.closeButton.visible = false;
		}
		// if (!self.hasInit) {
		// 	self.hasInit = true;
		// 	self.setOffLineInfo(self.strContent);
		// }
	}
	private hasHand: boolean = false;
	private onHand() {
		const self = this;
		if (self.hasHand) {
			return;
		}
		self.hasHand = true;
		// if (self.time <= 0) {

		// } else {
		// 	GGlobal.modelLogin.reLogin();
		// }
		self.doHideAnimation();
	}
	protected onHide(): void {
		GGlobal.modelLogin.exiteGame();
		GGlobal.layerMgr.close(UIConst.OFFLINE);
		this.hasHand = false;
		Timer.instance.remove(this.run, this);
	}
	protected onShown() {
		super.onShown();
		this.time = 10;
		// Timer.instance.listen(this.run, this, 1000);
	}
	private hasInit: boolean = false;
	private strContent: string;
	public static show(content: string) {
		if (!GGlobal.layerMgr.isOpenView(UIConst.OFFLINE)) {
			GGlobal.layerMgr.open(UIConst.OFFLINE);
		}
		var self = GGlobal.layerMgr.getView(UIConst.OFFLINE);
		if (self.hasInit) {
			self.setOffLineInfo(content);
		} else {
			self.strContent = content;
		}
	}
	private time: number = 10;
	private run() {
		if (this.time < 0) {
			Timer.instance.remove(this.run, this);
		}
	}
}