class ViewTrueNameAlert extends UIModalPanel {

	public lb: fairygui.GRichTextField;
	public lb1: fairygui.GRichTextField;
	public btnCancel: fairygui.GButton;
	public btnOk: fairygui.GButton;

	public static URL: string = "ui://girq9ndul5k53";

	public static createInstance(): ViewTrueNameAlert {
		return <ViewTrueNameAlert><any>(fairygui.UIPackage.createObject("trueName", "ViewTrueNameAlert"));
	}

	public constructor() {
		super();
		this.loadRes("trueName", "trueName_atlas0");
	}

	protected childrenCreated(): void {
		GGlobal.createPack("trueName");
		this.view = fairygui.UIPackage.createObject("trueName", "ViewTrueNameAlert").asCom;
		this.contentPane = this.view;

		this.lb = <fairygui.GRichTextField><any>(this.view.getChild("lb"));
		this.lb1 = <fairygui.GRichTextField><any>(this.view.getChild("lb1"));
		this.btnCancel = <fairygui.GButton><any>(this.view.getChild("btnCancel"));
		this.btnOk = <fairygui.GButton><any>(this.view.getChild("btnOk"));
		super.childrenCreated();
	}


	protected onShown(): void {
		let s = this;
		let t = Number(s._args)
		if (t < 3) {
			s.lb.text = "您已累计在线" + t + "小时，请合理安排游戏时间";
		} else if (t < 5) {
			s.lb.text = "您已累计在线" + t + "小时，您已进入疲劳游戏时间，游戏收益变为正常的50%，请您下线休息。";
		} else {
			s.lb.text = "您已累计在线" + t + "小时，您已进入不健康游戏时间，游戏经验收益变为0，请下线休息。";
		}
		s.btnOk.addClickListener(s.onSure, s);
		s.btnCancel.addClickListener(s.onCancel, s);
		s._t = 60
		Timer.instance.listen(s.onTimer, s, 1000);
		s.onTimer();

		if (Model_TrueName.isIdentity) {
			s.lb1.text = "您是否需要进行身份证信息认证"
		} else {
			s.lb1.text = "您是否需要重新进行身份证信息认证"
		}
	}

	protected onHide(): void {
		let s = this;
		GGlobal.layerMgr.close(UIConst.TRUE_NAME_ALERT);
		s.btnOk.removeClickListener(s.onSure, s);
		s.btnCancel.removeClickListener(s.onCancel, s);
		Timer.instance.remove(s.onTimer, s);
	}

	private onSure() {
		GGlobal.layerMgr.open(UIConst.TRUE_NAME)
		this.closeEventHandler(null)
	}

	private onCancel() {
		this.closeEventHandler(null)
	}

	private _t = 60;
	private onTimer() {
		let s = this;
		s._t--;
		s.btnCancel.text = "稍后认证(" + s._t + ")";
		if (s._t < 0) {
			this.closeEventHandler(null);
		}
	}
}