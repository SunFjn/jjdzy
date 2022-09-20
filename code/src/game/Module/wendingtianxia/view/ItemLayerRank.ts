/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class ItemLayerRank extends fairygui.GComponent {
	public n10: fairygui.GImage;
	public n12: fairygui.GImage;
	public lbLayer: fairygui.GRichTextField;
	public lbCondition: fairygui.GRichTextField;
	public n3: ViewGrid;
	public n4: ViewGrid;
	public lbWDC: fairygui.GRichTextField;
	public n6: fairygui.GButton;
	public imgYlq: fairygui.GImage;
	public lbCondition_2: fairygui.GRichTextField;


	public static URL: string = "ui://gxs8kn67fl2ha";

	public static createInstance(): ItemLayerRank {
		return <ItemLayerRank><any>(fairygui.UIPackage.createObject("wendingTX", "ItemLayerRank"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.n10 = <fairygui.GImage><any>(this.getChild("n10"));
		this.n12 = <fairygui.GImage><any>(this.getChild("n12"));
		this.lbLayer = <fairygui.GRichTextField><any>(this.getChild("lbLayer"));
		this.lbCondition = <fairygui.GRichTextField><any>(this.getChild("lbCondition"));
		this.n3 = <ViewGrid><any>(this.getChild("n3"));
		this.n4 = <ViewGrid><any>(this.getChild("n4"));
		this.lbWDC = <fairygui.GRichTextField><any>(this.getChild("lbWDC"));
		this.n6 = <fairygui.GButton><any>(this.getChild("n6"));
		this.imgYlq = <fairygui.GImage><any>(this.getChild("imgYlq"));
		this.lbCondition_2 = <fairygui.GRichTextField><any>(this.getChild("lbCondition_2"));

		this.grids = [this.n3, this.n4];

	}

	private grids: ViewGrid[];
	public clean() {
		for (let i = 0; i < 2; i++) {
			this.grids[i].tipEnabled = false;
			this.grids[i].showEff(false);
		}
		this.n6.removeClickListener(this.lqHD, this);
	}

	private lqHD() {
		GGlobal.modelWenDingTX.layerAwards4221(this.idx);
	}

	private idx = 0;
	public setdata(data) {
		this.n6.addClickListener(this.lqHD, this);
		let s = this;
		let idx;
		this.idx = idx = data[0];
		let cfg = Config.wdtx_260[idx];
		s.lbLayer.text = BroadCastManager.reTxt("第{0}层", cfg.id);
		// if (idx > 1) {
		// 	s.lbCondition.text = BroadCastManager.reTxt("进入积分：{0}", Config.wdtx_260[idx - 1].next);
		// } else {
		// 	s.lbCondition.text = BroadCastManager.reTxt("进入积分：{0}", 0);
		// }
		s.lbCondition.text = "";
		s.lbCondition_2.text = "收益：" + ConfigHelp.makeItemRewardText(cfg.reward);
		let isCrossActg = GGlobal.modelWenDingTX.getActivityIsCross();
		let awards = isCrossActg ? cfg.reward1 : cfg.reward2;
		awards = JSON.parse(awards);
		let floorAward = ConfigHelp.makeItemListArr(awards);
		for (let i = 0; i < 2; i++) {
			this.grids[i].tipEnabled = false;
			if (i < floorAward.length) {
				this.grids[i].vo = floorAward[i];
				this.grids[i].tipEnabled = true;
				this.grids[i].showEff(true);
				this.grids[i].visible = true;
			} else {
				this.grids[i].vo = floorAward[i];
				this.grids[i].showEff(false);
				this.grids[i].visible = false;
			}
		}
		let st = data[1];
		s.imgYlq.visible = st == 2;
		s.n6.visible = st == 1;
		s.lbWDC.visible = st == 0;
	}
}