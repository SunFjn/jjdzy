/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class DailyBaoXiang extends fairygui.GComponent {

	public ctr1: fairygui.Controller;
	public iconBX: fairygui.GLoader;
	public iconYLQ: fairygui.GImage;

	public static URL: string = "ui://b3p8szvvtw1l1";

	public static createInstance(): DailyBaoXiang {
		return <DailyBaoXiang><any>(fairygui.UIPackage.createObject("dailytask", "DailyBaoXiang"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.ctr1 = this.getController("ctr1");
		this.iconBX = <fairygui.GLoader><any>(this.getChild("iconBX"));
		this.iconYLQ = <fairygui.GImage><any>(this.getChild("iconYLQ"));

		this.addClickListener(this.clickHandler, this);
	}

	public idx: number = 0;
	private clickHandler(e) {
		let awards = Config.baoxiang_708[this.idx].award;
		// if (this._st == 1) GGlobal.modeltask.CG_BX_1055(this.idx);
		 GGlobal.layerMgr.open(UIConst.DAILYTASKBOX, {awards:awards,idx:this.idx});
	}

	private _st: number = 0;
	update(st: number) {
		this._st = st;
		this.ctr1.setSelectedIndex(st);
	}
}