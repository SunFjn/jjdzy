class ViewBattleFault extends UIModalPanel {
	//>>>>start
	public bg1: ViewBg1;
	public btnClose: Button1;
	public btn0: fairygui.GLoader;
	public btn1: fairygui.GLoader;
	public btn2: fairygui.GLoader;
	public btn4: fairygui.GLoader;
	public txtXieZhu: fairygui.GRichTextField;
	//>>>>end

	public static URL: string = "ui://jvxpx9emnn9875";

	public static createInstance(): ViewBattleFault {
		return <ViewBattleFault><any>(fairygui.UIPackage.createObject("common", "ViewBattleFault"));
	}

	public constructor() {
		super();
		this.isClosePanel = false;
		this.loadRes();
	}

	protected childrenCreated(): void {
		this.view = fairygui.UIPackage.createObject("common", "ViewBattleFault").asCom;
		this.contentPane = this.view;
		CommonManager.parseChildren(this.view, this);

		this.btnClose.addClickListener(this.onExitT, this);

		ImageLoader.instance.loader(Enum_Path.MAINUI_URL + UIConst.WU_JIANG + ".png", this.btn0);
		this.btn0.addClickListener(this.openWJ, this);
		ImageLoader.instance.loader(Enum_Path.MAINUI_URL + UIConst.SHEN_JIAN + ".png", this.btn1);
		this.btn1.addClickListener(this.openSJ, this);
		this.btn2.addClickListener(this.openBW, this);
		ImageLoader.instance.loader(Enum_Path.MAINUI_URL + UIConst.BAOWU + ".png", this.btn2);
		ImageLoader.instance.loader(Enum_Path.MAINUI_URL + UIConst.TIANSHU + ".png", this.btn4);
		this.btn4.addClickListener(this.openTS, this);
		super.childrenCreated();
	}

	private openWJ() {
		this.onExitT();
		GGlobal.layerMgr.open(UIConst.WU_JIANG);
	}
	private openBW() {
		GGlobal.layerMgr.open(UIConst.BAOWU);
		this.onExitT();
	}
	private openSJ() {
		GGlobal.layerMgr.open(UIConst.SHEN_JIAN);
		this.onExitT();
	}
	private openTS() {
		GGlobal.layerMgr.open(UIConst.TIANSHU);
		this.onExitT();
	}

	private icons = [];
	private addBtn(sid) {
		let s = this;

	}

	public closeCB: Function;
	public timeoutCB: Function;
	public frameCB: Function;
	public exitClickCB: Function;

	public caller: any;

	public exitText: string;

	public arg: any;

	public remainTime = 1;


	/**
	 * 默认退出回掉
	 * 什么也没干- -！
	 */
	public static DEFCLOSECB(self: any, ui: ViewBattleFault) {
	}

	/**
	 * 默认退出回掉
	 * 直接切回到关卡场景
	 */
	public static DEFEXITCB(sel: any, ui: ViewBattleFault) {
		GGlobal.layerMgr.close2(UIConst.BATTLEFAULT);
		GGlobal.modelScene.returnMainScene();
	}


	public onOpen(arg) {
		super.onOpen(arg)
		this.addEventListener(egret.Event.ENTER_FRAME, this.onframe, this);
		this.remainTime = arg.t;
		this.exitText = arg.exitText;
		this.frameCB = arg.fCb;
		this.timeoutCB = arg.tCb;
		this.closeCB = arg.cCb;
		this.arg = arg.arg;
		this.exitClickCB = arg.eCb;
		this.caller = arg.caller;

		this.udTimeView();
	}

	protected onHide() {
		GGlobal.layerMgr.close(UIConst.BATTLEFAULT)
		GGlobal.control.notify(Enum_MsgType.COMMON_WINFAIL_CLOSE);
	}

	public onClose() {
		super.onClose();
		this.removeEventListener(egret.Event.ENTER_FRAME, this.onframe, this);
		if (this.closeCB) {
			this.closeCB(this.caller, this);
		}
	}

	/**
	 * 打开失败面板
	 * @remainTime 倒计时间 (毫秒)
	 * @thisObj this引用
	 * @exitText 退出按钮LABEL 默认 退出 会显示 退出(X秒)
	 * @exitClickCB 退出按钮点击回调
	 * @closeCB 面板关闭面板回调
	 * @timeoutCb 倒计时到期回调
	 * @frameCB 帧回掉
	 * @arg 自定义参数
	 */
	public static show(remainTime = 5000, thisObj = null, exitText: String = "退出", exitClickCB: Function = null, closeCB: Function = null, timeoutCB: Function = null, frameCB: Function = null, arg = null) {
		if (GGlobal.layerMgr.isOpenView(UIConst.BATTLEFAULT)) return;
		GGlobal.layerMgr.open(UIConst.BATTLEFAULT, { caller: thisObj, eCb: exitClickCB, cCb: closeCB, tCb: timeoutCB, fCb: frameCB, arg: arg, exitText: exitText, t: remainTime });
	}

	public static hide() {
		if (GGlobal.layerMgr.isOpenView(UIConst.BATTLEFAULT)) {
			GGlobal.layerMgr.close2(UIConst.BATTLEFAULT);
		}
	}

	protected interv = 0;
	protected onframe(e: egret.Event) {
		var newt = this.remainTime - GGlobal.mapscene.dt;
		if (newt < 0) {
			newt = 0;
			this.removeEventListener(egret.Event.ENTER_FRAME, this.onframe, this);
			GGlobal.layerMgr.close2(UIConst.BATTLEFAULT)
		}
		if (newt <= 0 && this.remainTime > 0) {
			this.remainTime = 0;
			if (this.timeoutCB) {
				this.timeoutCB(this.caller, this);
			} else {
				ViewBattleFault.DEFEXITCB(null, null);
			}
		}
		this.remainTime = newt;
		if (this.frameCB) {
			this.frameCB(this.caller, this);
		}

		this.interv += GGlobal.mapscene.dt;
		if (this.interv >= 500) {
			this.interv = 0;
			this.udTimeView();
		}
	}

	protected udTimeView() {
		var remainSec = Math.ceil(this.remainTime / 1000);
		this.btnClose.text = this.exitText + "(" + remainSec + ")";
	}

	protected onExitT(e: egret.TouchEvent = null) {
		if (this.exitClickCB) {
			this.exitClickCB(this.caller, this);
		} else {
			ViewBattleFault.DEFEXITCB(null, null);
		}
		// GGlobal.layerMgr.close(UIConst.ALERT);
		GGlobal.layerMgr.close2(UIConst.BATTLEFAULT);
	}

	protected onItemClick(e: egret.TouchEvent) {
		var obj = e.currentTarget;
		this.onExitT(e);
		GGlobal.layerMgr.open2(obj.funcarg[0], obj.funcarg[1]);
	}
}