class View_TSMS_Panel extends UIModalPanel {
	public t0: fairygui.Transition;
	public iconImg: fairygui.GLoader;

	public static URL: string = "ui://jvxpx9emhc263ew";
	public constructor() {
		super();
		this.loadRes();
	}

	protected childrenCreated(): void {
		let s = this;
		s.isShowMask = false;
		s.isClosePanel = false;
		s.view = fairygui.UIPackage.createObject("common", "View_TSMS_Panel").asCom;
		s.contentPane = s.view;
		s.t0 = s.view.getTransition("t0");
		s.iconImg = s.view.getChild("iconImg").asLoader;
		super.childrenCreated();
		s.touchable = false;
	}

	protected onShown(): void {
		IconUtil.setImg(this.iconImg, "resource/image/shenji/" + this._args + ".png");
		this.t0.play();
	}

	protected onHide(): void {
		IconUtil.setImg(this.iconImg, null);
		GGlobal.layerMgr.close(UIConst.TSMS_PANEL);
	}

	public resetPosition(): void {
		this.setXY(100, 280);
	}
}