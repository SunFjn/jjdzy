/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class ChildLayerRank extends fairygui.GComponent {
	public n0: fairygui.GList;
	public n7: fairygui.GImage;
	public lbNowLayer: fairygui.GRichTextField;
	public lbMaxLayer: fairygui.GRichTextField;
	public lbScore: fairygui.GRichTextField;

	public static URL: string = "ui://gxs8kn67fl2h9";

	public static createInstance(): ChildLayerRank {
		return <ChildLayerRank><any>(fairygui.UIPackage.createObject("wendingTX", "ChildLayerRank"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.n0 = <fairygui.GList><any>(this.getChild("n0"));
		this.n7 = <fairygui.GImage><any>(this.getChild("n7"));
		this.lbNowLayer = <fairygui.GRichTextField><any>(this.getChild("lbNowLayer"));
		this.lbMaxLayer = <fairygui.GRichTextField><any>(this.getChild("lbMaxLayer"));
		this.lbScore = <fairygui.GRichTextField><any>(this.getChild("lbScore"));
		this.n0.callbackThisObj = this;
		this.n0.itemRenderer = this.itemRender;
	}

	private itemRender(idx, obj) {
		let item: ItemLayerRank = obj as ItemLayerRank;
		let dt = this._data[idx] ? this._data[idx] : null;
		item.setdata(dt);
	}

	private _data;
	private updateList() {
		let m = GGlobal.modelWenDingTX;
		this._data = m.rank_Layer;
		this.n0.numItems = this._data.length;

		this.lbNowLayer.text = "当前层数：" + m.layer;
		this.lbMaxLayer.text = "最高层数：" + m.maxLayer;
		this.lbScore.text = "最高积分：" + m.score;
	}

	open() {
		let s = this;
		let m = GGlobal.modelWenDingTX;
		m.layerRank4217();
		s.updateList();
		GGlobal.control.listen(Enum_MsgType.WDTX_RANK, s.updateList, s);
	}

	close() {
		let s = this;
		s.n0.numItems = 0;
		GGlobal.control.remove(Enum_MsgType.WDTX_RANK, s.updateList, s);
	}
}