class Child_HuoDong extends fairygui.GComponent {

	public imgHeadbg: fairygui.GLoader;
	public list: fairygui.GList;
	public labTime: fairygui.GRichTextField;
	public labTips: fairygui.GRichTextField;
	public labCharge: fairygui.GRichTextField;
	public imgCharge: fairygui.GImage;

	public static URL: string = "ui://vrw7je9rt2amc";

	public static createInstance(): Child_HuoDong {
		return <Child_HuoDong><any>(fairygui.UIPackage.createObject("huoDong", "Child_HuoDong"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.imgHeadbg = <fairygui.GLoader><any>(this.getChild("imgHeadbg"));
		this.list = <fairygui.GList><any>(this.getChild("list"));
		this.labTime = <fairygui.GRichTextField><any>(this.getChild("labTime"));
		this.labTips = <fairygui.GRichTextField><any>(this.getChild("labTips"));
		this.labCharge = <fairygui.GRichTextField><any>(this.getChild("labCharge"));
		this.imgCharge = <fairygui.GImage><any>(this.getChild("imgCharge"));

		this.list.itemRenderer = this.renderHandle
		this.list.callbackThisObj = this;
		this.list.setVirtual();
	}

	public show(a, id): void {
		this.visible = true;
		this._hid = id;
		Timer.instance.listen(this.upTimer, this, 1000);

		if (this._hid == UIConst.HUODONG_DAILY_GIFT) {
			GGlobal.control.listen(Enum_MsgType.HUODONG_DAILYGIFT_OPENUI, this.upList, this);
			GGlobal.modelActivity.CG_OPENACT(id);
			this.labTips.text = "每日登录即可领取豪华奖励"
		}
		else if (this._hid == UIConst.HUODONG_DAI_GIFT_ACT) {
			GGlobal.control.listen(Enum_MsgType.HUODONG_DAIGIFTACT_UI, this.upList, this);
			GGlobal.modelActivity.CG_OPENACT(id);
			this.labTips.text = "每日登录即可领取豪华奖励"
		}
		else if (this._hid == UIConst.HUODONG_DAI_GIFT_KF) {
			GGlobal.control.listen(Enum_MsgType.HUODONG_DAIGIFTKF_UI, this.upList, this);
			GGlobal.modelHuoDong.CG_DAIGIFTKF_UI();
			this.labTips.text = "每日登录即可领取豪华奖励"
		}
		else if (this._hid == UIConst.HUODONG_DAILY_ONE) {
			GGlobal.control.listen(Enum_MsgType.HUODONG_DAILYONE_OPENUI, this.upList, this);
			GGlobal.modelActivity.CG_OPENACT(id);
			this.labTips.text = "单笔充值达到指定数额即可领取奖励"
		}
		else if (this._hid == UIConst.HUODONG_DAI_ONE_KF) {
			GGlobal.control.listen(Enum_MsgType.HUODONG_DAIONEKF_UI, this.upList, this);
			GGlobal.modelHuoDong.CG_DAIONEKF_UI();
			this.labTips.text = "单笔充值达到指定数额即可领取奖励"
		}
		else if (this._hid == UIConst.HUODONG_DAI_ONE_ACT) {
			GGlobal.control.listen(Enum_MsgType.HUODONG_DAIONEACT_UI, this.upList, this);
			GGlobal.modelHuoDong.CG_DAIONEACT_UI();
			this.labTips.text = "单笔充值达到指定数额即可领取奖励"
		}
		else if (this._hid == UIConst.HUODONG_ADD_RECHARGE) {
			GGlobal.control.listen(Enum_MsgType.HUODONG_ADDRECHARGE_OPENUI, this.upList, this);
			GGlobal.modelHuoDong.CG_ADDRECHARGE_OPENUI2();
			this.labTips.text = "累计充值达到指定数额即可领取奖励"
		}
		else if (this._hid == UIConst.HUODONG_DAILY_ADDUP) {
			GGlobal.control.listen(Enum_MsgType.HUODONG_DAILYADDUP_OPENUI, this.upList, this);
			GGlobal.modelHuoDong.CG_DAILYADDUP_OPENUI();
			this.labTips.text = "累计充值达到指定数额即可领取奖励"
		}
		else if (this._hid == UIConst.HUODONG_DAI_ADD_KF) {
			GGlobal.control.listen(Enum_MsgType.HUODONG_DAIADDKF_UI, this.upList, this);
			GGlobal.modelHuoDong.CG_DAIADDKF_OPENUI();
			this.labTips.text = "累计充值达到指定数额即可领取奖励"
		}
		else if (this._hid == UIConst.HUODONG_DAI_ADD_ACT) {
			GGlobal.control.listen(Enum_MsgType.HUODONG_DAIADDACT_UI, this.upList, this);
			GGlobal.modelHuoDong.CG_DAIADDACT_OPENUI();
			this.labTips.text = "累计充值达到指定数额即可领取奖励"
		}
		else if (this._hid == UIConst.HUODONG_SEVEN_KAIFU) {
			GGlobal.control.listen(Enum_MsgType.HUODONG_SEVEN_KF_OPENUI, this.upList, this);
			GGlobal.modelHuoDong.CG_SEVEN_KAIFU_UI();
			this.labTips.text = "累计充值满" + ConfigHelp.getSystemNum(3201) + "元且达到指定天数可领取奖励"
		}
		else if (this._hid == UIConst.HUODONG_SEVEN_ACT) {
			GGlobal.control.listen(Enum_MsgType.HUODONG_SEVEN_KF_OPENUI, this.upList, this);
			GGlobal.modelHuoDong.CG_SEVEN_ACT_UI();
			this.labTips.text = "累计充值满" + ConfigHelp.getSystemNum(3201) + "元且达到指定天数可领取奖励"
		}
		this.upList();
		if (id == UIConst.HUODONG_ADD_RECHARGESYS) {//精彩活动里面没有4515 id
			id = UIConst.HUODONG_ADD_RECHARGE;
		}
		IconUtil.setImg1(Enum_Path.PIC_URL + "bar" + Config.jchd_723[id].icon + ".jpg", this.imgHeadbg);
	}

	private _listData: Array<any>
	private _hid: number
	private _act: Vo_Activity
	private upList(): void {
		const self = this;
		self._listData = [];
		self._act = null;
		self.labCharge.text = "";
		self.imgCharge.visible = false;
		if (self._hid == UIConst.HUODONG_DAILY_GIFT) {
			self._listData = self.getListDataGift(Model_HuoDong.dailyGiftArr);
			// self._act = Model_Activity.getActivty(Model_HuoDong.TYPE, self._hid, Model_HuoDong.dailyGiftQs)
			self._act = GGlobal.modelActivity.get(Model_HuoDong.TYPE, self._hid, Model_HuoDong.dailyGiftQs);
		}
		else if (self._hid == UIConst.HUODONG_DAI_GIFT_ACT) {
			self._listData = self.getListDataGift(Model_HuoDong.daiGiftActArr);
			// self._act = Model_Activity.getActivty(Model_HuoDong.TYPE, self._hid, Model_HuoDong.daiGiftActQs)
			self._act = GGlobal.modelActivity.get(Model_HuoDong.TYPE, self._hid, Model_HuoDong.daiGiftActQs)
		}
		else if (self._hid == UIConst.HUODONG_DAI_GIFT_KF) {
			self._listData = self.getListDataGift(Model_HuoDong.daiGiftKfArr);
			self._act = null
		}
		else if (self._hid == UIConst.HUODONG_DAILY_ONE) {
			let arr = Model_HuoDong.getDailyOneArr(Model_HuoDong.dailyOneQs);
			let len = arr ? arr.length : 0
			let arr1 = [];//可领取
			let arr2 = [];//不能领取
			let arr3 = [];//已领取
			for (let i = 0; i < len; i++) {
				arr[i].index = i;
				let $status = Model_HuoDong.dailyOneArr ? Model_HuoDong.dailyOneArr[i] : 0
				if ($status == 1) {
					arr1.push(arr[i]);
				} else if ($status == 2) {
					arr3.push(arr[i]);
				} else {
					arr2.push(arr[i]);
				}
			}
			self._listData = arr1.concat(arr2).concat(arr3);
			// self._act = Model_Activity.getActivty(Model_HuoDong.TYPE, self._hid, Model_HuoDong.dailyOneQs)
			self._act = GGlobal.modelActivity.get(Model_HuoDong.TYPE, self._hid, Model_HuoDong.dailyOneQs);
		}
		else if (self._hid == UIConst.HUODONG_DAI_ONE_KF) {
			self._listData = self.getListDataDaiOne(Model_HuoDong.daiOneKfArr, self._hid);
			self._act = null
		}
		else if (self._hid == UIConst.HUODONG_DAI_ONE_ACT) {
			self._listData = self.getListDataDaiOne(Model_HuoDong.daiOneActArr, self._hid);
			// self._act = Model_Activity.getActivty1(Model_HuoDong.TYPE, self._hid);
			self._act = GGlobal.modelActivity.get(Model_HuoDong.TYPE, self._hid);
		}
		else if (self._hid == UIConst.HUODONG_ADD_RECHARGE) {
			self._listData = self.getListData(Model_HuoDong.addRechargeArr);
			// self._act = Model_Activity.getActivty1(Model_HuoDong.TYPE, self._hid)
			self._act = GGlobal.modelActivity.get(Model_HuoDong.TYPE, self._hid);
		}
		else if (self._hid == UIConst.HUODONG_DAILY_ADDUP) {
			self._listData = self.getListData(Model_HuoDong.dailyAddUpArr);
			// self._act = Model_Activity.getActivty1(Model_HuoDong.TYPE, self._hid)
			self._act = GGlobal.modelActivity.get(Model_HuoDong.TYPE, self._hid);
		}
		else if (self._hid == UIConst.HUODONG_DAI_ADD_KF) {
			self._listData = self.getListData(Model_HuoDong.daiAddKfArr);
			// self._act = Model_Activity.getActivty1(Model_HuoDong.TYPE, self._hid);
			self._act = GGlobal.modelActivity.get(Model_HuoDong.TYPE, self._hid);
		}
		else if (self._hid == UIConst.HUODONG_DAI_ADD_ACT) {
			self._listData = self.getListData(Model_HuoDong.daiAddActArr);
			// self._act = Model_Activity.getActivty1(Model_HuoDong.TYPE, self._hid);
			self._act = GGlobal.modelActivity.get(Model_HuoDong.TYPE, self._hid);
		}
		else if (self._hid == UIConst.HUODONG_SEVEN_KAIFU) {
			self._listData = self.getListData(Model_HuoDong.sevenKfArr);
			self._act = null
			self.labCharge.text = "今日已充：" + Model_HuoDong.sevenKf + "元";
			self.imgCharge.visible = true;
		}
		else if (self._hid == UIConst.HUODONG_SEVEN_ACT) {
			self._listData = self.getListData(Model_HuoDong.sevenKfArr);
			self._act = GGlobal.modelActivity.get(Model_HuoDong.TYPE, self._hid, Model_HuoDong.sevenQs);
			self.labCharge.text = "今日已充：" + Model_HuoDong.sevenKf + "元";
			self.imgCharge.visible = true;
		}
		self.list.numItems = self._listData ? self._listData.length : 0;
		if (self.list.numItems > 0) {
			self.list.scrollToView(0);
		}
		self.upTimer();
	}

	private getListData(arr: Array<Vo_HuoDong>): Array<any> {
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

	private getListDataGift(giftArr: number[]) {
		let arr1 = [];//可领取
		let arr2 = [];//不能领取
		let arr3 = [];//已领取
		for (let i = 1; i < 5; i++) {
			if (giftArr[i] == 1) {
				arr1.push(i);
			} else if (giftArr[i] == 2) {
				arr3.push(i);
			} else {
				arr2.push(i);
			}
		}
		return arr1.concat(arr2).concat(arr3);
	}
	//单笔充值
	private getListDataDaiOne(arr: Array<Vo_HuoDong>, hid): Array<any> {
		let len = arr ? arr.length : 0
		let arr1 = [];//可领取
		let arr2 = [];//不能领取
		let arr3 = [];//已领取
		let cfg = this._hid == UIConst.HUODONG_DAI_ONE_KF ? Config.dbcz1_733 : Config.dbcz2_733
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

	public disposePanel(): void {
		const control = GGlobal.control;
		Timer.instance.remove(this.upTimer, this);
		control.remove(Enum_MsgType.HUODONG_DAILYGIFT_OPENUI, this.upList, this);
		control.remove(Enum_MsgType.HUODONG_DAIGIFTACT_UI, this.upList, this);
		control.remove(Enum_MsgType.HUODONG_DAIGIFTKF_UI, this.upList, this);
		control.remove(Enum_MsgType.HUODONG_DAILYONE_OPENUI, this.upList, this);
		control.remove(Enum_MsgType.HUODONG_DAIONEKF_UI, this.upList, this);
		control.remove(Enum_MsgType.HUODONG_DAIONEACT_UI, this.upList, this);
		control.remove(Enum_MsgType.HUODONG_ADDRECHARGE_OPENUI, this.upList, this);
		control.remove(Enum_MsgType.HUODONG_DAILYADDUP_OPENUI, this.upList, this);
		control.remove(Enum_MsgType.HUODONG_DAIADDKF_UI, this.upList, this);
		control.remove(Enum_MsgType.HUODONG_DAIADDACT_UI, this.upList, this);
		control.remove(Enum_MsgType.HUODONG_SEVEN_KF_OPENUI, this.upList, this);
		this.visible = false;
		IconUtil.setImg1(null, this.imgHeadbg);
		this.list.numItems = 0;
	}

	private renderHandle(index: number, obj: fairygui.GComponent): void {
		var item: VHuoDongItem = obj as VHuoDongItem;
		item.setVo(this._listData[index], this._hid);
	}

	private upTimer(): void {
		if (this._act && (this._hid == UIConst.HUODONG_DAI_GIFT_ACT ||
			this._hid == UIConst.HUODONG_DAI_ONE_ACT ||
			this._hid == UIConst.HUODONG_DAI_ADD_ACT)) {
			//倒计时用
			var d = this._act.end - Math.floor(Model_GlobalMsg.getServerTime() / 1000);
			if (d < 0) {
				this.labTime.text = "剩余时间：已结束"
			} else {
				let ax = this.oneDayTime()
				if (ax < 0) {
					ax = 0
				}
				this.labTime.text = "剩余时间：" + DateUtil.getMSBySecond4((ax / 1000) >> 0);
			}
		} else if (this._hid == UIConst.HUODONG_DAI_GIFT_KF ||
			this._hid == UIConst.HUODONG_DAI_ONE_KF ||
			this._hid == UIConst.HUODONG_DAI_ADD_KF) {
			//倒计时用
			let ax = this.kaiFuTime();
			if (ax < 0) {
				this.labTime.text = "剩余时间：已结束";
			} else {
				let ax = this.oneDayTime()
				if (ax < 0) {
					ax = 0
				}
				this.labTime.text = "剩余时间：" + DateUtil.getMSBySecond4((ax / 1000) >> 0);
			}
		}
		else if (this._act) {
			var d = this._act.end - Math.floor(Model_GlobalMsg.getServerTime() / 1000);
			if (d < 0) {
				this.labTime.text = "剩余时间：已结束"
			} else {
				this.labTime.text = "剩余时间：" + DateUtil.getMSBySecond4(d)
			}
		}
		else if (this._hid == UIConst.HUODONG_SEVEN_KAIFU) {
			//倒计时用
			let ax = this.kaiFuTime();
			if (ax < 0) {
				this.labTime.text = "剩余时间：已结束";
			} else {
				this.labTime.text = "剩余时间：" + DateUtil.getMSBySecond4((ax / 1000) >> 0);
			}
		} else if (this._hid == UIConst.HUODONG_ADD_RECHARGE) {
			if (Model_GlobalMsg.kaifuDay > 7) {
				const act = GGlobal.modelActivity.get(UIConst.HUODONG, UIConst.HUODONG_ADD_RECHARGE);
				if (act) {
					this.labTime.text = "剩余时间：" + DateUtil.getMSBySecond4(act.getSurTime());
				} else {
					this.labTime.text = "剩余时间：已结束";
				}
			} else {
				let ax = this.kaiFuTime();
				this.labTime.text = "剩余时间：" + DateUtil.getMSBySecond4((ax / 1000) >> 0);
			}
		}
		else {
			this.labTime.text = "剩余时间："
		}
	}

	private kaiFuTime(): number {
		let ms = Model_GlobalMsg.getServerTime();
		let data = DateUtil.clearHourse(new Date(ms));
		let h0 = data.getTime();
		let ax = 86400000 - (ms - h0);
		let day = Model_GlobalMsg.kaifuDay;
		ax += 86400000 * (7 - day);
		return ax
	}

	private oneDayTime(): number {
		let ms = Model_GlobalMsg.getServerTime();
		let data = DateUtil.clearHourse(new Date(ms));
		let h0 = data.getTime();
		let ax = 86400000 + h0 - ms;
		return ax
	}

}