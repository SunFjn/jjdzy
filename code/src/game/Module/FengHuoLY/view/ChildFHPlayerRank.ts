/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

class ChildFHPlayerRank extends fairygui.GComponent {

	public n0: fairygui.GList;
	public lbMyRank: fairygui.GTextField;
	public lbMyScore: fairygui.GTextField;

	public static URL: string = "ui://edvdots4kzd9g";

	public static createInstance(): ChildFHPlayerRank {
		return <ChildFHPlayerRank><any>(fairygui.UIPackage.createObject("FengHuoLY", "ChildFHPlayerRank"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		let sf = this;
		sf.n0 = <fairygui.GList><any>(sf.getChild("n0"));
		sf.lbMyRank = <fairygui.GTextField><any>(sf.getChild("lbMyRank"));
		sf.lbMyScore = <fairygui.GTextField><any>(sf.getChild("lbMyScore"));

		sf.n0.callbackThisObj = sf;
		sf.n0.itemRenderer = sf.listReder;
	}

	private listReder(idx, obj) {
		let m = GGlobal.modelFengHuoLY;
		let dta = GGlobal.modelFengHuoLY.rank_player;
		let item = obj as FHPlayerRankItem;
		if (dta[idx]) {
			item.setdata(dta[idx], idx);
		} else {
			item.setdata(null, idx);
		}
	}

	private listUpdate() {
		let sf = this;
		let m = GGlobal.modelFengHuoLY;
		sf.n0.numItems = 10;
		sf.n0.scrollToView(0);
		if (m.myRank == 0)
			sf.lbMyRank.text = "我的排名：10+";
		else
			sf.lbMyRank.text = "我的排名：" + m.myRank;
		sf.lbMyScore.text = "我的积分：" + m.myScore;
	}

	public show() {
		let sf = this;
		GGlobal.modelFengHuoLY.CG_PLAYERRANK_3553();
		GGlobal.control.listen(Enum_MsgType.FHLY_PLAYER_UPDATE, sf.listUpdate, sf);
	}

	public hide() {
		let sf = this;
		sf.n0.numItems = 0;
		GGlobal.control.remove(Enum_MsgType.FHLY_PLAYER_UPDATE, sf.listUpdate, sf);
	}
}