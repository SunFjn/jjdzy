class LunHuiGrid extends fairygui.GComponent{

	public grid: ViewGrid;
	public static URL: string = "ui://ehelf5bhxzzhh";

	public static createInstance(): LunHuiGrid {
		return <LunHuiGrid><any>(fairygui.UIPackage.createObject("lunhui", "LunHuiGrid"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.grid = <ViewGrid><any>(this.getChild("grid"));
	}

	public setVo(vo: IGridImpl) {
		let s = this;
		s.grid.isShowEff = true;
		s.grid.vo = vo;
		s.grid.tipEnabled = true;
	}
}