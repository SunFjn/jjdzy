class ZhiGouGrid extends fairygui.GComponent {

	public grid: ViewGrid;

	public static URL: string = "ui://42sp9wgrrquie";

	public static createInstance(): ZhiGouGrid {
		return <ZhiGouGrid><any>(fairygui.UIPackage.createObject("zhigou", "ZhiGouGrid"));
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

	public clean() {
		let s = this;
		s.grid.vo = null;
	}
}