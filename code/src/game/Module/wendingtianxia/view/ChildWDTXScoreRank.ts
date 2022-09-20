class ChildWDTXScoreRank extends fairygui.GComponent {

	public n0: fairygui.GList;
	public lbScore: fairygui.GRichTextField;
	public static URL: string = "ui://gxs8kn67n3vz16";
	public static createInstance(): ChildScoreRank {
		return <ChildScoreRank><any>(fairygui.UIPackage.createObject("wendingTX", "ChildWDTXScoreRank"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.n0 = <fairygui.GList><any>(this.getChild("n0"));
		this.lbScore = <fairygui.GRichTextField><any>(this.getChild("lbScore"));
		this.n0.callbackThisObj = this;
		this.n0.itemRenderer = this.itemRender;
	}

	private itemRender(idx, obj) {
		let item: ItemWDTXScore = obj as ItemWDTXScore;
		let dt = this._data[idx] ? this._data[idx] : null;
		item.setdata(dt);
	}

	private _data;
	private updateList() {
		let m = GGlobal.modelWenDingTX;
		this._data = m.rank_Score;
		this.n0.numItems = m.rank_Score.length;

		this.lbScore.text = "当前积分：" + m.score;
	}

	open() {
		let s = this;
		let m = GGlobal.modelWenDingTX;
		m.rankScore4235();
		s.updateList();
		GGlobal.control.listen(Enum_MsgType.WDTX_RANK, s.updateList, s);
	}
	close() {
		let s = this;
		s.n0.numItems = 0;
		GGlobal.control.remove(Enum_MsgType.WDTX_RANK, s.updateList, s);
	}
}