/** This is an automatically generated class by FairyGUI. Please do not modify it. **/


class ChildScoreRank extends fairygui.GComponent {

	public n0: fairygui.GList;

	public static URL: string = "ui://edvdots4kzd9k";

	public static createInstance(): ChildScoreRank {
		return <ChildScoreRank><any>(fairygui.UIPackage.createObject("FengHuoLY", "ChildScoreRank"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.n0 = <fairygui.GList><any>(this.getChild("n0"));
		this.n0.callbackThisObj = this;
		this.n0.itemRenderer = this.itemHD;
	}

	private itemHD(idx, obj) {
		let dta = GGlobal.modelFengHuoLY.rank_score;
		let item: FengHuoScoreItem = obj as FengHuoScoreItem;
		item.setdata(dta[idx]);
	}

	private listUpdate() {
		this.n0.numItems = GGlobal.modelFengHuoLY.rank_score.length;
	}

	public show() {
		let sf = this;
		sf.listUpdate();
		GGlobal.modelFengHuoLY.CG_SCORELIST_3571();
		GGlobal.control.listen(Enum_MsgType.FHLY_SCORERANK_UPDATE, sf.listUpdate, sf);
	}

	public hide() {
		let sf = this;
		sf.n0.numItems = 0;
		GGlobal.control.remove(Enum_MsgType.FHLY_SCORERANK_UPDATE, sf.listUpdate, sf);
	}
}