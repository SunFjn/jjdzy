class TYJY_TaskItem1 extends fairygui.GComponent{
	public nameLb: fairygui.GRichTextField;
	public expBar: fairygui.GProgressBar;

	public static URL: string = "ui://m2fm2aiyvfmx16";

	public static createInstance(): TYJY_TaskItem1 {
		return <TYJY_TaskItem1><any>(fairygui.UIPackage.createObject("taoYuanJieYi", "TYJY_TaskItem1"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		CommonManager.parseChildren(this, this);
	}

	public setdata(name:string, num:number, cs:number) {
		let s = this;
		
		s.nameLb.text = name;
		s.expBar.max = cs;
		s.expBar.value = num;
		s.expBar._titleObject.text = num + "/" + cs;
	}
}