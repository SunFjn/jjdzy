/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class ChildShaoZhuDanBi extends fairygui.GComponent {

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


	public static URL: string = "ui://w5ll6n5jykxm9";

	private static _instance: ChildShaoZhuDanBi;
	public static get instance(): ChildShaoZhuDanBi {
		if (!this._instance) {
			this._instance = <ChildShaoZhuDanBi><any>(fairygui.UIPackage.createObject("shaozhuAct", "ChildShaoZhuDanBi"));
		}
		return this._instance;
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let s = this;
		CommonManager.parseChildren(s, s);

		s.list.callbackThisObj = s;
		s.list.itemRenderer = s.itemRender;

		let cfg = Config.scdnflzp_272;
		for (let i in cfg) {
			let item = cfg[i];
			this["lb" + (item.id - 1)].text = (item.cz / 100) + "倍";
		}
	}

	private itemRender(idx, obj) {
		let item: ItemSaoZhuDB = obj as ItemSaoZhuDB;
		item.setdata(this._award[idx]);
	}

	private _award = [];
	updateView() {
		let m = GGlobal.modelShaoZhuAct;
		let self = this;
		self._award = m.single_data;
		self.list.numItems = self._award.length;

		self.lbCount.text = m.single_key + "次";
		self.n57.checkNotice = GGlobal.modelShaoZhuAct.single_key > 0;
		self.n57.setNoticeXY(100, 20);
	}

	private openDes(evt: egret.TouchEvent) {
		evt.stopImmediatePropagation();
		GGlobal.layerMgr.open(UIConst.WFSM_PANEL, UIConst.SHAOZHU_SINGLE);
	}

	private openLog(evt: egret.TouchEvent) {
		evt.stopImmediatePropagation();
		GGlobal.layerMgr.open(UIConst.SHAOZHU_SINGLE_LOG);
	}

	private onZhuanP() {
		if (GGlobal.modelShaoZhuAct.single_key == 0) {
			ViewCommonWarn.text("钥匙不足");
			return;
		}
		if (GGlobal.modelShaoZhuAct._hasRun) return;
		GGlobal.modelShaoZhuAct.CG_TURN_SINGLE();
	}

	private _rota = 0;
	private _tween: egret.Tween
	private _data;
	private onTurn(opt) {
		let s = this;
		GGlobal.modelShaoZhuAct._hasRun = 0;
		let ret = opt.ret;
		s._data = opt;
		if (ret == 2) {
			return;
		}
		let model = GGlobal.modelShaoZhuAct;
		var scrTo = model.zpPos;
		s.imgArrow.visible = true;
		var endRot = Math.floor(this._rota / 360) * 360 + (scrTo - 1) * 45 + 360 * 2;
		this._tween = egret.Tween.get(this.imgArrow).to({ rotation: endRot }, 1000).call(this.closeHand, this, [endRot]);
	}

	private closeHand(endRot) {
		this._rota = endRot;
		GGlobal.layerMgr.open(UIConst.SHAOZHU_SINGLE_AWARDS, this._data);
		this.updateView();
	}

	private onUpdate() {
		const datas = GGlobal.modelEightLock.getDatas();
		const act = ModelEightLock.originalDatas[UIConst.SHAOZHU_SINGLE];
		const end = act ? act.end : 0;
		const servTime = Model_GlobalMsg.getServerTime() / 1000 >> 0;
		if (end - servTime > 0) {
			this.labTime.text = "剩余时间：<font color='#15f234'>" + DateUtil.getMSBySecond4(end - servTime) + "</font>";
		} else {
			this.labTime.text = "00:00:00";
		}
	}

	disposePanel() {
		let self = this;
		self.list.numItems = 0;
		GGlobal.control.remove(UIConst.SHAOZHU_SINGLE, self.updateView, self);
		GGlobal.control.remove(Enum_MsgType.SHAOZHU_SINGLE_TURN, this.onTurn, this);
		self.n57.removeClickListener(self.onZhuanP, self)
		self.lbDes.removeClickListener(self.openDes, self);
		self.lbLog.removeClickListener(self.openLog, self);
		IconUtil.setImg(self.n3, null);
		IconUtil.setImg(self.n55, null);
	}

	show() {
		let n = this;
		GGlobal.modelEightLock.CG4571(UIConst.SHAOZHU_SINGLE);
		n.n57.addClickListener(n.onZhuanP, n)
		GGlobal.control.listen(UIConst.SHAOZHU_SINGLE, n.updateView, n);
		GGlobal.control.listen(Enum_MsgType.SHAOZHU_SINGLE_TURN, this.onTurn, this);
		n.lbLog.addClickListener(n.openLog, n);
		n.lbDes.addClickListener(n.openDes, n);
		IconUtil.setImg(n.n3, Enum_Path.IMAGE_URL + "shaozhuact/zhuanpan.png");
		IconUtil.setImg(n.n55, Enum_Path.IMAGE_URL + "shaozhuact/title.png");
	}
}