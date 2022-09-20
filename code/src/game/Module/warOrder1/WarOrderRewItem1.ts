/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class WarOrderRewItem1 extends fairygui.GComponent {
	//注意：start和end之间的属性是脚本自动修改，在这之间插入的代码会被删除，不要在start和end之间添加代码
	//>>>>start
	public state0Ctrl: fairygui.Controller;
	public state1Ctrl: fairygui.Controller;
	public tfIndex: fairygui.GRichTextField;
	public item0: ViewGrid;
	public btnGet0: fairygui.GGraph;
	public lbNo0: fairygui.GImage;
	public imageGet0: fairygui.GImage;
	public noticeImg0: fairygui.GImage;
	public grey0: fairygui.GImage;
	public item1: ViewGrid;
	public lbNo1: fairygui.GImage;
	public grey1: fairygui.GImage;
	public btnGet1: fairygui.GGraph;
	public noticeImg1: fairygui.GImage;
	public imageGet1: fairygui.GImage;
	//>>>>end
	public static URL: string = "ui://89er3bo3e7lc2";

	public static createInstance(): WarOrderRewItem1 {
		return <WarOrderRewItem1><any>(fairygui.UIPackage.createObject("warOrder1", "WarOrderRewItem1"));
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let t = this;
		CommonManager.parseChildren(t, t);
	}
	private _curData
	private _actVo
	//=========================================== API ==========================================
	public setData(pData: VoWarOrderReward, curActVo) {
		this._curData = pData;
		this._actVo = curActVo;
		if (pData) {

			let m = GGlobal.modelWarOrder
			let voWarO = m.getWarOrder(curActVo.id)

			this.tfIndex.text = ConfigHelp.reTxt("第{0}级", pData.cfg.lv)

			if (voWarO.levelId >= pData.cfg.lv) {
				this.grey0.visible = false;
				// this.lock0.visible = false;
				if (voWarO.upgradeFlag) {
					this.grey1.visible = false;
					// this.lock1.visible = false;
				} else {
					this.grey1.visible = true;
					// this.lock1.visible = true;
				}
			}
			else {
				this.grey0.visible = true;
				// this.lock0.visible = true;
				this.grey1.visible = true;
				// this.lock1.visible = true;
			}

			if (pData.rewardList0[0]) {
				this.item0.tipEnabled = true;
				this.item0.isShowEff = true;
				this.item0.vo = pData.rewardList0[0];
				this.item0.visible = true
				this.lbNo0.visible = false;
				this.state0Ctrl.selectedIndex = pData.state0;
			} else {
				this.item0.visible = false
				this.lbNo0.visible = true;
				this.state0Ctrl.selectedIndex = 0
			}
			if (pData.rewardList1[0]) {
				this.item1.tipEnabled = true;
				this.item1.isShowEff = true;
				this.item1.vo = pData.rewardList1[0];
				this.item1.visible = true
				this.lbNo1.visible = false;
				this.state1Ctrl.selectedIndex = pData.state1;
			} else {
				this.item1.visible = false
				this.lbNo1.visible = true;
				this.state1Ctrl.selectedIndex = 0
			}

			this.registerEvent(true);
		}
		else {
		}
	}

	public clean() {
		this.registerEvent(false);
		super.clean();
		this.item0.clean();
		this.item1.clean();
	}


	private registerEvent(pFlag: boolean) {
		EventUtil.register(pFlag, this.btnGet0, egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
		EventUtil.register(pFlag, this.btnGet1, egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
	}
	//======================================== handler =========================================
	private onBtnClick(e: egret.TouchEvent) {
		let m = GGlobal.modelWarOrder
		if (!this._curData)
			return;
		switch (e.currentTarget) {
			case this.btnGet0:
				GGlobal.modelWarOrder.CG12251(0, this._curData.cfg.lv, 0, this._actVo.groupId);
				break;
			case this.btnGet1:
				GGlobal.modelWarOrder.CG12251(1, this._curData.cfg.lv, 0, this._actVo.groupId);
				break;
		}
	}
}