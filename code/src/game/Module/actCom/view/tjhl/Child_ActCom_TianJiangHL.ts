/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class Child_ActCom_TianJiangHL extends fairygui.GComponent implements IPanel {

	public list: fairygui.GList;
	public imgBg: fairygui.GLoader;
	public n4: fairygui.GImage;
	public lbTime: fairygui.GRichTextField;

	public static URL: string = "ui://gy3mzfqr7jlm0";
	public static pkg = "actComTianJiangHaoli";
	public static createInstance(): Child_ActCom_TianJiangHL {
		return <Child_ActCom_TianJiangHL><any>(fairygui.UIPackage.createObject("actComTianJiangHaoli", "Child_ActCom_TianJiangHL"));
	}

	public constructor() {
		super();
	}


	public static setExtends() {
		let f = fairygui.UIObjectFactory.setPackageItemExtension;
		f(Item_TianJiangHL.URL, Item_TianJiangHL);
	}

	initView(pParent: fairygui.GObject) {
		const self = this;

	}

	itemTender(idx, obj) {
		const self = this;
		let item: Item_TianJiangHL = obj as Item_TianJiangHL;
		item.setdata(self.listdata[idx]);
	}

	dispose() {
		super.dispose();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		const self = this;
		CommonManager.parseChildren(self, self);
		self.list.callbackThisObj = self;
		self.list.itemRenderer = self.itemTender;
		self.list.setVirtual();
	}

	update() {
		const self = this;
		const model = GGlobal.model_actCom;
		let data = model.tianJiangHl_data;
		let chargeValue = model.tianJiangHl_rechargeValue;
		self.listdata = [];
		let bol = false;
		for (let i = 0; i < self.tianjiangHL_CFG.length; i++) {
			let item = self.tianjiangHL_CFG[i];
			let obj: any = {};
			obj.id = item.id;
			obj.cfg = item;
			let st = 0;
			let stweight = 0;
			if (chargeValue >= item.lj) {
				if (data.indexOf(item.id) != -1) {
					st = 2;
					stweight = 10000;
				} else {
					st = 1;
					bol = true;
					stweight = -10000;
				}
			}
			obj.st = st;
			obj.weight = item.id + stweight;
			self.listdata.push(obj);
		}

		let reddot = GGlobal.reddot;
		reddot.setCondition(UIConst.ACTCOM_TJHB, 0, bol);
		reddot.notifyMsg(UIConst.ACTCOM_TJHB);
		self.listdata.sort(function (a, b) {
			return a.weight < b.weight ? -1 : 1;
		});
		self.list.numItems = self.listdata.length;
	}

	private onUpdate() {
		const end = this._vo ? this._vo.end : 0;
		const servTime = Model_GlobalMsg.getServerTime() / 1000 >> 0;
		if (end - servTime > 0) {
			this.lbTime.text = "剩余时间：<font color='#15f234'>" + DateUtil.getMSBySecond4(end - servTime) + "</font>";
		} else {
			this.lbTime.text = "00:00:00";
		}
	}

	_vo: Vo_Activity;
	listdata: { id: number, st: number, weight, number, cfg: Itjhl_335 }[];
	tianjiangHL_CFG: Itjhl_335[];
	public openPanel(pData?: Vo_Activity): void {
		let self = this;
		self._vo = pData;
		if (!self.tianjiangHL_CFG || self.tianjiangHL_CFG[0].qishu != pData.qs) {
			self.tianjiangHL_CFG = [];
			let libn = Config.tjhl_335;
			for (let i in libn) {
				if (libn[i].qishu == pData.qs) {
					self.tianjiangHL_CFG.push(libn[i]);
				}
			}
		}
		GGlobal.modelActivity.CG_OPENACT(pData.id);
		Timer.instance.listen(self.onUpdate, self);
		IconUtil.setImg(self.imgBg, Enum_Path.ACTCOM_URL + "tianjianghl.jpg");
		GGlobal.control.listen(UIConst.ACTCOM_TIANJIANGHL, self.update, self);
	}

	/**销毁 */
	public closePanel(): void {
		let self = this;
		IconUtil.setImg(self.imgBg, null);
		Timer.instance.remove(self.onUpdate, self);
		GGlobal.control.remove(UIConst.ACTCOM_TIANJIANGHL, self.update, self);
	}
}