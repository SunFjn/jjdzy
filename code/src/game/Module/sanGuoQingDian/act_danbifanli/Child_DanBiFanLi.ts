/**单笔返利 */
class Child_DanBiFanLi extends fairygui.GComponent implements IPanel {
	public bg: fairygui.GLoader;
	public list: fairygui.GList;
	public txtLeftTime: fairygui.GRichTextField;
	public nn: fairygui.GTextField;

	private datas: any[];

	private times: number;

	public static pkg = "sanGuoQingDian";
	public static URL: string = "ui://kdt501v2mq0c1c";
	public static createInstance(): Child_DanBiFanLi {
		return <Child_DanBiFanLi><any>(fairygui.UIPackage.createObject("sanGuoQingDian", "Child_DanBiFanLi"));
	}

	public static setExtends() {
	}

	protected _viewParent: fairygui.GObject;
	public initView(pParent: fairygui.GObject) {
		let self = this;
		self._viewParent = pParent;
		self.addRelation(self._viewParent, fairygui.RelationType.Size);
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		const self = this;
		CommonManager.parseChildren(self, self);
		this.list.setVirtual();
		this.list.callbackThisObj = this;
		this.list.itemRenderer = this.itemRender;
	}

	private itemRender(index: number, item: item_DanBiJiangLi) {
		item.setData(this.datas[index]);
	}

	private vo: Vo_Activity;
	public openPanel(pData?: Vo_Activity) {
		let self = this;
		self.vo = pData;
		self.list.numItems = 0;
		GGlobal.control.listen(Enum_MsgType.DANBIFANLI, self.setList, self);
		GGlobal.control.listen(Enum_MsgType.DANBIFANLIREWARD, self.refreshList, self);
		GGlobal.modelActivity.CG_OPENACT(UIConst.DANBIFANLI);
		IconUtil.setImg(self.bg, "resource/image/sanGuoQD/" + UIConst.DANBIFANLI + ".jpg");
		self.startTime();
	}
	// {result : result, id : id, count : count, lastNum : lastNum}
	private refreshList(arg) {
		for (let i = 0; i < this.datas.length; ++i) {
			if (arg.id == this.datas[i].id) {
				this.datas[i].count = arg.count;
				this.datas[i].lastNum = arg.lastNum;
				break;
			}
		}
		for (let i = 0; i < this.datas.length; ++i) {
			let state = this.datas[i].count > 0;
			GGlobal.reddot.setCondition(UIConst.DANBIFANLI, 0, state);
			if (state) {
				break;
			}
		}
		this.datas.sort(function (a, b) { return a.getSortIndex() < b.getSortIndex() ? -1 : 1; });
		this.list.numItems = this.datas.length;
		GGlobal.control.notify(Enum_MsgType.ACTIVITY_ACTOPENSTATE);
	}

	private setList(arg) {
		//console.log("dddddddddddddddddd", arg.data);
		this.datas = arg.data;
		this.datas.sort(function (a, b) { return a.getSortIndex() < b.getSortIndex() ? -1 : 1; });
		this.list.numItems = this.datas.length;
	}
	public closePanel() {
		let self = this;
		Timer.instance.remove(self.timeHandler, self);
		GGlobal.control.remove(Enum_MsgType.DANBIFANLI, self.setList, self);
		GGlobal.control.remove(Enum_MsgType.DANBIFANLIREWARD, self.refreshList, self);
		self.datas = [];
		self.list.numItems = 0;
		IconUtil.setImg(self.bg, null);
	}

	private startTime() {
		let self = this;
		let vo = self.vo;
		self.times = vo.getSurTime();
		self.txtLeftTime.text = "活动剩余时间：" + DateUtil.getMSBySecond4(self.times);
		if (self.times > 0) {
			Timer.instance.listen(self.timeHandler, self, 1000);
		} else {
			Timer.instance.remove(self.timeHandler, self);
		}
	}
	private timeHandler() {
		let s = this;
		s.times--;
		s.txtLeftTime.text = "活动剩余时间：" + DateUtil.getMSBySecond4(s.times);
		if (s.times <= 0) {
			Timer.instance.remove(s.timeHandler, s);
		}
	}
}