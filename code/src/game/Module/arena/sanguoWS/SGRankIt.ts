/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class SGRankIt extends fairygui.GComponent {

	public rankImg: fairygui.GLoader;
	public lbRank: fairygui.GRichTextField;
	public static URL: string = "ui://me1skowl608av";

	public static createInstance(): SGRankIt {
		return <SGRankIt><any>(fairygui.UIPackage.createObject("Arena", "SGRankIt"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.rankImg = <fairygui.GLoader><any>(this.getChild("rankImg"));
		this.lbRank = <fairygui.GRichTextField><any>(this.getChild("lbRank"));
	}

	private grids: ViewGrid[] = [];
	public clean() {
		ConfigHelp.cleanGridview(this.grids);
	}

	public setIndex(i, max) {
		let s = this;
		ConfigHelp.cleanGridview(s.grids);
		let lib = Config.double_230[i + 1];
		let condi = JSON.parse(lib.rank)[0];
		let str = lib.tips;
		if (condi[0] != condi[1]) {
			str += "\n(" + condi[0] + "-" + condi[1] + ")"
			s.rankImg.visible = false;
			s.lbRank.visible = true;
			s.lbRank.text = str;
		} else {
			s.lbRank.visible = false;
			s.rankImg.visible = true;
			s.rankImg.url = CommonManager.getCommonUrl("rank_" + condi[0]);
		}
		let award = JSON.parse(lib.reward);
		let awa = ConfigHelp.makeItemListArr(award);
		s.grids = ConfigHelp.addGridview(awa, s, 100, 20, true, false);
		for (let i = 0; i < s.grids.length; i++) {
			s.grids[i].setXY(466 - i * 88, 7);
			s.grids[i].setScale(0.8,0.8);
		}
	}
}