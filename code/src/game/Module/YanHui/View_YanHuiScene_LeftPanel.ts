class View_YanHuiScene_LeftPanel extends fairygui.GComponent {

	public inviteBt: Button2;
	public toastBt: Button2;
	public battleBt: Button2;
	public applyBt: Button2;

	public static URL: string = "ui://4x7dk3lhgz25f";

	private static _instance: View_YanHuiScene_LeftPanel;
	public static createInstance(): View_YanHuiScene_LeftPanel {
		if (!View_YanHuiScene_LeftPanel._instance) {
			View_YanHuiScene_LeftPanel._instance = <View_YanHuiScene_LeftPanel><any>(fairygui.UIPackage.createObject("YanHui", "View_YanHuiScene_LeftPanel"));
		}
		return View_YanHuiScene_LeftPanel._instance;
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let self = this;
		CommonManager.parseChildren(self, self);
		self.resetPosition();
	}

	public showNotice() {
		let self = this;
		let model = GGlobal.modelYanHui;
		self.toastBt.checkNotice = GGlobal.reddot.checkCondition(UIConst.YANHUI);
		self.applyBt.checkNotice = model.applyList.length > 0;
	}

	public onShown() {
		let self = this;
		self.register(true);
	}

	public onHide() {
		let self = this;
		self.register(false);
	}

	private register(pFlag: boolean) {
		let self = this;
		EventUtil.register(pFlag, self.inviteBt, egret.TouchEvent.TOUCH_TAP, self.OnInvite, self);
		EventUtil.register(pFlag, self.toastBt, egret.TouchEvent.TOUCH_TAP, self.OnToast, self);
		EventUtil.register(pFlag, self.battleBt, egret.TouchEvent.TOUCH_TAP, self.OnBattle, self);
		EventUtil.register(pFlag, self.applyBt, egret.TouchEvent.TOUCH_TAP, self.OnApply, self);
		GGlobal.reddot.register(pFlag, UIConst.YANHUI, self.showNotice, self);
		GGlobal.control.register(pFlag, UIConst.YANHUI_APPLY, self.showNotice, self);
	}

	private OnApply() {
		let model = GGlobal.modelYanHui;
		if (model.roleID == Model_player.voMine.id) {
			GGlobal.layerMgr.open(UIConst.YANHUI_APPLY);
		} else {
			ViewCommonWarn.text("无此权限");
		}
	}

	private OnInvite() {
		let model = GGlobal.modelYanHui;
		if (model.roleID == Model_player.voMine.id) {
			if (TimeUitl.cool("yanhui_invite", 10000)) {
				GGlobal.modelYanHui.CG_House_yaoqing_11465();
			}
		} else {
			ViewCommonWarn.text("主人才可发出邀请");
		}
	}

	private OnToast() {
		GGlobal.layerMgr.open(UIConst.YANHUI_TOAST);
	}

	private OnBattle() {
		GGlobal.layerMgr.open(UIConst.YANHUI_BATTLE);
	}

	public resetPosition() {
		let self = this;
		self.setXY(-GGlobal.layerMgr.offx, (App.stageHeight - self.height) / 2);
	}
}