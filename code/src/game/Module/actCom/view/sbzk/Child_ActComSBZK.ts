/**
 * 神兵折扣活动
 */
class Child_ActComSBZK extends fairygui.GComponent implements IPanel {
	//>>>>start
	public bgImg: fairygui.GLoader;
	public labTime: fairygui.GRichTextField;
	public goBtn: Button0;
	public expbar: fairygui.GProgressBar;
	public num1: fairygui.GTextField;
	public num2: fairygui.GTextField;
	public num3: fairygui.GTextField;
	public num4: fairygui.GTextField;
	public tipsTxt: fairygui.GTextField;
	public disGroup0: fairygui.GGroup;
	public disGroup1: fairygui.GGroup;
	//>>>>end
	private datas: any = [];
	private _maxCount: number = 0;
	private _act;
	private _vo: Vo_Activity;

	public static pkg = "actComSBZK";

	public static URL: string = "ui://6gtjahseo65r0";

	public static createInstance(): Child_ActComSBZK {
		return <Child_ActComSBZK><any>(fairygui.UIPackage.createObject("actComSBZK", "Child_ActComSBZK"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let s = this;
		CommonManager.parseChildren(s, s);
	}

	public static setExtends() {
	}

	initView(pParent: fairygui.GObject) {
		// let self = this;
		// for (let key in Config.sbzk_281) {
		//     let cfg:Isbzk_281 = Config.sbzk_281[key];
		//     self.datas.push(Config.sbzk_281[key]);
		// 	let arr = JSON.parse(cfg.time);
		// self["num" + key].text = arr[0][0] + "次";
		// 	self._maxCount = arr[0][0];
		// }
		// ImageLoader.instance.loader(Enum_Path.PIC_URL + "shenbingzhekou.jpg", this.bgImg);
	}

	openPanel(pData?: Vo_Activity) {
		this._vo = pData;
		this.datas = [];
		this.disGroup0.visible = false;
		this.disGroup1.visible = false;
		if (pData.id == UIConst.ACTCOM_SBZK) {
			GGlobal.modelActivity.CG_OPENACT(UIConst.ACTCOM_SBZK);
			this.tipsTxt.text = "活动期间打造神兵可享折扣优惠。打造次数越多，折扣力度越大。";
			IconUtil.setImg1(Enum_Path.PIC_URL + "shenbingzhekou.jpg", this.bgImg);
			for (let key in Config.sbzk_281) {
				let cfg: Isbzk_281 = Config.sbzk_281[key];
				this.datas.push(Config.sbzk_281[key]);
				let arr = JSON.parse(cfg.time);
				if (this["num" + (Number(key) - 1)]) {
					this["num" + (Number(key) - 1)].text = arr[0][0] + "次";
				}
				this._maxCount = arr[0][0];
			}
			this.goBtn.text = "前往打造";
			this.disGroup0.visible = true;
		} else {
			GGlobal.modelActivity.CG_OPENACT(UIConst.ACTCOM_SJZK);
			this.tipsTxt.text = "活动期间神将阁寻宝可享折扣优惠，寻宝次数越多，折扣力度越大";
			IconUtil.setImg1(Enum_Path.PIC_URL + "shenjiangzhekou.jpg", this.bgImg);
			for (let key in Config.herooff_287) {
				let cfg: Iherooff_287 = Config.herooff_287[key];
				this.datas.push(Config.herooff_287[key]);
				let arr = JSON.parse(cfg.time);
				if (this["num" + (Number(key) - 1)]) {
					this["num" + (Number(key) - 1)].text = arr[0][0] + "次";
				}
				this._maxCount = arr[0][0];
			}
			this.goBtn.text = "前往寻宝";
			this.disGroup1.visible = true;
		}
		this.show();
		this.y = 264;
	}

	closePanel(pData?: any) {
		IconUtil.setImg1(null, this.bgImg);
		this.disposePanel();
	}

	dispose() {
		this.disposePanel();
		super.dispose()
	}

	private disposePanel() {
		let self = this;
		self.goBtn.removeClickListener(self.onGoto, self)
		Timer.instance.remove(self.onUpdate, self);
		GGlobal.control.remove(UIConst.ACTCOM_SBZK, self.updateView, self);
		GGlobal.control.remove(UIConst.ACTCOM_SJZK, self.updateView, self);
	}

	private show() {
		let self = this;
		self.goBtn.addClickListener(self.onGoto, self);
		Timer.instance.listen(self.onUpdate, self);
		GGlobal.control.listen(UIConst.ACTCOM_SBZK, self.updateView, self);
		self._act = this._vo;
		// if (this._vo.id == UIConst.ACTCOM_SBZK) {
		// 	self._act = GGlobal.modelActivity.get(UIConst.ACTCOM, UIConst.ACTCOM_SBZK);
		// } else {
		// 	self._act = GGlobal.modelActivity.get(UIConst.ACTCOM, UIConst.ACTCOM_SJZK);
		// }
		GGlobal.control.listen(UIConst.ACTCOM_SJZK, self.updateView, self);
	}

	/**
	 * 更新页面数据
	 */
	private updateView() {
		let self = this;
		let index: number = 0;
		let curCfg;
		let len: number = self.datas.length;
		let arr;
		self.expbar.max = 100;
		let count: number = 0;
		if (this._vo.id == UIConst.ACTCOM_SBZK) {
			count = GGlobal.model_actCom.forgeNum;
		} else {
			count = GGlobal.model_actCom.treasure;
		}
		if (count >= self._maxCount) {
			self.expbar.value = 100;
			self.expbar._titleObject.text = "max";
			return;
		}
		for (let i = 0; i < len; i++) {
			let cfg: any = self.datas[i];
			arr = JSON.parse(cfg.time);
			if (count <= arr[0][0]) {
				index = i;
				curCfg = cfg;
				break;
			}
		}
		if (count <= 0) {
			self.expbar.value = 0;
		} else {
			// self.expbar.value = (25 * index) * (count / arr[0][0]);
			arr = JSON.parse(curCfg.time);
			let lastCfg = self.datas[index - 1];
			let arr1 = JSON.parse(lastCfg.time);
			self.expbar.value = 25 * (index - 1) + 25 * ((count - arr1[0][0]) / (arr[0][0] - arr1[0][0]));
		}
		self.expbar._titleObject.text = count + "/" + self._maxCount;
	}

	private onUpdate() {
		const end = this._act ? this._act.end : 0;
		const servTime = Model_GlobalMsg.getServerTime() / 1000 >> 0;
		if (end - servTime > 0) {
			this.labTime.text = "剩余时间：<font color='#15f234'>" + DateUtil.getMSBySecond4(end - servTime) + "</font>";
		} else {
			this.labTime.text = "00:00:00";
		}
	}

	/**
	 * 前往按钮
	 */
	private onGoto() {
		if (this._vo.id == UIConst.ACTCOM_SBZK) {
			GGlobal.layerMgr.open(UIConst.ZS_GODWEAPON_DUANZAO);
		} else {
			GGlobal.layerMgr.open(UIConst.CANGBAOGE);
		}
	}

}