class LiangCaoSceneBottomPanel extends fairygui.GComponent {

	public btnRank: Button2;
	public n2: fairygui.GRichTextField;
	public n4: fairygui.GButton;

	public static URL: string = "ui://mbcu0qc0hd206";

	private static _inst: LiangCaoSceneBottomPanel;
	public static createInstance(): LiangCaoSceneBottomPanel {
		if (!this._inst) {
			this._inst = <LiangCaoSceneBottomPanel><any>(fairygui.UIPackage.createObject("liangcao", "LiangCaoSceneBottomPanel"));
		}
		return this._inst;
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		CommonManager.parseChildren(this, this);
		this.n2.text = HtmlUtil.createLink("玩法说明");
	}

	udpate = () => {
		let self = this;
		self.btnRank.checkNotice = GGlobal.reddot.checkCondition(UIConst.LIANGCAO_RANK);
	}

	cickDescriptHD = () => {
		GGlobal.layerMgr.open(UIConst.WFSM_PANEL, UIConst.LIANGCAO);
	}

	cickRankHD = () => {
		GGlobal.layerMgr.open(UIConst.LIANGCAO_RANK);
	}

	cickExiteHD = () => {
		ViewAlert.show("退出后需要等待30秒才可以重新进入\n是否退出?", Handler.create(this,function () {
			GGlobal.modelLiangCao.CG_BattleGoods_getreward_10127();
		}), ViewAlert.OKANDCANCEL);
	}

	evntFun = (v) => {
		let self = this;
		let event = EventUtil.register;
		event(v, self.btnRank, EventUtil.TOUCH, self.cickRankHD, self);
		event(v, self.n4, EventUtil.TOUCH, self.cickExiteHD, self);
		event(v, self.n2, EventUtil.LINK, self.cickDescriptHD, self);
	}

	cShow = () => {
		let self = this;
		let pat = GGlobal.layerMgr.UI_MainBottom;
		pat.addChild(self);
		self.setXY((fairygui.GRoot.inst.width - self.width) / 2, fairygui.GRoot.inst.height - self.height);

		self.evntFun(1);
		self.udpate();
		GGlobal.reddot.listen(UIConst.LIANGCAO_RANK, self.udpate, self);
	}

	cHide = () => {
		let self = this;
		self.evntFun(0);
		self.removeFromParent();
		GGlobal.reddot.remove(UIConst.LIANGCAO_RANK, self.udpate, self);
	}
}