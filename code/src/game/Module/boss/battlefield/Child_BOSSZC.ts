/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class Child_BOSSZC extends fairygui.GComponent implements IPanel {
	//>>>>start
	public c1: fairygui.Controller;
	public list: fairygui.GList;
	public imageSelect1: fairygui.GImage;
	public imageSelect2: fairygui.GImage;
	public btnShop: Button2;
	public lbDes: fairygui.GRichTextField;
	public lbNextTime: fairygui.GRichTextField;
	public lbRefreshTime: fairygui.GRichTextField;
	//>>>>end

	public static URL: string = "ui://47jfyc6eppyw31";

	public static createInstance(): Child_BOSSZC {
		return <Child_BOSSZC><any>(fairygui.UIPackage.createObject("Boss", "Child_BOSSZC"));
	}

	public constructor() {
		super();
	}

	protected _viewParent: fairygui.GObject;
	initView(pParent: fairygui.GObject) {
		this._viewParent = pParent;
		this.addRelation(this._viewParent, fairygui.RelationType.Size);
	}

	openPanel(pData?: any) {
		this.open();
	}

	closePanel(pData?: any) {
		this.close();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let self = this;
		CommonManager.parseChildren(self, self);
		self.list.callbackThisObj = self;
		self.list.itemRenderer = this.itemRender;
		self.list.setVirtual();
		self.tabArrBG = ["", self.imageSelect1, self.imageSelect2];
		for (let i = 1; i < 3; i++) {
			self.tabArrBG[i].visible = false;
		}
	}

	private itemRender(idx, obj) {
		let item: BossZCItem = obj as BossZCItem;
		item.setdata(this._dta[idx], this.c1.selectedIndex + 1);
	}

	private _lstIndex = 0;//和类型对应上 1本服 2跨服
	private tabArr = [];
	private tabArrBG = [];
	private _dta = [];
	private changeHD() {
		let m = GGlobal.modelBossZc;
		var idx = this.c1.selectedIndex + 1;
		let arr = [0, UIConst.BOSS_BATTLEFIELD_LOCAL, UIConst.BOSS_BATTLEFIELD_CROSS];
		if (!ModuleManager.isOpen(arr[idx], true)) {
			this.c1.selectedIndex = 0;
			return;
		}
		this._lstIndex = idx
		for (let i = 1; i < 3; i++) {
			this.tabArrBG[i].visible = i == idx;
		}
		GGlobal.modelBossZc.CGopenUI(idx);
	}

	private update() {
		let m = GGlobal.modelBossZc;
		var idx = this.c1.selectedIndex + 1;
		if (idx == Model_BossZC.LOCAL) {
			this._dta = m.local_dta;
		} else {
			this._dta = m.cross_dta;
		}
		this.list.numItems = this._dta.length;
	}

	/**前后端数据不一致时，最后一次更新数据时间*/
	_lastReqTime = 0;
	private updateX() {
		let len = this._dta.length;;
		let max = this.list.numChildren;
		for (var i = 0; i < len; i++) {
			if (i < max) {
				let item = this.list.getChildAt(i) as BossZCItem;
				item.updateX();
			}
		}
		let now = egret.getTimer();
		if (Model_BossZC.data_valid == 1 && now - this._lastReqTime > 1000) {
			this._lastReqTime = now;
			var idx = this.c1.selectedIndex + 1;
			GGlobal.modelBossZc.CGopenUI(idx);
			// DEBUGWARING.log("BOSS战场  数据已过期， 请求最新数据");
			Model_BossZC.data_valid = 0;
		}
		let lib = Config.bosszc_010;
		let cfg;
		for (let i in lib) {
			cfg = lib[i];
			break;
		}
		let ms = Model_GlobalMsg.getServerTime();
		let nowDate = new Date(ms);
		let nowMin = nowDate.getMinutes();
		let nowSec = nowDate.getSeconds();
		let h = nowDate.getHours();
		let dates = JSON.parse(cfg.shuaxin2);
		let ii = dates.length;
		let date = "0:00"
		let sec = 0;
		for (let j = 0; j < ii; j++) {
			let tp = dates[j];
			let ch = tp[0];
			let cm = tp[1];
			if (h == ch && nowMin < cm) {
				date = dates[j];
				sec = (cm - nowMin) * 60;
				break;
			} else if (h < ch) {
				date = dates[j];
				sec = ((ch - h) * 60 + cm - nowMin) * 60;
				break;
			}
			if (j == ii - 1) {
				date = dates[0];
				ch = dates[0][0];
				cm = dates[0][1];
				sec = ((24 - h + ch) * 60 + cm - nowMin) * 60;
				break;
			}
		}
		sec -= nowSec;
		let nextTime = BroadCastManager.reTxt("{0}点{1}分", date[0], date[1]);
		let nextFresh = DateUtil.getHMSBySecond2(sec);
		this.lbNextTime.text = BroadCastManager.reTxt("<font color='{0}'>BOSS刷新时间：</font>{1}", Color.GREENSTR, nextTime);
		this.lbRefreshTime.text = BroadCastManager.reTxt("<font color='{0}'>BOSS刷新倒计时：</font>{1}", Color.GREENSTR, nextFresh);
	}

	private openShop() {
		GGlobal.layerMgr.open(UIConst.BOSSZC_SHOP);
	}

	private openDesc(e) {
		GGlobal.layerMgr.open(UIConst.WFSM_PANEL, UIConst.BOSS_BATTLEFIELD_LOCAL);
	}

	public open() {
		let s = this;
		s.update();
		this.c1.selectedIndex = GGlobal.modelBossZc.sceneType - 1;
		s.changeHD();
		s.c1.addEventListener(fairygui.StateChangeEvent.CHANGED, s.changeHD, s);
		// GGlobal.modelBossZc.CGopenUI(Model_BossZC.LOCAL);
		GGlobal.control.listen(Enum_MsgType.BOSSZC_OPEN, s.update, s);
		Timer.instance.listen(s.updateX, s, 1000);
		s.btnShop.checkNotice = GGlobal.reddot.checkCondition(UIConst.SHOP);
		s.btnShop.addClickListener(this.openShop, this);
		s.lbDes.addClickListener(this.openDesc, this);
	}


	public close() {
		let s = this;
		s._lstIndex = 0;
		s.list.numItems = 0;
		Timer.instance.remove(s.updateX, s);
		s.btnShop.removeClickListener(s.openShop, s);
		s.lbDes.removeClickListener(s.openDesc, s);
		GGlobal.control.remove(Enum_MsgType.BOSSZC_OPEN, s.update, s);
		s.c1.removeEventListener(fairygui.StateChangeEvent.CHANGED, s.changeHD, s);
	}
}