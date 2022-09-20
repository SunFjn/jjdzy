class YuanXiaoGrid extends fairygui.GLabel {

	public numLb: fairygui.GRichTextField;
	public numGroup: fairygui.GGroup;
	public grid: ViewGrid;

	public static URL: string = "ui://ajaichn8wtx2o";

	public static createInstance(): YuanXiaoGrid {
		return <YuanXiaoGrid><any>(fairygui.UIPackage.createObject("ActCom_YuanXiao", "YuanXiaoGrid"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let self = this;
		CommonManager.parseChildren(self, self);
	}

	public setVo(vo: IGridImpl, count: number) {
		let self = this;
		self.numLb.text = "剩余" + count;
		self.grid.isShowEff = self.grid.tipEnabled = true;
		self.grid.vo = vo;
		self.title = vo.name + "*" + vo.count;
	}

	public clean() {
		let self = this;
		self.grid.clean();
	}
}