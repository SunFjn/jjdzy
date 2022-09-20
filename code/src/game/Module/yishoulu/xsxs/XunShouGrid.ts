class XunShouGrid extends fairygui.GLabel {

	public grid: ViewGrid;
	public showImg: fairygui.GImage;

	public static URL: string = "ui://7y83phvnjw42m";

	public static createInstance(): XunShouGrid {
		return <XunShouGrid><any>(fairygui.UIPackage.createObject("YiShouLu", "XuShouGrid"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let self = this;
		CommonManager.parseChildren(self, self);
	}

	public setVo(vo: IGridImpl) {
		let self = this;
		self.grid.isShowEff = true;
		self.grid.tipEnabled = true;
		self.grid.vo = vo;
		self.showImg.visible = !vo;
	}

	public clean() {
		this.grid.clean();
	}
}