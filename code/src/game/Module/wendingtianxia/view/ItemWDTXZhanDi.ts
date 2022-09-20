/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class ItemWDTXZhanDi extends fairygui.GComponent {

	public n2: ViewGrid;
	public n3: ViewGrid;
	public n4: ViewGrid;
	public n9: fairygui.GImage;
	public lbTitle: fairygui.GRichTextField;
	public lbCondition: fairygui.GRichTextField;
	public lbWDC: fairygui.GRichTextField;
	public n6: Button1;
	public imgYlq: fairygui.GImage;

	public static URL: string = "ui://gxs8kn67rudj17";

	public static createInstance(): ItemWDTXZhanDi {
		return <ItemWDTXZhanDi><any>(fairygui.UIPackage.createObject("wendingTX", "ItemWDTXZhanDi"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.n9 = <fairygui.GImage><any>(this.getChild("n9"));
		this.lbTitle = <fairygui.GRichTextField><any>(this.getChild("lbTitle"));
		this.lbCondition = <fairygui.GRichTextField><any>(this.getChild("lbCondition"));
		this.lbWDC = <fairygui.GRichTextField><any>(this.getChild("lbWDC"));
		this.n6 = <Button1><any>(this.getChild("n6"));
		this.imgYlq = <fairygui.GImage><any>(this.getChild("imgYlq"));
		this.n2 = <ViewGrid><any>(this.getChild("n2"));
		this.n3 = <ViewGrid><any>(this.getChild("n3"));
		this.n4 = <ViewGrid><any>(this.getChild("n4"));
		this.grids = [this.n3, this.n4, this.n2];
		this.n6.checkNotice = true;
	}

	private grids: ViewGrid[];
	public clean() {
		for (let i = 0; i < 3; i++) {
			this.grids[i].tipEnabled = false;
			this.grids[i].showEff(false);
		}
		this.n6.removeClickListener(this.lqHD, this);
	}

	private lqHD() {
		GGlobal.modelWenDingTX.lianzhanAwards4219(this.idx);
	}

	private idx = 0;
	public setdata(data) {
		let idx;
		this.idx = idx = data[0];
		this.n6.addClickListener(this.lqHD, this);
		let s = this;
		let cfg = Config.wdtxlzjl_260[idx];
		s.lbTitle.text = cfg.name;
		s.lbCondition.text = cfg.tips;
		let floorAward = ConfigHelp.makeItemListArr(JSON.parse(cfg.reward));
		for (let i = 0; i < 3; i++) {
			this.grids[i].tipEnabled = false;
			if (i < floorAward.length) {
				this.grids[i].vo = floorAward[i];
				this.grids[i].showEff(true);
				this.grids[i].tipEnabled = true;
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