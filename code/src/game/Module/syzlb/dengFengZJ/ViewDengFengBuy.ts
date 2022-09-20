class ViewDengFengBuy extends UIModalPanel {

	public back: fairygui.GImage;
	public lb: fairygui.GRichTextField;
	public btnCancel: Button0;
	public btnOk: Button1;
	public lbTitle: fairygui.GTextField;
	public btnMin: Button2;
	public btnReduce: Button2;
	public btnAdd: Button2;
	public lbCount: fairygui.GTextField;
	public btnMax: Button2;
	public groupUse: fairygui.GGroup;
	public lbTotal: fairygui.GRichTextField;
	public lbCost: fairygui.GRichTextField;

	public constructor() {
		super();
		this.childrenCreated();
	}

	protected childrenCreated(): void {
		this.view = GGlobal.commonpkg.createObject("ViewAlertBuy").asCom;
		this.contentPane = this.view;

		this.lbTitle = <fairygui.GTextField><any>(this.view.getChild("lbTitle"));
		this.btnMin = <Button2><any>(this.view.getChild("btnMin"));
		this.btnReduce = <Button2><any>(this.view.getChild("btnReduce"));
		this.btnAdd = <Button2><any>(this.view.getChild("btnAdd"));
		this.lbCount = <fairygui.GTextField><any>(this.view.getChild("lbCount"));
		this.btnMax = <Button2><any>(this.view.getChild("btnMax"));
		this.groupUse = <fairygui.GGroup><any>(this.view.getChild("groupUse"));
		this.lbTotal = <fairygui.GRichTextField><any>(this.view.getChild("lbTotal"));
		this.lbCost = <fairygui.GRichTextField><any>(this.view.getChild("lbCost"));
		this.back = <fairygui.GImage><any>(this.view.getChild("back"));
		this.lb = <fairygui.GRichTextField><any>(this.view.getChild("lb"));
		this.btnCancel = <Button0><any>(this.view.getChild("btnCancel"));
		this.btnOk = <Button1><any>(this.view.getChild("btnOk"));
		super.childrenCreated();
		this.btnOk.addClickListener(this.onOKT, this);
		this.btnCancel.addClickListener(this.onCancelT, this);
		this.btnMin.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onMinCountHandler, this);
		this.btnMax.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onMaxCountHandler, this);
		this.btnReduce.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onReduceHandler, this);
		this.btnAdd.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onAddHandler, this);
	}
	private maxBuy: number = 100;
	private hasBuy: number = 0;
	private count: number = 0;

	public onOK: Handler;
	public onCancel: Handler;
	public onCloseFun: Handler;

	private cfg: any

	public onShown() {
		let s = this;
		var arg = this._args;
		s.hasBuy = arg.hasBuy;
		// s.maxBuy = arg.maxBuy;
		s.cfg = arg.cfg;
		s.count = 1;
		s.onOK = arg.onOK;
		s.onCancel = arg.onCancel;
		s.onCloseFun = arg.onClose;
		s.back.text = arg.title;
		s.btnOk.text = arg.oktext;
		s.btnCancel.text = arg.canceltext;
		s.getCfgMax();
		// let lastCt = s.maxBuy - s.hasBuy
		// let color = lastCt == 0 ? Color.REDSTR :
		this.lb.text = "单次购买上限：<font color='" + Color.GREENSTR + "'>" + s.maxBuy + "</font>";
		this.onUpCount();
	}

	protected onHide(): void {
		GGlobal.layerMgr.close(UIConst.ALERT_BUY);
	}

	protected closeHandler() {
		this.doHideAnimation();
		this.onOK = null;
		this.onCancel = null;
	}

	public onClose() {
		if (this.onCloseFun) this.onCloseFun.run();
		this.closeHandler();
	}

	public onOKT() {
		let cost = Number(this.lbCost.text)
		if (Model_player.voMine.yuanbao < cost) {
			ModelChongZhi.guideToRecharge(new Handler(this, this.closeHandler))
			return;
		}
		if (this.count > this.maxBuy) {
			ViewCommonWarn.text("购买次数已满")
			return;
		}
		if (this.onOK) this.onOK.runWith(this.count);
		this.closeHandler();
	}

	public onCancelT() {
		if (this.onCancel) this.onCancel.run();
		this.closeHandler();
	}
	/** hasBuy已购买次数， max最大购买次数 cfg 海选或决赛的配置*/
	public static show(hasBuy: number = 1, cfg: any, onOK: Handler, cancel: Handler = null, oktext = "确定", canceltext = "取消") {
		var arg = { hasBuy: hasBuy, cfg: cfg, onOK: onOK, onCancel: cancel, oktext: oktext, canceltext: canceltext };
		if (!GGlobal.layerMgr.isOpenView(UIConst.DENG_FENG_BUY)) {
			GGlobal.layerMgr.open(UIConst.DENG_FENG_BUY, arg);
		}
	}


	private onMinCountHandler(event: egret.TouchEvent): void {
		this.count -= 10;
		if (this.count <= 0) {
			this.count = 1;
		}
		this.onUpCount();
	}

	private onReduceHandler(event: egret.TouchEvent): void {
		this.count--;
		if (this.count <= 0) {
			this.count = 1;
		}
		this.onUpCount();
	}

	private onMaxCountHandler(event: egret.TouchEvent): void {
		let c = this.count + 10;
		this.onUpAdd(c)
	}

	private onAddHandler(event: egret.TouchEvent): void {
		let c = this.count + 1
		this.onUpAdd(c)
	}

	private onUpAdd(c): void {
		if (c > this.maxBuy) {
			c = this.maxBuy;
			ViewCommonWarn.text("购买次数已满")
		}
		if (c <= 0) {
			c = 1;
		}
		this.count = c
		this.onUpCount();
	}

	private onUpCount(): void {
		let s = this;
		s.lbCount.text = "" + s.count;
		let addCost = 0;
		if (s.hasBuy >= s._cfgMaxCt) {
			addCost += s.count * s._cfgMaxCost
		} else {
			let len = s._cfgMaxCt - s.hasBuy
			let size = len > s.count ? s.count : len;
			for (let i = 0; i < size; i++) {
				let cfg = this.cfg[s.hasBuy + 1 + i];
				if (!cfg) {
					break;
				}
				addCost += Number(JSON.parse(cfg.consume)[0][2]);
			}
			if (s.count > len) {
				addCost += (s.count - len) * s._cfgMaxCost
			}
		}

		this.lbCost.text = "" + addCost
		if (Model_player.voMine.yuanbao < addCost) {
			this.lbCost.color = Color.REDINT
		} else {
			this.lbCost.color = Color.GREENINT
		}
	}

	private _cfgMaxCt;
	private _cfgMaxCost;
	private getCfgMax() {
		let s = this;
		s._cfgMaxCt = 0;
		for (let key in s.cfg) {
			s._cfgMaxCt++;
		}
		s._cfgMaxCost = Number(JSON.parse(s.cfg[s._cfgMaxCt].consume)[0][2]);
	}
}