/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class ViewWarOrderBuyCt1 extends UIModalPanel {
	//注意：start和end之间的属性是脚本自动修改，在这之间插入的代码会被删除，不要在start和end之间添加代码
	//>>>>start
	public frame: fairygui.GLabel;
	public back: fairygui.GImage;
	public lb: fairygui.GRichTextField;
	public lb2: fairygui.GRichTextField;
	public img: fairygui.GLoader;
	public lb1: fairygui.GRichTextField;
	public btnCancel: fairygui.GButton;
	public btnOk: fairygui.GButton;
	//>>>>end
	public static URL: string = "ui://89er3bo3e7lc4";

	public static createInstance(): ViewWarOrderBuyCt1 {
		return <ViewWarOrderBuyCt1><any>(fairygui.UIPackage.createObject("warOrder1", "ViewWarOrderBuyCt1"));
	}

	public constructor() {
		super();
		this.childrenCreated();
	}

	protected childrenCreated(): void {
		let self = this;
		self.view = fairygui.UIPackage.createObject("warOrder1", "ViewWarOrderBuyCt1").asCom;
		self.contentPane = self.view;
		CommonManager.parseChildren(self.view, self);
		super.childrenCreated();
	}

	protected onShown() {
		let self = this;
		self._curActVo = self._args
		self.registerEvent(true);
		self.refreshData();
	}

	protected onHide(): void {
		let self = this;
		self.registerEvent(false);
		IconUtil.setImg(self.img, null);
	}

	private _curActVo: Vo_Activity

	//===================================== private method =====================================
	private refreshData() {
		let t = this;
		let m = GGlobal.modelWarOrder
		let voWarO = m.getWarOrder(t._curActVo.id)
		let max = m.getBuyCtMax(t._curActVo.qs)
		let color1 = max == voWarO.buyNum ? Color.REDSTR : Color.GREENSTR;
		t.lb2.text = ConfigHelp.reTxt("(今日还可购买<font color='{0}'>{1}/{2}</font>次)", color1, max - voWarO.buyNum, max)

		let cfg = Config.kssjbuy1_338[t._curActVo.qs * 100 + voWarO.buyNum + 1]
		if (!cfg) {
			cfg = Config.kssjbuy1_338[t._curActVo.qs * 100 + voWarO.buyNum]
		}
		let cost = JSON.parse(cfg.consume)[0][2]
		let type = JSON.parse(cfg.consume)[0][0]
		IconUtil.setImg(t.img, Enum_Path.ICON70_URL + type + ".png");
		let color = Model_player.voMine.yuanbao >= cost ? Color.GREENSTR : Color.REDSTR
		t.lb1.text = HtmlUtil.fontNoSize(cost + "", color) + "购买1级勋章等级"
		t._cost = cost

	}
	private _cost

	private registerEvent(pFlag: boolean) {
		let t = this;
		EventUtil.register(pFlag, t.btnOk, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
		EventUtil.register(pFlag, t.btnCancel, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
		GGlobal.control.register(pFlag, Enum_MsgType.WARORDERL_OPENUI, t.refreshData, t);
	}

	private onBtnClick(e: egret.TouchEvent) {
		let t = this
		switch (e.currentTarget) {
			case t.btnOk:
				let m = GGlobal.modelWarOrder
				let voWarO = m.getWarOrder(t._curActVo.id)
				let max = m.getBuyCtMax(t._curActVo.qs)
				if (max - voWarO.buyNum <= 0) {
					ViewCommonWarn.text("没有购买次数")
					return;
				}
				if (Model_player.voMine.yuanbao < t._cost) {
					ModelChongZhi.guideToRecharge()
					return;
				}
				if (voWarO.levelId >= m.getLvMax(t._curActVo.qs)) {
					ViewCommonWarn.text("勋章等级已满")
					return;
				}
				GGlobal.modelWarOrder.CG12261(t._curActVo.groupId);
				break;
			case t.btnCancel:
				GGlobal.layerMgr.close(UIConst.WAR_ORDER_BUYCT);
				break;
		}
		// ViewMgr.close(UIConst.WAR_ORDER_BUYCT);
	}
}