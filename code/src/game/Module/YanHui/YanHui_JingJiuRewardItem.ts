class YanHui_JingJiuRewardItem extends fairygui.GComponent {

	public contentLb: fairygui.GRichTextField;
	public grid: ViewGrid;
	public drawBt: Button1;
	public drawImg: fairygui.GImage;

	public static URL: string = "ui://4x7dk3lhgz25v";

	public static createInstance(): YanHui_JingJiuRewardItem {
		return <YanHui_JingJiuRewardItem><any>(fairygui.UIPackage.createObject("YanHui", "YanHui_JingJiuRewardItem"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let self = this;
		CommonManager.parseChildren(self, self);
	}

	public vo: { name: string, id: number, jjID: number, state: number };
	public setVo(vo: { name: string, id: number, jjID: number, state: number }) {
		let self = this;
		self.vo = vo;
		let cfg = Config.party9_298[vo.jjID];
		self.contentLb.text = HtmlUtil.fontNoSize(vo.name, Color.getColorStr(3)) + "\n向全场敬了一杯\n" + HtmlUtil.fontNoSize(cfg.name, Color.getColorStr(cfg.pz));
		self.grid.isShowEff = self.grid.tipEnabled = true;
		self.grid.vo = ConfigHelp.makeItemListArr(JSON.parse(cfg.reward1))[0];
		self.drawImg.visible = vo.state == 2;
		self.drawBt.visible = vo.state == 1;
		self.drawBt.checkNotice = vo.state == 1;
		self.drawBt.addClickListener(self.onDraw, self);
	}

	private onDraw() {
		GGlobal.modelYanHui.CG_House_lingjiang_11461(this.vo.id);
	}

	public clean() {
		let self = this;
		self.drawBt.removeClickListener(self.onDraw, self);
		self.grid.clean();
	}
}