class HomeTGLUse extends UIModalPanel {

	public frame: fairygui.GComponent;
	public btnMin: fairygui.GButton;
	public btnReduce: fairygui.GButton;
	public n3: fairygui.GImage;
	public btnAdd: fairygui.GButton;
	public lbCount: fairygui.GRichTextField;
	public btnMax: fairygui.GButton;
	public btnUse: fairygui.GButton;
	public btnM100: fairygui.GButton;
	public btnMax100: fairygui.GButton;
	public groupUse: fairygui.GGroup;
	public lbName: fairygui.GTextField;
	public grid: ViewGrid;
	public lbNum: fairygui.GTextField;

	public static URL: string = "ui://y0plc878c16028";

	public static createInstance(): HomeTGLUse {
		return <HomeTGLUse><any>(fairygui.UIPackage.createObject("home", "HomeTGLUse"));
	}


	public constructor() {
		super();
		this.childrenCreated();
	}

	protected childrenCreated(): void {
		this.view = fairygui.UIPackage.createObject("home", "HomeTGLUse").asCom;
		this.contentPane = this.view;
		CommonManager.parseChildren(this.view, this);
		super.childrenCreated();
	}

	protected onShown() {
		this.btnUse.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSendUseHandler, this);
		this.btnMin.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onMinCountHandler, this);
		this.btnM100.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onMin100CountHandler, this);
		this.btnMax.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onMaxCountHandler, this);
		this.btnMax100.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onMax100CountHandler, this);
		this.btnReduce.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onReduceHandler, this);
		this.btnAdd.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onAddHandler, this);
		GGlobal.control.listen(Enum_MsgType.MSG_BAG_ITME_UPDATE, this.update, this);
		this.show(this._args)
	}

	protected onHide(): void {
		this.grid.showEff(false);
		this.btnUse.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onSendUseHandler, this);
		this.btnMin.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onMinCountHandler, this);
		this.btnMax.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onMaxCountHandler, this);
		this.btnM100.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onMin100CountHandler, this);
		this.btnMax100.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onMax100CountHandler, this);
		this.btnReduce.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onReduceHandler, this);
		this.btnAdd.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onAddHandler, this);
		GGlobal.control.remove(Enum_MsgType.MSG_BAG_ITME_UPDATE, this.update, this);
		GGlobal.layerMgr.close(UIConst.HOME_TGL_ADD);
	}

	private update(): void {
		var count = Model_Bag.getItemCount(this.currentVo.id);
		if (count == 0) {
			this.closeEventHandler(null);
		} else {
			this.show(this.currentVo)
		}
	}

	private show(obj: any): void {
		const self = this;
		self.resize();
		self.currentVo = obj;
		var vo: VoItem = obj;
		var count = Model_Bag.getItemCount(vo.id);
		if (count > 0) {
			self.lbNum.text = "拥有数量：" + count;
		} else {
			self.lbNum.text = "";
		}
		self.grid.vo = vo;
		self.grid.showEff(true);
		self.grid.tipEnabled = false;
		if (count > 0) {
			this.count = count;
		} else {
			this.count = 1;
		}
		this.lbCount.text = "" + this.count;
		this.lbName.text =ConfigHelp.getItemColorName(vo.id);
	}

	private resize(): void {
		this.setXY((fairygui.GRoot.inst.width - this.frame.width) / 2, (fairygui.GRoot.inst.height - this.frame.height) / 2)
	}

	private onSendUseHandler(event: egret.TouchEvent): void {
		let self = this;
		GGlobal.homemodel.selectItemInTianGong(self.currentVo.id, self.count, 1);
		GGlobal.layerMgr.close2(UIConst.HOME_TGL_ADD);
	}

	private onMinCountHandler(event: egret.TouchEvent): void {
		this.count -= 10;
		if (this.count <= 0) {
			this.count = 1;
		}
		this.lbCount.text = "" + this.count;
	}

	private onMin100CountHandler(event: egret.TouchEvent): void {
		this.count -= 100;
		if (this.count <= 0) {
			this.count = 1;
		}
		this.lbCount.text = "" + this.count;
	}

	private onMaxCountHandler(event: egret.TouchEvent): void {
		this.count += 10;
		var bagCount = Model_Bag.getItemCount(this.currentVo.id);
		if (this.count > bagCount) {
			this.count = bagCount;
		}
		this.lbCount.text = "" + this.count;
	}

	private onMax100CountHandler(event: egret.TouchEvent): void {
		this.count += 100;
		var bagCount = Model_Bag.getItemCount(this.currentVo.id);
		if (this.count > bagCount) {
			this.count = bagCount;
		}
		this.lbCount.text = "" + this.count;
	}

	private onReduceHandler(event: egret.TouchEvent): void {
		if (this.count > 1) {
			this.count--;
			this.lbCount.text = "" + this.count;
		}
	}

	private onAddHandler(event: egret.TouchEvent): void {
		var maxCount: number = Model_Bag.getItemCount(this.currentVo.id);
		if (this.count < maxCount) {
			this.count++;
			this.lbCount.text = "" + this.count;
		}
	}

	private currentVo: VoItem;
	private count: number = 0;

}