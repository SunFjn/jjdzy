/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class ChildZZMiBao extends fairygui.GComponent implements IPanel {

	public n0: ItemZZmiBao;
	public n1: ItemZZmiBao;
	public n2: ItemZZmiBao;
	public n3: ItemZZmiBao;
	public n4: ItemZZmiBao;
	public n5: ItemZZmiBao;
	public n6: ItemZZmiBao;
	public n7: ItemZZmiBao;
	public btnReset: fairygui.GButton;
	public btnGet: fairygui.GButton;
	public imgBg: fairygui.GLoader;
	public cost0: ViewResource;
	public cost1: ViewResource;
	public lbItemName0: fairygui.GRichTextField;
	public lbItemName1: fairygui.GRichTextField;
	public lbTime: fairygui.GRichTextField;
	public linkLb: fairygui.GRichTextField;

	public static URL: string = "ui://swuqw468x9uy0";
	public static pkg = "zhizhunmibao";

	public static createInstance(): ChildZZMiBao {
		return <ChildZZMiBao><any>(fairygui.UIPackage.createObject("zhizhunmibao", "ChildZZMiBao"));
	}

	public constructor() {
		super();
	}

	initView(pParent: fairygui.GObject) { }
	dispose() {
		super.dispose();
	}

	public static setExtends() {
		let f = fairygui.UIObjectFactory.setPackageItemExtension;
		f(ItemZZmiBao.URL, ItemZZmiBao);
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		const self = this;
		CommonManager.parseChildren(self, self);
	}

	getHd = () => {
		if (!TimeUitl.cool("zzmb", 1000)) {
			return;
		}
		let b = 0;
		let model = GGlobal.model_actCom;
		let data = model.zzmb_data;
		let hasChance = false;
		for (let i = 0; i < 8; i++) {
			if (data[i][4] > 0) {
				b = 1;
				break;
			}
		}
		if (b) {
			GGlobal.model_actCom.CG_ZZMB_GETAWARDS();
		} else {
			ViewCommonWarn.text("奖励已抽完，请重置秘宝");
		}
	}

	resetHD = () => {
		GGlobal.model_actCom.CG_ZZMB_RESET();
	}

	update = (f?) => {
		let self = this;
		let model = GGlobal.model_actCom;
		let data = model.zzmb_data;
		let hasChance = false;
		for (let i = 0; i < 8; i++) {
			if (data[i]) {
				hasChance = hasChance || data[i][4] > 0;
				(this["n" + i] as ItemZZmiBao).setdata(data[i],f);
			}
		}

		self.cost0.setLb(Model_Bag.getItemCount(410436), 1);
		self.cost0.setItemId(410436);
		self.lbItemName0.text = ConfigHelp.getItemColorName(410436);

		let bol = false;
		let count = model.zzmbcount + 1;
		let config = Config.zzmbxh_503[count];
		if (config) {
			let items = JSON.parse(config.consume);
			self.cost1.setLb(Model_Bag.getItemCount(items[0][1]), items[0][2]);
			self.cost1.setItemId(items[0][1]);
			self.lbItemName1.text = ConfigHelp.getItemColorName(items[0][1]);

			if (hasChance) {
				bol = Model_Bag.getItemCount(items[0][1]) >= items[0][2];
			}
		}else{
			let config = Config.zzmbxh_503[1];
			let items = JSON.parse(config.consume);
			self.cost1.setLb(Model_Bag.getItemCount(items[0][1]), items[0][2]);
			self.cost1.setItemId(items[0][1]);
			self.lbItemName1.text = ConfigHelp.getItemColorName(items[0][1]);
		}

		if (!hasChance) {
			bol = Model_Bag.getItemCount(410436) > 0;
		}

		let reddot = GGlobal.reddot;
		reddot.setCondition(UIConst.ACTCOMzzmb, 0, bol);
		reddot.notifyMsg(UIConst.ACTCOMzzmb);
	}

	_vo;
	public openPanel(pData?: Vo_Activity): void {
		let self = this;
		self._vo = pData;
		self.eventFun(1);
		GGlobal.modelActivity.CG_OPENACT(pData.id);
		Timer.instance.listen(self.onUpdate, self);
		IconUtil.setImg(self.imgBg, Enum_Path.ACTCOM_URL + "zzmb.png");
		GGlobal.control.listen(UIConst.ACTCOMzzmb, self.update, self);
	}

	eventFun = (v) => {
		const self = this;
		let fun = EventUtil.register;
		fun(v, self.btnGet, EventUtil.TOUCH, self.getHd, self);
		fun(v, self.btnReset, EventUtil.TOUCH, self.resetHD, self);
		fun(v, self.linkLb, EventUtil.TOUCH, self.openGaiLV, self);
	}

	private openGaiLV(evt: egret.TouchEvent) {
		evt.stopPropagation();
		evt.stopImmediatePropagation();
		GGlobal.layerMgr.open(UIConst.GAILV, 11);
	}

	/**销毁 */
	public closePanel(): void {
		let self = this;
		self.eventFun(0);
		for (let i = 0; i < 8; i++) {
			if (this["n" + i]) {
				this["n" + i]["clean"]();
			}
		}
		IconUtil.setImg(self.imgBg, null);
		Timer.instance.remove(self.onUpdate, self);
		GGlobal.control.remove(UIConst.ACTCOMzzmb, self.update, self);
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


}