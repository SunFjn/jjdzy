class SGZLShopItem extends fairygui.GComponent {

	//>>>>start
	public stateCtrl: fairygui.Controller;
	public item: ViewGrid;
	public tfItemName: fairygui.GRichTextField;
	public btnBuy: Button1;
	public tfLimit: fairygui.GRichTextField;
	public imageIcon: fairygui.GLoader;
	public tfValue: fairygui.GRichTextField;
	//>>>>end

	public static URL: string = "ui://d5y9ngt6tvlr1v";

	public static createInstance(): SGZLShopItem {
		return <SGZLShopItem><any>(fairygui.UIPackage.createObject("actHolyBeast", "SGZLShopItem"));
	}

	private _curData: VoSGZLShop;

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		CommonManager.parseChildren(this, this);
	}

	//=========================================== API ==========================================
	public setData(pData: VoSGZLShop) {
		this._curData = pData;
		if (pData) {
			let t_item = pData.itemList[0];

			this.item.isShowEff = true;
			this.item.tipEnabled = true;
			this.item.vo = t_item;

			this.tfItemName.text = HtmlUtil.font(t_item.name, t_item.qColor);

			let t_remain = pData.remainCount;
			let t_limitStr = "";
			if (t_remain == -1) //不限购
			{
				t_limitStr = "不限购";
				this.stateCtrl.selectedIndex = 0;
			}
			else {
				let t_color = Color.GREENSTR;
				if (t_remain == 0) { //已兑完
					t_color = Color.REDSTR;
					this.stateCtrl.selectedIndex = 1;
				}
				else { //还有数量
					this.stateCtrl.selectedIndex = 0;
				}
				t_limitStr = ConfigHelp.reTxt(HtmlUtil.font("{0}/{1}", t_color), t_remain, pData.cfg.time);
			}
			this.tfLimit.text = ConfigHelp.reTxt("限购：" + t_limitStr);

			let t_consume = pData.consumeItem;
			ImageLoader.instance.loader(Enum_Path.ICON70_URL + t_consume.icon + ".png", this.imageIcon);
			EventUtil.register(true, this.imageIcon, egret.TouchEvent.TOUCH_TAP, this.onIconClick, this);
			if (ConfigHelp.checkEnough(pData.cfg.money, false)) {
				this.tfValue.text = t_consume.count + "";
			}
			else {
				this.tfValue.text = HtmlUtil.font(t_consume.count + "", Color.REDSTR);
			}

			this.registerEvent(true);
		}
		else {
			this.item.vo = null;
			this.registerEvent(false);
		}
	}

	public dispose() {
		this.registerEvent(false);
		EventUtil.register(false, this.imageIcon, egret.TouchEvent.TOUCH_TAP, this.onIconClick, this);
		super.dispose();
	}

	//===================================== private method =====================================
	private registerEvent(pFlag: boolean) {
		EventUtil.register(pFlag, this.btnBuy, egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
	}

	//======================================== handler =========================================
	private onIconClick(e: egret.TouchEvent) {
		if (this._curData) {
			FastAPI.showItemTips(this._curData.consumeItem);
		}
	}

	private onBtnClick(e: egret.TouchEvent) {
		if (!this._curData)
			return;
		switch (e.currentTarget) {
			case this.btnBuy:
				GGlobal.modelSGZL.cmdSendBuy(this._curData.id);
				break;
		}
	}
}