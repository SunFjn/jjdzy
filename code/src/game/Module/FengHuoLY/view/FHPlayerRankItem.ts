/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class FHPlayerRankItem extends fairygui.GComponent {

	public lbRank: fairygui.GTextField;
	public lbName: fairygui.GTextField;
	public lbScore: fairygui.GTextField;
	public n8: fairygui.GImage;
	public n3: ViewGrid;
	public n4: ViewGrid;
	public n5: ViewGrid;

	public static URL: string = "ui://edvdots4kzd9h";

	public static createInstance(): FHPlayerRankItem {
		return <FHPlayerRankItem><any>(fairygui.UIPackage.createObject("FengHuoLY", "FHPlayerRankItem"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let sf = this;

		sf.lbRank = <fairygui.GTextField><any>(sf.getChild("lbRank"));
		sf.lbName = <fairygui.GTextField><any>(sf.getChild("lbName"));
		sf.lbScore = <fairygui.GTextField><any>(sf.getChild("lbScore"));
		sf.n8 = <fairygui.GImage><any>(sf.getChild("n8"));
		sf.n3 = <ViewGrid><any>(sf.getChild("n3"));
		sf.n4 = <ViewGrid><any>(sf.getChild("n4"));
		sf.n5 = <ViewGrid><any>(sf.getChild("n5"));
		sf.grids = [sf.n3, sf.n4, sf.n5];
		sf.n8.visible = false;
	}

	public clean() {
		let sf = this;
		for (let i = 0; i < 3; i++) {
			sf.grids[i].showEff(false);
		}
	}

	private grids: ViewGrid[] = [];
	public setdata(dta, idx) {
		let sf = this;
		let rank = idx + 1;
		let cfg;
		let cfgs = GGlobal.modelFengHuoLY.cfg_rank_player;
		for (let j = 0; j < cfgs.length; j++) {
			let temp = JSON.parse(cfgs[j].rank)[0];
			if (rank >= temp[0] && rank <= temp[1]) {
				cfg = cfgs[j];
			}
		}

		sf.lbRank.text = BroadCastManager.reTxt("第{0}名", rank);
		if (dta) {
			sf.lbName.text = dta[1];
			sf.lbScore.text = BroadCastManager.reTxt("积分：{0}", dta[2]);
			sf.n8.visible = false;
		} else {
			sf.lbName.text = "";
			sf.lbScore.text = "";
			sf.n8.visible = true;
		}

		let award = ConfigHelp.makeItemListArr(JSON.parse(cfg.reward));
		for (let i = 0; i < 3; i++) {
			sf.grids[i].vo = award[i];
			sf.grids[i].showEff(true);
			sf.grids[i].tipEnabled = true;
		}
	}
}