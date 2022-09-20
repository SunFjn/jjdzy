
class ViewSGWin extends UIModalPanel {
	public bg1: ViewBg1;
	public btnClose: fairygui.GButton;
	public lbInfo: fairygui.GRichTextField;
	public head: ViewHead;
	public static URL: string = "ui://me1skowl608a12";

	public static createInstance(): ViewSGWin {
		return <ViewSGWin><any>(fairygui.UIPackage.createObject("Arena", "ViewSGWin"));
	}

	public constructor() {
		super();
		this.childrenCreated();
	}

	protected childrenCreated(): void {
		GGlobal.createPack("Arena");
		let a = this;
		a.view = fairygui.UIPackage.createObject("Arena", "ViewSGWin").asCom;
		let b = a.contentPane = a.view;

		a.btnClose = <fairygui.GButton><any>(b.getChild("btnClose"));
		a.lbInfo = <fairygui.GRichTextField><any>(b.getChild("lbInfo"));
		a.bg1 = <ViewBg1><any>(b.getChild("bg1"));
		a.head = <ViewHead><any>(b.getChild("head"));
		super.childrenCreated();
	}

	protected onShown(): void {
		let s = this;
		s.timeremain = 5000;
		let idx = s._args;
		let v = GGlobal.modelsgws.raceMapping[idx];
		if (!v) return;
		s.head.setdata(v.head, null, null, null, false, v.headicn);
		s.lbInfo.text = Model_GuanXian.getJiangXianStr(v.jiangxian) + "\n" + v.name + "\n战力：" + v.power;

		s.updateBtnRemain();
		s.addEventListener(egret.Event.ENTER_FRAME, s.onFrame, s);
		s.btnClose.addClickListener(s.finish, s);
	}

	protected onHide() {
		let s = this;
		s.btnClose.removeClickListener(s.finish, s);
		s.removeEventListener(egret.Event.ENTER_FRAME, s.onFrame, s);
		GGlobal.layerMgr.close(UIConst.SGWS_WIN);
		GGlobal.layerMgr.open(UIConst.SANGUO_WUSHUANG);
	}

	public timeremain: number;
	protected timer = 0;
	protected onFrame(e: egret.Event) {
		let s = this;
		s.timer += GGlobal.mapscene.dt;
		s.timeremain -= GGlobal.mapscene.dt;
		if (s.timer >= 500) {
			s.updateBtnRemain();
			s.timer = 0;
		}
		if (s.timeremain <= 0) {
			s.timeremain = 0;
			s.removeEventListener(egret.Event.ENTER_FRAME, s.onFrame, s);
			s.finish();
		}
	}

	protected updateBtnRemain() {
		let s = this;
		s.btnClose.text = "退出" + "(" + Math.ceil(s.timeremain / 1000) + ")";
	}

	protected finish() {
		GGlobal.layerMgr.close2(UIConst.SGWS_WIN);
	}
}