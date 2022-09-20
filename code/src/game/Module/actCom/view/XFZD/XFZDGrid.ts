class XFZDGrid extends fairygui.GComponent {

	public grid: ViewGrid;
	public drawImg: fairygui.GImage;

	public static URL: string = "ui://nshesk1rmm9s8";

	public static createInstance(): XFZDGrid {
		return <XFZDGrid><any>(fairygui.UIPackage.createObject("ActCom_XFZD", "XFZDGrid"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let self = this;
		CommonManager.parseChildren(self, self);
		self.drawImg.visible = false;
	}

	public setVo(vo: IGridImpl) {
		let self = this;
		self.grid.isShowEff = true;
		self.grid.tipEnabled = true;
		self.grid.vo = vo;
	}

	public setDraw(value: boolean) {
		this.drawImg.visible = value;
	}

	public clean() {
		let self = this;
		self.grid.clean();
		self.drawImg.visible = false;
	}
}