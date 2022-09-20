class Child_HuoDOnly extends fairygui.GComponent implements IChildHuoDong {

	public imgHeadbg: fairygui.GLoader;
	public imgCharge: fairygui.GImage;
	public list: fairygui.GList;
	public labTime: fairygui.GRichTextField;
	public labTips: fairygui.GRichTextField;
	public labCharge: fairygui.GRichTextField;

	public static URL: string = "ui://mk3gp0vrlbbw0";

	public static createInstance(): Child_HuoDOnly {
		return <Child_HuoDOnly><any>(fairygui.UIPackage.createObject("huoDOnly", "Child_HuoDOnly"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		CommonManager.parseChildren(this, this);

		this.list.itemRenderer = this.renderHandle
		this.list.callbackThisObj = this;
		this.list.setVirtual();
	}

	public show(a, act: Vo_Activity): void {
		this.visible = true;
		this._act = act;
		Timer.instance.listen(this.upTimer, this, 1000);
		if (this._act.index == UIConst.HUOD_ONLY_DAILY_ONE) {
			GGlobal.control.listen(Enum_MsgType.HUOD_ONLY_DAIONEA_UI, this.upList, this);
		} else if (this._act.index == UIConst.HUOD_ONLY_ADD_RECHARGE) {
			GGlobal.control.listen(Enum_MsgType.HUOD_ONLY_ADDRECHARGE_OPENUI, this.upList, this);
		} else if (this._act.index == UIConst.HUOD_ONLY_YBFL) {
			GGlobal.control.listen(Enum_MsgType.HUOD_ONLY_YBFL, this.upList, this);
		}
		GGlobal.modelHuoDOnly.CG_OPEN_UI(act.id);
		this.labTips.text = Config.zshdb_315[act.id].nr
		this.upList();

		// if (this._act.index == UIConst.HUOD_ONLY_YBFL) {
		// 	IconUtil.setImg(this.imgHeadbg, Enum_Path.PIC_URL + "yuanbaofanli.jpg");
		// } else {
			IconUtil.setImg(this.imgHeadbg, Enum_Path.PIC_URL + "zs" + Config.zshd_315[this._act.index].bg + ".jpg");
		// }

	}

	private _listData: Array<any>
	private _act: Vo_Activity
	private upList(): void {
		this._listData = [];
		this.labCharge.text = "";
		this.imgCharge.visible = false;
		if (this._act.index == UIConst.HUOD_ONLY_DAILY_ONE) {
			this._listData = this.getListDataDaiOne(Model_HuoDOnly.getDaiOneArr(this._act.id), Config.zshddbcz_315)
		} else if (this._act.index == UIConst.HUOD_ONLY_ADD_RECHARGE) {
			this._listData = Model_HuoDong.getListData(Model_HuoDOnly.getAddRechargeArr(this._act.id))
		} else if (this._act.index == UIConst.HUOD_ONLY_YBFL) {
			this._listData = Model_HuoDong.getListData(GGlobal.modelHuoDOnly.getYbaoDta(this._act.id))
		}
		this.list.numItems = this._listData ? this._listData.length : 0;
		if (this.list.numItems > 0) {
			this.list.scrollToView(0);
		}
		this.upTimer();
	}

	//单笔充值
	private getListDataDaiOne(arr: Array<Vo_HuoDong>, cfg: Record<string, Izshddbcz_315>): Array<any> {
		let len = arr ? arr.length : 0
		let arr1 = [];//可领取
		let arr2 = [];//不能领取
		let arr3 = [];//已领取
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
		Timer.instance.remove(this.upTimer, this);
		GGlobal.control.remove(Enum_MsgType.HUOD_ONLY_DAIONEA_UI, this.upList, this);
		GGlobal.control.remove(Enum_MsgType.HUOD_ONLY_ADDRECHARGE_OPENUI, this.upList, this);
		GGlobal.control.remove(Enum_MsgType.HUOD_ONLY_YBFL, this.upList, this);
		this.visible = false;
		IconUtil.setImg(this.imgHeadbg, null);
		this.list.numItems = 0;
	}

	private renderHandle(index: number, obj: fairygui.GComponent): void {
		var item: VHuoDOnlyItem = obj as VHuoDOnlyItem;
		item.setVo(this._listData[index], this._act);
	}

	private upTimer(): void {
		if (this._act) {
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

}