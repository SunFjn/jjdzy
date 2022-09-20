class Child_ActComBuyLimit extends fairygui.GComponent implements IPanel {

	public imgBg: fairygui.GLoader;
	public list: fairygui.GList;
	public tabList: fairygui.GList;
	public n29: fairygui.GImage;
	public n30: fairygui.GImage;
	public labTime: fairygui.GRichTextField;
	public n34: fairygui.GImage;
	public tabTime: fairygui.GRichTextField;

	public static URL: string = "ui://vagtkxbkqsq26";

	public static pkg = "actComBuyLimit";

	public static createInstance(): Child_ActComBuyLimit {
		return <Child_ActComBuyLimit><any>(fairygui.UIPackage.createObject("actComBuyLimit", "Child_ActComBuyLimit"));
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
		f(ItemActComBuyLimit.URL, ItemActComBuyLimit);
		f(ActComBuyLTab.URL, ActComBuyLTab);
	}

	initView(pParent: fairygui.GObject) {
		let s = this;
		s.list.callbackThisObj = s;
		s.list.itemRenderer = s.itemRender;
		// s.list.setVirtual();

		s.tabList.callbackThisObj = s;
		s.tabList.itemRenderer = s.tabRender;
		s.tabList.setVirtual();
	}
	private _off//时区  -8
	openPanel(pData?: any) {
		let s = this;
		s.y = 268;
		s._off = Math.floor(new Date().getTimezoneOffset() / 60)
		s._act = GGlobal.modelActivity.get(UIConst.ACTCOM, UIConst.ACTCOM_BUYLIMIT);
		GGlobal.modelActivity.CG_OPENACT(UIConst.ACTCOM_BUYLIMIT)
		Timer.instance.listen(s.onUpdate, s);
		s.tabList.addEventListener(fairygui.ItemEvent.CLICK, s.itemHandler, s);
		GGlobal.control.listen(Enum_MsgType.ACTCOM_LIMIT_BUY, s.upView, s);
		s.upView();
		IconUtil.setImg(s.imgBg, Enum_Path.ACTCOM_URL + "buylimit.jpg");
	}
	closePanel(pData?: any) {
		let s = this;
		s.list.numItems = 0; s.tabList.numItems = 0;
		Timer.instance.remove(s.onUpdate, s);
		s.tabList.removeEventListener(fairygui.ItemEvent.CLICK, s.itemHandler, s);
		GGlobal.control.remove(Enum_MsgType.ACTCOM_LIMIT_BUY, s.upView, s);
		IconUtil.setImg(s.imgBg, null)
	}
	dispose() {
		super.dispose()
		this.closePanel()
	}

	private upView() {
		let s = this
		if (GGlobal.model_actCom.limBuyQS == 0) return;
		let arr = GGlobal.model_actCom.getBuyLimitCfg(GGlobal.model_actCom.limBuyQS)

		s._tabHor = arr[0][0].opentime
		s._tabArr = []
		let d = new Date(Model_GlobalMsg.getServerTime())
		this._nowHor = d.getUTCHours() - s._off;//当前时区小时
		let h = d.getUTCHours() + 8;//转换8区小时数
		if (h >= 24) { h -= 24; }
		for (let i = 0; i < arr.length; i++) {
			let opT = arr[i][0].opentime
			if (opT < h) {
				continue;
			}
			if (opT == h) {
				this._tabHor = arr[i][0].opentime
			}
			this._tabArr.push(arr[i]);
		}
		this.tabList.numItems = this._tabArr.length
		if (this._tabArr.length > 0) {
			this.tabList.selectedIndex = 0;
			this.tabList.scrollToView(0);
		}

		this._lisArr = this._tabArr[0] ? this._tabArr[0] : [];
		this._lisArr.sort(function (a, b) { return a.ID - b.ID });
		this.list.numItems = this._lisArr.length
	}

	private _lisArr: Ixhdxsqg_403[];
	private _tabArr: Ixhdxsqg_403[][];
	private itemRender(idx, obj) {
		let item: ItemActComBuyLimit = obj as ItemActComBuyLimit;
		item.setVo(this._lisArr[idx], this._nowHor, this._off);
	}

	private tabRender(idx, obj) {
		let item: ActComBuyLTab = obj as ActComBuyLTab;
		item.setVo(this._tabArr[idx], this._nowHor, this._off);
	}

	private itemHandler(event: fairygui.ItemEvent) {
		let grid: ActComBuyLTab = event.itemObject as ActComBuyLTab;
		let s = this;
		s._lisArr = grid.vo
		s._lisArr.sort(function (a, b) { return a.ID - b.ID });
		s.list.numItems = this._lisArr.length
		s.list.scrollToView(0);

		s._tabHor = s._lisArr[0].opentime
	}

	private _act
	private _tabHor = 0;
	private _nowHor = 0;
	private onUpdate() {
		let s = this
		const end = this._act ? this._act.end : 0;
		const servTime = Model_GlobalMsg.getServerTime() / 1000 >> 0;
		if (end - servTime > 0) {
			this.labTime.text = "剩余时间：<font color='#15f234'>" + DateUtil.getMSBySecond4(end - servTime) + "</font>";
		} else {
			this.labTime.text = "00:00:00";
		}
		if (end - servTime < 0 || this._tabHor == 0) {
			this.tabTime.text = ""
		} else {
			let d = new Date(servTime * 1000);
			d.setHours(this._tabHor);
			d.setSeconds(0)
			d.setMinutes(0)
			let t = (d.getTime() / 1000 >> 0) + 3600 - servTime - (s._off + 8) * 60 * 60
			if (t > 3600) {
				this.tabTime.text = "本场即将开始:    " + DateUtil.getMSBySecond4(t - 3600)
			} else {
				this.tabTime.text = "本场抢购剩余:    " + DateUtil.getMSBySecond4(t)
			}

			d.setUTCHours(this._nowHor + s._off);
			t = (d.getTime() / 1000 >> 0) + 3600 - servTime
			if (t <= 0) {
				this.upView();
			}

		}
	}
}