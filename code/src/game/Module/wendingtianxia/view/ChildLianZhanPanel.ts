/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class ChildLianZhanPanel extends fairygui.GComponent {
	public n0: fairygui.GList;
	public n3: fairygui.GImage;
	public n1: fairygui.GRichTextField;

	public static URL: string = "ui://gxs8kn67fl2h7";

	public static createInstance(): ChildLianZhanPanel {
		return <ChildLianZhanPanel><any>(fairygui.UIPackage.createObject("wendingTX", "ChildLianZhanPanel"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.n0 = <fairygui.GList><any>(this.getChild("n0"));
		this.n3 = <fairygui.GImage><any>(this.getChild("n3"));
		this.n1 = <fairygui.GRichTextField><any>(this.getChild("n1"));
		this.n0.callbackThisObj = this;
		this.n0.itemRenderer = this.itemRender;
	}

	private itemRender(idx, obj) {
		let item: ItemWDTXZhanDi = obj as ItemWDTXZhanDi;
		let dt = this._data[idx] ? this._data[idx] : null;
		item.setdata(dt);
	}

	private _data;
	private updateList() {
		let m = GGlobal.modelWenDingTX;
		this._data = m.rank_LianZhan;
		this.n0.numItems = this._data.length;

		this.n1.text = "我的连斩：" + m.kill_count;
	}

	open() {
		let s = this;
		let m = GGlobal.modelWenDingTX;
		m.killCountRank4215();
		s.updateList();
		GGlobal.control.listen(Enum_MsgType.WDTX_RANK, s.updateList, s);
	}

	close() {
		let s = this;
		s.n0.numItems = 0;
		GGlobal.control.remove(Enum_MsgType.WDTX_RANK, s.updateList, s);
	}
}