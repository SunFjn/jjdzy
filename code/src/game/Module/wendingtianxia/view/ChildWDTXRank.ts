/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class ChildWDTXRank extends fairygui.GComponent {

	public n0: fairygui.GList;
	public n6: fairygui.GImage;
	public lbMyRank: fairygui.GRichTextField;
	public lbScore: fairygui.GRichTextField;

	public static URL: string = "ui://gxs8kn67fl2h5";

	public static createInstance(): ChildWDTXRank {
		return <ChildWDTXRank><any>(fairygui.UIPackage.createObject("wendingTX", "ChildWDTXRank"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.n0 = <fairygui.GList><any>(this.getChild("n0"));
		this.n6 = <fairygui.GImage><any>(this.getChild("n6"));
		this.lbMyRank = <fairygui.GRichTextField><any>(this.getChild("lbMyRank"));
		this.lbScore = <fairygui.GRichTextField><any>(this.getChild("lbScore"));
		this.n0.callbackThisObj = this;
		this.n0.itemRenderer = this.itemRender;
	}

	private itemRender(idx, obj) {
		let item: ItemWDTXRank = obj as ItemWDTXRank;
		let dt = this._data[idx] ? this._data[idx] : null;
		item.setdata(dt);
	}

	private _data;
	private updateList() {
		let m = GGlobal.modelWenDingTX;
		this._data = m.rank_Total;
		this.n0.numItems = m.rank_Total.length;

		this.lbScore.text = "当前积分：" + m.score;
		if (m.rank > 10)
			this.lbMyRank.text = "我的排名：10+";
		else
			this.lbMyRank.text = "我的排名：" + m.rank;
	}

	open() {
		let s = this;
		let m = GGlobal.modelWenDingTX;
		m.totalRank4213();
		s.updateList();
		GGlobal.control.listen(Enum_MsgType.WDTX_RANK, s.updateList, s);
	}
	close() {
		let s = this;
		s.n0.numItems = 0;
		GGlobal.control.remove(Enum_MsgType.WDTX_RANK, s.updateList, s);
	}
}