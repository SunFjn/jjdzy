/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class ViewSGYaZhu extends UIModalPanel {

	public frame:WindowFrame1;
	public btn: fairygui.GButton;
	public n8: fairygui.GRichTextField;
	public n10: fairygui.GImage;
	public lbYb: fairygui.GRichTextField;
	public n12: fairygui.GImage;
	public n13: fairygui.GImage;
	public n14: fairygui.GRichTextField;
	public lbYbWin: fairygui.GRichTextField;
	public lbYbFault: fairygui.GRichTextField;
	public n18: fairygui.GImage;
	public i0: SGCard;
	public n17: fairygui.GImage;
	public n6: fairygui.GRichTextField;
	public i1: SGCard;

	public static URL: string = "ui://me1skowl608az";

	public static createInstance(): ViewSGYaZhu {
		return <ViewSGYaZhu><any>(fairygui.UIPackage.createObject("Arena", "ViewSGYaZhu"));
	}

	public constructor() {
		super();
		this.loadRes();
	}

	protected childrenCreated(): void {
		GGlobal.createPack("Arena");
		let a = this;
		a.view = fairygui.UIPackage.createObject("Arena", "ViewSGYaZhu").asCom;
		let b = a.contentPane = a.view;
		this.frame = <WindowFrame1><any>(a.view.getChild("frame"));
		this.btn = <fairygui.GButton><any>(a.view.getChild("btn"));
		this.n8 = <fairygui.GRichTextField><any>(a.view.getChild("n8"));
		this.n10 = <fairygui.GImage><any>(a.view.getChild("n10"));
		this.lbYb = <fairygui.GRichTextField><any>(a.view.getChild("lbYb"));
		this.n12 = <fairygui.GImage><any>(a.view.getChild("n12"));
		this.n13 = <fairygui.GImage><any>(a.view.getChild("n13"));
		this.n14 = <fairygui.GRichTextField><any>(a.view.getChild("n14"));
		this.lbYbWin = <fairygui.GRichTextField><any>(a.view.getChild("lbYbWin"));
		this.lbYbFault = <fairygui.GRichTextField><any>(a.view.getChild("lbYbFault"));
		this.n18 = <fairygui.GImage><any>(a.view.getChild("n18"));
		this.i0 = <SGCard><any>(a.view.getChild("i0"));
		this.n17 = <fairygui.GImage><any>(a.view.getChild("n17"));
		this.n6 = <fairygui.GRichTextField><any>(a.view.getChild("n6"));
		this.i1 = <SGCard><any>(a.view.getChild("i1"));



		super.childrenCreated();
		a.i0.idx = 0;
		a.i0.clickHandler = Handler.create(a, a.setSel, null);
		a.i1.clickHandler = Handler.create(a, a.setSel, null);
		a.i1.idx = 1;
		let yb = ConfigHelp.getSystemNum(2101);
		this.lbYb.text = yb + "";
		this.lbYbWin.text = yb*2 + "";
		this.lbYbFault.text =yb/2 + "";
	}

	private yazhuHandler() {
		if (!this.canYZ) {
			ViewCommonWarn.text("当前赛程不能下注");
			return;
		}
		let yb = ConfigHelp.getSystemNum(2101);
		let myyb = Model_player.voMine.yuanbao;
		if (myyb < yb) {
			ModelChongZhi.guideToRecharge();
			return;
		}
		GGlobal.modelsgws.CG_XIAZHU_1833(this.pid, this.lun);
	}

	private pid;
	private setSel(pid) {
		this.i0.setSel(pid);
		this.i1.setSel(pid);
		this.pid = pid;
	}

	private setYaZhu(pid) {
		this.i0.setYaZhu(pid);
		this.i1.setYaZhu(pid);
	}


	private lun;
	private canYZ: boolean = false;
	protected onShown() {
		let s = this;
		let d = s._args;
		let lun = d[0];
		this.lun = lun;
		let zu = d[1];
		let m = GGlobal.modelsgws;
		let id = -1;
		s.btn.enabled = true;
		if (m.yazhu[lun]) {
			id = m.yazhu[lun];
			s.btn.enabled = false;
		}
		let dta = m.getGrouperByLun(lun, zu);
		if (dta && dta.length) {//压住过并且有数据
			let vo0: Node_SGWS = dta[0];
			s.i0.setdata(vo0, id);
			this.canYZ = m.checkYazhu(lun, zu);
			let selID = vo0.id;
			if (dta[1]) {
				let vo1: Node_SGWS = dta[1]
				if (vo1.power > vo0.power)
					selID = vo1.id;
				s.i1.setdata(dta[1], id);
				s.i1.touchable = true;
			} else {
				s.i1.touchable = false;
				s.i1.setdata(null, id);
			}
			s.setSel(selID);
		} else {
			s.setSel(-1);
		}
		s.btn.addClickListener(s.yazhuHandler, s);
		GGlobal.control.listen(Enum_MsgType.SGWS_YZ, s.setYaZhu, s);
	}

	protected onHide() {
		let s = this;
		s.btn.removeClickListener(s.yazhuHandler, s);
		GGlobal.control.remove(Enum_MsgType.SGWS_YZ, s.setYaZhu, s);
		GGlobal.layerMgr.close(UIConst.SGWS_YZ);
	}
}