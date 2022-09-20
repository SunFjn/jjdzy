class ShaoZhuEscReportInter extends fairygui.GComponent{
	public item: ViewGrid;
	public itemNum: fairygui.GTextField;

	public static URL: string = "ui://lnw94ki2imkmo";

	public static createInstance(): ShaoZhuEscReportInter {
		return <ShaoZhuEscReportInter><any>(fairygui.UIPackage.createObject("ShaoZhuEscort", "ShaoZhuEscReportInter"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let self = this;
		CommonManager.parseChildren(self, self);
	}

	public setdata(data:IGridImpl) {
		let s = this;
		s.item.isShowEff = false;
		s.item.tipEnabled = false;
		s.item.vo = data;
		s.item.showText = "";
		s.itemNum.text = "-" + data.count;
	}
}