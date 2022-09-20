class Child_ActCom_DBCZ extends fairygui.GComponent implements IPanel {

	public imgHeadbg: fairygui.GLoader;
	public list: fairygui.GList;
	public labTime: fairygui.GRichTextField;
	public labTips: fairygui.GRichTextField;
	public labCharge: fairygui.GRichTextField;
	public imgCharge: fairygui.GImage;

	public static URL: string = "ui://ncy51skvglz70";

	public static createInstance(): Child_HuoDong {
		return <Child_HuoDong><any>(fairygui.UIPackage.createObject("ActCom_DBCZ", "Child_ActCom_DBCZ"));
	}

	public constructor() {
		super();
	}

	/** 设置包名（静态属性） */
	public static pkg = "ActCom_DBCZ";
	/** 绑定ui的方法（静态方法） */
	public static setExtends() {
		//子类ui组件的绑定放在这里，此类就不用绑定了，在上层已经自动实现
		let f = fairygui.UIObjectFactory.setPackageItemExtension;
		f(ActCom_DBCZItem.URL, ActCom_DBCZItem);
	}

	protected _viewParent: fairygui.GObject;
	initView(pParent: fairygui.GObject) {
		this._viewParent = pParent;
		this.addRelation(this._viewParent, fairygui.RelationType.Size);
	}

	private vo: Vo_Activity;
	openPanel(pData?: any) {
		let self = this;
		self.vo = pData;
		self.show();
	}

	closePanel(pData?: any) {
		let s = this;
		let c = GGlobal.control;
		Timer.instance.remove(s.upTimer, s);
		c.remove(Enum_MsgType.HUODONG_DAILYGIFT_814, s.upList, s);
		c.remove(Enum_MsgType.HUODONG_DAILYONE_814, s.upList, s);
		c.remove(Enum_MsgType.HUODONG_ADDRECHARGE_814, s.upList, s);
		c.remove(Enum_MsgType.HUODONG_DAILYADDUP_814, s.upList, s);
		s.list.numItems = 0;
		IconUtil.setImg(s.imgHeadbg, null);
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let self = this;
		CommonManager.parseChildren(self, self);

		self.list.itemRenderer = self.renderHandle
		self.list.callbackThisObj = self;
		self.list.setVirtual();
	}

	public show(): void {
		let s = this;
		s.visible = true;
		s._hid = s.vo.id;
		Timer.instance.listen(s.upTimer, s, 1000);
		GGlobal.modelEightLock.CG4571(s._hid);
		if (s._hid == UIConst.HUODONG_DAILY_GIFT814) {
			GGlobal.control.listen(Enum_MsgType.HUODONG_DAILYGIFT_814, s.upList, s);
			s.labTips.text = "每日登录即可领取豪华奖励"
		}
		else if (s._hid == UIConst.HUODONG_DAILY_ONE814) {
			GGlobal.control.listen(Enum_MsgType.HUODONG_DAILYONE_814, s.upList, s);
			s.labTips.text = "单笔充值达到指定数额即可领取奖励"
		}
		else if (s._hid == UIConst.HUODONG_ADD_RECHARGE814) {
			GGlobal.control.listen(Enum_MsgType.HUODONG_ADDRECHARGE_814, s.upList, s);
			s.labTips.text = "累计充值达到指定数额即可领取奖励"
		}
		else if (s._hid == UIConst.HUODONG_DAILY_ADDUP814) {
			GGlobal.control.listen(Enum_MsgType.HUODONG_DAILYADDUP_814, s.upList, s);
			s.labTips.text = "累计充值达到指定数额即可领取奖励";
		}
		s.upList();
		IconUtil.setImg(s.imgHeadbg, Enum_Path.PIC_URL + "bar" + Config.jchd_723[s._hid].icon + ".jpg");
	}

	private _listData: Array<Vo_HuoDong>
	private _hid: number
	private upList(): void {
		let self = this;
		self._listData = [];
		self.labCharge.text = "";
		self.imgCharge.visible = false;
		if (self._hid == UIConst.HUODONG_DAILY_GIFT814) {
			self._listData = self.getListData(Model_HuoD814.dailyGiftArr);
		}
		else if (self._hid == UIConst.HUODONG_DAILY_ONE814) {
			self._listData = this.getListDataDaiOne(Model_HuoD814.dailyOneArr);
		} else if (self._hid == UIConst.HUODONG_ADD_RECHARGE814) {
			self._listData = self.getListData(Model_HuoD814.addRechargeArr);
		}
		else if (self._hid == UIConst.HUODONG_DAILY_ADDUP814) {
			self._listData = self.getListData(Model_HuoD814.dailyAddUpArr);
		}
		self.list.numItems = self._listData ? self._listData.length : 0;
		if (self.list.numItems > 0) {
			self.list.scrollToView(0);
		}
		self.upTimer();
	}

	private getListData(arr: Array<Vo_HuoDong>): Array<Vo_HuoDong> {
		let len = arr ? arr.length : 0
		let arr1 = [];//可领取
		let arr2 = [];//不能领取
		let arr3 = [];//已领取
		for (let i = 0; i < len; i++) {
			let $status = arr ? arr[i].status : 0
			if ($status == 1) {
				arr1.push(arr[i]);
			} else if ($status == 2) {
				arr3.push(arr[i]);
			} else {
				arr2.push(arr[i]);
			}
		}
		return arr1.concat(arr2).concat(arr3);
	}

	//单笔充值
	private getListDataDaiOne(arr: Array<Vo_HuoDong>): Array<any> {
		let len = arr ? arr.length : 0
		let arr1 = [];//可领取
		let arr2 = [];//不能领取
		let arr3 = [];//已领取
		let cfg = Config.dbcz3_733;
		arr.sort(function (a, b) {
			return a.id < b.id ? -1 : 1;
		});
		for (let i = 0; i < len; i++) {
			let v = arr[i]
			let max = cfg[v.id].cs
			let $status = arr ? arr[i].getStaCt(max) : 0
			if ($status == 1) {
				arr1.push(arr[i]);
			} else if ($status == 2) {
				arr3.push(arr[i]);
			} else {
				arr2.push(arr[i]);
			}
		}

		return arr1.concat(arr2).concat(arr3);
	}

	private renderHandle(index: number, obj: fairygui.GComponent): void {
		var item: VHuoDongI814 = obj as VHuoDongI814;
		item.setVo(this._listData[index], this._hid);
	}

	private upTimer(): void {
		let self = this;
		if (self.vo && (self._hid == UIConst.HUODONG_DAILY_GIFT814
			|| self._hid == UIConst.HUODONG_DAILY_ONE814
			|| self._hid == UIConst.HUODONG_DAILY_ADDUP814)) {
			//倒计时用
			var d = self.vo.getSurTime();
			if (d < 0) {
				this.labTime.text = "剩余时间：已结束"
			} else {
				let ax = this.oneDayTime()
				if (ax < 0) {
					ax = 0
				}
				this.labTime.text = "剩余时间：" + DateUtil.getMSBySecond4((ax / 1000) >> 0);
			}
		}
		else if (self.vo) {
			var d = self.vo.getSurTime();
			if (d < 0) {
				this.labTime.text = "剩余时间：已结束"
			} else {
				this.labTime.text = "剩余时间：" + DateUtil.getMSBySecond4(d)
			}
		}else {
			this.labTime.text = "剩余时间："
		}
	}

	private oneDayTime(): number {
		let ms = Model_GlobalMsg.getServerTime();
		let data = DateUtil.clearHourse(new Date(ms));
		let h0 = data.getTime();
		let ax = 86400000 + h0 - ms;
		return ax;
	}
}