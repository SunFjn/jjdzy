class Child_ActCom_LJFL extends fairygui.GComponent {

	public imgBg: fairygui.GLoader;
	public list: fairygui.GList;
	public labTime: fairygui.GRichTextField;
	public lab: fairygui.GRichTextField;
	public lbAct: fairygui.GRichTextField;

	public static URL: string = "ui://y35rlqhydufs0";

	public static pkg = "actCom_LJFL";

	public static createInstance(): Child_ActCom_LJFL {
		return <Child_ActCom_LJFL><any>(fairygui.UIPackage.createObject("actCom_LJFL", "Child_ActCom_LJFL"));
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
		f(Item_ActCom_LJFL.URL, Item_ActCom_LJFL);
	}

	initView(pParent: fairygui.GObject) {
		let s = this;
		s.list.callbackThisObj = s;
		s.list.itemRenderer = s.itemRender;
		s.list.setVirtual();
		s.lab.text = HtmlUtil.createLink("活动规则", true, "");
	}

	openPanel(pData?: any) {
		let s = this;
		s.y = 257;
		s._act = pData as Vo_Activity;
		GGlobal.modelActivity.CG_OPENACT(s._act.id)
		IconUtil.setImg(s.imgBg, Enum_Path.ACTCOM_URL + "ljfl.jpg");
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
		let m = GGlobal.model_ActLJFL;
		m.register(pFlag, Model_ActComLJFL.OPENUI, s.upView, s);
		EventUtil.register(pFlag, s.lab, egret.TextEvent.LINK, s.openExplain, s);
	}

	dispose() {
		super.dispose()
		this.closePanel()
	}

	private itemRender(index, obj) {
		let s = this;
		let item: Item_ActCom_LJFL = obj as Item_ActCom_LJFL;
		item.setVo(s._listData[index], s._flag);
	}

	private _listData: { id: number, lj: number, st: number, cfg: Iljfl_772 }[]
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
		let flag = end - servTime - 86400
		if (flag > 0) {
			s.lbAct.text = DateUtil.getMSBySecond4(end - servTime - 86400) + "后可充值激活"
		} else {
			s.lbAct.text = "充值激活奖励"
		}
		if (flag > -1 && flag < 1) {//临界状态更新
			s.upView();
		}
	}
	private _flag//true 可充值， false 不可
	private upView() {
		let s = this;
		let m = GGlobal.model_ActLJFL;
		//时间
		const end = s._act ? s._act.end : 0;
		const servTime = Model_GlobalMsg.getServerTime() / 1000 >> 0;
		s._flag = end - servTime - 86400 <= 0

		//排序
		// let arr0 = []
		// let arr1 = []
		// let arr2 = []
		// for (let i = 0; i < m.datArr.length; i++) {
		// 	let v = m.datArr[i];
		// 	if (v.st == 1) {
		// 		arr1.push(v);
		// 	}
		// 	else if (v.st == 2) {
		// 		arr2.push(v);
		// 	}
		// 	else {
		// 		arr0.push(v);
		// 	}
		// }
		// s._listData = arr1.concat(arr0).concat(arr2);
		s._listData = m.datArr
		s.list.numItems = s._listData.length;
		if (s._listData.length > 0) {
			s.list.scrollToView(0);
		}
	}

	private openExplain(evt: egret.TouchEvent) {
		evt.stopPropagation();
		evt.stopImmediatePropagation();
		GGlobal.layerMgr.open(UIConst.WFSM_PANEL, UIConst.ACTCOM_LJFL);
	}
}