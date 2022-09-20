class Child_ActComDbZp extends fairygui.GComponent implements IPanel {

	public frame: fairygui.GComponent;
	public n20: fairygui.GImage;
	public n3: fairygui.GLoader;
	public n55: fairygui.GLoader;
	public n60: fairygui.GImage;
	public n61: fairygui.GImage;
	public n62: fairygui.GImage;
	public n63: fairygui.GImage;
	public n64: fairygui.GImage;
	public n65: fairygui.GImage;
	public n66: fairygui.GImage;
	public n67: fairygui.GImage;
	public n68: fairygui.GImage;
	public n57: Button2;
	public n59: fairygui.GImage;
	public labTime: fairygui.GRichTextField;
	public lbDes: fairygui.GRichTextField;
	public lbLog: fairygui.GRichTextField;
	public lbCount: fairygui.GRichTextField;
	public list: fairygui.GList;
	public imgArrow: fairygui.GLoader;
	public lb1: fairygui.GRichTextField;
	public lb2: fairygui.GRichTextField;
	public lb3: fairygui.GRichTextField;
	public lb4: fairygui.GRichTextField;
	public lb5: fairygui.GRichTextField;
	public lb6: fairygui.GRichTextField;
	public lb7: fairygui.GRichTextField;
	public lb0: fairygui.GRichTextField;

	public static pkg = "actComDBZP";

	public static URL: string = "ui://eh3eod8qve5s0";

	public static createInstance(): Child_ActComDbZp {
		return <Child_ActComDbZp><any>(fairygui.UIPackage.createObject("actComDBZP", "Child_ActComDbZp"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let s = this;
		CommonManager.parseChildren(s, s);
	}

	private _rota = 0;
	private _tween: egret.Tween
	private _data;
	private _act

	public static setExtends() {
		let f = fairygui.UIObjectFactory.setPackageItemExtension;
		f(ItemActComDbZp.URL, ItemActComDbZp);
		f(ItemActComDbZpLabel.URL, ItemActComDbZpLabel);
	}

	initView(pParent: fairygui.GObject) {
		let s = this;
		s.list.callbackThisObj = s;
		s.list.itemRenderer = s.itemRender;
		let cfg = Config.dbflzp_281;
		for (let i in cfg) {
			let item = cfg[i];
			this["lb" + (item.id - 1)].text = (item.cz / 100) + "倍";
		}
	}
	openPanel(pData?: any) {
		this.show()
		this.updateView();
		this.y = 264;
	}
	closePanel(pData?: any) {
		this.disposePanel();
	}
	dispose() {
		this.disposePanel();
		super.dispose()
	}

	private itemRender(idx, obj) {
		let item: ItemActComDbZp = obj as ItemActComDbZp;
		item.setdata(this._award[idx]);
	}

	private _award = [];
	updateView() {
		let m = GGlobal.model_actCom;
		let self = this;
		self._award = m.single_data;
		self.list.numItems = self._award.length;

		self.lbCount.text = m.single_key + "次";
		self.n57.checkNotice = GGlobal.model_actCom.single_key > 0;
		self.n57.setNoticeXY(100, 20);
	}

	private openDes(evt: egret.TouchEvent) {
		evt.stopImmediatePropagation();
		GGlobal.layerMgr.open(UIConst.WFSM_PANEL, UIConst.SHAOZHU_SINGLE);
	}

	private openLog(evt: egret.TouchEvent) {
		evt.stopImmediatePropagation();
		GGlobal.layerMgr.open(UIConst.ACTCOM_DBZP_LOG);
	}

	private onZhuanP() {
		let m = GGlobal.model_actCom;
		if (m.single_key == 0) {
			ViewCommonWarn.text("钥匙不足");
			return;
		}
		if (m._hasRun) return;
		m.CG_TURN_SINGLE();
	}

	private onTurn(opt) {
		let s = this;
		let m = GGlobal.model_actCom;
		m._hasRun = 0;
		let ret = opt.ret;
		s._data = opt;
		if (ret == 2) {
			return;
		}
		var scrTo = m.single_zpPos;
		s.imgArrow.visible = true;
		var endRot = Math.floor(this._rota / 360) * 360 + (scrTo - 1) * 45 + 360 * 2;
		this._tween = egret.Tween.get(this.imgArrow).to({ rotation: endRot }, 1000).call(this.closeHand, this, [endRot]);
	}

	private closeHand(endRot) {
		this._rota = endRot;
		GGlobal.layerMgr.open(UIConst.ACTCOM_DBZP_AWARDS, this._data);
		this.updateView();
	}

	private onUpdate() {
		const end = this._act ? this._act.end : 0;
		const servTime = Model_GlobalMsg.getServerTime() / 1000 >> 0;
		if (end - servTime > 0) {
			this.labTime.text = "剩余时间：<font color='#15f234'>" + DateUtil.getMSBySecond4(end - servTime) + "</font>";
		} else {
			this.labTime.text = "00:00:00";
		}
	}

	disposePanel() {
		let self = this;
		GGlobal.model_actCom._hasRun = 0;
		self.list.numItems = 0;
		GGlobal.control.remove(Enum_MsgType.ACTCOM_SINGLE, self.updateView, self);
		GGlobal.control.remove(Enum_MsgType.ACTCOM_SINGLE_TURN, this.onTurn, this);
		self.n57.removeClickListener(self.onZhuanP, self)
		self.lbDes.removeClickListener(self.openDes, self);
		self.lbLog.removeClickListener(self.openLog, self);
		IconUtil.setImg(self.n3, null);
		IconUtil.setImg(self.n55, null);
		Timer.instance.remove(this.onUpdate, this);
	}

	show() {
		let n = this;
		GGlobal.modelActivity.CG_OPENACT(UIConst.ACTCOM_DBZP)
		this._act = GGlobal.modelActivity.get(UIConst.ACTCOM, UIConst.ACTCOM_DBZP);
		n.n57.addClickListener(n.onZhuanP, n)
		GGlobal.control.listen(Enum_MsgType.ACTCOM_SINGLE, n.updateView, n);
		GGlobal.control.listen(Enum_MsgType.ACTCOM_SINGLE_TURN, this.onTurn, this);
		n.lbLog.addClickListener(n.openLog, n);
		n.lbDes.addClickListener(n.openDes, n);
		IconUtil.setImg(n.n3, Enum_Path.IMAGE_URL + "shaozhuact/zhuanpan.png");
		IconUtil.setImg(n.n55, Enum_Path.IMAGE_URL + "shaozhuact/title.png");
		Timer.instance.listen(this.onUpdate, this);
	}
}