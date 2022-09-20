class ActiveCourtesyItem extends fairygui.GComponent {

	public bgImg: fairygui.GLoader;
	public grid0: ViewGrid;
	public grid1: ViewGrid;
	public goBt: fairygui.GButton;
	public static URL: string = "ui://kdt501v2tq2ht";

	public static createInstance(): ActiveCourtesyItem {
		return <ActiveCourtesyItem><any>(fairygui.UIPackage.createObject("sanGuoQingDian", "ActiveCourtesyItem"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let s = this;
		s.bgImg = <fairygui.GLoader><any>(s.getChild("bgImg"));
		s.grid0 = <ViewGrid><any>(s.getChild("grid0"));
		s.grid1 = <ViewGrid><any>(s.getChild("grid1"));
		s.grid0.isShowEff = true;
		s.grid1.isShowEff = true;
		s.goBt = <fairygui.GButton><any>(s.getChild("goBt"));
		s.goBt.addClickListener(s.goHandler, s);
	}

	private goHandler() {
		GGlobal.layerMgr.open(this.cfg.open);
	}

	private cfg: Isghyyl_261;
	public setData(value) {
		let s = this;
		let cfg = Config.sghyyl_261[value];
		s.cfg = cfg;
		let rewardArr = ConfigHelp.makeItemListArr(JSON.parse(cfg.reward));
		s.grid0.vo = rewardArr[0];
		s.grid1.vo = rewardArr[1];
		s.grid0.tipEnabled = true;
		s.grid1.tipEnabled = true;
		IconUtil.setImg(s.bgImg, "resource/image/sanGuoQD/" + cfg.sys + ".png");
	}

	public clean() {
		IconUtil.setImg(this.bgImg, null);
		this.grid0.clean();
		this.grid1.clean();
	}
}