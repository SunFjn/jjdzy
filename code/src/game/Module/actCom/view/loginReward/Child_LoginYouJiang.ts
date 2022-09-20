class Child_LoginYouJiang extends fairygui.GComponent implements IPanel {
	public bg: fairygui.GLoader;
	public list: fairygui.GList;
	public txtLeftTime: fairygui.GRichTextField;
	public nn: fairygui.GTextField;

	private datas: Iwszwdlyj_324[];

	public static pkg = "LoginReward";
	public static URL: string = "ui://q4uuphepdsdy1";
	public static createInstance(): Child_LoginYouJiang {
		return <Child_LoginYouJiang><any>(fairygui.UIPackage.createObject("LoginReward", "Child_LoginYouJiang"));
	}

	public static setExtends() {
		let f = fairygui.UIObjectFactory.setPackageItemExtension;
		f(Item_LoginYouJiang.URL, Item_LoginYouJiang);
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let self = this;
		CommonManager.parseChildren(self, self);
		self.list.setVirtual();
		self.list.callbackThisObj = self;
		self.list.itemRenderer = self.itemRender;
	}

	protected _viewParent: fairygui.GObject;
	initView(pParent: fairygui.GObject) {
		let self = this;
		self._viewParent = pParent;
		self.addRelation(self._viewParent, fairygui.RelationType.Size);
	}

	private itemRender(index: number, item: Item_LoginYouJiang) {
		item.setData(this.datas[index]);
	}

	private vo: Vo_Activity;
	public openPanel(pData?: Vo_Activity) {
		let self = this;
		self.vo = pData;
		GGlobal.control.listen(UIConst.ACTCOM_LOGINREWARD, self.setList, self);
		self.startTime();
		GGlobal.modelEightLock.CG4571(pData.id);
		IconUtil.setImg(self.bg, "resource/image/sanGuoQD/" + UIConst.DENGLUSONGLI + ".jpg");
	}

	private setList() {
		let self = this;
		let model = GGlobal.modelLoginGift;
		self.datas = [];
		for (let key in model.rewardData) {
			self.datas.push(Config.wszwdlyj_324[parseInt(key)]);
		}
		self.datas.sort(function (a, b) {
			return self.getSortIndex(a.id) - self.getSortIndex(b.id);
		});
		self.list.numItems = self.datas.length;
	}

	public getSortIndex(cfgID) {
		let model = GGlobal.modelLoginGift;
		let ret = cfgID;
		if (model.rewardData[cfgID] == 1) {
			ret -= 10000;
		} else if (model.rewardData[cfgID] == 2) {
			ret += 10000;
		}
		return ret;
	}

	public closePanel() {
		let self = this;
		GGlobal.control.remove(UIConst.ACTCOM_LOGINREWARD, self.setList);
		Timer.instance.remove(self.timeHandler, self);
		self.datas = [];
		self.list.numItems = 0;
		IconUtil.setImg(self.bg, null);
	}

	private startTime() {
		let self = this;
		self.txtLeftTime.text = "活动剩余时间：" + DateUtil.getMSBySecond4(self.vo.getSurTime());
		if (self.vo.getSurTime() > 0) {
			Timer.instance.listen(self.timeHandler, self, 1000);
		} else {
			Timer.instance.remove(self.timeHandler, self);
		}
	}
	private timeHandler() {
		let self = this;
		self.txtLeftTime.text = "活动剩余时间：" + DateUtil.getMSBySecond4(self.vo.getSurTime());
		if (self.vo.getSurTime() <= 0) {
			Timer.instance.remove(self.timeHandler, self);
		}
	}
}