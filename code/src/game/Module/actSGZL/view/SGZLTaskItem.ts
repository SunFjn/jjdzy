class SGZLTaskItem extends fairygui.GComponent {

	//>>>>start
	public stateCtrl: fairygui.Controller;
	public tfContent: fairygui.GRichTextField;
	public itemList: fairygui.GList;
	public btnGo: Button0;
	public btnGet: Button1;
	public imageGet: fairygui.GImage;
	//>>>>end

	public static URL: string = "ui://d5y9ngt6jt4v1t";

	private _curData: VoSGZLTask;

	public static createInstance(): SGZLTaskItem {
		return <SGZLTaskItem><any>(fairygui.UIPackage.createObject("actHolyBeast", "SGZLTaskItem"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		CommonManager.parseChildren(this, this);

		this.itemList.itemRenderer = this.onItemRender;
		this.itemList.callbackThisObj = this;
	}

	//=========================================== API ==========================================
	public setData(pData: VoSGZLTask) {
		this._curData = pData;
		if (pData) {
			let t_countStr = "";
			let t_color = Color.REDSTR;
			if (pData.curCount >= pData.cfg.canshu) {
				t_color = Color.GREENSTR;
			}
			t_countStr = ConfigHelp.reTxt(HtmlUtil.font("({0}/{1})", t_color), pData.curCount, pData.cfg.canshu);
			this.tfContent.text = pData.cfg.shuoming + " " + t_countStr;

			this.stateCtrl.selectedIndex = pData.state;

			this.itemList.numItems = pData.rewardList.length;

			if (pData.cfg.leixing == 1)
				this.btnGo.alpha = 0;
			else
				this.btnGo.alpha = 1;

			this.registerEvent(true);
		}
		else {
			this.registerEvent(false);
			this.itemList.numItems = 0;
		}
	}

	public dispose() {
		this.registerEvent(false);
		super.dispose();
	}
	//===================================== private method =====================================
	private onItemRender(pIndex: number, pItem: TaskItemCom) {
		if (!this._curData)
			return;
		let t_list = this._curData.rewardList;
		if (!t_list)
			return;
		pItem.setData(t_list[pIndex]);
	}

	private registerEvent(pFlag: boolean) {
		EventUtil.register(pFlag, this.btnGo, egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
		EventUtil.register(pFlag, this.btnGet, egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
	}

	//======================================== handler =========================================
	private onBtnClick(e: egret.TouchEvent) {
		if (!this._curData)
			return;
		switch (e.currentTarget) {
			case this.btnGo:
				//??????????????????
				let t_openId = this._curData.cfg.tiaozhuan;
				if (t_openId == UIConst.CHONGZHI) //?????????????????????
				{
					//??????????????????????????????????????????????????????????????????????????????
					ViewChongZhi.tryToOpenCZ();
				}
				else {
					GGlobal.layerMgr.open(t_openId);
				}
				break;

			case this.btnGet:
				GGlobal.modelSGZL.cmdSendGetTaskReward(this._curData.taskId);
				break;
		}
	}
}