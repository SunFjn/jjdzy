class Child_ActTalentGoal extends fairygui.GComponent implements IPanel {

	public c1:fairygui.Controller;
	public imgHeadbg:fairygui.GLoader;
	public list:fairygui.GList;
	public labTime:fairygui.GRichTextField;
	public labTips:fairygui.GRichTextField;

	public static URL:string = "ui://ss8kd9acewuk1";

	private _listData: Array<Vo_HuoDong>
	private _act: Vo_Activity
	private _tabArr: TabButton2[]

	public static createInstance():Child_ActTalentGoal {
		return <Child_ActTalentGoal><any>(fairygui.UIPackage.createObject("actTalentGoal","Child_ActTalentGoal"));
	}
	public static pkg = "actTalentGoal";

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let s = this;
		CommonManager.parseChildren(s, s);
		s._tabArr = []
		for (let i = 0; i < 4; i++) {
			s._tabArr.push(<TabButton2><any>(this.getChild("tab" + i)))
		}
	}

	public static setExtends() {
		let f = fairygui.UIObjectFactory.setPackageItemExtension;
		f(VActTalentGoalItem.URL, VActTalentGoalItem);
	}

	initView(pParent: fairygui.GObject) {
		let s = this;
		s.list.callbackThisObj = s;
		s.list.itemRenderer = s.itemRender;
	}
	openPanel(pData?: any) {
		let s = this
		s.y = 257;
		s._act = pData as Vo_Activity;
		Timer.instance.listen(s.upTimer, s);
		IconUtil.setImg(s.imgHeadbg, Enum_Path.ACTCOM_URL + "7502_bg.jpg");
		s.c1.selectedIndex = 0;
		s.c1.addEventListener(fairygui.StateChangeEvent.CHANGED, s.selHandle, s)
		s.upView();
		s.checkTab();
		GGlobal.reddot.listen(UIConst.ACTCOM_TAL, s.checkTab, s);
		GGlobal.control.listen(Enum_MsgType.ACT_HOLYB_MUBIAO, s.upView, s);
		GGlobal.modelEightLock.CG4571(s._act.id);
	}
	closePanel(pData?: any) {
		let s = this;
		s.list.numItems = 0
		Timer.instance.remove(s.upTimer, s);
		IconUtil.setImg(s.imgHeadbg, null);
		s.c1.removeEventListener(fairygui.StateChangeEvent.CHANGE, s.selHandle, s)
		GGlobal.reddot.remove(UIConst.ACTCOM_TAL, s.checkTab, s);
		GGlobal.control.remove(Enum_MsgType.ACT_HOLYB_MUBIAO, s.upView, s);
	}
	dispose() {
		super.dispose()
		this.closePanel()
	}

	private itemRender(index, obj) {
		let s = this;
		let item: VActTalentGoalItem = obj as VActTalentGoalItem;
		item.setVo(s._listData[index], s._act.id);
	}

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

	private selHandle() {
		this.upList();
	}

	private upList(): void {
		let s = this;
		let model = GGlobal.modelActTalent;
		let index = s.c1.selectedIndex
		s._listData = Model_HuoDong.getListData(model.muBObj[index + 1]);
		s.list.numItems = s._listData ? s._listData.length : 0;
		if (s.list.numItems > 0) {
			s.list.scrollToView(0);
		}
	}

	private upView() {
		let s = this;
		s.upTimer();
		s.upList();
	}

	private checkTab() {
		let s = this;
		for (let i = 0; i < s._tabArr.length; i++) {
			let btn: TabButton2 = s._tabArr[i];
			let red = GGlobal.reddot.checkCondition(UIConst.ACTCOM_TALENT_GOAL, i + 1);
			btn.checkNotice = red;
		}
	}
}