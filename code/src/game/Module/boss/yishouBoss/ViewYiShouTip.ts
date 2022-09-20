class ViewYiShouTip extends UIModalPanel {

	public frame: fairygui.GLabel;
	public n2: fairygui.GImage;
	public lbTip: fairygui.GRichTextField;
	public btnSure: fairygui.GButton;
	public btnExite: fairygui.GButton;

	public static URL: string = "ui://47jfyc6el44i3o";

	public static createInstance(): ViewYiShouTip {
		return <ViewYiShouTip><any>(fairygui.UIPackage.createObject("Boss", "ViewYiShouTip"));
	}
	public constructor() {
		super();
		this.loadRes("Boss", "Boss_atlas0");
	}

	protected childrenCreated(): void {
		let self = this;
		self.isClosePanel = false;
		self.view = fairygui.UIPackage.createObject("Boss", "ViewYiShouTip").asCom;
		self.contentPane = self.view;
		CommonManager.parseChildren(self.view, self);
		super.childrenCreated();
		self.lbTip.text = BroadCastManager.reTxt("是否花费<font color='#FFC344'>{0}元宝</font>复活？\n（退出战斗BOSS血量将回满）", ConfigHelp.getSystemNum(7302));
	}

	protected closeEventHandler(evt: egret.Event): void {
		super.closeEventHandler(evt);
		YiShouBossCtrl.getInst().startResult();
	}

	timeUpdate = () => {
		let self = this;
		self._time--;
		if (self._time <= 0) {
			YiShouBossCtrl.getInst().startResult();
		} else {
			self.btnExite.text = "退出(" + self._time + "s)";
		}
	}
	onSure = () => {
		if (Model_player.voMine.yuanbao < ConfigHelp.getSystemNum(7302)) {
			ViewCommonWarn.text("元宝不足");
			YiShouBossCtrl.getInst().startResult();
		} else {
			YiShouBossCtrl.getInst().startRevive();
		}
	}

	onExite = () => {
		YiShouBossCtrl.getInst().startResult();
	}

	eventFun = (v) => {
		let self = this;
		let regster = EventUtil.register;
		regster(v, self.btnSure, egret.TouchEvent.TOUCH_TAP, self.onSure, self);
		regster(v, self.btnExite, egret.TouchEvent.TOUCH_TAP, self.onExite, self);
	}

	private _time = 20;
	public onShown() {
		let self = this;
		self._time = 20;
		self.eventFun(1);
		Timer.instance.listen(self.timeUpdate, self, 1000);
		self.btnExite.text = "退出(" + self._time + "s)";
	}

	public onHide() {
		let self = this;
		self.eventFun(0);
		Timer.instance.remove(self.timeUpdate, self);
		GGlobal.layerMgr.close(UIConst.YSBOSSREVIVE);
	}
}