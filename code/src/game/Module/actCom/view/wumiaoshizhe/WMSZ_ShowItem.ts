class WMSZ_ShowItem extends fairygui.GComponent{
	public lab: fairygui.GRichTextField;
	public static URL:string = "ui://5na9ulpxgv3t9";

	public static createInstance():WMSZ_ShowItem {
		return <WMSZ_ShowItem><any>(fairygui.UIPackage.createObject("ActCom_WMSZ","WMSZ_ShowItem"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let s = this;
		CommonManager.parseChildren(s, s);
	}

	public setData(cfg: Iwmsz_779) {
		let s = this;
		if(!cfg)    return;

		let dataArr = ConfigHelp.makeItemListArr(ConfigHelp.SplitStr(cfg.item));
		let itemName:string = dataArr[0].name;
		s.lab.text = itemName + "：" + cfg.point + "积分/个";
	}
}