class JinShengGrid extends fairygui.GComponent {

	public grid: ViewGrid;
	public limitImg: fairygui.GImage;

	public static URL: string = "ui://dllc71i9elpxf";

	public static createInstance(): JinShengGrid {
		return <JinShengGrid><any>(fairygui.UIPackage.createObject("rebirth", "JinShengGrid"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.grid = <ViewGrid><any>(this.getChild("grid"));
		this.grid.isShowEff = true;
		this.limitImg = <fairygui.GImage><any>(this.getChild("limitImg"));
	}

	setVo(vo: IGridImpl, isLimit: boolean) {
		this.grid.vo = vo;
		this.grid.tipEnabled = true;
		this.limitImg.visible = isLimit;
	}

	public clean() {
		ConfigHelp.cleanGridEff(this.grid);
	}
}