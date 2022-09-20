class View_XuTian_Buy extends UIModalPanel {

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
	private maxBuy: number = 0;
	private hasBuy: number = 0;
	private count: number = 0;

	public onOK: Handler;
	public onCancel: Handler;
	public onCloseFun: Handler;

	public onShown() {
		let s = this;
		var arg = this._args;
		s.hasBuy = arg.hasBuy;
		s.maxBuy = arg.maxBuy;
		s.count = 1;
		s.onOK = arg.onOK;
		s.onCancel = arg.onCancel;
		s.onCloseFun = arg.onClose;
		s.back.text = arg.title;
		s.btnOk.text = arg.oktext;
		s.btnCancel.text = arg.canceltext;
		let lastCt = s.maxBuy - s.hasBuy
		let color = lastCt == 0 ? Color.REDSTR : Color.GREENSTR
		this.lb.text = "今日剩余购买次数：<font color='" + color + "'>" + lastCt + "</font>";
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
		if (this.hasBuy + this.count > this.maxBuy) {
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
	/** cost 花费，hasBuy已购买次数， max最大购买次数*/
	public static show(hasBuy: number = 1, maxBuy: number = 1, onOK: Handler, cancel: Handler = null, oktext = "确定", canceltext = "取消") {
		var arg = { hasBuy: hasBuy, maxBuy: maxBuy, onOK: onOK, onCancel: cancel, oktext: oktext, canceltext: canceltext };
		if (!GGlobal.layerMgr.isOpenView(UIConst.XU_TIAN_BUY)) {
			GGlobal.layerMgr.open(UIConst.XU_TIAN_BUY, arg);
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
		if (this.hasBuy + c > this.maxBuy) {
			c = this.maxBuy - this.hasBuy;
			ViewCommonWarn.text("购买次数已满")
		}
		if (c <= 0) {
			c = 1;
		}
		this.count = c
		this.onUpCount();
	}

	private onUpCount(): void {
		this.lbCount.text = "" + this.count;
		let addCost = 0;
		for (let i = 0; i < this.count; i++) {
			let cfg = Config.xtwlcs_776[this.hasBuy + 1 + i];
			if (!cfg) {
				break;
			}
			addCost += Number(JSON.parse(cfg.xh)[0][2]);
		}
		this.lbCost.text = "" + addCost
		if (Model_player.voMine.yuanbao < addCost) {
			this.lbCost.color = Color.REDINT
		} else {
			this.lbCost.color = Color.GREENINT
		}
	}

}