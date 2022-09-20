/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class ItemWDTXScore extends fairygui.GComponent {

	public n9: fairygui.GImage;
	public lbCondition: fairygui.GRichTextField;
	public n3: ViewGrid;
	public n4: ViewGrid;
	public lbWDC: fairygui.GRichTextField;
	public n6: Button1;
	public imgYlq: fairygui.GImage;

	public static URL: string = "ui://gxs8kn67fl2h8";

	public static createInstance(): ItemWDTXScore {
		return <ItemWDTXScore><any>(fairygui.UIPackage.createObject("wendingTX", "ItemWDTXScore"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.n9 = <fairygui.GImage><any>(this.getChild("n9"));
		this.lbCondition = <fairygui.GRichTextField><any>(this.getChild("lbCondition"));
		this.n3 = <ViewGrid><any>(this.getChild("n3"));
		this.n4 = <ViewGrid><any>(this.getChild("n4"));
		this.lbWDC = <fairygui.GRichTextField><any>(this.getChild("lbWDC"));
		this.n6 = <Button1><any>(this.getChild("n6"));
		this.imgYlq = <fairygui.GImage><any>(this.getChild("imgYlq"));
		this.n6.checkNotice = true;
		this.grids = [this.n3, this.n4];
	}
	private lqHD() {
		GGlobal.modelWenDingTX.rankScore4237(this.idx);
	}

	private grids: ViewGrid[];
	public clean() {
		for (let i = 0; i < 2; i++) {
			this.grids[i].tipEnabled = false;
			this.grids[i].showEff(false);
		}
		this.n6.removeClickListener(this.lqHD, this);
	}

	private idx;
	public setdata(data) {
		this.n6.addClickListener(this.lqHD, this);
		let s = this;
		let m = GGlobal.modelWenDingTX;
		let rank = data[0];
		s.idx = rank;
		let st = data[1];
		this.n6.visible = st == 1;
		this.lbWDC.visible = st == 0;
		this.imgYlq.visible = st == 2;

		let cfg = Config.wdtxpoint_260[rank];
		let myscrore = GGlobal.modelWenDingTX.score;
		this.lbCondition.text = "积分到达(" + myscrore + "/" + cfg.point + ")";
		this.lbCondition.color = myscrore >= cfg.point ? Color.GREENINT : Color.REDINT;

		let award = ConfigHelp.makeItemListArr(JSON.parse(cfg.reward));
		for (let i = 0; i < 2; i++) {
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