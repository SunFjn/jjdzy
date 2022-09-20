/** This is an automatically generated class by FairyGUI. Please do not modify it. **/


class ItemShaoZhuTarget extends fairygui.GComponent {

	public n1: fairygui.GImage;
	public lab: fairygui.GRichTextField;
	public list: fairygui.GList;
	public btnGet: Button1;
	public btnRec: fairygui.GButton;
	public imgGet: fairygui.GImage;

	public static URL: string = "ui://w5ll6n5j6hpm5";

	public static createInstance(): ItemShaoZhuTarget {
		return <ItemShaoZhuTarget><any>(fairygui.UIPackage.createObject("shaozhuAct", "ItemShaoZhuTarget"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let self = this;
		CommonManager.parseChildren(self, self);
		self.list.itemRenderer = self.itemRender;
		self.list.callbackThisObj = self;
		self.list.setVirtual();
		self.btnGet.checkNotice = true;

		self.btnRec.addClickListener(self.openView, self);
		self.btnGet.addClickListener(self.getHD, self);
	}

	private openView() {
		GGlobal.layerMgr.open(this.panelid);
	}

	private getHD() {
		GGlobal.modelShaoZhuAct.CG_GET_TAGERT(this.idx);
	}

	private _awards;
	private itemRender(idx, obj) {
		let item: ViewGrid = obj as ViewGrid;
		item.isShowEff = true;
		item.tipEnabled = true;
		item.vo = this._awards[idx];
	}

	public clean() {
		this.list.numItems = 0;
	}

	panelid;
	idx;
	public setdata(data) {
		let id = data.id;
		let st = data.st;
		let pro = data.pro;
		let cfg = Config.scqrmb_272[id];
		let s = this;
		s.panelid = cfg.open;
		s.idx = id;
		s._awards = ConfigHelp.makeItemListArr(JSON.parse(cfg.reward));
		s.list.numItems = s._awards.length;

		let term;
		let condition = cfg.c1;
		let type = (id / 1000) >> 0;
		if (pro >= condition) {
			term = BroadCastManager.reTxt(cfg.name + "<font color='#15f234'>({0}/{1})</font>", ConfigHelp.numToStr(pro), ConfigHelp.numToStr(condition));
		} else {
			term = BroadCastManager.reTxt(cfg.name + "<font color='#fe0000'>({0}/{1})</font>", ConfigHelp.numToStr(pro), ConfigHelp.numToStr(condition));
		}
		s.lab.text = term;

		s.btnRec.visible = st == 0;
		s.btnGet.visible = st == 1;
		s.imgGet.visible = st == 2;
	}
}