class Child_ActQFXF extends fairygui.GComponent {

	public imgBg: fairygui.GLoader;
	public list: fairygui.GList;
	public labTime: fairygui.GRichTextField;
	public lb: fairygui.GRichTextField;
	public lbXF: fairygui.GRichTextField;

	public static URL: string = "ui://p8fr1bvgkzdy5";

	public static pkg = "actQFXF";

	public static createInstance(): Child_ActQFXF {
		return <Child_ActQFXF><any>(fairygui.UIPackage.createObject("actQFXF", "Child_ActQFXF"));
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
		f(GridActQFXF.URL, GridActQFXF);
		f(ItemActQFXF.URL, ItemActQFXF);
	}

	initView(pParent: fairygui.GObject) {
		let s = this;
		s.list.callbackThisObj = s;
		s.list.itemRenderer = s.itemRender;
		s.list.setVirtual();
	}

	openPanel(pData?: any) {
		let s = this;
		let m = GGlobal.model_ActQFXF;
		s.y = 275;
		s._act = pData as Vo_Activity;
		Timer.instance.listen(s.upTimer, s);
		m.listen(Model_ActQFXF.OPENUI, s.upView, s);
		GGlobal.modelActivity.CG_OPENACT(s._act.id)
		//红点
		// s.upView()
	}
	closePanel(pData?: any) {
		let s = this;
		let m = GGlobal.model_ActQFXF;
		s.list.numItems = 0
		Timer.instance.remove(s.upTimer, s);
		m.remove(Model_LuckTurn.OPENUI, s.upView, s);
	}
	dispose() {
		super.dispose()
		this.closePanel()
	}

	private itemRender(index, obj) {
		let s = this;
		let item: ItemActQFXF = obj as ItemActQFXF;
		item.vo = s._listData[index];
	}

	private _listData: { id: number, st: number, cfg: Iqfxf_768 }[][]
	private _act: Vo_Activity

	private upTimer() {
		let s = this;
		const end = s._act ? s._act.end : 0;
		const servTime = Model_GlobalMsg.getServerTime() / 1000 >> 0;
		if (end - servTime > 0) {
			s.labTime.text = "剩余时间：<font color='#15f234'>" + DateUtil.getMSBySecond4(end - servTime) + "</font>";
		} else {
			s.labTime.text = "00:00:00";
		}
	}


	private upView() {
		let s = this;
		let m = GGlobal.model_ActQFXF;
		// s._listData = m.qfxfArr ? m.qfxfArr : [];
		// s.list.numItems = s._listData.length;
		s.lbXF.text = m.grxf + "元宝"
		//排序
		let arr0 = []
		let arr1 = []
		let arr2 = []
		for (let i = 0; i < m.qfxfArr.length; i++) {
			let st = 2;
			let vArr = m.qfxfArr[i];
			for (let j = 0; j < vArr.length; j++) {
				if (vArr[j].st == 1) {
					st = 1;
					break;
				} else if (vArr[j].st == 0) {
					st = 0
				}
			}
			if (st == 1) {
				arr1.push(vArr);
			}
			if (st == 2) {
				arr2.push(vArr);
			}
			if (st == 0) {
				arr0.push(vArr);
			}
		}
		s._listData = arr1.concat(arr0).concat(arr2);
		s.list.numItems = s._listData.length;
		if (s._listData.length > 0) {
			s.list.scrollToView(0);
		}
	}
}