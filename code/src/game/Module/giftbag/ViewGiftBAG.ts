/** s is an automatically generated class by FairyGUI. Please do not modify it. **/
class ViewGiftBAG extends UIModalPanel {

	public n3: fairygui.GImage;
	public btnMin: fairygui.GButton;
	public btnReduce: fairygui.GButton;
	public n6: fairygui.GImage;
	public btnAdd: fairygui.GButton;
	public lbCount: fairygui.GTextField;
	public btnMax: fairygui.GButton;
	public btnUse: fairygui.GButton;
	public n14: fairygui.GRichTextField;
	public n16: fairygui.GList;

	public static URL: string = "ui://0z9qzd94y1c10";

	public static createInstance(): ViewGiftBAG {
		return <ViewGiftBAG><any>(fairygui.UIPackage.createObject("giftBag", "ViewGiftBAG"));
	}

	public constructor() {
		super();
		fairygui.UIObjectFactory.setPackageItemExtension(ItemGiftBag.URL, ItemGiftBag);
		this.loadRes("giftBag", "giftBag_atlas0");
	}

	protected childrenCreated(): void {
		GGlobal.createPack("giftBag");
		let s = this;
		s.view = fairygui.UIPackage.createObject("giftBag", "ViewGiftBAG").asCom;
		s.contentPane = s.view;

		s.n3 = <fairygui.GImage><any>(s.view.getChild("n3"));
		s.btnMin = <fairygui.GButton><any>(s.view.getChild("btnMin"));
		s.btnReduce = <fairygui.GButton><any>(s.view.getChild("btnReduce"));
		s.n6 = <fairygui.GImage><any>(s.view.getChild("n6"));
		s.btnAdd = <fairygui.GButton><any>(s.view.getChild("btnAdd"));
		s.lbCount = <fairygui.GTextField><any>(s.view.getChild("lbCount"));
		s.btnMax = <fairygui.GButton><any>(s.view.getChild("btnMax"));
		s.btnUse = <fairygui.GButton><any>(s.view.getChild("btnUse"));
		s.n14 = <fairygui.GRichTextField><any>(s.view.getChild("n14"));
		s.n16 = <fairygui.GList><any>(s.view.getChild("n16"));

		s.n16.callbackThisObj = s;
		s.n16.itemRenderer = s.itemRender;
		s.n16.setVirtual();
		super.childrenCreated();
	}

	protected count;
	public index;
	protected listDta;
	private curItem: ItemGiftBag;
	protected currentVo: VoItem;
	private onSendUseHandler(event: egret.TouchEvent): void {
		let s = this;
		if(s.index < 0){
			ViewCommonWarn.text("请选择一种奖励");
			return;
		}
		GGlobal.modelBag.CG_BAG_ITEM_SELECT_USE(s.currentVo.id, s.count, s.index);
		// TipManager.hide();
		GGlobal.control.listen(Enum_MsgType.MSG_BAG_VO_UPDATE, s.update, s);
	}

	private onMinCountHandler(event: egret.TouchEvent): void {
		this.count -= 10;
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
		if (this.count > Model_Bag.CONST_MAX_MUL_USE_NUM) {
			this.count = Model_Bag.CONST_MAX_MUL_USE_NUM;
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
		if (maxCount > Model_Bag.CONST_MAX_MUL_USE_NUM) {
			maxCount = Model_Bag.CONST_MAX_MUL_USE_NUM;
		}
		if (this.count < maxCount) {
			this.count++;
			this.lbCount.text = "" + this.count;
		}
	}

	private itemRender(idx, obj){
		let item:ItemGiftBag = obj as ItemGiftBag;
		item.setDta(this.listDta[idx]);
	}

	private itemClickHandle(event: fairygui.ItemEvent): void {
		var self = this;
		var item: ItemGiftBag = event.itemObject as ItemGiftBag;
		this.index = item.index;
		if (self.curItem) self.curItem.setChoose(false);
		self.curItem = item;
		self.curItem.setChoose(true);
	}

	private show(obj: any): void {
		this.currentVo = obj;
		var vo: VoItem = obj;
		this.frame.text = vo.name;
		var count = Model_Bag.getItemCount(vo.id);
		this.listDta = JSON.parse(vo.cfg.reward);
		this.n16.numItems = this.listDta.length;
		if (count > 0) {
			this.count = count;
		} else {
			this.count = 1;
		}
		this.lbCount.text = "" + this.count;
	}

	private update(): void {
		let s = this;
		var count = Model_Bag.getItemCount(s.currentVo.id);
		if (count == 0) {
			s.closeEventHandler(null);
		} else {
			s.show(this.currentVo)
		}
		// GGlobal.control.remove(Enum_MsgType.MSG_BAG_VO_UPDATE, s.update, s);
	}

	protected onShown() {
		let s  = this;
		GGlobal.control.listen(Enum_MsgType.COMMON_WINFAIL_CLOSE, s.closeEventHandler, s);
		s.btnUse.addEventListener(egret.TouchEvent.TOUCH_TAP, s.onSendUseHandler, s);
		s.btnMin.addEventListener(egret.TouchEvent.TOUCH_TAP, s.onMinCountHandler, s);
		s.btnMax.addEventListener(egret.TouchEvent.TOUCH_TAP, s.onMaxCountHandler, s);
		s.btnReduce.addEventListener(egret.TouchEvent.TOUCH_TAP, s.onReduceHandler, s);
		s.btnAdd.addEventListener(egret.TouchEvent.TOUCH_TAP, s.onAddHandler, s);
		// GGlobal.control.listen(Enum_MsgType.MSG_BAG_VO_UPDATE, s.update, s);
		s.n16.addEventListener(fairygui.ItemEvent.CLICK, s.itemClickHandle, s);
		this.show(this._args)
	}

	protected onHide(): void {
		let s  = this;
		GGlobal.control.remove(Enum_MsgType.COMMON_WINFAIL_CLOSE, s.closeEventHandler, s);
		s.btnUse.removeEventListener(egret.TouchEvent.TOUCH_TAP, s.onSendUseHandler, s);
		s.btnMin.removeEventListener(egret.TouchEvent.TOUCH_TAP, s.onMinCountHandler, s);
		s.btnMax.removeEventListener(egret.TouchEvent.TOUCH_TAP, s.onMaxCountHandler, s);
		s.btnReduce.removeEventListener(egret.TouchEvent.TOUCH_TAP, s.onReduceHandler, s);
		s.btnAdd.removeEventListener(egret.TouchEvent.TOUCH_TAP, s.onAddHandler, s);
		GGlobal.control.remove(Enum_MsgType.MSG_BAG_VO_UPDATE, s.update, s);
		s.n16.removeEventListener(fairygui.ItemEvent.CLICK, s.itemClickHandle, s);
		GGlobal.layerMgr.close(UIConst.GIFTBAG_USE);
		s.n16.numItems = 0;
		s.index = -1;
	}

	public onOpen(arg) {
		super.onOpen(arg);
		if (this.isInit) {
			this.show(this._args)
		}
	}
}