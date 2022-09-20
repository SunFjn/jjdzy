class Child_ActTalent extends fairygui.GComponent implements IPanel {

	public imgHeadbg: fairygui.GLoader;
	public list: fairygui.GList;
	public labTime: fairygui.GRichTextField;
	public labTips: fairygui.GRichTextField;

	public static URL: string = "ui://smvxlnhhewuk0";

	public static createInstance(): Child_ActTalent {
		return <Child_ActTalent><any>(fairygui.UIPackage.createObject("actTalent", "Child_ActTalent"));
	}
	public static pkg = "actTalent";

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
		f(VActTalentItem.URL, VActTalentItem);
	}

	initView(pParent: fairygui.GObject) {
		let s = this;
		s.list.callbackThisObj = s;
		s.list.itemRenderer = s.itemRender;
	}
	openPanel(pData?: any) {
		let s = this;
		s.y = 257;
		s._act = pData as Vo_Activity;
		Timer.instance.listen(s.upTimer, s);
		if(s._act.id == UIConst.ACTCOM_TALENT)
		{
			IconUtil.setImg(s.imgHeadbg, Enum_Path.ACTCOM_URL + "7501_bg.jpg");
			GGlobal.control.listen(Enum_MsgType.ACT_HOLYB_XILIAN, s.upList, s);
			s.labTips.text = "修炼天赋达到指定次数可领取奖励";
		}else if(s._act.id == UIConst.YUNCHOUWEIWO_JLMJ){
			IconUtil.setImg(s.imgHeadbg, Enum_Path.ACTCOM_URL + "7712_bg.jpg");
			GGlobal.control.listen(UIConst.YUNCHOUWEIWO_JLMJ, s.upList, s);
			s.labTips.text = "修炼天赋达到指定次数可领取奖励";
		}
		GGlobal.modelEightLock.CG4571(s._act.id);
		s.upList();
	}
	closePanel(pData?: any) {
		let s = this;
		s.list.numItems = 0
		Timer.instance.remove(s.upTimer, s);
		IconUtil.setImg(s.imgHeadbg, null);
		GGlobal.control.remove(Enum_MsgType.ACT_HOLYB_XILIAN, s.upList, s);
		GGlobal.control.remove(UIConst.YUNCHOUWEIWO_JLMJ, s.upList, s);
	}
	dispose() {
		super.dispose()
		this.closePanel()
	}

	private itemRender(index, obj) {
		let s = this;
		let item: VActTalentItem = obj as VActTalentItem;
		item.setVo(s._listData[index], s._act.id);
	}

	private _listData: Array<Vo_HuoDong>
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

	private upList(): void {
		let s = this;
		let model = GGlobal.modelActTalent;
		// this._listData = Model_HuoDong.getListData(model.xlArr);
		if(s._act.id == UIConst.ACTCOM_TALENT)
		{
			this._listData = Model_HuoDong.getListData(model.xlArr);
		}else{
			this._listData = Model_HuoDong.getListData(model.jlmjArr);
		}
		s.list.numItems = s._listData ? s._listData.length : 0;
		if (s.list.numItems > 0) {
			s.list.scrollToView(0);
		}
		s.upTimer();
	}
}