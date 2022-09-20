/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class ChildShaoZhuLJCZ extends fairygui.GComponent {

	public n15: Button1;
	public n14: ViewGrid;
	public n17: fairygui.GImage;
	public frame: fairygui.GComponent;
	public n0: fairygui.GLoader;
	public list: fairygui.GList;
	public desc: fairygui.GTextField;
	public ylq: fairygui.GImage;
	public n13: fairygui.GList;
	public upGrad: Button4;
	public n22: fairygui.GRichTextField;
	public lbTime: fairygui.GRichTextField;

	public static URL: string = "ui://w5ll6n5jykxm6";

	private static _instance: ChildShaoZhuLJCZ;
	public static get instance(): ChildShaoZhuLJCZ {
		if (!this._instance) {
			this._instance = <ChildShaoZhuLJCZ><any>(fairygui.UIPackage.createObject("shaozhuAct", "ChildShaoZhuLJCZ"));
		}
		return this._instance;
	}

	public constructor() {
		super();
	}

	private _max = 0;
	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let self = this;
		CommonManager.parseChildren(self, self);

		self.list.callbackThisObj = self;
		self.list.itemRenderer = self.itemRender;
		self.n13.callbackThisObj = self;
		self.n13.itemRenderer = self.awardsRender;
	}

	itemRender(idx, obj) {
		let item: ShaoZhuTab2 = obj as ShaoZhuTab2;
		let nowdta = this._awards[idx];
		let id = nowdta.id;
		let cfg = Config.scljcz_272[id];
		let bigAwardName = ConfigHelp.makeItemListArr(JSON.parse(cfg.reward))[0].name;
		item.text = BroadCastManager.reTxt("累充{0}元\n{1}", cfg.lj, bigAwardName);
		item.checkNotice = nowdta.st == 1;
		item.showYlq(nowdta.st == 2);
		item.data = {id:id,idx:idx};
	}

	awardsRender(idx, obj) {
		let item: ViewGrid = obj as ViewGrid;
		item.isShowEff = true;
		item.tipEnabled = true;
		item.vo = this.gridsDta[idx + 1];
	}

	private _awards = [];
	private gridsDta = [];
	updateView() {
		let nowdta = this._awards[this._current];
		let m = GGlobal.modelShaoZhuAct;
		let idx = nowdta.id;
		let cfg = Config.scljcz_272[idx].reward;
		this.gridsDta = ConfigHelp.makeItemListArr(JSON.parse(cfg));
		this.n14.vo = this.gridsDta[0];
		this.n14.showEff(true);
		this.n14.tipEnabled = true;
		this.n13.numItems = this.gridsDta.length - 1;

		this.ylq.visible = nowdta.st == 2;
		this.upGrad.visible = nowdta.st == 0;
		this.n15.visible = nowdta.st == 1;

		this.n22.text = ConfigHelp.getItemColorName(this.gridsDta[0].id);

		this.desc.text = BroadCastManager.reTxt("已充值{0}元", m.rechargeVal);
	}

	listHandle(evt: fairygui.ItemEvent) {
		let a = this;
		let tab = evt.itemObject as fairygui.GButton;
		let id = tab.data.idx;
		this._current =id;
		a.updateView();
	}

	initDta() {
		this._current = 0;
		let data = GGlobal.modelShaoZhuAct.ljcz_data;
		this._awards = data;
		this.list.numItems = data.length;
		this.list.selectedIndex = this._current;
		this.updateView();
	}

	openCharge() {
		GGlobal.layerMgr.open(UIConst.CHONGZHI);
	}
	CG_GET() {
		let nowdta = this._awards[this._current];
		GGlobal.modelShaoZhuAct.CG_GET_LJCZ(nowdta.id);
	}


	private onUpdate() {
		const datas = GGlobal.modelEightLock.getDatas();
		const act = ModelEightLock.originalDatas[UIConst.SHAOZHU_RECHARGE];
		const end = act ? act.end : 0;
		const servTime = Model_GlobalMsg.getServerTime() / 1000 >> 0;
		if (end - servTime > 0) {
			this.lbTime.text = "剩余时间：<font color='#15f234'>"+ DateUtil.getMSBySecond4(end - servTime)+"</font>";
		} else {
			this.lbTime.text = "00:00:00";
		}
	}

	disposePanel() {
		let n = this;
		this.n14.showEff(false);
		this.n14.tipEnabled = false;
		n.n15.removeClickListener(n.CG_GET, n);
		n.upGrad.removeClickListener(n.openCharge, n);
		GGlobal.control.remove(UIConst.SHAOZHU_RECHARGE, n.initDta, n);
		n.list.removeEventListener(fairygui.ItemEvent.CLICK, n.listHandle, n);
		n.n13.numItems = 0;
		IconUtil.setImg(this.n0, null);
		n.list.numItems = 0;
	}

	private _current = 0;
	show() {
		let n = this;
		n.n15.checkNotice = true;
		n.upGrad.checkNotice = false;
		n.n15.addClickListener(n.CG_GET, n);
		n.upGrad.addClickListener(n.openCharge, n);
		IconUtil.setImg(this.n0, Enum_Path.BACK_URL + "ljcz.jpg");
		GGlobal.modelEightLock.CG4571(UIConst.SHAOZHU_RECHARGE);
		GGlobal.control.listen(UIConst.SHAOZHU_RECHARGE, n.initDta, n);
		n.list.addEventListener(fairygui.ItemEvent.CLICK, n.listHandle, n);
	}
}