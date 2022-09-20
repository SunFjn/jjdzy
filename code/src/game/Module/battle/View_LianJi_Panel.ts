class View_LianJi_Panel extends UIModalPanel {

	public showLb: fairygui.GTextField;
	public static URL: string = "ui://jvxpx9emiy753f0";
	public constructor() {
		super();
		this.childrenCreated()
	}

	protected childrenCreated(): void {
		let s = this;
		s.isClosePanel = false;
		s.isShowMask = false;
		s.view = fairygui.UIPackage.createObject("common", "View_LianJi_Panel").asCom;
		s.contentPane = s.view;
		s.showLb = <fairygui.GTextField><any>(s.view.getChild("showLb"));
		super.childrenCreated();
	}

	public updateShow() {
		if (Model_player.voMine && Model_player.voMine.sceneChar) {
			this.showLb.text = Model_player.voMine.sceneChar.lianjiNum + "";
		}
	}

	protected onShown(): void {
		this.updateShow();
		GGlobal.control.listen(Enum_MsgType.LIANJI_UPDATE, this.updateShow, this);
	}

	protected onHide(): void {
		GGlobal.control.remove(Enum_MsgType.LIANJI_UPDATE, this.updateShow, this);
		GGlobal.layerMgr.close(UIConst.LIANJI);
	}

	public resetPosition(): void {
		this.setXY(-GGlobal.layerMgr.offx + 100, 465);
	}
}