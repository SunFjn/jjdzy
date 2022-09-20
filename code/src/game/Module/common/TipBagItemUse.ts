class TipBagItemUse extends UIModalPanel {

	public btnMin: Button2;
	public btnReduce: Button2;
	public btnAdd: Button2;
	public lbCount: fairygui.GTextField;
	public btnMax: Button2;
	public btnUse: Button0;
	public groupUse: fairygui.GGroup;
	public childTip: ChildTipBagItem;

	public static URL: string = "ui://jvxpx9em7g6v24";

	public static createInstance(): TipBagItemUse {
		return <TipBagItemUse><any>(fairygui.UIPackage.createObject("common", "TipBagItemUse"));
	}

	public constructor() {
		super();
		this.childrenCreated();
	}

	protected childrenCreated(): void {
		this.view = fairygui.UIPackage.createObject("common", "TipBagItemUse").asCom;
		this.contentPane = this.view;

		this.btnMin = <Button2><any>(this.view.getChild("btnMin"));
		this.btnReduce = <Button2><any>(this.view.getChild("btnReduce"));
		this.btnAdd = <Button2><any>(this.view.getChild("btnAdd"));
		this.lbCount = <fairygui.GTextField><any>(this.view.getChild("lbCount"));
		this.btnMax = <Button2><any>(this.view.getChild("btnMax"));
		this.btnUse = <Button0><any>(this.view.getChild("btnUse"));
		this.groupUse = <fairygui.GGroup><any>(this.view.getChild("groupUse"));
		this.childTip = <ChildTipBagItem><any>(this.view.getChild("childTip"));
		super.childrenCreated();
	}

	protected onShown() {
		GGlobal.control.listen(Enum_MsgType.COMMON_WINFAIL_CLOSE, this.closeEventHandler, this);
		this.btnUse.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSendUseHandler, this);
		this.btnMin.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onMinCountHandler, this);
		this.btnMax.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onMaxCountHandler, this);
		this.btnReduce.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onReduceHandler, this);
		this.btnAdd.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onAddHandler, this);
		this.childTip.lbDes.addEventListener(fairygui.GObject.SIZE_CHANGED, this.resize, this);
		this.childTip.lbSource.addEventListener(fairygui.GObject.SIZE_CHANGED, this.resize, this);
		GGlobal.control.listen(Enum_MsgType.MSG_BAG_ITEM_USE, this.update, this);
	}

	protected onHide(): void {
		GGlobal.control.remove(Enum_MsgType.COMMON_WINFAIL_CLOSE, this.closeEventHandler, this);
		this.btnUse.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onSendUseHandler, this);
		this.btnMin.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onMinCountHandler, this);
		this.btnMax.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onMaxCountHandler, this);
		this.btnReduce.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onReduceHandler, this);
		this.btnAdd.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onAddHandler, this);
		this.childTip.lbDes.removeEventListener(fairygui.GObject.SIZE_CHANGED, this.resize, this);
		this.childTip.lbSource.removeEventListener(fairygui.GObject.SIZE_CHANGED, this.resize, this);
		GGlobal.control.remove(Enum_MsgType.MSG_BAG_ITEM_USE, this.update, this);
		GGlobal.layerMgr.close(UIConst.TIP_BAG_ITEM_USE);
	}

	public onOpen(arg) {
		super.onOpen(arg)
		this.show(arg)
	}

	private update(): void {
		if (this.currentVo.id == 410015) {
			ViewCommonWarn.text("全民BOSS挑战次数+" + this.count)
		}else if (this.currentVo.id == 416016) {
			ViewCommonWarn.text("乱世枭雄挑战次数+" + this.count)
		}else if (this.currentVo.id == 416017) {
			ViewCommonWarn.text("三国战神挑战次数+" + this.count)
		}else if (this.currentVo.id == Model_TigerPass.TZ_LING) {
			ViewCommonWarn.text("虎牢关挑战次数+" + this.count)
		}
		var count = Model_Bag.getItemCount(this.currentVo.id);
		if (count == 0) {
			this.closeEventHandler(null);
		} else {
			this.show(this.currentVo)
		}
	}

	private show(obj: any): void {
		this.resize();
		this.currentVo = obj;
		var vo: VoItem = obj;
		this.childTip.vo = vo;
		var count = Model_Bag.getItemCount(vo.id);
		if (count > 0) {
			this.count = count;
		} else {
			this.count = 1;
		}
		this.lbCount.text = "" + this.count;
	}

	private resize(): void {
		this.setXY((fairygui.GRoot.inst.width - this.frame.width) / 2, (fairygui.GRoot.inst.height - this.frame.height) / 2)
	}

	private onSendUseHandler(event: egret.TouchEvent): void {
		let self = this;
		let sysid = self.currentVo.cfg.sys;
		let ret = ModuleManager.isOpen(sysid, true);
		if (!ret) {
			return;
		}
		if (self.currentVo.type == 12 || self.currentVo.type == 13) {
			if (Model_Setting.headIdArr.indexOf(parseInt(self.currentVo.cfg.use)) == -1 && Model_Setting.frameIdArr.indexOf(parseInt(self.currentVo.cfg.use)) == -1) {
				GGlobal.modelBag.CG_BAG_ITEM_USE(self.currentVo.id, 1);
			} else {
				if (self.currentVo.type == 12) {
					ViewCommonWarn.text("该头像已激活");
				} else {
					ViewCommonWarn.text("该头像框已激活");
				}
			}
		} else {
			if(self.currentVo.type == 42 && GGlobal.modelDengFengZJ.status != 1){//登峰造极 海选结束了
				ViewCommonWarn.text("本周赛事已结束");
				return;
			}
			GGlobal.modelBag.CG_BAG_ITEM_USE(self.currentVo.id, self.count);
		}
		TipManager.hide();
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

	private currentVo: VoItem;
	private count: number = 0;

}