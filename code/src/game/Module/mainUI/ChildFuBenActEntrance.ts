/**在副本中显示的 活动入口*/class ChildFuBenActEntrance extends fairygui.GComponent {

	public n0: fairygui.GLoader;
	public n1: fairygui.GRichTextField;

	public static URL: string = "ui://7gxkx46wfbywb6m";

	private static _inst: ChildFuBenActEntrance;
	public static createInstance(): ChildFuBenActEntrance {
		if (!this._inst) {
			this._inst = <ChildFuBenActEntrance><any>(fairygui.UIPackage.createObject("MainUI", "ChildFuBenActEntrance"));
		}
		return this._inst;
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.n0 = <fairygui.GLoader><any>(this.getChild("n0"));
		this.n1 = <fairygui.GRichTextField><any>(this.getChild("n1"));

		this.listener();
	}

	private listener() {
		let s = this;
		// s.checkActivityHall();
		// GGlobal.reddot.listen(UIConst.LONGZHONGDUI, s.checkActivityHall, s);
	}

	private checkActivityHall() {
		// let ret = GGlobal.reddot.checkCondition(UIConst.LONGZHONGDUI);
		// if (ret) {
		// 	this.show1(UIConst.LONGZHONGDUI);

		// } else {
		// 	this.hide1(UIConst.LONGZHONGDUI);
		// }
	}

	private enterActHD() {
		switch (this.idx) {
			case UIConst.LONGZHONGDUI:
				GGlobal.layerMgr.open(UIConst.LONGZHONGDUI);
				break;
		}
	}

	public setViewVisble(v) {
		this.nowState = v;
		this.setViewVis();
	}

	private setViewVis() {
		this.visible = Boolean(this.nowState && this.visState);
	}

	private iconEff: Part;
	public showEff(value: boolean) {
		let s = this;
		if (value) {
			if (!s.iconEff) {
				s.iconEff = EffectMgr.addEff("uieff/10021", s.displayListContainer, s.n0.x + s.n0.width / 2, s.n0.y + s.n0.height / 2, 1000, -1, true);
			}
		} else {
			if (s.iconEff) {
				EffectMgr.instance.removeEff(s.iconEff);
				s.iconEff = null;
			}
		}
	}

	public idx;
	public visState = 0;
	public nowState = true;
	public show1(id) {
		this.idx = id;
		let icon = Config.xitong_001[id].icon;
		IconUtil.setImg(this.n0, Enum_Path.MAINUI_URL + icon + ".png");
		this.n0.addClickListener(this.enterActHD, this);
		if (!this.parent) {
			GGlobal.layerMgr.UI_MainBottom.addChild(this);
		}
		this.setXY(fairygui.GRoot.inst.width + GGlobal.layerMgr.offx - 104, ViewMainTopUI1.instance.height + GGlobal.layerMgr.uiAlign + ViewMainTopUI2.instance.height - 10);
		this.visState = 1;
		this.showEff(true);
		this.setViewVis();
	}

	public hide1(id) {
		if (id != this.idx) {
			return;
		}
		this.showEff(false);
		this.removeFromParent();
		if (this.n0) {
			IconUtil.setImg(this.n0, null);
			this.n0.removeClickListener(this.enterActHD, this);
		}
		this.visState = 0;
	}
}