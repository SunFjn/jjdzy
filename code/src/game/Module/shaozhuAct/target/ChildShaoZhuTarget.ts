/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class ChildShaoZhuTarget extends fairygui.GComponent {

	public n6: fairygui.GLoader;
	public n8: fairygui.GImage;
	public n9: fairygui.GRichTextField;
	public n0: fairygui.GList;
	public list: fairygui.GList;
	public n11: fairygui.GImage;
	public lbTime: fairygui.GRichTextField;

	public static URL: string = "ui://w5ll6n5j6hpm4";

	private static _instance: ChildShaoZhuTarget;
	public static get instance(): ChildShaoZhuTarget {
		if (!ChildShaoZhuTarget._instance) {
			ChildShaoZhuTarget._instance = <ChildShaoZhuTarget><any>(fairygui.UIPackage.createObject("shaozhuAct", "ChildShaoZhuTarget"));
		}
		return ChildShaoZhuTarget._instance;
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let self = this;
		CommonManager.parseChildren(self, self);

		self.n0.callbackThisObj = self;
		self.n0.itemRenderer = self.iconReder;
		self.n0.numItems = self.labels.length;

		self.list.callbackThisObj = self;
		self.list.itemRenderer = self.listRender;
	}

	private iconReder(idx, obj) {
		let item: TabButton2 = obj as TabButton2;
		item.text = this.labels[idx];
		item.data = idx + 1;
	}

	private listRender(idx, obj) {
		let item: ItemShaoZhuTarget = obj as ItemShaoZhuTarget;
		item.setdata(this._data[idx]);
	}

	private _data;
	private updateView() {
		this._data = GGlobal.modelShaoZhuAct.target_data;
		this.list.numItems = this._data.length;
	}

	private setNotic() {
		let data = GGlobal.modelShaoZhuAct.target_data;
		var cnt: number = this._children.length;
		let _children = this.n0._children;
		for (var j: number = 0; j < cnt; ++j) {
			let btn: fairygui.GButton = _children[j] as fairygui.GButton;
			if (btn) {
				let id = btn.data;
				btn.getChild("noticeImg").visible = GGlobal.reddot.checkCondition(UIConst.SHAOZHU_TARGET, id - 1);
			}
		}
	}

	private listHandle(evt: fairygui.ItemEvent) {
		let a = this;
		let tab = evt.itemObject as fairygui.GButton;
		let id = tab.data;
		if (TimeUitl.cool("ChildShaoZhuTarget", 100)) {
			GGlobal.modelShaoZhuAct.CG_OPEN_TARGET(id);
		}
	}

	private onUpdate() {
		const datas = GGlobal.modelEightLock.getDatas();
		const act = ModelEightLock.originalDatas[UIConst.SHAOZHU_TARGET];
		const end = act ? act.end : 0;
		const servTime = Model_GlobalMsg.getServerTime() / 1000 >> 0;
		if (end - servTime > 0) {
			this.lbTime.text = "剩余时间：<font color='#15f234'>" + DateUtil.getMSBySecond4(end - servTime) + "</font>";
		} else {
			this.lbTime.text = "00:00:00";
		}
	}

	private _currentID = 1;
	private dataProvider = [];
	private labels = ["少主升星", "亲密度", "技能洗练", "技能星级", "少主战力"];
	disposePanel() {
		let n = this;
		n.list.numItems = 0;
		GGlobal.control.remove(UIConst.SHAOZHU_TARGET, n.updateView, n);
		GGlobal.reddot.remove(UIConst.SHAOZHU_ACT, n.setNotic, n);
		n.n0.removeEventListener(fairygui.ItemEvent.CLICK, n.listHandle, n);
		IconUtil.setImg(this.n6, null);
	}

	show() {
		let n = this;
		GGlobal.modelShaoZhuAct.CG_OPEN_TARGET(this._currentID);
		GGlobal.control.listen(UIConst.SHAOZHU_TARGET, n.updateView, n);
		GGlobal.reddot.listen(UIConst.SHAOZHU_ACT, n.setNotic, n);
		n.n0.addEventListener(fairygui.ItemEvent.CLICK, n.listHandle, n);
		IconUtil.setImg(this.n6, Enum_Path.BACK_URL + "6806.jpg");
		n.n0.selectedIndex = 0;
		n.updateView();
	}
}