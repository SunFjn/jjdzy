/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class TYJY_TaskItem2 extends fairygui.GComponent{
	public c1: fairygui.Controller;
	public iconBX: fairygui.GLoader;
	public iconYLQ: fairygui.GImage;
	public title: fairygui.GRichTextField;

	public static URL: string = "ui://m2fm2aiyvfmx17";

	public static createInstance(): TYJY_TaskItem2 {
		return <TYJY_TaskItem2><any>(fairygui.UIPackage.createObject("taoYuanJieYi", "TYJY_TaskItem2"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let self = this;
		CommonManager.parseChildren(self, self);

		this.addClickListener(this.clickHandler, this);
	}

	public idx: number = 0;
	public cfg: Ityjyrw_251;
	private clickHandler(e) {
		if(!this.cfg)  return;
		GGlobal.layerMgr.open(UIConst.TYJY_TASKBOX, {cfg:this.cfg, idx:this.idx});
	}

	public setDate(index:number)
	{
		this.idx = index;
		this.title.text = (this.idx + 1) +"人完成";
	}

	private _st: number = 0;
	update(st: number) {
		this._st = st;
		this.c1.setSelectedIndex(st);
	}
}