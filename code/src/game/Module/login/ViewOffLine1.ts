class ViewOffLine1 extends UIModalPanel {

	public sureBt: Button1;

	public static URL: string = "ui://jvxpx9emhbxz3df";

	public constructor() {
		super();
		this.childrenCreated();
	}

	private contentLb: fairygui.GRichTextField;
	protected childrenCreated(): void {
		let s = this;
		s.isClosePanel = false;
		s.view = fairygui.UIPackage.createObject("common", "ViewOffLine1").asCom;
		s.contentPane = s.view;
		s.contentLb = <fairygui.GRichTextField><any>(s.view.getChild("n3"));
		s.sureBt = <Button1><any>(s.view.getChild("sureBt"));
		s.sureBt.addClickListener(s.onHand, s);
		super.childrenCreated();
		if (s.closeButton) {
			s.closeButton.visible = false;
		}
	}

	private type = 0;
	private hasHand: boolean = false;
	private onHand() {
		this.doHideAnimation();
	}

	protected onHide(): void {
		if (this.type == 0) {
			GGlobal.modelLogin.reLogin();
		} else {
			GGlobal.modelLogin.exiteGame();
		}
		HLSDK.logout();
		GGlobal.layerMgr.close(UIConst.OFFLINE1);
	}

	protected onShown() {
		this.contentLb.text = this._args.content;
		this.type = this._args.type;
	}

	public static show(content: string, type: number = 0) {
		if (!GGlobal.layerMgr.isOpenView(UIConst.OFFLINE1)) {
			GGlobal.layerMgr.open(UIConst.OFFLINE1, { content: content, type: type });
		}
	}
}