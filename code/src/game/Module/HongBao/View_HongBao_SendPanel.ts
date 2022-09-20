class View_HongBao_SendPanel extends UIModalPanel {

	public backBg: fairygui.GLoader;
	public btnMin: fairygui.GButton;
	public btnReduce: fairygui.GButton;
	public btnAdd: fairygui.GButton;
	public tfCount: fairygui.GRichTextField;
	public btnMax: fairygui.GButton;
	public zfLb: fairygui.GTextInput;
	public sendBt: fairygui.GButton;
	public changeBt: fairygui.GButton;

	public static URL: string = "ui://s01exr8xqz02a";

	public static createInstance(): View_HongBao_SendPanel {
		return <View_HongBao_SendPanel><any>(fairygui.UIPackage.createObject("HongBao", "View_HongBao_SendPanel"));
	}

	public constructor() {
		super();
		this.childrenCreated();
	}

	protected childrenCreated(): void {
		super.childrenCreated();
		let self = this;
		self.view = fairygui.UIPackage.createObject("HongBao", "View_HongBao_SendPanel").asCom;
		self.contentPane = self.view;
		CommonManager.parseChildren(self.view, self);
		self.changeBt.visible = false;
		self.zfLb.touchable = false;
	}

	public updateShow() {
		let self = this;
		self.tfCount.text = ConfigHelp.getSystemNum(8101) + "";
	}

	protected onShown(): void {
		let self = this;
		self.zfLb.text = "恭喜发财，大吉大利";
		self.register(true);
		IconUtil.setImg(self.backBg, Enum_Path.ACTCOM_URL + "tianjianghongbao1.png");
		self.updateShow();
	}

	protected onHide(): void {
		let self = this;
		self.register(false);
		IconUtil.setImg(self.backBg, null);
	}

	private register(pFlag: boolean) {
		let self = this;
		EventUtil.register(pFlag, self.btnMin, egret.TouchEvent.TOUCH_TAP, self.OnChange, self);
		EventUtil.register(pFlag, self.btnReduce, egret.TouchEvent.TOUCH_TAP, self.OnChange, self);
		EventUtil.register(pFlag, self.btnAdd, egret.TouchEvent.TOUCH_TAP, self.OnChange, self);
		EventUtil.register(pFlag, self.btnMax, egret.TouchEvent.TOUCH_TAP, self.OnChange, self);
		EventUtil.register(pFlag, self.sendBt, egret.TouchEvent.TOUCH_TAP, self.OnSend, self);
		EventUtil.register(pFlag, self.changeBt, egret.TouchEvent.TOUCH_TAP, self.OnChangeText, self);
		// EventUtil.register(pFlag, self.zfLb, egret.TextEvent.CHANGE, self.textChange, self);
		// EventUtil.register(pFlag, self.zfLb, egret.TextEvent.FOCUS_IN, self.On_FOCUS_IN, self);
		// EventUtil.register(pFlag, self.zfLb, egret.TextEvent.FOCUS_OUT, self.On_FOCUS_OUT, self);
	}

	private On_FOCUS_OUT() {
		if (!this.zfLb.text) {
			this.zfLb.text = "恭喜发财，大吉大利";
		}
	}

	private On_FOCUS_IN() {
		let self = this;
		self.zfLb.requestFocus();
		this.zfLb.text = "";
		self.zfLb.removeEventListener(egret.TextEvent.FOCUS_IN, self.On_FOCUS_IN, self);
	}

	private textChange() {
		let a = this;
		a.zfLb.requestFocus();
		a.zfLb.text = a.zfLb.text.replace(/\s+/g, '');//过滤空格
		// if (a.zfLb.text.length > 10) {
		// 	a.zfLb.text = a.zfLb.text.substr(0, 10);
		// }
	}

	private OnChangeText() {
		let self = this;
		// self.zfLb.dispatchEvent(new egret.TextEvent(egret.TextEvent.FOCUS_IN));
	}

	private OnSend() {
		let self = this;
		if (GGlobal.modelHB.surNum <= 0) {
			ViewCommonWarn.text("今日已达发红包上限");
			return;
		}
		let costNum = Number(self.tfCount.text);
		if (GGlobal.modelHB.moneyNum >= costNum) {
			GGlobal.modelHB.CG_RedBoxAct_faBoxs_11763(costNum, self.zfLb.text)
		} else {
			ViewCommonWarn.text("银元宝不足");
		}
	}

	public OnChange(evt: egret.TouchEvent) {
		let bt = evt.target as fairygui.GButton;
		let self = this;
		let model = GGlobal.modelHB;
		let costNum = Number(self.tfCount.text);
		switch (bt.id) {
			case self.btnMin.id:
				if (costNum > 1000 + ConfigHelp.getSystemNum(8101)) {
					costNum -= 1000;
				} else {
					costNum = ConfigHelp.getSystemNum(8101);
				}
				break;
			case self.btnReduce.id:
				if (costNum > 100 + ConfigHelp.getSystemNum(8101)) {
					costNum -= 100;
				} else {
					costNum = ConfigHelp.getSystemNum(8101);
				}
				break;
			case self.btnAdd.id:
				if (costNum + 100 > model.moneyNum && costNum + 100 <= ConfigHelp.getSystemNum(8103)) {
					costNum = model.moneyNum;
					if (costNum < ConfigHelp.getSystemNum(8101)) {
						costNum = ConfigHelp.getSystemNum(8101);
					}
					ViewCommonWarn.text("银元宝不足");
				} else if (costNum + 100 > ConfigHelp.getSystemNum(8103)) {
					ViewCommonWarn.text("已达单个红包发放金额上限");
					costNum = ConfigHelp.getSystemNum(8103);
				} else {
					costNum += 100;
				}
				break;
			case self.btnMax.id:
				if (costNum + 1000 > model.moneyNum && costNum + 1000 <= ConfigHelp.getSystemNum(8103)) {
					costNum = model.moneyNum;
					if (costNum < ConfigHelp.getSystemNum(8101)) {
						costNum = ConfigHelp.getSystemNum(8101);
					}
					ViewCommonWarn.text("银元宝不足");
				} else if (costNum + 1000 > ConfigHelp.getSystemNum(8103)) {
					ViewCommonWarn.text("已达单个红包发放金额上限");
					costNum = ConfigHelp.getSystemNum(8103);
				} else {
					costNum += 1000;
				}
				break;
		}
		self.tfCount.text = costNum + "";
	}
}