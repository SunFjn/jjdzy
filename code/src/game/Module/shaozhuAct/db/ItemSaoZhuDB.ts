/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class ItemSaoZhuDB extends fairygui.GComponent {
	public n5: fairygui.GImage;
	public n0: ViewGrid;
	public lbTitle: fairygui.GRichTextField;
	public n2: fairygui.GRichTextField;
	public n3: Button1;
	public n8: fairygui.GImage;
	public n9: fairygui.GButton;

	public static URL: string = "ui://w5ll6n5jykxmc";

	public static createInstance(): ItemSaoZhuDB {
		return <ItemSaoZhuDB><any>(fairygui.UIPackage.createObject("shaozhuAct", "ItemSaoZhuDB"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let self = this;
		CommonManager.parseChildren(self, self);
	}

	public clean() {
		let s = this;
		s.n0.showEff(false);
		s.n0.tipEnabled = false;
		s.n9.removeClickListener(s.openView, s);
		s.n3.removeClickListener(s.CG_GET, s);
	}

	private openView(e:egret.TouchEvent) {
		GGlobal.layerMgr.open(UIConst.CHONGZHI);
		e.stopPropagation();
		e.stopImmediatePropagation();
	}

	private CG_GET() {
		GGlobal.modelShaoZhuAct.CG_GET_SINGLE(this._idx);
	}

	private _remaindCount = 0;
	private _idx;
	public setdata(data) {
		let s = this;
		let cfg = Config.scdnfl_272[data.id];
		s._idx = data.id;
		s.n0.vo = ConfigHelp.makeItemListArr(JSON.parse(cfg.reward))[0];
		this.n0.showEff(true);
		this.n0.tipEnabled = true;
		s.lbTitle.text = BroadCastManager.reTxt("<font color='#ffffff'>{0}</font><font color='#ffc334'>*{1}</font>", s.n0.vo.name, data.count);
		s.n2.text = BroadCastManager.reTxt("<font color='#ffffff'>获取上限：</font><font color='#ffc334'>{0}/{1}</font>", data.maxCount, cfg.time);
		s.n8.visible = data.maxCount >= cfg.time && data.st == 2;
		s.n3.visible = data.st == 1;
		s.n9.visible = data.st == 0 || (data.maxCount < cfg.time && data.st == 2);
		s.n3.checkNotice = true;
		s.n3.addClickListener(s.CG_GET, s);
		s.n9.addClickListener(s.openView, s);
	}
}