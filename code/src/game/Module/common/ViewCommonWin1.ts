class ViewCommonWin1 extends UIModalPanel {
	public bg1: ViewBg1;
	public btnContinue: Button1;
	public btnClose: Button0;
	public list: fairygui.GList;

	public constructor() {
		super();
		this.isClosePanel = false;
		this.loadRes();
	}
	protected childrenCreated(): void {
		let self = this;
		self.view = fairygui.UIPackage.createObject("common", "ViewFightWin1").asCom;
		self.contentPane = self.view;
		CommonManager.parseChildren(self.view, self);

		self.list.itemRenderer = self.renderHander
		self.list.callbackThisObj = self;
		super.childrenCreated();
		self.resetPosition();
	}

	/**
	 * 打开胜利面板
	 * @remainTime 倒计时间 (毫秒)
	 * @thisObj this引用
	 * @exitText 退出按钮LABEL 默认 退出 会显示 退出(X秒)
	 * @eCB 退出按钮点击回调
	 * @cCb 继续按钮点击回调
	 * @eArg 退出回调参数
	 * @cArg 继续回调参数
	 */
	public static show(award, remainTime = 5000, cCB: Function, cArg = null, thisObj = null, eCB: Function = null, eArg = null, exitText: String = "退出") {
		GGlobal.layerMgr.open(UIConst.COMMON_WIN1, { award: award, caller: thisObj, eCB: eCB, exitText: exitText, t: remainTime, eArg: eArg, cCB: cCB, cArg: cArg });
	}

	public award: any;
	public exitText: string;
	public eCB: Function;
	public cCB: Function;
	public eArg: any;
	public cArg: any;
	public caller: any;

	public onOpen(arg) {
		super.onOpen(arg)
		if (!arg) return;
		let self = this;
		self.award = arg.award;
		self.timeremain = arg.t;
		self.exitText = arg.exitText;
		self.eArg = arg.eArg;
		self.cArg = arg.cArg;
		self.eCB = arg.eCB;
		self.cCB = arg.cCB;
		self.caller = arg.caller;
		// if ((Model_player.taskId <= Config.xtcs_004[2801].num || Model_player.taskId >= Config.xtcs_004[2806].num)) {
		// 	let cfg = Config.mission_243[Model_player.taskId]
		// 	if (cfg && cfg.type == 7) {
		// 		self.guide_exit(ViewCommonWin1.step);
		// 	}
		// }
		self.showWin();
		self.updateBtnRemain();
		self.addEventListener(egret.Event.ENTER_FRAME, self.onFrame, self);
		self.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, self.onExitT, self);
		self.btnContinue.addEventListener(egret.TouchEvent.TOUCH_TAP, self.onContinue, self);
	}

	protected onHide() {
		let self = this;
		self.removeEventListener(egret.Event.ENTER_FRAME, self.onFrame, self);
		self.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onExitT, self);
		GGlobal.layerMgr.close(UIConst.COMMON_WIN1);
		self.list.numItems = 0;
	}

	public timeremain: number;
	protected timer = 0;
	protected onFrame(e: egret.Event) {
		this.timer += GGlobal.mapscene.dt;
		this.timeremain -= GGlobal.mapscene.dt;
		if (this.timer >= 500) {
			this.updateBtnRemain();
			this.timer = 0;
			if (this.timeremain < -500) {
				this.timeremain = 0;
				this.removeEventListener(egret.Event.ENTER_FRAME, this.onFrame, this);
				this.continue();
			}
		}
	}

	protected onExitT() {
		this.finish();
	}

	private onContinue() {
		this.continue();
	}

	protected showWin() {
		var self = this;
		this.list.numItems = this.award ? this.award.length : 0;
		this.btnClose.text = this.exitText;
	}

	private renderHander(index: number, obj: fairygui.GComponent): void {
		var item = obj as ViewGridRender;
		item.vo = this.award[index];
	}

	protected updateBtnRemain() {
		this.btnContinue.text = "继续（" + Math.ceil(this.timeremain / 1000) + "）"
	}

	protected finish() {
		GGlobal.control.notify(Enum_MsgType.COMMON_WINFAIL_CLOSE);
		if (this.eCB) {
			this.eCB.apply(this.caller, this.eArg);
		} else {
			GGlobal.modelScene.returnMainScene();//自己在回调里写
		}
		GGlobal.layerMgr.close2(UIConst.COMMON_WIN1);
	}

	protected continue() {
		GGlobal.control.notify(Enum_MsgType.COMMON_WINFAIL_CLOSE);
		if (this.cCB) {
			this.cCB.apply(this.caller, this.cArg);
		}
		GGlobal.layerMgr.close2(UIConst.COMMON_WIN1);
	}

	public resetPosition(): void {
		this.setXY((fairygui.GRoot.inst.width - this.width) >> 1, (fairygui.GRoot.inst.height - this.height) >> 1);
	}

	public static step: any;
	public guide_exit(step) {
		let self = this;
		GuideStepManager.instance.showGuide(self.btnClose, self.btnClose.width / 2, self.btnClose.height / 2);
		GuideStepManager.instance.showGuide1(step.source.index, self.btnClose, self.btnClose.width / 2, self.btnClose.height, 90, -106, 35);
	}
}