/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class FengHuoLYTop extends fairygui.GComponent {

	public n17: fairygui.GImage;
	public lbScore: fairygui.GRichTextField;
	public lbDesc: fairygui.GRichTextField;
	public lbTime: fairygui.GRichTextField;
	public n21: fairygui.GList;


	public static URL: string = "ui://edvdots4srrs1";

	private static inst: FengHuoLYTop;
	public static createInstance(): FengHuoLYTop {
		if (!this.inst)
			this.inst = <FengHuoLYTop><any>(fairygui.UIPackage.createObject("FengHuoLY", "FengHuoLYTop"));
		return this.inst;
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let sf = this;
		this.n17 = <fairygui.GImage><any>(this.getChild("n17"));
		this.lbScore = <fairygui.GRichTextField><any>(this.getChild("lbScore"));
		this.lbDesc = <fairygui.GRichTextField><any>(this.getChild("lbDesc"));
		this.lbTime = <fairygui.GRichTextField><any>(this.getChild("lbTime"));
		this.n21 = <fairygui.GList><any>(this.getChild("n21"));
		sf.n21.callbackThisObj = sf;
		sf.n21.itemRenderer = sf.itemRender;
	}

	private _data = [];
	private itemRender(idx, obj) {
		let item: FenghuoTopBar = obj as FenghuoTopBar;
		item.setdata(this._data[idx]);
	}
	private scoreUpdate() {
		let sf = this;
		let m = GGlobal.modelFengHuoLY;
		sf._data = [
			[ModelFengHuoLY.RED, m.redScore, m.redServer, 0],
			[ModelFengHuoLY.BLUE, m.blueScore, m.blueServer, 0],
			[ModelFengHuoLY.GREEN, m.greenScore, m.greenServer, 0]
		];
		sf._data = sf._data.sort(function (a, b) { return a[1] > b[1] ? -1 : 1 });
		sf.n21.numItems = sf._data.length;

		sf.lbScore.text = "我的积分：<font color='#FFFFFF'>" + m.myScore + "</font>";
	}

	private openDesc() {
		GGlobal.layerMgr.open(UIConst.WFSM_PANEL, UIConst.FHLY);
	}

	private timer() {
		let m = GGlobal.modelFengHuoLY;
		let now = new Date(Model_GlobalMsg.getServerTime()).getTime();
		let t = (m.getEndTime() - now) / 1000;
		t = t < 0 ? 0 : t;
		let date = DateUtil.getMSBySec3(t >> 0);
		this.lbTime.text = "活动时间：<font color='#FFFFFF'>" + date + "</font>";
	}

	public resetPosition(): void {
		this.setXY((fairygui.GRoot.inst.width - this.width) >> 1, GGlobal.layerMgr.uiAlign);
	}

	public enter() {
		let sf = this;
		let b = GGlobal.layerMgr.UI_MainBottom;
		b.addChild(this);
		sf.scoreUpdate();
		sf.resetPosition();
		GGlobal.control.listen(Enum_MsgType.FHLY_SCORE_UPDATE, sf.scoreUpdate, sf);
		GGlobal.control.listen(Enum_MsgType.FHLY_SCORE_INIT, sf.scoreUpdate, sf);
		Timer.instance.listen(sf.timer, sf, 1000);
		sf.lbDesc.addClickListener(sf.openDesc, sf);
	}


	public exite() {
		let sf = this;
		this.removeFromParent();
		GGlobal.control.remove(Enum_MsgType.FHLY_SCORE_UPDATE, sf.scoreUpdate, sf);
		GGlobal.control.remove(Enum_MsgType.FHLY_SCORE_INIT, sf.scoreUpdate, sf);
		Timer.instance.remove(sf.timer, sf);
		sf.lbDesc.removeClickListener(sf.openDesc, sf);
		sf.n21.numItems = 0;
	}
}