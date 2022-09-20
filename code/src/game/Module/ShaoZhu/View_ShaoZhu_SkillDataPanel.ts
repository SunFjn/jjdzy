class View_ShaoZhu_SkillDataPanel extends UIModalPanel {

	public attLb: fairygui.GRichTextField;
	public powerLb: fairygui.GRichTextField;
	public skillGrid: ShaoZhuSkillGrid;

	public static URL: string = "ui://p83wyb2bn0801d";

	public constructor() {
		super();
		this.childrenCreated();
	}

	protected childrenCreated(): void {
		let self = this;
		self.view = fairygui.UIPackage.createObject("ShaoZhu", "View_ShaoZhu_SkillDataPanel").asCom;
		self.contentPane = self.view;
		CommonManager.parseChildren(self.view, self);
		self.attLb.leading = 18;
		super.childrenCreated();
	}

	protected onShown(): void {
		let self = this;
		let cfg: Isonskill_267 = self._args;
		self.skillGrid.updateShow(HtmlUtil.fontNoSize(cfg.name, Color.getColorStr(cfg.pz)), cfg.icon, false);
		self.attLb.text = ConfigHelp.attrString(JSON.parse(cfg.attr), "+", Color.getColorStr(2), Color.getColorStr(2));
		self.powerLb.text = cfg.power + "";
	}

	protected onHide(): void {
		GGlobal.layerMgr.close(UIConst.SHAOZHU_ONESKILL);
	}
}