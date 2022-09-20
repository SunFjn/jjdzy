class ViewSYZLBCtBuy extends UIModalPanel {

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

	public static URL: string = "ui://jvxpx9emqrc53bf";

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
	private maxCount: number = 0;
	private lastCount: number = 0;
	private count: number = 0;
	private cost: number;

	public onOK: Handler;
	public onCancel: Handler;
	public onCloseFun: Handler;

	public onShown() {
		var arg = this._args;
		this.lastCount = arg.last;
		this.cost = arg.cost;
		this.maxCount = arg.max;
		this.count = 1;
		this.onOK = arg.onOK;
		this.onCancel = arg.onCancel;
		this.onCloseFun = arg.onClose;
		this.back.text = arg.title;
		this.btnOk.text = arg.oktext;
		this.btnCancel.text = arg.canceltext;
		if (arg.text) {
			this.lb.text = arg.text;
		} else {
			let color = this.lastCount == 0 ? Color.REDSTR : Color.GREENSTR
			this.lb.text = "今日剩余购买次数：<font color='" + color + "'>" + this.lastCount + "</font>";
		}
		this.onUpCount();
	}

	protected onHide(): void {
		GGlobal.layerMgr.close(UIConst.SYZLB_CTBUY);
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
		let cost = this.cost * this.count
		if (Model_player.voMine.yuanbao < cost) {
			ModelChongZhi.guideToRecharge()
			// return;
		}else if(this.count > this.lastCount){
			ViewCommonWarn.text("购买次数已满")
			return;
		}else if(this.count > this.maxCount){
			ViewCommonWarn.text("购买次数已满")
			return;
		}else {
			if (this.onOK) this.onOK.runWith(this.count);
		}
		this.closeHandler();
	}

	public onCancelT() {
		if (this.onCancel) this.onCancel.run();
		this.closeHandler();
	}
	/** cost 花费，last剩余购买次数， max最大购买次数*/
	public static show(cost, last: number = 1, max: number = 1, text: string = "", onOK: Handler, cancel: Handler = null, oktext = "确定", canceltext = "取消") {
		var arg = { cost:cost, last: last, max: max, text: text, onOK: onOK, onCancel: cancel, oktext: oktext, canceltext: canceltext };
		if (!GGlobal.layerMgr.isOpenView(UIConst.SYZLB_CTBUY)) {
			GGlobal.layerMgr.open(UIConst.SYZLB_CTBUY, arg);
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

	private onUpAdd(c):void{
		if(this.maxCount == 0){
			ViewCommonWarn.text("购买次数已满")
			return;
		}
		if(this.maxCount > this.lastCount){
			if(c > this.lastCount){
				c = this.lastCount;
				if(c == this.count){//第一次增加不会显示错误提示
					ViewCommonWarn.text("购买次数已满")
				}
			}
		}else{
			if (c > this.maxCount) {
				c = this.maxCount;
				if(c == this.count){
					ViewCommonWarn.text("购买次数已满")
				}
			}
		}
		if (c <= 0) {
			c = 1;
		}
		this.count = c
		this.onUpCount();
	}

	private onUpCount():void{
		this.lbCount.text = "" + this.count;
		let m = GGlobal.model_Syzlb
		let cost = 0
		for(let i = 0; i< this.count; i++){
			let v = Config.sycs_762[m.batBuy + 1 + i]
			if(v){
				cost += Number(JSON.parse(v.xh)[0][2]);
			}
			
		}
		this.lbCost.text = "" + cost
		if(Model_player.voMine.yuanbao < cost){
			this.lbCost.color = Color.REDINT
		}else{
			this.lbCost.color = Color.GREENINT
		}
	}

}