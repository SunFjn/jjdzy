/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class FHServerRankItem extends fairygui.GComponent {

	public n8: fairygui.GImage;
	public lbServer: fairygui.GTextField;
	public n1: fairygui.GTextField;
	public n3: ViewGrid;
	public n4: ViewGrid;
	public n5: ViewGrid;
	public n6: ViewGrid;
	public n9: fairygui.GImage;
	public n10: fairygui.GTextField;

	public static URL: string = "ui://edvdots4kzd9j";

	public static createInstance(): FHServerRankItem {
		return <FHServerRankItem><any>(fairygui.UIPackage.createObject("FengHuoLY", "FHServerRankItem"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let sf = this;
		sf.n8 = <fairygui.GImage><any>(sf.getChild("n8"));
		sf.lbServer = <fairygui.GTextField><any>(sf.getChild("lbServer"));
		sf.n1 = <fairygui.GTextField><any>(sf.getChild("n1"));
		sf.n3 = <ViewGrid><any>(sf.getChild("n3"));
		sf.n4 = <ViewGrid><any>(sf.getChild("n4"));
		sf.n5 = <ViewGrid><any>(sf.getChild("n5"));
		sf.n6 = <ViewGrid><any>(sf.getChild("n6"));
		sf.n9 = <fairygui.GImage><any>(sf.getChild("n9"));
		sf.n10 = <fairygui.GTextField><any>(sf.getChild("n10"));
		sf.grids = [sf.n3, sf.n4, sf.n5, sf.n6];
	}

	public setRank(val) {
		let sf = this;
		sf.n9.visible = val == 1;
		let m = GGlobal.modelFengHuoLY;
		sf.rank = val;
		let cfg = m.cfg_rank_server[sf.rank - 1];
		let award = ConfigHelp.makeItemListArr(JSON.parse(cfg.reward));
		for (let i = 0; i < 4; i++) {
			if (award[i]) {
				sf.grids[i].showEff(true);
				sf.grids[i].vo = award[i];
			} else {
				sf.grids[i].visible = false;
			}
		}
	}

	public rank;
	public grids: ViewGrid[];
	public setdata(dta, idx) {
		let sf = this;
		sf.setRank(idx+1);

		let m = GGlobal.modelFengHuoLY;
		if (dta) {
			let server = dta[1];
			sf.lbServer.text = "S." + server;
			let score = dta[2];
			if (server == m.redServer) {
				m.redScore = score;
			} else {
				m.blueScore = score;
			}
			sf.n1.text = "总积分：" + score;
			sf.n10.visible = false;
			for (let i = 0; i < 4; i++) {
				sf.grids[i].showEff(true);
				sf.grids[i].tipEnabled = true;
				if(sf.grids[i].vo)
					sf.grids[i].visible = true;
			}
		} else {
			sf.lbServer.text = "";
			sf.n1.text = "";
			sf.n10.visible = true;
			for (let i = 0; i < 4; i++) {
				sf.grids[i].visible = false;
			}
		}
	}

	public clean() {
		let sf = this;
		for (let i = 0; i < 4; i++) {
			sf.grids[i].showEff(false);
		}
	}
}