class ViewFenghuoBattleRt extends UIModalPanel {
	public bg1: fairygui.GComponent;
	public btnClose: fairygui.GButton;
	public n2: fairygui.GImage;
	public n3: fairygui.GTextField;
	public lbScore: fairygui.GTextField;
	public n4: fairygui.GImage;
	public n5: fairygui.GImage;
	public list: fairygui.GList;
	public lbTip: fairygui.GRichTextField;
	public n9: fairygui.GTextField;
	public n10: fairygui.GImage;
	public n11: fairygui.GImage;

	public static URL: string = "ui://edvdots4srrsb";

	public constructor() {
		super();
		this.childrenCreated();
	}

	protected childrenCreated(): void {
		GGlobal.createPack("FengHuoLY");
		let a = this;
		a.view = fairygui.UIPackage.createObject("FengHuoLY", "ViewFenghuoBattleRt").asCom;
		a.contentPane = a.view;

		a.bg1 = <fairygui.GComponent><any>(a.view.getChild("bg1"));
		a.btnClose = <fairygui.GButton><any>(a.view.getChild("btnClose"));
		a.n2 = <fairygui.GImage><any>(a.view.getChild("n2"));
		a.n3 = <fairygui.GTextField><any>(a.view.getChild("n3"));
		a.lbScore = <fairygui.GTextField><any>(a.view.getChild("lbScore"));
		a.n4 = <fairygui.GImage><any>(a.view.getChild("n4"));
		a.n5 = <fairygui.GImage><any>(a.view.getChild("n5"));
		a.list = <fairygui.GList><any>(a.view.getChild("list"));
		a.lbTip = <fairygui.GRichTextField><any>(a.view.getChild("lbTip"));
		a.n9 = <fairygui.GTextField><any>(a.view.getChild("n9"));
		a.n10 = <fairygui.GImage><any>(a.view.getChild("n10"));
		a.n11 = <fairygui.GImage><any>(a.view.getChild("n11"));


		a.list.setVirtual();
		a.list.callbackThisObj = a;
		a.list.itemRenderer = a.listRender;
		super.childrenCreated();
	}

	private listRender(idx, obj) {
		let item: ViewGridRender = obj as ViewGridRender;
		item.vo = this.dta[idx];
	}

	private dta;
	protected onShown(): void {
		let s = this;
		s.timeremain = 5000;
		let idx = this._args.id;
		let type = this._args.type;
		if (type == 1){
			let cfg = Config.fhly_254[idx];
			let jifen = cfg.potion1 + ConfigHelp.getSystemNum(3901);
			s.lbScore.text = "积分*" + jifen;
			ViewCommonWarn.text("积分+" + jifen);
			s.dta = ConfigHelp.makeItemListArr(JSON.parse(cfg.reward1));
			s.list.numItems = s.dta.length;
		} else {
			let cfg = Config.fhly_254[idx];
			let jifen = ConfigHelp.getSystemNum(3901);
			s.lbScore.text = "积分*" + jifen;
			ViewCommonWarn.text("积分+" + jifen);
			s.list.numItems = 0;
		}

		s.updateBtnRemain();
		s.addEventListener(egret.Event.ENTER_FRAME, s.onFrame, s);
		s.btnClose.addClickListener(s.finish, s);
	}

	protected onHide() {
		let s = this;
		s.btnClose.removeClickListener(s.finish, s);
		s.removeEventListener(egret.Event.ENTER_FRAME, s.onFrame, s);
		GGlobal.layerMgr.close(UIConst.FHLY_BATTLE);
		let view = GGlobal.layerMgr.getView(UIConst.FHLY);
		if (view) {
			view.visible = true;
		}
		FengHuoLYCtr.exiteBattle();
		// GGlobal.layerMgr.open(UIConst.FHLY, {type:2});
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
		GGlobal.layerMgr.close2(UIConst.FHLY_BATTLE);
	}
}