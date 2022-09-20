/**登陆有礼 */
class Child_DeLuYouJiang extends fairygui.GComponent implements IPanel {
	public bg: fairygui.GLoader;
	public list: fairygui.GList;
	public txtLeftTime: fairygui.GRichTextField;
	public nn: fairygui.GTextField;

	private times: number;
	private datas: any[];

	public static pkg = "sanGuoQingDian";
	public static URL: string = "ui://kdt501v2mq0c1e";
	public static createInstance(): Child_DeLuYouJiang {
		return <Child_DeLuYouJiang><any>(fairygui.UIPackage.createObject("sanGuoQingDian", "Child_DeLuYouJiang"));
	}

	public static setExtends() {

	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		const self = this;
		CommonManager.parseChildren(self, self);
		this.list.setVirtual();
		this.list.callbackThisObj = this;
		this.list.itemRenderer = this.itemRender;
	}

	protected _viewParent: fairygui.GObject;
	public initView(pParent: fairygui.GObject) {
		let self = this;
		self._viewParent = pParent;
		self.addRelation(self._viewParent, fairygui.RelationType.Size);
	}

	private itemRender(index: number, item: item_DeLuYouJiang) {
		item.setData(this.datas[index]);
	}

	private vo: Vo_Activity;
	public openPanel(pData?: Vo_Activity) {
		let self = this;
		self.vo = pData;
		self.list.numItems = 0;
		GGlobal.control.listen(Enum_MsgType.DENGLUYOULI, self.setList, self);
		GGlobal.control.listen(Enum_MsgType.DENGLUYOULIREWARD, self.refreshList, self);
		self.startTime();
		GGlobal.modelActivity.CG_OPENACT(pData.id);
		IconUtil.setImg(self.bg, "resource/image/sanGuoQD/" + UIConst.DENGLUSONGLI + ".jpg");
	}

	private refreshList(arg) {
		for (let i = 0; i < this.datas.length; ++i) {
			if (arg.id == this.datas[i].id) {
				this.datas[i].state = 2;
				break;
			}
		}
		for (let i = 0; i < this.datas.length; ++i) {
			let state = this.datas[i].state == 1;
			GGlobal.reddot.setCondition(UIConst.DENGLUSONGLI, 0, state);
			if (state) {
				break;
			}
		}
		this.datas.sort(function (a, b) { return a.getSortIndex() < b.getSortIndex() ? -1 : 1; });
		this.list.numItems = this.datas.length;
		GGlobal.control.notify(Enum_MsgType.ACTIVITY_ACTOPENSTATE);
		GGlobal.modelSGQD.notify(ModelSGQD.msg_notice);
	}

	private setList(arg) {
		this.datas = arg.data;
		this.datas.sort(function (a, b) { return a.getSortIndex() < b.getSortIndex() ? -1 : 1; });
		this.list.numItems = this.datas.length;
	}
	public closePanel() {
		let self = this;
		GGlobal.control.remove(Enum_MsgType.DENGLUYOULI, self.setList);
		GGlobal.control.remove(Enum_MsgType.DENGLUYOULIREWARD, self.refreshList);
		Timer.instance.remove(self.timeHandler, self);
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