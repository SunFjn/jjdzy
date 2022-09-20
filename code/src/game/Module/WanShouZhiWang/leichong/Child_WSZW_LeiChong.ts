/**
 * 万兽之王-累计充值
 */
class Child_WSZW_LeiChong extends fairygui.GComponent implements IPanel{
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
	private _current = 0;
	private _awards = [];
	private gridsDta = [];
	private _act: Vo_Activity;

	public static pkg = "WSZWActLJCZ";

	public static URL:string = "ui://61ucuudypvvx2";
	
	public static createInstance():Child_WSZW_LeiChong {
		return <Child_WSZW_LeiChong><any>(fairygui.UIPackage.createObject("WSZWActLJCZ","Child_WSZW_LeiChong"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let s = this;
		CommonManager.parseChildren(s, s);
	}

	public static setExtends() {
		let f = fairygui.UIObjectFactory.setPackageItemExtension;
		f(WSZW_LeiChong_Tab.URL, WSZW_LeiChong_Tab);
	}

	initView(pParent:fairygui.GObject){
		let self = this;
		self.list.callbackThisObj = self;
		self.list.itemRenderer = self.itemRender;
		self.n13.callbackThisObj = self;
		self.n13.itemRenderer = self.awardsRender;
	}

	openPanel(pData?:Vo_Activity){
		this.y = 264;
		this._act = pData;
		this.show();
		GGlobal.modelEightLock.CG4571(UIConst.WSZW_LEICHONG);
	}

	closePanel(pData?:any){
		this.disposePanel();
	}

	dispose(){
		this.disposePanel();
		super.dispose()
	}

	/**注销事件 */
	private disposePanel() {
		let n = this;
		this.n14.showEff(false);
		this.n14.tipEnabled = false;
		n.n15.removeClickListener(n.CG_GET, n);
		n.upGrad.removeClickListener(n.openCharge, n);
		GGlobal.control.remove(UIConst.WSZW_LEICHONG, n.initDta, n);
		n.list.removeEventListener(fairygui.ItemEvent.CLICK, n.listHandle, n);
		n.n13.numItems = 0;
		IconUtil.setImg(this.n0, null);
		n.list.numItems = 0;
		Timer.instance.remove(n.onUpdate, n);
	}

	private show(): void {
		let n = this;
		n.n15.checkNotice = true;
		n.upGrad.checkNotice = false;
		n.n15.addClickListener(n.CG_GET, n);
		n.upGrad.addClickListener(n.openCharge, n);
		IconUtil.setImg(this.n0, Enum_Path.BACK_URL + "wszw.jpg");
		GGlobal.control.listen(UIConst.WSZW_LEICHONG, n.initDta, n);
		n.list.addEventListener(fairygui.ItemEvent.CLICK, n.listHandle, n);
		Timer.instance.listen(n.onUpdate, n);
	}

	private onUpdate() {
		const end = this._act ? this._act.end : 0;
		const servTime = Model_GlobalMsg.getServerTime() / 1000 >> 0;
		if (end - servTime > 0) {
			this.lbTime.text = "剩余时间：<font color='#15f234'>"+ DateUtil.getMSBySecond4(end - servTime)+"</font>";
		} else {
			this.lbTime.text = "00:00:00";
		}
	}

	private itemRender(idx, obj) {
		let item: WSZW_LeiChong_Tab = obj as WSZW_LeiChong_Tab;
		let nowdta = this._awards[idx];
		let id = nowdta.id;
		let cfg:Iwszwlc_284 = Config.wszwlc_284[id];
		let bigAwardName = ConfigHelp.makeItemListArr(JSON.parse(cfg.reward))[0].name;
		item.text = BroadCastManager.reTxt("累充{0}元\n{1}", cfg.lj, bigAwardName);
		item.checkNotice = nowdta.st == 1;
		item.showYlq(nowdta.st == 2);
		item.data = {id:id,idx:idx};
	}

	private awardsRender(idx, obj) {
		let item: ViewGrid = obj as ViewGrid;
		item.isShowEff = true;
		item.tipEnabled = true;
		item.vo = this.gridsDta[idx + 1];
	}

	private listHandle(evt: fairygui.ItemEvent) {
		let a = this;
		let tab = evt.itemObject as fairygui.GButton;
		let id = tab.data.idx;
		this._current =id;
		a.updateView();
	}

	private openCharge() {
		GGlobal.layerMgr.open(UIConst.CHONGZHI);
	}

	private updateView() {
		let nowdta = this._awards[this._current];
		let m = GGlobal.modelWanShouZhiWang;
		let idx = nowdta.id;
		let cfg = Config.wszwlc_284[idx].reward;
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

	/**领取按钮事件 */
	private CG_GET() {
		let nowdta = this._awards[this._current];
		GGlobal.modelWanShouZhiWang.CG_LEICHONG_GET(nowdta.id);
	}

	private initDta() {
		this._current = 0;
		let data = GGlobal.modelWanShouZhiWang.ljcz_data;
		this._awards = data;
		this.list.numItems = data.length;
		this.list.selectedIndex = this._current;
		this.updateView();
	}

}