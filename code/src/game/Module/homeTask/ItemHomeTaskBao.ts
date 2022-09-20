class ItemHomeTaskBao extends fairygui.GButton {

	public ctr1: fairygui.Controller;
	public iconBX: fairygui.GLoader;
	public iconYLQ: fairygui.GImage;

	public static URL: string = "ui://oy62ymetwhzh6";

	public static createInstance(): ItemHomeTaskBao {
		return <ItemHomeTaskBao><any>(fairygui.UIPackage.createObject("homeTask", "ItemHomeTaskBao"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let s = this;
		CommonManager.parseChildren(s, s);
		s.addClickListener(s.clickHandler, s);
	}

	public idx: number = 0;
	private clickHandler(e) {
		let awards = Config.fdrcbx_019[this.idx].award;
		GGlobal.layerMgr.open(UIConst.HOME_TASK_BOX, { awards: awards, idx: this.idx });
	}

	private _st: number = 0;
	update(st: number) {
		this._st = st;
		this.ctr1.setSelectedIndex(st);
	}
}