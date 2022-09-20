/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

class ItemPig extends fairygui.GComponent {

	public n0: fairygui.GImage;
	public lbpro: fairygui.GRichTextField;
	public n2: fairygui.GList;
	public lbBuff: fairygui.GRichTextField;
	public lbTip: fairygui.GRichTextField;
	public btnGet: Button1;
	public btnGo: fairygui.GButton;
	public imgYlq: fairygui.GImage;

	public static URL: string = "ui://w5ll6n5jhsa2g";

	public static createInstance(): ItemPig {
		return <ItemPig><any>(fairygui.UIPackage.createObject("shaozhuAct", "ItemPig"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let self = this;
		CommonManager.parseChildren(self, self);

		self.n2.callbackThisObj = self;
		self.n2.itemRenderer = self.itemRender;
		self.n2.setVirtual();
	}

	private itemRender(idx, obj) {
		let item: ViewGrid = obj as ViewGrid;
		item.isShowEff = true;
		item.tipEnabled = true;
		item.vo = this._vos[idx];
	}

	public clean() {
		this.n2.numItems = 0;
	}

	private getHD() {
		GGlobal.modelShaoZhuAct.Cg_GET_PIG(this.idx, this.cfgType);
	}

	private openHd() {
		GGlobal.layerMgr.open(this._sysids);
	}

	private idx = 0;
	private cfgType = 0;
	private _vos;
	private _sysids = 0;
	public setdata(data) {
		let n = this;
		let m = GGlobal.modelShaoZhuAct;
		n.btnGet.addClickListener(n.getHD, n);
		n.btnGo.addClickListener(n.openHd, n);

		n.cfgType = data.type;
		let hasBuy = false;
		if (n.cfgType == ModelShaoZhuAct.GOLD) {
			n.lbTip.text = "购买金猪送财可领取";
			hasBuy = m.goldst == 1;
		} else {
			n.lbTip.text = "购买银猪送财可领取";
			hasBuy = m.silverst == 1;
		}
		n.lbTip.visible = !hasBuy;
		n.btnGet.checkNotice = true;
		n.btnGet.visible = data.st == 1 && hasBuy;
		n.btnGo.visible = data.st == 0&& hasBuy;
		n.imgYlq.visible = data.st == 2&& hasBuy;

		n.idx = data.id;
		let cfg = Config.pigrw_272[n.idx];
		n._sysids = cfg.open;

		let showType = data.type;
		let zz = showType == ModelShaoZhuAct.SILVER ? cfg.zz : cfg.zz1;
		let awards = showType == ModelShaoZhuAct.SILVER ? cfg.reward : cfg.reward1;
		let vos = ConfigHelp.makeItemListArr(JSON.parse(awards));
		n._vos = vos;
		n.n2.numItems = vos.length;

		n.lbBuff.text = BroadCastManager.reTxt("元宝增加+{0}%", zz);
		let color = data.count >= cfg.cs ? Color.GREENSTR : Color.REDSTR;
		n.lbpro.text = BroadCastManager.reTxt(cfg.name+"<font color='{0}'>({1}/{2})</font>", color, ConfigHelp.numToStr(data.count), ConfigHelp.numToStr(cfg.cs));
	}
}