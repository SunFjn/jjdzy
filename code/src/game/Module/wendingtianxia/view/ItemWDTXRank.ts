/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class ItemWDTXRank extends fairygui.GComponent {

	public lbRank: fairygui.GRichTextField;
	public lbName: fairygui.GRichTextField;
	public lbScore: fairygui.GRichTextField;
	public n10: fairygui.GImage;
	public n5: ViewGrid;
	public n6: ViewGrid;
	public n7: ViewGrid;

	public static URL: string = "ui://gxs8kn67fl2h6";

	public static createInstance(): ItemWDTXRank {
		return <ItemWDTXRank><any>(fairygui.UIPackage.createObject("wendingTX", "ItemWDTXRank"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.lbRank = <fairygui.GRichTextField><any>(this.getChild("lbRank"));
		this.lbName = <fairygui.GRichTextField><any>(this.getChild("lbName"));
		this.lbScore = <fairygui.GRichTextField><any>(this.getChild("lbScore"));
		this.n10 = <fairygui.GImage><any>(this.getChild("n10"));
		this.n5 = <ViewGrid><any>(this.getChild("n5"));
		this.n6 = <ViewGrid><any>(this.getChild("n6"));
		this.n7 = <ViewGrid><any>(this.getChild("n7"));

		this.grids = [this.n7, this.n6, this.n5];
	}


	private grids: ViewGrid[];
	public clean() {
		for (let i = 0; i < 3; i++) {
			this.grids[i].tipEnabled = false;
			this.grids[i].showEff(false);
		}
	}

	public setdata(data) {
		let s = this;
		let m = GGlobal.modelWenDingTX;
		let rank = data[0];
		let playerName = data[1];
		let score = data[2];

		let cfg = m.getRankItemCFG(rank);
		let rankDta = JSON.parse(cfg.rank)[0];
		s.lbRank.text = "第" + rank + "名";
		s.lbRank.y = 16;
		s.n10.visible = false;
		if (rank == 11) {
			s.lbRank.text = "10+";
			s.lbRank.y = 46;
			s.lbName.text = '';
			s.lbScore.text = "";
		} else {
			if (playerName == "虚位以待") {
				s.n10.visible = true;
				s.lbName.text = "";
				s.lbScore.text = "";
			} else {
				s.lbName.text = playerName;
				s.lbScore.text = "积分：" + score;
			}
		}

		let award = ConfigHelp.makeItemListArr(JSON.parse(cfg.reward));
		for (let i = 0; i < 3; i++) {
			this.grids[i].tipEnabled = false;
			if (i < award.length) {
				this.grids[i].vo = award[i];
				this.grids[i].showEff(true);
				this.grids[i].tipEnabled = true;
				this.grids[i].visible = true;
			} else {
				this.grids[i].vo = award[i];
				this.grids[i].showEff(false);
				this.grids[i].visible = false;
			}
		}
	}
}