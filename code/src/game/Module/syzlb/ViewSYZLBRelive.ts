class ViewSYZLBRelive extends UIModalPanel {

	public frame: fairygui.GLabel;
	public back: fairygui.GImage;
	public lb: fairygui.GRichTextField;
	public btnCancel: fairygui.GButton;
	public btnOk: fairygui.GButton;

	public static URL: string = "ui://3o8q23uuqqnwg";

	public static createInstance(): ViewSYZLBRelive {
		return <ViewSYZLBRelive><any>(fairygui.UIPackage.createObject("syzlb", "ViewSYZLBRelive"));
	}

	public constructor() {
		super();
		this.isClosePanel = false;
		this.childrenCreated();
	}

	protected childrenCreated(): void {
		let s = this;
		s.view = fairygui.UIPackage.createObject("syzlb", "ViewSYZLBRelive").asCom;
		s.contentPane = s.view;
		CommonManager.parseChildren(s.view, s);
		super.childrenCreated();
	}
	private _rewArr: IGridImpl[];
	protected onShown(): void {
		let s = this;
		let ct = s._args

		let cost = JSON.parse(ConfigHelp.getSystemDesc(7503))[0][2]
		s.lb.text = "是否消耗" + HtmlUtil.fontNoSize(cost + "元宝", Color.GREENSTR) + "复活队伍\n剩余复活次数：" + ct;
		s.btnOk.addClickListener(s.onOKT, s);
		s.btnCancel.addClickListener(s.onCancelT, s);
		s.remainTime = 11
		Timer.instance.listen(s.onTimer, s, 1000)
		s.onTimer()
		s._clickOk = false;
		GGlobal.model_Syzlb.listen(Model_Syzlb.msg_relive, s.relive, s)
	}

	private relive() {
		let s = this;
		s._clickOk = true;
		this.closeEventHandler(null)
	}

	protected onHide(): void {
		let s = this;
		s.btnOk.removeClickListener(s.onOKT, s);
		s.btnCancel.removeClickListener(s.onCancelT, s);
		Timer.instance.remove(s.onTimer, s)
		GGlobal.model_Syzlb.remove(Model_Syzlb.msg_relive, s.relive, s)
		if (!s._clickOk) {
			let m = GGlobal.model_Syzlb
			ViewBattleFault.show(5000, m, "退出", null, m.endBattle);
		}
	}

	public resetPosition(): void {
		super.resetPosition();
		this.setXY((fairygui.GRoot.inst.width - this.width) / 2, (fairygui.GRoot.inst.height - this.height) / 2);
	}

	private _clickOk = false;
	private onOKT() {
		let s = this
		let cost = JSON.parse(ConfigHelp.getSystemDesc(7503))[0][2]
		if (Model_player.voMine.yuanbao < cost) {
			ViewCommonWarn.text("元宝不足")
			return
		}
		s._clickOk = true
		GGlobal.model_Syzlb.CG_RELIVE()
		this.closeEventHandler(null)
	}

	private onCancelT() {
		this.closeEventHandler(null)
	}
	remainTime = 0
	protected onTimer() {
		let s = this;
		s.remainTime--
		if (s.remainTime < 0) {
			s.remainTime = 0;
			Timer.instance.remove(s.onTimer, s)
			this.onCancelT()
		}
		this.btnCancel.text = "退出(" + s.remainTime + ")";
	}
}
