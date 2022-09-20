class ActCom_DBCZItem extends fairygui.GComponent {

	public lab: fairygui.GRichTextField;
	public list: fairygui.GList;
	public btnGet: Button1;
	public imgGet: fairygui.GImage;
	public btnRec: Button0;
	public labCount: fairygui.GRichTextField;
	public static URL: string = "ui://ncy51skvglz71";

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let self = this;
		CommonManager.parseChildren(self, self)
		self.list.itemRenderer = self.renderHandle;
		self.list.callbackThisObj = self;
	}

	private _listData: Array<IGridImpl>
	private _vo: Vo_HuoDong;
	private _hid: number;
	private _status: number;
	private _index: number;
	public setVo(v: Vo_HuoDong, hid: number) {
		let self = this;
		self._vo = v;
		self._hid = hid;
		var colorStr;
		self.labCount.text = "";
		self._listData = null
		var cfgCls = Model_HuoD814.getCfg814(hid)
		var cfg = cfgCls[v.id];
		if (self._hid == UIConst.HUODONG_DAILY_GIFT814) {
			let type = v.id % 1000;
			if (type == 1) {
				self.lab.text = "今日可领取"
			} else if (type == 2) {
				self.lab.text = "VIP" + ConfigHelp.getSystemNum(2003) + "可额外领取"
			} else if (type == 3) {
				self.lab.text = "充值任意金额可额外领取"
			} else if (type == 4) {
				self.lab.text = "至尊卡可额外领取"
			}
			self._status = v.status;
			self._listData = ConfigHelp.makeItemListArr(ConfigHelp.SplitStr((cfg as Idlhl3_732).reward))

		}
		else if (self._hid == UIConst.HUODONG_DAILY_ONE814) {
			self._status = v ? v.getStaCt((cfg as Idbcz3_733).cs) : 0;
			self.labCount.text = "可充值领奖次数:" + (cfg.cs - v.canCt);
			self._listData = ConfigHelp.makeItemListArr(ConfigHelp.SplitStr(cfg.jl))

			if (self._status == 0) {
				colorStr = Color.REDSTR
				self.lab.text = "单笔充值" + cfg.je + "元，可领取<font color='" + colorStr + "'>（0/" + cfg.je + "）</font>"
			} else {
				colorStr = Color.GREENSTR
				self.lab.text = "单笔充值" + cfg.je + "元，可领取<font color='" + colorStr + "'>（" + cfg.je + "/" + cfg.je + "）</font>"
			}
		} else if (self._hid == UIConst.HUODONG_ADD_RECHARGE814) {
			colorStr = Model_HuoD814.addRecharge >= (cfg as Ileichong3_725).coin ? Color.GREENSTR : Color.REDSTR;
			self.lab.text = "累计充值达到" + cfg.coin + "元，可领取：<font color='" + colorStr + "'>（" + Model_HuoD814.addRecharge + "/" + cfg.coin + "）</font>"
			self._status = v ? v.status : 0
			self._listData = ConfigHelp.makeItemListArr(ConfigHelp.SplitStr(cfg.reward))

		} else if (self._hid == UIConst.HUODONG_DAILY_ADDUP814) {
			colorStr = Model_HuoD814.dailyAddUp >= (cfg as Idrlc3_734).coin ? Color.GREENSTR : Color.REDSTR;
			self.lab.text = "累计充值达到" + cfg.coin + "元，可领取：<font color='" + colorStr + "'>（" + Model_HuoD814.dailyAddUp + "/" + cfg.coin + "）</font>"
			self._status = v ? v.status : 0
			self._listData = ConfigHelp.makeItemListArr(ConfigHelp.SplitStr(cfg.reward))
		}

		if (self._status == 0) {//前往充值
			self.btnGet.touchable = self.btnGet.visible = false;
			self.btnRec.touchable = self.btnRec.visible = true;
			self.imgGet.visible = false
		} else if (self._status == 1) {//领取
			self.btnGet.checkNotice = self.btnGet.touchable = self.btnGet.visible = true;
			self.btnRec.touchable = self.btnRec.visible = false;
			self.imgGet.visible = false
		} else if (self._status == 2) {//已领取
			self.btnGet.touchable = self.btnGet.visible = false;
			self.btnRec.touchable = self.btnRec.visible = false;
			self.imgGet.visible = true
		} else {
			self.btnGet.touchable = self.btnGet.visible = false;
			self.btnRec.touchable = self.btnRec.visible = false;
			self.imgGet.visible = false
		}
		//奖励显示
		self.list.numItems = self._listData ? self._listData.length : 0;
		self.btnGet.addClickListener(self.onClickGet, self);
		self.btnRec.addClickListener(self.onClickRec, self);
	}

	private renderHandle(index: number, obj: fairygui.GComponent): void {
		var item: ViewGrid = obj as ViewGrid;
		item.tipEnabled = true;
		item.isShowEff = true;
		item.vo = this._listData[index];
	}

	private onClickGet(): void {
		let self = this;
		if (self._status == 0) {
			ViewCommonWarn.text("领取条件不足")
			return;
		}
		if (self._hid == UIConst.HUODONG_DAILY_GIFT814) {
			GGlobal.modelHuoD814.CG_DAILYGIFT_GET(self._vo.id % 1000);
		} else if (self._hid == UIConst.HUODONG_DAILY_ONE814) {
			GGlobal.modelHuoD814.CG_DAILYONE_GET(self._vo.id);
		} else if (self._hid == UIConst.HUODONG_ADD_RECHARGE814) {
			GGlobal.modelHuoD814.CG_ADDRECHARGE_GET(self._vo.id);
		} else if (self._hid == UIConst.HUODONG_DAILY_ADDUP814) {
			GGlobal.modelHuoD814.CG_DAILYADDUP_GET(self._vo.id);
		}
	}

	private onClickRec(): void {
		ViewChongZhi.tryToOpenCZ();
	}

	public clean() {
		super.clean();
		let self = this;
		self.list.numItems = 0;
		self.btnGet.removeClickListener(self.onClickGet, self);
		self.btnRec.removeClickListener(self.onClickRec, self);
	}
}