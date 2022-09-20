/** This is an automatically generated class by FairyGUI. Please do not modify it. **/


class WarOrderRewItem extends fairygui.GComponent {
	//注意：start和end之间的属性是脚本自动修改，在这之间插入的代码会被删除，不要在start和end之间添加代码
	//>>>>start
	public state0Ctrl: fairygui.Controller;
	public state1Ctrl: fairygui.Controller;
	public tfIndex: fairygui.GRichTextField;
	public itemList1: fairygui.GList;
	public itemList0: fairygui.GList;
	public grey1: fairygui.GImage;
	public grey0: fairygui.GImage;
	public imageGet0: fairygui.GImage;
	public imageGet1: fairygui.GImage;
	public noticeImg0: fairygui.GImage;
	public noticeImg1: fairygui.GImage;
	public btnGet0: fairygui.GGraph;
	public btnGet1: fairygui.GGraph;
	public lbNo0: fairygui.GImage;
	public lbNo1: fairygui.GImage;
	static pkg = "warOrder";
	//>>>>end
	public static URL: string = "ui://5xptxudgp5ib3";

	private _curData: VoWarOrderReward;
	private _curAct: Vo_Activity;

	public static createInstance(): WarOrderRewItem {
		return <WarOrderRewItem>(fairygui.UIPackage.createObject("warOrder", "WarOrderRewItem"));
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let t = this;
		CommonManager.parseChildren(t, t);

		this.itemList0.itemRenderer = this.onItemRender0;
		this.itemList0.callbackThisObj = this;

		this.itemList1.itemRenderer = this.onItemRender1;
		this.itemList1.callbackThisObj = this;
	}

	//=========================================== API ==========================================
	public setData(pData: VoWarOrderReward, actVo: Vo_Activity) {
		let t = this
		this._curData = pData;
		this._curAct = actVo;
		if (pData) {
			this.tfIndex.text = pData.cfg.lv + "";
			let voWarO = GGlobal.modelWarOrder.getWarOrder(actVo.id)
			if (voWarO.levelId >= pData.cfg.lv) {
				this.grey0.visible = false;
				if (voWarO.upgradeFlag) {
					this.grey1.visible = false;
				} else {
					this.grey1.visible = true;
				}
			}
			else {
				this.grey0.visible = true;
				this.grey1.visible = true;
			}
			this.itemList1.numItems = pData.rewardList1.length;
			this.itemList0.numItems = pData.rewardList0.length;

			if (pData.rewardList0.length > 0) {
				this.state0Ctrl.selectedIndex = pData.state0;
				t.lbNo0.visible = false;
			} else {
				this.state0Ctrl.selectedIndex = 0
				t.lbNo0.visible = true;
			}
			if (pData.rewardList1[0]) {
				this.state1Ctrl.selectedIndex = pData.state1;
				t.lbNo1.visible = false;
			} else {
				this.state1Ctrl.selectedIndex = 0
				t.lbNo1.visible = true;
			}

			this.registerEvent(true);
		}
		else {
		}
	}

	public clean() {
		this.registerEvent(false);
		super.clean();
	}

	//===================================== private method =====================================
	private onItemRender0(pIndex: number, pItem: ViewGrid) {
		if (this._curData && this._curData.rewardList0) {
			let t_list = this._curData.rewardList0;
			pItem.isShowEff = true;
			pItem.tipEnabled = true;
			pItem.vo = t_list[pIndex];
		}
	}

	private onItemRender1(pIndex: number, pItem: ViewGrid) {
		if (this._curData && this._curData.rewardList1) {
			let t_list = this._curData.rewardList1;
			pItem.isShowEff = true;
			pItem.tipEnabled = true;
			pItem.vo = t_list[pIndex];
		}
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
				GGlobal.modelWarOrder.CG12251(0, this._curData.cfg.lv, 0, this._curAct.groupId);
				break;
			case this.btnGet1:
				GGlobal.modelWarOrder.CG12251(1, this._curData.cfg.lv, 0, this._curAct.groupId);
				break;
		}
	}
}