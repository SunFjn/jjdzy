class Child_ActCom_JRSC extends fairygui.GComponent {

	public imgBg: fairygui.GLoader;
	public list: fairygui.GList;
	public btnZhe: Button1;
	public btnShop: fairygui.GButton;
	public lbZhe: fairygui.GRichTextField;
	public lbZheCt: fairygui.GRichTextField;
	public lbTime: fairygui.GRichTextField;
	public lbYB: fairygui.GRichTextField;
	public imgYB: fairygui.GImage;
	public lbIt: fairygui.GRichTextField;
	public imgIt: fairygui.GLoader;

	public static URL: string = "ui://zq6iymuqocq24";

	public static pkg = "actCom_JRSC";

	public static createInstance(): Child_ActCom_JRSC {
		return <Child_ActCom_JRSC><any>(fairygui.UIPackage.createObject("actCom_JRSC", "Child_ActCom_JRSC"));
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
		f(Item_ActCom_JRSC.URL, Item_ActCom_JRSC);
	}

	initView(pParent: fairygui.GObject) {
		let s = this;
		s.list.callbackThisObj = s;
		s.list.itemRenderer = s.itemRender;
		s.list.setVirtual();
	}

	openPanel(pData?: any) {
		let s = this;
		// s.y = 257;
		s._act = pData as Vo_Activity;
		GGlobal.modelActivity.CG_OPENACT(s._act.id)
		IconUtil.setImg(s.imgBg, Enum_Path.ACTCOM_URL + "jrsc.jpg");
		Timer.instance.listen(s.upTimer, s, 1000);
		s.registerEvent(true);
	}

	closePanel(pData?: any) {
		let s = this;
		s.list.numItems = 0
		IconUtil.setImg(s.imgBg, null);
		Timer.instance.remove(s.upTimer, s);
		s.registerEvent(false);
	}

	private registerEvent(pFlag: boolean): void {
		let s = this;
		let m = GGlobal.model_ActJRSC;
		m.register(pFlag, Model_ActComJRSC.OPENUI, s.upView, s);
		m.register(pFlag, Model_ActComJRSC.FRESH_ZHE, s.upFreshZhe, s);
		m.register(pFlag, Model_ActComJRSC.FRESH_ITEM, s.upFreshItem, s);
		EventUtil.register(pFlag, s.btnZhe, egret.TouchEvent.TOUCH_TAP, s.onZhe, s);
		EventUtil.register(pFlag, s.btnShop, egret.TouchEvent.TOUCH_TAP, s.onShop, s);
	}

	dispose() {
		super.dispose()
		this.closePanel()
	}

	private itemRender(index, obj) {
		let s = this;
		let item: Item_ActCom_JRSC = obj as Item_ActCom_JRSC;
		item.setVo(s._listData[index], s.zhe);
	}

	private _listData: { id: number, ct: number, cfg: Ijrscspb_334 }[]
	private _act: Vo_Activity
	private zhe: number = 0

	private upTimer() {
		let s = this;
		const end = s._act ? s._act.end : 0;
		const servTime = Model_GlobalMsg.getServerTime() / 1000 >> 0;
		if (end - servTime > 0) {
			s.lbTime.text = "剩余时间：<font color='#15f234'>" + DateUtil.getMSBySecond4(end - servTime) + "</font>";
		} else {
			s.lbTime.text = "00:00:00";
		}
	}
	private upView() {
		let s = this;
		let m = GGlobal.model_ActJRSC;

		s.zhe = Config.jrsczkb_334[m.zhe].zk / 100
		//时间
		s._listData = m.shopArr
		s.list.numItems = s._listData.length;
		// if (s._listData.length > 0) {
		// 	s.list.scrollToView(0);
		// }

		let jrscsxb = Config.jrscsxb_334[s._act.qs]
		//刷新商品价格
		s.lbYB.text = JSON.parse(jrscsxb.sp)[0][2] + "";

		s.btnZhe.checkNotice = m.freeCt > 0;
		s.lbZhe.text = "本轮商品折扣：" + HtmlUtil.fontNoSize(s.zhe + "折", Color.GREENSTR)
		// s.lbZheCt.text = "剩余刷新折扣次数：" + HtmlUtil.fontNoSize(m.freshCt + "次", m.freshCt > 0 ? Color.GREENSTR : Color.REDSTR)
		s.lbZheCt.text = "最低折扣：" + (m.getMinZhe(s._act.qs) / 100) + "折"

		if (m.freeCt > 0) {//免费
			s.imgIt.visible = false;
			s.lbIt.text = ""
			s.btnZhe.text = "免费刷新"
		}
		else if (m.itCt > 0) {//道具
			s.lbIt.text = HtmlUtil.fontNoSize(m.itCt + "次", Color.GREENSTR)
			IconUtil.setImg(s.imgIt, Enum_Path.ICON70_URL + Config.daoju_204[Model_ActComJRSC.ITEM_ID].icon + ".png");
			s.imgIt.visible = true;
			s.btnZhe.text = "刷新折扣"
		} else {//元宝
			s.imgIt.visible = true;
			s.lbIt.text = m.getAddCtPrice(s._act.qs, m.addCt) + ""
			IconUtil.setImg(s.imgIt, Enum_Path.ICON70_URL + 4 + ".png");
			s.btnZhe.text = "刷新折扣"
		}


	}

	private onShop() {
		ViewAlert.show("刷新商品会重置折扣，确认刷新商品？", Handler.create(GGlobal.model_ActJRSC, GGlobal.model_ActJRSC.CG_REFRESH_10801))
		// GGlobal.model_ActJRSC.CG_REFRESH_10801();
	}

	private onZhe() {
		GGlobal.model_ActJRSC.CG_REFRESH_ZHE_10803();
	}

	public upFreshItem(): void {
		for (let i = 0; i < this.list.numChildren; i++) {
			let gridRender: Item_ActCom_JRSC = this.list.getChildAt(i) as Item_ActCom_JRSC;
			if (gridRender && gridRender.vo) {
				let grid = gridRender.grid;
				EffectMgr.addEff("uieff/10092", grid.displayListContainer, grid.width / 2, grid.height / 2, 400, 400, false);
			}
		}
	}

	public upFreshZhe(): void {
		for (let i = 0; i < this.list.numChildren; i++) {
			let gridRender: Item_ActCom_JRSC = this.list.getChildAt(i) as Item_ActCom_JRSC;
			if (gridRender && gridRender.vo) {
				let grid = gridRender;
				EffectMgr.addEff("uieff/10092", grid.displayListContainer, grid.dataLb.x + 80, grid.dataLb.y + 40, 400, 400, false);
			}
		}
	}


}