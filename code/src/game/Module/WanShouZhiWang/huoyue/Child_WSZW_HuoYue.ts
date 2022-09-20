/**
 * 万兽之王-每日活跃
 */
class Child_WSZW_HuoYue extends fairygui.GComponent implements IPanel{
	public c1: fairygui.Controller;
	public imgHeadbg: fairygui.GLoader;
	public list: fairygui.GList;
	public labTime: fairygui.GRichTextField;
	public labTips: fairygui.GRichTextField;
	private _listData: Array<Vo_HuoDong>;
	private _act: Vo_Activity;
	private _tabArr: fairygui.GButton[];

	public static pkg = "WSZWActMRHY";

	public static URL:string = "ui://6aqn8xprhx4m2";
	
	public static createInstance():Child_WSZW_HuoYue {
		return <Child_WSZW_HuoYue><any>(fairygui.UIPackage.createObject("WSZWActMRHY","Child_WSZW_HuoYue"));
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
		f(WSZW_HuoYue_Item.URL, WSZW_HuoYue_Item);
	}

	initView(pParent:fairygui.GObject){
		let self = this;
		self.list.itemRenderer = self.renderHandle;
		self.list.callbackThisObj = self;

		this._tabArr = [];
		for (let i = 0; i < 4; i++) {
			this._tabArr.push(<fairygui.GButton><any>(this.getChild("tab" + i)))
		}
	}

	openPanel(pData?:Vo_Activity){
		this.y = 264;
		this._act = pData;
		this.show();
		GGlobal.modelEightLock.CG4571(UIConst.WSZW_HUOYUE);
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
		let self = this;
		Timer.instance.remove(self.upTimer, self);
		self.c1.removeEventListener(fairygui.StateChangeEvent.CHANGE, self.selHandle, self);
		// GGlobal.reddot.remove(UIConst.WSZW_HUOYUE, self.checkTab, self);
		GGlobal.control.remove(UIConst.WSZW_HUOYUE, self.upView, self);
		self.list.numItems = 0;
		IconUtil.setImg(self.imgHeadbg, null);
	}

	private show(): void {
		let self = this;
		Timer.instance.listen(self.upTimer, self, 1000);
		self.c1.selectedIndex = 0;
		self.c1.addEventListener(fairygui.StateChangeEvent.CHANGED, self.selHandle, self);
		self.upView();
		for (let i = 0; i < self._tabArr.length; i++) {
			let iconObject = self._tabArr[i].getChild("icon").asLoader;
			ImageLoader.instance.loader(Enum_Path.MAINUI_URL + "64060" + (i + 1) + ".png", iconObject);
		}
		// self.checkTab();
		// GGlobal.reddot.listen(UIConst.WSZW_HUOYUE, self.checkTab, self);
		GGlobal.control.listen(UIConst.WSZW_HUOYUE, self.upView, self);
		GGlobal.modelEightLock.CG4571(UIConst.WSZW_HUOYUE);
		IconUtil.setImg1(Enum_Path.PIC_URL + "bar" + Config.xitong_001[UIConst.WSZW_HUOYUE].icon + ".jpg", self.imgHeadbg);
	}

	private upView() {
		this.upTimer();
		this.upList();
		this.checkTab();
	}

	private _preIndex = 0;
	private selHandle() {
		let ms = Model_GlobalMsg.getServerTime();
		let data = new Date(ms);
		let week = data.getDay();
		if (week == 0 && this.c1.selectedIndex == 1) {//周日 单刀赴会不开放
			this.c1.selectedIndex = this._preIndex;
			ViewCommonWarn.text("周日单刀赴会不开放")
			return;
		}
		this._preIndex = this.c1.selectedIndex;
		this.upList();
	}

	private upList(): void {
		let model = GGlobal.modelWanShouZhiWang;
		let index = this.c1.selectedIndex
		this._listData = Model_WanShouZhiWang.getListData(model.huoYObj[index + 1]);
		this.list.numItems = this._listData ? this._listData.length : 0;
		if (this.list.numItems > 0) {
			this.list.scrollToView(0);
		}
	}
	
	private renderHandle(index: number, obj: fairygui.GComponent): void {
		var item: WSZW_HuoYue_Item = obj as WSZW_HuoYue_Item;
		item.setVo(this._listData[index], UIConst.WSZW_HUOYUE);
	}

	private upTimer(): void {
		if (this._act) {
			var d = this._act.end - Math.floor(Model_GlobalMsg.getServerTime() / 1000);
			if (d < 0) {
				this.labTime.text = "剩余时间：已结束"
			} else {
				this.labTime.text = "剩余时间：" + DateUtil.getMSBySecond4(d)
			}
		}
		else {
			this.labTime.text = "剩余时间："
		}
	}

	private checkTab(){
		for (let i = 0; i < this._tabArr.length; i++) {
			let btn: fairygui.GButton = this._tabArr[i];
			// let red = GGlobal.reddot.checkCondition(UIConst.WSZW_HUOYUE, i + 1);
			let red = GGlobal.modelWanShouZhiWang.checkNoticeMRHY(i + 1);
			if (btn) btn.getChild("noticeImg").visible = red;
		}
	}

}