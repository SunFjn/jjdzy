class ViewYiShouBossBuy extends UIModalPanel {

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
	count = 0;
	maxCount = 0;
	public onShown() {
		let self = this;
		self.count = 1;
		self.maxCount = ModelYiShouBOSS.geMax_buy() - GGlobal.modelYiShouBOSS.hasBuyCount;
		self.lb.text = "今日剩余购买次数：<font color='" + Color.GREENSTR + "'>" + self.maxCount + "</font>";
		self.onUpCount();
	}

	protected onHide(): void {
		GGlobal.layerMgr.close(UIConst.YSBOSSBUY);
	}

	protected closeHandler() {
		this.doHideAnimation();
	}

	public onClose() {
		this.closeHandler();
	}

	getTotalCost = (): number => {
		let cfg = Config.yscs_759;
		let start = GGlobal.modelYiShouBOSS.hasBuyCount + 1;
		let max = ModelYiShouBOSS.geMax_buy();
		let end = this.count + GGlobal.modelYiShouBOSS.hasBuyCount;
		end = end >= max ? max : end;
		let yb = 0;
		for (let i = start; i <= end; i++) {
			yb += JSON.parse(cfg[i].xh)[0][2];
		}
		return yb;
	}

	onOKT = () => {
		let cost = this.getTotalCost();
		if (Model_player.voMine.yuanbao < cost) {
			ModelChongZhi.guideToRecharge()
			GGlobal.layerMgr.close2(UIConst.YSBOSSBUY);
			return;
		} else if (this.count > this.maxCount) {
			ViewCommonWarn.text("购买次数已满")
			return;
		} else {
			GGlobal.modelYiShouBOSS.CG_SpecialAnimalBoss_BUY_9445(this.count);
		}
		this.closeHandler();
	}

	public onCancelT() {
		this.closeHandler();
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
		if (c > this.maxCount) {
			c = this.maxCount;
			if (c == this.count) {
				ViewCommonWarn.text("购买次数已满")
			}
		}
		if (c <= 0) {
			c = 1;
		}
		this.count = c
		this.onUpCount();
	}

	private onUpCount(): void {
		this.lbCount.text = "" + this.count;
		let cost = this.getTotalCost();
		this.lbCost.text = "" + cost
		if (Model_player.voMine.yuanbao < cost) {
			this.lbCost.color = Color.REDINT
		} else {
			this.lbCost.color = Color.GREENINT
		}
	}
}