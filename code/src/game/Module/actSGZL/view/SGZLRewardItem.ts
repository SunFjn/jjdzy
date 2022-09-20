class SGZLRewardItem extends fairygui.GComponent {

	//>>>>start
	public state0Ctrl: fairygui.Controller;
	public state1Ctrl: fairygui.Controller;
	public imageState: fairygui.GImage;
	public tfIndex: fairygui.GRichTextField;
	public itemList1: fairygui.GList;
	public itemList0: fairygui.GList;
	public imageGet0: fairygui.GImage;
	public imageGet1: fairygui.GImage;
	public noticeImg0: fairygui.GImage;
	public noticeImg1: fairygui.GImage;
	public btnGet0: fairygui.GGraph;
	public btnGet1: fairygui.GGraph;
	//>>>>end

	public static URL: string = "ui://d5y9ngt6tvlr25";

	private _curData: VoSGZLReward;

	public static createInstance(): SGZLRewardItem {
		return <SGZLRewardItem><any>(fairygui.UIPackage.createObject("actHolyBeast", "SGZLRewardItem"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		CommonManager.parseChildren(this, this);

		this.itemList0.itemRenderer = this.onItemRender0;
		this.itemList0.callbackThisObj = this;

		this.itemList1.itemRenderer = this.onItemRender1;
		this.itemList1.callbackThisObj = this;
	}

	//=========================================== API ==========================================
	public setData(pData: VoSGZLReward) {
		this._curData = pData;
		if (pData) {
			this.tfIndex.text = pData.id + "";

			if (GGlobal.modelSGZL.levelId >= pData.id)
				this.imageState.grayed = false;
			else
				this.imageState.grayed = true;

			this.state0Ctrl.selectedIndex = pData.state0;
			this.state1Ctrl.selectedIndex = pData.state1;

			this.itemList0.numItems = pData.rewardList0.length;
			this.itemList1.numItems = pData.rewardList1.length;

			this.registerEvent(true);
		}
		else {
		}
	}

	public clean() {
		this.registerEvent(false);
		super.clean();
	}

	public dispose() {
		this.clean();
		super.dispose();
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
		if(!this._curData)
			return;
		switch (e.currentTarget) {
			case this.btnGet0:
				GGlobal.modelSGZL.cmdSendGetReward(0, 0, this._curData.id);
				break;
			case this.btnGet1:
					GGlobal.modelSGZL.cmdSendGetReward(0, 1, this._curData.id);
				break;
		}
	}
}