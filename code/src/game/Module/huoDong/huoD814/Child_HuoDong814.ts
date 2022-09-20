class Child_HuoDong814 extends fairygui.GComponent {

	public imgHeadbg: fairygui.GLoader;
	public list: fairygui.GList;
	public labTime: fairygui.GRichTextField;
	public labTips: fairygui.GRichTextField;
	public labCharge: fairygui.GRichTextField;
	public imgCharge: fairygui.GImage;

	public static URL: string = "ui://vrw7je9rt2amc";

	public static createInstance(): Child_HuoDong814 {
		fairygui.UIObjectFactory.setPackageItemExtension(Child_HuoDong814.URL, Child_HuoDong814);
		fairygui.UIObjectFactory.setPackageItemExtension(VHuoDongI814.URL, VHuoDongI814);
		return <Child_HuoDong814><any>(fairygui.UIPackage.createObject("huoDong", "Child_HuoDong"));
	}

	private static _instance: Child_HuoDong814
	public static get instance(): Child_HuoDong814 {
		if (Child_HuoDong814._instance == null) {
			Child_HuoDong814._instance = Child_HuoDong814.createInstance();
		}
		return Child_HuoDong814._instance;
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

	public show(p: fairygui.GComponent, id): void {
		let s = this;
		s.visible = true;
		s._hid = id;
		p.addChild(s);
		s.setXY(0, 290);
		Timer.instance.listen(s.upTimer, s, 1000);
		GGlobal.modelEightLock.CG4571(id);
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
			s.labTips.text = "累计充值达到指定数额即可领取奖励"
		}
		s.upList();
		IconUtil.setImg(s.imgHeadbg, Enum_Path.PIC_URL + "bar" + Config.jchd_723[id].icon + ".jpg");
	}

	public disposePanel(): void {
		let s = this;
		if (s.parent) {
			s.parent.removeChild(s);
		}
		Timer.instance.remove(s.upTimer, s);
		GGlobal.control.remove(Enum_MsgType.HUODONG_DAILYGIFT_814, s.upList, s);
		GGlobal.control.remove(Enum_MsgType.HUODONG_DAILYONE_814, s.upList, s);
		GGlobal.control.remove(Enum_MsgType.HUODONG_ADDRECHARGE_814, s.upList, s);
		GGlobal.control.remove(Enum_MsgType.HUODONG_DAILYADDUP_814, s.upList, s);
		this.list.numItems = 0;
		IconUtil.setImg(s.imgHeadbg, null);
	}

	private _listData: Array<Vo_HuoDong>
	private _hid: number
	private _act: Vo_Activity
	private upList(): void {
		this._listData = [];
		this._act = null;
		this.labCharge.text = "";
		this.imgCharge.visible = false;
		this._act = ModelEightLock.getActVo(this._hid);
		if (this._hid == UIConst.HUODONG_DAILY_GIFT814) {
			this._listData = this.getListData(Model_HuoD814.dailyGiftArr);
		}
		else if (this._hid == UIConst.HUODONG_DAILY_ONE814) {
			this._listData = this.getListDataDaiOne(Model_HuoD814.dailyOneArr);
		}
		else if (this._hid == UIConst.HUODONG_ADD_RECHARGE814) {
			this._listData = this.getListData(Model_HuoD814.addRechargeArr);
		}
		else if (this._hid == UIConst.HUODONG_DAILY_ADDUP814) {
			this._listData = this.getListData(Model_HuoD814.dailyAddUpArr);
		}
		this.list.numItems = this._listData ? this._listData.length : 0;
		if (this.list.numItems > 0) {
			this.list.scrollToView(0);
		}
		this.upTimer();
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
		if (this._act && (this._hid == UIConst.HUODONG_DAILY_GIFT814
			|| this._hid == UIConst.HUODONG_DAILY_ONE814
			|| this._hid == UIConst.HUODONG_DAILY_ADDUP814)) {
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
		}
		else if (this._act) {
			var d = this._act.end - Math.floor(Model_GlobalMsg.getServerTime() / 1000);
			if (d < 0) {
				this.labTime.text = "剩余时间：已结束"
			} else {
				this.labTime.text = "剩余时间：" + DateUtil.getMSBySecond4(d)
			}
		}
		else {
			this.labTime.text = "剩余时间："
		}
	}

	private oneDayTime(): number {
		let ms = Model_GlobalMsg.getServerTime();
		let data = DateUtil.clearHourse(new Date(ms));
		let h0 = data.getTime();
		let ax = 86400000 + h0 - ms;
		return ax
	}

}