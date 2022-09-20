class ViewHeadWin extends UIModalPanel {
	public bg1: ViewBg1;
	public n16: fairygui.GImage;
	public btnClose: Button1;
	public n2: fairygui.GImage;
	public lbInfo: fairygui.GRichTextField;
	public head: ViewHead;

	public static URL: string = "ui://jvxpx9emvpg63fy";

	public static createInstance(): ViewHeadWin {
		return <ViewHeadWin><any>(fairygui.UIPackage.createObject("common", "ViewHeadWin"));
	}

	public constructor() {
		super();
		this.loadRes();
	}

	protected childrenCreated(): void {
		this.view = fairygui.UIPackage.createObject("common", "ViewHeadWin").asCom;
		this.contentPane = this.view;

		this.bg1 = <ViewBg1><any>(this.view.getChild("bg1"));
		this.n16 = <fairygui.GImage><any>(this.view.getChild("n16"));
		this.btnClose = <Button1><any>(this.view.getChild("btnClose"));
		this.n2 = <fairygui.GImage><any>(this.view.getChild("n2"));
		this.lbInfo = <fairygui.GRichTextField><any>(this.view.getChild("lbInfo"));
		this.head = <ViewHead><any>(this.view.getChild("head"));
		super.childrenCreated();
	}

	protected updateBtnRemain() {
		this.btnClose.text = "确定" + "(" + Math.ceil(this.timeremain / 1000) + ")";
	}

	protected finish() {
		switch (this.systemID) {
			case UIConst.CROSS_MINERAL:
			case UIConst.SHAOZHU_ESCORT:
				GGlobal.layerMgr.close2(UIConst.COMMON_HEAD_WIN);
				GGlobal.modelScene.returnMainScene();
				break;
		}
	}

	public timeremain: number;
	protected timer = 0;
	protected systemID = 0;
	protected onFrame(e: egret.Event) {
		this.timer += GGlobal.mapscene.dt;
		this.timeremain -= GGlobal.mapscene.dt;
		if (this.timer >= 500) {
			this.updateBtnRemain();
			this.timer = 0;
		}
		if (this.timeremain <= 0) {
			this.timeremain = 0;
			this.removeEventListener(egret.Event.ENTER_FRAME, this.onFrame, this);
			this.finish();
		}
	}

	protected onShown(): void {
		let s = this;
		let data = s._args;
		s.timeremain = 5000;
		s.systemID  = data.systemID;
		s.head.setdata(data.head, null, null, null, false);
		s.lbInfo.text = Model_GuanXian.getJiangXianStr(data.jiangxian) + "\n" + data.name + "\n战力：" + data.power;
		s.addEventListener(egret.Event.ENTER_FRAME, s.onFrame, s);
		s.btnClose.addClickListener(s.finish,s);
	}

	protected onHide() {
		let s = this;
		s.btnClose.removeClickListener(s.finish,s);
		GGlobal.layerMgr.close(UIConst.COMMON_HEAD_WIN);
		s.removeEventListener(egret.Event.ENTER_FRAME, s.onFrame, s);
	}

}