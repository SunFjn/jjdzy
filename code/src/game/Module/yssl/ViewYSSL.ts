/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class ViewYSSL extends fairygui.GComponent implements IPanel {

	public n0: fairygui.GImage;
	public n2: fairygui.GImage;
	public n1: fairygui.GLoader;
	public n6: YSTab;
	public n7: YSTab;
	public n8: YSTab;
	public n9: YSTab;
	public n3: fairygui.GImage;
	public lbTime: fairygui.GRichTextField;
	public lbPro: fairygui.GRichTextField;
	public n11:Button4;
	public n13: fairygui.GList;

	public static URL: string = "ui://sbm40ly4ln000";
	/** 设置包名（静态属性） */
	public static pkg = "yssl";
	/** 绑定ui的方法（静态方法） */
	public static setExtends() {
		//子类ui组件的绑定放在这里，此类就不用绑定了，在上层已经自动实现
		let fac = fairygui.UIObjectFactory.setPackageItemExtension;
		fac(ViewYSSL.URL, ViewYSSL);
		fac(ItemYSSL.URL, ItemYSSL);
		fac(YSTab.URL, YSTab);
	}

	public static createInstance(): ViewYSSL {
		return <ViewYSSL><any>(fairygui.UIPackage.createObject("yssl", "ViewYSSL"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let s = this;
		CommonManager.parseChildren(s, s);
	}

	private _list
	private selectIndex = 0;
	private _tabs: YSTab[] = [];
	protected _viewParent: fairygui.GObject;
	initView(pParent: fairygui.GObject) {
		let self = this;
		self._viewParent = pParent;
		self.addRelation(self._viewParent, fairygui.RelationType.Size);
		// self._tabs = [self.n6, self.n7, self.n8, self.n9];
		// for (let i = 0; i < 4; i++) {
		// 	self._tabs[i].setIdx(i);
		// }

		self.n13.callbackThisObj = self;
		self.n13.itemRenderer = self.itemRender;
		self.n13.scrollItemToViewOnClick = false;
	}

	private itemRender(idx, obj) {
		let item: ItemYSSL = obj as ItemYSSL;
		item.setdata(this._lstDta[idx], this._curActVo.id);
	}

	private setTabSelected() {
		let self = this;
		for (let i = 0; i < 4; i++) {
			// self._tabs[i].setSelect(self.selectIndex == i);
			self._tabs[i].setSelect(self.selectIndex == self._tabs[i].idx);
		}
	}

	private updateReddot() {
		let self = this;
		let redCtr = GGlobal.reddot;
		// for (let i = 0; i < 4; i++) {
		// 	self._tabs[i].updateDot(redCtr.checkCondition(UIConst.YSSL, i + 1));
		// }
		for (let i = 0; i < 4; i++) {
			self._tabs[i].updateDot(redCtr.checkCondition(self._curActVo.id, self._tabs[i].idx + 1));
		}
	}

	private onTabClick(e: egret.TouchEvent) {
		let s = this;
		s.selectIndex = (e.currentTarget as YSTab).idx;
		s.setTabSelected();
		s.updateView();
	}

	private _lstDta = [];
	private updateView() {
		let self = this;
		let m = GGlobal.modelYSSL;
		// let data = m.getCFGByIndex(self.selectIndex + 1);
		let data;
		let priceCFG;
		let today_recharge_val;
		if(self._curActVo.id == UIConst.YSSL)
		{
			data = m.getCFGByIndex(self.selectIndex + 1);
			priceCFG = m.getPriceByType(self.selectIndex + 1);
			self.n11.visible = m.act_data[self.selectIndex + 1] != 0 ? false : true;
			self.n11.checkNotice = m.today_recharge_val >= priceCFG.rmb;
			today_recharge_val = m.today_recharge_val;
		}else if(self._curActVo.id == UIConst.YUNCHOUWEIWO_QCYL)
		{
			data = m.getCFGByIndex1(self.selectIndex + 1, self._curActVo.qs);
			priceCFG = m.getPriceByType1(self.selectIndex + 1);
			self.n11.visible = m.qcyl_act_data[self.selectIndex + 1] != 0 ? false : true;
			self.n11.checkNotice = m.qcyl_recharge_val >= priceCFG.rmb;
			today_recharge_val = m.qcyl_recharge_val;
		}
		data = data.sort(function (a, b) {
			// let data = GGlobal.modelYSSL.task_data;
			let data;
			if(self._curActVo.id == UIConst.YSSL)
			{
				data = GGlobal.modelYSSL.task_data;
			}else if(self._curActVo.id == UIConst.YUNCHOUWEIWO_QCYL)
			{
				data = GGlobal.modelYSSL.qcyl_task_data;
			}
			let data1 = data[a.id];
			let data2 = data[b.id];
			let a_weight = a.id + getWeight(data1.st);
			let b_weight = b.id + getWeight(data2.st);
			return a_weight < b_weight ? -1 : 1;
		});
		function getWeight(s){
			if (s == 1) return -4000;
			if (s == 0) return -1000;
			if (s == 2) return 1000;
			return 0;
		}
		self._lstDta = data;
		self.n13.numItems = data.length;

		// let priceCFG = m.getPriceByType(self.selectIndex + 1);
		// let today_recharge_val = m.today_recharge_val;
		let color = today_recharge_val >= priceCFG.rmb ? Color.GREENSTR : Color.REDSTR;
		self.lbPro.text = BroadCastManager.reTxt("活动期间累计充值{0}元可激活异兽激活礼<font color='{1}'>({2}/{3})</font>", priceCFG.rmb, color, today_recharge_val, priceCFG.rmb);

		// self.n11.visible = m.act_data[self.selectIndex + 1] != 0 ? false : true;
		// self.n11.checkNotice = m.today_recharge_val >= priceCFG.rmb;
		self.updateReddot();
	}

	private actHD() {
		let self = this;
		let m = GGlobal.modelYSSL;
		// let priceCFG = m.getPriceByType(self.selectIndex + 1);
		// let today_recharge_val = m.today_recharge_val;
		let priceCFG;
		let today_recharge_val;
		if(self._curActVo.id == UIConst.YSSL)
		{
			priceCFG = m.getPriceByType(self.selectIndex + 1);
			today_recharge_val = m.today_recharge_val;
		}else if(self._curActVo.id == UIConst.YUNCHOUWEIWO_QCYL)
		{
			priceCFG = m.getPriceByType1(self.selectIndex + 1);
			today_recharge_val = m.qcyl_recharge_val;
		}
		if (m.act_data[self.selectIndex] == 1 || today_recharge_val >= priceCFG.rmb) {
			if(self._curActVo.id == UIConst.YSSL)
			{
				GGlobal.modelYSSL.CG_SpecialAnimalSendGift_active_9221(self.selectIndex + 1);
			}else if(self._curActVo.id == UIConst.YUNCHOUWEIWO_QCYL)
			{
				GGlobal.modelYSSL.CG_YCWW_QCYL_active(self.selectIndex + 1);
			}
		} else {
			ViewChongZhi.tryToOpenCZ();
		}
	}

	private _curActVo;
	private timeUpdate() {
		let t_dateStr = "";
		if (this._curActVo) {
			let t_end = this._curActVo.end; //s
			const servTime = Model_GlobalMsg.getServerTime() / 1000 >> 0; //s
			let t_remainS = t_end - servTime;
			if (t_remainS > 0) {
				if (t_remainS < 24 * 60 * 60) {
					t_dateStr = DateUtil2.formatUsedTime(t_remainS, "活动剩余时间：hh小时uu分ss秒");
				}
				else {
					t_dateStr = DateUtil2.formatUsedTime(t_remainS, "活动剩余时间：dd天hh小时");
				}
			}
			else {
				t_dateStr = HtmlUtil.font("活动已经结束", Color.REDSTR);
			}
		}
		this.lbTime.text = t_dateStr;
	}
	openPanel(pData?: any) {
		let self = this;
		let arr = [];
		if (pData) {
			self._curActVo = pData;
			if(self._curActVo.id == UIConst.YSSL)
			{
				for(let key in Config.yssljh_018)
				{
					let vo:Iyssljh_018 = Config.yssljh_018[key];
					if(vo.qishu == self._curActVo.qs)
					{
						arr.push(vo);
					}
				}
			}else if(self._curActVo.id == UIConst.YUNCHOUWEIWO_QCYL)
			{
				GGlobal.modelYSSL.qcyl_qs = self._curActVo.qs;
				for(let key in Config.qcyljh_327)
				{
					let vo:Iqcyljh_327 = Config.qcyljh_327[key];
					if(vo.qishu == self._curActVo.qs)
					{
						arr.push(vo);
					}
				}
			}
		}
		// self.selectIndex = 0;
		self.selectIndex = arr[0].dengji - 1;

		self._tabs = [self.n6, self.n7, self.n8, self.n9];
		for (let i = 0; i < 4; i++) {
			self._tabs[i].setIdx(arr[i].dengji - 1, self._curActVo.id);
		}

		for (let i = 0; i < 4; i++) {
			self._tabs[i].addClickListener(self.onTabClick, self);
		}
		GGlobal.modelEightLock.CG4571(self._curActVo.id);
		self.n11.addClickListener(self.actHD, self);
		Timer.instance.listen(self.timeUpdate, self);
		if(self._curActVo.id == UIConst.YSSL)
		{
			IconUtil.setImg(self.n1, Enum_Path.ACTCOM_URL+"yssl.jpg");
			GGlobal.control.listen(ModelYSSL.OPEN, self.updateView, self);
		}else if(self._curActVo.id == UIConst.YUNCHOUWEIWO_QCYL)
		{
			IconUtil.setImg(self.n1, Enum_Path.ACTCOM_URL+"yssl.jpg");
			GGlobal.control.listen(ModelYSSL.QCYL_OPEN, self.updateView, self);
		}
		self.setTabSelected();
		self.updateReddot();
		self.updateView();
	}

	closePanel(pData?: any) {
		let self = this;
		for (let i = 0; i < 4; i++) {
			self._tabs[i].removeClickListener(self.onTabClick, self);
		}
		self.n13.numItems = 0;
		self.n11.removeClickListener(self.actHD, self);
		Timer.instance.remove(self.timeUpdate, self);
		IconUtil.setImg(self.n1, null);
		GGlobal.control.remove(ModelYSSL.OPEN, self.updateView, self);
		GGlobal.control.remove(ModelYSSL.QCYL_OPEN, self.updateView, self);
	}
}